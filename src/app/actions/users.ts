"use server";

import { eq } from "drizzle-orm";
import { z } from "zod";
import db from "@/db";
import { usersTable } from "@/db/schema";
import { requireRole } from "@/lib/dal";
import { hashPassword } from "@/lib/password";

const baseSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const studentSchema = baseSchema.extend({
  role: z.literal("student"),
  phone: z.string().min(1, { message: "Phone is required" }),
  birthDate: z.string().min(1, { message: "Date of birth is required" }),
  active: z.boolean(),
});

const teacherSchema = baseSchema.extend({
  role: z.literal("teacher"),
  phone: z.string().min(1, { message: "Phone is required" }),
  active: z.boolean(),
});

const adminSchema = baseSchema.extend({
  role: z.literal("admin"),
});

const createUserSchema = z.discriminatedUnion("role", [
  studentSchema,
  teacherSchema,
  adminSchema,
]);

export type CreateUserInput = z.infer<typeof createUserSchema>;

export type ActionResult =
  | { success: true }
  | { error: string; errors?: Record<string, string[]> };

export async function createUser(values: unknown): Promise<ActionResult> {
  await requireRole("admin");

  const parsed = createUserSchema.safeParse(values);

  if (!parsed.success) {
    return {
      error: "Please fix the errors below.",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const data = parsed.data;

  const existing = await db
    .select({ id: usersTable.id })
    .from(usersTable)
    .where(eq(usersTable.email, data.email))
    .limit(1);

  if (existing.length > 0) {
    return { error: "A user with this email already exists." };
  }

  const hashedPassword = await hashPassword(data.password);

  await db.insert(usersTable).values({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    role: data.role,
    phone: data.role !== "admin" ? data.phone : undefined,
    birthDate: data.role === "student" ? data.birthDate : undefined,
    active: data.role !== "admin" ? data.active : undefined,
  });

  return { success: true };
}
