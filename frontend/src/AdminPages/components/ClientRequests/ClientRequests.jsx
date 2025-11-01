import React, { useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./ClientRequests.css";

const MySwal = withReactContent(Swal);

const ClientRequests = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [clients, setClients] = useState([
    {
      name: "Ravi Kumar",
      email: "ravi@example.com",
      phone: "9876543210",
      service: "Web Development",
      details: "E-commerce website with payment integration",
      date: "2025-10-30",
      status: "Pending",
    },
    {
      name: "Anjali Sharma",
      email: "anjali@example.com",
      phone: "9988776655",
      service: "App Development",
      details: "Food delivery mobile app",
      date: "2025-10-28",
      status: "Pending",
    },
    {
      name: "Suresh Reddy",
      email: "suresh@example.com",
      phone: "9900112233",
      service: "WordPress",
      details: "Corporate portfolio website",
      date: "2025-10-25",
      status: "Pending",
    },
  ]);

  const handleAction = (index, action) => {
    const actionText = action === "Accepted" ? "accept" : "decline";

    MySwal.fire({
      title: `Are you sure you want to ${actionText} this request?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: action === "Accepted" ? "#10b981" : "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: `Yes, ${actionText} it!`,
    }).then((result) => {
      if (result.isConfirmed) {
        const updated = [...clients];
        updated[index].status = action;
        setClients(updated);

        MySwal.fire({
          icon: "success",
          title: `Request ${actionText}ed successfully!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const total = clients.length;
  const accepted = clients.filter((c) => c.status === "Accepted").length;
  const declined = clients.filter((c) => c.status === "Declined").length;
  const pending = clients.filter((c) => c.status === "Pending").length;

  return (
    <div className="client-requests-container">
      <h2>Client Requests</h2>
      <p className="subtitle">
        Manage incoming client quotes and project requests.
      </p>

      {/* Summary Cards */}
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
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search by name or service type..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="client-table">
          <thead>
            <tr>
              <th>Client Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Service Type</th>
              <th>Project Details</th>
              <th>Date Submitted</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client, index) => (
              <tr key={index}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td>{client.service}</td>
                <td>{client.details.slice(0, 50)}</td>
                <td>{client.date}</td>
                <td>
                  {client.status === "Accepted" ? (
                    <span className="status accepted">Accepted</span>
                  ) : client.status === "Declined" ? (
                    <span className="status declined">Declined</span>
                  ) : (
                    <span className="status pending">Pending</span>
                  )}
                </td>
                <td>
                  {client.status === "Pending" && (
                    <div className="action-btns">
                      <button
                        className="accept-btn"
                        onClick={() => handleAction(index, "Accepted")}
                      >
                        <FaCheckCircle />
                      </button>
                      <button
                        className="decline-btn"
                        onClick={() => handleAction(index, "Declined")}
                      >
                        <FaTimesCircle />
                      </button>
                    </div>
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

export default ClientRequests;
