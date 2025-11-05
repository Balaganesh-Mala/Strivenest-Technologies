const techData = {
  android: {
    title: "Android Development",
    banner: "https://ik.imagekit.io/izqq5ffwt/Pink%20and%20Purple%20Gradient%20Technology%20Business%20LinkedIn%20Banner%20(2).png",
    content: {
      overview:
        "React Native is a powerful open-source framework developed by Meta that allows developers to build truly native mobile applications for both Android and iOS using a single JavaScript codebase. At our company, we harness React Native to create high-performance, cost-effective, and feature-rich mobile solutions that feel just like fully native apps. This cross-platform capability enables faster development cycles, consistent UI across platforms, and seamless scalability — making it a preferred choice for startups and enterprises alike.",
      howWeUse:
        "Our development process with React Native begins with a deep understanding of your business goals and user needs. We architect applications using modular components, ensuring code reusability and maintainability. Leveraging libraries like React Navigation, Redux, and Axios, we build efficient data flows and smooth user interactions. We integrate native modules when necessary for features like push notifications, geolocation, or camera functionality, ensuring top-tier performance. Our apps are built with responsive UI/UX using React Native Paper, styled-components, and TypeScript, all optimized for speed and minimal load times.",
      benefits:
        "React Native offers the advantage of writing once and deploying everywhere — dramatically reducing development time and cost. Its live reload and fast refresh features enhance the development workflow, while strong community support ensures constant innovation. Businesses benefit from native-level performance, quick updates, and a consistent user experience on both iOS and Android. With React Native, we deliver apps that are flexible, secure, and easily scalable to millions of users.",
      useCases:
        "We use React Native to build cross-platform applications for eCommerce, finance, social media, healthcare, and education industries. Whether it’s an interactive chat app, on-demand service platform, fitness tracker, or content streaming solution, React Native enables us to combine native power with web flexibility. Our clients rely on these apps for consistent brand experiences and faster go-to-market execution.",
      futureScope:
        "React Native continues to evolve rapidly with the introduction of new architecture (Fabric), TurboModules, and direct integration with React Server Components. The framework’s future promises even closer parity with native APIs, enhanced performance, and smoother animations through libraries like Reanimated and Gesture Handler. As cross-platform development grows, React Native will remain one of the most efficient and future-ready solutions for mobile app development.",
    },
    technologies: ["Kotlin", "Java", "Firebase", "Jetpack Compose"],
  },

  ios: {
    title: "iOS Development",
    banner: "",
    content: {
      overview:
        "iOS development focuses on building high-performance, secure, and visually refined mobile applications for Apple devices, including iPhone, iPad, and Apple Watch. At our company, we craft seamless digital experiences that reflect Apple's commitment to quality, innovation, and reliability. Our iOS solutions combine sleek design with cutting-edge functionality to meet the needs of businesses aiming for excellence in user engagement and brand presence.",

      howWeUse:
        "Our iOS development team specializes in creating robust native applications using Swift and SwiftUI, adhering to Apple’s Human Interface Guidelines for consistency and user delight. We follow clean architecture patterns such as MVVM and VIPER for better scalability and maintenance. With deep integration into Apple’s ecosystem — including CloudKit, Core Data, and HealthKit — we ensure each app takes full advantage of iOS capabilities. From seamless animations to secure API communications and App Store optimization, we handle every stage of development with precision.",

      benefits:
        "Developing with iOS offers unmatched performance, strong privacy protection, and an audience known for high engagement and loyalty. Businesses benefit from a stable and secure platform, faster monetization opportunities through the App Store, and better brand perception among premium users. Additionally, iOS apps provide consistent updates, enhanced device compatibility, and long-term software support.",

      useCases:
        "We deliver iOS applications across industries such as retail, fintech, healthcare, entertainment, and enterprise automation. From on-demand service platforms and secure payment apps to AR-driven retail experiences and productivity tools, our iOS solutions empower businesses to connect with users in meaningful, data-driven ways. We also integrate with wearables and IoT devices for smart, connected experiences.",

      futureScope:
        "The future of iOS development is marked by advancements in artificial intelligence, augmented reality, and spatial computing with the Apple Vision Pro. Features like SwiftData, Core ML, and ARKit are redefining app capabilities — enabling personalized, immersive, and intelligent user experiences. As Apple continues to expand its ecosystem, iOS apps will play an even more central role in the connected digital lifestyle.",
    },
    technologies: [
      "Swift",
      "SwiftUI",
      "Xcode",
      "Core Data",
      "CloudKit",
      "ARKit",
      "Core ML",
    ],
  },

  reactnative: {
    title: "React Native Development",
    banner: "",
    content: {
      overview:
        "React Native is a powerful open-source framework developed by Meta that allows developers to build truly native mobile applications for both Android and iOS using a single JavaScript codebase. Our team harnesses React Native to deliver high-performance, cost-efficient, and scalable mobile apps that provide a smooth and consistent user experience across all devices.",

      howWeUse:
        "We utilize React Native to architect cross-platform applications that combine native capabilities with web flexibility. Using advanced tools such as Redux for state management, React Navigation for smooth transitions, and Axios for efficient data handling, we ensure optimal app performance. We also integrate native modules for deeper functionality, such as camera access, geolocation, and push notifications. Our design approach includes responsive layouts, adaptive themes, and accessibility compliance — ensuring each app feels uniquely crafted for its platform.",

      benefits:
        "React Native allows faster development and deployment by sharing up to 90% of code across Android and iOS platforms. Businesses gain the advantage of reduced costs, quicker updates, and native-like performance. It also offers real-time reloading, easy integration with backend services, and an active global community that continuously evolves the framework. This ensures long-term sustainability and support for enterprise-grade applications.",

      useCases:
        "React Native is ideal for building dynamic and interactive applications, such as social media platforms, eCommerce apps, fitness and wellness apps, on-demand service platforms, and business productivity tools. Its flexibility also makes it perfect for startups and enterprises seeking to quickly validate and scale mobile products without sacrificing performance or user experience.",

      futureScope:
        "The future of React Native looks bright with advancements in Fabric architecture, TurboModules, and direct integration with React Server Components. These innovations promise enhanced rendering performance, improved startup times, and more efficient native bridging. With growing support for AR, ML, and IoT integrations, React Native will continue to dominate the cross-platform mobile development ecosystem.",
    },
    technologies: [
      "JavaScript",
      "TypeScript",
      "React",
      "Redux",
      "React Navigation",
      "Expo",
      "Axios",
      "Firebase",
      "Reanimated",
      "Native Modules",
    ],
  },

  flutter: {
    title: "Flutter Development",
    banner: "",
    content: {
      overview:
        "Flutter is Google’s revolutionary open-source UI toolkit that enables developers to create natively compiled applications for mobile, web, and desktop — all from a single codebase. At our company, we leverage Flutter to deliver visually stunning, high-performance apps that offer smooth animations, responsive layouts, and seamless experiences across every platform.",

      howWeUse:
        "Our Flutter development process is built on precision and efficiency. We use the Dart programming language to craft modular, scalable, and maintainable applications. By implementing state management solutions like Bloc and Riverpod, we ensure predictable data flow and smooth user interaction. We also integrate Firebase for authentication, cloud storage, and real-time updates, while customizing UI elements with Flutter’s extensive widget library to achieve pixel-perfect designs. Each app we create undergoes rigorous testing and optimization for both Android and iOS platforms.",

      benefits:
        "Flutter allows us to develop and deploy applications faster by sharing a single codebase across multiple platforms. Its hot reload feature dramatically accelerates development time, enabling instant previews and quick iterations. The framework provides near-native performance, expressive UIs, and consistent designs — ensuring high user satisfaction. Additionally, Flutter’s active community and frequent updates from Google guarantee long-term stability and innovation.",

      useCases:
        "Flutter is ideal for startups and enterprises looking to launch cross-platform apps quickly without compromising performance or design. We use it to build eCommerce platforms, fintech solutions, healthcare management systems, social media apps, and education tools. Its adaptability also makes it a strong choice for developing MVPs (Minimum Viable Products) that require rapid prototyping and scalability for future growth.",

      futureScope:
        "Flutter’s future is exceptionally promising as it expands beyond mobile into web, desktop, and embedded systems. With the introduction of Flutter 3 and advancements in Impeller (its new rendering engine), the framework now supports richer animations, faster rendering, and enhanced stability. As the ecosystem grows, Flutter is positioned to become the go-to technology for unified, cross-platform product development across mobile, web, and desktop environments.",
    },
    technologies: [
      "Dart",
      "Bloc",
      "Riverpod",
      "Firebase",
      "GetX",
      "Flutter SDK",
      "Material Design",
      "Cupertino Widgets",
    ],
  },

  html: {
    title: "HTML Development",
    banner: "",
    content: {
      overview:
        "HTML (HyperText Markup Language) is the backbone of all web development — defining the structure, layout, and accessibility of every website and web application. It provides the semantic foundation that ensures consistent rendering across browsers and devices. At our company, we leverage the full potential of modern HTML5 to create structured, accessible, and high-performing digital experiences.",

      howWeUse:
        "We utilize semantic HTML5 to create well-organized and standards-compliant web pages that enhance search engine optimization (SEO) and improve accessibility for all users. Our development process includes proper use of elements such as headers, sections, articles, and landmarks to ensure clear document hierarchy. We also integrate ARIA roles and metadata to improve usability and screen reader compatibility. Combined with CSS and JavaScript, our HTML structures serve as the base for responsive, dynamic, and visually appealing interfaces.",

      benefits:
        "Using HTML5 ensures long-term compatibility, enhanced performance, and a clean foundation for future scalability. It supports multimedia integration without external plugins, improves page load speed, and boosts SEO through semantic markup. Businesses benefit from improved accessibility, faster rendering, and maintainable code that adapts easily to design and functional updates.",

      useCases:
        "HTML is essential in every digital project — from static websites and landing pages to complex web portals, eCommerce platforms, and single-page applications. We use HTML5 to create lightweight, fast-loading, and SEO-optimized pages that deliver exceptional user experiences across all browsers and screen sizes.",

      futureScope:
        "HTML continues to evolve with new capabilities that enhance web interactivity, accessibility, and integration with emerging technologies like Web Components and Progressive Web Apps. As the foundation of the web, HTML5 will remain indispensable for building fast, reliable, and user-friendly digital products that adapt to the ever-changing web ecosystem.",
    },
    technologies: [
      "HTML5",
      "Semantic Tags",
      "Accessibility (ARIA)",
      "Responsive Layouts",
      "SEO Optimization",
    ],
  },

  css: {
    title: "CSS Development",
    banner: "",
    content: {
      overview:
        "CSS (Cascading Style Sheets) is the design language that brings structure to life on the web. It defines how content is presented — controlling layout, colors, typography, and responsiveness. At our company, we use advanced CSS techniques to craft visually engaging, user-friendly interfaces that reinforce brand identity and enhance overall user experience.",

      howWeUse:
        "We leverage modern CSS3 capabilities such as Flexbox, Grid, and animations to build responsive and dynamic layouts that adapt seamlessly across all devices. Our team also utilizes preprocessors like SASS and PostCSS for modular, maintainable, and scalable styling architecture. We follow a design-first approach, combining CSS frameworks such as Tailwind CSS and Bootstrap to ensure design consistency and faster development. Through custom styling, transitions, and micro-interactions, we create web experiences that are both beautiful and intuitive.",

      benefits:
        "CSS enables complete control over the visual presentation of web content, ensuring consistency, accessibility, and responsiveness. By using reusable components and modern layout systems, we reduce development time while maintaining design flexibility. Businesses benefit from visually appealing websites that load faster, provide superior user experiences, and align perfectly with brand aesthetics.",

      useCases:
        "CSS is essential in designing websites, web applications, and interactive dashboards. We use it for creating custom themes, animations, responsive designs, and front-end user interfaces. From marketing landing pages to complex enterprise applications, CSS ensures each project maintains aesthetic appeal and usability across platforms and screen sizes.",

      futureScope:
        "CSS continues to evolve with new capabilities such as container queries, native nesting, and advanced color functions. These features empower developers to design highly adaptive and accessible interfaces with less code. As design trends move toward minimalism, motion, and accessibility, CSS will remain a central technology driving the visual innovation of the web.",
    },
    technologies: [
      "CSS3",
      "Flexbox",
      "Grid",
      "SASS",
      "Tailwind CSS",
      "Bootstrap",
      "PostCSS",
      "Animations",
      "Responsive Design",
    ],
  },

  javascript: {
    title: "JavaScript Development",
    banner: "",
    content: {
      overview:
        "JavaScript is the cornerstone of modern web development, powering interactivity and dynamic functionality across websites and applications. As a versatile, event-driven programming language, it enables seamless user engagement and real-time communication within digital experiences.",

      howWeUse:
        "We utilize modern JavaScript (ES6+) to craft highly interactive and responsive user interfaces. Our development approach integrates modular architecture, asynchronous programming, and component-based design to ensure scalability and maintainability. We implement JavaScript for DOM manipulation, API integrations, and client-side logic, enhancing performance through efficient event handling and optimized rendering. Our developers also leverage advanced build tools like Webpack, Babel, and Vite to streamline workflow and maximize efficiency.",

      benefits:
        "JavaScript empowers dynamic content, real-time updates, and superior interactivity across all platforms. Its cross-browser compatibility, vast ecosystem, and community-driven innovation make it indispensable for modern digital solutions. With JavaScript, businesses gain faster load times, engaging UI behaviors, and seamless connectivity between frontend and backend systems.",

      useCases:
        "We implement JavaScript in dynamic web applications, SPAs (Single Page Applications), eCommerce portals, dashboards, and interactive corporate websites. It’s also integral in custom client-side scripting, API communication, and data visualization tools that enhance both user experience and performance.",

      futureScope:
        "JavaScript continues to evolve rapidly, with frameworks and libraries like React, Angular, Vue.js, and Next.js shaping the future of web and mobile development. The rise of WebAssembly, serverless architecture, and AI-driven interfaces will further extend JavaScript’s dominance, making it the most essential language for cross-platform digital innovation.",
    },
    technologies: [
      "ES6+",
      "DOM Manipulation",
      "Async/Await",
      "APIs",
      "Webpack",
      "Babel",
      "Vite",
      "Event Handling",
      "Modules",
    ],
  },

  reactjs: {
    title: "React.js Development",
    banner: "",
    content: {
      overview:
        "React.js is a powerful JavaScript library developed by Meta for building dynamic, high-performance, and scalable user interfaces. It follows a component-based architecture, enabling developers to create modular, reusable UI elements that enhance efficiency and maintainability in modern web applications.",

      howWeUse:
        "We leverage React.js to craft highly interactive frontends, SPAs (Single Page Applications), and enterprise-level dashboards. Our team employs React Hooks, Context API, and Redux for efficient state management, ensuring consistent data flow and optimal performance. We also use React Router for smooth navigation and integrate tools like React Query and Axios for real-time API communication. By implementing techniques such as lazy loading, code splitting, and virtual DOM optimization, we ensure seamless performance even in complex applications.",

      benefits:
        "React.js offers exceptional speed, scalability, and reusability through its component-driven approach. It enables faster development cycles, easy maintenance, and compatibility with modern ecosystems like Next.js for server-side rendering. Its vast community and robust library ecosystem make it ideal for businesses seeking reliable, future-ready web solutions.",

      useCases:
        "We use React.js to build responsive SaaS dashboards, eCommerce platforms, CRM systems, and enterprise-grade web applications. It’s also our go-to choice for creating data-driven interfaces, admin panels, and customer portals that demand high interactivity and real-time updates.",

      futureScope:
        "With the introduction of Server Components, Concurrent Rendering, and React’s continued optimization through the new architecture, React.js is shaping the next generation of web experiences. Its adaptability across web, mobile (via React Native), and hybrid ecosystems ensures it will remain a leading technology for frontend innovation.",
    },
    technologies: [
      "Hooks",
      "Redux",
      "Context API",
      "Next.js",
      "React Router",
      "React Query",
      "Axios",
      "JSX",
      "Virtual DOM",
    ],
  },

  nodejs: {
    title: "Node.js Development",
    banner: "",
    content: {
      overview:
        "Node.js is a powerful, event-driven runtime environment that enables JavaScript to run on the server side, allowing developers to build scalable and high-performance backend applications. Its non-blocking I/O model and asynchronous architecture make it ideal for real-time, data-intensive applications across distributed systems.",

      howWeUse:
        "We utilize Node.js to develop robust server-side applications and APIs that power modern web and mobile solutions. Our team leverages frameworks such as Express.js and Nest.js to build RESTful and GraphQL APIs, ensuring high efficiency and maintainability. We integrate real-time communication through Socket.io and manage asynchronous data handling using event streams. Additionally, we optimize applications using clustering, caching strategies, and database integrations with MongoDB, SQL, and Redis to deliver exceptional performance and scalability.",

      benefits:
        "Node.js allows for unified JavaScript development across the entire stack, reducing complexity and improving productivity. Its lightweight and efficient architecture supports thousands of concurrent connections, making it perfect for applications that demand real-time interaction. The vast npm ecosystem further accelerates development with access to thousands of open-source libraries and tools.",

      useCases:
        "We employ Node.js for REST APIs, chat systems, live streaming services, IoT applications, and microservices architectures. It’s also used in building real-time dashboards, backend automation tools, and scalable serverless applications deployed across cloud environments.",

      futureScope:
        "As businesses continue to adopt event-driven and serverless architectures, Node.js remains at the forefront of backend innovation. With continuous updates, integration with TypeScript, and frameworks like Deno and Bun emerging, Node.js will continue to power modern, high-performance applications for years to come.",
    },
    technologies: [
      "Express.js",
      "Nest.js",
      "Socket.io",
      "GraphQL",
      "TypeScript",
      "Redis",
      "Microservices",
      "REST APIs",
      "Serverless Functions",
    ],
  },

  python: {
    title: "Python Development",
    banner: "",
    content: {
      overview:
        "Python is a powerful, high-level programming language known for its simplicity, flexibility, and vast ecosystem. It’s widely used across web development, data science, artificial intelligence, and automation, making it one of the most versatile technologies in the modern development landscape.",

      howWeUse:
        "We leverage Python to build scalable, secure, and high-performing backend systems using frameworks like Django, Flask, and FastAPI. Our development approach emphasizes clean architecture, modularity, and maintainability. We integrate Python-based microservices and APIs with modern frontend and cloud solutions, while also utilizing Celery for background processing and automation. Python’s versatility allows us to implement AI, machine learning, and analytics pipelines that empower data-driven decision-making for our clients.",

      benefits:
        "Python’s simple syntax enhances developer productivity, enabling faster prototyping and deployment. Its robust standard library and active community provide solutions for nearly every use case — from backend APIs to AI-driven automation. With cross-platform compatibility and mature frameworks, Python ensures security, performance, and scalability across diverse applications.",

      useCases:
        "We use Python for web application development, automation tools, AI and ML model integration, API development, and backend systems for enterprise solutions. It’s also our go-to choice for data processing, analytics dashboards, and server-side scripting.",

      futureScope:
        "Python remains a dominant language across technology domains, especially in AI, machine learning, and cloud automation. With ongoing advancements in performance optimization (via PyPy and async frameworks), and strong community evolution, Python will continue to drive innovation in backend systems and intelligent automation.",
    },
    technologies: [
      "Django",
      "Flask",
      "FastAPI",
      "Celery",
      "Pandas",
      "NumPy",
      "TensorFlow",
      "PyTorch",
      "REST APIs",
      "Microservices",
    ],
  },

  database: {
    title: "MongoDB / SQL Databases",
    banner: "",
    content: {
      overview:
        "Databases are the core of every digital solution, ensuring reliable data storage, security, and real-time accessibility. From flexible NoSQL structures to powerful relational schemas, we design and manage databases that align perfectly with business logic, performance goals, and scalability requirements.",

      howWeUse:
        "We utilize MongoDB for dynamic, schema-less data storage that supports high scalability and flexibility — ideal for applications requiring rapid iteration and evolving data structures. For relational use cases, we rely on MySQL and PostgreSQL to deliver structured, ACID-compliant databases with optimized indexing, transactions, and analytics capabilities. Our team implements efficient ORM and ODM layers (like Mongoose and Sequelize) for seamless communication between databases and backend services, ensuring data integrity and performance across distributed environments.",

      benefits:
        "Our hybrid approach allows leveraging the strengths of both NoSQL and SQL databases — flexibility, scalability, and complex query handling. MongoDB provides agile schema evolution and high-speed read/write operations, while SQL databases deliver strong data consistency, relational mapping, and advanced reporting. Together, they enable robust, future-ready data ecosystems that can scale with user demand.",

      useCases:
        "We implement database architectures for eCommerce systems, CRM and ERP platforms, real-time analytics dashboards, SaaS applications, user management systems, and financial transaction services. Each solution is optimized for query efficiency, data security, and scalability across multi-cloud environments.",

      futureScope:
        "As data becomes increasingly complex and distributed, hybrid database architectures combining NoSQL and SQL paradigms will continue to dominate. The rise of cloud-native and serverless databases, real-time replication, and AI-driven query optimization will redefine how businesses store, analyze, and act on data.",
    },
    technologies: [
      "MongoDB",
      "Mongoose",
      "MySQL",
      "PostgreSQL",
      "Redis",
      "Sequelize",
      "AWS RDS",
      "Atlas",
      "Elasticsearch",
      "Data Replication",
    ],
  },

  aws: {
    title: "Amazon Web Services (AWS)",
    banner: "",
    content: {
      overview:
        "Amazon Web Services (AWS) is the world’s most comprehensive and widely adopted cloud platform, offering over 200 fully featured services from global data centers. AWS enables businesses to build scalable, secure, and cost-effective digital infrastructure without the limitations of traditional hardware.",

      howWeUse:
        "We harness AWS to deploy, manage, and scale cloud-based applications with precision and flexibility. Our teams utilize EC2 for compute resources, S3 for object storage, and RDS for relational databases. We also implement serverless architectures using AWS Lambda and API Gateway, automate deployments through CloudFormation and Terraform, and ensure reliability with CloudWatch and Auto Scaling. From development to production, we design AWS environments optimized for high availability, performance, and security compliance.",

      benefits:
        "AWS offers unparalleled scalability, pay-as-you-go pricing, and enterprise-grade security. Its vast ecosystem supports nearly every industry use case—from startups building MVPs to enterprises running mission-critical workloads. AWS’s built-in redundancy and global infrastructure enable fast delivery, low latency, and robust disaster recovery capabilities.",

      useCases:
        "We use AWS for hosting high-traffic websites, managing APIs, automating CI/CD pipelines, and creating big data analytics solutions. It’s also the foundation for AI-driven applications, IoT systems, and multi-tier cloud environments. Our AWS implementations power eCommerce platforms, SaaS products, and enterprise backends with seamless performance.",

      futureScope:
        "AWS continues to lead cloud innovation by expanding its capabilities in artificial intelligence, serverless computing, and hybrid cloud management. The future of AWS lies in deeper AI/ML integration, edge computing advancements, and sustainability-driven infrastructure optimization—making it the cornerstone of next-generation cloud ecosystems.",
    },
    technologies: [
      "EC2",
      "S3",
      "Lambda",
      "RDS",
      "CloudFormation",
      "API Gateway",
      "CloudFront",
      "CloudWatch",
      "IAM",
      "Auto Scaling",
    ],
  },

  cloud: {
    title: "Google Cloud Platform (GCP)",
    banner: "",
    content: {
      overview:
        "Google Cloud Platform (GCP) delivers a suite of powerful, secure, and scalable cloud solutions designed to accelerate innovation and digital transformation. With a global network and advanced AI capabilities, GCP empowers organizations to build, deploy, and scale applications effortlessly.",

      howWeUse:
        "We utilize GCP to architect and deploy high-performance cloud solutions tailored to client needs. Our team leverages Compute Engine for virtual machines, Cloud Run and App Engine for serverless deployments, and BigQuery for lightning-fast data analytics. We also implement Firebase for real-time databases, authentication, and mobile app hosting, ensuring seamless connectivity between frontend and backend systems. For AI and ML workloads, we use Vertex AI and TensorFlow integrations to deliver intelligent, data-driven insights.",

      benefits:
        "GCP offers unmatched performance, security, and integration with Google’s AI and data analytics ecosystem. Its serverless capabilities, sustainability-driven infrastructure, and hybrid cloud support make it a flexible and future-ready platform. GCP’s pay-as-you-go model also ensures cost efficiency while maintaining enterprise-level scalability.",

      useCases:
        "We deploy scalable web apps, machine learning models, and big data pipelines using GCP. It’s ideal for analytics dashboards, IoT systems, eCommerce backends, and real-time collaboration tools. Our GCP solutions help businesses leverage data and automation for faster decision-making and operational efficiency.",

      futureScope:
        "Google Cloud’s future lies in expanding AI-driven services, multi-cloud interoperability, and quantum-ready computing. With growing adoption of Kubernetes, serverless platforms, and sustainability-focused data centers, GCP continues to redefine what’s possible in cloud innovation and enterprise transformation.",
    },
    technologies: [
      "Compute Engine",
      "Cloud Run",
      "BigQuery",
      "Firebase",
      "App Engine",
      "Vertex AI",
      "Kubernetes Engine (GKE)",
      "Cloud Storage",
      "Pub/Sub",
      "TensorFlow",
    ],
  },

  docker: {
    title: "Docker",
    banner: "",
    content: {
      overview:
        "Docker is a leading containerization platform that revolutionizes how applications are built, shipped, and deployed. It enables developers to package applications with all their dependencies into lightweight, portable containers, ensuring consistency across environments and simplifying the entire software lifecycle.",

      howWeUse:
        "We use Docker to containerize applications across our development pipeline — from local environments to cloud deployment. By leveraging Docker Compose and multi-stage builds, we streamline configuration, reduce conflicts, and ensure seamless scalability. We integrate Docker into CI/CD workflows, enabling automated builds, testing, and deployment. For enterprise-grade scalability, we pair Docker with Kubernetes for orchestrated microservices management and zero-downtime deployments.",

      benefits:
        "Docker enhances efficiency by creating reproducible, isolated environments that eliminate compatibility issues. It enables faster deployment, simplified scaling, improved resource utilization, and platform independence. With Docker, teams achieve consistent performance across machines, reducing bugs and deployment failures.",

      useCases:
        "Docker is integral to building and managing microservices architectures, implementing DevOps pipelines, and deploying containerized applications across multiple cloud environments. It supports rapid prototyping, automated testing, and continuous delivery for agile development teams.",

      futureScope:
        "Docker remains at the core of modern DevOps and cloud-native ecosystems. With continued advancements in orchestration (Kubernetes), security, and edge deployments, Docker will drive the next generation of scalable, distributed, and automated software systems.",
    },
    technologies: [
      "Docker Hub",
      "Docker Compose",
      "Dockerfile",
      "Kubernetes",
      "CI/CD Pipelines",
      "Microservices",
      "Container Registry",
      "Multi-stage Builds",
    ],
  },
};

export default techData;
