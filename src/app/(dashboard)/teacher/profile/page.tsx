import { requireRole } from "@/lib/dal";
import { CalendarSection } from "./components/CalendarSection";
import { MyCourses } from "./components/MyCourses";
import { ProfileHeader } from "./components/ProfileHeader";
import { StatsCards } from "./components/StatsCards";
import { TeachingSchedule } from "./components/TeachingSchedule";

export default async function Page() {
  await requireRole("teacher");
  return (
    <div className="space-y-6">
      <ProfileHeader />
      <StatsCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TeachingSchedule />
        <MyCourses />
      </div>
      <CalendarSection />
    </div>
  );
}
