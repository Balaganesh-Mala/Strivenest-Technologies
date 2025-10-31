import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", form);
      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login - Strivenest Technologies</h2>
      <form onSubmit={handleSubmit} className="admin-login-form">
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
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;
