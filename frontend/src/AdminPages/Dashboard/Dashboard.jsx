import React, { useState } from "react";
import AdminNavbar from "../components/AdminNavbar/AdminNavbar.jsx";
import AdminSidebar from "../components/AdminSidebar/AdminSidebar.jsx";
import AdminProfile from "../components/Profile/Profile.jsx";
import ChangePassword from "../components/ChangePassword/ChangePassword.jsx";
import AdminBlogs from "../components/Blogs/Blogs.jsx";
import ClientRequests from "../components/ClientRequests/ClientRequests.jsx";
import Analytics from "../components/Analytics/Analytics.jsx";
import Settings from "../components/Settings/Settings.jsx";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import "./Dashboard.css";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const analyticsData = [
    { title: "Total Clients", value: "120", color: "#ffb8b8ff" },
    { title: "Total Projects", value: "85", color: "#6366F1" },
    { title: "In Progress", value: "24", color: "#e9f50bff" },
    { title: "Completed", value: "61", color: "#10B981" },
    { title: "Revenue (This Month)", value: "$45,200", color: "#f63bf3ff" },
    { title: "Avg. Completion Time", value: "12 Days", color: "#f1636fff" },
  ];

  const projectData = [
    {
      client: "TechWave",
      service: "Web Development",
      developer: "Anjali Sharma",
      deadline: "15 Nov 2025",
      status: "In Progress",
    },
    {
      client: "AppNest",
      service: "App Development",
      developer: "Ravi Kumar",
      deadline: "25 Nov 2025",
      status: "Completed",
    },
    {
      client: "SkyCloud",
      service: "Cloud Service",
      developer: "Suresh Reddy",
      deadline: "05 Dec 2025",
      status: "In Progress",
    },
  ];

  const monthlyGrowth = [
    { month: "Jan", projects: 10 },
    { month: "Feb", projects: 14 },
    { month: "Mar", projects: 20 },
    { month: "Apr", projects: 25 },
    { month: "May", projects: 30 },
    { month: "Jun", projects: 35 },
  ];

  const serviceDistribution = [
    { name: "Web", projects: 40 },
    { name: "App", projects: 25 },
    { name: "WordPress", projects: 10 },
    { name: "Cloud", projects: 10 },
  ];

  const statusData = [
    { name: "Completed", value: 61 },
    { name: "In Progress", value: 24 },
    { name: "Pending", value: 10 },
  ];

  const COLORS = ["#10B981", "#F59E0B", "#E5E7EB"];

  const recentActivity = [
    "New client 'TechWave' added",
    "Project 'AppNest' marked as completed",
    "Developer 'Suresh' assigned new project",
    "Invoice #452 generated",
  ];

  // ✅ renderContent function used properly
  const renderContent = () => {
    switch (activeTab) {
      case "blogs":
        return <AdminBlogs />;
      case "clients":
        return <ClientRequests />;
      case "analytics":
        return <Analytics />;
      case "settings":
        return <Settings />;
      case "profile":
        return <AdminProfile />;
      case "password":
        return <ChangePassword />;
      default:
        return (
          <>
            <div className="analytics-cards">
              {analyticsData.map((card, index) => (
                <div
                  key={index}
                  className="analytics-card"
                  style={{ borderTop: `4px solid ${card.color}` }}
                >
                  <h3>{card.title}</h3>
                  <p>{card.value}</p>
                </div>
              ))}
            </div>

            <div className="charts-section">
              <div className="chart-card">
                <h3>Monthly Project Growth</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={monthlyGrowth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="projects" stroke="#3B82F6" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-card">
                <h3>Projects by Service Type</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={serviceDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="projects" fill="#6366F1" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-card">
                <h3>Project Status Overview</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="dashboard-bottom">
              <div className="project-summary">
                <h3>Project Summary</h3>
                <div className="table-wrap">
                  <table className="projects-table">
                    <thead>
                      <tr>
                        <th>Client</th>
                        <th>Service</th>
                        <th>Developer</th>
                        <th>Deadline</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projectData.map((p, index) => (
                        <tr key={index}>
                          <td>{p.client}</td>
                          <td>{p.service}</td>
                          <td>{p.developer}</td>
                          <td>{p.deadline}</td>
                          <td>
                            <span
                              className={`status ${
                                p.status === "Completed"
                                  ? "completed"
                                  : "in-progress"
                              }`}
                            >
                              {p.status}
                            </span>
                          </td>
                          <td>
                            <button className="mark-btn">Mark as Done</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="recent-activity">
                <h3>Recent Activity</h3>
                <ul>
                  {recentActivity.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="admin-dashboard">
      <AdminNavbar setSidebarOpen={setSidebarOpen} />
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <main className={`dashboard-main ${sidebarOpen ? "sidebar-open" : ""}`}>
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
