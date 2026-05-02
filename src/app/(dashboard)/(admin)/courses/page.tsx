import { Suspense } from "react";
import FiltersBar from "@/components/common/FiltersBar";
import { getCourses } from "@/lib/dal";
import AddCoursesModal from "./components/AddCoursesModal";
import CoursesTable from "./components/CoursesTable";
import FiltersBarSkeleton from "@/components/skeleton/FiltersBarSkeleton";
import TableSkeleton from "@/components/skeleton/TableSkeleton";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function page({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search ?? "";
  const filterType = params.type ?? "All";
  const currentPage = Number(params.page) || 1;
  const itemsPerPage = 10;

  const { courses, total } = await getCourses({
    search,
    type: filterType,
    page: currentPage,
    itemsPerPage,
  });

  return (
    <div className="space-y-6">
      <div className="flex gap-3 absolute top-6 right-6">
        <AddCoursesModal />
      </div>

      <Suspense fallback={<FiltersBarSkeleton />}>
      {/* Filters and Search */}
      <FiltersBar
        searchPlaceholder="Search courses by teacher..."
        filterKey="type"
        filterOptions={[
          { value: "All", label: "All Courses" },
          { value: "group", label: "Group" },
          { value: "private", label: "Private" },
        ]}
      />
      </Suspense>

      {/* Courses Table */}
      <Suspense fallback={<TableSkeleton />}>
      <CoursesTable
        courses={courses}
        totalItems={total}
        itemsPerPage={itemsPerPage}
      />
      </Suspense>
    </div>
  );
}