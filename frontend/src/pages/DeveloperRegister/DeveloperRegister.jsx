import React, { useState } from "react";
import axios from "axios";
import { FaUserCog } from "react-icons/fa";
import "./DeveloperRegister.css";

const DeveloperRegister = () => {
  const [developer, setDeveloper] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setDeveloper({ ...developer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (developer.password !== developer.confirmPassword) {
      setMessage("⚠️ Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: developer.name,
          email: developer.email,
          password: developer.password,
          role: "Developer",
        },
        { headers: { "Content-Type": "application/json" } }
      );

      setMessage("✅ Developer registered successfully!");
      setDeveloper({ name: "", email: "", password: "", confirmPassword: "" });
    } catch (error) {
      setMessage(
        error.response?.data?.message || "❌ Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>
          <FaUserCog className="icon" /> Developer Registration
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={developer.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={developer.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={developer.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={developer.confirmPassword}
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

export default DeveloperRegister;
