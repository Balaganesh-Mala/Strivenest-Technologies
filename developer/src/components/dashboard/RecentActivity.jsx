import {
  FaCheckCircle,
  FaClock,
  FaPlus,
} from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";

export default function RecentActivity({ projects = [] }) {
  const recent = projects.slice(0, 5);

  const statusConfig = {
    ASSIGNED: {
      icon: FaPlus,
      color: "bg-blue-100 text-blue-600",
      label: "assigned",
    },
    IN_PROGRESS: {
      icon: FaClock,
      color: "bg-yellow-100 text-yellow-600",
      label: "in progress",
    },
    COMPLETED: {
      icon: FaCheckCircle,
      color: "bg-green-100 text-green-600",
      label: "completed",
    },
  };

  const getSafeTime = (project) => {
    const rawDate =
      project.updatedAt || project.createdAt || null;

    if (!rawDate) return "Just now";

    const date = new Date(rawDate);
    if (isNaN(date.getTime())) return "Just now";

    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-800">
          Recent Activity
        </h3>
        <span className="text-xs text-gray-400">
          Last updates
        </span>
      </div>

      {/* Empty State */}
      {recent.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-sm text-gray-400">
            No recent activity yet
          </p>
        </div>
      ) : (
        <div className="relative space-y-5">
          {/* Vertical timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200" />

          {recent.map((p) => {
            const config =
              statusConfig[p.projectStatus] ||
              statusConfig.ASSIGNED;

            const Icon = config.icon;

            return (
              <div
                key={p._id}
                className="relative flex gap-4 pl-10 group"
              >
                {/* Timeline icon */}
                <div
                  className={`absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center ${config.color}`}
                >
                  <Icon className="text-sm" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <p className="text-sm text-gray-700 leading-snug">
                    <span className="font-medium">
                      {p.projectTitle || p.projectId}
                    </span>{" "}
                    was{" "}
                    <span className="capitalize">
                      {config.label}
                    </span>
                  </p>

                  <p className="text-xs text-gray-400 mt-0.5">
                    {getSafeTime(p)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
