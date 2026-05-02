"use server";

import { eq } from "drizzle-orm";
import db from "@/db";
import { courseStudentsTable, coursesTable, usersTable } from "@/db/schema";
import { requireRole } from "@/lib/dal";

const SHORT_TO_FULL_DAY: Record<string, string> = {
  Mon: "monday",
  Tue: "tuesday",
  Wed: "wednesday",
  Thu: "thursday",
  Fri: "friday",
  Sat: "saturday",
  Sun: "sunday",
};

export type FormValues = {
  title: string;
  description: string;
  type: "Group" | "Private";
  teacherId: string;
  startDate: string;
  endDate: string;
  daysOfWeek: string[];
  startTime: string;
  endTime: string;
  exceptionDates: string[];
  selectedStudents: string[];
};

function calculateDurationMinutes(start: string, end: string): number {
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  return eh * 60 + em - (sh * 60 + sm);
}

export type CourseDetails = {
  id: string;
  title: string;
  description: string | null;
  type: "group" | "private";
  startDate: string;
  endDate: string;
  days: string[];
  durationMinutes: number;
  exceptionDates: string[];
  teacher: { name: string; email: string; id: string };
  students: { name: string; email: string; joinedAt: Date | null; id: string }[];
};

export async function getCourseDetails(
  courseId: string,
): Promise<CourseDetails | null> {
  await requireRole("admin");

  const course = await db.query.coursesTable.findFirst({
    where: eq(coursesTable.id, courseId),
    with: {
      teacher: { columns: { name: true, email: true, id: true } },
      students: {
        columns: { joinedAt: true },
        with: { student: { columns: { name: true, email: true, id: true } } },
      },
    },
  });

  if (!course) return null;

  return {
    id: course.id,
    title: course.title,
    description: course.description,
    type: course.type,
    startDate: course.startDate,
    endDate: course.endDate,
    days: course.days,
    durationMinutes: course.durationMinutes,
    exceptionDates: course.exceptionDates ?? [],
    teacher: { name: course.teacher.name, email: course.teacher.email, id: course.teacher.id },
    students: course.students.map((s) => ({
      name: s.student.name,
      email: s.student.email,
      joinedAt: s.joinedAt,
      id: s.student.id,
    })),
  };
}

export async function getTeachers() {
  await requireRole("admin");
  return db
    .select({ id: usersTable.id, name: usersTable.name })
    .from(usersTable)
    .where(eq(usersTable.role, "teacher"));
}

export async function getStudents() {
  await requireRole("admin");
  return db
    .select({
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
    })
    .from(usersTable)
    .where(eq(usersTable.role, "student"));
}

export async function createCourse(values: FormValues) {
  await requireRole("admin");

  const days = values.daysOfWeek
    .map((d) => SHORT_TO_FULL_DAY[d])
    .filter(Boolean) as (typeof coursesTable.$inferInsert)["days"];
  const durationMinutes = calculateDurationMinutes(
    values.startTime,
    values.endTime,
  );

  if (durationMinutes <= 0) {
    return { error: "End time must be after start time" };
  }

  const [course] = await db
    .insert(coursesTable)
    .values({
      title: values.title,
      description: values.description,
      type: values.type.toLowerCase() as "group" | "private",
      teacherId: values.teacherId,
      startDate: values.startDate,
      endDate: values.endDate,
      days,
      durationMinutes,
      exceptionDates: values.exceptionDates.length
        ? values.exceptionDates
        : undefined,
    })
    .returning({ id: coursesTable.id });

  if (values.selectedStudents.length > 0) {
    await db.insert(courseStudentsTable).values(
      values.selectedStudents.map((studentId) => ({
        courseId: course.id,
        studentId,
      })),
    );
  }

  return { success: true, courseId: course.id };
}
