import React, { useEffect, useState } from "react";
import DeveloperNavbar from "../../components/Navbar/DeveloperNavbar";
import DeveloperSidebar from "../../components/Sidebar/DeveloperSidebar";
import API from "../../api/apiClient";
import toast from "react-hot-toast";
import { formatDistanceToNow } from "date-fns";

export default function Notifications() {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      setLoading(true);
      const me = await API.get("/auth/me");
      setUser(me.data.data);

      const res = await API.get(`/projects/developer/${me.data.data._id}`);
      const all = res.data.data || [];
      const notifications = [];

      all.forEach((p) => {
        if (p.status === "Assigned")
          notifications.push({
            id: `${p._id}-a`,
            text: `New project assigned: ${p.projectId}`,
            time: p.createdAt,
          });
        if (p.status === "In Progress")
          notifications.push({
            id: `${p._id}-i`,
            text: `Project in progress: ${p.projectId}`,
            time: p.updatedAt || p.startDate,
          });
        if (p.deadline) {
          const diff = new Date(p.deadline) - new Date();
          if (diff < 3 * 24 * 60 * 60 * 1000 && diff > 0)
            notifications.push({
              id: `${p._id}-d`,
              text: `Deadline approaching for ${p.projectId}`,
              time: p.deadline,
            });
        }
      });

      setNotes(notifications.sort((a, b) => new Date(b.time) - new Date(a.time)));
    } catch (err) {
      console.error(err);
      toast.error("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  }

  function markAllRead() {
    setNotes([]);
    toast.success("All notifications cleared");
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
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Notifications</h2>
            {notes.length > 0 && (
              <button
                onClick={markAllRead}
                className="text-sm text-indigo-600 hover:underline"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 max-h-[450px] overflow-y-auto">
            {loading ? (
              <div className="text-center text-gray-500 py-8">
                Loading...
              </div>
            ) : notes.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                No notifications
              </div>
            ) : (
              <ul className="space-y-3">
                {notes.map((n) => (
                  <li
                    key={n.id}
                    className="flex items-start gap-3 border-b border-gray-50 pb-3 last:border-0"
                  >
                    <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-semibold text-sm">
                      N
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-700">{n.text}</div>
                      <div className="text-xs text-gray-400">
                        {formatDistanceToNow(new Date(n.time), {
                          addSuffix: true,
                        })}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
