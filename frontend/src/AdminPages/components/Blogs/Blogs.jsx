import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Blogs.css";

const API = "http://localhost:5000/api/admin/blogs"


const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: "",
    imageUrl: "",
    description: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      if (res.ok) setBlogs(data);
    } catch {
      toast.error("Failed to fetch blogs");
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBlog),
      });
      const data = await res.json();
      if (res.ok) {
        setBlogs([...blogs, data]);
        setNewBlog({ title: "", imageUrl: "", description: "", content: "" });
        toast.success("Blog added successfully");
      } else {
        toast.error(data.message || "Failed to add blog");
      }
    } catch {
      toast.error("Server error while adding blog");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        const res = await fetch(`${API}/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          setBlogs(blogs.filter((b) => b._id !== id));
          toast.success("Blog deleted successfully");
        } else {
          toast.error("Failed to delete blog");
        }
      } catch {
        toast.error("Error deleting blog");
      }
    }
  };

  return (
    <div className="admin-blogs">
      <ToastContainer position="top-center" autoClose={2000} />
      <h2>Manage Blogs</h2>

      <form className="add-blog-form" onSubmit={handleAdd}>
        <div className="form-grid">
          <input
            type="text"
            placeholder="Blog Title"
            value={newBlog.title}
            onChange={(e) =>
              setNewBlog({ ...newBlog, title: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newBlog.imageUrl}
            onChange={(e) =>
              setNewBlog({ ...newBlog, imageUrl: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Short Description"
            value={newBlog.description}
            onChange={(e) =>
              setNewBlog({ ...newBlog, description: e.target.value })
            }
            required
          />
          <textarea
            placeholder="Blog Content"
            rows="4"
            value={newBlog.content}
            onChange={(e) =>
              setNewBlog({ ...newBlog, content: e.target.value })
            }
            required
          ></textarea>
        </div>

        <button type="submit" className="add-btn" disabled={loading}>
          <FaPlus /> {loading ? "Adding..." : "Add Blog"}
        </button>
      </form>

      <div className="blogs-list">
        {blogs.map((blog) => (
          <div key={blog._id} className="blog-card">
            {blog.imageUrl && (
              <img src={blog.imageUrl} alt={blog.title} className="blog-img" />
            )}
            <div className="blog-info">
              <h3>{blog.title}</h3>
              <p className="desc">{blog.description}</p>
              <p className="content">
                {blog.content.slice(0, 120)}...
              </p>
            </div>
            <div className="blog-actions">
              <button className="edit-btn">Edit</button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(blog._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
