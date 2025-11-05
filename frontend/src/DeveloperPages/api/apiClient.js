import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

function getAuthToken() {
  return localStorage.getItem("token");
}

function setAuthToken(token) {
  if (token) {
    localStorage.setItem("token", token);
    API.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
    delete API.defaults.headers.common.Authorization;
  }
}

const token = getAuthToken();
if (token) API.defaults.headers.common.Authorization = `Bearer ${token}`;

API.interceptors.request.use(
  (config) => {
    const t = getAuthToken();
    if (t && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${t}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      setAuthToken(null);
      window.dispatchEvent(new Event("app:logout"));
    }
    return Promise.reject(err);
  }
);

export { API as default, setAuthToken, getAuthToken };
