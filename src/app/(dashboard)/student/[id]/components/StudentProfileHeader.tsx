import { Mail, Phone, Calendar, BookOpen } from 'lucide-react';

interface StudentProfileHeaderProps {
  student: {
    name: string;
    email: string;
    contactInfo: string;
    dateOfBirth: string;
    status: string;
    enrolledCourses: number;
  };
}

export function StudentProfileHeader({ student }: StudentProfileHeaderProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <div className="flex items-start gap-6">
        <div className="w-24 h-24 bg-[#D4AF37] rounded-full flex items-center justify-center text-white text-4xl">
          {student.name.charAt(0)}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl">{student.name}</h1>
            <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
              Student
            </span>
            <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
              {student.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex items-center gap-2 text-gray-700">
              <Mail className="w-4 h-4 text-[#D4AF37]" />
              <span>{student.email}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Phone className="w-4 h-4 text-[#D4AF37]" />
              <span>{student.contactInfo}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Calendar className="w-4 h-4 text-[#D4AF37]" />
              <span>Born: {formatDate(student.dateOfBirth)}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <BookOpen className="w-4 h-4 text-[#D4AF37]" />
              <span>{student.enrolledCourses} Enrolled Courses</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
