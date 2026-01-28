import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedium } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 py-16 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand & Description */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-bold tracking-tight text-white hover:text-[#990000] transition-colors mb-4 block">
              AZF.
            </Link>
            <p className="text-slate-400 leading-relaxed text-sm">
              Program Manager, Technical Lead, and Full Stack Engineer bridging the gap between people and technology.
            </p>
          </div>

          {/* Sitemap */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Sitemap</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-[#990000] transition-colors">About</Link>
              </li>
              <li>
                <Link to="/experience" className="hover:text-[#990000] transition-colors">Experience</Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-[#990000] transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/mentorship" className="hover:text-[#990000] transition-colors">Mentorship</Link>
              </li>
            </ul>
          </div>

          {/* Games */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Games</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/games/bug-squash" className="hover:text-[#990000] transition-colors">Bug Squash</Link>
              </li>
              <li>
                <Link to="/games/quick-sync" className="hover:text-[#990000] transition-colors">Quick Sync</Link>
              </li>
              <li>
                <Link to="/games/elusive-deploy" className="hover:text-[#990000] transition-colors">Elusive Deploy</Link>
              </li>
              <li>
                <Link to="/games/learn-flex" className="hover:text-[#990000] transition-colors">Flexbox Froggy</Link>
              </li>
              <li>
                <Link to="/games/learn-typescript" className="hover:text-[#990000] transition-colors">Type Torture</Link>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Connect</h3>
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
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {currentYear} Alvian Zachry Faturrahman. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-500 font-medium">
            <span>Built with React & Vite</span>
            <span>Deployed on Netlify</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
