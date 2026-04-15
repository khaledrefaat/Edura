'use client';

import {
  BookOpen,
  Calendar,
  LayoutDashboard,
  UserCircle,
  Users,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

interface SidebarNavProps {
  userRole: UserRole;
}

const adminMenuItems = [
  { id: 'dashboard', href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'users', href: '/users', label: 'User Management', icon: Users },
  {
    id: 'courses',
    href: '/courses',
    label: 'Course Management',
    icon: BookOpen,
  },
];

const teacherMenuItems = [
  {
    id: 'teacher-profile',
    href: '/teacher/profile',
    label: 'My Profile',
    icon: UserCircle,
  },
  {
    id: 'teacher-schedule-page',
    href: '/teacher/schedule',
    label: 'My Schedule',
    icon: Calendar,
  },
  { id: 'courses', href: '/courses', label: 'My Courses', icon: BookOpen },
];

const studentMenuItems = [
  {
    id: 'student-profile',
    href: '/student/profile',
    label: 'My Profile',
    icon: UserCircle,
  },
  {
    id: 'student-schedule-page',
    href: '/student/schedule',
    label: 'My Schedule',
    icon: Calendar,
  },
  {
    id: 'student-calendar',
    href: '/student/calendar',
    label: 'Class Calendar',
    icon: Calendar,
  },
];

export default function SidebarNav({ userRole }: SidebarNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems =
    userRole === 'admin'
      ? adminMenuItems
      : userRole === 'teacher'
        ? teacherMenuItems
        : studentMenuItems;

  return (
    <ul className="space-y-1">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <li key={item.id}>
            <button
              onClick={() => router.push(item.href)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-l-full transition-all cursor-pointer ${
                isActive
                  ? 'bg-white text-primary shadow-md'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              type="button"
            >
              {/* there was a lag here when i did use the currentColor, without adding it to the Icon className, in case if you did wonder why did i add condition to add colors again to the icon */}
              <Icon
                className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-gray-700'}`}
                fill={isActive ? 'currentColor' : 'none'}
              />
              <span className="text-sm">{item.label}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
