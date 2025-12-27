import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDeveloperAuth } from "../../context/DeveloperAuthContext";
import { IoEye, IoEyeOff, IoMail, IoLockClosed } from "react-icons/io5";

export default function DeveloperLogin() {
  const navigate = useNavigate();
  const { login } = useDeveloperAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      await login(form.email, form.password);
      navigate("/developer/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm space-y-5"
      >
        {/* HEADER */}
        <div className="text-center space-y-1">
          <h1 className="text-xl font-bold text-slate-800">
            Developer Login
          </h1>
          <p className="text-xs text-gray-500">
            Access your developer dashboard
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <p className="text-red-600 text-sm text-center">
            {error}
          </p>
        )}

        {/* EMAIL */}
        <div className="relative">
          <span className="absolute left-3 top-2.5 text-gray-400">
            <IoMail />
          </span>
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg pl-10 pr-3 py-2 text-sm focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        {/* PASSWORD */}
        <div className="relative">
          <span className="absolute left-3 top-2.5 text-gray-400">
            <IoLockClosed />
          </span>

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border rounded-lg pl-10 pr-10 py-2 text-sm focus:ring-2 focus:ring-indigo-600"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-700"
          >
            {showPassword ? <IoEyeOff /> : <IoEye />}
          </button>
        </div>

        {/* FORGOT PASSWORD */}
        <div className="text-right">
          <Link
            to="/developer/forgot-password"
            className="text-xs text-indigo-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg text-sm font-medium disabled:opacity-50 transition"
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
