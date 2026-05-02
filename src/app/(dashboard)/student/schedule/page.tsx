import { requireRole } from "@/lib/dal";
import { ScheduleCalendar } from "./components/ScheduleCalendar";
import { ScheduleHeader } from "./components/ScheduleHeader";
import { UpcomingSessions } from "./components/UpcomingSessions";

export default async function Page() {
  await requireRole("student");
  return (
    <div className="space-y-6">
      <ScheduleHeader />
      <ScheduleCalendar />
      <UpcomingSessions />
    </div>
  );
}
