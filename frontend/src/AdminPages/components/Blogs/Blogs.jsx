import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import "react-toastify/dist/ReactToastify.css";
import "./Blogs.css";

const API = "http://localhost:5000/api/blogs";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    content: "",
  });

  // Fetch Blogs
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch(API);
      const data = await res.json();
      if (res.ok) setBlogs(data);
      else toast.error(data.message || "Failed to fetch blogs");
    } catch {
      toast.error("Server error while fetching blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Add or Edit Blog
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const method = editingBlog ? "PUT" : "POST";
    const url = editingBlog ? `${API}/${editingBlog._id}` : API;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        if (editingBlog) {
          toast.success("Blog updated successfully");
          setBlogs(
            blogs.map((b) => (b._id === editingBlog._id ? data.updatedBlog : b))
          );
        } else {
          toast.success("Blog added successfully");
          setBlogs([...blogs, data.blog]);
        }
        setFormData({ title: "", image: "", description: "", content: "" });
        setEditingBlog(null);
        setShowForm(false);
      } else {
        toast.error(data.message || "Failed to save blog");
      }
    } catch {
      toast.error("Server error while saving blog");
    } finally {
      setLoading(false);
    }
  };

  // Delete Blog
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      setLoading(true);
      try {
        const res = await fetch(`${API}/${id}`, { method: "DELETE" });
        const data = await res.json();

        if (res.ok) {
          toast.success("Blog deleted successfully");
          setBlogs(blogs.filter((b) => b._id !== id));
        } else {
          toast.error(data.message || "Failed to delete blog");
        }
      } catch {
        toast.error("Server error while deleting blog");
      } finally {
        setLoading(false);
      }
    }
  };

  // Edit Blog
  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      image: blog.image,
      description: blog.description,
      content: blog.content,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="admin-blogs">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="header-flex">
        <h2>Manage Blogs</h2>
        <button className="add-btn-top" onClick={() => setShowForm(!showForm)}>
          {showForm ? (
            <>
              <FaTimes /> Close
            </>
          ) : (
            <>
              <FaPlus /> Add Blog
            </>
          )}
        </button>
      </div>

      {/* Form Section */}
      {showForm && (
        <form className="add-blog-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <input
              type="text"
              placeholder="Blog Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Image URL"
              value={formData.image}
              onChange={(e) =>
                setFormData({ ...formData, image: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Short Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
            <textarea
              placeholder="Blog Content"
              rows="4"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              required
            ></textarea>
          </div>
          <div className="btn-flex">
            <button type="submit" className="save-btn" disabled={loading}>
              {loading
                ? editingBlog
                  ? "Updating..."
                  : "Adding..."
                : editingBlog
                ? "Update Blog"
                : "Add Blog"}
            </button>
            {editingBlog && (
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setEditingBlog(null);
                  setFormData({
                    title: "",
                    image: "",
                    description: "",
                    content: "",
                  });
                  setShowForm(false);
                }}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      )}

      {/* Loader Spinner */}
      {loading && (
        <div className="loader-container">
          <ThreeDots
      height="70"
      width="70"
      radius="9"
      color="#007bff"
      ariaLabel="three-dots-loading"
      visible={true}
    />
        </div>
      )}

      {/* Blogs List */}
      {!loading && (
        <div className="blogs-list">
          {blogs.length === 0 ? (
            <div className="no-data">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                alt="No data"
                className="no-data-img"
              />
              <p>No blogs found</p>
            </div>
          ) : (
            blogs.map((blog) => (
              <div key={blog._id} className="blog-card">
                {blog.image && (
                  <img src={blog.image} alt={blog.title} className="blog-img" />
                )}
                <div className="blog-info">
                  <h3>{blog.title}</h3>
                  <p className="desc">{blog.description}</p>
                  <p className="content">{blog.content.slice(0, 120)}...</p>
                </div>
                <div className="blog-actions">
                  <button className="edit-btn" onClick={() => handleEdit(blog)}>
                    <FaEdit /> Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(blog._id)}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Blogs;
