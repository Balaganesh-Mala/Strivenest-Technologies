import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  FolderKanban,
  Users,
  Settings,
} from "lucide-react";

const AdminSidebar = ({ open, setOpen }) => {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Client Requests",
      path: "/admin/requests",
      icon: ClipboardList,
    },
    {
      name: "Projects",
      path: "/admin/projects",
      icon: FolderKanban,
    },
    {
      name: "Developers",
      path: "/admin/developers",
      icon: Users,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <>
      {/* BACKDROP (mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white border-r shadow-sm z-50
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-64"}
        md:translate-x-0`}
      >
        {/* HEADER */}
        <div className="h-16 flex items-center px-6 border-b">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
              A
            </div>
            <h1 className="text-lg font-semibold text-slate-800">
              Admin Panel
            </h1>
          </div>
        </div>

        {/* MENU */}
        <nav className="flex-1 overflow-y-auto py-4">
          <p className="px-6 mb-2 text-xs text-gray-400 uppercase tracking-wide">
            Navigation
          </p>

          {menuItems.map((item, idx) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={idx}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`group flex items-center gap-3 px-6 py-3 text-sm font-medium
                  transition-all relative
                  ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
              >
                {/* Active Indicator */}
                {isActive && (
                  <span className="absolute left-0 top-0 h-full w-1 bg-indigo-600 rounded-r" />
                )}

                <Icon
                  size={18}
                  className={`${
                    isActive
                      ? "text-indigo-600"
                      : "text-slate-400 group-hover:text-slate-600"
                  }`}
                />

                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
