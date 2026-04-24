'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

interface DashboardTitleProps {
  children: ReactNode;
}

export default function DashboardTitle({ children }: DashboardTitleProps) {
  const pathname = usePathname();
  const segments = pathname.split('/');
  const title = segments[segments.length - 1];

  return (
    <div className="flex gap-x-4 mb-4 w-full border-b border-primary pb-4">
      {children}
      <div>
        <h1 className="text-3xl capitalize">{title || 'Dashboard'}</h1>
        {pathname === '/' && (
          <p className="text-gray-600">
            Welcome back! Here's what's happening today.
          </p>
        )}
      </div>
    </div>
  );
}
