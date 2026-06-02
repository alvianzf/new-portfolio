import { Experience, Skill, Category, NpmPackage } from "./types";
import { Code2, Brain, Languages, UserSearch, Presentation, GraduationCap, Terminal, Rocket, Server, LayoutTemplate, Flame, Bot } from "lucide-react";
import {
  faReact,
  faNode,
  faPython,
  faJs,
  faPhp,
  faLaravel,
  faAws,
  faVuejs,
  faLinux,
} from "@fortawesome/free-brands-svg-icons";
import {
  faUsers,
  faLightbulb,
  faGlobe,
  faComments,

  faChalkboardTeacher,
  faTasks,
  faDatabase,
  faCloud,
  faServer,
  faBox,
  faCat,
  faFire,
  faProjectDiagram,
} from "@fortawesome/free-solid-svg-icons";

export const experiences: Experience[] = [
  // Part-time / Contract — most recent first
  {
    title: "Technical Mock Interviewer",
    company: "LearnWithAndi",
    icon: Flame,
    period: "Aug 2025 – Present",
    description: [
      "Conduct high-stakes technical mock interviews, specialising in rigorous pressure-test scenarios to evaluate a candidate's resilience, technical depth, and problem-solving under stress.",
      "Deliver unfiltered, high-impact technical feedback, transforming 'mild' conceptual understanding into industry-ready expertise through direct and honest critique.",
      "Tailor assessment intensity based on candidate seniority, ranging from fundamental logic checks to complex system design challenges.",
      "Championed a 'Radical Candor' approach to mentorship, resulting in candidates significantly better prepared for real-world high-pressure hiring cycles.",
    ],
    techStack: ["Technical Vetting", "System Design", "Radical Candor", "Performance Coaching", "Candidate Calibration"],
    category: "soft",
  },

  // Main Roles
  {
    title: "Talent Acquisition Specialist & Regional Manager",
    company: "Devshore Partners, s.r.o.",
    icon: UserSearch,
    period: "Oct 2023 – Present",
    description: [
      "Engineered and iterated an AI-driven sourcing and automated outreach system using Anthropic (Opus 4.6, Sonnet 4.6, and Haiku) to scale talent acquisition across global markets.",
      "Architected a recruitment dashboard and custom matching algorithm using Next.js, Apify, n8n, and OpenClaw to bridge the gap between high-intent job openings and the talent pool.",
      "Implemented advanced Token and Memory Optimisation strategies, reducing AI operating costs by 45% while maintaining high-performance output quality.",
      "Designed a comprehensive technical assessment framework evaluating senior developers across algorithms and system design; achieved a 60% shortlist-to-interview conversion (2× the industry average).",
      "Optimised interview-to-offer pipeline through iterative A/B testing of assessment criteria; increased offer acceptance rate to 50%.",
      "Strengthened strategic partnerships across Indonesia and Vietnam, expanding the talent pipeline by 200% and managing coordination for senior placements in European companies.",
      "Led end-to-end recruitment for 30+ senior roles (Backend, Frontend, DevOps) with a streamlined average time-to-hire of 45 days.",
    ],
    techStack: ["AI Automation", "Next.js", "n8n", "Prompt Engineering", "Technical Assessment Design", "Recruitment Strategy", "Stakeholder Management"],
    category: "soft",
  },
  {
    title: "Fullstack Engineer",
    company: "TiketQ",
    icon: Code2,
    period: "Jun 2023 – Present",
    description: [
      "Founded and currently serves as the Fullstack Engineer at TiketQ, a Batam-based ticketing platform. Responsible for architecting and developing the entire technology stack from scratch.",
      "Engineered the Back End infrastructure with Express.js, optimising performance and scalability.",
      "Utilised Redis for efficient caching mechanisms, improving system performance and response times.",
    ],
    techStack: ["Express.js", "Redis", "Node.js", "React.js", "System Architecture"],
    category: "technical",
  },
  {
    title: "Program Manager – Software Engineering",
    company: "RevoU",
    icon: GraduationCap,
    period: "Feb 2023 – Apr 2024",
    description: [
      "Led a team to optimise RevoU's Software Engineering programme structure and content.",
      "Built scalable curricula with daily lectures, assignments, and real-life project simulations.",
      "Created RevoU Next to bridge academic learning and practical job skills.",
      "Oversaw code reviews and instructor delivery to ensure quality outcomes.",
      "Partnered with hiring managers to align training with real-world job market demands.",
      "Refined applicant assessments and career support systems with internal teams.",
    ],
    techStack: ["Curriculum Development", "Team Leadership", "Stakeholder Management", "Quality Assurance"],
    category: "soft",
  },
  {
    title: "Lead Instructor",
    company: "RevoU",
    icon: Presentation,
    period: "Jan 2023 – Mar 2023",
    description: [
      "Modified and refined student assignment briefs to align with evolving educational objectives.",
      "Developed comprehensive key answers for advanced assignments to enhance learning outcomes.",
      "Conducted a thorough review of the current curriculum including Students Study Resources, Group Project Briefs, Team Lead Simulation briefs, Grading Rubric, and Syllabus.",
      "Proposed and implemented improvements; submitted new syllabi, master decks, and updated links for study resources.",
    ],
    techStack: ["NestJS", "PostgreSQL", "Supabase", "Docker", "Stakeholder Management", "Quality Assurance"],
    category: "soft",
  },
  {
    title: "Technical Assessment Designer",
    company: "Glints",
    icon: Bot,
    period: "Jan 2022 – Apr 2023",
    description: [
      "Designed robust assessments to filter top-tier Southeast Asian engineering talent.",
      "Cut employer-candidate mismatch by improving evaluation accuracy and rigour.",
      "Built fool-proof testing methodologies to uphold Glints' ecosystem quality standards.",
      "Collaborated with industry experts to iterate and refine evaluation criteria.",
      "Analysed assessment data to enhance process effectiveness and alignment with hiring trends.",
    ],
    techStack: ["Assessment Design", "Data Analytics", "Process Optimisation", "Cross-Cultural Communication"],
    category: "soft",
  },
  {
    title: "Technical Lead",
    company: "PT. Mitra Kuadran Teknologi",
    icon: Terminal,
    period: "Nov 2021 – Dec 2021",
    description: [
      "Led a small team specialising in crafting ERP solutions for government entities including BP Batam, Customs Office, and the Municipality Office.",
      "Successfully guided the team in delivering tailored ERP products that met the specific needs of government clients.",
      "Managed technical hiring processes, ensuring the acquisition of skilled talent to strengthen team capabilities.",
      "Utilised a diverse technology stack including Vue.js, React.js, Express.js, Laravel, PostgreSQL, MongoDB, and AWS/GCP.",
      "Implemented efficient project management practices using Trello for seamless coordination and project tracking.",
    ],
    techStack: ["Vue.js", "React.js", "Express.js", "Laravel", "PostgreSQL", "MongoDB", "AWS", "GCP"],
    category: "technical",
  },
  {
    title: "Technical Curriculum Lead",
    company: "Glints Academy",
    icon: Brain,
    period: "Nov 2020 – Dec 2021",
    description: [
      "Launched the Industry Trainers system to deliver tailored mentorship.",
      "Developed core curricula across multiple programmes, improving student outcomes.",
      "Transitioned bootcamps to hybrid formats, maintaining personalisation and flexibility.",
      "Achieved 90%+ graduate employment rate within 6 months, with median salary of IDR 5M/month.",
    ],
    techStack: ["Instructional Design", "Educational Technology", "Metrics-Driven Improvement", "Scaling Programs"],
    category: "soft",
  },
  {
    title: "Technical Facilitator",
    company: "Gerakan Nasional 1000 Startup Digital",
    icon: Rocket,
    period: "Sep 2020 – Feb 2021",
    description: [
      "Played a pivotal role in Batam's chapter of GN 1000 Startup Digital, a program backed by the Ministry of Communication and Informatics of Indonesia.",
      "Guided and mentored aspiring founders in shaping their ideas into industry-ready applications.",
      "Provided technical mentorship to future CTOs, supporting them in application development.",
      "Successfully coached 10 startup teams, with 3 teams advancing to the finals.",
    ],
    techStack: ["Startup Coaching", "Product Management", "MVP Development", "Technical Mentorship"],
    category: "technical",
  },
  {
    title: "Full Stack Engineer",
    company: "Talent Tribe Asia",
    icon: LayoutTemplate,
    period: "Feb 2020 – Nov 2020",
    description: [
      "Maintained and enhanced platform components for a millennial-focused career site.",
      "Deployed features and fixed bugs using Next.js, Express.js, and Firestore.",
      "Managed WordPress app on AWS, including SSL and performance configs.",
      "Collaborated with teams to deliver scalable, production-ready solutions.",
    ],
    techStack: ["Next.js", "Express.js", "Firestore", "Algolia", "AWS", "Nginx", "WordPress"],
    category: "technical",
  },
  {
    title: "Software Developer",
    company: "Webimp, pte. ltd.",
    icon: Code2,
    period: "Mar 2019 – Feb 2020",
    description: [
      "Built web applications using PHP (CodeIgniter) and jQuery for dynamic UI behaviour.",
      "Converted business processes into effective backend logic and clean user flows.",
      "Helped the company clinch the 'Best Company to Work For 2019' by Singapore Computer Society.",
    ],
    techStack: ["PHP", "CodeIgniter", "jQuery", "MySQL", "RESTful APIs"],
    category: "technical",
  },
  {
    title: "The Freelance Vigilante",
    company: "Various Government & Private Clients",
    icon: Code2,
    period: "2011 – 2019",
    description: [
      "Built 20+ custom ERP systems and operational dashboards for Indonesian government agencies and SMEs.",
      "Delivered end-to-end solutions managing requirements gathering, development, deployment, and client training.",
      "Specialised in PHP/CodeIgniter stack with jQuery frontends and MySQL databases.",
      "Learned the hard way that 'fixed price' actually means 'unlimited revisions'.",
    ],
    techStack: ["PHP", "CodeIgniter", "jQuery", "Bootstrap", "MySQL"],
    category: "technical",
  },
];

export const projects: Experience[] = [
  {
    title: "Full-Stack Product Engineer",
    company: "LearnWithAndi",
    icon: Rocket,
    period: "Feb 2026 – Present",
    description:
      "Architected and deployed the full LearnWithAndi ecosystem — Landing Page, Job Tracker, Mentorship platform, Talent Market, and Internal Dashboards. Applied Product Owner principles, SEO/GEO strategies, and expert Prompt Engineering to achieve 10/10 code quality with minimal token expenditure. Owns the complete DevOps and Security lifecycle maintaining 99.9% uptime.",
    link: "https://learnwithandi.com",
    techStack: ["React.js", "Prompt Engineering", "SEO/GEO", "DevOps", "Product Ownership"],
    category: "technical",
  },
  {
    title: "Tick PHP Framework",
    company: "Open Source",
    icon: faPhp,
    period: "Apr 2022 – Present",
    description:
      "Architected a lightweight PHP framework with auto-discovery routing, dependency injection, and zero-dependency JWT auth. Implemented a database-agnostic ORM supporting MySQL, PostgreSQL, SQLite, and MongoDB. Built automatic Swagger documentation generator and CLI scaffolding tools.",
    link: "https://github.com/alvianzf/tick-php-framework",
    techStack: ["PHP 8+", "OOP Design Patterns", "Dependency Injection", "JWT", "CLI Development"],
    category: "technical",
  },
  {
    title: "LearnWithAndi Landing Page",
    company: "learnwithandi.com",
    icon: LayoutTemplate,
    period: "Feb 2026",
    description:
      "Rebuilt career accelerator landing page achieving 95+ PageSpeed score. Implemented Generative Engine Optimization (ai.txt, llm.txt). Architected using Next.js 16 App Router with a server-first approach and Framer Motion for SEO-safe animations.",
    link: "https://learnwithandi.com",
    techStack: ["Next.js 16", "TypeScript", "Framer Motion", "CSS Modules", "Vercel", "GEO Standards"],
    category: "technical",
  },
  {
    title: "GitHub Code Autograder",
    company: "RevoU",
    icon: Brain,
    period: "Aug 2023 – Mar 2024",
    description:
      "Developed a GitHub Code Quality Autograder for RevoU's Software Engineering program. Built with Python and integrated with OpenAI API to evaluate code directly from GitHub repositories. Automated assessment of code quality focusing on best practices, readability, and maintainability. Reduced instructor workload while enhancing evaluation consistency.",
    techStack: ["Python", "OpenAI API", "GitHub API", "Automation"],
    category: "technical",
  },
  {
    title: "Software Engineer",
    company: "Biteship",
    icon: Server,
    period: "Oct 2023 – Dec 2023",
    description:
      "Developed a Node.js service to ensure optimal performance in a freelance capacity. Created a webhook system for real-time communication requirements. Designed and implemented a Chrome extension integrated with the Node.js service.",
    techStack: ["Node.js", "Redis", "WebSockets", "MongoDB", "React", "Chrome Extension API"],
    category: "technical",
  },
  {
    title: "Harry Trans Beton Landing Page",
    company: "Client Project",
    icon: Code2,
    period: "Feb 2025",
    description:
      "Developed a modern React landing page for a concrete manufacturing company with SEO optimisation. Achieved 90+ PageSpeed score with mobile-first responsive design.",
    techStack: ["React.js", "SEO Best Practices", "Responsive Design"],
    category: "technical",
  },
];

export const skills: Skill[] = [
  // Technical Skills
  {
    name: "JavaScript & TypeScript",
    icon: faJs,
    description: "Expert in JavaScript (ES6+), TypeScript, and Node.js",
    category: "technical",
  },
  {
    name: "Python",
    icon: faPython,
    description:
      "Automation, scripting, AI integration, and backend development",
    category: "technical",
  },
  {
    name: "PHP",
    icon: faPhp,
    description: "Backend development with PHP, CodeIgniter, and Laravel",
    category: "technical",
  },
  {
    name: "Laravel",
    icon: faLaravel,
    description: "Elegant PHP web framework for artisans",
    category: "technical",
  },
  {
    name: "CodeIgniter",
    icon: faFire,
    description: "Powerful PHP framework with a small footprint",
    category: "technical",
  },
  {
    name: "n8n",
    icon: faProjectDiagram,
    description: "Workflow automation and process orchestration",
    category: "technical",
  },
  {
    name: "SQL & NoSQL Databases",
    icon: faDatabase,
    description:
      "Database management with PostgreSQL, MySQL, MongoDB, and Firestore",
    category: "technical",
  },
  {
    name: "Redis & Caching",
    icon: faDatabase,
    description: "Performance optimization with Redis caching",
    category: "technical",
  },
  {
    name: "React.js & Next.js",
    icon: faReact,
    description:
      "Expert in building SPAs and SSR apps with React.js and Next.js",
    category: "technical",
  },
  {
    name: "Vue.js",
    icon: faVuejs,
    description: "Building dynamic UIs with Vue.js",
    category: "technical",
  },
  {
    name: "Node.js & Express.js",
    icon: faNode,
    description: "Backend development and REST API architecture",
    category: "technical",
  },
  {
    name: "NestJS",
    icon: faCat,
    description: "Scalable server-side applications and microservices architecture",
    category: "technical",
  },
  {
    name: "AWS",
    icon: faAws,
    description: "Deploying scalable apps with AWS (EC2, S3, RDS, Lambda)",
    category: "technical",
  },
  {
    name: "Google Cloud Platform (GCP)",
    icon: faCloud,
    description: "Cloud computing, deployments, and serverless functions",
    category: "technical",
  },
  {
    name: "DigitalOcean",
    icon: faServer,
    description: "Cloud hosting and VPS management with DigitalOcean",
    category: "technical",
  },
  {
    name: "Firebase",
    icon: faDatabase,
    description: "Realtime database, authentication, and Firestore integration",
    category: "technical",
  },
  {
    name: "Docker & Kubernetes",
    icon: faBox,
    description: "Containerization and orchestration for scalable applications",
    category: "technical",
  },
  {
    name: "API Development & Microservices",
    icon: faNode,
    description:
      "RESTful & GraphQL APIs, Express.js, NestJS, microservices architecture, and service communication with RabbitMQ & Kafka",
    category: "technical",
  },
  {
    name: "Linux / Ubuntu",
    icon: faLinux,
    description: "Server management, command line proficiency, and shell scripting",
    category: "technical",
  },

  // Soft Skills
  {
    name: "Project Management",
    icon: faTasks,
    description: "Leadership, Agile methodologies, and sprint planning",
    category: "soft",
  },
  {
    name: "Technical Hiring & Assessment",
    icon: faUsers,
    description: "Designing and optimizing technical hiring assessments",
    category: "soft",
  },
  {
    name: "Curriculum Development",
    icon: faChalkboardTeacher,
    description: "Building industry-standard training programs for engineers",
    category: "soft",
  },
  {
    name: "Career Development & Coaching",
    icon: faLightbulb,
    description: "Mentoring and coaching engineers for job market readiness",
    category: "soft",
  },

  // Languages
  {
    name: "English",
    icon: faGlobe,
    description: "Professional working proficiency",
    category: "languages",
  },
  {
    name: "Malay",
    icon: faGlobe,
    description: "Professional working proficiency",
    category: "languages",
  },
  {
    name: "Indonesian",
    icon: faComments,
    description: "Native proficiency",
    category: "languages",
  },
];

export const categories: Category[] = [
  { name: "Technical Skills", icon: Code2 },
  { name: "Soft Skills", icon: Brain },
  { name: "Languages", icon: Languages },
];
export const npmPackages: NpmPackage[] = [
  {
    name: "make-it-rain",
    description: "Visual Inflation. A useless package that handles the tough job of making your numbers actually readable.",
    command: "npm i make-it-rain",
    url: "https://www.npmjs.com/package/make-it-rain",
  },
  {
    name: "env-validate-sarcastically",
    description: "Env Bully. Validates your environment variables and insults you if they are missing.",
    command: "npm i env-validate-sarcastically",
    url: "https://www.npmjs.com/package/env-validate-sarcastically",
  },
  {
    name: "a-valid-json",
    description: "Trust Issues. Validates JSON, but sarcastically.",
    command: "npm i a-valid-json",
    url: "https://www.npmjs.com/package/a-valid-json",
  },
  {
    name: "@alvianzf/squiggly-lines-go-brrr",
    description: "CPU Heater. Adds squiggly lines to your background to warm up your room.",
    command: "npm i @alvianzf/squiggly-lines-go-brrr",
    url: "https://www.npmjs.com/package/@alvianzf/squiggly-lines-go-brrr",
  },
];
