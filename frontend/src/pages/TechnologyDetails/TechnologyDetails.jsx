import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer.jsx"
import FAQ from "../FAQ/FAQ.jsx"
import frontendImg from "../../assets/OurTechnologiesImages/frontend.jpg";
import backendImg from "../../assets/OurTechnologiesImages/backend.jpg";
import appDevelopmentImg from "../../assets/OurTechnologiesImages/AppDevelopment.jpg";
import cloudImg from "../../assets/OurTechnologiesImages/clould.jpg";

import "./TechnologyDetails.css";

const TechnologyDetails = () => {
  const navigate = useNavigate();

  const techList = [
    {
      id: "frontend",
      title: "Frontend Development",
      description: 
  "We create modern, responsive, and engaging user interfaces that deliver seamless experiences across all devices.",
image: `${frontendImg}`,
technologies: [
  "HTML",
  "CSS",
  "JavaScript",
  "React.js"
],
    },
    {
      id: "backend",
      title: "Backend Development",
      description: 
  "We build secure, scalable, and high-performance server-side applications that ensure reliability, efficiency, and seamless integration across platforms.",
image: `${backendImg}`,
technologies: [
  "Node.js",
  "Express.js",
  "MongoDB",
  "SQL Databases"
],

    },
    {
      id: "mobile",
      title: "Mobile App Development",
      description: 
  "We design and develop high-quality mobile applications that deliver seamless performance, intuitive user experiences, and scalability across iOS and Android platforms.",
image: `${appDevelopmentImg}`,
technologies: [
  "React Native ",
  "Flutter ",
  "Swift",
  "Kotlin "
],
    },
    {
      id: "cloud",
      title: "Cloud & DevOps",
      description: 
  "We deliver secure, scalable, and efficient cloud solutions that optimize performance, enhance reliability, and ensure seamless data accessibility.",
image: `${cloudImg}`,
technologies: [
  "AWS (Amazon Web Services)",
  "Microsoft Azure",
  "Google Cloud Platform",
  "Docker & Kubernetes"
]
,
    },
  ];

  return (
    <section id="technologies" className="technologies-section">
      <h2 className="tech-heading">Our Technologies</h2>
      <p className="tech-subheading">
        We use modern tools and frameworks to deliver high-quality digital
        experiences.
      </p>

      <div className="tech-grid-card">
        {techList.map((tech) => (
          <div
            key={tech.id}
            className="tech-card"
          >
            <img src={tech.image} alt={tech.title} className="tech-image" />
            <div className="tech-content">
              <h3>{tech.title}</h3>
              <p>{tech.description}</p>
              <p><b>Technologies we use:</b></p>
              <ul>
                {tech.technologies.map(eachTech => (<li>{eachTech}</li>))}
              </ul>
            </div>
          </div>
        ))}
      </div>
        <FAQ/>
      <Footer/>
    </section>
  );
};

export default TechnologyDetails;
