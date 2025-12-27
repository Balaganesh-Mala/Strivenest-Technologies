import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  IoLockClosedOutline,
  IoEyeOutline,
  IoEyeOffOutline,
} from "react-icons/io5";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        { password }
      );

      setSuccess(
        res.data.message || "Password reset successful"
      );

      setTimeout(() => {
        navigate("/developer/login");
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid or expired reset link"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6">
        {/* ICON */}
        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
          <IoLockClosedOutline className="text-indigo-600 text-xl" />
        </div>

        {/* TITLE */}
        <h2 className="text-lg font-semibold text-center text-slate-800">
          Reset your password
        </h2>
        <p className="text-sm text-gray-500 text-center mt-1">
          Create a new password for your account
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* NEW PASSWORD */}
          <div className="relative">
            <label className="block text-xs text-gray-500 mb-1">
              New password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="relative">
            <label className="block text-xs text-gray-500 mb-1">
              Confirm password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Re-enter new password"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-600"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              required
            />

            {/* SHOW / HIDE */}
            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <IoEyeOffOutline />
              ) : (
                <IoEyeOutline />
              )}
            </button>
          </div>

          {/* SUCCESS */}
          {success && (
            <div className="text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
              {success} <br />
              Redirecting to login…
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg text-sm font-medium disabled:opacity-60 transition"
          >
            {loading ? "Resetting password..." : "Reset Password"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-xs text-gray-400 text-center mt-4">
          For security reasons, use a strong password.
        </p>
      </div>
    </div>
  );
}
