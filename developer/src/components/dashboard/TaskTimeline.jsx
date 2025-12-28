import { useMemo } from "react";
import {
  format,
  addDays,
  startOfWeek,
  isSameDay,
} from "date-fns";

export default function TaskTimeline({ projects = [] }) {
  const today = new Date();

  /* ===== WEEK DAYS ===== */
  const days = useMemo(() => {
    const start = startOfWeek(today, { weekStartsOn: 1 });
    return Array.from({ length: 7 }, (_, i) =>
      addDays(start, i)
    );
  }, [today]);

  /* ===== ACTIVITY COUNT ===== */
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
      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-semibold text-slate-800">
            Weekly Workload
          </h3>
          <p className="text-xs text-gray-400">
            Active projects per day
          </p>
        </div>
      </div>

      {/* CHART */}
      <div className="flex justify-between items-end gap-2 sm:gap-4">
        {days.map((day) => {
          const key = format(day, "EEE");
          const count = activity[key] || 0;
          const isToday = isSameDay(day, today);

          const height = Math.min(count * 18 + 14, 120);

          return (
            <div
              key={key}
              className="flex flex-col items-center group w-full"
            >
              {/* BAR */}
              <div className="relative flex items-end justify-center w-full max-w-[36px] sm:max-w-[42px] h-[130px]">
                <div
                  className={`w-full rounded-xl transition-all duration-300 ${
                    isToday
                      ? "bg-indigo-600"
                      : count
                      ? "bg-indigo-300"
                      : "bg-gray-200"
                  }`}
                  style={{ height }}
                />

                {/* COUNT TOOLTIP */}
                {count > 0 && (
                  <span className="absolute -top-6 text-[10px] bg-slate-900 text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition">
                    {count}
                  </span>
                )}
              </div>

              {/* DAY LABEL */}
              <span
                className={`text-xs mt-2 ${
                  isToday
                    ? "font-semibold text-indigo-600"
                    : "text-gray-500"
                }`}
              >
                {key}
              </span>

              {/* TODAY BADGE */}
              {isToday && (
                <span className="text-[10px] mt-0.5 text-indigo-500">
                  Today
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* FOOTER NOTE */}
      <p className="text-xs text-gray-400 mt-4">
        Based on project start date and deadline
      </p>
    </div>
  );
}
