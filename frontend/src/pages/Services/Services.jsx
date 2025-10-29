import React, { useState, useEffect } from "react";
import "./Services.css";

const Services = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector(".services-section");
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) setAnimate(true);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    {
      title: "App Development",
      color: "#3c32aa",
      textColor: "#ffffff",
      content:
        "Looking for the best Mobile App Development Company in Hyderabad? Analogue IT Solutions is your trusted partner for turning ideas into powerful mobile apps. We specialize in Android, iOS, and cross-platform development, delivering fast, scalable, and user-friendly solutions. Our expert team focuses on UI/UX design, smooth performance, and secure architecture to provide exceptional user experiences. From startups to enterprises, we serve industries like healthcare, e-commerce, travel, and logistics. Covering the complete app development lifecycle, we ensure precision at every stage. Businesses choose us because we build apps that engage users, strengthen brands, and drive business growth.",
      img: "https://ik.imagekit.io/iiz6sw7ik/people-taking-part-business-event.jpg?updatedAt=1761647689828",
    },
    {
      title: "Web Development",
      color: "#fdf2bcff",
      textColor: "#333",
      content:
        "Looking for the best Mobile App Development Company in Hyderabad? Analogue IT Solutions is your trusted partner for turning ideas into powerful mobile apps. We specialize in Android, iOS, and cross-platform development, delivering fast, scalable, and user-friendly solutions. Our expert team focuses on UI/UX design, smooth performance, and secure architecture to provide exceptional user experiences.From startups to enterprises, we serve industries like healthcare, e-commerce, travel, and logistics. Covering the complete app development lifecycle, we ensure precision at every stage. Businesses choose us because we build apps that engage users, strengthen brands, and drive business growth.",
      img: "https://via.placeholder.com/250x150",
    },
    {
      title: "Cloud Services",
      color: "#c6e3ffff",
      textColor: "#333",
      content:
        "Looking for the best Website Development Company in Hyderabad? Analogue IT Solutions creates websites that not only look great but also perform, engage, and deliver measurable results. Our services include business websites, e-commerce platforms, portals, and custom web solutions tailored to your brand. We prioritize speed, security, SEO-friendly structures, and responsive design to ensure smooth performance across all devices. As a trusted Website Development Company in Hyderabad, we work with startups, SMEs, and enterprises to build strong online identities. Clients choose us because we transform ideas into powerful digital platforms that drive conversions, build trust, and accelerate growth.",
      img: "https://via.placeholder.com/250x150",
    },
    {
      title: "Marketing",
      color: "#f97433",
      content:
        "Looking for the best Website Development Company in Hyderabad? Analogue IT Solutions creates websites that not only look great but also perform, engage, and deliver measurable results. Our services include business websites, e-commerce platforms, portals, and custom web solutions tailored to your brand. We prioritize speed, security, SEO-friendly structures, and responsive design to ensure smooth performance across all devices. As a trusted Website Development Company in Hyderabad, we work with startups, SMEs, and enterprises to build strong online identities. Clients choose us because we transform ideas into powerful digital platforms that drive conversions, build trust, and accelerate growth.",
      img: "https://via.placeholder.com/250x150",
    },
    {
      title: "App Development",
      color: "#090058ff",
      textColor: "#ffffff",
      content:
        "Looking for the best Mobile App Development Company in Hyderabad? Analogue IT Solutions is your trusted partner for turning ideas into powerful mobile apps. We specialize in Android, iOS, and cross-platform development, delivering fast, scalable, and user-friendly solutions. Our expert team focuses on UI/UX design, smooth performance, and secure architecture to provide exceptional user experiences. From startups to enterprises, we serve industries like healthcare, e-commerce, travel, and logistics. Covering the complete app development lifecycle, we ensure precision at every stage. Businesses choose us because we build apps that engage users, strengthen brands, and drive business growth.",
      img: "https://ik.imagekit.io/iiz6sw7ik/people-taking-part-business-event.jpg?updatedAt=1761647689828",
    },
  ];

  return (
    <section className="services-section" id="services">
      <div className={`section-title ${animate ? "animate" : ""}`}>
        <h2 className="left-slide">Services</h2>
      </div>
      <div className={`section-title ${animate ? "animate" : ""}`}>
        <h2 className="right-slide">We Provide</h2>
      </div>
      <div className="services-container">
        {services.map((service, index) => (
          <div
            key={index}
            className={`service-card ${activeCard === index ? "active" : ""}`}
            style={{ backgroundColor: service.color }}
            onMouseEnter={() => setActiveCard(index)}
          >
            <h3 style={{color:service.textColor}}>{service.title}</h3>
            {activeCard === index && (
              <div className="service-content">
                <p style={{color:service.textColor}}>{service.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
