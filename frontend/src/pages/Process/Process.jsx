import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const steps = [
  {
    title: "Step 1: Requirement",
    img: "https://ik.imagekit.io/izqq5ffwt/2082303.jpg",
    text: "We understand your business goals, audience, and requirements through structured discussions.",
  },
  {
    title: "Step 2: Agreement",
    img: "https://ik.imagekit.io/izqq5ffwt/Screenshot%202025-10-30%20092306.png",
    text: "We finalize scope, timeline, and deliverables with complete transparency.",
  },
  {
    title: "Step 3: UI & UX Design",
    img: "https://ik.imagekit.io/izqq5ffwt/5881573.jpg",
    text: "Our designers craft intuitive and modern user experiences focused on usability.",
  },
  {
    title: "Step 4: Development",
    img: "https://ik.imagekit.io/izqq5ffwt/4380747.jpg",
    text: "We build scalable, high-performance applications using clean architecture.",
  },
  {
    title: "Step 5: Testing",
    img: "https://ik.imagekit.io/izqq5ffwt/Screenshot%202025-10-30%20093224.png",
    text: "Thorough QA testing ensures performance, security, and reliability.",
  },
  {
    title: "Step 6: Deployment & Live",
    img: "https://ik.imagekit.io/izqq5ffwt/7090038.jpg",
    text: "We deploy smoothly and provide ongoing support after launch.",
  },
];

export default function Process() {
  const duplicated = [...steps, ...steps];
  const [current, setCurrent] = useState(0);

  return (
    <section className="py-24 px-4 bg-gradient-to-br from-indigo-950 via-indigo-900 to-indigo-800 text-white overflow-hidden">
      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <h2 className="text-sm font-semibold tracking-widest text-indigo-300 uppercase">
          Our Workflow
        </h2>
        <h3 className="mt-2 text-3xl sm:text-4xl font-bold">
          How We Deliver Excellence
        </h3>
        <p className="mt-4 text-indigo-200 text-sm sm:text-base">
          A structured, transparent, and efficient development process designed
          for success.
        </p>
      </div>

      {/* SLIDER */}
      <div className="relative max-w-6xl mx-auto">
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          loop
          speed={8000}
          autoplay={{ delay: 0, disableOnInteraction: false }}
          slidesPerView="auto"
          spaceBetween={32}
          /* ✅ CENTER FIX */
          centeredSlides
          centeredSlidesBounds
          initialSlide={Math.floor(steps.length / 2)}
          navigation={{
            nextEl: ".process-next",
            prevEl: ".process-prev",
          }}
          pagination={{ clickable: true }}
          onSlideChange={(swiper) =>
            setCurrent(swiper.realIndex % steps.length)
          }
          className="pb-12"
        >
          {duplicated.map((step, i) => {
            const active = current === i % steps.length;

            return (
              <SwiperSlide
                key={i}
                className="!w-[240px] sm:!w-[280px] flex justify-center"
              >
                <div
                  className={`rounded-2xl bg-white transition-all duration-300
                    ${
                      active
                        ? "scale-105 shadow-2xl opacity-100"
                        : "scale-90 opacity-50"
                    }
                  `}
                >
                  <div className="h-[180px] flex items-center justify-center p-4">
                    <img
                      src={step.img}
                      alt={step.title}
                      className="h-full object-contain rounded-xl"
                    />
                  </div>

                  <div className="px-4 pb-4 text-center">
                    <p className="text-xs font-semibold text-indigo-600">
                      {step.title}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* NAVIGATION */}
        <button className="process-prev absolute left-0 top-1/2 -translate-y-1/2 bg-white text-indigo-700 w-10 h-10 flex items-center justify-center rounded-full shadow hover:bg-indigo-100 transition z-20">
          <FaArrowLeft />
        </button>

        <button className="process-next absolute right-0 top-1/2 -translate-y-1/2 bg-white text-indigo-700 w-10 h-10 flex items-center justify-center rounded-full shadow hover:bg-indigo-100 transition z-20">
          <FaArrowRight />
        </button>
      </div>

      {/* DESCRIPTION */}
      <div className="mt-12 max-w-2xl mx-auto text-center">
        <h4 className="text-lg font-semibold text-white">
          {steps[current].title}
        </h4>
        <p className="mt-3 text-indigo-200 text-sm leading-relaxed">
          {steps[current].text}
        </p>
      </div>
    </section>
  );
}
