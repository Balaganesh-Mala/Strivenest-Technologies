import React, { useState } from "react";
import topfive from "../../assets/BlogsImg/topfive.png";
import business from "../../assets/BlogsImg/bussiness.png";
import cloud from "../../assets/BlogsImg/cloud.png";
import "./Blogs.css";

const blogsData = [
  {
    id: 1,
    title: "Top 5 Web Development Trends for 2025",
    image: `${topfive}`,
    date: "October 28, 2025",
    description:
      "Discover the latest trends shaping the web development industry in 2025, including AI-driven design, serverless technology, and advanced front-end frameworks.",
    content:
      "The web development landscape continues to evolve rapidly. In 2025, developers are focusing more on AI automation, headless CMS, and better user experience design. With tools like Next.js, React, and cloud integration, websites are becoming faster, smarter, and more interactive.",
  },
  {
    id: 2,
    title: "Why Every Business Needs a Mobile App",
    image: `${business}`,
    date: "September 15, 2025",
    description:
      "Mobile apps are no longer optional. Learn how having a business app boosts customer engagement and helps your brand stay competitive in the digital age.",
    content:
      "From startups to enterprises, mobile apps play a crucial role in customer retention. A well-designed mobile app increases accessibility, allows direct marketing, and enhances the customer experience — all key factors for business growth.",
  },
  {
    id: 3,
    title: "Cloud Services: The Backbone of Modern Businesses",
    image: `${cloud}`,
    date: "August 5, 2025",
    description:
      "Cloud technology empowers businesses to scale efficiently. Here’s how cloud solutions like AWS, Google Cloud, and Azure are transforming industries.",
    content:
      "Cloud services provide secure storage, data processing, and scalability for all types of businesses. From e-commerce platforms to AI-driven apps, the cloud ensures high performance, flexibility, and reliability while reducing operational costs.",
  },
];

const Blogs = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  return (
    <section id="blog" className="blogs-section">
      <h2 className="blogs-title">Our Latest Blogs</h2>

      {!selectedBlog ? (
        <div className="blogs-grid">
          {blogsData.map((blog) => (
            <div key={blog.id} className="blog-card">
              <img src={blog.image} alt={blog.title} className="blog-image" />
              <div className="blog-content">
                <h3>{blog.title}</h3>
                <p className="blog-date">{blog.date}</p>
                <p className="blog-desc">{blog.description}</p>
                <button onClick={() => setSelectedBlog(blog)} className="read-more">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="blog-detail">
          <button className="back-btn" onClick={() => setSelectedBlog(null)}>
            ← Back to Blogs
          </button>
          <img src={selectedBlog.image} alt={selectedBlog.title} className="detail-image" />
          <h2>{selectedBlog.title}</h2>
          <p className="blog-date">{selectedBlog.date}</p>
          <p className="blog-full-content">{selectedBlog.content}</p>
        </div>
      )}
    </section>
  );
};

export default Blogs;
