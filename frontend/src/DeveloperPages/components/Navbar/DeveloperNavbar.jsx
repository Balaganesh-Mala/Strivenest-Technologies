import React, { useState, useRef, useEffect } from "react";
import { FaBell, FaSignOutAlt, FaBars, FaChevronDown } from "react-icons/fa";

export default function DeveloperNavbar({ user, onToggleSidebar }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    window.location.href = "/developer/login";
  }

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-gray-100 px-5 sm:px-6 py-3 flex justify-between items-center shadow-sm">
      {/* Left: Logo + Menu */}
      <div className="flex items-center gap-3">
        {/* Hamburger for mobile */}
        <button
          onClick={onToggleSidebar}
          className="md:hidden text-gray-700 hover:text-indigo-600 transition"
        >
          <FaBars className="text-xl" />
        </button>

        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-blue-500 flex items-center justify-center text-white font-semibold text-lg">
          SN
        </div>
        <div>
          <h1 className="text-base font-semibold text-gray-800 leading-tight">
            StriveNest
          </h1>
          <p className="text-xs text-gray-500 -mt-1">Developer Panel</p>
        </div>
      </div>

      {/* Right: Notifications + Profile */}
      <div className="flex items-center gap-5 relative">
        {/* Desktop Notifications */}
        <button className="relative hidden sm:block text-gray-600 hover:text-indigo-600 transition">
          <FaBell className="text-lg" />
          <span className="absolute -top-1 -right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Profile */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 focus:outline-none"
          >
            <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">
              {user?.name?.split(" ").map((n) => n[0]).join("")}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-gray-800">{user?.name}</p>
              <p className="text-xs text-gray-500">Developer</p>
            </div>
            <FaChevronDown
              className={`text-xs text-gray-500 transition-transform duration-200 ${
                menuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-xl shadow-lg py-2 animate-fade-in">
              <button className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-indigo-600">
                Profile
              </button>
              <button className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-indigo-600">
                Notifications
              </button>
              <button className="block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-indigo-600">
                Settings
              </button>
              <hr className="my-1" />
              <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2" onClick={handleLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
