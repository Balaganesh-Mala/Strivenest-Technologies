import { useEffect, useRef, useState } from "react";

export default function AboutUs() {
  const aboutRef = useRef(null);
  const hasAnimated = useRef(false);

  const [counts, setCounts] = useState({
    satisfaction: 0,
    projects: 0,
    delivery: 0,
  });

  /* ================= INTERSECTION OBSERVER ================= */
  useEffect(() => {
    if (!aboutRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          startCountUp();
          observer.disconnect();
        }
      },
      {
        threshold: 0.45,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(aboutRef.current);

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ================= COUNT UP ================= */
  const startCountUp = () => {
    const duration = 1800;
    const start = performance.now();

    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCounts({
        satisfaction: Math.floor(eased * 100),
        projects: Math.floor(eased * 60),
        delivery: Math.floor(eased * 2),
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <section
      id="about"
      ref={aboutRef}
      className="py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* IMAGE */}
        <div className="relative">
          <img
            src="https://ik.imagekit.io/iiz6sw7ik/creative-people-working-office.jpg"
            alt="About us"
            className="rounded-2xl shadow-lg w-full object-cover"
          />

          {/* Decorative overlay */}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-black/5" />
        </div>

        {/* CONTENT */}
        <div className="space-y-6">
          <div>
            <h2 className="text-[35px] font-bold text-indigo-600 uppercase tracking-wide">
              About Us
            </h2>
            <h3 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
              Empowering Your Digital Future with Innovative Solutions
            </h3>
          </div>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Our commitment to innovation, collaboration, and customer success
            drives everything we do. We stay at the forefront of digital trends
            to deliver scalable, reliable, and high-quality solutions for
            startups, small businesses, and enterprises alike.
          </p>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <StatCard
              value={`${counts.satisfaction}%`}
              label="Customer Satisfaction"
            />
            <StatCard
              value={`${counts.projects}+`}
              label="Projects Completed"
            />
            <StatCard
              value={`${counts.delivery} Months`}
              label="Avg. Delivery Time"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= STAT CARD ================= */
function StatCard({ value, label }) {
  return (
    <div className="bg-slate-50 rounded-xl p-5 text-center border hover:shadow-sm transition">
      <p className="text-2xl font-bold text-indigo-600">
        {value}
      </p>
      <p className="mt-1 text-xs text-slate-500">
        {label}
      </p>
    </div>
  );
}
