import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ArrowRight, Download } from 'lucide-react';
import alvian from "../assets/potraits.png";
import { skills, categories } from "../data";
import ModernCard from "../components/ModernCard";

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50 pt-20 overflow-x-hidden">
      <div className="container mx-auto px-6 py-20">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-slate-900 mb-8 leading-tight">
                Alvian
                <br />
                <span className="text-slate-400">Zachry.</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-500 max-w-lg leading-relaxed mb-10">
                Senior Talent Manager & Software Engineer bridging the gap between people and technology.
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="#contact" className="btn-primary flex items-center gap-2 hover:bg-brand-red transition-colors">
                  Get in touch <ArrowRight className="w-4 h-4" />
                </a>
                <a href="/resume.pdf" className="text-slate-600 hover:text-brand-red font-medium flex items-center gap-2 px-6 py-3 transition-colors">
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
        <section className="mb-24 relative space-y-8">
          {/* Row 1: Development & Frameworks (Right to Left) */}
          <div className="max-w-[100vw] overflow-hidden mask-linear-gradient">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="flex w-max gap-8 animate-marquee pause-on-hover py-2"
            >
              {[...skills.filter(s => ['JavaScript & TypeScript', 'Python', 'PHP', 'Laravel', 'CodeIgniter', 'React.js & Next.js', 'Vue.js', 'Node.js & Express.js', 'NestJS'].includes(s.name)), ...skills.filter(s => ['JavaScript & TypeScript', 'Python', 'PHP', 'Laravel', 'CodeIgniter', 'React.js & Next.js', 'Vue.js', 'Node.js & Express.js', 'NestJS'].includes(s.name)), ...skills.filter(s => ['JavaScript & TypeScript', 'Python', 'PHP', 'Laravel', 'CodeIgniter', 'React.js & Next.js', 'Vue.js', 'Node.js & Express.js', 'NestJS'].includes(s.name))].map((skill, index) => (
                <div
                  key={`row1-${skill.name}-${index}`}
                  className="flex items-center gap-2 px-6 py-3 bg-white rounded-full border border-slate-200 shadow-sm whitespace-nowrap group hover:border-brand-red hover:shadow-md transition-all duration-300"
                >
                  <FontAwesomeIcon icon={skill.icon} className="w-5 h-5 text-slate-400 group-hover:text-brand-red transition-colors" />
                  <span className="text-sm font-medium text-slate-600 group-hover:text-brand-red transition-colors">{skill.name}</span>
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
              className="flex w-max gap-8 animate-marquee-reverse pause-on-hover py-2"
            >
              {[...skills.filter(s => !['JavaScript & TypeScript', 'Python', 'PHP', 'Laravel', 'CodeIgniter', 'React.js & Next.js', 'Vue.js', 'Node.js & Express.js', 'NestJS'].includes(s.name) && s.category === 'technical'), ...skills.filter(s => !['JavaScript & TypeScript', 'Python', 'PHP', 'Laravel', 'CodeIgniter', 'React.js & Next.js', 'Vue.js', 'Node.js & Express.js', 'NestJS'].includes(s.name) && s.category === 'technical'), ...skills.filter(s => !['JavaScript & TypeScript', 'Python', 'PHP', 'Laravel', 'CodeIgniter', 'React.js & Next.js', 'Vue.js', 'Node.js & Express.js', 'NestJS'].includes(s.name) && s.category === 'technical')].map((skill, index) => (
                <div
                  key={`row2-${skill.name}-${index}`}
                  className="flex items-center gap-2 px-6 py-3 bg-white rounded-full border border-slate-200 shadow-sm whitespace-nowrap group hover:border-brand-red hover:shadow-md transition-all duration-300"
                >
                  <FontAwesomeIcon icon={skill.icon} className="w-5 h-5 text-slate-400 group-hover:text-brand-red transition-colors" />
                  <span className="text-sm font-medium text-slate-600 group-hover:text-brand-red transition-colors">{skill.name}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Gradient Masks for fading effect */}
          <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>
        </section>

        {/* Biography (About Me) */}
        <section className="max-w-4xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-8">About Me</h2>
            <p className="text-lg text-slate-600 leading-loose">
              Hi, I'm Ary—a versatile tech enthusiast and talent connector.
              Whether developing innovative full-stack solutions or mentoring
              future engineers, I thrive on creating impactful, scalable systems.
              I bridge Southeast Asian talent with European opportunities while
              fostering growth through thoughtful software development and
              tailored education programs. When I'm not working, you'll find me
              refining Agile methodologies, coaching career transitions, or
              empowering engineering teams.
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
                  <h3 className="text-xl font-semibold text-slate-900 flex items-center gap-3 border-b border-slate-200 pb-4">
                    <category.icon className="w-6 h-6 text-brand-red" />
                    {category.name}
                  </h3>

                  <div className="flex flex-wrap gap-4">
                    {skills
                      .filter(skill => skill.category === category.name.toLowerCase().split(' ')[0])
                      .map((skill) => (
                        <div key={skill.name} className="flex-1 min-w-[280px] max-w-[350px]">
                          <ModernCard className="h-full flex items-center gap-4 p-5 hover:border-brand-red/30 transition-all hover:shadow-md hover:-translate-y-1">
                            <div className="p-3 bg-slate-50 rounded-xl text-slate-400 group-hover:text-brand-red transition-colors">
                              <FontAwesomeIcon icon={skill.icon} className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-slate-900">{skill.name}</h4>
                              <p className="text-sm text-slate-500 mt-1 leading-snug">{skill.description}</p>
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
      </div>
    </div>
  );
}
