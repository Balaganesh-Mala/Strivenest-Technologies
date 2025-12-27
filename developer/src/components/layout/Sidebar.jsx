import { NavLink } from "react-router-dom";
import { FiHome, FiFolder, FiUser, FiX } from "react-icons/fi";

export default function DeveloperSidebar({ open, setOpen }) {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-5 py-3 rounded-lg text-sm font-medium transition
     ${
       isActive
         ? "bg-indigo-600 text-white"
         : "text-gray-700 hover:bg-gray-100"
     }`;

  return (
    <>
      {/* BACKDROP (mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-64 bg-white border-r
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* HEADER */}
        <div className="h-16 flex items-center justify-between px-6 border-b">
          <h1 className="text-lg font-bold text-indigo-600">
            Developer Panel
          </h1>

          {/* CLOSE (mobile) */}
          <button
            onClick={() => setOpen(false)}
            className="md:hidden text-gray-500"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* NAV */}
        <nav className="p-4 space-y-2">
          <NavLink to="/developer/dashboard" className={linkClass}>
            <FiHome />
            Dashboard
          </NavLink>

          <NavLink to="/developer/projects" className={linkClass}>
            <FiFolder />
            My Projects
          </NavLink>

          <NavLink to="/developer/profile" className={linkClass}>
            <FiUser />
            Profile
          </NavLink>
        </nav>
      </aside>
    </>
  );
}
