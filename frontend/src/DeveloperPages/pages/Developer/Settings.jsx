import React, { useEffect, useState } from "react";
import DeveloperNavbar from "../../components/Navbar/DeveloperNavbar";
import DeveloperSidebar from "../../components/Sidebar/DeveloperSidebar";
import API from "../../api/apiClient";
import toast from "react-hot-toast";

export default function Settings() {
  const [user, setUser] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      setLoading(true);
      const res = await API.get("/auth/me");
      setUser({
        name: res.data.data.name || "",
        email: res.data.data.email || "",
        id: res.data.data._id,
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  }

  async function save(e) {
    e.preventDefault();
    try {
      setSaving(true);
      toast.success(
        "Profile saved locally. Add backend update route to persist changes."
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    window.location.href = "/developer/login";
  }

  return (
    <div className="relative flex min-h-screen bg-gray-50 text-gray-800 overflow-hidden">
      {/* Sidebar (Desktop) */}
      <div className="hidden md:block w-64 bg-white/60 backdrop-blur-lg border-r border-gray-100">
        <DeveloperSidebar />
      </div>

      {/* Sidebar (Mobile) */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white/95 backdrop-blur-xl z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <DeveloperSidebar />
      </div>

      {/* Overlay */}
      {showSidebar && (
        <div
          onClick={() => setShowSidebar(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden"
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative z-10">
        <DeveloperNavbar
          user={user}
          onToggleSidebar={() => setShowSidebar(!showSidebar)}
        />

        <div className="p-5 sm:p-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-semibold">Settings</h2>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </div>

          <div className="max-w-2xl bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            {loading ? (
              <div className="text-center text-gray-500 py-10">
                Loading profile...
              </div>
            ) : (
              <form onSubmit={save} className="space-y-5">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Full Name
                  </label>
                  <input
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Email
                  </label>
                  <input
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Password
                  </label>
                  <input
                    placeholder="••••••••"
                    type="password"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <div className="text-xs text-gray-400 mt-1">
                    To change password, add a backend endpoint (e.g.,
                    /auth/change-password).
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    disabled={saving}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    {saving ? "Saving..." : "Save changes"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
