import { relations } from "drizzle-orm";
import {
  date,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";

import { customAlphabet } from "nanoid";

// Helper function to generate 5-character nanoid
const generateId = customAlphabet(
  "0123456789ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz",
  5,
);

export const userRoleEnum = pgEnum("role", ["admin", "teacher", "student"]);

export const courseTypeEnum = pgEnum("course_type", ["group", "private"]);

export const dayOfWeekEnum = pgEnum("day_of_week", [
  "saturday",
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
]);

export const usersTable = pgTable("users", {
  id: varchar("id", { length: 5 })
    .primaryKey()
    .$defaultFn(() => generateId()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").default("123456789").notNull(),
  role: userRoleEnum("role").notNull().default("student"),
  createdAt: timestamp("created_at").defaultNow(),
  birthDate: date("age"),
  active: boolean().notNull().default(true),
  phone: varchar("phone", { length: 15 }),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
export type UserRole = SelectUser["role"];

// --- Courses ---

export const coursesTable = pgTable("courses", {
  id: varchar("id", { length: 5 })
    .primaryKey()
    .$defaultFn(() => generateId()),
  title: text("title").notNull(),
  description: text("description"),
  type: courseTypeEnum("type").notNull(),
  teacherId: varchar("teacher_id", { length: 5 })
    .notNull()
    .references(() => usersTable.id),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  days: dayOfWeekEnum("days").array().notNull(), // e.g. ['saturday', 'monday']
  durationMinutes: integer("duration_minutes").notNull(), // e.g. 90
  exceptionDates: date("exception_dates").array().default([]),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

// --- Course Students (junction) ---

export const courseStudentsTable = pgTable(
  "course_students",
  {
    courseId: varchar("course_id", { length: 5 })
      .notNull()
      .references(() => coursesTable.id, { onDelete: "cascade" }),
    studentId: varchar("student_id", { length: 5 })
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    joinedAt: timestamp("joined_at").defaultNow(),
  },
  (t) => [
    primaryKey({ columns: [t.courseId, t.studentId] }), // composite PK, prevents duplicates
  ],
);

// --- Relations ---

export const coursesRelations = relations(coursesTable, ({ one, many }) => ({
  teacher: one(usersTable, {
    fields: [coursesTable.teacherId],
    references: [usersTable.id],
    relationName: "teacher_courses",
  }),
  students: many(courseStudentsTable),
}));

export const courseStudentsRelations = relations(
  courseStudentsTable,
  ({ one }) => ({
    course: one(coursesTable, {
      fields: [courseStudentsTable.courseId],
      references: [coursesTable.id],
    }),
    student: one(usersTable, {
      fields: [courseStudentsTable.studentId],
      references: [usersTable.id],
      relationName: "student_enrollments",
    }),
  }),
);
