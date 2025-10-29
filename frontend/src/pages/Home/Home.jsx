import React, { useEffect, useState } from "react";
import "./Home.css";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const Home = () => {
  const titles = [
    "App Development",
    "Web Development",
    "Cloud Services",
    "Marketing",
  ];
  const [currentTitle, setCurrentTitle] = useState(0);
  const [showQuote, setShowQuote] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle((prev) => (prev + 1) % titles.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowQuote(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <section className="home-section" id="home">
        <div className="home-container">
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
              We specialize in creating and enhancing user experience through
              the design and development of mobile and web applications. Our
              focus is on helping businesses expand and reach their customer
              base by collaborating with individuals and organizations to
              conceptualize and promote their products.
            </p>

            <div className="social-icons">
              <a href="#">
                <FaFacebook />
              </a>
              <a href="#">
                <FaInstagram />
              </a>
              <a href="#">
                <FaLinkedin />
              </a>
              <a href="#">
                <FaYoutube />
              </a>
            </div>

            <button className="blue-btn" onClick={() => setShowQuote(true)}>
              Get a Free Quote
            </button>
          </div>

          <div className="home-media">
            <img
              src="https://ik.imagekit.io/izqq5ffwt/logo12.png"
              alt="Left visual"
              className="side-img left-img"
            />
            <video
              className="center-video"
              src="https://ik.imagekit.io/izqq5ffwt/WhatsApp%20Video%202025-10-28%20at%2022.10.19_15489131.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
            <img
              src="https://ik.imagekit.io/izqq5ffwt/logo23.png"
              alt="Right visual"
              className="side-img right-img"
            />
          </div>
        </div>
      </section>

      {showQuote && (
        <>
          <div
            className="quote-overlay"
            onClick={() => setShowQuote(false)}
          ></div>
          <div className="quote-form-container">
            <button className="close-btn" onClick={() => setShowQuote(false)}>
              <IoClose />
            </button>
            <h2>Get a Free Quote</h2>
            <form className="quote-form">
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <input type="text" placeholder="Your Project Type" required />
              <textarea
                placeholder="Tell us about your project..."
                rows="4"
                required
              ></textarea>
              <button type="submit" className="blue-btn">
                Submit
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
