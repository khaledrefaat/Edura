import { and, count, ilike, eq, sql, SQL } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import db from "@/db";
import { courseStudentsTable, coursesTable, usersTable } from "@/db/schema";
import { decrypt } from "@/lib/session";

export type Session = {
  id: string;
  email: string;
  role: UserRole;
  expiresAt: Date;
} | null;

export const verifySession = cache(async (): Promise<Session> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  const session = await decrypt(token);

  return session;
});

function getDashboard(role: string): string {
  if (role === "admin") return "/";
  if (role === "teacher") return "/teacher/profile";
  return "/student/profile";
}

export async function requireRole(...roles: string[]) {
  const session = await verifySession();

  if (!session) {
    redirect("/sign-in");
  }

  if (!roles.includes(session.role)) {
    redirect(getDashboard(session.role));
  }

  return session;
}

export type CourseRow = {
  id: string;
  title: string;
  description: string | null;
  type: "group" | "private";
  teacher: string;
  teacherId: string;
  students: number;
  schedule: string;
};

export async function getCourses(opts?: {
  search?: string;
  type?: string;
  page?: number;
  itemsPerPage?: number;
}) {
  await requireRole("admin");

  const search = opts?.search ?? "";
  const type = opts?.type ?? "All";
  const page = opts?.page ?? 1;
  const itemsPerPage = opts?.itemsPerPage ?? 5;

  const conditions: SQL[] = [];

  if (type !== "All") {
    conditions.push(
      eq(coursesTable.type, type.toLowerCase() as "group" | "private"),
    );
  }

  if (search) {
    conditions.push(ilike(usersTable.name, `%${search}%`));
  }

  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const [rows, [{ total }]] = await Promise.all([
    db
      .select({
        id: coursesTable.id,
        title: coursesTable.title,
        description: coursesTable.description,
        type: coursesTable.type,
        teacher: usersTable.name,
        teacherId: usersTable.id,
        students: count(courseStudentsTable.studentId),
        days: coursesTable.days,
        durationMinutes: coursesTable.durationMinutes,
        startDate: coursesTable.startDate,
        endDate: coursesTable.endDate,
      })
      .from(coursesTable)
      .innerJoin(usersTable, eq(coursesTable.teacherId, usersTable.id))
      .leftJoin(
        courseStudentsTable,
        eq(coursesTable.id, courseStudentsTable.courseId),
      )
      .where(where)
      .groupBy(coursesTable.id, usersTable.id, usersTable.name)
      .orderBy(coursesTable.createdAt)
      .limit(itemsPerPage)
      .offset((page - 1) * itemsPerPage),
    db
      .select({ total: count() })
      .from(coursesTable)
      .innerJoin(usersTable, eq(coursesTable.teacherId, usersTable.id))
      .where(where),
  ]);

  const courses: CourseRow[] = rows.map((r) => ({
    id: r.id,
    title: r.title,
    description: r.description,
    type: r.type,
    teacher: r.teacher,
    teacherId: r.teacherId,
    students: r.students,
    schedule: `${r.days.join(", ")}`,
  }));

  return { courses, total };
}

export type UserRow = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  enrolledCourses: number;
  contactInfo: string | null;
  dateOfBirth: string | null;
};

export async function getUsers(opts?: {
  search?: string;
  role?: string;
  page?: number;
  itemsPerPage?: number;
}) {
  await requireRole("admin");

  const search = opts?.search ?? "";
  const role = opts?.role ?? "All";
  const page = opts?.page ?? 1;
  const itemsPerPage = opts?.itemsPerPage ?? 10;

  const conditions: SQL[] = [];

  if (role !== "All") {
    conditions.push(eq(usersTable.role, role.toLowerCase() as UserRole));
  }

  if (search) {
    const searchTerm = `%${search}%`;
    conditions.push(
      sql`(${ilike(usersTable.name, searchTerm)} OR ${ilike(usersTable.email, searchTerm)})`,
    );
  }

  const where = conditions.length > 0 ? and(...conditions) : undefined;

  const [rows, [{ total }]] = await Promise.all([
    db
      .select({
        id: usersTable.id,
        name: usersTable.name,
        email: usersTable.email,
        role: usersTable.role,
        active: usersTable.active,
        phone: usersTable.phone,
        birthDate: usersTable.birthDate,
        students: count(courseStudentsTable.courseId),
      })
      .from(usersTable)
      .leftJoin(
        courseStudentsTable,
        eq(usersTable.id, courseStudentsTable.studentId),
      )
      .where(where)
      .groupBy(usersTable.id)
      .orderBy(usersTable.createdAt)
      .limit(itemsPerPage)
      .offset((page - 1) * itemsPerPage),
    db
      .select({ total: count() })
      .from(usersTable)
      .where(where),
  ]);

  const users: UserRow[] = rows.map((r) => ({
    id: r.id,
    name: r.name,
    email: r.email,
    role: r.role,
    status: r.active ? "Active" : "Inactive",
    enrolledCourses: r.students,
    contactInfo: r.phone ?? null,
    dateOfBirth: r.birthDate ?? null,
  }));

  return { users, total };
}
