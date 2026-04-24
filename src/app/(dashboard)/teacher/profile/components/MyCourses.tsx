import { BookOpen } from 'lucide-react';

const myCourses = [
  {
    id: 1,
    title: 'Advanced Mathematics',
    students: 24,
    type: 'Group',
    schedule: 'Mon, Wed, Fri - 10:00 AM',
    completion: 65,
  },
  {
    id: 2,
    title: 'Private Tutoring - Algebra',
    students: 1,
    type: 'Private',
    schedule: 'Flexible',
    completion: 40,
  },
  {
    id: 3,
    title: 'Calculus Workshop',
    students: 18,
    type: 'Group',
    schedule: 'Wed - 1:00 PM',
    completion: 75,
  },
  {
    id: 4,
    title: 'Statistics Fundamentals',
    students: 22,
    type: 'Group',
    schedule: 'Tue, Thu - 3:00 PM',
    completion: 50,
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
        {myCourses.map((course) => (
          <div
            key={course.id}
            className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm">{course.title}</h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      course.type === 'Group'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-purple-100 text-purple-700'
                    }`}
                  >
                    {course.type}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-1">
                  {course.schedule}
                </p>
                <p className="text-xs text-gray-500">
                  {course.students} student
                  {course.students !== 1 ? 's' : ''} enrolled
                </p>
              </div>
              <span className="text-xs text-[#D4AF37] px-2 py-1 bg-[#D4AF37]/10 rounded-md">
                {course.completion}%
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden mb-3">
              <div
                className="bg-[#D4AF37] h-full rounded-full transition-all duration-300"
                style={{ width: `${course.completion}%` }}
              />
            </div>

            <button
              className="w-full py-2 border border-[#D4AF37] text-[#D4AF37] rounded-lg hover:bg-[#D4AF37] hover:text-white transition-colors text-sm"
              type="button"
            >
              Manage Course
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
