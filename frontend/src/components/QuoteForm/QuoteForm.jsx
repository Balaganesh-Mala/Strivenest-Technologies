import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoPerson,
  IoMail,
  IoCall,
  IoBriefcase,
  IoCash,
  IoTime,
  IoClose,
} from "react-icons/io5";
import Swal from "sweetalert2";

const API_URL = "http://localhost:5000/api/client/request";

export default function QuoteForm({ setShowQuote }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    companyName: "",
    serviceType: "WEB_DEVELOPMENT",
    projectTitle: "",
    projectDescription: "",
    estimatedBudget: "",
    expectedTimeline: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const handleSubmit = async () => {
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

      if (!res.ok) throw new Error("Submission failed");

      Swal.fire({
        icon: "success",
        title: "Request Submitted 🎉",
        text: "Our team will contact you shortly.",
        confirmButtonColor: "#4f46e5",
      });

      setShowQuote(false);
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* OVERLAY */}
      <motion.div
        className="fixed inset-0 bg-black/40 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => setShowQuote(false)}
      />

      {/* MODAL */}
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden">
          {/* HEADER */}
          <div className="flex justify-between items-center px-6 py-4 border-b">
            <div>
              <h2 className="text-lg font-semibold">Get a Free Quote</h2>
              <p className="text-xs text-gray-400">
                Step {step} of 3
              </p>
            </div>
            <button onClick={() => setShowQuote(false)}>
              <IoClose size={22} />
            </button>
          </div>

          {/* PROGRESS */}
          <div className="flex">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1 flex-1 ${
                  step >= s ? "bg-indigo-600" : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          {/* BODY */}
          <div className="p-6 min-h-[280px]">
            <AnimatePresence mode="wait">
              {/* STEP 1 */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="space-y-4"
                >
                  <Input icon={<IoPerson />} name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} />
                  <Input icon={<IoMail />} name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                  <Input icon={<IoCall />} name="phone" placeholder="Phone (10 digits)" value={formData.phone} onChange={handleChange} />
                  <Input icon={<IoBriefcase />} name="companyName" placeholder="Company Name (optional)" value={formData.companyName} onChange={handleChange} />
                </motion.div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="space-y-4"
                >
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="WEB_DEVELOPMENT">Web Development</option>
                    <option value="APP_DEVELOPMENT">App Development</option>
                    <option value="FULL_STACK">Full Stack</option>
                    <option value="MARKETING">Marketing</option>
                    <option value="UI_UX">UI / UX</option>
                  </select>

                  <Input icon={<IoBriefcase />} name="projectTitle" placeholder="Project Title" value={formData.projectTitle} onChange={handleChange} />

                  <textarea
                    name="projectDescription"
                    rows={3}
                    placeholder="Describe your project"
                    value={formData.projectDescription}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </motion.div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="space-y-4"
                >
                  <Input icon={<IoCash />} name="estimatedBudget" placeholder="Estimated Budget (₹)" value={formData.estimatedBudget} onChange={handleChange} />
                  <Input icon={<IoTime />} name="expectedTimeline" placeholder="Expected Timeline" value={formData.expectedTimeline} onChange={handleChange} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* FOOTER */}
          <div className="px-6 py-4 border-t flex justify-between">
            <button
              onClick={step === 1 ? () => setShowQuote(false) : back}
              className="px-4 py-2 border rounded-lg"
            >
              {step === 1 ? "Cancel" : "Back"}
            </button>

            {step < 3 ? (
              <button
                onClick={next}
                className="px-5 py-2 bg-indigo-600 text-white rounded-lg"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-5 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}

/* ---------- INPUT COMPONENT ---------- */
const Input = ({ icon, ...props }) => (
  <div className="relative">
    <span className="absolute left-3 top-2.5 text-gray-400">
      {icon}
    </span>
    <input
      {...props}
      className="w-full border rounded-lg pl-10 pr-3 py-2 text-sm focus:ring-2 focus:ring-indigo-600"
    />
  </div>
);
