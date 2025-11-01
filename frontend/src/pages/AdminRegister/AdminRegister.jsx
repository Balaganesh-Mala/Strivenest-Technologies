import React, { useState } from "react";
import axios from "axios";
import { FaUserPlus } from "react-icons/fa";
import "./AdminRegister.css";

const AdminRegister = () => {
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (admin.password !== admin.confirmPassword) {
      setMessage("⚠️ Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/register",
        {
          name: admin.name,
          email: admin.email,
          password: admin.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setMessage(response.data.message || "✅ Admin registered successfully!");
      setAdmin({ name: "", email: "", password: "", confirmPassword: "" });
    } catch (error) {
      setMessage(
        error.response?.data?.message || "❌ Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-register-container">
      <form className="admin-register-form" onSubmit={handleSubmit}>
        <h2>
          <FaUserPlus className="icon" /> Admin Registration
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={admin.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={admin.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={admin.password}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={admin.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default AdminRegister;
