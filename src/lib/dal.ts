import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { decrypt } from '@/lib/session';

export type Session = {
  id: string;
  email: string;
  role: UserRole;
  expiresAt: Date;
} | null;

export const verifySession = cache(async (): Promise<Session> => {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;
  const session = await decrypt(token);

  return session;
});

function getDashboard(role: string): string {
  if (role === 'admin') return '/';
  if (role === 'teacher') return '/teacher/profile';
  return '/student/profile';
}

export async function requireRole(...roles: string[]) {
  const session = await verifySession();

  if (!session) {
    redirect('/sign-in');
  }

  if (!roles.includes(session.role)) {
    redirect(getDashboard(session.role));
  }

  return session;
}
