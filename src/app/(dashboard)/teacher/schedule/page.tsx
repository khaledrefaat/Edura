import { ScheduleCalendar } from './components/ScheduleCalendar';
import { ScheduleHeader } from './components/ScheduleHeader';
import { UpcomingSessions } from './components/UpcomingSessions';

export default function Page() {
  return (
    <div className="space-y-6">
      <ScheduleHeader />
      <ScheduleCalendar />
      <UpcomingSessions />
    </div>
  );
}
