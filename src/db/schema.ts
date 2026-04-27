import { pgEnum, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

import { customAlphabet } from 'nanoid';

// Helper function to generate 5-character nanoid
const generateId = customAlphabet(
  '0123456789ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz',
  5,
);

export const userRoleEnum = pgEnum('role', ['admin', 'teacher', 'student']);

export const usersTable = pgTable('users', {
  id: varchar('id', { length: 5 })
    .primaryKey()
    .$defaultFn(() => generateId()),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  role: userRoleEnum('role').notNull().default('student'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;
export type UserRole = SelectUser['role'];
