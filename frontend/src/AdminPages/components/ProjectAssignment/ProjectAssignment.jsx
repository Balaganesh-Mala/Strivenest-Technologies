import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { FaUserTie, FaFilter, FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import "./ProjectAssignment.css";

const QUOTES_API = "http://localhost:5000/api/quotes";
const ASSIGNMENTS_API = "http://localhost:5000/api/assignments";

const developers = [
  { id: "dev1", name: "Bala Ganesh Mala" },
  { id: "dev2", name: "Ravi Kumar" },
  { id: "dev3", name: "Suresh Reddy" },
  { id: "dev4", name: "Anjali Sharma" },
];

const capitalize = (s) => {
  if (!s) return "";
  const str = String(s);
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const ProjectAssignment = () => {
  const [loading, setLoading] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const [filterService, setFilterService] = useState("All");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [assigning, setAssigning] = useState(false);
  const [form, setForm] = useState({
    developerId: "",
    startDate: "",
    deadline: "",
    priority: "Medium",
    remarks: "",
  });

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const res = await fetch(QUOTES_API);
      const data = await res.json();
      if (res.ok) {
        // keep quotes that have relevant statuses (handle any casing)
        const filtered = data.filter((q) =>
          ["accepted", "assigned", "completed"].includes((q.status || "").toLowerCase())
        );
        setQuotes(filtered);
      } else {
        Swal.fire("Error", data.message || "Failed to load quotes", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Server connection failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const serviceOptions = ["All", ...Array.from(new Set(quotes.map((q) => q.service)))];

  const filteredQuotes = quotes
    .filter((q) => (filterService === "All" ? true : q.service === filterService))
    .filter((q) => {
      const s = search.trim().toLowerCase();
      if (!s) return true;
      const client = (q.clientName || q.name || "").toLowerCase();
      const email = (q.email || "").toLowerCase();
      return client.includes(s) || email.includes(s);
    })
    .sort((a, b) => {
      const order = { accepted: 1, assigned: 2, completed: 3 };
      const sa = (a.status || "").toLowerCase();
      const sb = (b.status || "").toLowerCase();
      return (order[sa] || 99) - (order[sb] || 99);
    });

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

    const developerName = developers.find((d) => d.id === form.developerId)?.name || "";

    const payload = {
      quoteId: selected._id,
      clientName: selected.clientName || selected.name,
      email: selected.email,
      phone: selected.phone,
      service: selected.service,
      message: selected.message,
      assignedTo: developerName,
      startDate: form.startDate,
      deadline: form.deadline,
      priority: form.priority,
      remarks: form.remarks,
      status: "Assigned",
    };

    try {
      setLoading(true);
      const res = await fetch(ASSIGNMENTS_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        await fetch(`${QUOTES_API}/${selected._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "Assigned" }),
        });

        Swal.fire({
          icon: "success",
          title: "Project assigned successfully!",
          showConfirmButton: false,
          timer: 1400,
        });

        await fetchQuotes();
        closeAssignForm();
      } else {
        Swal.fire("Error", data.message || "Failed to assign project", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Server connection failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pa-container">
      <div className="pa-header">
        <div className="pa-title">
          <FaUserTie className="pa-icon" />
          <div>
            <h2>Project Assignment</h2>
            <p className="muted">{quotes.length} project(s)</p>
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
            <select value={filterService} onChange={(e) => setFilterService(e.target.value)}>
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
            <img src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png" alt="no data" />
            <h3>No projects found</h3>
            <p>There are no accepted, assigned, or completed projects.</p>
          </div>
        ) : (
          <div className="pa-table-wrap">
            <table className="pa-table">
              <thead>
                <tr>
                  <th>Project ID</th>
                  <th>Client Name</th>
                  <th>Service Type</th>
                  <th>Project Details</th>
                  <th>Date Submitted</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredQuotes.map((q) => {
                  const statusLower = (q.status || "").toLowerCase();
                  const displayStatus = capitalize(statusLower);
                  return (
                    <tr key={q._id}>
                      <td className="mono">{String(q._id).slice(-6)}</td>
                      <td>{q.clientName || q.name || "—"}</td>
                      <td>{q.service || "—"}</td>
                      <td className="truncate">{q.message || "-"}</td>
                      <td>{q.createdAt ? new Date(q.createdAt).toLocaleDateString() : "—"}</td>
                      <td>
                        <span className={`status ${statusLower}`}>{displayStatus}</span>
                      </td>
                      <td>
                        {statusLower === "accepted" ? (
                          <button className="assign-btn" onClick={() => openAssignForm(q)}>
                            Assign
                          </button>
                        ) : statusLower === "assigned" ? (
                          <button className="view-assigned" disabled>
                            Assigned
                          </button>
                        ) : statusLower === "completed" ? (
                          <span className="completed-text">Completed</span>
                        ) : (
                          <span className="mono">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {assigning && selected && (
        <div className="pa-modal">
          <div className="pa-modal-backdrop" onClick={closeAssignForm}></div>
          <div className="pa-modal-card">
            <div className="pa-modal-header">
              <h3>Assign Project</h3>
              <button className="close-x" onClick={closeAssignForm}>×</button>
            </div>

            <form className="pa-form" onSubmit={submitAssign}>
              <div className="pa-grid">
                <div className="form-group">
                  <label>Client Name</label>
                  <input value={selected.clientName || selected.name} disabled className="disabled-input"/>
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input value={selected.email || ""} disabled className="disabled-input"/>
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <input value={selected.phone || ""} disabled className="disabled-input"/>
                </div>

                <div className="form-group">
                  <label>Service Type</label>
                  <input value={selected.service || ""} disabled className="disabled-input"/>
                </div>

                <div className="form-group full">
                  <label>Project Details</label>
                  <textarea value={selected.message || ""} disabled className="disabled-input"/>
                </div>

                <div className="form-group">
                  <label>Assign Developer</label>
                  <select name="developerId" value={form.developerId} onChange={handleFormChange}>
                    <option value="">Select developer</option>
                    {developers.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Start Date</label>
                  <input name="startDate" type="date" value={form.startDate} onChange={handleFormChange} />
                </div>

                <div className="form-group">
                  <label>Deadline</label>
                  <input name="deadline" type="date" value={form.deadline} onChange={handleFormChange} />
                </div>

                <div className="form-group">
                  <label>Priority</label>
                  <select name="priority" value={form.priority} onChange={handleFormChange}>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>

                <div className="form-group full">
                  <label>Remarks / Notes</label>
                  <textarea name="remarks" value={form.remarks} onChange={handleFormChange} placeholder="Add notes..." />
                </div>
              </div>

              <div className="pa-actions">
                <button type="button" className="btn cancel" onClick={closeAssignForm}>Cancel</button>
                <button type="submit" className="btn save">Save / Assign</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectAssignment;
