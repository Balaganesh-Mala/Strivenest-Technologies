import React, { useState, useEffect } from "react";
import DeveloperNavbar from "../../components/Navbar/DeveloperNavbar";
import DeveloperSidebar from "../../components/Sidebar/DeveloperSidebar";
import API from "../../api/apiClient";
import toast from "react-hot-toast";

export default function Help() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "Support",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    try {
      const res = await API.get("/auth/me");
      setUser(res.data.data);
      setForm((prev) => ({
        ...prev,
        name: res.data.data.name || "",
        email: res.data.data.email || "",
      }));
    } catch (err) {
      console.error("Failed to load user:", err);
    }
  }

  async function submit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await API.post("/quotes", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        serviceType: form.serviceType,
        message: form.message,
      });
      toast.success("Support request sent. Admin will contact you.");
      setForm({
        name: user?.name || "",
        email: user?.email || "",
        phone: "",
        serviceType: "Support",
        message: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to send request");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen bg-gray-50 text-gray-800 overflow-hidden">
      {/* Sidebar (Desktop) */}
      <div className="hidden md:block w-64 bg-white/60 backdrop-blur-lg border-r border-gray-100">
        <DeveloperSidebar />
      </div>

      {/* Sidebar (Mobile) */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white/95 backdrop-blur-xl z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <DeveloperSidebar />
      </div>

      {/* Overlay */}
      {showSidebar && (
        <div
          onClick={() => setShowSidebar(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden"
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative z-10">
        <DeveloperNavbar
          user={user}
          onToggleSidebar={() => setShowSidebar(!showSidebar)}
        />

        <div className="p-5 sm:p-8">
          <h2 className="text-2xl font-semibold mb-4">Help & Support</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left: FAQ */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-3">FAQ</h3>
              <dl className="space-y-4 text-sm text-gray-600">
                <div>
                  <dt className="font-medium">How do I accept a project?</dt>
                  <dd className="text-gray-500">
                    Open <span className="font-medium text-indigo-600">Project Requests</span> and click
                    Accept. The project will move to <b>In Progress</b>.
                  </dd>
                </div>
                <div>
                  <dt className="font-medium">How to report bugs?</dt>
                  <dd className="text-gray-500">
                    Use the form on the right to submit an issue. Admin receives the
                    quote as a support ticket.
                  </dd>
                </div>
                <div>
                  <dt className="font-medium">How can I change a deadline?</dt>
                  <dd className="text-gray-500">
                    Contact the admin or submit a support request with the project ID and
                    new date.
                  </dd>
                </div>
              </dl>
            </div>

            {/* Right: Support Form */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-3">
                Send Support Request
              </h3>
              <form onSubmit={submit} className="space-y-4">
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  placeholder="Your name"
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  placeholder="Email"
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="Phone"
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                />
                <select
                  value={form.serviceType}
                  onChange={(e) =>
                    setForm({ ...form, serviceType: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                >
                  <option>Support</option>
                  <option>Bug</option>
                  <option>Feature Request</option>
                </select>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows="4"
                  placeholder="Describe your issue"
                  className="w-full px-3 py-2 border rounded-lg text-sm"
                ></textarea>
                <div className="flex justify-end">
                  <button
                    disabled={loading}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm"
                  >
                    {loading ? "Sending..." : "Send Request"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
