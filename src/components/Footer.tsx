import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedium, faReact, faCloudflare } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 py-16 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand & Description */}
          <div className="col-span-1 border-b md:border-b-0 border-slate-800 pb-8 md:pb-0">
            <Link to="/" className="text-2xl font-bold tracking-tight text-white hover:text-[#990000] transition-colors mb-4 block">
              azf.
            </Link>
            <p className="text-slate-400 leading-relaxed text-sm mb-6">
              Program Manager, Technical Lead, and Full Stack Engineer bridging the gap between people and technology.
            </p>
            {/* Socials moved here for better mobile density */}
            <div className="flex gap-4">
              <a
                href="https://github.com/alvianzf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 p-2 rounded-lg hover:bg-[#990000] hover:text-white transition-all text-slate-400"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/alvianzf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 p-2 rounded-lg hover:bg-[#990000] hover:text-white transition-all text-slate-400"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://medium.com/@alvianzf"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 p-2 rounded-lg hover:bg-[#990000] hover:text-white transition-all text-slate-400"
                aria-label="Medium"
              >
                <FontAwesomeIcon icon={faMedium} className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@alvianzf.id"
                className="bg-slate-800 p-2 rounded-lg hover:bg-[#990000] hover:text-white transition-all text-slate-400"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Group 1: Site & Games */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider text-[#990000]">Explore</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/experience" className="hover:text-white transition-colors">Experience</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/mentorship" className="hover:text-white transition-colors">Mentorship</Link></li>
              <li className="pt-4 font-bold text-white text-xs uppercase tracking-wider">Games</li>
              <li><Link to="/games/bug-squash" className="hover:text-white transition-colors">Bug Squash</Link></li>
              <li><Link to="/games/quick-sync" className="hover:text-white transition-colors">Quick Sync</Link></li>
              <li><Link to="/games/elusive-deploy" className="hover:text-white transition-colors">Elusive Deploy</Link></li>
              <li><Link to="/games/learn-flex" className="hover:text-white transition-colors">Flexbox Froggy</Link></li>
              <li><Link to="/games/learn-typescript" className="hover:text-white transition-colors">Type Torture</Link></li>
            </ul>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider text-[#990000]">Tools</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="font-semibold text-slate-500 text-xs uppercase pt-1 pb-1">Internal</li>
              <li><Link to="/tools/thesis-creator" className="hover:text-white transition-colors">Thesis Procrastinator</Link></li>
              <li><Link to="/tools/whatsapp-formatter" className="hover:text-white transition-colors">Boomer Text Gen</Link></li>

              <li className="font-semibold text-slate-500 text-xs uppercase pt-4 pb-1">Web Apps</li>
              <li><a href="https://jsonify.alvianzf.id" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Curly Brace Saver</a></li>
              <li><a href="https://invoice.alvianzf.id" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Beg For Money</a></li>
            </ul>
          </div>

          {/* NPM Packages */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider text-[#990000]">NPM Packages</h3>
            <div className="flex flex-col gap-2 text-sm text-slate-400">
              <a href="https://www.npmjs.com/package/make-it-rain" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors group flex items-center gap-2">
                Visual Inflation <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-[#990000]">→</span>
              </a>
              <a href="https://www.npmjs.com/package/env-validate-sarcastically" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors group flex items-center gap-2">
                Env Bully <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-[#990000]">→</span>
              </a>
              <a href="https://www.npmjs.com/package/a-valid-json" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors group flex items-center gap-2">
                Trust Issues <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-[#990000]">→</span>
              </a>
              <a href="https://www.npmjs.com/package/@alvianzf/squiggly-lines-go-brrr" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors group flex items-center gap-2">
                CPU Heater <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-[#990000]">→</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {currentYear} Alvian Zachry Faturrahman. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-slate-500 font-medium items-center">
            <span className="flex items-center gap-1.5">
              Built with
              <FontAwesomeIcon icon={faReact} className="text-[#61DAFB] w-3.5 h-3.5" /> React
              &
              <img src="https://vitejs.dev/logo.svg" alt="Vite" className="w-3.5 h-3.5" /> Vite
            </span>
            <span className="flex items-center gap-1.5">
              Secured by <FontAwesomeIcon icon={faCloudflare} className="text-[#F38020] w-3.5 h-3.5" /> Cloudflare
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
