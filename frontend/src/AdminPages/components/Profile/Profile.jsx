import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Administrator",
  });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // Fetch admin profile from backend
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/profile");
        setProfile(res.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:5000/api/admin/profile", profile);
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Error updating profile.");
    }
  };

  return (
    <div className="admin-profile">
      <h2>Admin Profile</h2>

      <div className="profile-card">
        <img
          src="https://ik.imagekit.io/izqq5ffwt/avatar.jpg"
          alt="Admin Avatar"
          className="profile-avatar"
        />

        <form onSubmit={handleUpdate}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            disabled={!editMode}
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            disabled={!editMode}
            onChange={handleChange}
          />

          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={profile.phone}
            disabled={!editMode}
            onChange={handleChange}
          />

          <label>Role</label>
          <input type="text" value={profile.role} disabled />

          {editMode ? (
            <div className="profile-actions">
              <button type="submit" className="save-btn">
                Save
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="edit-btn"
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;
