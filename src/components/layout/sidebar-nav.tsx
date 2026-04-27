'use client';

import {
  BookOpen,
  Calendar,
  LayoutDashboard,
  UserCircle,
  Users,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

interface AppSidebarProps {
  userRole: UserRole;
}

const allMenuItems = {
  admin: [
    { id: 'dashboard', href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', href: '/users', label: 'User Management', icon: Users },
    {
      id: 'courses',
      href: '/courses',
      label: 'Course Management',
      icon: BookOpen,
    },
  ],
  teacher: [
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
    {
      id: 'courses',
      href: '/teacher/courses',
      label: 'My Courses',
      icon: BookOpen,
    },
  ],
  student: [
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
  ],
} as const;

export default function SideBarNav({ userRole }: AppSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const items = allMenuItems[userRole];

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <SidebarMenuItem key={item.id} className="gap-4">
                  <SidebarMenuButton
                    isActive={isActive}
                    onClick={() => router.push(item.href)}
                    className="cursor-pointer"
                  >
                    <Icon
                      className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-700'}`}
                    />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}
