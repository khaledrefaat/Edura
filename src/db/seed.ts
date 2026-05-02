import { eq } from "drizzle-orm";
import USERS from "@/DUMMY_DATA/USERS";
import COURSES from "@/DUMMY_DATA/COURSES";
import * as schema from "@/db/schema";
import { hashPassword } from "@/lib/password";
import db from ".";

async function main() {
  console.log("🌱 Seeding users...");

  for (const user of USERS) {
    const existing = await db
      .select({ id: schema.usersTable.id })
      .from(schema.usersTable)
      .where(eq(schema.usersTable.email, user.email));

    const hashedPassword = await hashPassword(user.password);

    if (existing.length > 0) {
      await db
        .update(schema.usersTable)
        .set({ password: hashedPassword })
        .where(eq(schema.usersTable.email, user.email));
      console.log(`🔄 Re-hashed password for ${user.email}`);
      continue;
    }

    await db.insert(schema.usersTable).values({
      name: user.name,
      email: user.email,
      password: hashedPassword,
      role: user.role,
    });
    console.log(`✅ Created ${user.role}: ${user.email}`);
  }

  // Build email → id map for users
  const allUsers = await db
    .select({ id: schema.usersTable.id, email: schema.usersTable.email })
    .from(schema.usersTable);
  const userMap = new Map(allUsers.map((u) => [u.email, u.id]));

  console.log("\n📚 Seeding courses...");

  for (const course of COURSES) {
    const teacherId = userMap.get(course.teacherEmail);
    if (!teacherId) {
      console.log(`⚠️ Teacher not found: ${course.teacherEmail}, skipping`);
      continue;
    }

    // Insert course (skip if title already exists)
    const existingCourse = await db
      .select({ id: schema.coursesTable.id })
      .from(schema.coursesTable)
      .where(eq(schema.coursesTable.title, course.title));

    let courseId: string;

    if (existingCourse.length > 0) {
      courseId = existingCourse[0].id;
      console.log(`🔄 Course already exists: ${course.title}`);
    } else {
      const [inserted] = await db
        .insert(schema.coursesTable)
        .values({
          title: course.title,
          description: course.description,
          type: course.type,
          teacherId,
          startDate: course.startDate,
          endDate: course.endDate,
          days: course.days,
          durationMinutes: course.durationMinutes,

        })
        .returning({ id: schema.coursesTable.id });
      courseId = inserted.id;
      console.log(`✅ Created course: ${course.title}`);
    }

    // Enroll students
    for (const email of course.studentEmails) {
      const studentId = userMap.get(email);
      if (!studentId) {
        console.log(`⚠️ Student not found: ${email}, skipping`);
        continue;
      }

      await db
        .insert(schema.courseStudentsTable)
        .values({ courseId, studentId })
        .onConflictDoNothing();
    }
    console.log(
      `   ↳ Enrolled ${course.studentEmails.length} student(s) in ${course.title}`,
    );
  }

  console.log("\n🎉 Done");
}

main().catch((err) => {
  console.error("💥 Seed failed:", err);
  process.exit(1);
});
