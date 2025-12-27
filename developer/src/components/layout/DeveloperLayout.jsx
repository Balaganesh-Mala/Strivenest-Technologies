import { useState } from "react";
import { Outlet } from "react-router-dom";
import DeveloperSidebar from "./Sidebar";
import DeveloperNavbar from "./Navbar";

export default function DeveloperLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SIDEBAR */}
      <DeveloperSidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      {/* NAVBAR */}
      <DeveloperNavbar
        onMenuClick={() => setSidebarOpen(true)}
      />

      {/* MAIN CONTENT */}
      <main
        className="
          pt-16
          md:ml-64
          px-4 sm:px-6
          transition-all
        "
      >
        <Outlet />
      </main>
    </div>
  );
}
