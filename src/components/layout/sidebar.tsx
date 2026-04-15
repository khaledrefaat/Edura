import { GraduationCap } from 'lucide-react';
import SidebarNav from './sidebar-nav';

interface SidebarProps {
  userRole: UserRole;
}

export default function Sidebar({ userRole }: SidebarProps) {
  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
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
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 pr-0">
        <SidebarNav userRole={userRole} />
      </nav>

      {/* Version Info */}
      <div className="p-4 border-t border-gray-100">
        <p className="text-xs text-gray-400 text-center">Version 1.0.0</p>
      </div>
    </div>
  );
}
