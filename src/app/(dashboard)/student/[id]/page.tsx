import { EnrolledCourses } from './components/EnrolledCourses';
import { StudentNotes } from './components/StudentNotes';
import { StudentProfileHeader } from './components/StudentProfileHeader';

const student = {
  name: 'John Smith',
  email: 'john.smith@student.edu',
  contactInfo: '+1 (555) 100-0001',
  dateOfBirth: '2005-03-15',
  status: 'Active',
  enrolledCourses: 5,
};

const enrolledCourses = [
  {
    id: '1',
    title: 'Advanced Mathematics',
    teacher: 'Dr. Sarah Johnson',
    schedule: 'Mon, Wed, Fri - 10:00 AM',
  },
  {
    id: '2',
    title: 'Physics Laboratory',
    teacher: 'Prof. Michael Chen',
    schedule: 'Tue, Thu - 11:30 AM',
  },
  {
    id: '3',
    title: 'English Literature',
    teacher: 'Ms. Emily Davis',
    schedule: 'Mon, Wed - 2:00 PM',
  },
  {
    id: '5',
    title: 'Computer Science 101',
    teacher: 'Prof. Michael Chen',
    schedule: 'Tue, Thu - 9:00 AM',
  },
  {
    id: '4',
    title: 'Private Tutoring - Algebra',
    teacher: 'Dr. Sarah Johnson',
    schedule: 'Flexible',
  },
];

const notes =
  'Student is performing well in Mathematics. Shows great improvement in recent weeks.';

export default function Page() {
  return (
    <div className="space-y-6">
      <StudentProfileHeader student={student} />
      <EnrolledCourses courses={enrolledCourses} />
      <StudentNotes initialNotes={notes} />
    </div>
  );
}
