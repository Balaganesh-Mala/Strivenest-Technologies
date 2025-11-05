import React, { useState } from "react";
import axios from "axios";
import { FaUserShield } from "react-icons/fa";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [admin, setAdmin] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        admin,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("API Response:", data); // helpful debug

      if (data.success && data.data) {
        const userData = data.data;
        localStorage.setItem("adminToken", userData.token);
        localStorage.setItem("adminName", userData.name);
        localStorage.setItem("adminRole", userData.role);

        setMessage("Admin login successful!");
        window.location.href = "/admin"; // redirect to admin dashboard
      } else {
        setMessage("Invalid credentials");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <h2>
          <FaUserShield className="icon" /> Admin Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Admin Email"
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

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;
