import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ArrowRight, Download } from 'lucide-react';
import alvian from "../assets/potraits.png";
import { skills, categories } from "../data";
import ModernCard from "../components/ModernCard";

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <div className="container mx-auto px-6 py-20">
        {/* Hero Section */}
        <section className="mb-32">
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
                <a href="#contact" className="btn-primary flex items-center gap-2">
                  Get in touch <ArrowRight className="w-4 h-4" />
                </a>
                <a href="/resume.pdf" className="text-slate-600 hover:text-slate-900 font-medium flex items-center gap-2 px-6 py-3 transition-colors">
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
              <div className="absolute inset-0 bg-blue-100 rounded-full blur-3xl opacity-30 transform translate-x-10 translate-y-10"></div>
              <img
                src={alvian}
                alt="Alvian Zachry"
                className="relative rounded-2xl w-full max-w-md mx-auto shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>
          </div>
        </section>

        {/* Biography */}
        <section className="max-w-4xl mx-auto mb-32">
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

        {/* Skills Grid */}
        <section>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-16 text-center">Technical Expertise</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category, i) => (
                <div key={category.name} className="space-y-6">
                  <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <category.icon className="w-5 h-5 text-blue-600" />
                    {category.name}
                  </h3>

                  <div className="space-y-4">
                    {skills
                      .filter(skill => skill.category === category.name.toLowerCase().split(' ')[0])
                      .map((skill, j) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 + j * 0.05 }}
                        >
                          <ModernCard className="flex items-start gap-4 hover:border-blue-200 group cursor-default">
                            <div className="p-2 bg-slate-50 rounded-lg text-slate-600 group-hover:text-blue-600 transition-colors">
                              <FontAwesomeIcon icon={skill.icon} className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="font-medium text-slate-900">{skill.name}</h4>
                              <p className="text-sm text-slate-500 mt-1">{skill.description}</p>
                            </div>
                          </ModernCard>
                        </motion.div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
