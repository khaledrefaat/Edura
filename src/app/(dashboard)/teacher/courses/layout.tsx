import { requireRole } from "@/lib/dal";

export default async function TeacherCoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole("teacher");
  return children;
}
