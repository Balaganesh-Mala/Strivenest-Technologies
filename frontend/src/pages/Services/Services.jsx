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
        "Looking for the best App Development Company in Anantapur? Strivenest Technologies specializes in creating powerful, high-performance mobile applications for Android, iOS, and cross-platform solutions using React Native and Flutter. We build custom mobile apps that are fast, secure, and user-friendly—designed to boost engagement, strengthen brand identity, and drive measurable business results. As a trusted mobile app development company in Anantapur, we deliver innovative, scalable, and visually stunning apps that work seamlessly across devices. From concept to deployment, we transform ideas into digital products that help startups, SMEs, and enterprises accelerate growth in today’s mobile-first world.",
      img: "https://ik.imagekit.io/iiz6sw7ik/people-taking-part-business-event.jpg?updatedAt=1761647689828",
    },
    {
      title: "Web Development",
      color: "#fdf2bcff",
      textColor: "#333",
      content:
        "Looking for the best Web Development Company in Anantapur? Strivenest Technologies delivers modern, responsive, and SEO-optimized websites that help businesses build a strong digital presence and achieve measurable growth. Our expert team specializes in developing business websites, e-commerce platforms, web portals, and custom web applications tailored to your brand and goals. We focus on speed, security, and scalability, ensuring seamless performance across all devices and browsers. As a trusted website development company in Anantapur, we combine creativity with cutting-edge technologies like React.js, Node.js, and Python to craft web solutions that engage visitors, enhance conversions, and elevate your online identity. Partner with Strivenest Technologies to turn your ideas into powerful, results-driven web experiences.",
      img: "https://via.placeholder.com/250x150",
    },
    {
      title: "Cloud Services",
      color: "#c6e3ffff",
      textColor: "#333",
      content:
        "Looking for the best Cloud Services Company in Anantapur? Strivenest Technologies provides scalable, secure, and cost-efficient cloud solutions that empower businesses to modernize their IT infrastructure and accelerate digital transformation. We specialize in AWS, Google Cloud, Microsoft Azure, and Docker to deploy, manage, and optimize applications with unmatched reliability and performance. Our cloud experts design customized architectures for hosting, data storage, DevOps automation, and application scalability, ensuring high availability and seamless performance. As a trusted cloud services provider in Anantapur, we help startups, SMEs, and enterprises migrate to the cloud with confidence—enhancing security, reducing costs, and improving agility. With Strivenest Technologies, future-proof your business through intelligent, scalable, and cloud-native solutions.",
      img: "https://via.placeholder.com/250x150",
    },
    {
      title: "Marketing",
      color: "#f97433",
      content:
        "Looking for the best Digital Marketing Company in Anantapur? Strivenest Technologies helps businesses grow online through result-driven digital marketing strategies that boost visibility, engagement, and conversions. Our expert team specializes in SEO, Google Ads, Social Media Marketing, Content Marketing, and Branding to help you reach your target audience effectively. We combine data-driven insights with creative execution to deliver measurable results and long-term brand growth. As a trusted digital marketing agency in Anantapur, we craft personalized campaigns that enhance your online presence, improve ROI, and establish a strong digital identity. Partner with Strivenest Technologies to turn your brand into a powerful online success story through smart marketing that drives real business impact.",
      img: "https://via.placeholder.com/250x150",
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
