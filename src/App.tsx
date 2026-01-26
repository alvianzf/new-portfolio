import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import About from './pages/About';
import Experience from './pages/Experience';
import Blog from './pages/Blog';
import SEO from './components/SEO';
import Background3D from './components/Background3D';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 text-slate-900 relative">
          <Suspense fallback={null}>
            <Background3D />
          </Suspense>
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