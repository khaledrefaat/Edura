import { BookOpen, Eye } from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  type: "Group" | "Private";
  teacher: string;
  students: number;
  schedule: string;
}

interface CoursesTableProps {
  courses: Course[];
  onViewCourse?: (courseId: string) => void;
}

export function CoursesTable({ courses, onViewCourse }: CoursesTableProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm text-gray-600">
                Course Title
              </th>
              <th className="px-6 py-4 text-left text-sm text-gray-600">
                Type
              </th>
              <th className="px-6 py-4 text-left text-sm text-gray-600">
                Teacher
              </th>
              <th className="px-6 py-4 text-left text-sm text-gray-600">
                Students
              </th>
              <th className="px-6 py-4 text-left text-sm text-gray-600">
                Schedule
              </th>
              <th className="px-6 py-4 text-center text-sm text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {courses.map((course) => (
              <tr
                key={course.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div>
                    <div className="text-gray-900 mb-1">{course.title}</div>
                    <div className="text-sm text-gray-500 line-clamp-1">
                      {course.description}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      course.type === "Group"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    {course.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-700">{course.teacher}</td>
                <td className="px-6 py-4 text-gray-700">{course.students}</td>
                <td className="px-6 py-4 text-gray-700">{course.schedule}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onViewCourse?.(course.id)}
                      className="p-2 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white rounded-lg transition-all"
                      title="View course details"
                      type="button"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {courses.length === 0 && (
        <div className="p-12 text-center">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg text-gray-600 mb-2">No courses found</h3>
          <p className="text-sm text-gray-500">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
}
