"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import FiltersBar from "@/components/common/FiltersBar";
import courses from "@/DUMMY_DATA/COURSES";
import AddCoursesModal from "./components/AddCoursesModal";
import CoursesTable from "./components/CoursesTable";

function CourseManagementContent() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") ?? "";
  const filterType = searchParams.get("type") ?? "All";
  const currentPage = Number(searchParams.get("page")) || 1;
  const itemsPerPage = 5;

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "All" || course.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Course Management</h1>
          <p className="text-gray-600">
            Manage all courses and class schedules
          </p>
        </div>
        <div className="flex gap-3">
          <AddCoursesModal />
        </div>
      </div>

      {/* Filters and Search */}
      <FiltersBar
        searchPlaceholder="Search courses by title or teacher..."
        filterKey="type"
        filterOptions={[
          { value: "All", label: "All Courses" },
          { value: "Group", label: "Group" },
          { value: "Private", label: "Private" },
        ]}
      />

      {/* Courses Table */}
      <CoursesTable
        courses={paginatedCourses}
        totalItems={filteredCourses.length}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}

export default function CourseManagement() {
  return (
    <Suspense
      fallback={<div className="p-8 text-center">Loading courses...</div>}
    >
      <CourseManagementContent />
    </Suspense>
  );
}
