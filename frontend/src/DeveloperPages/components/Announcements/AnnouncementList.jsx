import React, { useEffect, useState } from "react";
import API from "../../api/apiClient";
import { FaBullhorn, FaRegCircle, FaCircle } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";

export default function AnnouncementList() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [readIds, setReadIds] = useState([]);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  async function fetchAnnouncements() {
    try {
      setLoading(true);
      const res = await API.get("/blogs");
      const all = res.data.data || [];
      // Filter announcements only (category = "Announcements" or default)
      const filtered = all
        .filter((b) => b.category === "Announcements" || !b.category)
        .slice(0, 5);
      setAnnouncements(filtered);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  function markAsRead(id) {
    if (!readIds.includes(id)) setReadIds([...readIds, id]);
  }

  if (loading)
    return (
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-sm text-gray-500">
        Loading announcements...
      </div>
    );

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Announcements</h3>
        <FaBullhorn className="text-indigo-500 text-xl" />
      </div>

      <div className="space-y-3 max-h-[260px] overflow-y-auto">
        {announcements.length === 0 ? (
          <div className="text-sm text-gray-400 text-center py-4">
            No new announcements.
          </div>
        ) : (
          announcements.map((a) => {
            const isRead = readIds.includes(a._id);
            return (
              <div
                key={a._id}
                onClick={() => markAsRead(a._id)}
                className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                  isRead
                    ? "bg-gray-50 hover:bg-gray-100"
                    : "bg-indigo-50 hover:bg-indigo-100"
                }`}
              >
                <div className="mt-1">
                  {isRead ? (
                    <FaRegCircle className="text-gray-400 text-xs" />
                  ) : (
                    <FaCircle className="text-indigo-500 text-xs" />
                  )}
                </div>
                <div className="flex flex-col">
                  <p
                    className={`text-sm ${
                      isRead ? "text-gray-700" : "text-indigo-700 font-medium"
                    }`}
                  >
                    {a.title}
                  </p>
                  <span className="text-xs text-gray-400">
                    {formatDistanceToNow(new Date(a.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
