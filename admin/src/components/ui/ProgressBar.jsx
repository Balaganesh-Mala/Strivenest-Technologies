export default function ProgressBar({ value }) {
  return (
    <div className="w-full bg-gray-200 rounded h-2">
      <div
        className="bg-green-600 h-2 rounded"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
