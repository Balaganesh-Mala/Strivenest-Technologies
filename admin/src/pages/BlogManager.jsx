import { useEffect, useState } from "react";
import {
  fetchAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../api/admin.api";

import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiX,
  FiImage,
} from "react-icons/fi";

/* ================= INITIAL FORM ================= */
const initialForm = {
  title: "",
  content: "",
  category: "",
  status: "Published",
  image: null,
};

export default function BlogManager() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [showForm, setShowForm] = useState(false);

  /* ================= LOAD BLOGS ================= */
  const loadBlogs = async () => {
    const res = await fetchAllBlogs();
    setBlogs(res.data.data || []);
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  /* ================= HANDLERS ================= */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setForm({ ...form, image: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => v && fd.append(k, v));

      editingId ? await updateBlog(editingId, fd) : await createBlog(fd);

      handleClose();
      loadBlogs();
    } catch {
      alert("Failed to save blog");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog) => {
    setEditingId(blog._id);
    setForm({
      title: blog.title,
      content: blog.content,
      category: blog.category,
      status: blog.status,
      image: null,
    });
    setPreview(blog.image || null);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this blog?")) return;
    await deleteBlog(id);
    loadBlogs();
  };

  const handleClose = () => {
    setForm(initialForm);
    setEditingId(null);
    setPreview(null);
    setShowForm(false);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-800">
          Blog Management
        </h1>

        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700"
        >
          <FiPlus /> Add Blog
        </button>
      </div>

      {/* ================= BLOG TABLE ================= */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="p-4 text-left">Title</th>
              <th>Status</th>
              <th>Category</th>
              <th className="text-right pr-6">Actions</th>
            </tr>
          </thead>

          <tbody>
            {blogs.map((b) => (
              <tr
                key={b._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4 font-medium">{b.title}</td>

                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      b.status === "Published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>

                <td>{b.category || "-"}</td>

                <td className="text-right pr-6 space-x-4">
                  <button
                    onClick={() => handleEdit(b)}
                    className="text-indigo-600 hover:text-indigo-800"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(b._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}

            {blogs.length === 0 && (
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-400">
                  No blogs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= MODAL FORM ================= */}
      {showForm && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
    {/* MODAL */}
    <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">

      {/* ===== HEADER ===== */}
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <h2 className="text-lg font-semibold text-slate-800">
          {editingId ? "Edit Blog Post" : "Create New Blog"}
        </h2>

        <button
          onClick={handleClose}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <FiX className="text-gray-500" size={18} />
        </button>
      </div>

      {/* ===== BODY ===== */}
      <form
        onSubmit={handleSubmit}
        className="flex-1 overflow-y-auto px-6 py-5 space-y-5"
      >
        {/* TITLE */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Blog Title
          </label>
          <input
            name="title"
            placeholder="Enter blog title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-200 focus:outline-none"
            required
          />
        </div>

        {/* CONTENT */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1">
            Content
          </label>
          <textarea
            name="content"
            rows="6"
            placeholder="Write your blog content here..."
            value={form.content}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm resize-none focus:ring-2 focus:ring-indigo-200 focus:outline-none"
            required
          />
        </div>

        {/* CATEGORY + STATUS */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Category
            </label>
            <input
              name="category"
              placeholder="Eg: Technology"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-200 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-200 focus:outline-none"
            >
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
        </div>

        {/* IMAGE UPLOAD */}
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-2">
            Featured Image
          </label>

          <label className="flex items-center justify-center gap-2 border border-dashed rounded-xl py-6 cursor-pointer hover:bg-gray-50 transition text-sm text-gray-600">
            <FiImage />
            Click to upload image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </label>

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-4 h-44 w-full object-cover rounded-xl border"
            />
          )}
        </div>
      </form>

      {/* ===== FOOTER ===== */}
      <div className="px-6 py-4 border-t flex justify-end gap-3 bg-gray-50 rounded-b-2xl">
        <button
          type="button"
          onClick={handleClose}
          className="px-4 py-2 rounded-lg text-sm border hover:bg-gray-100 transition"
        >
          Cancel
        </button>

        <button
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          className="px-5 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 transition"
        >
          {loading ? "Saving..." : "Save Blog"}
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
