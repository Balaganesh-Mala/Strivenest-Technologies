import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const STATUS_COLORS = {
  ASSIGNED: "#4f46e5",
  COMPLETED: "#22c55e",
  REJECTED: "#ef4444",
  IN_PROGRESS: "#f59e0b",
};

const normalizeStatus = (status) =>
  status?.toUpperCase().replace(" ", "_");

export default function RequestsStatusChart({ data = [] }) {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-5">
      {/* HEADER */}
      <div className="mb-4">
        <h3 className="font-semibold text-slate-800 text-sm">
          Requests Status Overview
        </h3>
        <p className="text-xs text-gray-400">
          Current distribution
        </p>
      </div>

      {data.length === 0 ? (
        <div className="h-[220px] flex items-center justify-center text-sm text-gray-400">
          No data available
        </div>
      ) : (
        <div className="flex gap-6 items-center">
          {/* DONUT */}
          <div className="w-[55%] h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={2}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={
                        STATUS_COLORS[
                          normalizeStatus(entry.name)
                        ] || "#9ca3af"
                      }
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value, name) => [
                    value,
                    name,
                  ]}
                  contentStyle={{
                    fontSize: "12px",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* SIDE SUMMARY */}
          <div className="flex-1 space-y-3">
            {data.map((entry, index) => {
              const color =
                STATUS_COLORS[
                  normalizeStatus(entry.name)
                ] || "#9ca3af";

              return (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-gray-600">
                      {entry.name}
                    </span>
                  </div>
                  <span className="font-medium text-slate-800">
                    {entry.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
