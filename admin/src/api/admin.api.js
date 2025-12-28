import axios from "axios";

const adminApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
});

/* ================= AUTH HEADER ================= */
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default adminApi;

/* ================= CLIENT REQUESTS ================= */
export const fetchAllRequests = () => {
  return adminApi.get("/admin/requests");
};

export const updateRequestStatus = (id, status) => {
  return adminApi.put(`/admin/requests/${id}/status`, { status });
};

/* ================= PROJECT ASSIGN ================= */
export const assignProject = (data) => {
  return adminApi.post("/admin/projects/assign", data);
};


/* ================= DEVELOPER MANAGEMENT ================= */

// ✅ Get ALL developers (admin page)
export const fetchDevelopers = () => {
  return adminApi.get("/admin/developers/all");
};

// ✅ Create developer
export const createDeveloper = (data) => {
  return adminApi.post("/admin/developers", data);
};

// ✅ Enable / Disable developer
export const toggleDeveloperStatus = (id, isActive) => {
  return adminApi.put(`/admin/developers/${id}/status`, { isActive });
};

// ✅ Get eligible developers (assign modal)
export const fetchEligibleDevelopers = (serviceType) => {
  return adminApi.get(
    `/admin/developers/eligible?serviceType=${serviceType}&_=${Date.now()}`
  );
};



// Fetch all projects
export const fetchAllProjects = () => {
  return adminApi.get("/projects");
};

// Mark project completed
export const completeProject = (projectId) => {
  return adminApi.put(`/projects/${projectId}/complete`);
};


/* ================= BLOG MANAGEMENT ================= */

// ✅ Get all blogs (Admin – includes Draft & Published)
export const fetchAllBlogs = () => {
  return adminApi.get("/blogs");
};

// ✅ Create new blog
export const createBlog = (data) => {
  return adminApi.post("/blogs", data);
};

// ✅ Update blog
export const updateBlog = (id, data) => {
  return adminApi.put(`/blogs/${id}`, data);
};

// ✅ Delete blog
export const deleteBlog = (id) => {
  return adminApi.delete(`/blogs/${id}`);
};
