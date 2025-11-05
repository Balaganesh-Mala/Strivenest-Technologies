import React, { useEffect, useState } from "react";
import DeveloperNavbar from "../../components/Navbar/DeveloperNavbar";
import DeveloperSidebar from "../../components/Sidebar/DeveloperSidebar";
import API from "../../api/apiClient";
import toast from "react-hot-toast";
import { formatDistanceToNow } from "date-fns";

export default function ProjectRequests() {
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);
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
      const pending = all.filter((p) => p.status === "Assigned");
      setRequests(pending);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  }

  async function accept(id) {
    try {
      await API.put(`/projects/${id}/status`, { status: "In Progress" });
      toast.success("Request accepted. Project is now In Progress.");
      setRequests((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to accept request");
    }
  }

  async function decline(id) {
    try {
      await API.put(`/projects/${id}/status`, { status: "Assigned" });
      toast.success("Request declined. Admin will be notified to reassign.");
      setRequests((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to decline request");
    }
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
            <h2 className="text-2xl font-semibold">Project Requests</h2>
            <div className="text-sm text-gray-500">
              {loading ? "Loading…" : `${requests.length} pending`}
            </div>
          </div>

          <div className="grid gap-4">
            {loading ? (
              <div className="text-center text-gray-500 py-8">
                Loading requests...
              </div>
            ) : requests.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                No pending requests
              </div>
            ) : (
              requests.map((r) => (
                <div
                  key={r._id}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between gap-4 transition hover:shadow-md"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-semibold">
                        {r.projectId?.split("-").pop() || "PRJ"}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">
                          {r.serviceType}
                        </div>
                        <div className="text-sm text-gray-500">
                          {r.projectDetails ||  "-"}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 text-sm text-gray-500">
                      <span className="font-medium text-gray-700">
                        Client ID:
                      </span>{" "}
                      {r.clientId || r.email || "-"} · Priority {r.priority || "-"}
                    </div>

                    <div className="mt-2 text-xs text-gray-400">
                      <span className="font-medium text-gray-700">
                        Remarks:
                      </span>{" "}
                      {r.remarks}
                    </div>

                    <div className="mt-2 text-xs text-gray-400">
                      {formatDistanceToNow(
                        new Date(r.createdAt || r.startDate || Date.now()),
                        { addSuffix: true }
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <button
                      onClick={() => accept(r._id)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => decline(r._id)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
