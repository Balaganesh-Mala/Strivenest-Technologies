import { Link } from "react-router-dom";
import { FiAlertTriangle } from "react-icons/fi";

export default function DeveloperNotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      {/* ICON */}
      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mb-4">
        <FiAlertTriangle size={26} />
      </div>

      {/* TEXT */}
      <h1 className="text-2xl font-semibold text-slate-800">
        Page Not Found
      </h1>
      <p className="text-sm text-gray-500 mt-2 max-w-md">
        The page you are looking for doesn’t exist or has been moved.
        Please check the URL or go back to your dashboard.
      </p>

      {/* ACTION */}
      <Link
        to="/developer/dashboard"
        className="mt-6 inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
