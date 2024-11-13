import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/widgets/sidebar';
import { useSidebarStore } from '@/widgets/sidebar/model/sidebar-store';
import { cn } from '@/shared/utils';

export const Layout = () => {
  const { isCollapsed } = useSidebarStore();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className={cn(
        "flex-1 transition-all duration-300 p-4 overflow-auto",
        isCollapsed ? "ml-16" : "ml-64"
      )}>
        <div className="min-h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
