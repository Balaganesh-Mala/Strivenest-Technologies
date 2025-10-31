import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEnvelopeOpenText, FaTrashAlt } from "react-icons/fa";
import "./ClientRequests.css";

const ClientRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/requests");
        setRequests(res.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };
    fetchRequests();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this request?")) {
      await axios.delete(`http://localhost:5000/api/admin/requests/${id}`);
      setRequests(requests.filter((r) => r._id !== id));
    }
  };

  return (
    <div className="client-requests">
      <h2>Client Requests</h2>
      <div className="requests-list">
        {requests.map((req) => (
          <div key={req._id} className="request-card">
            <h3>{req.name}</h3>
            <p><strong>Email:</strong> {req.email}</p>
            <p><strong>Message:</strong> {req.message}</p>
            <div className="request-actions">
              <button className="view-btn">
                <FaEnvelopeOpenText /> View
              </button>
              <button className="delete-btn" onClick={() => handleDelete(req._id)}>
                <FaTrashAlt /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientRequests;
