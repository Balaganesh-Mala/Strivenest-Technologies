import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import techData from "../../data/techData.js";

const TechnologyDetails = () => {
  const { techId } = useParams();
  const navigate = useNavigate();
  const tech = techData[techId];

  /* ================= NOT FOUND ================= */
  if (!tech) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="bg-white p-8 rounded-2xl shadow max-w-md text-center">
          <h2 className="text-2xl font-semibold text-slate-800 mb-2">
            Technology Not Found
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            The requested technology does not exist.
          </p>
          <button
            onClick={() => navigate("/technology")}
            className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            Back to Technologies
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-white">
      {/* ================= HERO / BANNER ================= */}
      <div className="relative h-[300px] md:h-[420px]">
        {tech.banner && (
          <img
            src={tech.banner}
            alt={tech.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-6xl mx-auto px-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {tech.title}
            </h1>

            <p className="max-w-2xl text-sm md:text-base text-gray-200 leading-relaxed">
              {tech.content.overview}
            </p>
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-6xl mx-auto px-6 py-14 space-y-14">
        <Section title="How We Use It">
          {tech.content.howWeUse}
        </Section>

        <Section title="Benefits">
          {tech.content.benefits}
        </Section>

        <Section title="Use Cases">
          {tech.content.useCases}
        </Section>

        <Section title="Future Scope">
          {tech.content.futureScope}
        </Section>

        {/* ================= TECHNOLOGIES LIST ================= */}
        <div>
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">
            Technologies We Use
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tech.technologies.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border hover:bg-slate-100 transition"
              >
                <span className="h-2 w-2 rounded-full bg-indigo-600" />
                <p className="text-sm text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ================= REUSABLE SECTION ================= */
function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-slate-800 mb-4">
        {title}
      </h2>
      <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-4xl">
        {children}
      </p>
    </div>
  );
}

export default TechnologyDetails;
