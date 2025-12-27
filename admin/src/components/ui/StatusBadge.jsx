export default function StatusBadge({ status }) {
  const styles = {
    NEW: "bg-yellow-100 text-yellow-700",
    APPROVED: "bg-blue-100 text-blue-700",
    ASSIGNED: "bg-purple-100 text-purple-700",
    REJECTED: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}
