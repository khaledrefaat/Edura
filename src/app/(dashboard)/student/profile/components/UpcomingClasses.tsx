import { Calendar, Video } from "lucide-react";

const schedule = [
  {
    id: 1,
    course: "Advanced Mathematics",
    teacher: "Dr. Sarah Johnson",
    date: "Today",
    time: "10:00 AM - 11:30 AM",
    zoomLink: "https://zoom.us/j/123456789",
  },
  {
    id: 2,
    course: "Physics Laboratory",
    teacher: "Prof. Michael Chen",
    date: "Today",
    time: "2:00 PM - 3:30 PM",
    zoomLink: "https://zoom.us/j/987654321",
  },
  {
    id: 3,
    course: "English Literature",
    teacher: "Ms. Emily Davis",
    date: "Tomorrow",
    time: "9:00 AM - 10:30 AM",
    zoomLink: "https://zoom.us/j/456789123",
  },
  {
    id: 4,
    course: "Computer Science 101",
    teacher: "Prof. Michael Chen",
    date: "Tomorrow",
    time: "11:00 AM - 12:30 PM",
    zoomLink: "https://zoom.us/j/321654987",
  },
];

export function UpcomingClasses() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-5 h-5 text-[#D4AF37]" />
        <h2 className="text-xl">Upcoming Classes</h2>
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
                <p className="text-xs text-gray-600 mb-2">
                  {classItem.teacher}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="px-2 py-1 bg-[#D4AF37]/10 text-[#D4AF37] rounded-md">
                    {classItem.date}
                  </span>
                  <span>{classItem.time}</span>
                </div>
              </div>
            </div>
            <a
              href={classItem.zoomLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#D4AF37] text-white rounded-lg hover:bg-[#B8941F] transition-colors text-sm"
            >
              <Video className="w-4 h-4" />
              Join Zoom Meeting
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
