import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
import About from './pages/About';
import Experience from './pages/Experience';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import SEO from './components/SEO';
import WormBackground from './components/WormBackground';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen text-slate-900 relative">
          <Suspense fallback={null}>
            <WormBackground />
          </Suspense>
          <SEO />
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<About />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:postId" element={<BlogPost />} />
            </Routes>
          </main>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;