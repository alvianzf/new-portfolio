import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ArrowRight, Download, Mail, Calendar, Linkedin, Github } from 'lucide-react';
import alvian from "../assets/potraits.png";
import { skills, categories } from "../data";
import ModernCard from "../components/ModernCard";
import SEO from '../components/SEO';

export default function About() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Alvian Zachry Faturrahman",
    "url": "https://alvianzf.id",
    "image": "https://alvianzf.id/favicon.ico",
    "sameAs": [
      "https://github.com/alvianzf",
      "https://linkedin.com/in/alvianzf",
      "https://twitter.com/alvianzf"
    ],
    "jobTitle": "Program Manager | Technical Lead | Full Stack Engineer",
    "worksFor": {
      "@type": "Organization",
      "name": "Independent Consultant"
    },
    "description": "Program Manager, Technical Lead, and Full Stack Engineer with 13+ years of experience.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "bestRating": "5",
      "ratingCount": "47"
    }
  };

  return (
    <div className="min-h-screen pt-20 overflow-x-hidden">
      <SEO
        schema={personSchema}
        keywords={[
          "Alvian Zachry Faturrahman", "Software Engineer", "Recruiter", "Bootcamp Tech Instructor",
          "Program Manager", "Technical Lead", "Full Stack Engineer",
          "React Developer", "Engineering Manager", "Tech Mentorship Indonesia"
        ]}
      />
      <div className="container mx-auto px-6 py-20">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-[var(--text-primary)] mb-8 leading-tight">
                Alvian
                <br />
                <span className="text-[var(--text-secondary)]">Zachry.</span>
              </h1>
              <p className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-lg leading-relaxed mb-10">
                Software Engineer, Recruiter, & Bootcamp Tech Instructor <br />
                <span className="text-[var(--text-secondary)] text-xl">bridging the gap between people and technology.</span>
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="/experience"
                  className="btn-primary flex items-center gap-2 hover:bg-brand-red transition-colors"
                >
                  See my work <ArrowRight className="w-4 h-4" />
                </a>
                <a href="/resume.pdf" download="Alvian_Zachry_CV.pdf" className="text-[var(--text-secondary)] hover:text-brand-red font-medium flex items-center gap-2 px-6 py-3 transition-colors">
                  Download CV <Download className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Updated accent color blob */}
              <div className="absolute inset-0 bg-brand-red rounded-full blur-3xl opacity-10 transform translate-x-10 translate-y-10"></div>
              <img
                src={alvian}
                alt="Alvian Zachry"
                className="relative rounded-2xl w-full max-w-md mx-auto shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>
          </div>
        </section>

        {/* Technical Expertise (Infinite Marquee) */}
        <section className="mb-24 relative space-y-2">
          {/* Row 1: Development & Frameworks (Right to Left) */}
          <div className="max-w-[100vw] overflow-hidden mask-linear-gradient">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="flex w-max gap-4 animate-marquee pause-on-hover py-1"
            >
              {[...skills.filter(s => ['JavaScript & TypeScript', 'Python', 'PHP', 'Laravel', 'CodeIgniter', 'React.js & Next.js', 'Vue.js', 'Node.js & Express.js', 'NestJS'].includes(s.name)), ...skills.filter(s => ['JavaScript & TypeScript', 'Python', 'PHP', 'Laravel', 'CodeIgniter', 'React.js & Next.js', 'Vue.js', 'Node.js & Express.js', 'NestJS'].includes(s.name)), ...skills.filter(s => ['JavaScript & TypeScript', 'Python', 'PHP', 'Laravel', 'CodeIgniter', 'React.js & Next.js', 'Vue.js', 'Node.js & Express.js', 'NestJS'].includes(s.name))].map((skill, index) => (
                <div
                  key={`row1-${skill.name}-${index}`}
                  className="flex items-center gap-2 px-6 py-3 card-modern border border-[var(--border-color)] shadow-sm whitespace-nowrap group hover:border-brand-red hover:shadow-md transition-all duration-300"
                >
                  <FontAwesomeIcon icon={skill.icon} className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-brand-red transition-colors" />
                  <span className="text-sm font-medium text-[var(--text-secondary)] group-hover:text-brand-red transition-colors">{skill.name}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Row 2: Infrastructure & Tools (Left to Right) */}
          <div className="max-w-[100vw] overflow-hidden mask-linear-gradient">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="flex w-max gap-4 animate-marquee-reverse pause-on-hover py-1"
            >
              {[...skills.filter(s => !['JavaScript & TypeScript', 'Python', 'PHP', 'Laravel', 'CodeIgniter', 'React.js & Next.js', 'Vue.js', 'Node.js & Express.js', 'NestJS'].includes(s.name) && s.category === 'technical'), ...skills.filter(s => !['JavaScript & TypeScript', 'Python', 'PHP', 'Laravel', 'CodeIgniter', 'React.js & Next.js', 'Vue.js', 'Node.js & Express.js', 'NestJS'].includes(s.name) && s.category === 'technical'), ...skills.filter(s => !['JavaScript & TypeScript', 'Python', 'PHP', 'Laravel', 'CodeIgniter', 'React.js & Next.js', 'Vue.js', 'Node.js & Express.js', 'NestJS'].includes(s.name) && s.category === 'technical')].map((skill, index) => (
                <div
                  key={`row2-${skill.name}-${index}`}
                  className="flex items-center gap-2 px-6 py-3 card-modern border border-[var(--border-color)] shadow-sm whitespace-nowrap group hover:border-brand-red hover:shadow-md transition-all duration-300"
                >
                  <FontAwesomeIcon icon={skill.icon} className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-brand-red transition-colors" />
                  <span className="text-sm font-medium text-[var(--text-secondary)] group-hover:text-brand-red transition-colors">{skill.name}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Gradient Masks for fading effect - updated to match theme bg */}
          <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10 pointer-events-none"></div>
        </section>

        {/* Biography (About Me) */}
        <section className="max-w-4xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-8 ">About Me</h2>
            <p className="text-lg text-[var(--text-secondary)] leading-loose">
              Hi, I'm Ary! I’m a tech geek at heart who loves bringing people together. I spend my days building full-stack systems and—my favorite part—mentoring the next generation of engineers. I’m really passionate about bridging the gap between talent in Southeast Asia and opportunities in Europe. When I’m not deep in code, I’m usually coaching teams, helping someone pivot their career, or just geeking out on how to make Agile actually work.
            </p>
          </motion.div>
        </section>

        {/* Soft Skills & Languages (Horizontal Layout) */}
        <section className="max-w-7xl mx-auto mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 gap-12">
              {categories.filter(cat => cat.name !== 'Technical Skills').map((category) => (
                <div key={category.name} className="space-y-6">
                  <h3 className="text-xl font-semibold text-[var(--text-primary)] flex items-center gap-3 border-b border-[var(--border-color)] pb-4">
                    <category.icon className="w-6 h-6 text-brand-red" />
                    {category.name}
                  </h3>

                  <div className="flex flex-wrap gap-4">
                    {skills
                      .filter(skill => skill.category === category.name.toLowerCase().split(' ')[0])
                      .map((skill) => (
                        <div key={skill.name} className="flex-1 min-w-[280px] max-w-[350px]">
                          <ModernCard className="h-full flex items-center gap-4 p-5 hover:border-brand-red/30 transition-all hover:shadow-md hover:-translate-y-1 bg-[var(--card-bg)]">
                            <div className="p-3 bg-[var(--bg-primary)] rounded-xl text-[var(--text-secondary)] group-hover:text-brand-red transition-colors">
                              <FontAwesomeIcon icon={skill.icon} className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-[var(--text-primary)]">{skill.name}</h4>
                              <p className="text-sm text-[var(--text-secondary)] mt-1 leading-snug">{skill.description}</p>
                            </div>
                          </ModernCard>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="max-w-4xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-8">Get in Touch</h2>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-10">
              Whether you're looking to collaborate on a project, need consulting, or just want to chat about tech and talent—I'd love to hear from you!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <ModernCard className="p-6 hover:border-brand-red/30 transition-all hover:shadow-lg hover:-translate-y-1 group">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[var(--bg-primary)] rounded-xl text-[var(--text-secondary)] group-hover:text-brand-red transition-colors">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)] mb-2">Email</h3>
                    <a
                      href="mailto:hello@alvianzf.id"
                      className="text-[var(--text-secondary)] hover:text-brand-red transition-colors"
                    >
                      hello@alvianzf.id
                    </a>
                  </div>
                </div>
              </ModernCard>

              {/* Schedule a Call */}
              <ModernCard className="p-6 hover:border-brand-red/30 transition-all hover:shadow-lg hover:-translate-y-1 group">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[var(--bg-primary)] rounded-xl text-[var(--text-secondary)] group-hover:text-brand-red transition-colors">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)] mb-2">Schedule a Call</h3>
                    <a
                      href="https://calendar.app.google/J3gjDH8fv98BjSHz7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--text-secondary)] hover:text-brand-red transition-colors"
                    >
                      Book a time
                    </a>
                  </div>
                </div>
              </ModernCard>

              {/* LinkedIn */}
              <ModernCard className="p-6 hover:border-brand-red/30 transition-all hover:shadow-lg hover:-translate-y-1 group">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[var(--bg-primary)] rounded-xl text-[var(--text-secondary)] group-hover:text-brand-red transition-colors">
                    <Linkedin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)] mb-2">LinkedIn</h3>
                    <a
                      href="https://linkedin.com/in/alvianzf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--text-secondary)] hover:text-brand-red transition-colors"
                    >
                      linkedin.com/in/alvianzf
                    </a>
                  </div>
                </div>
              </ModernCard>

              {/* GitHub */}
              <ModernCard className="p-6 hover:border-brand-red/30 transition-all hover:shadow-lg hover:-translate-y-1 group">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[var(--bg-primary)] rounded-xl text-[var(--text-secondary)] group-hover:text-brand-red transition-colors">
                    <Github className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)] mb-2">GitHub</h3>
                    <a
                      href="https://github.com/alvianzf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--text-secondary)] hover:text-brand-red transition-colors"
                    >
                      github.com/alvianzf
                    </a>
                  </div>
                </div>
              </ModernCard>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
