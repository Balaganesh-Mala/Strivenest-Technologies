import React, { useState, useEffect } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import "./Blogs.css";

const API = "http://localhost:5000/api/blogs";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch blogs when component mounts
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API);
      // ✅ Ensure backend returns { success: true, data: [...] }
      if (res.data.success) {
        setBlogs(res.data.data);
      } else {
        setBlogs([]);
      }
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="blogs" className="blogs-section">
      <h2 className="blogs-title">Our Latest Blogs</h2>

      {/* ✅ Loader */}
      {loading ? (
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
      ) : !selectedBlog ? (
        // ✅ Blog Grid
        <div className="blogs-grid">
          {blogs.length === 0 ? (
            <div className="no-data">
              <img
                src="https://ik.imagekit.io/izqq5ffwt/ChatGPT%20Image%20Nov%201,%202025,%2010_36_03%20PM.png"
                alt="No Blogs"
              />
              <p>No blogs available</p>
            </div>
          ) : (
            blogs.map((blog) => (
              <div key={blog._id} className="blog-card">
                <img
                  src={
                    blog.image ||
                    "https://ik.imagekit.io/izqq5ffwt/default-blog.jpg"
                  }
                  alt={blog.title}
                  className="blog-image"
                />
                <div className="blog-content">
                  <h3>{blog.title}</h3>
                  <p className="blog-date">
                    {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <p className="blog-desc">
                    {blog.content.length > 120
                      ? blog.content.substring(0, 120) + "..."
                      : blog.content}
                  </p>
                  <button
                    onClick={() => setSelectedBlog(blog)}
                    className="read-more"
                  >
                    Read More →
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        // ✅ Blog Detail View
        <div className="blog-detail">
          <button className="back-btn" onClick={() => setSelectedBlog(null)}>
            ← Back to Blogs
          </button>
          <img
            src={
              selectedBlog.image ||
              "https://ik.imagekit.io/izqq5ffwt/default-blog.jpg"
            }
            alt={selectedBlog.title}
            className="detail-image"
          />
          <h2>{selectedBlog.title}</h2>
          <p className="blog-date">
            {new Date(selectedBlog.createdAt).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
          <p className="blog-full-content">{selectedBlog.content}</p>
        </div>
      )}
    </section>
  );
};

export default Blogs;
