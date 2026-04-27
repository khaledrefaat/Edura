import { requireRole } from '@/lib/dal';
import { MyCourses } from "./components/MyCourses";
import { StudentProfileHeader } from "./components/StudentProfileHeader";
import { StudentStatsCards } from "./components/StudentStatsCards";
import { UpcomingClasses } from "./components/UpcomingClasses";

export default async function Page() {
  await requireRole('student');
  return (
    <div className="space-y-6">
      <StudentProfileHeader />
      <StudentStatsCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingClasses />
        <MyCourses />
      </div>
    </div>
  );
}
