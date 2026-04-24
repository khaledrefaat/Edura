import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/common/Calendar';

const getCalendarDate = (dateString: string) => {
  const today = new Date();
  if (dateString === 'Today') return today;
  if (dateString === 'Tomorrow') {
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  }
  if (dateString === 'Wednesday') {
    const wednesday = new Date(today);
    const daysUntilWednesday = (3 - today.getDay() + 7) % 7 || 7;
    wednesday.setDate(wednesday.getDate() + daysUntilWednesday);
    return wednesday;
  }
  if (dateString === 'Friday') {
    const friday = new Date(today);
    const daysUntilFriday = (5 - today.getDay() + 7) % 7 || 7;
    friday.setDate(friday.getDate() + daysUntilFriday);
    return friday;
  }
  return today;
};

const calendarEvents = [
  {
    id: '1',
    title: 'Advanced Mathematics',
    date: getCalendarDate('Today'),
    startTime: '10:00 AM',
    endTime: '11:30 AM',
    zoomLink: 'https://zoom.us/j/123456789',
    students: 24,
  },
  {
    id: '2',
    title: 'Private Tutoring - Algebra',
    date: getCalendarDate('Today'),
    startTime: '3:00 PM',
    endTime: '4:00 PM',
    zoomLink: 'https://zoom.us/j/987654321',
    students: 1,
  },
  {
    id: '3',
    title: 'Advanced Mathematics',
    date: getCalendarDate('Tomorrow'),
    startTime: '10:00 AM',
    endTime: '11:30 AM',
    zoomLink: 'https://zoom.us/j/123456789',
    students: 24,
  },
  {
    id: '4',
    title: 'Private Tutoring - Algebra',
    date: getCalendarDate('Wednesday'),
    startTime: '3:00 PM',
    endTime: '4:00 PM',
    zoomLink: 'https://zoom.us/j/987654321',
    students: 1,
  },
  {
    id: '5',
    title: 'Calculus Workshop',
    date: getCalendarDate('Friday'),
    startTime: '1:00 PM',
    endTime: '2:30 PM',
    zoomLink: 'https://zoom.us/j/teacher789',
    students: 18,
  },
];

export function ScheduleCalendar() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-6">
        <CalendarIcon className="w-5 h-5 text-[#D4AF37]" />
        <h2 className="text-xl">Teaching Calendar</h2>
      </div>
      <Calendar events={calendarEvents} userRole="teacher" />
    </div>
  );
}
