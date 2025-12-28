import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { fetchEligibleDevelopers, assignProject } from "../../api/admin.api";

export default function AssignDeveloperModal({
  open,
  onClose,
  request,
  onSuccess,
}) {
  const [step, setStep] = useState(1);
  const [developers, setDevelopers] = useState([]);
  const [selectedDev, setSelectedDev] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    startDate: "",
    deadline: "",
    priority: "Medium",
    remarks: "",
  });

  /* ================= LOAD DEVELOPERS ================= */
  useEffect(() => {
    if (!open || !request) return;

    fetchEligibleDevelopers(request.serviceType)
      .then((res) => setDevelopers(res.data.developers || []))
      .catch(() =>
        Swal.fire("Error", "Failed to load eligible developers", "error")
      );
  }, [open, request]);

  if (!open || !request) return null;

  /* ================= NEXT ================= */
  const nextStep = () => {
    if (step === 1 && !selectedDev) {
      Swal.fire(
        "Select Developer",
        "Please choose a developer to continue",
        "warning"
      );
      return;
    }

    if (
      step === 2 &&
      form.startDate &&
      form.deadline &&
      form.deadline < form.startDate
    ) {
      Swal.fire(
        "Invalid Dates",
        "Deadline cannot be before start date",
        "warning"
      );
      return;
    }

    setStep((s) => s + 1);
  };

  const prevStep = () => setStep((s) => s - 1);

  /* ================= ASSIGN ================= */
  const handleAssign = async () => {
    try {
      setLoading(true);

      await assignProject({
        requestId: request._id,
        developerId: selectedDev,
        startDate: form.startDate || undefined,
        deadline: form.deadline || undefined,
        priority: form.priority,
        remarks: form.remarks,
      });

      Swal.fire("Assigned 🎉", "Developer assigned successfully", "success");

      onSuccess();
      onClose();
      setStep(1);
    } catch {
      Swal.fire("Error", "Failed to assign developer", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* BACKDROP */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* MODAL */}
      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-xl z-10">
        {/* HEADER */}
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-slate-800">
            Assign Developer
          </h2>
          <p className="text-xs text-gray-400">Step {step} of 3</p>

          {/* STEP INDICATOR */}
          <div className="flex gap-2 mt-3">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded ${
                  step >= s ? "bg-indigo-600" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-5">
          {/* STEP 1 – DEVELOPER */}
          {step === 1 && (
            <>
              <p className="text-sm font-medium">Select Developer</p>

              <select
                value={selectedDev}
                onChange={(e) => setSelectedDev(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              >
                <option value="">Choose developer</option>
                {developers.map((dev) => (
                  <option key={dev._id} value={dev._id}>
                    {dev.fullName} —{" "}
                    {dev.specializations
                      .map((s) => s.replace("_", " "))
                      .join(", ")}
                  </option>
                ))}
              </select>
            </>
          )}

          {/* STEP 2 – SCHEDULE */}
          {step === 2 && (
            <>
              <p className="text-sm font-medium">Schedule & Priority</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border rounded-xl p-3">
                  <label className="text-xs text-gray-500">Start Date</label>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        startDate: e.target.value,
                      })
                    }
                    className="w-full bg-transparent outline-none text-sm"
                  />
                </div>

                <div className="border rounded-xl p-3">
                  <label className="text-xs text-gray-500">Deadline</label>
                  <input
                    type="date"
                    min={form.startDate || undefined}
                    value={form.deadline}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        deadline: e.target.value,
                      })
                    }
                    className="w-full bg-transparent outline-none text-sm"
                  />
                </div>
              </div>

              <select
                value={form.priority}
                onChange={(e) =>
                  setForm({
                    ...form,
                    priority: e.target.value,
                  })
                }
                className="w-full border rounded-lg px-3 py-2 text-sm"
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </select>
            </>
          )}

          {/* STEP 3 – REVIEW */}
          {step === 3 && (
            <>
              <p className="text-sm font-medium">Review & Confirm</p>

              <div className="rounded-xl bg-slate-50 p-4 text-sm space-y-2">
                <p>
                  <b>Developer:</b>{" "}
                  {developers.find((d) => d._id === selectedDev)?.fullName}
                </p>
                <p>
                  <b>Start:</b> {form.startDate || "—"}
                </p>
                <p>
                  <b>Deadline:</b> {form.deadline || "—"}
                </p>
                <p>
                  <b>Priority:</b> {form.priority}
                </p>
              </div>

              <textarea
                rows={3}
                placeholder="Remarks (optional)"
                value={form.remarks}
                onChange={(e) =>
                  setForm({
                    ...form,
                    remarks: e.target.value,
                  })
                }
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </>
          )}
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t flex justify-between">
          <button
            onClick={step === 1 ? onClose : prevStep}
            className="px-4 py-2 text-sm border rounded-lg"
          >
            {step === 1 ? "Cancel" : "Back"}
          </button>

          {step < 3 ? (
            <button
              onClick={nextStep}
              className="px-5 py-2 text-sm rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleAssign}
              disabled={loading}
              className="px-5 py-2 text-sm rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-60"
            >
              {loading ? "Assigning..." : "Assign Developer"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
