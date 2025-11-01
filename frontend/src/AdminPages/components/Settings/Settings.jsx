import React, { useState } from "react";
import Swal from "sweetalert2"; // ✅ Import SweetAlert2
import {
  FaUserCog,
  FaGlobe,
  FaShieldAlt,
} from "react-icons/fa";
import "./Settings.css";

const Settings = () => {
  // Account Settings
  const [name, setName] = useState("Admin User");
  const [email, setEmail] = useState("admin@example.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // System Preferences
  const [language, setLanguage] = useState("English");
  const [timezone, setTimezone] = useState("IST");

  const languages = ["English", "Hindi", "Telugu", "Tamil", "French"];
  const timezones = ["IST", "GMT", "EST", "CST", "PST"];

  // Handlers
  const handleSaveAccount = () => {
    Swal.fire({
      icon: "success",
      title: "Account Updated!",
      text: "✅ Account settings updated successfully!",
      confirmButtonColor: "#3b82f6",
    });
  };

  const handleSavePreferences = () => {
    Swal.fire({
      icon: "success",
      title: "Preferences Saved!",
      text: "✅ System preferences saved successfully!",
      confirmButtonColor: "#3b82f6",
    });
  };

  const handleDownloadData = () => {
    Swal.fire({
      icon: "info",
      title: "Download Started",
      text: "📦 Your data download will begin shortly!",
      confirmButtonColor: "#3b82f6",
    });
  };

  const handleClearCache = () => {
    Swal.fire({
      icon: "success",
      title: "Cache Cleared!",
      text: "🧹 Cache cleared successfully!",
      confirmButtonColor: "#3b82f6",
    });
  };

  // ✅ Third-party Confirm Popup
  const handleDeleteAccount = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "❌ Your account has been permanently deleted.",
          confirmButtonColor: "#3b82f6",
        });
      }
    });
  };

  return (
    <div className="settings-page">
      {/* ---------- Account Settings ---------- */}
      <div className="settings-card">
        <h2>
          <FaUserCog className="icon" /> Account Settings
        </h2>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        <button className="btn blue" onClick={handleSaveAccount}>
          Save Account Changes
        </button>
      </div>

      {/* ---------- System Preferences ---------- */}
      <div className="settings-card">
        <h2>
          <FaGlobe className="icon" /> System Preferences
        </h2>
        <div className="form-group">
          <label>Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={lang}>{lang}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Timezone</label>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
          >
            {timezones.map((tz) => (
              <option key={tz}>{tz}</option>
            ))}
          </select>
        </div>
        <button className="btn blue" onClick={handleSavePreferences}>
          Save System Preferences
        </button>
      </div>

      {/* ---------- Privacy Options ---------- */}
      <div className="settings-card">
        <h2>
          <FaShieldAlt className="icon" /> Privacy Options
        </h2>
        <div className="button-group">
          <button className="btn gray" onClick={handleDownloadData}>
            Download My Data
          </button>
          <button className="btn gray" onClick={handleClearCache}>
            Clear Cache
          </button>
          <button className="btn red" onClick={handleDeleteAccount}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
