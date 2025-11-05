import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { FaUserTie, FaFilter, FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./ProjectAssignment.css";

const API_QUOTES = "http://localhost:5000/api/quotes";
const API_PROJECTS = "http://localhost:5000/api/projects";
const API_DEVELOPERS = "http://localhost:5000/api/developers";

const capitalize = (s) => {
  if (!s) return "";
  const str = String(s);
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const ProjectAssignment = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const [projects, setProjects] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [filterService, setFilterService] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [assigning, setAssigning] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    developerId: "",
    startDate: "",
    deadline: "",
    priority: "Medium",
    remarks: "",
  });

  const token =
    localStorage.getItem("adminToken") || localStorage.getItem("token");

  // ---------------- FETCH DATA ---------------- //
  useEffect(() => {
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Session expired",
        text: "Please login again",
      });
      navigate("/admin-login");
    } else {
      fetchAllData();
    }
  }, [token]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchQuotes(), fetchDevelopers(), fetchProjects()]);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to load data", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchDevelopers = async () => {
    try {
      const res = await fetch(API_DEVELOPERS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setDevelopers(data.data || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchQuotes = async () => {
    try {
      const res = await fetch(API_QUOTES, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setQuotes(data.data || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await fetch(API_PROJECTS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setProjects(data.data || []);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- ASSIGN FORM ---------------- //
  const openAssignForm = (quote) => {
    setSelected(quote);
    setForm({
      developerId: "",
      startDate: new Date().toISOString().slice(0, 10),
      deadline: "",
      priority: "Medium",
      remarks: "",
    });
    setAssigning(true);
  };

  const closeAssignForm = () => {
    setAssigning(false);
    setSelected(null);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitAssign = async (e) => {
    e.preventDefault();
    if (!selected) return;
    if (!form.developerId || !form.deadline) {
      Swal.fire("Validation", "Please select developer and deadline", "warning");
      return;
    }

    try {
      setSaving(true);
      const payload = {
        clientId: selected._id,
        developerId: form.developerId,
        startDate: form.startDate,
        deadline: form.deadline,
        priority: form.priority,
        remarks: form.remarks,
      };

      // Create project in backend
      const res = await fetch(API_PROJECTS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        Swal.fire("Error", data.message || "Failed to assign project", "error");
        return;
      }

      // Update quote status to "Assigned"
      await fetch(`${API_QUOTES}/${selected._id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "Assigned" }),
      });

      Swal.fire({
        icon: "success",
        title: "Project assigned successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      await fetchAllData();
      closeAssignForm();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Server connection failed", "error");
    } finally {
      setSaving(false);
    }
  };

  // ---------------- FILTERING ---------------- //
  const serviceOptions = ["All", ...new Set(quotes.map((q) => q.serviceType))];

  // ✅ Merge quotes with project info to block re-assignment
  const mergedQuotes = quotes.map((quote) => {
    const assignedProject = projects.find(
      (p) =>
        p.clientId === quote._id ||
        p.clientId === quote.clientId ||
        p.clientName === quote.name
    );
    if (assignedProject && assignedProject.status !== "Completed") {
      return { ...quote, status: "Assigned" };
    } else if (assignedProject && assignedProject.status === "Completed") {
      return { ...quote, status: "Completed" };
    }
    return quote;
  });

  const filteredQuotes = mergedQuotes
    .filter((q) =>
      filterService === "All" ? true : q.serviceType === filterService
    )
    .filter((q) => {
      const s = search.trim().toLowerCase();
      if (!s) return true;
      return (
        (q.name || "").toLowerCase().includes(s) ||
        (q.email || "").toLowerCase().includes(s)
      );
    });

  // ---------------- RENDER ---------------- //
  return (
    <div className="pa-container">
      <div className="pa-header">
        <div className="pa-title">
          <FaUserTie className="pa-icon" />
          <div>
            <h2>Project Assignment</h2>
            <p className="muted">{quotes.length} client requests</p>
          </div>
        </div>

        <div className="pa-controls">
          <div className="pa-search">
            <FaSearch className="search-icon" />
            <input
              placeholder="Search by client or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="pa-filter">
            <FaFilter className="filter-icon" />
            <select
              value={filterService}
              onChange={(e) => setFilterService(e.target.value)}
            >
              {serviceOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="pa-body">
        {loading ? (
          <div className="loader-wrap">
            <ThreeDots height="60" width="60" color="#3b82f6" visible />
          </div>
        ) : filteredQuotes.length === 0 ? (
          <div className="pa-no-data">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
              alt="no data"
            />
            <h3>No projects found</h3>
            <p>There are no accepted, assigned, or completed projects.</p>
          </div>
        ) : (
          <div className="pa-table-wrap">
            <table className="pa-table">
              <thead>
                <tr>
                  <th>Client Name</th>
                  <th>Service</th>
                  <th>Details</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredQuotes.map((q) => (
                  <tr key={q._id}>
                    <td>{q.name}</td>
                    <td>{q.serviceType}</td>
                    <td className="truncate">{q.message}</td>
                    <td>{capitalize(q.status)}</td>
                    <td>
                      {q.createdAt
                        ? new Date(q.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                    <td>
                      {q.status === "Accepted" ? (
                        <button
                          className="assign-btn"
                          onClick={() => openAssignForm(q)}
                        >
                          Assign
                        </button>
                      ) : q.status === "Assigned" ? (
                        <span className="status-assigned">Assigned</span>
                      ) : q.status === "Completed" ? (
                        <span className="status-completed">Completed</span>
                      ) : (
                        <span className="mono">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ---------------- ASSIGN MODAL ---------------- */}
      {assigning && selected && (
        <div className="pa-modal">
          <div className="pa-modal-backdrop" onClick={closeAssignForm}></div>
          <div className="pa-modal-card">
            <div className="pa-modal-header">
              <h3>Assign Project</h3>
              <button className="close-x" onClick={closeAssignForm}>
                ×
              </button>
            </div>

            <form className="pa-form" onSubmit={submitAssign}>
              <div className="pa-grid">
                <div className="form-group">
                  <label>Client Name</label>
                  <input value={selected.name} disabled className="disabled-input"/>
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input value={selected.email} disabled className="disabled-input"/>
                </div>
                <div className="form-group">
                  <label>Service</label>
                  <input value={selected.serviceType} disabled className="disabled-input"/>
                </div>
                <div className="form-group full">
                  <label>Message</label>
                  <textarea value={selected.message} disabled className="disabled-input"/>
                </div>

                <div className="form-group">
                  <label>Assign Developer</label>
                  <select
                    name="developerId"
                    value={form.developerId}
                    onChange={handleFormChange}
                  >
                    <option value="">Select developer</option>
                    {developers.map((d) => (
                      <option key={d._id} value={d._id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    name="startDate"
                    type="date"
                    value={form.startDate}
                    onChange={handleFormChange}
                  />
                </div>

                <div className="form-group">
                  <label>Deadline</label>
                  <input
                    name="deadline"
                    type="date"
                    value={form.deadline}
                    onChange={handleFormChange}
                  />
                </div>

                <div className="form-group">
                  <label>Priority</label>
                  <select
                    name="priority"
                    value={form.priority}
                    onChange={handleFormChange}
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>

                <div className="form-group full">
                  <label>Remarks</label>
                  <textarea
                    name="remarks"
                    value={form.remarks}
                    onChange={handleFormChange}
                  />
                </div>
              </div>

              <div className="pa-actions">
                <button
                  type="button"
                  className="btn cancel"
                  onClick={closeAssignForm}
                >
                  Cancel
                </button>
                <button type="submit" className="btn save" disabled={saving}>
                  {saving ? "Assigning..." : "Save / Assign"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectAssignment;
