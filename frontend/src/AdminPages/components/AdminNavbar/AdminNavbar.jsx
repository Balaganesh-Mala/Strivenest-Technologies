import React from "react";
import { FaBars, FaBell, FaUserCircle } from "react-icons/fa";
import "./AdminNavbar.css";

const AdminNavbar = ({ setSidebarOpen }) => {
  return (
    <nav className="navbar">
      <div className="admin-nav-left">
        <img
          src="https://ik.imagekit.io/iiz6sw7ik/IMG_20251025_123454.png?updatedAt=1761375924313"
          alt="Strivenest Logo"
          className="admin-logo"
        />
      </div>

      <div className="admin-nav-right">
        <FaBell className="admin-nav-icon" />
        <FaUserCircle className="admin-nav-icon" />
        <FaBars className="admin-menu-icon" onClick={() => setSidebarOpen(true)} />
      </div>
    </nav>
  );
};

export default AdminNavbar;
