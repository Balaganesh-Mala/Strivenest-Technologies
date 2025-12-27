import { useDeveloperAuth } from "../../context/DeveloperAuthContext";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiLogOut } from "react-icons/fi";

export default function DeveloperNavbar({ onMenuClick }) {
  const { developer, logout } = useDeveloperAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/developer/login");
  };

  return (
    <header
      className="
        fixed top-0 left-0 md:left-64 right-0
        h-16 bg-white border-b
        flex items-center justify-between
        px-4 sm:px-6 z-40
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">
        {/* MENU ICON (mobile) */}
        <button
          onClick={onMenuClick}
          className="md:hidden text-gray-600"
        >
          <FiMenu size={22} />
        </button>

        <h2 className="text-sm sm:text-base font-medium text-slate-700">
          Welcome,
          <span className="ml-1 font-semibold text-slate-900">
            {developer?.fullName}
          </span>
        </h2>
      </div>

      {/* RIGHT */}
      <button
        onClick={handleLogout}
        className="
          flex items-center gap-2
          text-sm font-medium
          px-3 py-1.5 rounded-lg
          border border-slate-200
          text-slate-600
          hover:bg-slate-50
          transition
        "
      >
        <FiLogOut />
        Logout
      </button>
    </header>
  );
}
