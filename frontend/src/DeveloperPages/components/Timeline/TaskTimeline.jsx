import React, { useMemo } from "react";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";

export default function TaskTimeline({ projects = [] }) {
  const today = new Date();

  // Create Monday–Friday timeline
  const days = useMemo(() => {
    const start = startOfWeek(today, { weekStartsOn: 1 });
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  }, [today]);

  // Count active projects for each day
  const dayActivity = useMemo(() => {
    const activity = {};
    projects.forEach((p) => {
      if (!p.startDate) return;
      const start = new Date(p.startDate);
      const end = p.deadline ? new Date(p.deadline) : today;
      days.forEach((day) => {
        if (day >= start && day <= end) {
          const key = format(day, "EEE");
          activity[key] = (activity[key] || 0) + 1;
        }
      });
    });
    return activity;
  }, [projects, days]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Weekly Progress
      </h3>
      <div className="flex justify-between items-end gap-3 sm:gap-4 overflow-x-auto">
        {days.map((day) => {
          const key = format(day, "EEE");
          const count = dayActivity[key] || 0;
          const isToday = isSameDay(day, today);
          return (
            <div key={key} className="flex flex-col items-center flex-1">
              <div
                className={`w-8 sm:w-10 rounded-t-xl transition-all duration-300 ${
                  isToday
                    ? "bg-indigo-500"
                    : count > 0
                    ? "bg-blue-400"
                    : "bg-gray-200"
                }`}
                style={{ height: `${Math.min(count * 25 + 10, 100)}px` }}
              ></div>
              <div className="mt-2 text-xs sm:text-sm font-medium text-gray-700">
                {format(day, "EEE")}
              </div>
              <div
                className={`text-xs ${
                  isToday ? "text-indigo-600 font-semibold" : "text-gray-500"
                }`}
              >
                {format(day, "dd")}
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-xs text-gray-500 mt-4 text-right">
        Showing this week’s active tasks
      </div>
    </div>
  );
}
