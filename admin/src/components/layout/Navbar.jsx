import { useState, useEffect, useRef, useContext } from "react";
import { FiMenu, FiBell, FiUser, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { AdminAuthContext } from "../../context/AdminAuthContext";
// import { getPublicSettings } from "../../api/settings.api"; // optional later

const AdminNavbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const { admin, logout } = useContext(AdminAuthContext);

  const [openProfile, setOpenProfile] = useState(false);
  const [logo, setLogo] = useState(null); // optional
  const profileRef = useRef(null);

  /* ================= LOAD LOGO (OPTIONAL) ================= */
  // useEffect(() => {
  //   const loadSettings = async () => {
  //     try {
  //       const res = await getPublicSettings();
  //       setLogo(res.data.settings?.logo?.url || null);
  //     } catch (err) {
  //       console.log("Logo load failed");
  //     }
  //   };
  //   loadSettings();
  // }, []);

  /* ================= CLOSE PROFILE DROPDOWN ON OUTSIDE CLICK ================= */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow z-40 flex items-center px-4 md:ml-64">
      {/* MOBILE MENU BUTTON */}
      <button
        onClick={toggleSidebar}
        className="md:hidden mr-4 text-gray-700 hover:text-blue-600"
      >
        <FiMenu size={26} />
      </button>

      {/* LOGO / TITLE */}
      <div className="flex items-center gap-2">
        {logo ? (
          <img src={logo} alt="Admin Logo" className="h-9 object-contain" />
        ) : (
          <span className="text-lg font-semibold text-gray-800">
            Service Admin
          </span>
        )}
      </div>

      {/* SPACER */}
      <div className="flex-1"></div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-6">
        {/* NOTIFICATIONS (FUTURE USE) */}
        <button className="relative text-gray-600 hover:text-blue-600">
          <FiBell size={22} />
          {/* Notification dot (optional) */}
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* PROFILE */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setOpenProfile((p) => !p)}
            className="flex items-center gap-2 focus:outline-none"
          >
            <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <FiUser size={18} />
            </div>

            <span className="hidden md:block text-sm font-medium text-gray-700">
              {admin?.fullName || "Admin"}
            </span>
          </button>

          {/* DROPDOWN */}
          {openProfile && (
            <div className="absolute right-0 mt-3 w-56 bg-white shadow-lg rounded-xl border p-4 text-sm z-50">
              <p className="font-semibold text-gray-800">
                {admin?.fullName || "Admin"}
              </p>
              <p className="text-gray-500 text-xs mb-3">
                {admin?.email || ""}
              </p>

              <div className="h-px bg-gray-200 my-3"></div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 w-full text-left hover:bg-red-50 px-3 py-2 rounded-lg"
              >
                <FiLogOut />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
