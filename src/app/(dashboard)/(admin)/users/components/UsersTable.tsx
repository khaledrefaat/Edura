'use client';

import { CheckCircle, Eye, Mail, XCircle } from 'lucide-react';
import TableCell from '@/components/common/TableCell';
import TableHeadCell from '@/components/common/TableHeadCell';
import TablePagination from '@/components/table-pagination';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableHeader, TableRow } from '@/components/ui/table';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  enrolledCourses?: number;
  contactInfo: string;
  dateOfBirth?: string;
};

export default function UsersTable({
  users,
  totalItems,
  itemsPerPage,
}: {
  users: User[];
  totalItems: number;
  itemsPerPage: number;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow className="hover:bg-gray-50">
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Role</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Details</TableHeadCell>
            <TableHeadCell className="text-center">Actions</TableHeadCell>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-100">
          {users.map((user) => (
            <TableRow
              key={user.id}
              className="hover:bg-gray-50 transition-colors"
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center text-white">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-sm">{user.name}</span>
                </div>
              </TableCell>
              <TableCell className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {user.email}
              </TableCell>
              <TableCell>
                <CustomBadge text={user.role} type={user.role} />
              </TableCell>
              <TableCell>
                <ActiveCell text={user.status} />
              </TableCell>
              <TableCell className="text-sm text-gray-600">
                {user.enrolledCourses !== undefined && (
                  <span>{user.enrolledCourses} courses</span>
                )}
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center">
                  <button
                    className="p-2 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white rounded-lg transition-all"
                    title="View profile"
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
        label="users"
      />
    </div>
  );
}

function CustomBadge({ text, type }: { text: string; type: string }) {
  return (
    <Badge
      className={`${
        type === 'Student'
          ? 'bg-blue-100 text-blue-700'
          : type === 'Admin'
            ? 'bg-red-100 text-red-700'
            : 'bg-purple-100 text-purple-700'
      }`}
    >
      {text}
    </Badge>
  );
}

function ActiveCell({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      {text === 'Active' ? (
        <>
          <CheckCircle className="size-4 text-green-500" />
          <span className="text-sm text-green-600">Active</span>
        </>
      ) : (
        <>
          <XCircle className="size-4 text-red-500" />
          <span className="text-sm text-red-600">Inactive</span>
        </>
      )}
    </div>
  );
}
