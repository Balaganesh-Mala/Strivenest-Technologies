import React, { useState, useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar/AdminNavbar.jsx";
import AdminSidebar from "../components/AdminSidebar/AdminSidebar.jsx";
import AdminProfile from "../components/Profile/Profile.jsx";
import AdminBlogs from "../components/Blogs/Blogs.jsx";
import ClientRequests from "../components/ClientRequests/ClientRequests.jsx";
import ProjectAssignment from "../components/ProjectAssignment/ProjectAssignment.jsx";
import Analytics from "../components/Analytics/Analytics.jsx";
import ProjectSummary from "../components/ProjectSummary/ProjectSummary.jsx";
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
const ASSIGNMENTS_API = "http://localhost:5000/api/assignments";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all assignments
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await fetch(ASSIGNMENTS_API);
        const data = await res.json();
        if (res.ok) {
          setAssignments(data);
        }
      } catch (error) {
        console.error("Error fetching assignments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  // ✅ Derived data
  const totalProjects = assignments.length;
  const completedCount = assignments.filter(
    (p) => p.status === "Completed"
  ).length;
  const inProgressCount = assignments.filter(
    (p) => p.status === "Assigned"
  ).length;

  // ✅ Fix total clients count
  const totalClients = new Set(assignments.map((a) => a.clientName)).size;

  const analyticsData = [
    { title: "Total Clients", value: totalClients, color: "#ff05cdff" },
    { title: "Total Projects", value: totalProjects, color: "#6366F1" },
    { title: "In Progress", value: inProgressCount, color: "#f5940bff" },
    { title: "Completed", value: completedCount, color: "#10B981" },
  ];

  // ✅ Monthly Growth
  const monthlyGrowth = Object.values(
    assignments.reduce((acc, curr) => {
      const month = new Date(curr.createdAt || Date.now()).toLocaleString(
        "default",
        { month: "short" }
      );
      acc[month] = acc[month] || { month, projects: 0 };
      acc[month].projects += 1;
      return acc;
    }, {})
  );

  // ✅ Service Distribution
  const serviceDistribution = Object.values(
    assignments.reduce((acc, curr) => {
      const service = curr.service || "Unknown";
      acc[service] = acc[service] || { name: service, projects: 0 };
      acc[service].projects += 1;
      return acc;
    }, {})
  );

  const COLORS = ["#10B981", "#F59E0B"];

  // ✅ Mark as Done
  const handleMarkAsDone = async (assignmentId) => {
    MySwal.fire({
      title: "Mark this project as completed?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10B981",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, mark as done!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`${ASSIGNMENTS_API}/${assignmentId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: "Completed" }),
          });
          if (res.ok) {
            setAssignments((prev) =>
              prev.map((a) =>
                a._id === assignmentId ? { ...a, status: "Completed" } : a
              )
            );
            MySwal.fire({
              icon: "success",
              title: "Project marked as completed!",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        } catch (err) {
          console.error(err);
          MySwal.fire("Error", "Failed to update project.", "error");
        }
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
      case "project-summary":
        return <ProjectSummary />;
      case "profile":
        return <AdminProfile />;
      case "project-assignment":
        return <ProjectAssignment />;
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

                {loading ? (
                  <p>Loading projects...</p>
                ) : assignments.length === 0 ? (
                  <div className="no-data">
                    <img
                      src="https://ik.imagekit.io/izqq5ffwt/no-data.png"
                      alt="No Data"
                      className="no-data-img"
                    />
                    <h3>No Assignments Found</h3>
                    <p>No client projects have been assigned yet.</p>
                  </div>
                ) : (
                  <div className="table-wrap">
                    <table className="projects-table">
                      <thead>
                        <tr>
                          <th>Client</th>
                          <th>Service</th>
                          <th>Developer</th>
                          <th>Start Date</th>
                          <th>Deadline</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {assignments.map((p) => (
                          <tr key={p._id}>
                            <td>{p.clientName}</td>
                            <td>{p.service}</td>
                            <td>{p.assignedTo}</td>
                            <td>
                              {p.startDate
                                ? new Date(p.startDate).toLocaleDateString()
                                : "N/A"}
                            </td>
                            <td>
                              {p.deadline
                                ? new Date(p.deadline).toLocaleDateString()
                                : "N/A"}
                            </td>
                            <td>
                              <span
                                className={`status ${
                                  p.status === "Completed"
                                    ? "completed"
                                    : "in-progress"
                                }`}
                              >
                                {p.status === "Assigned" ? "In Progress" : "Completed"}
                              </span>
                            </td>
                            <td>
                              {p.status === "Completed" ? (
                                <span className="done-text">Completed</span>
                              ) : (
                                <button
                                  className="mark-btn"
                                  onClick={() => handleMarkAsDone(p._id)}
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
                )}
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
