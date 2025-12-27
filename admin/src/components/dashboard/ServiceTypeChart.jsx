import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function ServiceTypeChart({ data = [] }) {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-5">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-800 text-sm">
          Requests by Service
        </h3>
        <span className="text-xs text-gray-400">
          Distribution
        </span>
      </div>

      {/* EMPTY STATE */}
      {data.length === 0 ? (
        <div className="h-[250px] flex items-center justify-center text-sm text-gray-400">
          No data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            {/* GRID */}
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e5e7eb"
            />

            {/* AXES */}
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={false}
              tickLine={false}
            />

            {/* TOOLTIP */}
            <Tooltip
              cursor={{ fill: "#eef2ff" }}
              contentStyle={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                fontSize: "12px",
              }}
            />

            {/* BAR */}
            <Bar
              dataKey="value"
              fill="#4f46e5" // indigo-600
              radius={[6, 6, 0, 0]}
              barSize={36}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
