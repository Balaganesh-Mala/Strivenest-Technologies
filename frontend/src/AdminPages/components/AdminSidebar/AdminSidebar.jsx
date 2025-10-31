import React from "react";
import {
  FaTimes,
  FaHome,
  FaPen,
  FaUsers,
  FaChartLine,
  FaCog,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import "./AdminSidebar.css";

const AdminSidebar = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) => {
  const handleSelect = (tab) => {
    setActiveTab(tab);
    if (window.innerWidth <= 768) setSidebarOpen(false);
  };

  return (
    <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div>
      <div className="admin-sidebar-header">
        <h2>Admin Panel</h2>
        <FaTimes className="admin-close-icon" onClick={() => setSidebarOpen(false)} />
      </div>

      <ul className="admin-sidebar-menu">
        <li
          className={activeTab === "overview" ? "active" : ""}
          onClick={() => handleSelect("overview")}
        >
          <FaHome /> Overview
        </li>
        <li
          className={activeTab === "blogs" ? "active" : ""}
          onClick={() => handleSelect("blogs")}
        >
          <FaPen /> Blogs
        </li>
        <li
          className={activeTab === "clients" ? "active" : ""}
          onClick={() => handleSelect("clients")}
        >
          <FaUsers /> Client Requests
        </li>
        <li
          className={activeTab === "analytics" ? "active" : ""}
          onClick={() => handleSelect("analytics")}
        >
          <FaChartLine /> Analytics
        </li>
        <li
          className={activeTab === "profile" ? "active" : ""}
          onClick={() => handleSelect("profile")}
        >
          <FaUser /> Profile
        </li>
        <li
          className={activeTab === "settings" ? "active" : ""}
          onClick={() => handleSelect("settings")}
        >
          <FaCog /> Settings
        </li>
      </ul>
      </div>

      <div className="admin-logout">
        <li>
          <FaSignOutAlt /> Logout
        </li>
      </div>
    </aside>
  );
};

export default AdminSidebar;
