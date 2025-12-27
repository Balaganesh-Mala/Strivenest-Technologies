import { useMemo } from "react";
import {
  format,
  addDays,
  startOfWeek,
  isSameDay,
} from "date-fns";

export default function TaskTimeline({ projects = [] }) {
  const today = new Date();

  /* ====== WEEK DAYS ====== */
  const days = useMemo(() => {
    const start = startOfWeek(today, { weekStartsOn: 1 });
    return Array.from({ length: 7 }, (_, i) =>
      addDays(start, i)
    );
  }, [today]);

  /* ====== ACTIVITY COUNT ====== */
  const activity = useMemo(() => {
    const map = {};
    projects.forEach((p) => {
      if (!p.startDate) return;

      const start = new Date(p.startDate);
      const end = p.deadline ? new Date(p.deadline) : today;

      days.forEach((day) => {
        if (day >= start && day <= end) {
          const key = format(day, "EEE");
          map[key] = (map[key] || 0) + 1;
        }
      });
    });
    return map;
  }, [projects, days, today]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-800">
          Weekly Workload
        </h3>
        <span className="text-xs text-gray-400">
          Tasks per day
        </span>
      </div>

      {/* Chart */}
      <div className="flex justify-between items-end gap-4">
        {days.map((day) => {
          const key = format(day, "EEE");
          const count = activity[key] || 0;
          const isToday = isSameDay(day, today);

          const height = Math.min(count * 18 + 12, 110);

          return (
            <div
              key={key}
              className="flex flex-col items-center group"
            >
              {/* Bar */}
              <div className="relative w-9 flex items-end justify-center">
                <div
                  className={`w-full rounded-lg transition-all duration-300 ${
                    isToday
                      ? "bg-indigo-600"
                      : count
                      ? "bg-blue-400"
                      : "bg-gray-200"
                  }`}
                  style={{ height }}
                />

                {/* Count bubble */}
                {count > 0 && (
                  <span className="absolute -top-6 text-[10px] bg-slate-800 text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition">
                    {count}
                  </span>
                )}
              </div>

              {/* Day label */}
              <span
                className={`text-xs mt-2 ${
                  isToday
                    ? "font-semibold text-indigo-600"
                    : "text-gray-500"
                }`}
              >
                {key}
              </span>

              {/* Today badge */}
              {isToday && (
                <span className="text-[10px] mt-0.5 text-indigo-500">
                  Today
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer note */}
      <p className="text-xs text-gray-400 mt-4">
        Shows active projects between start date and deadline
      </p>
    </div>
  );
}
