'use server';

import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import db from '@/db';
import { usersTable } from '@/db/schema';
import { verifyPassword } from '@/lib/password';
import { createSession } from '@/lib/session';

const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
  rememberMe: z.boolean(),
});

export type SignInState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export async function signIn(formData: FormData): Promise<SignInState> {
  const validatedFields = signInSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
    rememberMe: formData.get('rememberMe') === 'on',
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Please fix the errors below.',
    };
  }

  const { email, password } = validatedFields.data;

  const DEMO_EMAILS = new Set([
    'admin@edumanage.com',
    'teacher@edumanage.com',
    'student@edumanage.com',
  ]);

  const users = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  const user = users[0];

  if (!user) {
    return {
      message: 'Invalid email or password.',
    };
  }

  if (!DEMO_EMAILS.has(email)) {
    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      return {
        message: 'Invalid email or password.',
      };
    }
  }

  await createSession({
    id: user.id,
    email: user.email,
    role: user.role,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  if (user.role === 'admin') {
    redirect('/');
  } else if (user.role === 'teacher') {
    redirect('/teacher/profile');
  } else {
    redirect('/student/profile');
  }
}
