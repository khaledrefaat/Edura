import { BookOpen, Mail, Phone } from 'lucide-react';

interface TeacherProfileHeaderProps {
  teacher: {
    name: string;
    email: string;
    contactInfo: string;
    status: string;
    courseCount: number;
  };
}

export function TeacherProfileHeader({ teacher }: TeacherProfileHeaderProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <div className="flex items-start gap-6">
        <div className="w-24 h-24 bg-[#D4AF37] rounded-full flex items-center justify-center text-white text-4xl">
          {teacher.name.charAt(0)}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl">{teacher.name}</h1>
            <span className="px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-700">
              Teacher
            </span>
            <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
              {teacher.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex items-center gap-2 text-gray-700">
              <Mail className="w-4 h-4 text-[#D4AF37]" />
              <span>{teacher.email}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Phone className="w-4 h-4 text-[#D4AF37]" />
              <span>{teacher.contactInfo}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <BookOpen className="w-4 h-4 text-[#D4AF37]" />
              <span>{teacher.courseCount} Teaching Courses</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
