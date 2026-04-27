import { TeacherNotes } from "./components/TeacherNotes";
import { TeacherProfileHeader } from "./components/TeacherProfileHeader";
import { TeachingCourses } from "./components/TeachingCourses";

const teacher = {
  name: "Dr. Sarah Johnson",
  email: "sarah.johnson@edu.com",
  contactInfo: "+1 (555) 001-0001",
  status: "Active",
  courseCount: 2,
};

const teachingCourses = [
  {
    id: "1",
    title: "Advanced Mathematics",
    students: 24,
    schedule: "Mon, Wed, Fri - 10:00 AM",
  },
  {
    id: "4",
    title: "Private Tutoring - Algebra",
    students: 1,
    schedule: "Flexible",
  },
];

const notes =
  "Excellent teacher with strong communication skills. Very popular among students.";

export default function Page() {
  return (
    <div className="space-y-6">
      <TeacherProfileHeader teacher={teacher} />
      <TeachingCourses courses={teachingCourses} />
      <TeacherNotes initialNotes={notes} />
    </div>
  );
}
