import React, { useEffect, useState } from "react";
import "./Home.css";
import QuoteForm from "../../components/QuoteForm/QuoteForm";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const Home = () => {
  const titles = ["App Development", "Web Development", "Cloud Services", "Marketing"];
  const [currentTitle, setCurrentTitle] = useState(0);
  const [showQuote, setShowQuote] = useState(false);

  // Change title every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Show quote form after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowQuote(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="home-section" id="home">
      <div className="home-container">
        {/* Text Section */}
        <div className="home-text">
          <h1 className="home-heading">
            Best{" "}
            <span key={titles[currentTitle]} className="changing-text">
              {titles[currentTitle]}
            </span>
            <br />
            Company in Anantapur
          </h1>

          <p className="home-description">
            We specialize in creating and enhancing user experience through the
            design and development of mobile and web applications. Our focus is
            on helping businesses expand and reach their customer base by
            collaborating with individuals and organizations to conceptualize
            and promote their products.
          </p>

          <div className="social-icons">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedin /></a>
            <a href="#"><FaYoutube /></a>
          </div>

          <button className="blue-btn" onClick={() => setShowQuote(true)}>
            Get a Free Quote
          </button>
        </div>

        {/* Media Section */}
        <div className="home-media">
          <img
            src="https://ik.imagekit.io/izqq5ffwt/logo12.png"
            alt="Left visual"
            className="side-img left-img"
          />

          <div className="phone-wrapper">
            <video
              className="video-content"
              src="https://ik.imagekit.io/izqq5ffwt/WhatsApp%20Video%202025-10-28%20at%2022.10.19_15489131.mp4"
              autoPlay
              loop
              muted
              playsInline
            ></video>
            <img
              src="https://ik.imagekit.io/izqq5ffwt/_Pngtree_blank%20smartphone%20screen%20template_20714056.png?updatedAt=1761795602256"
              alt="Phone Frame"
              className="phone-frame"
            />
          </div>

          <img
            src="https://ik.imagekit.io/izqq5ffwt/logo23.png"
            alt="Right visual"
            className="side-img right-img"
          />
        </div>
      </div>

      {/* Quote Form Popup */}
      {showQuote && <QuoteForm setShowQuote={setShowQuote} />}
    </section>
  );
};

export default Home;
