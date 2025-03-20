import React from 'react';
import { NavLink } from 'react-router-dom';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white border-b border-gray-700">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <NavLink to="/" className="text-2xl font-bold text-blue-400">Azf.</NavLink>
          <nav className="space-x-6">
            <NavLink to="/" className={({ isActive }) => 
              `hover:text-blue-400 transition-colors ${isActive ? 'text-blue-400' : 'text-gray-300'}`
            }>About</NavLink>
            <NavLink to="/experience" className={({ isActive }) => 
              `hover:text-blue-400 transition-colors ${isActive ? 'text-blue-400' : 'text-gray-300'}`
            }>Experience</NavLink>
            <NavLink to="/blog" className={({ isActive }) => 
              `hover:text-blue-400 transition-colors ${isActive ? 'text-blue-400' : 'text-gray-300'}`
            }>Blog</NavLink>
          </nav>
          <div className="flex space-x-4">
            <a href="https://github.com/alvianzf" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com/in/alvianzf" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors">
              <Linkedin className="w-6 h-6" />
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