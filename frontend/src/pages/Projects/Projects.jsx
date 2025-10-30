import React from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Projects.css";

const projects = [
  {
    title: "Food Delivery App",
    img: "https://ik.imagekit.io/izqq5ffwt/Food-Delivery-App-Template-1600x1200.jpg"
  },
  {
    title: "E-Learning Platform",
    img: "https://ik.imagekit.io/izqq5ffwt/5dd3b8fb-fb5e-4ed8-bc7d-8f6cde5d0c37-cover.png"
  },
  {
    title: "Portfolio Website",
    img: "https://ik.imagekit.io/izqq5ffwt/maxresdefault.jpg"
  },
  {
    title: "E-Commerce Store",
    img: "https://ik.imagekit.io/izqq5ffwt/Furniture-E-commerce-App-Template-1.jpg"
  },
  {
    title: "Travel Booking",
    img: "https://ik.imagekit.io/izqq5ffwt/modern-traveling-ui-design-app-template-vector_490632-502.jpg"
  },
  {
    title: "Delivery Dashboard",
    img: "https://ik.imagekit.io/izqq5ffwt/figma-delivery-app-concept-template.jpg"
  }
];

function NextArrow({ onClick }) {
  return (
    <div className="sp-arrow sp-next" onClick={onClick}>
      <FaArrowRight />
    </div>
  );
}

function PrevArrow({ onClick }) {
  return (
    <div className="sp-arrow sp-prev" onClick={onClick}>
      <FaArrowLeft />
    </div>
  );
}

const Projects = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, arrows: false }
      }
    ]
  };

  return (
    <section className="sp-section">
      <h2 className="sp-title">Our Sample Projects</h2>
      <p className="sp-sub">Selected works highlighting our skills and design</p>
      <div className="sp-slider">
        <Slider {...settings}>
          {projects.map((p, i) => (
            <div className="sp-card" key={i}>
              <div className="sp-thumb">
                <img src={p.img} alt={p.title} />
              </div>
              <div className="sp-body">
                <h3>{p.title}</h3>
                <a href="#" className="sp-link">View Project</a>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Projects;
