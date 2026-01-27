import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import About from './pages/About';
import Experience from './pages/Experience';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Mentorship from './pages/Mentorship';
import WormBackground from './components/WormBackground';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider } from './context/ThemeContext';
import BugSquash from './pages/games/BugSquash';
import QuickSync from './pages/games/QuickSync';
import ElusiveDeploy from './pages/games/ElusiveDeploy';
import LearnFlex from './pages/games/LearnFlex';
import LearnTypeScript from './pages/games/LearnTypeScript';

function App() {
  return (
    <ThemeProvider>
      <HelmetProvider>
        <Router>
          <div className="min-h-screen relative transition-colors duration-300">
            <div className="fixed bottom-4 right-4 z-50">
              <ThemeToggle />
            </div>
            <Suspense fallback={null}>
              <WormBackground />
            </Suspense>
            <Header />
            <main>
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<About />} />
                  <Route path="/experience" element={<Experience />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:postId" element={<BlogPost />} />
                  <Route path="/mentorship" element={<Mentorship />} />
                  <Route path="/games/bug-squash" element={<BugSquash />} />
                  <Route path="/games/quick-sync" element={<QuickSync />} />
                  <Route path="/games/elusive-deploy" element={<ElusiveDeploy />} />
                  <Route path="/games/learn-flex" element={<LearnFlex />} />
                  <Route path="/games/learn-typescript" element={<LearnTypeScript />} />
                </Routes>
              </AnimatePresence>
            </main>
          </div>
        </Router>
      </HelmetProvider>
    </ThemeProvider>
  );
}

export default App;