import { useState } from "react";
import axios from "axios";
import { IoMailOutline } from "react-icons/io5";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email) {
      setError("Please enter your registered email address");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      );

      setMessage(
        res.data.message ||
          "Password reset link has been sent to your email"
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to send reset link. Please try again."
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
          <IoMailOutline className="text-indigo-600 text-xl" />
        </div>

        {/* TITLE */}
        <h2 className="text-lg font-semibold text-center text-slate-800">
          Forgot your password?
        </h2>
        <p className="text-sm text-gray-500 text-center mt-1">
          Enter your email and we’ll send you a reset link.
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* EMAIL */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Email address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* SUCCESS */}
          {message && (
            <div className="text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
              {message}
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
            {loading ? "Sending reset link..." : "Send Reset Link"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-xs text-gray-400 text-center mt-4">
          For security reasons, the link will expire shortly.
        </p>
      </div>
    </div>
  );
}
