import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProjectSummary.css";

const ProjectSummary = () => {
  const [projects, setProjects] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("adminToken"); // ✅ Ensure token saved properly

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/projects", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // ✅ Sort projects in order: Assigned → In Progress → Completed
        const sorted = res.data.data.sort((a, b) => {
          const order = ["Assigned", "In Progress", "Completed"];
          return order.indexOf(a.status) - order.indexOf(b.status);
        });

        setProjects(sorted);
        setFiltered(sorted);
      } catch (err) {
        console.error("Error fetching projects:", err);
        alert("Failed to load projects. Please check your backend or token.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [token]);

  const handleStatusChange = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/projects/${id}/status`,
        { status: "Completed" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // ✅ Update status and re-sort
      setProjects((prev) => {
        const updated = prev.map((p) =>
          p._id === id ? { ...p, status: "Completed" } : p
        );
        return updated.sort((a, b) => {
          const order = ["Assigned", "In Progress", "Completed"];
          return order.indexOf(a.status) - order.indexOf(b.status);
        });
      });

      alert("Project marked as completed ✅");
    } catch (err) {
      console.error(err);
      alert("Failed to update project status");
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearch(term);
    const filteredProjects = projects.filter(
      (p) =>
        p.clientName.toLowerCase().includes(term) ||
        p.projectId.toLowerCase().includes(term)
    );
    setFiltered(filteredProjects);
  };

  const handleFilter = (status) => {
    setFilter(status);
    if (status === "All") setFiltered(projects);
    else setFiltered(projects.filter((p) => p.status === status));
  };

  const total = projects.length;
  const inProgress = projects.filter((p) => p.status === "In Progress").length;
  const completed = projects.filter((p) => p.status === "Completed").length;

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="project-summary">
      <h2 className="title">Project Summary</h2>

      {/* ✅ Top summary cards */}
      <div className="summary-cards">
        <div className="card total">
          <h3>Total Projects</h3>
          <p>{total}</p>
        </div>
        <div className="card progress">
          <h3>In Progress</h3>
          <p>{inProgress}</p>
        </div>
        <div className="card completed">
          <h3>Completed</h3>
          <p>{completed}</p>
        </div>
      </div>

      {/* ✅ Search and Filter */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search by client or project ID..."
          value={search}
          onChange={handleSearch}
        />
        <select value={filter} onChange={(e) => handleFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Assigned">Assigned</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* ✅ Responsive Table */}
      <div className="table-wrapper">
        <table className="responsive-table">
          <thead>
            <tr>
              <th>Project ID</th>
              <th>Client Name</th>
              <th>Developer Name</th>
              <th>Service Type</th>
              <th>Start Date</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p._id}>
                <td>{p.projectId}</td>
                <td>{p.clientName}</td>
                <td>{p.developerName}</td>
                <td>{p.serviceType}</td>
                <td>{new Date(p.startDate).toLocaleDateString()}</td>
                <td>
                  {p.deadline
                    ? new Date(p.deadline).toLocaleDateString()
                    : "—"}
                </td>
                <td>
                  <span
                    className={`status ${
                      p.status.toLowerCase().replace(" ", "-")
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td>
                  {p.status !== "Completed" ? (
                  
                    <button
                      className="mark-btn"
                      onClick={() => handleStatusChange(p._id)}
                    >
                      Mark as Done
                    </button>
                  ) : (
                    <span className="done-text">Completed</span> 
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectSummary;
