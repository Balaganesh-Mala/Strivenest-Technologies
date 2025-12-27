import { IoNotificationsOutline } from "react-icons/io5";
import { formatDistanceToNow } from "date-fns";

export default function Notifications({ notifications = [] }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-5 h-full flex flex-col">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-slate-800">
            Notifications
          </h3>
          <p className="text-xs text-gray-400">
            Latest updates & alerts
          </p>
        </div>
        <IoNotificationsOutline className="text-gray-400 text-lg" />
      </div>

      {/* CONTENT */}
      {notifications.length > 0 ? (
        <div className="space-y-3 overflow-y-auto pr-1">
          {notifications.map((n, i) => (
            <div
              key={n._id || i}
              className="flex gap-4 items-center bg-white hover:bg-slate-50 transition-colors duration-200"
            >
              {/* ICON */}
              <div className="h-9 w-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0">
                <IoNotificationsOutline className="text-sm" />
              </div>

              {/* TEXT */}
              <div className="flex-1">
                <p className="text-[12px] text-slate-700 leading-relaxed">
                  {typeof n === "string" ? n : n.message}
                </p>

                {n.createdAt && (
                  <p className="text-xs text-gray-400 mt-1">
                    {formatDistanceToNow(
                      new Date(n.createdAt),
                      { addSuffix: true }
                    )}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* EMPTY */
        <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400">
          <IoNotificationsOutline className="text-4xl mb-3" />
          <p className="text-sm font-medium">
            You're all caught up
          </p>
          <p className="text-xs mt-1">
            No notifications right now
          </p>
        </div>
      )}
    </div>
  );
}
