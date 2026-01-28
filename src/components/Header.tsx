import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Github, Linkedin, ChevronDown, FileJson, Receipt, CloudRain, MessageSquareWarning, CheckCircle2, Menu, X, Terminal } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedium } from '@fortawesome/free-brands-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-md border-b border-slate-200 transition-all duration-300">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900 hover:text-[#990000] transition-colors z-50">
            <span className="flex items-center gap-1">
              <Terminal className="w-5 h-5 text-[#990000]" />
              azf.
            </span>
          </NavLink>

          {/* Regular Navigation (Tablet & Desktop) */}
          <nav className="hidden md:flex items-center space-x-8">
            {['Home', 'Experience', 'Blog', 'Mentorship', 'About'].map((item) => (
              <NavLink
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className={({ isActive }) =>
                  `text-sm font-medium transition-all hover:text-[#990000] ${isActive ? 'text-[#990000]' : 'text-slate-500'
                  }`
                }
              >
                {item}
              </NavLink>
            ))}

            {/* Games Dropdown (Desktop) */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-sm font-medium text-slate-500 hover:text-[#990000] transition-colors py-2">
                <span>Games</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top">
                <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-6 grid grid-cols-2 gap-8 relative">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-slate-100 transform rotate-45"></div>

                  {/* Category: Waste Time */}
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Waste Time</h3>
                    <div className="space-y-2">
                      <NavLink to="/games/bug-squash" className="block p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors group/item">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-red-50 text-red-600 rounded-lg group-hover/item:text-[#990000] transition-colors">
                            <i className="fas fa-bug w-5 h-5 flex items-center justify-center">🐞</i>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">Bug Squash</div>
                            <div className="text-xs text-slate-500">Whack-a-Bug (Stress Relief)</div>
                          </div>
                        </div>
                      </NavLink>
                      <NavLink to="/games/quick-sync" className="block p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors group/item">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover/item:text-[#990000] transition-colors">
                            <i className="fas fa-calendar-minus w-5 h-5 flex items-center justify-center">📅</i>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">Quick Sync Dodge</div>
                            <div className="text-xs text-slate-500">Avoid the calendar invites</div>
                          </div>
                        </div>
                      </NavLink>
                      <NavLink to="/games/elusive-deploy" className="block p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors group/item">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-orange-50 text-orange-600 rounded-lg group-hover/item:text-[#990000] transition-colors">
                            <i className="fas fa-rocket w-5 h-5 flex items-center justify-center">🚀</i>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">Elusive Deploy</div>
                            <div className="text-xs text-slate-500">Try to click the button</div>
                          </div>
                        </div>
                      </NavLink>
                    </div>
                  </div>

                  {/* Category: Actually Learn (Sarcastic) */}
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">"Actually" Learn</h3>
                    <div className="space-y-2">
                      <NavLink to="/games/learn-flex" className="block p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors group/item">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-purple-50 text-purple-600 rounded-lg group-hover/item:text-[#990000] transition-colors">
                            <div className="w-5 h-5 flex items-center justify-center font-bold border-2 border-current rounded text-[10px]">CSS</div>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">Flexbox Froggy</div>
                            <div className="text-xs text-slate-500">Center a div correctly</div>
                          </div>
                        </div>
                      </NavLink>
                      <NavLink to="/games/learn-typescript" className="block p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors group/item">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover/item:text-[#990000] transition-colors">
                            <div className="w-5 h-5 flex items-center justify-center font-bold text-[10px]">TS</div>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">Type Torture</div>
                            <div className="text-xs text-slate-500">Fix the red squiggly lines</div>
                          </div>
                        </div>
                      </NavLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tools Dropdown (Desktop) */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-sm font-medium text-slate-500 hover:text-[#990000] transition-colors py-2">
                <span>Tools</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              <div className="absolute top-full right-0 w-[500px] pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-6 grid grid-cols-2 gap-6 relative">
                  <div className="absolute -top-2 right-6 w-4 h-4 bg-white border-t border-l border-slate-100 transform rotate-45"></div>

                  {/* Internal Tools Category */}
                  <div className="col-span-2 border-b border-slate-100 pb-4 mb-2">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Productivity Killers</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {/* Latex Editor - Desktop Only */}
                      <NavLink to="/tools/thesis-creator" className="hidden md:block p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors group/item relative overflow-hidden">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-slate-100 text-slate-700 rounded-lg group-hover/item:text-[#990000] transition-colors">
                            <Receipt className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">Thesis Procrastinator</div>
                            <div className="text-xs text-slate-500">Solve relativity instead of working</div>
                          </div>
                        </div>
                      </NavLink>

                      {/* WhatsApp Formatter */}
                      <NavLink to="/tools/whatsapp-formatter" className="block p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors group/item">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-green-50 text-green-600 rounded-lg group-hover/item:text-[#990000] transition-colors">
                            <MessageSquareWarning className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">Boomer Text Gen</div>
                            <div className="text-xs text-slate-500">Formatting for family group chats</div>
                          </div>
                        </div>
                      </NavLink>
                    </div>
                  </div>

                  {/* Web Apps Category */}
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Over-Engineered</h3>
                    <div className="space-y-2">
                      <a href="https://jsonify.alvianzf.id" target="_blank" rel="noopener noreferrer" className="block p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors group/item">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-red-50 text-[#990000] rounded-lg">
                            <FileJson className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">Curly Brace Saver</div>
                            <div className="text-xs text-slate-500">Make ugly APIs look pretty</div>
                          </div>
                        </div>
                      </a>
                      <a href="https://invoice.alvianzf.id" target="_blank" rel="noopener noreferrer" className="block p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors group/item">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-green-50 text-green-600 rounded-lg group-hover/item:text-[#990000] transition-colors">
                            <Receipt className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">Beg For Money</div>
                            <div className="text-xs text-slate-500">PDFs for clients who won't pay</div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>

                  {/* NPM Packages Category */}
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Node_Modules Bloat</h3>
                    <div className="space-y-2">
                      <a href="https://www.npmjs.com/package/make-it-rain" target="_blank" rel="noopener noreferrer" className="block p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors group/item">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-purple-50 text-purple-600 rounded-lg group-hover/item:text-[#990000] transition-colors">
                            <CloudRain className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">Visual Inflation</div>
                            <div className="text-xs text-slate-500">Handles the tough job of making your numbers actually readable</div>
                          </div>
                        </div>
                      </a>
                      <a href="https://www.npmjs.com/package/env-validate-sarcastically" target="_blank" rel="noopener noreferrer" className="block p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors group/item">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg group-hover/item:text-[#990000] transition-colors">
                            <MessageSquareWarning className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">Env Bully</div>
                            <div className="text-xs text-slate-500">Yells at you for missing keys</div>
                          </div>
                        </div>
                      </a>
                      <a href="https://www.npmjs.com/package/a-valid-json" target="_blank" rel="noopener noreferrer" className="block p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors group/item">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-teal-50 text-teal-600 rounded-lg group-hover/item:text-[#990000] transition-colors">
                            <CheckCircle2 className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">Trust Issues</div>
                            <div className="text-xs text-slate-500">Paranoid JSON validation</div>
                          </div>
                        </div>
                      </a>
                      <a href="https://www.npmjs.com/package/@alvianzf/squiggly-lines-go-brrr" target="_blank" rel="noopener noreferrer" className="block p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors group/item">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-pink-50 text-pink-600 rounded-lg group-hover/item:text-[#990000] transition-colors">
                            <i className="w-5 h-5 flex items-center justify-center">🪱</i>
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">CPU Heater</div>
                            <div className="text-xs text-slate-500">Laggy background lines</div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Social Icons & Hamburger (Mobile and Desktop) */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="hidden sm:flex items-center space-x-2 md:space-x-4">
              <a href="https://github.com/alvianzf" target="_blank" rel="noopener noreferrer" className="relative group text-slate-400 hover:text-[#990000] transition-colors">
                <Github className="w-5 h-5" />
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">GitHub</span>
              </a>
              <a href="https://linkedin.com/in/alvianzf" target="_blank" rel="noopener noreferrer" className="relative group text-slate-400 hover:text-[#990000] transition-colors">
                <Linkedin className="w-5 h-5" />
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">LinkedIn</span>
              </a>
              <a href="https://medium.com/@alvianzf" target="_blank" rel="noopener noreferrer" className="relative group text-slate-400 hover:text-[#990000] transition-colors">
                <FontAwesomeIcon icon={faMedium} className="w-5 h-5" />
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Medium</span>
              </a>
              <a href="mailto:hello@alvianzf.id" className="hidden lg:block px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-full hover:bg-[#990000] transition-all shadow-sm hover:shadow-md">
                Contact
              </a>
            </div>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-[#990000] transition-colors z-50 rounded-lg hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[73px] left-0 right-0 bottom-0 h-[calc(100vh-73px)] bg-white z-40 md:hidden overflow-y-auto"
          >
            <div className="container mx-auto px-6 py-8 flex flex-col space-y-8">
              {/* Navigation Links */}
              <div className="flex flex-col space-y-6">
                {['Home', 'Experience', 'Blog', 'Mentorship', 'About'].map((item) => (
                  <NavLink
                    key={item}
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className={({ isActive }) =>
                      `text-2xl font-bold transition-all ${isActive ? 'text-[#990000]' : 'text-slate-900'}`
                    }
                  >
                    {item}
                  </NavLink>
                ))}

                {/* Mobile Tools Dropdown */}
                <div className="flex flex-col space-y-4">
                  <button
                    onClick={() => setIsToolsOpen(!isToolsOpen)}
                    className="flex items-center justify-between text-2xl font-bold text-slate-900"
                  >
                    <span>Tools</span>
                    <motion.div animate={{ rotate: isToolsOpen ? 180 : 0 }}>
                      <ChevronDown className="w-6 h-6" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isToolsOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden space-y-4 pl-4 border-l-2 border-slate-100"
                      >
                        <div className="space-y-4 pt-2">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Productivity Killers</p>
                          <NavLink to="/tools/whatsapp-formatter" className="flex items-center gap-3 text-slate-600 font-medium">
                            <MessageSquareWarning className="w-5 h-5 text-green-600" /> Boomer Text Gen
                          </NavLink>
                          {/* Latex Editor is hidden on mobile */}
                        </div>
                        <div className="space-y-4 pt-2">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Over-Engineered</p>
                          <a href="https://jsonify.alvianzf.id" className="flex items-center gap-3 text-slate-600 font-medium">
                            <FileJson className="w-5 h-5 text-[#990000]" /> Curly Brace Saver
                          </a>
                          <a href="https://invoice.alvianzf.id" className="flex items-center gap-3 text-slate-600 font-medium">
                            <Receipt className="w-5 h-5 text-green-600" /> Beg For Money
                          </a>
                        </div>
                        <div className="space-y-4 pt-2">
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Node_Modules Bloat</p>
                          <a href="https://www.npmjs.com/package/make-it-rain" className="flex items-center gap-3 text-slate-600 font-medium">
                            <CloudRain className="w-5 h-5 text-purple-600" /> Visual Inflation
                          </a>
                          <a href="https://www.npmjs.com/package/env-validate-sarcastically" className="flex items-center gap-3 text-slate-600 font-medium">
                            <MessageSquareWarning className="w-5 h-5 text-yellow-600" /> Env Bully
                          </a>
                          <a href="https://www.npmjs.com/package/@alvianzf/squiggly-lines-go-brrr" className="flex items-center gap-3 text-slate-600 font-medium">
                            <span className="w-5 h-5 flex items-center justify-center">🪱</span> CPU Heater
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Social and Contact */}
              <div className="pt-8 border-t border-slate-100">
                <div className="flex items-center space-x-6 mb-8">
                  <a href="https://github.com/alvianzf" className="text-slate-400 hover:text-[#990000] transition-colors">
                    <Github className="w-8 h-8" />
                  </a>
                  <a href="https://linkedin.com/in/alvianzf" className="text-slate-400 hover:text-[#990000] transition-colors">
                    <Linkedin className="w-8 h-8" />
                  </a>
                  <a href="https://medium.com/@alvianzf" className="text-slate-400 hover:text-[#990000] transition-colors">
                    <FontAwesomeIcon icon={faMedium} className="w-8 h-8" />
                  </a>
                </div>
                <a
                  href="mailto:hello@alvianzf.id"
                  className="block w-full text-center px-6 py-4 text-lg font-bold text-white bg-slate-900 rounded-2xl hover:bg-[#990000] transition-all shadow-lg"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}