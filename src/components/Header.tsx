import { NavLink } from 'react-router-dom';
import { Github, Linkedin, ChevronDown, FileJson, Receipt, CloudRain, MessageSquareWarning, CheckCircle2 } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedium } from '@fortawesome/free-brands-svg-icons';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 transition-all duration-300">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <NavLink to="/" className="text-xl font-bold tracking-tight text-slate-900 hover:text-[#990000] transition-colors">
            AZF.
          </NavLink>

          {/* Minimalist Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {['About', 'Experience', 'Blog'].map((item) => (
              <NavLink
                key={item}
                to={item === 'About' ? '/' : `/${item.toLowerCase()}`}
                className={({ isActive }) =>
                  `text-sm font-medium transition-all hover:text-[#990000] ${isActive ? 'text-[#990000]' : 'text-slate-500'
                  }`
                }
              >
                {item}
              </NavLink>
            ))}

            {/* Tools Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-sm font-medium text-slate-500 hover:text-[#990000] transition-colors py-2">
                <span>Tools</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              <div className="absolute top-full right-0 w-[500px] pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-6 grid grid-cols-2 gap-6 relative">
                  {/* Triangle Arrow */}
                  <div className="absolute -top-2 right-6 w-4 h-4 bg-white border-t border-l border-slate-100 transform rotate-45"></div>

                  {/* Web Apps Category */}
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Web Apps</h3>
                    <div className="space-y-2">
                      <a href="https://jsonify.alvianzf.id" target="_blank" rel="noopener noreferrer" className="block p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors group/item">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover/item:text-[#990000] group-hover/item:bg-red-50 transition-colors">
                            <FileJson className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">JSON Formatter</div>
                            <div className="text-xs text-slate-500">Beautify & debug JSON</div>
                          </div>
                        </div>
                      </a>
                      <a href="https://invoice.alvianzf.id" target="_blank" rel="noopener noreferrer" className="block p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors group/item">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-green-50 text-green-600 rounded-lg group-hover/item:text-[#990000] group-hover/item:bg-red-50 transition-colors">
                            <Receipt className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">Invoice Gen</div>
                            <div className="text-xs text-slate-500">Create professional invoices</div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>

                  {/* NPM Packages Category */}
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">NPM Packages</h3>
                    <div className="space-y-2">
                      <a href="https://www.npmjs.com/package/make-it-rain" target="_blank" rel="noopener noreferrer" className="block p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors group/item">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-purple-50 text-purple-600 rounded-lg group-hover/item:text-[#990000] group-hover/item:bg-red-50 transition-colors">
                            <CloudRain className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">make-it-rain</div>
                            <div className="text-xs text-slate-500">Currency formatting utility</div>
                          </div>
                        </div>
                      </a>
                      <a href="https://www.npmjs.com/package/env-validate-sarcastically" target="_blank" rel="noopener noreferrer" className="block p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors group/item">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg group-hover/item:text-[#990000] group-hover/item:bg-red-50 transition-colors">
                            <MessageSquareWarning className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">env-validate</div>
                            <div className="text-xs text-slate-500">Sarcastic env validation</div>
                          </div>
                        </div>
                      </a>
                      <a href="https://www.npmjs.com/package/a-valid-json" target="_blank" rel="noopener noreferrer" className="block p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors group/item">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-teal-50 text-teal-600 rounded-lg group-hover/item:text-[#990000] group-hover/item:bg-red-50 transition-colors">
                            <CheckCircle2 className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">a-valid-json</div>
                            <div className="text-xs text-slate-500">Strict JSON validation</div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Social Icons - Clean & Minimal */}
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/alvianzf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-[#990000] transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/alvianzf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-[#990000] transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://medium.com/@alvianzf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-[#990000] transition-colors"
            >
              <FontAwesomeIcon icon={faMedium} className="w-5 h-5" />
            </a>
            <a
              href="mailto:alvianzf@gmail.com"
              className="px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-full hover:bg-[#990000] transition-all shadow-sm hover:shadow-md"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}