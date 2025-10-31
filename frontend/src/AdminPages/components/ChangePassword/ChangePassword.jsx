import React, { useState } from "react";
import axios from "axios";
import "./ChangePassword.css";

const ChangePassword = () => {
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setPasswords({ ...passwords, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    try {
      await axios.put("http://localhost:5000/api/admin/change-password", {
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword,
      });
      alert("Password updated successfully!");
      setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      alert("Error updating password.");
    }
  };

  return (
    <div className="change-password">
      <h2>Change Password</h2>

      <form onSubmit={handleSubmit} className="password-form">
        <label>Old Password</label>
        <input
          type="password"
          name="oldPassword"
          value={passwords.oldPassword}
          onChange={handleChange}
          required
        />

        <label>New Password</label>
        <input
          type="password"
          name="newPassword"
          value={passwords.newPassword}
          onChange={handleChange}
          required
        />

        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={passwords.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit">Update Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
