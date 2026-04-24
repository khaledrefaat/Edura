import { BookOpen } from 'lucide-react';

const enrolledCourses = [
  {
    id: 1,
    title: 'Advanced Mathematics',
    progress: 75,
    nextClass: 'Today, 10:00 AM',
  },
  {
    id: 2,
    title: 'Physics Laboratory',
    progress: 60,
    nextClass: 'Today, 2:00 PM',
  },
  {
    id: 3,
    title: 'English Literature',
    progress: 85,
    nextClass: 'Tomorrow, 9:00 AM',
  },
  {
    id: 4,
    title: 'Computer Science 101',
    progress: 50,
    nextClass: 'Tomorrow, 11:00 AM',
  },
  {
    id: 5,
    title: 'Chemistry Basics',
    progress: 40,
    nextClass: 'Wednesday, 3:00 PM',
  },
];

export function MyCourses() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="w-5 h-5 text-[#D4AF37]" />
        <h2 className="text-xl">My Courses</h2>
      </div>
      <div className="space-y-4">
        {enrolledCourses.map((course) => (
          <div key={course.id} className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-sm mb-1">{course.title}</h3>
                <p className="text-xs text-gray-500">
                  Next: {course.nextClass}
                </p>
              </div>
              <span className="text-xs text-[#D4AF37] px-2 py-1 bg-[#D4AF37]/10 rounded-md">
                {course.progress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#D4AF37] h-full rounded-full transition-all duration-300"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
