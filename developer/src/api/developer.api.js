import axios from "axios";

const developerApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/* ================= AUTH HEADER ================= */
developerApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("developer_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default developerApi;

/* ================= AUTH ================= */
export const developerLogin = (data) => {
  return developerApi.post("/developer-auth/login", data);
};
/* ================= PROJECT APIs ================= */
export const fetchMyProjects = () =>
  developerApi.get("/developer/projects");

export const respondToProject = (id, response) =>
  developerApi.put(`/developer/projects/${id}/respond`, {
    response,
  });

export const updateProgress = (id, data) =>
  developerApi.put(`/developer/projects/${id}/progress`, data);

export const completeProject = (id) =>
  developerApi.put(`/developer/projects/${id}/complete`);

