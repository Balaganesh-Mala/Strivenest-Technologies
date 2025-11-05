import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle, FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ThreeDots } from "react-loader-spinner";
import "./ClientRequests.css";

const MySwal = withReactContent(Swal);
const API = "http://localhost:5000/api/quotes";

const ClientRequests = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("adminToken");

  // Fetch Client Requests
  const fetchClients = async () => {
    if (!token) {
      MySwal.fire("Unauthorized", "Please log in as admin first.", "warning");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(API, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          MySwal.fire("Session Expired", "Please log in again.", "error");
          localStorage.removeItem("adminToken");
        } else {
          MySwal.fire("Error", "Failed to fetch requests.", "error");
        }
        return;
      }

      const data = await res.json();

      // Handle if backend returns {quotes: [...]}
      const quotes = Array.isArray(data)
  ? data
  : data.data || data.quotes || [];
      console.log(quotes)

      if (quotes.length > 0) {
        setClients(quotes);
      } else {
        setClients([]);
      }
    } catch (error) {
      console.error("Error fetching client requests:", error);
      MySwal.fire("Error", "Server connection failed.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // Update Status (Accept / Decline)
  const handleAction = async (id, action) => {
    const confirm = await MySwal.fire({
      title: `Are you sure you want to ${action.toLowerCase()} this request?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: action === "Accepted" ? "#10b981" : "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: `Yes, ${action.toLowerCase()} it!`,
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`${API}/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: action }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        MySwal.fire("Error", err.message || "Failed to update request.", "error");
        return;
      }

      setClients((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status: action } : c))
      );

      MySwal.fire("Success", `Request ${action.toLowerCase()} successfully!`, "success");
    } catch (error) {
      console.error(error);
      MySwal.fire("Error", "Server connection failed.", "error");
    }
  };

  // Search filter
  const filteredClients = clients.filter((client) => {
    const search = searchTerm.trim().toLowerCase();
    return (
      client.name?.toLowerCase().includes(search) ||
      client.service?.toLowerCase().includes(search)
    );
  });

  // Summary counts
  const total = clients.length;
  const accepted = clients.filter((c) => c.status === "Accepted").length;
  const declined = clients.filter((c) => c.status === "Declined").length;
  const pending = clients.filter((c) => c.status === "Pending" || !c.status).length;

  return (
    <div className="client-requests-container">
      <h2>Client Requests</h2>
      <p className="subtitle">Manage and track all client quote requests.</p>

      <div className="summary-cards">
        <div className="summary-card total">
          <h3>{total}</h3>
          <p>Total</p>
        </div>
        <div className="summary-card pending">
          <h3>{pending}</h3>
          <p>Pending</p>
        </div>
        <div className="summary-card accepted">
          <h3>{accepted}</h3>
          <p>Accepted</p>
        </div>
        <div className="summary-card declined">
          <h3>{declined}</h3>
          <p>Declined</p>
        </div>
      </div>

      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search by name or service..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-container">
        {loading ? (
          <div className="loader-container">
            <ThreeDots height="70" width="70" color="#007bff" visible={true} />
          </div>
        ) : filteredClients.length === 0 ? (
          <div className="no-data">
            <img
              src="https://ik.imagekit.io/izqq5ffwt/ChatGPT%20Image%20Nov%201,%202025,%2010_36_03%20PM.png"
              alt="No Data"
              className="no-data-img"
            />
            <h3>No Requests Found</h3>
            <p>There are no client requests available yet.</p>
          </div>
        ) : (
          <table className="client-table">
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Service</th>
                <th>Message</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client._id}>
                  <td>{client.name || "—"}</td>
                  <td>{client.email || "—"}</td>
                  <td>{client.phone || "—"}</td>
                  <td>{client.serviceType || "—"}</td>
                  <td>
                    {client.message?.length > 40
                      ? client.message.slice(0, 40) + "..."
                      : client.message || "—"}
                  </td>
                  <td>
                    {client.createdAt
                      ? new Date(client.createdAt).toLocaleDateString()
                      : "—"}
                  </td>
                  <td>
                    <span className={`status ${client.status?.toLowerCase() || "pending"}`}>
                      {client.status || "Pending"}
                    </span>
                  </td>
                  <td>
                    {client.status === "Pending" || !client.status ? (
                      <div className="action-btns">
                        <button
                          className="accept-btn"
                          onClick={() => handleAction(client._id, "Accepted")}
                        >
                          <FaCheckCircle />
                        </button>
                        <button
                          className="decline-btn"
                          onClick={() => handleAction(client._id, "Declined")}
                        >
                          <FaTimesCircle />
                        </button>
                      </div>
                    ) : (
                      <span className="assigned-text">{client.status}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ClientRequests;
