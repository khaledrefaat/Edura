import { eq } from "drizzle-orm";
import * as schema from "@/db/schema";
import { hashPassword } from "@/lib/password";
import db from ".";

const SEED_USERS = [
  {
    name: "Admin",
    email: "admin@edumanage.com",
    password: "k@123456K",
    role: "admin" as const,
  },
  {
    name: "Teacher",
    email: "teacher@edumanage.com",
    password: "k@123456K",
    role: "teacher" as const,
  },
  {
    name: "Student",
    email: "student@edumanage.com",
    password: "k@123456K",
    role: "student" as const,
  },
];

async function main() {
  console.log("🌱 Seeding users...");

  for (const user of SEED_USERS) {
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

  console.log("\n🎉 Done");
}

main().catch((err) => {
  console.error("💥 Seed failed:", err);
  process.exit(1);
});
