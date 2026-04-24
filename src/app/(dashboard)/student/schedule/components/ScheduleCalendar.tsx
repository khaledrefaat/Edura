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
  if (dateString === 'Thursday') {
    const thursday = new Date(today);
    const daysUntilThursday = (4 - today.getDay() + 7) % 7 || 7;
    thursday.setDate(thursday.getDate() + daysUntilThursday);
    return thursday;
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
    teacher: 'Dr. Sarah Johnson',
  },
  {
    id: '2',
    title: 'Computer Science 101',
    date: getCalendarDate('Tomorrow'),
    startTime: '9:00 AM',
    endTime: '10:30 AM',
    zoomLink: 'https://zoom.us/j/123456789',
    teacher: 'Prof. Michael Chen',
  },
  {
    id: '3',
    title: 'Physics Laboratory',
    date: getCalendarDate('Tomorrow'),
    startTime: '11:30 AM',
    endTime: '1:00 PM',
    zoomLink: 'https://zoom.us/j/123456789',
    teacher: 'Prof. Michael Chen',
  },
  {
    id: '4',
    title: 'Advanced Mathematics',
    date: getCalendarDate('Wednesday'),
    startTime: '10:00 AM',
    endTime: '11:30 AM',
    zoomLink: 'https://zoom.us/j/123456789',
    teacher: 'Dr. Sarah Johnson',
  },
  {
    id: '5',
    title: 'English Literature',
    date: getCalendarDate('Wednesday'),
    startTime: '2:00 PM',
    endTime: '3:30 PM',
    zoomLink: 'https://zoom.us/j/123456789',
    teacher: 'Ms. Emily Davis',
  },
  {
    id: '6',
    title: 'Advanced Mathematics',
    date: getCalendarDate('Friday'),
    startTime: '10:00 AM',
    endTime: '11:30 AM',
    zoomLink: 'https://zoom.us/j/123456789',
    teacher: 'Dr. Sarah Johnson',
  },
];

export function ScheduleCalendar() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-6">
        <CalendarIcon className="w-5 h-5 text-[#D4AF37]" />
        <h2 className="text-xl">Class Calendar</h2>
      </div>
      <Calendar events={calendarEvents} userRole="student" />
    </div>
  );
}
