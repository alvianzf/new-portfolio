import React from 'react';
import { Analytics } from "@vercel/analytics/react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import About from './pages/About';
import Experience from './pages/Experience';
import Blog from './pages/Blog';
import SEO from './components/SEO';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-gray-900">
          <SEO />
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<About />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/blog" element={<Blog />} />
            </Routes>
          </main>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;