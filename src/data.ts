import { Experience, Skill, Category, NpmPackage } from "./types";
import { Code2, Brain, Languages, UserSearch, Presentation, GraduationCap, Terminal, Rocket, Server, LayoutTemplate } from "lucide-react";
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
    icon: UserSearch,
    period: "Oct 2023 – Present",
    description: [
      "Recruited senior developers for placement in European partner companies, achieving a 60% shortlist-to-interview efficiency in the first quarter.",
      "Evaluated incoming profiles to determine their compatibility with client companies.",
      "Fostered collaboration with local hiring partners in Indonesia and Vietnam to identify potential candidates.",
      "Continuously enhanced and iterated upon the hiring assessment processes to ensure effectiveness and precision in candidate selection.",
      "Developed and iterated technical assessment processes, achieving a 50% interview-to-offer rate."
    ],
    techStack: ["Technical Hiring", "Assessment Design", "Team Management", "Recruitment"],
    category: "soft",
  },
  {
    title: "Fullstack Engineer",
    company: "TiketQ",
    icon: Code2,
    period: "Jun 2023 - Present",
    description: [
      "Founded and currently serves as the Fullstack Engineer at TiketQ, a Batam-based ticketing platform. Responsible for architecting and developing the entire technology stack from scratch.",
      "Engineered the Back End infrastructure with Express.js, optimising performance and scalability.",
      "Utilised Redis for efficient caching mechanisms, improving system performance and response times."
    ],
    techStack: ["Express.js", "Redis", "Node.js", "System Architecture", "React.js"],
    category: "technical",
  },
  {
    title: "Program Manager",
    company: "RevoU",
    icon: GraduationCap,
    period: "Feb 2023 – Apr 2024",
    description: [
      "Lead and manage a dedicated team to continuously improve the Software Engineering program.",
      "Oversee the design and development of scalable programs and curricula, integrating daily lectures, assignments, and projects to enhance students' skills.",
      "Create an experiential learning environment that empowers students to apply their knowledge through simulated real-life projects (RevoU Next).",
      "Ensure the effective delivery of the curriculum and code reviews by industry instructors and team leads.",
      "Collaborate with external hiring managers to align the curriculum with industry standards, optimising student preparation for the job market."
    ],
    techStack: ["Curriculum Design", "Education Management", "Team Leadership", "Software Engineering Education"],
    category: "soft",
  },
  {
    title: "Technical Assessment Designer",
    company: "Glints",
    icon: Presentation,
    period: "Jan 2022 – Apr 2023",
    description: [
      "Design and implement a comprehensive assessment system to accurately evaluate and filter high-quality Southeast Asian engineers.",
      "Enhance the speed and accuracy of matching international employers with top-tier engineering talent.",
      "Develop fool-proof testing methodologies to ensure candidates meet the rigorous standards of the Glints Ecosystem.",
      "Collaborate with hiring managers and industry experts to continuously refine and improve the assessment criteria."
    ],
    techStack: ["Assessment Design", "Hiring Standards", "Technical Evaluation"],
    category: "soft",
  },
  {
    title: "Technical Curriculum Lead",
    company: "Glints Academy",
    icon: Brain,
    period: "Nov 2020 – Dec 2021",
    description: [
      "Implemented an Industry Trainers system, providing students with personalised mentorship and guidance.",
      "Designed and developed curricula for various core products, ensuring comprehensive skill acquisition.",
      "Successfully transitioned Bootcamp models to hybrid self-paced learning formats with personalised support.",
      "Achieved high employment rates for graduates with competitive salaries through targeted curriculum design, with an 90%+ hire rate within 6 months."
    ],
    techStack: ["Curriculum Development", "Mentorship", "EdTech", "Bootcamp Management"],
    category: "soft",
  },

  // Software Engineering & Technical Roles
  {
    title: "Technical Lead",
    company: "PT. Mitra Kuadran Teknologi",
    icon: Terminal,
    period: "Nov 2021 - Dec 2021",
    description: [
      "Led a small team at Kuadran Teknologi Indonesia, specialising in crafting ERP solutions for government entities including BP Batam, Customs Office, and the Municipality Office.",
      "Successfully guided the team in delivering tailored ERP products that met the specific needs of government clients.",
      "Managed technical hiring processes, ensuring the acquisition of skilled talent to strengthen the team's capabilities.",
      "Utilised a diverse technology stack including Vue.js, React.js, Express.js, Laravel, PostgreSQL, MongoDB, and AWS/GCP."
    ],
    techStack: ["Vue.js", "React.js", "Express.js", "Laravel", "PostgreSQL", "MongoDB", "AWS", "GCP"],
    category: "technical",
  },
  {
    title: "Technical Facilitator",
    company: "Gerakan Nasional 1000 Startup Digital",
    icon: Rocket,
    period: "Sep 2020 - Feb 2021",
    description: [
      "Played a pivotal role in a startup development program backed by the Ministry of Communication and Informatics in Indonesia.",
      "Guided and mentored aspiring founders in shaping their ideas into industry-ready applications.",
      "Provided technical mentorship to future CTOs, supporting them in application development.",
      "Successfully coached 10 startup teams, with 3 teams advancing to the finals."
    ],
    techStack: ["Startup Coaching", "Product Management", "MVP Development"],
    category: "technical",
  },
  {
    title: "Full Stack Engineer",
    company: "Talent Tribe Asia",
    icon: LayoutTemplate,
    period: "Feb 2020 – Nov 2020",
    description: [
      "Develop and maintain components for TalentTribe, a career platform targeting millennials.",
      "Enhance existing products by implementing new features and fixing bugs to ensure optimal performance and user experience.",
      "Utilise a variety of technologies in development, including AWS, Next.js, Express.js, Firestore, Algolia, and Nginx.",
      "Set up and manage a WordPress application on AWS, including SSL configuration to ensure secure connections."
    ],
    techStack: ["AWS", "Next.js", "Express.js", "Firestore", "Algolia", "WordPress", "Nginx"],
    category: "technical",
  },
  {
    title: "Software Developer",
    company: "Webimp, pte. ltd.",
    icon: Code2,
    period: "Mar 2019 – Feb 2020",
    description: [
      "Developed web applications using PHP with the CodeIgniter Framework.",
      "Utilised jQuery to manage front-end behaviours, consume APIs, and map data on the front-end side.",
      "Translated business processes into effective software logic, ensuring seamless operation and functionality.",
      "Contributed to the company's recognition as the best company to work for in 2019 by the Singapore Computer Society."
    ],
    techStack: ["PHP", "CodeIgniter", "jQuery", "MySQL", "API Integration"],
    category: "technical",
  },
  {
    title: "The Freelance Vigilante",
    company: "Various Government Agencies & Late Night Ideas",
    icon: Code2,
    period: "2013 – 2019",
    description: [
      "Spent the early years acting as a one-man army for government agencies, building ERPs and dashboards that (surprisingly) didn't crash.",
      "Learned the hard way that 'fixed price' actually means 'unlimited revisions'.",
      "Crafted custom solutions for local businesses using whatever tech stack was trendy (or whatever I could make work at 3 AM).",
      "Mastered the art of translating 'I want it to pop' into actual CSS."
    ],
    techStack: ["PHP", "CodeIgniter", "jQuery", "Bootstrap", "MySQL", "Coffee & Prayers"],
    category: "technical",
  },
];

export const projects: Experience[] = [
  {
    title: "Fullstack Engineer",
    company: "TiketQ",
    icon: Code2,
    period: "Jun 2023 - Present",
    description:
      "Founded and developed a ticketing platform in Batam from scratch. Built backend infrastructure using Express.js, optimized with Redis caching for performance.",
    category: "technical",
  },
  {
    title: "GitHub Code Autograder",
    company: "RevoU",
    icon: Brain,
    period: "Aug 2023 - Mar 2024",
    description:
      "Developed a Python-based AI-powered code quality autograder using OpenAI API, streamlining assignment grading and ensuring consistency.",
    category: "technical",
  },
  {
    title: "Software Engineer",
    company: "Biteship",
    icon: Server,
    period: "Oct 2023 - Dec 2023",
    description:
      "Built a Node.js service for webhook-based real-time communication and implemented a Chrome extension.",
    category: "technical",
  },
  {
    title: "Lead Instructor",
    company: "RevoU",
    icon: GraduationCap,
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
