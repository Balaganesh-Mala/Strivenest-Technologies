import { useEffect, useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

const API = `${import.meta.env.VITE_API_BASE_URL}/blogs`;

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH BLOGS ================= */
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API);
      setBlogs(res.data?.success ? res.data.data : []);
    } catch (err) {
      console.error("Failed to fetch blogs", err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOADER ================= */
  if (loading) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center">
        <ThreeDots
          height="70"
          width="70"
          radius="9"
          color="#4f46e5"
          ariaLabel="loading"
          visible
        />
      </section>
    );
  }

  return (
    <section className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Our Latest Blogs
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Insights, updates & tech knowledge
          </p>
        </div>

        {/* ================= BLOG LIST ================= */}
        {!selectedBlog ? (
          blogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <img
                src="https://ik.imagekit.io/izqq5ffwt/ChatGPT%20Image%20Nov%201,%202025,%2010_36_03%20PM.png"
                alt="No blogs"
                className="w-56 mb-4 opacity-80"
              />
              <p className="text-sm">No blogs available</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <article
                  key={blog._id}
                  className="group bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-md transition"
                >
                  {/* IMAGE */}
                  <img
                    src={
                      blog.image ||
                      "https://ik.imagekit.io/izqq5ffwt/default-blog.jpg"
                    }
                    alt={blog.title}
                    className="h-48 w-full object-cover group-hover:scale-105 transition duration-300"
                  />

                  {/* CONTENT */}
                  <div className="p-5 space-y-2">
                    <h3 className="font-semibold text-slate-800 line-clamp-2">
                      {blog.title}
                    </h3>

                    <p className="text-xs text-gray-400">
                      {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>

                    <p className="text-sm text-gray-600 line-clamp-3">
                      {blog.content}
                    </p>

                    <button
                      onClick={() => setSelectedBlog(blog)}
                      className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:underline"
                    >
                      Read more →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )
        ) : (
          /* ================= BLOG DETAIL ================= */
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border p-6 sm:p-8">
            <button
              onClick={() => setSelectedBlog(null)}
              className="mb-4 text-sm text-indigo-600 hover:underline"
            >
              ← Back to Blogs
            </button>

            <img
              src={
                selectedBlog.image ||
                "https://ik.imagekit.io/izqq5ffwt/default-blog.jpg"
              }
              alt={selectedBlog.title}
              className="w-full h-64 object-cover rounded-xl mb-6"
            />

            <h1 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">
              {selectedBlog.title}
            </h1>

            <p className="text-xs text-gray-400 mb-6">
              {new Date(selectedBlog.createdAt).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>

            <div className="prose prose-slate max-w-none text-sm sm:text-base">
              {selectedBlog.content}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
