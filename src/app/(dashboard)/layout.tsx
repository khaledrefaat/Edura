import { AppSidebar } from '@/components/layout/sidebar';
import DashboardTitle from '@/components/layout/sidebar-trigger';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar userRole="admin" />
      <SidebarInset>
        <main className="flex-1 overflow-y-auto p-6">
          <DashboardTitle>
            <SidebarTrigger className="mt-1" />
          </DashboardTitle>
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
