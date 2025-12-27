export default function ActiveProjectsTable({ projects = [] }) {
  const active = projects.filter(
    (p) => p.projectStatus !== "COMPLETED"
  );

  const priorityStyles = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-700",
  };

  const statusStyles = {
    ASSIGNED: "bg-indigo-100 text-indigo-700",
    IN_PROGRESS: "bg-blue-100 text-blue-700",
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b">
        <div>
          <h3 className="font-semibold text-slate-800">
            Active Projects
          </h3>
          <p className="text-xs text-gray-400">
            Ongoing & upcoming deadlines
          </p>
        </div>
        <span className="text-xs text-gray-500">
          {active.length} active
        </span>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600 sticky top-0">
            <tr>
              <th className="px-5 py-3 text-left font-medium">
                Project
              </th>
              <th className="px-5 py-3 text-left font-medium">
                Client
              </th>
              <th className="px-5 py-3 text-left font-medium">
                Deadline
              </th>
              <th className="px-5 py-3 text-left font-medium">
                Priority
              </th>
              <th className="px-5 py-3 text-left font-medium">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {active.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="p-6 text-center text-gray-400"
                >
                  No active projects
                </td>
              </tr>
            ) : (
              active.map((p) => (
                <tr
                  key={p._id}
                  className="border-b last:border-0 hover:bg-slate-50 transition"
                >
                  <td className="px-5 py-4 font-medium">
                    {p.projectTitle || p.projectId || "—"}
                  </td>

                  <td className="px-5 py-4">
                    {p.clientId}
                  </td>

                  <td className="px-5 py-4 text-sm">
                    {p.deadline
                      ? new Date(
                          p.deadline
                        ).toLocaleDateString()
                      : "—"}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded font-medium ${
                        priorityStyles[p.priority] ||
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {p.priority || "Medium"}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded font-medium ${
                        statusStyles[p.projectStatus] ||
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {p.projectStatus}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y">
        {active.length === 0 ? (
          <div className="p-6 text-center text-gray-400">
            No active projects
          </div>
        ) : (
          active.map((p) => (
            <div
              key={p._id}
              className="p-4 space-y-2"
            >
              <div className="font-medium">
                {p.projectTitle || p.projectId}
              </div>

              <div className="text-xs text-gray-500">
                Client: {p.clientId}
              </div>

              <div className="flex items-center justify-between text-xs">
                <span>
                  Deadline:{" "}
                  {p.deadline
                    ? new Date(
                        p.deadline
                      ).toLocaleDateString()
                    : "—"}
                </span>

                <span
                  className={`px-2 py-1 rounded ${
                    priorityStyles[p.priority] ||
                    "bg-gray-100"
                  }`}
                >
                  {p.priority}
                </span>
              </div>

              <span
                className={`inline-block px-2 py-1 text-xs rounded ${
                  statusStyles[p.projectStatus] ||
                  "bg-gray-100"
                }`}
              >
                {p.projectStatus}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
