

import React, { useState } from "react";
import axios from "axios";
import { FaLaptopCode } from "react-icons/fa";
import "./DeveloperLogin.css";

const DeveloperLogin = () => {
  const [dev, setDev] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setDev({ ...dev, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: dev.email,
          password: dev.password,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (data.success && data.user.role === "Developer") {
        localStorage.setItem("developerToken", data.token);
        localStorage.setItem("developerName", data.user.name);
        setMessage("✅ Developer login successful!");
        window.location.href = "/developer/dashboard";
      } else {
        setMessage("❌ Unauthorized access. Developer only.");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "❌ Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="developer-login-container">
      <form className="developer-login-form" onSubmit={handleSubmit}>
        <h2>
          <FaLaptopCode className="icon" /> Developer Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Developer Email"
          value={dev.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={dev.password}
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

export default DeveloperLogin;
