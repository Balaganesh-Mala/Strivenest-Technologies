import React, { useState } from "react";
import "./Settings.css";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  const handleSave = () => alert("Settings updated successfully!");

  return (
    <div className="settings">
      <h2>Settings</h2>

      <div className="settings-card">
        <label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          Enable Dark Mode
        </label>

        <label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
          Enable Notifications
        </label>

        <button onClick={handleSave}>Save Changes</button>
      </div>
    </div>
  );
};

export default Settings;
