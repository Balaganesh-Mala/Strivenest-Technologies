import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import FAQ from "../FAQ/FAQ.jsx";


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
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="bg-white p-8 rounded-2xl shadow max-w-md text-center">
          <h2 className="text-2xl font-semibold text-slate-800 mb-2">
            Service Not Found
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            The requested service does not exist.
          </p>
          <button
            onClick={() => navigate("/services")}
            className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-white">
      {/* ================= HERO / BANNER ================= */}
      <div className="relative h-[320px] md:h-[420px]">
        <img
          src={service.banner}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-6xl mx-auto px-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {service.title}
            </h1>
            <p className="max-w-2xl text-sm md:text-base text-gray-200 leading-relaxed">
              {service.content.overview}
            </p>
          </div>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="max-w-6xl mx-auto px-6 py-14 space-y-14">
        {/* SECTION */}
        <Section title="How We Work">
          {service.content.howWeWork}
        </Section>

        <Section title="Benefits">
          {service.content.benefits}
        </Section>

        <Section title="Our Process">
          {service.content.process}
        </Section>

        <Section title="Future Vision">
          {service.content.futureVision}
        </Section>

        {/* HIGHLIGHTS */}
        <div>
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">
            Key Highlights
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.content.highlights.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border hover:bg-slate-100 transition"
              >
                <span className="h-2 w-2 rounded-full bg-indigo-600" />
                <p className="text-sm text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <FAQ />

      
    </section>
  );
};

/* ================= REUSABLE SECTION ================= */
function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-slate-800 mb-4">
        {title}
      </h2>
      <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-4xl">
        {children}
      </p>
    </div>
  );
}

export default ServiceDetails;
