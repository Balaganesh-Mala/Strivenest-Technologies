import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import "./FAQ.css";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What services does Strivenest provide?",
      answer:
        "Strivenest offers web and mobile app development, AI-based solutions, and digital marketing strategies designed to accelerate digital transformation for businesses.",
    },
    {
      question: "How can I request a project quote?",
      answer:
        "You can request a quote by clicking the 'Get Quote' button on the homepage or by reaching out via our contact form.",
    },
    {
      question: "Do you offer custom software solutions?",
      answer:
        "Yes, we specialize in building tailor-made software solutions based on your unique business requirements.",
    },
    {
      question: "What technologies does your team work with?",
      answer:
        "Our team works with modern tech stacks including React, Node.js, Python, MongoDB, Flutter, and AI frameworks.",
    },
    {
      question: "Do you provide maintenance and support?",
      answer:
        "Yes, we provide post-launch support, performance monitoring, and regular updates to ensure smooth operation.",
    },
    {
      question: "Can you redesign my existing website?",
      answer:
        "Absolutely! We offer complete website redesign services to improve design, performance, and user experience.",
    },
    {
      question: "How long does a typical project take?",
      answer:
        "Timelines vary depending on complexity. Most small to mid-sized projects are completed within 4–8 weeks.",
    },
    {
      question: "Do you work with startups and small businesses?",
      answer:
        "Yes, we work with startups, small businesses, and large enterprises alike, providing scalable and cost-effective solutions.",
    },
    {
      question: "Where is your team located?",
      answer:
        "Our core team operates remotely, allowing us to collaborate with clients across different countries and time zones.",
    },
    {
      question: "How can I contact your support team?",
      answer:
        "You can contact us via email, our website’s contact form, or directly through our WhatsApp support button.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions</h2>

      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-card ${activeIndex === index ? "active" : ""}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              <h3>{faq.question}</h3>
              <FaChevronDown
                className={`faq-icon ${activeIndex === index ? "rotate" : ""}`}
              />
            </div>

            <div
              className="faq-answer"
              style={{
                maxHeight: activeIndex === index ? "200px" : "0",
              }}
            >
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
