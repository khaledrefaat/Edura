import { Suspense } from "react";
import FiltersBar from "@/components/common/FiltersBar";
import { getUsers } from "@/lib/dal";
import AddUserModal from "./components/AddUserModal";
import UsersTable from "./components/UsersTable";
import FiltersBarSkeleton from "@/components/skeleton/FiltersBarSkeleton";
import TableSkeleton from "@/components/skeleton/TableSkeleton";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function page({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search ?? "";
  const filterRole = params.role ?? "All";
  const currentPage = Number(params.page) || 1;
  const itemsPerPage = 10;

  const { users, total } = await getUsers({
    search,
    role: filterRole,
    page: currentPage,
    itemsPerPage,
  });

  return (
    <div className="space-y-6">
      <div className="absolute top-6 right-6">
        <AddUserModal />
      </div>

      {/* Filters and Search */}
      <Suspense fallback={<FiltersBarSkeleton />}>
        <FiltersBar
          searchPlaceholder="Search by name or email..."
          filterKey="role"
          filterOptions={[
            { value: "All", label: "All Roles" },
            { value: "teacher", label: "Teachers" },
            { value: "student", label: "Students" },
          ]}
        />
      </Suspense>

      {/* Users Table */}
      <Suspense fallback={<TableSkeleton />}>
        <UsersTable
          users={users}
          totalItems={total}
          itemsPerPage={itemsPerPage}
        />
      </Suspense>
    </div>
  );
}
