import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import {
  fetchAllProjects,
  completeProject,
} from "../../api/admin.api";

import ProjectStatusBadge from "../../components/ui/ProjectStatusBadge";
import ProgressBar from "../../components/ui/ProgressBar";

const STATUS_ORDER = {
  ASSIGNED:1,
  PENDING: 2,
  IN_PROGRESS: 3,
  COMPLETED: 4,
  REJECTED: 5,
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

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
  const sortedProjects = useMemo(() => {
    return [...projects].sort(
      (a, b) =>
        (STATUS_ORDER[a.projectStatus] || 99) -
        (STATUS_ORDER[b.projectStatus] || 99)
    );
  }, [projects]);

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
          <div
            key={i}
            className="grid grid-cols-5 gap-4 px-6 py-4 border-t"
          >
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">
          Projects
        </h1>
        <span className="text-xs text-gray-400">
          {projects.length} total projects
        </span>
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-100 text-slate-600 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left">Project</th>
                <th className="px-6 py-3 text-left">Client</th>
                <th className="px-6 py-3 text-left">Service</th>
                <th className="px-6 py-3 text-left">Developer</th>
                <th className="px-6 py-3 text-center">Status</th>
                <th className="px-6 py-3 text-center">Progress</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {sortedProjects.map((p) => (
                <tr
                  key={p._id}
                  className="border-b last:border-0 hover:bg-slate-50 transition"
                >
                  <td className="px-6 py-4 font-medium">
                    {p.projectId}
                  </td>

                  <td className="px-6 py-4">
                    {p.clientId}
                  </td>

                  <td className="px-6 py-4 capitalize">
                    {p.serviceType.replace("_", " ")}
                  </td>

                  <td className="px-6 py-4">
                    {p.developerName || "—"}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <ProjectStatusBadge status={p.projectStatus} />
                  </td>

                  <td className="px-6 py-4 w-44">
                    <ProgressBar value={p.progressPercentage} />
                    <div className="text-xs text-gray-500 mt-1 text-center">
                      {p.progressPercentage}%
                    </div>
                  </td>

                  <td className="px-6 py-4 text-center">
                    {p.projectStatus !== "COMPLETED" ? (
                      <button
                        onClick={() => handleComplete(p._id)}
                        className="px-3 py-1.5 text-xs rounded bg-green-600 hover:bg-green-700 text-white"
                      >
                        Complete
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400">
                        Done
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {sortedProjects.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No projects found
            </div>
          )}
        </div>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-4">
        {sortedProjects.map((p) => (
          <div
            key={p._id}
            className="bg-white rounded-xl border shadow-sm p-4 space-y-3"
          >
            <div className="font-medium text-slate-800">
              {p.projectId}
            </div>

            <div className="text-xs text-gray-500">
              Client: {p.clientId}
            </div>

            <div className="text-xs">
              Service: {p.serviceType.replace("_", " ")}
            </div>

            <ProjectStatusBadge status={p.projectStatus} />

            <div>
              <ProgressBar value={p.progressPercentage} />
              <div className="text-xs text-gray-500 mt-1">
                {p.progressPercentage}%
              </div>
            </div>

            {p.projectStatus !== "COMPLETED" && (
              <button
                onClick={() => handleComplete(p._id)}
                className="w-full px-3 py-2 text-xs bg-green-600 hover:bg-green-700 text-white rounded"
              >
                Complete Project
              </button>
            )}
          </div>
        ))}

        {sortedProjects.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No projects found
          </div>
        )}
      </div>
    </div>
  );
}
