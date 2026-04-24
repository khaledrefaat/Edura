'use client';

import {
  BookOpen,
  Calendar,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  UserCircle,
  Users,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
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

export function AppSidebar({ userRole }: AppSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const items = allMenuItems[userRole];

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-gray-100">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-10 h-10 bg-[#D4AF37] rounded-xl flex items-center justify-center shadow-md">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg">EduManage</h1>
            <p className="text-xs text-gray-500 capitalize">
              {userRole} Portal
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);
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

      <div className="mt-auto p-4">
        <button
          type="button"
          aria-label="logout"
          className="p-3 rounded-full border border-primary w-max mx-auto cursor-pointer"
        >
          <LogOut className="w-5 h-5 text-primary" />
        </button>
      </div>
    </Sidebar>
  );
}
