import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  fetchDevelopers,
  toggleDeveloperStatus,
} from "../../api/admin.api";

import AddDeveloperModal from "../../components/modals/AddDeveloperModal";

export default function Developers() {
  const [developers, setDevelopers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
  const [search, setSearch] = useState("");

  /* ================= LOAD ================= */
  const loadDevelopers = async () => {
    try {
      setLoading(true);
      const res = await fetchDevelopers();
      const data = res.data.developers || [];
      setDevelopers(data);
      setFiltered(data);
    } catch {
      Swal.fire("Error", "Failed to load developers", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDevelopers();
  }, []);

  /* ================= SEARCH ================= */
  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      developers.filter(
        (d) =>
          d.fullName.toLowerCase().includes(q) ||
          d.email.toLowerCase().includes(q)
      )
    );
  }, [search, developers]);

  /* ================= TOGGLE ACTIVE ================= */
  const handleToggle = async (dev) => {
    const result = await Swal.fire({
      title: dev.isActive
        ? "Disable Developer?"
        : "Enable Developer?",
      text: `Are you sure you want to ${
        dev.isActive ? "disable" : "enable"
      } ${dev.fullName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: dev.isActive
        ? "#dc2626"
        : "#16a34a",
      confirmButtonText: dev.isActive
        ? "Disable"
        : "Enable",
    });

    if (!result.isConfirmed) return;

    try {
      // Optimistic UI
      setDevelopers((prev) =>
        prev.map((d) =>
          d._id === dev._id
            ? { ...d, isActive: !d.isActive }
            : d
        )
      );

      await toggleDeveloperStatus(dev._id, !dev.isActive);

      Swal.fire(
        "Success",
        `Developer ${
          dev.isActive ? "disabled" : "enabled"
        } successfully`,
        "success"
      );
    } catch {
      Swal.fire(
        "Error",
        "Failed to update developer status",
        "error"
      );
      loadDevelopers(); // rollback
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
  return (
    <div className="p-4 sm:p-6 space-y-5 animate-pulse">
      {/* Page title */}
      <div className="h-6 w-56 bg-gray-200 rounded" />

      {/* Table container */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-5 gap-4 px-6 py-4 bg-gray-50">
          <div className="h-4 bg-gray-200 rounded col-span-1" />
          <div className="h-4 bg-gray-200 rounded col-span-1" />
          <div className="h-4 bg-gray-200 rounded col-span-1" />
          <div className="h-4 bg-gray-200 rounded col-span-1" />
          <div className="h-4 bg-gray-200 rounded col-span-1" />
        </div>

        {/* Table rows */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-5 gap-4 px-6 py-4 border-t"
          >
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-8 bg-gray-200 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}


  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">
          Developers
        </h1>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search by name or email"
            className="border rounded-lg px-3 py-2 text-sm w-full sm:w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            onClick={() => setAddOpen(true)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm"
          >
            + Add Developer
          </button>
        </div>
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="px-5 py-3 text-left">Name</th>
              <th className="px-5 py-3 text-left">Email</th>
              <th className="px-5 py-3 text-left">Skills</th>
              <th className="px-5 py-3 text-center">Projects</th>
              <th className="px-5 py-3 text-center">Availability</th>
              <th className="px-5 py-3 text-center">Status</th>
              <th className="px-5 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((dev) => (
              <tr
                key={dev._id}
                className="border-b last:border-0 hover:bg-slate-50 transition"
              >
                <td className="px-5 py-4 font-medium">
                  {dev.fullName}
                </td>
                <td className="px-5 py-4 text-gray-600">
                  {dev.email}
                </td>
                <td className="px-5 py-4 text-xs">
                  {dev.specializations
                    .map((s) => s.replace("_", " "))
                    .join(", ")}
                </td>

                <td className="px-5 py-4 text-center">
                  <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">
                    {dev.currentProjectsCount}
                  </span>
                </td>

                <td className="px-5 py-4 text-center">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      dev.isAvailable
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {dev.isAvailable ? "Available" : "Busy"}
                  </span>
                </td>

                <td className="px-5 py-4 text-center">
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      dev.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {dev.isActive ? "Active" : "Disabled"}
                  </span>
                </td>

                <td className="px-5 py-4 text-center">
                  <button
                    onClick={() => handleToggle(dev)}
                    className="px-3 py-1 text-xs border rounded hover:bg-gray-100"
                  >
                    {dev.isActive ? "Disable" : "Enable"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No developers found
          </div>
        )}
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-4">
        {filtered.map((dev) => (
          <div
            key={dev._id}
            className="bg-white rounded-xl shadow-sm border p-4 space-y-2"
          >
            <div className="font-medium">{dev.fullName}</div>
            <div className="text-xs text-gray-500">{dev.email}</div>

            <div className="text-xs">
              {dev.specializations
                .map((s) => s.replace("_", " "))
                .join(", ")}
            </div>

            <div className="flex justify-between text-xs pt-2">
              <span>Projects: {dev.currentProjectsCount}</span>
              <span
                className={`px-2 py-1 rounded ${
                  dev.isAvailable
                    ? "bg-green-100"
                    : "bg-yellow-100"
                }`}
              >
                {dev.isAvailable ? "Available" : "Busy"}
              </span>
            </div>

            <button
              onClick={() => handleToggle(dev)}
              className="w-full mt-2 px-3 py-2 text-xs border rounded"
            >
              {dev.isActive ? "Disable" : "Enable"}
            </button>
          </div>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      <AddDeveloperModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSuccess={loadDevelopers}
      />
    </div>
  );
}
