import React, { useState, useEffect } from "react";
import "./Blogs.css";

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    category: "",
    status: "Published",
  });

  const token = localStorage.getItem("adminToken"); // JWT stored after login

  // ✅ Fetch blogs (Admin view)
  const fetchBlogs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/blogs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setBlogs(data.data);
      } else {
        setError("Failed to load blogs");
      }
    } catch (err) {
      console.error(err);
      setError("Error fetching blogs. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Add Blog
  const handleAddBlog = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setBlogs([data.data, ...blogs]);
        setFormData({
          title: "",
          content: "",
          image: "",
          category: "",
          status: "Published",
        });
        setShowForm(false);
      } else {
        alert(data.message || "Failed to add blog");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding blog");
    }
  };

  // ✅ Edit Blog
  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      image: blog.image,
      category: blog.category,
      status: blog.status,
    });
    setEditMode(true);
    setShowForm(true);
  };

  // ✅ Update Blog
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/blogs/${selectedBlog._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setBlogs(
          blogs.map((b) => (b._id === selectedBlog._id ? data.data : b))
        );
        setEditMode(false);
        setSelectedBlog(null);
        setShowForm(false);
        setFormData({
          title: "",
          content: "",
          image: "",
          category: "",
          status: "Published",
        });
      } else {
        alert(data.message || "Failed to update blog");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating blog");
    }
  };

  // ✅ Delete Blog
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setBlogs(blogs.filter((b) => b._id !== id));
      } else {
        alert(data.message || "Failed to delete blog");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting blog");
    }
  };

  if (loading) return <p className="loading">Loading blogs...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="admin-blogs-container">
      <div className="blogs-header">
        <h2>Manage Blogs</h2>
        <button
          className="add-blog-btn"
          onClick={() => {
            setShowForm(!showForm);
            setEditMode(false);
            setSelectedBlog(null);
            setFormData({
              title: "",
              content: "",
              image: "",
              category: "",
              status: "Published",
            });
          }}
        >
          {showForm ? "Close Form" : "Add Blog"}
        </button>
      </div>

      {/* ✅ Toggle Blog Form */}
      {showForm && (
        <form
          className="blog-form"
          onSubmit={editMode ? handleUpdate : handleAddBlog}
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="content"
            placeholder="Content"
            rows="4"
            value={formData.content}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>

          <button type="submit" className="submit-btn">
            {editMode ? "Update Blog" : "Add Blog"}
          </button>
        </form>
      )}

      {/* ✅ Blog List Table */}
      <div className="blog-table-wrapper">
        {blogs.length === 0 ? (
          <p>No blogs found.</p>
        ) : (
          <table className="blog-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id}>
                  <td>{blog.title}</td>
                  <td>{blog.category}</td>
                  <td>{blog.status}</td>
                  <td>
                    {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(blog)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(blog._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminBlogs;
