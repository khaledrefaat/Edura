"use client";

import { BookOpen, Eye } from "lucide-react";
import TableCell from "@/components/common/TableCell";
import TableHeadCell from "@/components/common/TableHeadCell";
import TablePagination from "@/components/common/TablePagination";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableHeader, TableRow } from "@/components/ui/table";

type Course = {
  id: string;
  title: string;
  description: string;
  type: string;
  teacher: string;
  students: number;
  schedule: string;
};

export default function CoursesTable({
  courses,
  totalItems,
  itemsPerPage,
}: {
  courses: Course[];
  totalItems: number;
  itemsPerPage: number;
}) {
  if (courses.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
        <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg text-gray-600 mb-2">No courses found</h3>
        <p className="text-sm text-gray-500">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow className="hover:bg-gray-50">
            <TableHeadCell>Course Title</TableHeadCell>
            <TableHeadCell>Type</TableHeadCell>
            <TableHeadCell>Teacher</TableHeadCell>
            <TableHeadCell>Students</TableHeadCell>
            <TableHeadCell>Schedule</TableHeadCell>
            <TableHeadCell className="text-center">Actions</TableHeadCell>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-100">
          {courses.map((course) => (
            <TableRow
              key={course.id}
              className="hover:bg-gray-50 transition-colors"
            >
              <TableCell>
                <div>
                  <div className="text-gray-900 mb-1">{course.title}</div>
                  <div className="text-sm text-gray-500 line-clamp-1">
                    {course.description}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <TypeBadge type={course.type} />
              </TableCell>
              <TableCell>{course.teacher}</TableCell>
              <TableCell>{course.students}</TableCell>
              <TableCell>{course.schedule}</TableCell>
              <TableCell>
                <div className="flex items-center justify-center">
                  <button
                    className="p-2 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white rounded-lg transition-all"
                    title="View course details"
                    type="button"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        label="courses"
      />
    </div>
  );
}

function TypeBadge({ type }: { type: string }) {
  return (
    <Badge
      className={
        type === "Group"
          ? "bg-blue-100 text-blue-700"
          : "bg-purple-100 text-purple-700"
      }
    >
      {type}
    </Badge>
  );
}
