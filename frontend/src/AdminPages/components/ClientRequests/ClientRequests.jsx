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

  const fetchClients = async () => {
    setLoading(true);
    try {
      const res = await fetch(API);
      const data = await res.json();
      if (res.ok) setClients(data);
    } catch (error) {
      console.error("Error fetching client requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleAction = async (id, action) => {
    const actionText = action === "Accepted" ? "accept" : "decline";

    MySwal.fire({
      title: `Are you sure you want to ${actionText} this request?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: action === "Accepted" ? "#10b981" : "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: `Yes, ${actionText} it!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`${API}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: action }),
          });

          if (res.ok) {
            setClients((prev) =>
              prev.map((c) => (c._id === id ? { ...c, status: action } : c))
            );

            MySwal.fire({
              icon: "success",
              title: `Request ${actionText}ed successfully!`,
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            MySwal.fire("Error", "Failed to update request.", "error");
          }
        } catch (error) {
          console.error("Error updating status:", error);
          MySwal.fire("Error", "Server connection failed.", "error");
        }
      }
    });
  };

  const filteredClients = clients.filter((client) => {
    const search = searchTerm.trim().toLowerCase();
    return (
      client.name?.toLowerCase().includes(search) ||
      client.service?.toLowerCase().includes(search)
    );
  });

  const total = clients.length;
  const accepted = clients.filter((c) => c.status === "Accepted").length;
  const declined = clients.filter((c) => c.status === "Declined").length;
  const pending = clients.filter((c) => c.status === "Pending").length;
  const assigned = clients.filter((c) => c.status === "Assigned").length;

  return (
    <div className="client-requests-container">
      <h2>Client Requests</h2>
      <p className="subtitle">
        Manage incoming client quotes and project requests.
      </p>

      <div className="summary-cards">
        <div className="summary-card total">
          <h3>{total}</h3>
          <p>Total Requests</p>
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
        <div className="summary-card assigned">
          <h3>{assigned}</h3>
          <p>Assigned</p>
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
            <ThreeDots
              height="70"
              width="70"
              radius="9"
              color="#007bff"
              ariaLabel="three-dots-loading"
              visible={true}
            />
          </div>
        ) : clients.length === 0 ? (
          <div className="no-data">
            <img
              src="https://ik.imagekit.io/izqq5ffwt/ChatGPT%20Image%20Nov%201,%202025,%2010_36_03%20PM.png"
              alt="No Data"
              className="no-data-img"
            />
            <h3>No Requests Found</h3>
            <p>There are no client requests available yet.</p>
          </div>
        ) : filteredClients.length === 0 ? (
          <p className="no-results">No matching requests found.</p>
        ) : (
          <table className="client-table">
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Service Type</th>
                <th>Message</th>
                <th>Date Submitted</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client._id}>
                  <td>{client.name}</td>
                  <td>{client.email}</td>
                  <td>{client.phone}</td>
                  <td>{client.service}</td>
                  <td>
                    {`${client.message?.slice(0, 40)}${
                      client.message?.length > 40 ? "..." : ""
                    }`}
                  </td>
                  <td>{new Date(client.createdAt).toLocaleDateString()}</td>
                  <td>
                    {client.status === "Accepted" ? (
                      <span className="status accepted">Accepted</span>
                    ) : client.status === "Declined" ? (
                      <span className="status declined">Declined</span>
                    ) : client.status === "Assigned" ? (
                      <span className="status assigned">Assigned</span>
                    ) : (
                      <span className="status pending">Pending</span>
                    )}
                  </td>
                  <td>
                    {client.status === "Pending" && (
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
                    )}
                    {client.status === "Assigned" && (
                      <span className="assigned-text">Assigned</span>
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
