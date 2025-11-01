import React, { useState } from "react";
import AdminNavbar from "../components/AdminNavbar/AdminNavbar.jsx";
import AdminSidebar from "../components/AdminSidebar/AdminSidebar.jsx";
import AdminProfile from "../components/Profile/Profile.jsx";
import ChangePassword from "../components/ChangePassword/ChangePassword.jsx";
import AdminBlogs from "../components/Blogs/Blogs.jsx";
import ClientRequests from "../components/ClientRequests/ClientRequests.jsx";
import Analytics from "../components/Analytics/Analytics.jsx";
import Settings from "../components/Settings/Settings.jsx";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
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

const MySwal = withReactContent(Swal);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [projectData, setProjectData] = useState([
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
    {
      client: "SkyCloud",
      service: "Cloud Service",
      developer: "Suresh Reddy",
      deadline: "05 Dec 2025",
      status: "In Progress",
    },
    {
      client: "SkyCloud",
      service: "Cloud Service",
      developer: "Suresh Reddy",
      deadline: "05 Dec 2025",
      status: "In Progress",
    },
    {
      client: "SkyCloud",
      service: "Cloud Service",
      developer: "Suresh Reddy",
      deadline: "05 Dec 2025",
      status: "In Progress",
    },
  ]);

  const totalClients = 120;
  const totalProjects = projectData.length;
  const completedCount = projectData.filter(
    (p) => p.status === "Completed"
  ).length;
  const inProgressCount = projectData.filter(
    (p) => p.status === "In Progress"
  ).length;

  const analyticsData = [
    { title: "Total Clients", value: totalClients, color: "#ffb8b8ff" },
    { title: "Total Projects", value: totalProjects, color: "#6366F1" },
    { title: "In Progress", value: inProgressCount, color: "#f5940bff" },
    { title: "Completed", value: completedCount, color: "#10B981" },
    { title: "Revenue (This Month)", value: "₹45,200", color: "#f63bf3ff" },
    { title: "Avg. Completion Time", value: "12 Days", color: "#f1636fff" },
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

  const COLORS = ["#10B981", "#F59E0B", "#E5E7EB"];

  // ✅ Mark as Done with Popup
  const handleMarkAsDone = (index) => {
    MySwal.fire({
      title: "Mark this project as completed?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10B981",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, mark as done!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedProjects = [...projectData];
        updatedProjects[index].status = "Completed";
        setProjectData(updatedProjects);

        MySwal.fire({
          icon: "success",
          title: "Project marked as completed!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

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
            {/* ---------- Analytics Cards ---------- */}
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

            {/* ---------- Charts Section ---------- */}
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
                      data={[
                        { name: "Completed", value: completedCount },
                        { name: "In Progress", value: inProgressCount },
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label
                    >
                      <Cell fill="#10B981" />
                      <Cell fill="#F59E0B" />
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* ---------- Project Summary ---------- */}
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
                            {p.status === "Completed" ? (
                              <span className="done-text">Completed</span>
                            ) : (
                              <button
                                className="mark-btn"
                                onClick={() => handleMarkAsDone(index)}
                              >
                                Mark as Done
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
