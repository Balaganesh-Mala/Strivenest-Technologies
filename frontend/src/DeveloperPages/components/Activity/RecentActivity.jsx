import React, { useEffect, useState } from "react";
import API from "../../api/apiClient";
import { FaCheckCircle, FaPlusCircle, FaClock } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";

export default function RecentActivity({ developerId }) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (developerId) fetchActivity();
  }, [developerId]);

  async function fetchActivity() {
    try {
      setLoading(true);
      // Example placeholder: You can create `/api/activity/:developerId` later.
      const res = await API.get(`/projects/developer/${developerId}`);
      const data = res.data.data || [];

      // Simulate recent actions based on project statuses
      const formatted = data.slice(0, 5).map((p) => ({
        id: p._id,
        message:
          p.status === "Completed"
            ? `You marked ${p.projectId} as completed.`
            : p.status === "In Progress"
            ? `You are working on ${p.projectId}.`
            : `Admin assigned you ${p.projectId}.`,
        time: p.updatedAt || p.createdAt,
        icon:
          p.status === "Completed"
            ? "FaCheckCircle"
            : p.status === "In Progress"
            ? "FaClock"
            : "FaPlusCircle",
      }));

      setActivities(formatted);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const icons = {
    FaCheckCircle: <FaCheckCircle className="text-green-500 text-lg" />,
    FaPlusCircle: <FaPlusCircle className="text-blue-500 text-lg" />,
    FaClock: <FaClock className="text-yellow-500 text-lg" />,
  };

  if (loading)
    return (
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-sm text-gray-500">
        Loading recent activity...
      </div>
    );

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Recent Activity
      </h3>
      <div className="space-y-3 max-h-[260px] overflow-y-auto">
        {activities.length === 0 ? (
          <div className="text-sm text-gray-400 text-center py-4">
            No recent actions yet.
          </div>
        ) : (
          activities.map((a) => (
            <div
              key={a.id}
              className="flex items-start gap-3 border-b border-gray-50 pb-3 last:border-0"
            >
              <div className="flex-shrink-0 mt-1">{icons[a.icon]}</div>
              <div className="flex flex-col">
                <p className="text-sm text-gray-700">{a.message}</p>
                <span className="text-xs text-gray-400">
                  {formatDistanceToNow(new Date(a.time), { addSuffix: true })}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
