import { Link, useLocation } from "react-router-dom";
import { FiAlertTriangle, FiHome } from "react-icons/fi";

export default function NotFound() {
  const location = useLocation();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border p-8 text-center">
        {/* ICON */}
        <div className="mx-auto mb-4 h-14 w-14 flex items-center justify-center rounded-full bg-red-100 text-red-600">
          <FiAlertTriangle className="text-2xl" />
        </div>

        {/* TITLE */}
        <h1 className="text-2xl font-semibold text-slate-800">
          Page Not Found
        </h1>

        {/* INFO */}
        <p className="text-sm text-gray-500 mt-2">
          The page
          <span className="mx-1 font-medium text-slate-700">
            {location.pathname}
          </span>
          does not exist or was moved.
        </p>

        {/* ACTION */}
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center justify-center gap-2 mt-6 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition"
        >
          <FiHome />
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
