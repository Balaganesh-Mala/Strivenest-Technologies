import React, { useEffect, useMemo, useState } from "react";
import DeveloperNavbar from "../../components/Navbar/DeveloperNavbar";
import DeveloperSidebar from "../../components/Sidebar/DeveloperSidebar";
import API from "../../api/apiClient";
import toast from "react-hot-toast";

export default function ProjectSummary() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
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
      setProjects(res.data.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  }

  async function markDone(id) {
    try {
      await API.put(`/projects/${id}/status`, { status: "Completed" });
      setProjects((prev) =>
        prev.map((p) =>
          p._id === id ? { ...p, status: "Completed" } : p
        )
      );
      toast.success("Project marked as completed");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  }

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (statusFilter !== "All" && p.status !== statusFilter) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        (p.projectId || "").toLowerCase().includes(q) ||
        (p.clientId || "").toLowerCase().includes(q) ||
        (p.serviceType || "").toLowerCase().includes(q) ||
        (p.projectDetails || "").toLowerCase().includes(q)
      );
    });
  }, [projects, query, statusFilter]);

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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-semibold">Project Summary</h2>
            <div className="flex items-center gap-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm w-full sm:w-64"
                placeholder="Search by project, client or service"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm"
              >
                <option>All</option>
                <option>Assigned</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-600">
              <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Project ID</th>
                  <th className="px-4 py-3">Client ID</th>
                  <th className="px-4 py-3">Service Type</th>
                  <th className="px-4 py-3">Message</th>
                  <th className="px-4 py-3">Start Date</th>
                  <th className="px-4 py-3">Deadline</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-4 py-8 text-center text-gray-400"
                    >
                      No projects found
                    </td>
                  </tr>
                ) : (
                  filtered.map((p) => (
                    <tr
                      key={p._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3 font-medium text-gray-800">
                        {p.projectId}
                      </td>
                      <td className="px-4 py-3">
                        {p.clientId || (p.clientName || "").slice(0, 20)}
                      </td>
                      <td className="px-4 py-3">{p.serviceType}</td>
                      <td className="px-4 py-3 max-w-[240px] truncate">
                        {p.projectDetails || p.remarks || "-"}
                      </td>
                      <td className="px-4 py-3">
                        {p.startDate
                          ? new Date(p.startDate).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="px-4 py-3">
                        {p.deadline
                          ? new Date(p.deadline).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs ${
                            p.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : p.status === "In Progress"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        {p.status !== "Completed" ? (
                          <button
                            onClick={() => markDone(p._id)}
                            className="px-3 py-1 bg-green-500 text-white rounded-lg text-xs hover:bg-green-600"
                          >
                            Mark Done
                          </button>
                        ) : (
                          <div className="text-xs text-gray-400">Completed</div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
