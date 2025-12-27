export default function StatCard({ title, value, color = "blue" }) {
  const colors = {
    blue: "bg-blue-600 text-white",
    yellow: "bg-yellow-500 text-white",
    green: "bg-green-600 text-white",
    purple: "bg-purple-600 text-white",
    gray: "bg-gray-600 text-white",
    indigo: "bg-indigo-600 text-white",
  };

  return (
    <div
      className={`rounded-xl p-5 shadow-sm ${colors[color]}`}
    >
      {/* TITLE */}
      <p className="text-sm font-medium opacity-90">
        {title}
      </p>

      {/* VALUE */}
      <h2 className="text-3xl font-bold mt-2">
        {value}
      </h2>
    </div>
  );
}
