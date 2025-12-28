import {
  FaClipboardList,
  FaSpinner,
  FaCheckCircle,
  FaHourglassHalf,
} from "react-icons/fa";

const statsConfig = {
  "Total Projects": {
    icon: FaClipboardList,
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    border: "border-indigo-100",
  },
  "Pending Request": {
    icon: FaHourglassHalf,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
    border: "border-yellow-100",
  },
  "In Progress": {
    icon: FaSpinner,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    border: "border-blue-100",
    spin: false,
  },
  Completed: {
    icon: FaCheckCircle,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    border: "border-green-100",
  },
};

export default function StatsCard({ title, value }) {
  const config =
    statsConfig[title] || statsConfig["Total Projects"];

  const Icon = config.icon;

  return (
    <div
      className={`group relative bg-white rounded-2xl border ${config.border}
      shadow-sm p-5 w-full transition hover:shadow-md`}
    >
      {/* TITLE */}
      <p className="text-sm text-gray-500 mb-1">
        {title}
      </p>

      {/* VALUE + ICON */}
      <div className="flex items-center justify-between">
        <p className="text-3xl font-semibold text-slate-800">
          {value}
        </p>

        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${config.iconBg}`}
        >
          <Icon
            className={`text-xl ${config.iconColor} ${
              config.spin ? "animate-spin" : ""
            }`}
          />
        </div>
      </div>

      {/* HOVER ACCENT */}
      <div
        className={`absolute inset-x-0 bottom-0 h-1 rounded-b-2xl
        bg-gradient-to-r from-transparent via-slate-200 to-transparent
        opacity-0 group-hover:opacity-100 transition`}
      />
    </div>
  );
}
