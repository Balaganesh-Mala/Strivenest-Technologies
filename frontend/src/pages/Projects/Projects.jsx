import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Images
import frshmilk from "../../assets/project/freshmilk.png";
import hungerbites from "../../assets/project/hungerbites.png";
import mbfunkyzone from "../../assets/project/mbfunkyzone.png";
import organicoils from "../../assets/project/organicoil.png";

const projects = [
  {
    title: "Fresh Milkk – Milk Subscription E-Commerce",
    img: frshmilk,
    desc: "A complete subscription-based dairy delivery platform with daily order scheduling, wallet system, coupon management, delivery tracking, and automated subscription renewals. Designed for seamless customer experience with a mobile-first UI.",
    url: "https://freshmilkk.com",
  },
  {
    title: "Hunger Bites – Snacks E-Commerce",
    img: hungerbites,
    desc: "A feature-rich snacks e-commerce store built with OTP authentication, secure checkout, dynamic pricing, and full Shiprocket integration for automated shipping and AWB generation. Optimized for fast performance and conversions.",
    url: "https://hungerbites.store",
  },
  {
    title: "MB Funky Zone – Fashion E-Commerce",
    img: mbfunkyzone,
    desc: "A modern clothing platform offering real-time stock updates, size and color variants, product filtering, and robust cart flow. Built with an advanced admin panel for inventory and order management.",
    url: "https://mbfunkyzone.onrender.com",
  },
  {
    title: "Organic Oils – Oil & Grocery E-Commerce",
    img: organicoils,
    desc: "A clean and user-friendly organic groceries platform featuring product categorization, dynamic pricing, discounts, COD support, and streamlined checkout. Optimized for rural and urban shoppers.",
    url: "https://organicoils.onrender.com",
  },
  {
    title: "Sri Ganesh Interiors – Interior Design Website",
    img: "https://ik.imagekit.io/izqq5ffwt/interior-project.jpg",
    desc: "A professional interior design portfolio website showcasing modern designs, service categories, completed projects, and a high-conversion contact system. Built with a premium look to attract clients.",
    url: "https://sriganeshinterior.onrender.com",
  },
  {
    title: "E-Commerce",
    img: "https://ik.imagekit.io/izqq5ffwt/7897863.jpg",
    desc: "A full-fledged e-commerce store featuring cart management, search, product listings, secure checkout, and responsive UI. Built with a strong focus on speed and user experience.",
    url: "https://malanxttrendze.ccbp.tech/",
  },
  {
    title: "Task Management",
    img: "https://ik.imagekit.io/izqq5ffwt/3271441.jpg",
    desc: "A powerful productivity app enabling task creation, reminders, progress tracking, and real-time updates. Designed for teams and individuals who need a fast, organized workflow.",
    url: "https://task-flow-frontend-dntu.onrender.com/",
  },
  {
    title: "NxtWatch (YouTube Clone)",
    img: "https://ik.imagekit.io/izqq5ffwt/6350310.jpg",
    desc: "A YouTube-inspired video streaming platform with search filters, watch history, dark mode, trending videos, and responsive UI. Built to deliver smooth video playback and realistic user experience.",
    url: "https://nxtwatch.ccbp.tech/",
  },
];


export default function Projects() {
  return (
    <section className="py-16 bg-[#f9fbff] overflow-hidden">
  <div className="max-w-7xl mx-auto px-6 relative">

    <h2 className="text-3xl font-bold text-center text-[#0c163b]">
      Our Sample Projects
    </h2>
    <p className="text-center text-gray-500 mt-2 mb-10">
      Selected works highlighting our skills and design
    </p>

    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      loop
      speed={9000}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        reverseDirection: true, // LEFT → RIGHT continuous
      }}
      slidesPerView="auto"
      spaceBetween={24}
      navigation={{
        nextEl: ".projects-next",
        prevEl: ".projects-prev",
      }}
      pagination={{ clickable: true }}
      className="relative pb-10"
    >
      {[...projects, ...projects].map((p, i) => (
        <SwiperSlide
          key={i}
          className="!w-[280px] sm:!w-[320px] md:!w-[360px] lg:!w-[380px]"
        >
          <div
            onClick={() => window.open(p.url, "_blank")}
            className="cursor-pointer bg-white rounded-2xl shadow-md 
            overflow-hidden hover:shadow-lg transition h-[420px] flex flex-col"
          >
            {/* IMAGE */}
            <div className="h-56 w-full overflow-hidden flex-shrink-0">
              <img
                src={p.img}
                alt={p.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* CONTENT */}
            <div className="p-4 flex flex-col justify-between flex-grow">
              <h3 className="text-lg font-semibold line-clamp-1">
                {p.title}
              </h3>

              <p className="text-sm text-gray-600 mt-2 line-clamp-4">
                {p.desc}
              </p>

              {/* Read More / Placeholder */}
              <span className="text-[#0c163b] mt-3 font-medium">
                View Project →
              </span>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>

    {/* LEFT ARROW */}
    <button
      className="projects-prev absolute left-0 top-1/2 -translate-y-1/2 
      bg-white shadow-md text-gray-700 w-10 h-10 rounded-full flex items-center 
      justify-center hover:bg-gray-100 z-20"
    >
      <FaArrowLeft size={18} />
    </button>

    {/* RIGHT ARROW */}
    <button
      className="projects-next absolute right-0 top-1/2 -translate-y-1/2 
      bg-white shadow-md text-gray-700 w-10 h-10 rounded-full flex items-center 
      justify-center hover:bg-gray-100 z-20"
    >
      <FaArrowRight size={18} />
    </button>
  </div>
</section>

  );
}
