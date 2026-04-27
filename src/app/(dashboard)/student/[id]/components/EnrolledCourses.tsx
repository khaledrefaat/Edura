interface EnrolledCourse {
  id: string;
  title: string;
  teacher: string;
  schedule: string;
}

interface EnrolledCoursesProps {
  courses: EnrolledCourse[];
}

export function EnrolledCourses({ courses }: EnrolledCoursesProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <h2 className="text-2xl mb-6">Enrolled Courses</h2>
      <div className="space-y-3">
        {courses.map((course) => (
          <div
            key={course.id}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-[#D4AF37] transition-colors"
          >
            <div>
              <h3 className="font-medium text-gray-900 mb-1">{course.title}</h3>
              <p className="text-sm text-gray-600">
                {course.teacher} &bull; {course.schedule}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
