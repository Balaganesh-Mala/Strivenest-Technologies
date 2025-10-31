import React from "react";
import { useParams } from "react-router-dom";
import Footer from "../Footer/Footer.jsx"
import FAQ from "../FAQ/FAQ.jsx"
import Slider from "react-slick";
import "./ServiceDetails.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const serviceData = {
  web: {
    title: "Web Development",
    img: "https://ik.imagekit.io/izqq5ffwt/Pink%20and%20Purple%20Gradient%20Technology%20Business%20LinkedIn%20Banner%20(1).png",
    desc: "We create responsive, scalable, and visually engaging websites that deliver exceptional user experiences.",
    projects: [
      "https://picsum.photos/id/1015/600/400",
      "https://picsum.photos/id/1016/600/400",
      "https://picsum.photos/id/1018/600/400",
    ],
  },
  app: {
    title: "App Development",
    img: "https://ik.imagekit.io/izqq5ffwt/Pink%20and%20Purple%20Gradient%20Technology%20Business%20LinkedIn%20Banner%20(1).png",
    desc: "We build native and cross-platform mobile apps with smooth performance and modern UI.",
    projects: [
      "https://picsum.photos/id/1019/600/400",
      "https://picsum.photos/id/1020/600/400",
      "https://picsum.photos/id/1021/600/400",
    ],
  },
  // add other services here...
};

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const service = serviceData[serviceId];

  if (!service) return <h2 style={{ textAlign: "center", marginTop: "100px" }}>Service not found</h2>;

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1, arrows: false } },
    ],
  };

  return (
    <section className="service-details">
      <div className="service-banner">
        <img src={service.img} alt={service.title} />
        <h1>{service.title}</h1>
      </div>

      <div className="service-desc">
        <p>{service.desc}</p>
      </div>

      <div className="service-projects">
        <h2>Sample Projects</h2>
        <Slider {...settings}>
          {service.projects.map((p, i) => (
            <div key={i} className="project-slide">
              <img src={p} alt={`Project ${i + 1}`} />
            </div>
          ))}
        </Slider>
      </div>
      <FAQ/>
      <Footer/>
    </section>
  );
};

export default ServiceDetails;
