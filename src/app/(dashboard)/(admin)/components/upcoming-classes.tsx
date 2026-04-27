import { Calendar } from "lucide-react";

const upcomingClasses = [
  {
    id: 1,
    title: "Advanced Mathematics",
    teacher: "Dr. Sarah Johnson",
    time: "10:00 AM",
    students: 24,
  },
  {
    id: 2,
    title: "Physics Laboratory",
    teacher: "Prof. Michael Chen",
    time: "11:30 AM",
    students: 18,
  },
  {
    id: 3,
    title: "English Literature",
    teacher: "Ms. Emily Davis",
    time: "2:00 PM",
    students: 30,
  },
];

function ClassCard({
  classItem,
}: {
  classItem: (typeof upcomingClasses)[number];
}) {
  return (
    <div className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-sm">{classItem.title}</h3>
        <span className="px-3 py-1 bg-[#D4AF37] text-white text-xs rounded-full">
          {classItem.time}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-1">{classItem.teacher}</p>
      <p className="text-xs text-gray-500">
        {classItem.students} students enrolled
      </p>
    </div>
  );
}

export function UpcomingClasses() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-[#D4AF37]" />
        <h2 className="text-xl">Upcoming Classes</h2>
      </div>
      <div className="space-y-4">
        {upcomingClasses.map((classItem) => (
          <ClassCard key={classItem.id} classItem={classItem} />
        ))}
      </div>
    </div>
  );
}
