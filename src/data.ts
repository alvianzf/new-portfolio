import { Experience, Skill, Category } from "./types";
import { Code2, Brain, Languages } from "lucide-react";
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
  // Leadership & Management Roles
  {
    title: "Talent Acquisition Specialist & Regional Manager",
    company: "Devshore Partners, s.r.o.",
    period: "Oct 2023 – Present",
    description:
      "Recruited and assessed senior developers for European companies, achieving a 60% shortlist-to-interview efficiency. Enhanced hiring assessment processes for precision and effectiveness.",
    category: "soft",
  },
  {
    title: "Program Manager",
    company: "RevoU",
    period: "Feb 2023 – Apr 2024",
    description:
      "Led and managed software engineering programs, designing scalable curricula, integrating real-world projects, and aligning training with industry standards.",
    category: "soft",
  },
  {
    title: "Technical Assessment Designer",
    company: "Glints",
    period: "Jan 2022 – Apr 2023",
    description:
      "Developed assessment systems to evaluate software engineers, refining hiring processes and ensuring a strong match between candidates and companies.",
    category: "soft",
  },
  {
    title: "Technical Curriculum Lead",
    company: "Glints Academy",
    period: "Nov 2020 – Dec 2021",
    description:
      "Designed industry-standard curricula, implemented mentorship programs, and transitioned bootcamp models to self-paced learning formats.",
    category: "soft",
  },

  // Software Engineering & Technical Roles
  {
    title: "Full Stack Engineer",
    company: "Talent Tribe Asia",
    period: "Feb 2020 – Nov 2020",
    description:
      "Developed and maintained career platform components using AWS, Next.js, Express.js, and Firestore. Managed WordPress deployment and SSL configuration.",
    category: "technical",
  },
  {
    title: "Software Developer",
    company: "Webimp, pte. ltd.",
    period: "Mar 2019 – Feb 2020",
    description:
      "Developed web applications with PHP, CodeIgniter, and jQuery. Enhanced business processes through software solutions.",
    category: "technical",
  },
  {
    title: "Technical Lead",
    company: "PT. Mitra Kuadran Teknologi",
    period: "Nov 2021 - Dec 2021",
    description:
      "Led a team in developing ERP solutions for government entities using Vue.js, React.js, Express.js, Laravel, and PostgreSQL. Managed hiring processes and DevOps deployments on AWS/GCP.",
    category: "technical",
  },
  {
    title: "Technical Facilitator",
    company: "Gerakan Nasional 1000 Startup Digital",
    period: "Sep 2020 - Feb 2021",
    description:
      "Mentored startup founders in application development, coaching 10 startup teams, with 3 advancing to the finals.",
    category: "technical",
  },
];

export const projects: Experience[] = [
  {
    title: "Fullstack Engineer",
    company: "TiketQ",
    period: "Jun 2023 - Present",
    description:
      "Founded and developed a ticketing platform in Batam from scratch. Built backend infrastructure using Express.js, optimized with Redis caching for performance.",
    category: "technical",
  },
  {
    title: "GitHub Code Autograder",
    company: "RevoU",
    period: "Aug 2023 - Mar 2024",
    description:
      "Developed a Python-based AI-powered code quality autograder using OpenAI API, streamlining assignment grading and ensuring consistency.",
    category: "technical",
  },
  {
    title: "Software Engineer",
    company: "Biteship",
    period: "Oct 2023 - Dec 2023",
    description:
      "Built a Node.js service for webhook-based real-time communication and implemented a Chrome extension.",
    category: "technical",
  },
  {
    title: "Lead Instructor",
    company: "RevoU",
    period: "Jan 2023 - Mar 2023",
    description:
      "Refined curriculum materials, created key answers for advanced assignments, and aligned learning resources with evolving industry standards.",
    category: "soft",
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
