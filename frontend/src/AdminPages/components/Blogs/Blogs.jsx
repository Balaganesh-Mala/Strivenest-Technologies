import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  
  FaPlus
  
  
  
} from "react-icons/fa";
import "./Blogs.css";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: "",
    imageUrl: "",
    description: "",
    content: "",
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/blogs");
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/admin/blogs", newBlog);
      setBlogs([...blogs, res.data]);
      setNewBlog({ title: "", imageUrl: "", description: "", content: "" });
      alert("Blog added successfully!");
    } catch (error) {
      alert("Error adding blog.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/blogs/${id}`);
        setBlogs(blogs.filter((b) => b._id !== id));
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  return (
    <div className="admin-blogs">
      <h2>Manage Blogs</h2>

      <form className="add-blog-form" onSubmit={handleAdd}>
        <div className="form-grid">
          <div className="form-group">
            
            <input
              type="text"
              placeholder="Blog Title"
              value={newBlog.title}
              onChange={(e) =>
                setNewBlog({ ...newBlog, title: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            
            <input
              type="text"
              placeholder="Image URL"
              value={newBlog.imageUrl}
              onChange={(e) =>
                setNewBlog({ ...newBlog, imageUrl: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
           
            <input
              type="text"
              placeholder="Short Description"
              value={newBlog.description}
              onChange={(e) =>
                setNewBlog({ ...newBlog, description: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group full-width">
            <textarea
              placeholder="Blog Content"
              value={newBlog.content}
              onChange={(e) =>
                setNewBlog({ ...newBlog, content: e.target.value })
              }
              required
            ></textarea>
          </div>
        </div>

        <button type="submit" className="add-btn">
          <FaPlus /> Add Blog
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
              <p className="content">{blog.content.slice(0, 120)}...</p>
            </div>
            <div className="blog-actions">
              <button className="edit-btn">
                 Edit
              </button>
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
