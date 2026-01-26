import React from 'react';
import { NavLink } from 'react-router-dom';
import { Github, Linkedin, Mail, FileJson, Receipt, ChevronDown, User, Briefcase, BookOpen, CloudRain, MessageSquareWarning, CheckCircle2 } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedium } from '@fortawesome/free-brands-svg-icons';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white border-b border-gray-700">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <NavLink to="/" className="text-2xl font-bold text-blue-400">Azf.</NavLink>
          <nav className="flex items-center space-x-6">
            <NavLink to="/" className={({ isActive }) =>
              `flex items-center space-x-2 hover:text-blue-400 transition-colors ${isActive ? 'text-blue-400' : 'text-gray-300'}`
            }>
              <User className="w-4 h-4" />
              <span>About</span>
            </NavLink>
            <NavLink to="/experience" className={({ isActive }) =>
              `flex items-center space-x-2 hover:text-blue-400 transition-colors ${isActive ? 'text-blue-400' : 'text-gray-300'}`
            }>
              <Briefcase className="w-4 h-4" />
              <span>Experience</span>
            </NavLink>
            <NavLink to="/blog" className={({ isActive }) =>
              `flex items-center space-x-2 hover:text-blue-400 transition-colors ${isActive ? 'text-blue-400' : 'text-gray-300'}`
            }>
              <BookOpen className="w-4 h-4" />
              <span>Blog</span>
            </NavLink>

            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-300 hover:text-blue-400 transition-colors py-2">
                <span>Stupid tools I made</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Mega Menu Dropdown */}
              <div className="absolute right-0 top-full mt-0 w-[600px] bg-gray-800 border border-gray-700 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50 p-4">
                <div className="grid grid-cols-2 gap-6">
                  {/* Category: Web Apps */}
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">Web Apps</h3>
                    <div className="space-y-1">
                      <a href="https://jsonify.alvianzf.id" target="_blank" rel="noopener noreferrer" className="flex items-start px-2 py-2 rounded-md hover:bg-gray-700 group/item transition-colors">
                        <FileJson className="w-5 h-5 mr-3 text-blue-400 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium text-gray-200 group-hover/item:text-blue-400 transition-colors">JSON Formatter</div>
                          <div className="text-xs text-gray-400">Beautify and debug your JSON data</div>
                        </div>
                      </a>
                      <a href="https://invoice.alvianzf.id" target="_blank" rel="noopener noreferrer" className="flex items-start px-2 py-2 rounded-md hover:bg-gray-700 group/item transition-colors">
                        <Receipt className="w-5 h-5 mr-3 text-green-400 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium text-gray-200 group-hover/item:text-blue-400 transition-colors">Invoice Generator</div>
                          <div className="text-xs text-gray-400">Generate professional invoices instantly</div>
                        </div>
                      </a>
                    </div>
                  </div>

                  {/* Category: NPM Packages */}
                  <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">NPM Packages</h3>
                    <div className="space-y-1">
                      <a href="https://www.npmjs.com/package/make-it-rain" target="_blank" rel="noopener noreferrer" className="flex items-start px-2 py-2 rounded-md hover:bg-gray-700 group/item transition-colors">
                        <CloudRain className="w-5 h-5 mr-3 text-purple-400 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium text-gray-200 group-hover/item:text-blue-400 transition-colors">make-it-rain</div>
                          <div className="text-xs text-gray-400">The Only Money Formatter You'll Ever Need (Probably)</div>
                        </div>
                      </a>
                      <a href="https://www.npmjs.com/package/env-validate-sarcastically" target="_blank" rel="noopener noreferrer" className="flex items-start px-2 py-2 rounded-md hover:bg-gray-700 group/item transition-colors">
                        <MessageSquareWarning className="w-5 h-5 mr-3 text-yellow-400 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium text-gray-200 group-hover/item:text-blue-400 transition-colors">env-validate-sarcastically</div>
                          <div className="text-xs text-gray-400">Because forgetting .env variables is your full-time job</div>
                        </div>
                      </a>
                      <a href="https://www.npmjs.com/package/a-valid-json" target="_blank" rel="noopener noreferrer" className="flex items-start px-2 py-2 rounded-md hover:bg-gray-700 group/item transition-colors">
                        <CheckCircle2 className="w-5 h-5 mr-3 text-teal-400 mt-0.5" />
                        <div>
                          <div className="text-sm font-medium text-gray-200 group-hover/item:text-blue-400 transition-colors">a-valid-json</div>
                          <div className="text-xs text-gray-400">A simple utility to validate JSON strings or objects</div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
          <div className="flex space-x-4">
            <a href="https://github.com/alvianzf" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com/in/alvianzf" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="https://medium.com/@alvianzf" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors">
              <FontAwesomeIcon icon={faMedium} className="w-6 h-6" />
            </a>
            <a href="mailto:alvianzf@gmail.com" className="text-gray-300 hover:text-blue-400 transition-colors">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}