import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  fetchAllRequests,
  updateRequestStatus,
} from "../../api/admin.api";

import StatusBadge from "../../components/ui/StatusBadge";
import AssignDeveloperModal from "../../components/modals/AssignDeveloperModal";
import AdminAddClientForm from "../../components/modals/AdminAddClientForm";

export default function ClientRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);


  const [assignOpen, setAssignOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  /* ================= LOAD ================= */
  const loadRequests = async () => {
    try {
      setLoading(true);
      const res = await fetchAllRequests();
      setRequests(res.data.requests || []);
    } catch {
      Swal.fire("Error", "Failed to load requests", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  /* ================= APPROVE / REJECT ================= */
  const handleAction = async (id, status) => {
    const result = await Swal.fire({
      title: `Confirm ${status}`,
      text: `Are you sure you want to ${status.toLowerCase()} this request?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor:
        status === "APPROVED" ? "#4f46e5" : "#dc2626",
      confirmButtonText: status,
    });

    if (!result.isConfirmed) return;

    try {
      await updateRequestStatus(id, status);
      Swal.fire("Success", `Request ${status}`, "success");
      loadRequests();
    } catch {
      Swal.fire("Error", "Action failed", "error");
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
    <div className="p-4 sm:p-6 space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
  <div>
    <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">
      Client Requests
    </h1>
    <span className="text-xs text-gray-400">
      {requests.length} total requests
    </span>
  </div>

  <button
  onClick={() => setShowAddForm(true)}
  className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
>
  + Add Client Quote
</button>

<AdminAddClientForm
  open={showAddForm}
  onClose={() => setShowAddForm(false)}
  onSuccess={loadRequests}
/>
</div>

{showAddForm && (
  <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-4">
    <h2 className="text-lg font-semibold text-slate-700">
      Add Client Request (Admin)
    </h2>

    <AdminAddClientForm
      onSuccess={() => {
        setShowAddForm(false);
        loadRequests();
      }}
    />
  </div>
)}


      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-100 text-slate-600 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left">Client</th>
                <th className="px-6 py-3 text-left">Service</th>
                <th className="px-6 py-3 text-left">Project</th>
                <th className="px-6 py-3 text-center">Status</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((r) => (
                <tr
                  key={r._id}
                  className="border-b last:border-0 hover:bg-slate-50 transition"
                >
                  <td className="px-6 py-4 font-medium">
                    {r.clientId}
                  </td>

                  <td className="px-6 py-4 capitalize">
                    {r.serviceType.replace("_", " ")}
                  </td>

                  <td className="px-6 py-4">
                    {r.projectTitle}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <StatusBadge status={r.requestStatus} />
                  </td>

                  <td className="px-6 py-4 text-center space-x-2">
                    {r.requestStatus === "NEW" && (
                      <>
                        <button
                          onClick={() =>
                            handleAction(
                              r._id,
                              "APPROVED"
                            )
                          }
                          className="px-3 py-1.5 text-xs rounded bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() =>
                            handleAction(
                              r._id,
                              "REJECTED"
                            )
                          }
                          className="px-3 py-1.5 text-xs rounded bg-red-600 hover:bg-red-700 text-white"
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {r.requestStatus === "APPROVED" && (
                      <button
                        className="px-3 py-1.5 text-xs rounded bg-indigo-600 hover:bg-indigo-700 text-white"
                        onClick={() => {
                          setSelectedRequest(r);
                          setAssignOpen(true);
                        }}
                      >
                        Assign
                      </button>
                    )}

                    {["ASSIGNED", "REJECTED"].includes(
                      r.requestStatus
                    ) && (
                      <span className="text-xs text-gray-400">
                        {r.requestStatus}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {requests.length === 0 && (
            <div className="p-6 text-center text-gray-500">
              No client requests found
            </div>
          )}
        </div>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-4">
        {requests.map((r) => (
          <div
            key={r._id}
            className="bg-white rounded-xl border shadow-sm p-4 space-y-3"
          >
            <div className="font-medium">
              {r.projectTitle}
            </div>

            <div className="text-xs text-gray-500">
              Client: {r.clientId}
            </div>

            <div className="text-xs">
              Service:{" "}
              {r.serviceType.replace("_", " ")}
            </div>

            <StatusBadge status={r.requestStatus} />

            {r.requestStatus === "NEW" && (
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    handleAction(r._id, "APPROVED")
                  }
                  className="flex-1 px-3 py-2 text-xs bg-indigo-600 text-white rounded"
                >
                  Approve
                </button>

                <button
                  onClick={() =>
                    handleAction(r._id, "REJECTED")
                  }
                  className="flex-1 px-3 py-2 text-xs bg-red-600 text-white rounded"
                >
                  Reject
                </button>
              </div>
            )}

            {r.requestStatus === "APPROVED" && (
              <button
                className="w-full px-3 py-2 text-xs bg-indigo-600 text-white rounded"
                onClick={() => {
                  setSelectedRequest(r);
                  setAssignOpen(true);
                }}
              >
                Assign Developer
              </button>
            )}
          </div>
        ))}
      </div>

      {/* ================= ASSIGN MODAL ================= */}
      <AssignDeveloperModal
        open={assignOpen}
        request={selectedRequest}
        onClose={() => {
          setAssignOpen(false);
          setSelectedRequest(null);
        }}
        onSuccess={loadRequests}
      />
    </div>
  );
}
