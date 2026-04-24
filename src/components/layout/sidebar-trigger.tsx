'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

const pageHeaders = {
  '/': {
    title: 'Dashboard',
    description: "Welcome back! Here's what's happening today.",
  },
  '/users': {
    title: 'User Management',
    description: 'Manage teachers and students in the system',
  },
  '/courses': {
    title: 'Course Management',
    description: 'Manage all courses and class schedules',
  },
  '/student/profile': {
    title: 'Profile',
    description: 'Manage your profile',
  },
  '/student/schedule': {
    title: 'My Schedule',
    description: 'View all your upcoming classes',
  },
  '/teacher/profile': {
    title: 'Profile',
    description: 'Manage your profile',
  },
  '/teacher/schedule': {
    title: 'My Teaching Schedule',
    description: 'View all your teaching sessions',
  },
  '/teacher/courses': {
    title: 'Course Management',
    description: 'Manage all courses and class schedules',
  },
};

function matchPath(pathname: string) {
  // Sort by longest path first so more specific routes match before shorter ones
  const sorted = Object.entries(pageHeaders).sort(
    ([a], [b]) => b.length - a.length,
  );
  for (const [path, header] of sorted) {
    if (pathname === path || pathname.startsWith(`${path}/`)) {
      return header;
    }
  }
  return null;
}

interface DashboardTitleProps {
  children: ReactNode;
}

export default function DashboardTitle({ children }: DashboardTitleProps) {
  const pathname = usePathname();
  const matched = matchPath(pathname);

  return (
    <div className="flex gap-x-4 mb-4 w-full border-b border-primary pb-4">
      {children}
      <div>
        <h1 className="text-3xl">
          {matched?.title || 'Dashboard'}
        </h1>
        {matched?.description && (
          <p className="text-gray-600">{matched.description}</p>
        )}
      </div>
    </div>
  );
}
