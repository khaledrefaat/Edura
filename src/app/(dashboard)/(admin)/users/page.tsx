'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import users from '@/DUMMY_DATA/USERS';
import AddUserModal from './components/AddUserModal';
import UsersFilters from './components/UsersFilters';
import UsersTable from './components/UsersTable';

function UserManagementContent() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('search') ?? '';
  const filterRole = searchParams.get('role') ?? 'All';
  const currentPage = Number(searchParams.get('page')) || 1;
  const itemsPerPage = 5;

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterRole === 'All' || user.role === filterRole;
    return matchesSearch && matchesFilter;
  });

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">User Management</h1>
          <p className="text-gray-600">
            Manage teachers and students in the system
          </p>
        </div>
        <div className="flex gap-3">
          <AddUserModal />
        </div>
      </div>

      {/* Filters and Search */}
      <UsersFilters />

      {/* Users Table */}
      <UsersTable
        users={paginatedUsers}
        totalItems={filteredUsers.length}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}

export default function UserManagement() {
  return (
    <Suspense
      fallback={<div className="p-8 text-center">Loading users...</div>}
    >
      <UserManagementContent />
    </Suspense>
  );
}
