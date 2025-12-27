import { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaServicestack } from "react-icons/fa";
import Swal from "sweetalert2";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/client/request`;


export default function ConsultationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    serviceType: "WEB_DEVELOPMENT",
    projectTitle: "",
    projectDescription: "",
    estimatedBudget: "",
    expectedTimeline: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.phone.length !== 10) {
      Swal.fire("Invalid Phone", "Phone must be 10 digits", "error");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          estimatedBudget: Number(formData.estimatedBudget),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Submission failed");
      }

      Swal.fire({
        icon: "success",
        title: "Consultation Submitted 🎉",
        text: "Our team will contact you shortly.",
        timer: 2000,
        showConfirmButton: false,
      });

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        serviceType: "WEB_DEVELOPMENT",
        projectTitle: "",
        projectDescription: "",
        estimatedBudget: "",
        expectedTimeline: "",
      });
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-10">
          Get a Free Consultation
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-6 space-y-5"
        >
          {/* Full Name */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Full Name
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="fullName"
                placeholder="Enter your name"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Phone Number
              </label>
              <div className="relative">
                <FaPhone className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="10-digit phone number"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Service */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Service Required
            </label>
            <div className="relative">
              <FaServicestack className="absolute left-3 top-3 text-gray-400" />
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm"
              >
                <option value="WEB_DEVELOPMENT">Web Development</option>
                <option value="APP_DEVELOPMENT">App Development</option>
                <option value="FULL_STACK">Full Stack</option>
                <option value="MARKETING">Marketing</option>
                <option value="CLOUD">Cloud Services</option>
                <option value="UI_UX">UI / UX</option>
              </select>
            </div>
          </div>

          {/* Project Title */}
          <input
            type="text"
            name="projectTitle"
            placeholder="Project Title"
            required
            value={formData.projectTitle}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />

          {/* Description */}
          <textarea
            name="projectDescription"
            placeholder="Describe your project..."
            rows="4"
            required
            value={formData.projectDescription}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />

          {/* Budget & Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              name="estimatedBudget"
              placeholder="Estimated Budget (₹)"
              
              value={formData.estimatedBudget}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />

            <input
              type="text"
              name="expectedTimeline"
              placeholder="Expected Timeline"
              
              value={formData.expectedTimeline}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Consultation"}
          </button>
        </form>
      </div>
    </section>
  );
}
