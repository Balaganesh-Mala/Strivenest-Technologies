import React from "react";
import Slider from "react-slick";
import { FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./Testimonials.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    name: "MOTHIRAM N",
    text: "We had an incredible experience working with Analogue IT Solutions on the development of our Kickff app. From start to finish, their team showcased exceptional technical expertise, attention to detail, and a deep understanding of our vision.",
    img: "https://ik.imagekit.io/izqq5ffwt/avatar.jpg"
  },
  {
    name: "Smruti Behura",
    text: "I approached Analogue IT Solutions for mobile app development for my business, and I am truly impressed with the results. Their team not only understood my requirements clearly but also provided valuable suggestions to enhance the functionality and design.",
    img: "https://ik.imagekit.io/izqq5ffwt/avatar.jpg"
  },
  {
    name: "Vijay Kumar Reddy",
    text: "If you're searching for a reliable, highly skilled, and innovative development team, look no further than Analogue IT Solutions. Their expertise and commitment to excellence make them the ideal partner for impactful projects.",
    img: "https://ik.imagekit.io/izqq5ffwt/avatar.jpg"
  },
  {
    name: "Deepika Sharma",
    text: "They delivered beyond our expectations! The design, functionality, and performance were outstanding. The team was very professional, communicative, and dedicated throughout the process.",
    img: "https://ik.imagekit.io/izqq5ffwt/avatar.jpg"
  }
];

const Testimonials = () => {
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
    <section className="testimonials-section">
      <h2 className="testimonial-title">What Our Clients Say</h2>
      <p className="testimonial-subtitle">
        Here’s what people are saying about our service.
      </p>
      <div className="testimonial-slider">
        <Slider {...settings}>
          {testimonials.map((item, i) => (
            <div className="testimonial-card" key={i}>
              <div className="testimonial-text">
                <span className="quote-mark">
                  <img src="https://ik.imagekit.io/izqq5ffwt/001-quote.png" alt="" />
                </span>
                <p>{item.text}</p>
              </div>
              <div className="testimonial-footer">
                <div className="profile">
                  <img src={item.img} alt={item.name} />
                  <span>{item.name}</span>
                </div>
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} color="#FFD700" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
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

export default Testimonials;