import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer.jsx";
import FAQ from "../FAQ/FAQ.jsx";
import "./ServiceDetails.css";

const serviceData = {
  web: {
    title: "Web Development",
    banner:
      "https://ik.imagekit.io/izqq5ffwt/Pink%20and%20Purple%20Gradient%20Technology%20Business%20LinkedIn%20Banner%20(1).png",
    content: {
      overview:
        "At Strivenest Technologies, we craft dynamic, scalable, and visually captivating websites that serve as the foundation of your brand’s online presence. Our web development process merges design excellence with robust functionality to deliver engaging digital experiences that drive measurable business growth.",
      howWeWork:
        "We follow a structured, client-focused workflow — beginning with comprehensive requirement analysis, followed by wireframing, UI/UX design, backend integration, and rigorous testing. Each project is strategically aligned with your business goals to ensure a seamless user journey and optimal performance across devices.",
      benefits:
        "Our websites are responsive, SEO-optimized, and built with future scalability in mind. We prioritize speed, accessibility, and data security to provide users with a frictionless browsing experience. From startups to enterprises, our web solutions are designed to strengthen credibility, boost conversions, and ensure long-term success.",
      process:
        "Using the latest web technologies such as HTML5, CSS3, JavaScript, React.js, Node.js, Express, and PHP frameworks, we build websites that are both modern and efficient. We also specialize in CMS integration (WordPress, Strapi, Shopify, etc.), API connectivity, and cloud deployment to make your website dynamic, secure, and easily manageable.",
      additionalDetails:
        "Beyond development, our team focuses on website maintenance, performance optimization, and analytics integration. We ensure your digital presence stays up-to-date with the latest design trends, SEO practices, and security protocols. Our post-launch support guarantees that your site continues to evolve alongside your business needs.",
      futureVision:
        "As digital ecosystems evolve, Strivenest Technologies continues to innovate with AI-driven personalization, voice-enabled interfaces, and smart automation tools. Our goal is to deliver web solutions that adapt to user behavior, ensuring your business remains competitive and future-ready in an ever-changing digital landscape.",
      highlights: [
        "Custom Website Design & Development",
        "E-commerce Platform Solutions",
        "Corporate & Business Websites",
        "CMS Integration (WordPress, Strapi, etc.)",
        "Full-Stack Web Applications",
        "Responsive UI/UX Design",
        "SEO & Performance Optimization",
        "API & Cloud Integrations",
        "Maintenance & Post-Launch Support",
      ],
    },
  },

  app: {
    title: "App Development",
    banner:
      "https://ik.imagekit.io/izqq5ffwt/Pink%20and%20Purple%20Gradient%20Technology%20Business%20LinkedIn%20Banner%20(1).png",
    content: {
      overview:
        "We design and develop mobile applications that offer seamless functionality, attractive interfaces, and excellent performance. Our goal is to create apps that users love to interact with.",
      howWeWork:
        "Our app development team focuses on understanding your brand, audience, and business objectives. We use agile methodologies to ensure fast delivery and smooth iterations.",
      benefits:
        "We deliver cross-platform apps using React Native and Flutter, ensuring efficient performance, quick updates, and cost-effectiveness. Our apps are designed for scalability and long-term growth.",
      process:
        "From concept to deployment, we manage every stage — including UI/UX design, backend integration, testing, and publishing on app stores.",
      futureVision:
        "We’re constantly exploring new possibilities with AR/VR, AI-driven features, and IoT-enabled applications that redefine user engagement.",
      highlights: [
        "Native & Cross-platform Apps",
        "High Performance & Security",
        "User-Centric Design",
        "App Store Optimization",
        "Post-Launch Support",
      ],
    },
  },
  cloud: {
    title: "Cloud Services",
    banner:
      "https://ik.imagekit.io/izqq5ffwt/Pink%20and%20Purple%20Gradient%20Technology%20Business%20LinkedIn%20Banner%20(1).png",
    content: {
      overview:
        "At Strivenest Technologies, our cloud services empower businesses to operate with agility, scalability, and enhanced efficiency. We help organizations migrate, manage, and optimize their digital infrastructure using top-tier cloud technologies.",
      howWeWork:
        "We begin by analyzing your current systems, business requirements, and long-term goals. Our experts design a custom cloud architecture and handle secure migration, deployment, and ongoing maintenance to ensure seamless integration.",
      benefits:
        "Cloud computing minimizes IT costs, enhances collaboration, and ensures data accessibility from anywhere. Our cloud solutions improve scalability, reduce downtime, and deliver enterprise-level security for your business operations.",
      process:
        "We provide end-to-end cloud solutions — including infrastructure setup, data migration, automation, and monitoring. Our certified professionals work with AWS, Google Cloud, and Microsoft Azure to deliver tailored cloud experiences.",
      futureVision:
        "As cloud technology evolves, we focus on integrating AI, automation, and edge computing to help businesses harness the full potential of intelligent and distributed cloud ecosystems.",
      highlights: [
        "Cloud Migration & Deployment",
        "Infrastructure Management",
        "Data Storage & Security",
        "Serverless & Scalable Architecture",
        "24/7 Monitoring & Support",
      ],
    },
  },
  branding: {
    title: "Logo & Branding",
    banner:
      "https://ik.imagekit.io/izqq5ffwt/Pink%20and%20Purple%20Gradient%20Technology%20Business%20LinkedIn%20Banner%20(1).png",
    content: {
      overview:
        "At Strivenest Technologies, we help businesses establish a strong visual identity through creative logo design and comprehensive branding strategies. Our goal is to make your brand memorable, recognizable, and consistent across all touchpoints.",
      howWeWork:
        "We start by understanding your company’s mission, target audience, and values. Our design team then crafts a unique visual identity that communicates your story — including logos, color palettes, typography, and brand guidelines.",
      benefits:
        "A well-designed brand identity builds trust, strengthens customer loyalty, and sets you apart from competitors. We ensure every element of your branding reflects your professionalism and brand personality.",
      process:
        "Our process includes research, concept development, sketching, digital design, revisions, and delivery of final assets in all required formats. We also provide complete brand kits and templates for consistent future use.",
      futureVision:
        "As branding evolves in the digital era, we focus on creating adaptable identities that perform well across social media, web platforms, and emerging technologies to keep your brand relevant and impactful.",
      highlights: [
        "Custom Logo Design",
        "Brand Identity Development",
        "Typography & Color Systems",
        "Business Cards & Stationery",
        "Comprehensive Brand Guidelines",
      ],
    },
  },

  marketing: {
    title: "Digital Marketing",
    banner:
      "https://ik.imagekit.io/izqq5ffwt/Pink%20and%20Purple%20Gradient%20Technology%20Business%20LinkedIn%20Banner%20(1).png",
    content: {
      overview:
        "Our digital marketing solutions empower brands to enhance visibility, engage audiences, and drive meaningful results through data-driven strategies.",
      howWeWork:
        "We combine creativity, analytics, and the latest marketing tools to develop personalized campaigns across search, social, and content platforms.",
      benefits:
        "Our team ensures consistent branding, measurable ROI, and sustained digital growth. We help your business connect authentically with your audience.",
      process:
        "We provide a full suite of marketing services — SEO, SEM, SMM, PPC, and email campaigns — optimized for conversion and long-term engagement.",
      futureVision:
        "With AI and automation reshaping the digital landscape, we continue to innovate marketing strategies that keep you ahead of trends.",
      highlights: [
        "SEO & SEM Services",
        "Social Media Campaigns",
        "Lead Generation",
        "Content & Email Marketing",
        "Analytics & Reporting",
      ],
    },
  },
};

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const service = serviceData[serviceId];

  if (!service) {
    return (
      <div className="service-not-found">
        <h2>Service Not Found</h2>
        <p>The requested service does not exist.</p>
        <button onClick={() => navigate("/services")}>Back to Services</button>
      </div>
    );
  }

  return (
    <section className="service-details">
      <div className="service-banner">
        <img
          src={service.banner}
          alt={service.title}
          className="service-banner-img"
        />
        <div className="service-banner-content">
          <h1>{service.title}</h1>
          <p>{service.content.overview}</p>
        </div>
      </div>

      <div className="service-detail-container">
        <div className="service-section">
          <h2>Overview</h2>
          <p>{service.content.overview}</p>
        </div>

        <div className="service-section">
          <h2>How We Work</h2>
          <p>{service.content.howWeWork}</p>
        </div>

        <div className="service-section">
          <h2>Benefits</h2>
          <p>{service.content.benefits}</p>
        </div>

        <div className="service-section">
          <h2>Our Process</h2>
          <p>{service.content.process}</p>
        </div>

        <div className="service-section">
          <h2>Future Vision</h2>
          <p>{service.content.futureVision}</p>
        </div>

        <div className="service-section">
          <h2>Key Highlights</h2>
          <ul className="service-list">
            {service.content.highlights.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <FAQ />
      <Footer />
    </section>
  );
};

export default ServiceDetails;
