import { CalendarIcon, Users, Video } from 'lucide-react';
import Link from 'next/link';

const schedule = [
  {
    id: 1,
    course: 'Advanced Mathematics',
    date: 'Today',
    time: '10:00 AM - 11:30 AM',
    students: 24,
    room: 'Room A-101',
    zoomLink: 'https://zoom.us/j/teacher123',
    status: 'upcoming',
  },
  {
    id: 2,
    course: 'Private Tutoring - Algebra',
    date: 'Today',
    time: '2:00 PM - 3:00 PM',
    students: 1,
    room: 'Online',
    zoomLink: 'https://zoom.us/j/teacher456',
    status: 'upcoming',
  },
  {
    id: 3,
    course: 'Advanced Mathematics',
    date: 'Tomorrow',
    time: '10:00 AM - 11:30 AM',
    students: 24,
    room: 'Room A-101',
    zoomLink: 'https://zoom.us/j/teacher123',
    status: 'scheduled',
  },
  {
    id: 4,
    course: 'Calculus Workshop',
    date: 'Wednesday',
    time: '1:00 PM - 2:30 PM',
    students: 18,
    room: 'Room B-205',
    zoomLink: 'https://zoom.us/j/teacher789',
    status: 'scheduled',
  },
];

export function TeachingSchedule() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-6">
        <CalendarIcon className="w-5 h-5 text-[#D4AF37]" />
        <h2 className="text-xl">Teaching Schedule</h2>
      </div>

      <div className="space-y-4">
        {schedule.map((classItem) => (
          <div
            key={classItem.id}
            className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-[#D4AF37] transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-sm mb-1">{classItem.course}</h3>
                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600 mb-2">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {classItem.students} student
                    {classItem.students !== 1 ? 's' : ''}
                  </span>
                  <span>•</span>
                  <span>{classItem.room}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="px-2 py-1 bg-[#D4AF37]/10 text-[#D4AF37] rounded-md">
                    {classItem.date}
                  </span>
                  <span>{classItem.time}</span>
                </div>
              </div>
            </div>

            <Link
              href={classItem.zoomLink}
              target="_blank"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#D4AF37] text-white rounded-lg hover:bg-[#B8941F] transition-colors text-sm"
            >
              <Video className="w-4 h-4" />
              Start Zoom Class
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
