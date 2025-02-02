import { STORAGE_KEYS } from "@/shared/constants/storage-keys";
import { paths } from "@/shared/paths";
import { cn } from "@/shared/utils";
import { AlertCircle, ChevronLeft, LogOut, Turtle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useSidebarStore } from "../model/sidebar-store";

type NavItem = {
  to: string;
  icon: React.ReactNode;
  label: string;
  isMain?: boolean;
};

const navItems: NavItem[] = [
  {
    to: paths.errorLogs,
    icon: <AlertCircle size={20} />,
    label: "에러 로그",
    isMain: true,
  },
  { to: paths.slowQueries, icon: <Turtle size={20} />, label: "슬로우 쿼리" },
  // { to: "/applications", icon: <Boxes size={20} />, label: "Applications" },
  // { to: "/settings", icon: <Settings size={20} />, label: "Settings" },
  // { to: "/user-info", icon: <User size={20} />, label: "User Info" },
  // { to: "/documentation", icon: <Book size={20} />, label: "Documentation" },
];

export const Sidebar = () => {
  const isCollapsed = useSidebarStore((state) => state.isCollapsed);
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    window.location.href = paths.login;
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen bg-[#1B2A4E] text-gray-100 transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-9 rounded-full border border-gray-700 bg-[#1B2A4E] p-1"
      >
        <ChevronLeft
          className={cn(
            "h-4 w-4 transition-transform duration-300",
            isCollapsed ? "rotate-180" : "",
          )}
        />
      </button>

      {/* Logo Section */}
      <div className="border-b border-gray-700 p-4">
        <div className="flex items-center gap-2">
          <img src="/vite.svg" alt="Logo" className="h-8 w-8" />
          {!isCollapsed && (
            <span className="text-xl font-semibold">ClickSoft</span>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex h-[calc(100%-80px)] flex-col justify-between p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={cn(
                  "flex items-center gap-3 rounded-md p-2 hover:bg-[#2C3E67]",
                  isCollapsed && "justify-center",
                  location.pathname === item.to && "bg-[#2C3E67]",
                  location.pathname === paths.root &&
                    item.isMain &&
                    "bg-[#2C3E67] text-white",
                )}
              >
                {item.icon}
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>

        <button
          onClick={handleLogout}
          className={cn(
            "flex items-center gap-3 rounded-md p-2 text-red-300 hover:bg-[#2C3E67]",
            isCollapsed && "justify-center",
          )}
        >
          <LogOut size={20} />
          {!isCollapsed && <span>로그아웃</span>}
        </button>
      </nav>
    </aside>
  );
};
