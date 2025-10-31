import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import "./FAQ.css";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
  {
    question: "What services does Strivenest Technologies offer?",
    answer:
      "Strivenest Technologies provides a wide range of IT services including Web Development, Mobile App Development, Cloud Solutions, Digital Marketing, Branding, and AI-based automation solutions. We help businesses grow with modern and scalable digital products.",
  },
  {
    question: "What technologies does your team specialize in?",
    answer:
      "Our team works with the latest and most in-demand technologies such as React.js, Node.js, Python, JavaScript, Flutter, React Native, MongoDB, MySQL, and cloud platforms like AWS, Google Cloud, and Docker.",
  },
  {
    question: "How does Strivenest Technologies ensure quality in its projects?",
    answer:
      "We follow a strict quality assurance process that includes detailed testing, code reviews, and performance checks. Every project undergoes multiple review phases to ensure it meets our high standards of quality and reliability.",
  },
  {
    question: "Can Strivenest Technologies handle both small and large-scale projects?",
    answer:
      "Yes, our team is experienced in managing projects of all sizes — from small business websites to enterprise-grade applications. We provide flexible solutions tailored to your project’s scope and goals.",
  },
  {
    question: "How do you ensure data security and privacy?",
    answer:
      "We prioritize data protection through secure hosting, encrypted communications, and regular audits. Our systems follow best practices in cybersecurity to ensure your business data remains safe and confidential.",
  },
  {
    question: "What industries do you serve?",
    answer:
      "We serve a wide range of industries, including e-commerce, healthcare, finance, education, logistics, and more. Each project is customized to meet the unique needs and challenges of that specific industry.",
  },
  {
    question: "What makes Strivenest Technologies stand out from other IT service providers?",
    answer:
      "Our focus on innovation, transparency, and client satisfaction sets us apart. We combine technical expertise with creative thinking to deliver long-term, impactful solutions for our clients.",
  },
  {
    question: "What is your project development process?",
    answer:
      "Our process includes Requirement Analysis, UI/UX Design, Development, Testing, Deployment, and Post-launch Support. Each stage is handled with precision to ensure a smooth and successful delivery.",
  },
  {
    question: "How do you ensure customer satisfaction?",
    answer:
      "We maintain continuous communication with clients throughout the project, provide regular updates, and ensure all deliverables meet their expectations. Our support continues even after project completion.",
  },
  {
    question: "What is the pricing structure for your services?",
    answer:
      "Our pricing is flexible and depends on the project’s size, complexity, and timeline. We offer both fixed-cost and hourly engagement models to suit the client’s budget and requirements.",
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
