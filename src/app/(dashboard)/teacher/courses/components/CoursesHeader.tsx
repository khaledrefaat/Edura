import { Plus } from 'lucide-react';

interface CoursesHeaderProps {
  onCreateCourse: () => void;
}

export function CoursesHeader({ onCreateCourse }: CoursesHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl mb-2">Course Management</h1>
        <p className="text-gray-600">Manage all courses and class schedules</p>
      </div>
      <button
        onClick={onCreateCourse}
        className="flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-white rounded-xl hover:bg-[#B8941F] transition-all shadow-md hover:shadow-lg"
        type="button"
      >
        <Plus className="w-5 h-5" />
        Create Course
      </button>
    </div>
  );
}
