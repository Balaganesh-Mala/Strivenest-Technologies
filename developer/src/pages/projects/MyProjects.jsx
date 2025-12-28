import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import DeveloperProjectViewModal from "../../components/model/DeveloperProjectViewModal";
import {
  fetchMyProjects,
  respondToProject,
  updateProgress,
  completeProject,
} from "../../api/developer.api";

export default function DeveloperProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  /* ================= LOAD PROJECTS ================= */
  const loadProjects = async () => {
    try {
      setLoading(true);
      const res = await fetchMyProjects();
      setProjects(res.data.projects || []);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to load projects", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  /* ================= RESPOND ================= */
  const handleRespond = async (id, response) => {
    const result = await Swal.fire({
      title: `Confirm ${response}`,
      text: "Are you sure?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: response === "ACCEPTED" ? "#16a34a" : "#dc2626",
      confirmButtonText: response,
    });

    if (!result.isConfirmed) return;

    try {
      await respondToProject(id, response);
      Swal.fire("Success", `Project ${response.toLowerCase()}`, "success");
      loadProjects();
    } catch {
      Swal.fire("Error", "Action failed", "error");
    }
  };

  /* ================= UPDATE PROGRESS ================= */
  const handleProgress = async (id, current) => {
    const { value } = await Swal.fire({
      title: "Update Progress",
      input: "range",
      inputLabel: "Progress %",
      inputAttributes: {
        min: 0,
        max: 100,
        step: 5,
      },
      inputValue: current,
      showCancelButton: true,
    });

    if (value === undefined) return;

    try {
      await updateProgress(id, { progressPercentage: Number(value) });
      Swal.fire("Updated", "Progress updated successfully", "success");
      loadProjects();
    } catch {
      Swal.fire("Error", "Failed to update progress", "error");
    }
  };

  /* ================= COMPLETE ================= */
  const handleComplete = async (id) => {
    const result = await Swal.fire({
      title: "Complete Project?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7c3aed",
      confirmButtonText: "Complete",
    });

    if (!result.isConfirmed) return;

    try {
      await completeProject(id);
      Swal.fire("Completed", "Project marked as completed", "success");
      loadProjects();
    } catch {
      Swal.fire("Error", "Failed to complete project", "error");
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
        <div className="h-40 bg-gray-100 rounded-xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-800">
        My Assigned Projects
      </h1>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block bg-white rounded-2xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              {[
                "Project",
                "Client",
                "Service",
                "Dates",
                "Priority",
                "Status",
                "Progress",
                "Action",
              ].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-medium">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {projects.map((p) => (
              <tr key={p._id} className="border-b last:border-0">
                <td className="px-4 py-3 font-medium">
                  {p.projectTitle}
                  <div className="text-xs text-gray-400">{p.projectId}</div>
                </td>

                <td className="px-4 py-3">{p.clientId}</td>

                <td className="px-4 py-3 capitalize">
                  {p.serviceType?.replace("_", " ")}
                </td>

                <td className="px-4 py-3 text-xs">
                  <div>Start: {new Date(p.startDate).toLocaleDateString()}</div>
                  <div>End: {new Date(p.deadline).toLocaleDateString()}</div>
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      p.priority === "High"
                        ? "bg-red-100 text-red-700"
                        : p.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {p.priority}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                    {p.projectStatus}
                  </span>
                </td>

                <td className="px-4 py-3 w-40">
                  <div className="h-2 bg-gray-200 rounded">
                    <div
                      className="h-2 bg-green-600 rounded"
                      style={{ width: `${p.progressPercentage}%` }}
                    />
                  </div>
                  <div className="text-xs mt-1">{p.progressPercentage}%</div>
                </td>

                <td className="px-4 py-3 space-x-2">
                  <button
                    onClick={() => {
                      setSelectedProject(p);
                      setViewOpen(true);
                    }}
                    className="btn-outline"
                  >
                    View
                  </button>

                  {p.developerResponse === "PENDING" && (
                    <>
                      <button
                        onClick={() => handleRespond(p._id, "ACCEPTED")}
                        className="btn-success"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleRespond(p._id, "REJECTED")}
                        className="btn-danger"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {p.projectStatus === "IN_PROGRESS" && (
                    <>
                      <button
                        onClick={() =>
                          handleProgress(p._id, p.progressPercentage)
                        }
                        className="btn-outline"
                      >
                        Update
                      </button>

                      {p.progressPercentage === 100 && (
                        <button
                          onClick={() => handleComplete(p._id)}
                          className="btn-purple"
                        >
                          Complete
                        </button>
                      )}
                    </>
                  )}

                  {p.projectStatus === "COMPLETED" && (
                    <span className="text-green-600 text-xs font-medium">
                      Completed
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {projects.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No projects assigned
          </div>
        )}
      </div>

      {/* ================= MOBILE VIEW ================= */}
      <div className="md:hidden space-y-4">
        {projects.map((p) => (
          <div key={p._id} className="bg-white rounded-xl shadow p-4 space-y-2">
            <div className="font-semibold">{p.projectTitle}</div>
            <div className="text-xs text-gray-500">{p.projectId}</div>

            <div className="text-sm">{p.serviceType}</div>

            <div className="flex justify-between text-xs">
              <span>Status: {p.projectStatus}</span>
              <span>{p.progressPercentage}%</span>
            </div>

            <div className="h-2 bg-gray-200 rounded">
              <div
                className="h-2 bg-green-600 rounded"
                style={{ width: `${p.progressPercentage}%` }}
              />
            </div>

            <div className="flex gap-2 pt-2">
              {p.developerResponse === "PENDING" && (
                <>
                  <button
                    onClick={() => handleRespond(p._id, "ACCEPTED")}
                    className="btn-success w-full"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleRespond(p._id, "REJECTED")}
                    className="btn-danger w-full"
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <DeveloperProjectViewModal
        open={viewOpen}
        project={selectedProject}
        onClose={() => {
          setViewOpen(false);
          setSelectedProject(null);
        }}
      />
    </div>
  );
}
