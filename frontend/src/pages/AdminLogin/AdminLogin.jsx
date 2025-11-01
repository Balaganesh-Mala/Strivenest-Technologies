import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", form, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.data.success) {
        // Store JWT token in localStorage
        localStorage.setItem("adminToken", res.data.token);
        setMessage("Login successful! Redirecting...");
        setTimeout(() => navigate("/admin"), 1000);
      } else {
        setMessage(res.data.message || "Login failed. Try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage(err.response?.data?.message || "Invalid email or password.");
    }
  };

  return (
    <div className="admin-login-container">
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <h2>Admin Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Enter admin email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;
