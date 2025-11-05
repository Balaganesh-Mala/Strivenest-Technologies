import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import techData from "../../data/techData.js";
import "./TechnologyDetails.css";

const TechnologyDetails = () => {
  const { techId } = useParams();
  const navigate = useNavigate();

  const tech = techData[techId];

  if (!tech) {
    return (
      <div className="tech-not-found">
        <h2>Technology Not Found</h2>
        <p>The requested technology does not exist.</p>
        <button onClick={() => navigate("/technology")}>Back to Technologies</button>
      </div>
    );
  }

  return (
    <section className="technology-details">
      <div className="tech-banner">
        {tech.banner && <img src={tech.banner} alt={tech.title} className="tech-banner-img" />}
        <div className="tech-banner-content">
          <h1>{tech.title}</h1>
          <p>{tech.content.overview}</p>
        </div>
      </div>

      <div className="tech-detail-container">
        <div className="tech-section">
          <h2>Overview</h2>
          <p>{tech.content.overview}</p>
        </div>

        <div className="tech-section">
          <h2>How We Use It</h2>
          <p>{tech.content.howWeUse}</p>
        </div>

        <div className="tech-section">
          <h2>Benefits</h2>
          <p>{tech.content.benefits}</p>
        </div>

        <div className="tech-section">
          <h2>Use Cases</h2>
          <p>{tech.content.useCases}</p>
        </div>

        <div className="tech-section">
          <h2>Future Scope</h2>
          <p>{tech.content.futureScope}</p>
        </div>

        <div className="tech-section">
          <h2>Technologies We Use</h2>
          <ul className="tech-list">
            {tech.technologies.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TechnologyDetails;
