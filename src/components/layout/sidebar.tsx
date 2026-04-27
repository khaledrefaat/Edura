import { GraduationCap } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Sidebar, SidebarHeader } from '@/components/ui/sidebar';
import { verifySession } from '@/lib/dal';
import LogoutButton from './logout-button';
import SideBarNav from './sidebar-nav';

export async function AppSidebar() {
  const session = await verifySession();

  if (!session || !session?.role) {
    return notFound();
  }

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
              {session?.role} Portal
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SideBarNav userRole={session?.role} />

      <LogoutButton />
    </Sidebar>
  );
}
