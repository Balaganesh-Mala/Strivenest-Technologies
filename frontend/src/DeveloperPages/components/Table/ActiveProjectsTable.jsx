import React, { useEffect, useState } from "react";
import API from "../../api/apiClient";
import { toast } from "react-hot-toast";

export default function ActiveProjectsTable({ developerId }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (developerId) fetchProjects();
  }, [developerId]);

  async function fetchProjects() {
    try {
      setLoading(true);
      const res = await API.get(`/projects/developer/${developerId}`);
      const all = res.data.data || [];
      const active = all.filter(
        (p) => p.status === "Assigned" || p.status === "In Progress"
      );
      setProjects(active);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  }

  async function markDone(projectId) {
    try {
      await API.put(`/projects/${projectId}/status`, { status: "Completed" });
      toast.success("Project marked as completed!");
      setProjects((prev) =>
        prev.map((p) =>
          p._id === projectId ? { ...p, status: "Completed" } : p
        )
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  }

  if (loading)
    return (
      <div className="text-center py-10 text-gray-500 text-sm">
        Loading projects...
      </div>
    );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Active Projects</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-5 py-3">Project ID</th>
              <th className="px-5 py-3">Service Type</th>
              <th className="px-5 py-3">Deadline</th>
              <th className="px-5 py-3">Priority</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-5 py-6 text-center text-gray-400"
                >
                  No active projects assigned yet.
                </td>
              </tr>
            ) : (
              projects.map((project) => {
                const isNearDeadline =
                  project.deadline &&
                  new Date(project.deadline) - new Date() <
                    3 * 24 * 60 * 60 * 1000;

                const priorityColors = {
                  High: "text-red-500 font-semibold",
                  Medium: "text-yellow-500 font-semibold",
                  Low: "text-green-500 font-semibold",
                };

                const statusBadge = {
                  Assigned: "bg-blue-100 text-blue-700",
                  "In Progress": "bg-yellow-100 text-yellow-700",
                  Completed: "bg-green-100 text-green-700",
                }[project.status];

                return (
                  <tr
                    key={project._id}
                    className={`border-b hover:bg-gray-50 transition-colors ${
                      isNearDeadline ? "bg-red-50" : ""
                    }`}
                  >
                    <td className="px-5 py-3 font-medium text-gray-800">
                      {project.projectId}
                    </td>
                    <td className="px-5 py-3">{project.serviceType}</td>
                    <td className="px-5 py-3">
                      {project.deadline ? (
                        <span
                          className={`${
                            isNearDeadline
                              ? "text-red-600 font-semibold"
                              : "text-gray-700"
                          }`}
                        >
                          {new Date(project.deadline).toLocaleDateString()}
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td
                      className={`px-5 py-3 ${
                        priorityColors[project.priority] || ""
                      }`}
                    >
                      {project.priority}
                    </td>
                    <td className="px-5 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge}`}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      {project.status !== "Completed" ? (
                        <button
                          onClick={() => markDone(project._id)}
                          className="px-4 py-1 bg-green-500 text-white text-xs rounded-lg hover:bg-green-600"
                        >
                          Mark Done
                        </button>
                      ) : (
                        <span className="text-gray-400 text-xs">
                          Completed
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
