"use client";

import { useState } from "react";
import { CoursesFilters } from "./components/CoursesFilters";
import { CoursesTable } from "./components/CoursesTable";

interface Course {
  id: string;
  title: string;
  description: string;
  type: "Group" | "Private";
  teacher: string;
  students: number;
  schedule: string;
}

const initialCourses: Course[] = [
  {
    id: "1",
    title: "Advanced Mathematics",
    description: "Calculus and advanced mathematical concepts",
    type: "Group",
    teacher: "Dr. Sarah Johnson",
    students: 24,
    schedule: "Mon, Wed, Fri - 10:00 AM",
  },
  {
    id: "2",
    title: "Physics Laboratory",
    description: "Hands-on physics experiments and theory",
    type: "Group",
    teacher: "Prof. Michael Chen",
    students: 18,
    schedule: "Tue, Thu - 11:30 AM",
  },
  {
    id: "3",
    title: "English Literature",
    description: "Classic and contemporary literary analysis",
    type: "Group",
    teacher: "Ms. Emily Davis",
    students: 30,
    schedule: "Mon, Wed - 2:00 PM",
  },
  {
    id: "4",
    title: "Private Tutoring - Algebra",
    description: "One-on-one algebra tutoring sessions",
    type: "Private",
    teacher: "Dr. Sarah Johnson",
    students: 1,
    schedule: "Flexible",
  },
  {
    id: "5",
    title: "Computer Science 101",
    description: "Introduction to programming and algorithms",
    type: "Group",
    teacher: "Prof. Michael Chen",
    students: 28,
    schedule: "Tue, Thu - 9:00 AM",
  },
  {
    id: "6",
    title: "Private Chemistry Sessions",
    description: "Personalized chemistry instruction",
    type: "Private",
    teacher: "Ms. Emily Davis",
    students: 1,
    schedule: "Flexible",
  },
];

export default function Page() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"All" | "Group" | "Private">(
    "All",
  );

  const filteredCourses = initialCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "All" || course.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <CoursesFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterType={filterType}
        onFilterChange={setFilterType}
      />
      <CoursesTable courses={filteredCourses} />
    </div>
  );
}
