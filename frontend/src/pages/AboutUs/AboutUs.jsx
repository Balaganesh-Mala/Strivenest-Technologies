import { useEffect, useState, useRef } from "react";
import "./AboutUs.css";

const AboutUs = () => {
  const aboutRef = useRef(null);
  const hasAnimated = useRef(false);
  const [counts, setCounts] = useState({
    satisfaction: 0,
    projects: 0,
    delivery: 0,
  });

  useEffect(() => {
    if (!aboutRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          startCountUp();
          observer.unobserve(aboutRef.current);
        }
      },
      {
        threshold: 0.45,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(aboutRef.current);

    return () => {
      if (aboutRef.current) observer.unobserve(aboutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startCountUp = () => {
    const duration = 1800; // total animation time in ms
    const start = performance.now();

    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);

      // easing (easeOutCubic)
      const eased = 1 - Math.pow(1 - progress, 3);

      const satisfactionTarget = 100;
      const projectsTarget = 60;
      const deliveryTarget = 2; // months

      setCounts({
        satisfaction: Math.floor(eased * satisfactionTarget),
        projects: Math.floor(eased * projectsTarget),
        delivery: Math.floor(eased * deliveryTarget),
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // ensure final values
        setCounts({
          satisfaction: satisfactionTarget,
          projects: projectsTarget,
          delivery: deliveryTarget,
        });
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <section id="about" className="about-section" ref={aboutRef}>
      <div className="about-container">
        <div className="about-image">
          <img
            src="https://ik.imagekit.io/iiz6sw7ik/creative-people-working-office.jpg"
            alt="about us image"
          />
        </div>

        <div className="about-info">
          <h2 className="about-title">About Us</h2>
          <h3 className="highlight">
            Empowering Your Digital Future with Innovative Solutions
          </h3>

          <p className="about-description">
            Our commitment to innovation, collaboration, and customer success
            drives everything we do. With a focus on staying at the forefront of
            digital trends, we continuously enhance our services to offer the
            best possible solutions for our clients. Whether you’re a startup, a
            small business, or a large enterprise, Strivenest Technologies is
            your go-to partner for digital transformation.
          </p>

          <div className="about-stats">
            <div className="stat-box">
              <h5 className="stat-number">{counts.satisfaction}%</h5>
              <p>Customer Satisfaction</p>
            </div>

            <div className="stat-box">
              <h5 className="stat-number">{counts.projects}+</h5>
              <p>Projects Completed</p>
            </div>

            <div className="stat-box">
              <h5 className="stat-number">{counts.delivery} Months</h5>
              <p>Average Delivery Time</p>
            </div>
          </div>

          
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
