import { requireRole } from '@/lib/dal';

export default async function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole('teacher', 'admin');
  return children;
}
