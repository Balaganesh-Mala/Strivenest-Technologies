import React from "react";
import Slider from "react-slick";
import { FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import "./Testimonials.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    name: "Suresh Reddy",
    text: "Strivenest Technologies delivered our project with outstanding quality and professionalism. Their team truly understood our business needs and turned them into a smooth, user-friendly app. Great communication and timely delivery — highly recommended!",
    img: "https://ik.imagekit.io/izqq5ffwt/avatar.jpg"
  },
  {
    name: "Divya Priya",
    text: "I had a wonderful experience working with Strivenest Technologies. They developed my website exactly the way I wanted, with a modern design and excellent performance. The team is very talented, supportive, and creative throughout the process.",
    img: "https://ik.imagekit.io/izqq5ffwt/avatar.jpg"
  },
  {
    name: "Chandra Sekhar",
    text: "The team at Strivenest Technologies in Anantapur went above and beyond to deliver our software project. Their technical knowledge, quick response, and dedication helped us achieve the best results for our business. Truly a professional and trustworthy company!",
    img: "https://ik.imagekit.io/izqq5ffwt/avatar.jpg"
  },
  {
    name: "Bhavani Lakshmi",
    text: "I am very impressed with the service from Strivenest Technologies. From design to deployment, everything was handled perfectly. They are a great team with a clear focus on quality and client satisfaction. Definitely the best tech company in Anantapur!",
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