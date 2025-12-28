import { useEffect, useRef, useState } from "react";

export default function Services() {
  const sectionRef = useRef(null);
  const [activeCard, setActiveCard] = useState(0);
  const [animate, setAnimate] = useState(false);

  /* ===== Scroll animation ===== */
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        setAnimate(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
  {
    title: "App Development",
    bg: "#3c32aa",
    text: "text-white",
    content:
      "Strivenest Technologies delivers high-performance mobile applications for Android, iOS, and cross-platform platforms using React Native and Flutter. We design secure, scalable, and user-friendly apps that enhance customer engagement and drive real business growth. From idea validation to app store deployment, our team builds reliable mobile solutions tailored for startups, SMEs, and enterprises in Anantapur and beyond.",
  },
  {
    title: "Web Development",
    bg: "#fdf2bc",
    text: "text-slate-800",
    content:
      "We create modern, responsive, and SEO-optimized websites that strengthen your digital presence. Our web development services include business websites, e-commerce platforms, dashboards, and custom web applications built with React.js, Node.js, and Python. With a strong focus on performance, security, and scalability, we help businesses convert visitors into customers through clean design and robust technology.",
  },
  {
    title: "Cloud Services",
    bg: "#c6e3ff",
    text: "text-slate-800",
    content:
      "Our cloud solutions help businesses modernize infrastructure, reduce costs, and scale with confidence. We specialize in AWS, Google Cloud, Azure, and Docker to deliver secure hosting, cloud migration, DevOps automation, and high-availability architectures. Strivenest Technologies enables startups and enterprises in Anantapur to adopt cloud-native solutions that improve agility and long-term performance.",
  },
  {
    title: "Marketing",
    bg: "#f97433",
    text: "text-white",
    content:
      "Strivenest Technologies offers result-driven digital marketing strategies designed to increase visibility, engagement, and conversions. Our services include SEO, Google Ads, social media marketing, content strategy, and brand positioning. By combining data-driven insights with creative execution, we help businesses build a strong online identity and achieve measurable ROI in competitive digital markets.",
  },
];


  return (
    <section
      ref={sectionRef}
      id="services"
      className="w-full py-16 px-4 overflow-hidden"
    >
      {/* ===== TITLES ===== */}
      <div className="relative text-center mb-14 h-20">
        <h2
          className={`absolute left-[42%] -translate-x-1/2 text-3xl md:text-5xl font-bold text-indigo-600 transition-all duration-1000
            ${
              animate
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-[900px]"
            }
          `}
        >
          Services
        </h2>

        <h2
          className={`absolute left-[40%] -translate-x-1/2 text-3xl md:text-5xl font-bold text-slate-700 transition-all duration-1000 mt-12
            ${
              animate
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-[900px]"
            }
          `}
        >
          We Provide
        </h2>
      </div>

      {/* ===== SERVICE CARDS ===== */}
      <div className="max-w-6xl mx-auto flex flex-col gap-[2px]">
        {services.map((service, index) => {
          const isActive = activeCard === index;

          return (
            <div
              key={index}
              onMouseEnter={() => setActiveCard(index)}
              className={`
                relative overflow-hidden cursor-pointer
                transition-all duration-500
                ${isActive ? "py-8 md:py-10" : "h-[64px]"}
              `}
              style={{ backgroundColor: service.bg }}
            >
              {/* Hover lift */}
              <div
                className={`
                  px-6 md:px-12 transition-all duration-500
                  ${isActive ? "scale-[1.02]" : ""}
                  
                `}
              >
                {/* Title */}
                <h3
                  className={`text-xl md:text-2xl font-bold mb-2 ${service.text}`}
                >
                  {service.title}
                </h3>

                {/* Content */}
                {isActive && (
                  <p
                    className={`text-sm md:text-base leading-relaxed mt-3 ${service.text}`}
                  >
                    {service.content}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
