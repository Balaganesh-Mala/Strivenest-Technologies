import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaTasks,
  FaClipboardList,
  FaBell,
  FaQuestionCircle,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

export default function DeveloperSidebar() {
  const navItems = [
    { name: "Dashboard", icon: <FaTachometerAlt />, path: "/developer" },
    { name: "Project Requests", icon: <FaTasks />, path: "/developer/requests" },
    { name: "Project Summary", icon: <FaClipboardList />, path: "/developer/summary" },
    { name: "Notifications", icon: <FaBell />, path: "/developer/notifications" },
    { name: "Help", icon: <FaQuestionCircle />, path: "/developer/help" },
    { name: "Settings", icon: <FaCog />, path: "/developer/settings" },
  ];
  function handleLogout() {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    window.location.href = "/developer/login";
  }

  return (
    <aside className="h-full flex flex-col justify-between py-6">
      <div>
        <h2 className="text-xs font-semibold uppercase text-gray-500 px-6 mb-4">
          Main Menu
        </h2>
        <nav className="flex flex-col space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                }`
              }
            >
              <span className="text-base">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="px-6 mt-6">
        <button className="flex items-center gap-2 w-full justify-center bg-red-50 text-red-600 hover:bg-red-100 font-medium text-sm py-2.5 rounded-lg transition" onClick={handleLogout}>
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
}
