import { formatDistanceToNow } from "date-fns";
import { FaThumbtack } from "react-icons/fa";

export default function RecentRequests({
  requests = [],
  onOpenRequest,
}) {
  return (
    <div className="bg-white rounded-xl border shadow-sm">
      {/* HEADER */}
      <div className="px-5 py-4 border-b flex items-center justify-between">
        <h3 className="font-semibold text-slate-800 text-sm">
          Recent Client Requests
        </h3>
        <span className="text-xs text-gray-400">
          Last 5
        </span>
      </div>

      {/* EMPTY */}
      {requests.length === 0 ? (
        <div className="p-6 text-center text-sm text-gray-400">
          No recent requests
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-gray-500 border-b">
              <tr>
                <th className="px-5 py-3 text-left">
                  Project
                </th>
                <th className="px-5 py-3 text-left">
                  Client
                </th>
                <th className="px-5 py-3 text-left">
                  Service
                </th>
                <th className="px-5 py-3 text-center">
                  Status
                </th>
                <th className="px-5 py-3 text-right">
                  Created
                </th>
              </tr>
            </thead>

            <tbody>
              {requests.slice(0, 5).map((r) => {
                const needsAction =
                  r.requestStatus === "APPROVED" &&
                  !r.assignedDeveloper; // safe check

                return (
                  <tr
                    key={r._id}
                    onClick={() =>
                      onOpenRequest && onOpenRequest(r)
                    }
                    className={`border-b last:border-0 cursor-pointer transition
                      hover:bg-slate-50
                      ${
                        needsAction
                          ? "bg-yellow-50"
                          : ""
                      }`}
                  >
                    {/* PROJECT */}
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        {r.isPinned && (
                          <FaThumbtack className="text-indigo-600 text-xs" />
                        )}
                        <span className="font-medium text-slate-800">
                          {r.projectTitle || "Untitled"}
                        </span>
                      </div>
                    </td>

                    {/* CLIENT */}
                    <td className="px-5 py-3 text-gray-600">
                      {r.clientId}
                    </td>

                    {/* SERVICE */}
                    <td className="px-5 py-3 capitalize text-gray-600">
                      {r.serviceType
                        .replace("_", " ")
                        .toLowerCase()}
                    </td>

                    {/* STATUS */}
                    <td className="px-5 py-3 text-center">
                      <span
                        className={`text-xs px-2 py-1 rounded font-medium
                          ${
                            r.requestStatus === "APPROVED"
                              ? "bg-green-100 text-green-700"
                              : r.requestStatus === "REJECTED"
                              ? "bg-red-100 text-red-700"
                              : r.requestStatus === "NEW"
                              ? "bg-indigo-100 text-indigo-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                      >
                        {r.requestStatus}
                      </span>

                      {needsAction && (
                        <div className="text-[10px] text-yellow-700 mt-1">
                          Needs assignment
                        </div>
                      )}
                    </td>

                    {/* TIME */}
                    <td className="px-5 py-3 text-right text-xs text-gray-400">
                      {r.createdAt
                        ? formatDistanceToNow(
                            new Date(r.createdAt),
                            { addSuffix: true }
                          )
                        : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
