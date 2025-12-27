import { useState } from "react";
import { createDeveloper } from "../../api/admin.api";

const SERVICES = [
  "WEB_DEVELOPMENT",
  "APP_DEVELOPMENT",
  "FULL_STACK",
  "MARKETING",
];

export default function AddDeveloperModal({
  open,
  onClose,
  onSuccess,
}) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    specializations: [],
  });

  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState(null);
  const [error, setError] = useState("");

  if (!open) return null;

  /* 🔁 TOGGLE SKILL */
  const toggleSkill = (skill) => {
    setForm((prev) => ({
      ...prev,
      specializations: prev.specializations.includes(skill)
        ? prev.specializations.filter((s) => s !== skill)
        : [...prev.specializations, skill],
    }));
  };

  /* 🚀 SUBMIT */
  const handleSubmit = async () => {
    setError("");

    if (
      !form.fullName.trim() ||
      !form.email.trim() ||
      form.specializations.length === 0
    ) {
      setError(
        "Please fill all fields and select at least one specialization."
      );
      return;
    }

    try {
      setLoading(true);

      const res = await createDeveloper(form);

      // ✅ IMPORTANT: only set credentials here
      setCredentials(res.data.credentials);

    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to create developer"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ❌ CLOSE MODAL */
  const handleClose = () => {
    setCredentials(null);
    setError("");
    setForm({
      fullName: "",
      email: "",
      specializations: [],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={handleClose}
      />

      {/* MODAL */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl z-10">
        {/* HEADER */}
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-slate-800">
            Add Developer
          </h2>
          <p className="text-xs text-gray-400">
            Create a new developer account
          </p>
        </div>

        {/* BODY */}
        <div className="p-6">
          {/* ✅ SUCCESS STATE */}
          {credentials ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <p className="font-semibold text-green-700 mb-2">
                Developer created successfully 🎉
              </p>

              <div className="text-sm space-y-2">
                <p>
                  <span className="text-gray-500">Email:</span>{" "}
                  <span className="font-medium">
                    {credentials.email}
                  </span>
                </p>

                <p>
                  <span className="text-gray-500">Password:</span>{" "}
                  <span className="font-mono bg-white px-2 py-1 rounded border">
                    {credentials.password}
                  </span>
                </p>
              </div>

              <p className="text-xs text-red-600 mt-3">
                ⚠️ Copy this password now. It will not be shown again.
              </p>

              <button
                onClick={() => {
                  onSuccess(); // reload developers list
                  handleClose(); // close modal
                }}
                className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-sm"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              {/* ❌ ERROR */}
              {error && (
                <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded">
                  {error}
                </div>
              )}

              {/* FULL NAME */}
              <div className="mb-4">
                <label className="block text-xs text-gray-500 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={form.fullName}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      fullName: e.target.value,
                    })
                  }
                />
              </div>

              {/* EMAIL */}
              <div className="mb-5">
                <label className="block text-xs text-gray-500 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                />
              </div>

              {/* SPECIALIZATIONS */}
              <p className="text-sm font-medium text-slate-700 mb-2">
                Specializations
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {SERVICES.map((skill) => {
                  const active =
                    form.specializations.includes(skill);

                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`px-3 py-1.5 rounded-full text-xs border transition ${
                        active
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {skill.replace("_", " ")}
                    </button>
                  );
                })}
              </div>

              {/* ACTIONS */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleClose}
                  disabled={loading}
                  className="px-4 py-2 text-sm rounded-lg border hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="px-4 py-2 text-sm rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-60"
                >
                  {loading ? "Creating…" : "Create Developer"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
