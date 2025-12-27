import { useState } from "react";
import { useNavigate } from "react-router-dom";
import adminApi from "../../api/admin.api";
import {
  IoEye,
  IoEyeOff,
  IoMailOutline,
  IoLockClosedOutline,
} from "react-icons/io5";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const res = await adminApi.post("/admin-auth/login", form);

      localStorage.setItem("admin_token", res.data.token);
      localStorage.setItem(
        "admin_user",
        JSON.stringify(res.data.admin)
      );

      navigate("/admin/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-5"
      >
        {/* HEADER */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-slate-800">
            Admin Login
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Sign in to access admin panel
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="text-sm text-red-600 text-center bg-red-50 border border-red-200 rounded-lg py-2 px-3">
            {error}
          </div>
        )}

        {/* EMAIL */}
        <div className="relative">
          <label className="block text-xs text-gray-500 mb-1">
            Email address
          </label>
          <span className="absolute left-3 top-9 text-gray-400">
            <IoMailOutline />
          </span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="admin@example.com"
            className="w-full border rounded-lg pl-10 pr-3 py-2.5 text-sm focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none"
          />
        </div>

        {/* PASSWORD */}
        <div className="relative">
          <label className="block text-xs text-gray-500 mb-1">
            Password
          </label>

          <span className="absolute left-3 top-9 text-gray-400">
            <IoLockClosedOutline />
          </span>

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            placeholder="••••••••"
            className="w-full border rounded-lg pl-10 pr-10 py-2.5 text-sm focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="absolute right-3 top-9 text-gray-400 hover:text-gray-700"
          >
            {showPassword ? <IoEyeOff /> : <IoEye />}
          </button>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg text-sm font-medium transition disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* FOOTER */}
        <p className="text-[11px] text-gray-400 text-center">
          Authorized access only
        </p>
      </form>
    </div>
  );
}
