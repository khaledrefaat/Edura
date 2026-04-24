import { Video } from 'lucide-react';

const sessions = [
  {
    id: '1',
    courseTitle: 'Advanced Mathematics',
    teacher: 'Dr. Sarah Johnson',
    date: 'Today',
    time: '10:00 AM - 11:30 AM',
    zoomLink: 'https://zoom.us/j/123456789',
  },
  {
    id: '2',
    courseTitle: 'Computer Science 101',
    teacher: 'Prof. Michael Chen',
    date: 'Tomorrow',
    time: '9:00 AM - 10:30 AM',
    zoomLink: 'https://zoom.us/j/123456789',
  },
  {
    id: '3',
    courseTitle: 'Physics Laboratory',
    teacher: 'Prof. Michael Chen',
    date: 'Tomorrow',
    time: '11:30 AM - 1:00 PM',
    zoomLink: 'https://zoom.us/j/123456789',
  },
  {
    id: '4',
    courseTitle: 'English Literature',
    teacher: 'Ms. Emily Davis',
    date: 'Wednesday',
    time: '2:00 PM - 3:30 PM',
    zoomLink: 'https://zoom.us/j/123456789',
  },
  {
    id: '5',
    courseTitle: 'Advanced Mathematics',
    teacher: 'Dr. Sarah Johnson',
    date: 'Friday',
    time: '10:00 AM - 11:30 AM',
    zoomLink: 'https://zoom.us/j/123456789',
  },
];

export function UpcomingSessions() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl mb-6">Upcoming Sessions</h2>
      <div className="space-y-3">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-[#D4AF37] transition-colors"
          >
            <div>
              <h3 className="font-medium text-gray-900 mb-1">
                {session.courseTitle}
              </h3>
              <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600">
                <span className="px-2 py-1 bg-[#D4AF37]/10 text-[#D4AF37] rounded-md">
                  {session.date}
                </span>
                <span>{session.time}</span>
                <span>&bull;</span>
                <span>{session.teacher}</span>
              </div>
            </div>
            <a
              href={session.zoomLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 bg-[#D4AF37] text-white rounded-lg hover:bg-[#B8941F] transition-colors text-sm"
            >
              <Video className="w-4 h-4" />
              Join
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
