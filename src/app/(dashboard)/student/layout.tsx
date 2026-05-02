import { requireRole } from "@/lib/dal";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole("student", "admin");
  return children;
}
