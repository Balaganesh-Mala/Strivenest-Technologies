import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { fetchAllProjects, completeProject } from "../../api/admin.api";

import ProjectStatusBadge from "../../components/ui/ProjectStatusBadge";
import ProgressBar from "../../components/ui/ProgressBar";
import ProjectEditorModal from "../../components/modals/ProjectEditorModal";

const STATUS_ORDER = {
  ASSIGNED: 1,
  PENDING: 2,
  IN_PROGRESS: 3,
  COMPLETED: 4,
  REJECTED: 5,
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editorOpen, setEditorOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [serviceFilter, setServiceFilter] = useState("ALL");

  /* ================= LOAD ================= */
  const loadProjects = async () => {
    try {
      setLoading(true);
      const res = await fetchAllProjects();
      setProjects(res.data.projects || []);
    } catch {
      Swal.fire("Error", "Failed to load projects", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  /* ================= SORT ================= */
  const filteredProjects = useMemo(() => {
    return projects
      .filter((p) => {
        // 🔍 SEARCH
        const keyword = search.toLowerCase();
        const matchesSearch =
          p.projectId?.toLowerCase().includes(keyword) ||
          p.clientId?.toLowerCase().includes(keyword) ||
          p.developerName?.toLowerCase().includes(keyword) ||
          p.serviceType?.toLowerCase().includes(keyword);

        // 🏷 STATUS FILTER
        const matchesStatus =
          statusFilter === "ALL" || p.projectStatus === statusFilter;

        // 🧩 SERVICE FILTER
        const matchesService =
          serviceFilter === "ALL" || p.serviceType === serviceFilter;

        return matchesSearch && matchesStatus && matchesService;
      })
      .sort(
        (a, b) =>
          (STATUS_ORDER[a.projectStatus] || 99) -
          (STATUS_ORDER[b.projectStatus] || 99)
      );
  }, [projects, search, statusFilter, serviceFilter]);

  const openProjectEditor = (project) => {
    setSelectedProject(project);
    setEditorOpen(true);
  };

  const closeProjectEditor = () => {
    setEditorOpen(false);
    setSelectedProject(null);
  };

  /* ================= COMPLETE ================= */
  const handleComplete = async (id) => {
    const result = await Swal.fire({
      title: "Complete project?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      confirmButtonText: "Complete",
    });

    if (!result.isConfirmed) return;

    try {
      await completeProject(id);
      Swal.fire("Done", "Project completed", "success");
      loadProjects();
    } catch {
      Swal.fire("Error", "Failed to complete project", "error");
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="p-4 sm:p-6 space-y-5 animate-pulse">
        {/* Page title */}
        <div className="h-6 w-56 bg-gray-200 rounded" />

        {/* Table container */}
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-5 gap-4 px-6 py-4 bg-gray-50">
            <div className="h-4 bg-gray-200 rounded col-span-1" />
            <div className="h-4 bg-gray-200 rounded col-span-1" />
            <div className="h-4 bg-gray-200 rounded col-span-1" />
            <div className="h-4 bg-gray-200 rounded col-span-1" />
            <div className="h-4 bg-gray-200 rounded col-span-1" />
          </div>

          {/* Table rows */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="grid grid-cols-5 gap-4 px-6 py-4 border-t">
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-8 bg-gray-200 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">
            Projects Management
          </h1>
          <p className="text-sm text-gray-500">
            Track, manage and complete assigned projects
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 text-xs rounded-full bg-indigo-50 text-indigo-600 font-medium">
            {projects.length} Projects
          </span>

          <button
            onClick={loadProjects}
            className="px-4 py-2 text-sm rounded-lg border hover:bg-slate-50 transition"
          >
            Refresh
          </button>
        </div>
      </div>
      {/* ================= FILTERS ================= */}
      <div className="bg-white border rounded-2xl p-4 flex flex-col md:flex-row gap-4 md:items-center">
        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search by project, client, developer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-64 px-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />

        {/* STATUS FILTER */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 text-sm border rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
        >
          <option value="ALL">All Status</option>
          <option value="ASSIGNED">Assigned</option>
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="REJECTED">Rejected</option>
        </select>

        {/* SERVICE FILTER */}
        <select
          value={serviceFilter}
          onChange={(e) => setServiceFilter(e.target.value)}
          className="px-4 py-2 text-sm border rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
        >
          <option value="ALL">All Services</option>
          {[...new Set(projects.map((p) => p.serviceType))].map((service) => (
            <option key={service} value={service}>
              {service.replace("_", " ")}
            </option>
          ))}
        </select>

        {/* CLEAR */}
        <button
          onClick={() => {
            setSearch("");
            setStatusFilter("ALL");
            setServiceFilter("ALL");
          }}
          className="px-4 py-2 text-sm rounded-lg border hover:bg-slate-50 transition"
        >
          Clear
        </button>
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block bg-white rounded-2xl border shadow-sm overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-slate-600 sticky top-0 z-10">
            <tr>
              {[
                "Project",
                "Client",
                "Service",
                "Developer",
                "Status",
                "Progress",
                "Actions",
              ].map((h) => (
                <th key={h} className="px-6 py-4 text-left font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredProjects.map((p) => (
              <tr
                key={p._id}
                className="border-t hover:bg-indigo-50/40 transition"
              >
                <td className="px-6 py-4 font-medium text-slate-800">
                  {p.projectId}
                </td>

                <td className="px-6 py-4 text-gray-600">{p.clientId}</td>

                <td className="px-6 py-4 capitalize">
                  {p.serviceType.replace("_", " ")}
                </td>

                <td className="px-6 py-4">
                  {p.developerName || (
                    <span className="text-gray-400">Unassigned</span>
                  )}
                </td>

                <td className="px-6 py-4">
                  <ProjectStatusBadge status={p.projectStatus} />
                </td>

                <td className="px-6 py-4 w-48">
                  <ProgressBar value={p.progressPercentage} />
                  <p className="text-xs text-gray-500 mt-1 text-center">
                    {p.progressPercentage}% completed
                  </p>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => openProjectEditor(p)}
                      className="px-3 py-1.5 text-xs rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition"
                    >
                      Manage
                    </button>

                    {p.projectStatus === "COMPLETED" ? (
                      <button
                        disabled
                        className="px-3 py-1.5 text-xs rounded-lg bg-gray-200 text-gray-400 cursor-not-allowed"
                      >
                        Done
                      </button>
                    ) : (
                      <button
                        onClick={() => handleComplete(p._id)}
                        className="px-3 py-1.5 text-xs rounded-lg bg-green-600 hover:bg-green-700 text-white transition"
                      >
                        Complete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredProjects.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No projects available
          </div>
        )}
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-4">
        {filteredProjects.map((p) => (
          <div
            key={p._id}
            className="bg-white rounded-2xl border shadow-sm p-4 space-y-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-slate-800">{p.projectId}</h3>
              <ProjectStatusBadge status={p.projectStatus} />
            </div>

            <div className="text-xs text-gray-500 space-y-1">
              <p>
                <span className="font-medium">Client:</span> {p.clientId}
              </p>
              <p>
                <span className="font-medium">Service:</span>{" "}
                {p.serviceType.replace("_", " ")}
              </p>
              <p>
                <span className="font-medium">Developer:</span>{" "}
                {p.developerName || "—"}
              </p>
            </div>

            <div>
              <ProgressBar value={p.progressPercentage} />
              <p className="text-xs text-gray-500 mt-1">
                {p.progressPercentage}% completed
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => openProjectEditor(p)}
                className="flex-1 py-2 text-xs rounded-lg bg-indigo-600 text-white"
              >
                Manage
              </button>

              <button
                disabled={p.projectStatus === "COMPLETED"}
                onClick={() => handleComplete(p._id)}
                className={`flex-1 py-2 text-xs rounded-lg ${
                  p.projectStatus === "COMPLETED"
                    ? "bg-gray-200 text-gray-400"
                    : "bg-green-600 text-white"
                }`}
              >
                Complete
              </button>
            </div>
          </div>
        ))}
      </div>

      <ProjectEditorModal
        open={editorOpen}
        project={selectedProject}
        onClose={closeProjectEditor}
        onUpdated={loadProjects}
      />
    </div>
  );
}
