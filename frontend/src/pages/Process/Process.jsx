import React, { useState } from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./Process.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const steps = [
  {
    title: "Step 1: Requirement",
    img: "https://ik.imagekit.io/izqq5ffwt/2082303.jpg",
    text: "We start by understanding your business goals, audience, and project scope. Our team conducts deep research and discussions to gather all necessary details to create a solid foundation for your project."
  },
  {
    title: "Step 2: Agreement",
    img: "https://ik.imagekit.io/izqq5ffwt/Screenshot%202025-10-30%20092306.png",
    text: "Once the requirements are finalized, we establish a transparent agreement covering the project scope, timeline, and deliverables — ensuring mutual clarity and trust."
  },
  {
    title: "Step 3: UI & UX Design",
    img: "https://ik.imagekit.io/izqq5ffwt/5881573.jpg",
    text: "Our design team crafts intuitive, engaging, and modern UI/UX layouts to ensure your product not only looks great but also delivers a seamless user experience."
  },
  {
    title: "Step 4: Development",
    img: "https://ik.imagekit.io/izqq5ffwt/4380747.jpg",
    text: "We build scalable, high-performance web and mobile applications using modern technologies while following clean coding standards."
  },
  {
    title: "Step 5: Testing",
    img: "https://ik.imagekit.io/izqq5ffwt/Screenshot%202025-10-30%20093224.png",
    text: "Our QA experts conduct rigorous testing to identify and fix bugs, ensuring top-quality performance, speed, and security before deployment."
  },
  {
    title: "Step 6: Deployment & Live",
    img: "https://ik.imagekit.io/izqq5ffwt/7090038.jpg",
    text: "We deploy your project smoothly to your preferred environment and monitor the live performance, ensuring stability and ongoing support."
  }
];

const Process = () => {
  const [current, setCurrent] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    pauseOnHover: true,
    beforeChange: (_, newIndex) => setCurrent(newIndex),
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          centerMode: false
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: false
        }
      }
    ]
  };

  return (
    <section className="process-section">
      <h2 className="process-title">Our Process</h2>
      <h3 className="process-subtitle">{steps[current].title}</h3>

      <div className="slider-container">
        <Slider {...settings}>
          {steps.map((step, index) => (
            <div
              key={index}
              className={`slide-card ${index === current ? "active" : ""}`}
            >
              <img src={step.img} alt={step.title} />
            </div>
          ))}
        </Slider>
      </div>

      <p className="process-text">{steps[current].text}</p>
    </section>
  );
};

function NextArrow({ onClick }) {
  return (
    <div className="arrow next" onClick={onClick}>
      <FaArrowRight />
    </div>
  );
}

function PrevArrow({ onClick }) {
  return (
    <div className="arrow prev" onClick={onClick}>
      <FaArrowLeft />
    </div>
  );
}

export default Process;
