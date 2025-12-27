import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

import "swiper/css";

const testimonials = [
  {
    name: "Suresh Reddy",
    text: "Strivenest Technologies delivered our project with outstanding quality and professionalism. Their team truly understood our business needs and turned them into a smooth, user-friendly app. Great communication and timely delivery — highly recommended!",
    img: "https://ik.imagekit.io/izqq5ffwt/avatar.jpg",
  },
  {
    name: "Divya Priya",
    text: "I had a wonderful experience working with Strivenest Technologies. They developed my website exactly the way I wanted, with a modern design and excellent performance. The team is very talented, supportive, and creative throughout the process.",
    img: "https://ik.imagekit.io/izqq5ffwt/avatar.jpg",
  },
  {
    name: "Chandra Sekhar",
    text: "The team at Strivenest Technologies in Anantapur went above and beyond to deliver our software project. Their technical knowledge, quick response, and dedication helped us achieve the best results for our business. Truly a professional and trustworthy company!",
    img: "https://ik.imagekit.io/izqq5ffwt/avatar.jpg",
  },
  {
    name: "Bhavani Lakshmi",
    text: "I am very impressed with the service from Strivenest Technologies. From design to deployment, everything was handled perfectly. They are a great team with a clear focus on quality and client satisfaction. Definitely the best tech company in Anantapur!",
    img: "https://ik.imagekit.io/izqq5ffwt/avatar.jpg",
  },
];

export default function Testimonials() {
  return (
    <section className="pt-5 pb-10 bg-[#f6faf6] overflow-hidden ">
      <div className="max-w-7xl mx-auto px-6">
        {/* TITLE */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#0c163b]">
            What Our Clients Say
          </h2>
          <p className="mt-2 text-gray-500">
            Here’s what people are saying about our service.
          </p>
        </div>

        {/* CONTINUOUS AUTO SLIDER */}
        <Swiper
          modules={[Autoplay]}
          loop
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={8000}
          slidesPerView="auto"
          spaceBetween={24}
        >
          {[...testimonials, ...testimonials].map((item, index) => (
            <SwiperSlide
              key={index}
              className="!w-[330px] md:!w-[380px] lg:!w-[400px]"
            >
              <div className="bg-white shadow-sm border rounded-2xl p-6 h-full">
                <FaQuoteLeft className="text-3xl text-gray-300 mb-4" />

                <p className="text-gray-700 leading-relaxed mb-6">
                  {item.text}
                </p>

                <div className="flex items-center gap-3">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-12 h-12 rounded-full border"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{item.name}</h4>
                    <div className="flex text-yellow-400 text-sm mt-1">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
