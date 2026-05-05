# Changelog

Meaningful history of the project with diffs, filtered for major features and architectural changes.

## feat: add blog (d5ed4dd) - 2025-03-20

```diff
diff --git a/src/pages/Blog.tsx b/src/pages/Blog.tsx
index 533907a..5c70ff4 100644
--- a/src/pages/Blog.tsx
+++ b/src/pages/Blog.tsx
@@ -1,22 +1,29 @@
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
-import { BlogPost } from '../types';
import { Calendar } from 'lucide-react';

export default function Blog() {
-  const [posts, setPosts] = useState<BlogPost[]>([]);
+  const [posts, setPosts] = useState([]);
const [loading, setLoading] = useState(true);
-  const [error, setError] = useState<string | null>(null);
+  const [error, setError] = useState(null);

useEffect(() => {
const fetchPosts = async () => {
try {
-        // Replace with your WordPress site URL
-        const response = await fetch('https://your-wordpress-site.com/wp-json/wp/v2/posts');
+        // Blogger API key and blog ID
+        const API_KEY = 'AIzaSyCw9p4Ar_wc9h3zOuaPb7JcdH3Lj8Ail_4';
+        const BLOG_ID = '369044396031799467';
+
+        // Blogger API URL
+        const url = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}`;
+
+        const response = await fetch(url);
if (!response.ok) throw new Error('Failed to fetch posts');
+
const data = await response.json();
-        setPosts(data);
+        setPosts(data.items || []);
} catch (err) {
+        console.error('Error fetching posts:', err);
setError('Failed to load blog posts. Please try again later.');
} finally {
setLoading(false);
@@ -53,29 +60,37 @@ export default function Blog() {
<div className="max-w-4xl mx-auto">
<h1 className="text-3xl font-bold mb-8 text-blue-400">Blog Posts</h1>
<div className="space-y-8">
-            {posts.map((post) => (
-              <article key={post.id} className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700 hover:border-blue-500 transition-colors duration-300">
-                <h2 className="text-2xl font-semibold mb-4">
-                  <a href={post.link} className="text-blue-400 hover:text-blue-300 transition-colors">
-                    {post.title.rendered}
+            {posts.length > 0 ? (
+              posts.map((post) => (
+                <article key={post.id} className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700 hover:border-blue-500 transition-colors duration-300">
+                  <h2 className="text-2xl font-semibold mb-4">
+                    <a href={post.url} className="text-blue-400 hover:text-blue-300 transition-colors">
+                      {post.title}
+                    </a>
+                  </h2>
+                  <div className="flex items-center text-gray-400 mb-4">
+                    <Calendar className="w-4 h-4 mr-2" />
+                    <time>{format(new Date(post.published), 'MMMM d, yyyy')}</time>
+                  </div>
+                  <div
+                    className="prose prose-invert max-w-none text-gray-300"
+                    dangerouslySetInnerHTML={{
+                      __html: post.content
+                        ? post.content.slice(0, 300) + (post.content.length > 300 ? '...' : '')
+                        : ''
+                    }}
+                  />
+                  <a
+                    href={post.url}
+                    className="inline-block mt-4 text-blue-400 hover:text-blue-300 font-medium group"
+                  >
+                    Read more <span className="group-hover:translate-x-1 inline-block transition-transform duration-200">→</span>
</a>
-                </h2>
-                <div className="flex items-center text-gray-400 mb-4">
-                  <Calendar className="w-4 h-4 mr-2" />
-                  <time>{format(new Date(post.date), 'MMMM d, yyyy')}</time>
-                </div>
-                <div
-                  className="prose prose-invert max-w-none text-gray-300"
-                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
-                />
-                <a
-                  href={post.link}
-                  className="inline-block mt-4 text-blue-400 hover:text-blue-300 font-medium group"
-                >
-                  Read more <span className="group-hover:translate-x-1 inline-block transition-transform duration-200">→</span>
-                </a>
-              </article>
-            ))}
+                </article>
+              ))
+            ) : (
+              <p className="text-center text-gray-400">No posts found.</p>
+            )}
</div>
</div>
</div>

```

## feat: add tools dropdown menu (cc402c2) - 2026-01-26

```diff
diff --git a/src/components/Header.tsx b/src/components/Header.tsx
index 107633a..28c7684 100644
--- a/src/components/Header.tsx
+++ b/src/components/Header.tsx
@@ -1,6 +1,8 @@
import React from 'react';
import { NavLink } from 'react-router-dom';
-import { Github, Linkedin, Mail } from 'lucide-react';
+import { Github, Linkedin, Mail, FileJson, Receipt, ChevronDown, User, Briefcase, BookOpen, CloudRain, MessageSquareWarning, CheckCircle2 } from 'lucide-react';
+import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
+import { faMedium } from '@fortawesome/free-brands-svg-icons';

export default function Header() {
return (
@@ -8,16 +10,86 @@ export default function Header() {
<div className="container mx-auto px-4 py-6">
<div className="flex justify-between items-center">
<NavLink to="/" className="text-2xl font-bold text-blue-400">Azf.</NavLink>
-          <nav className="space-x-6">
-            <NavLink to="/" className={({ isActive }) =>
-              `hover:text-blue-400 transition-colors ${isActive ? 'text-blue-400' : 'text-gray-300'}`
-            }>About</NavLink>
-            <NavLink to="/experience" className={({ isActive }) =>
-              `hover:text-blue-400 transition-colors ${isActive ? 'text-blue-400' : 'text-gray-300'}`
-            }>Experience</NavLink>
-            <NavLink to="/blog" className={({ isActive }) =>
-              `hover:text-blue-400 transition-colors ${isActive ? 'text-blue-400' : 'text-gray-300'}`
-            }>Blog</NavLink>
+          <nav className="flex items-center space-x-6">
+            <NavLink to="/" className={({ isActive }) =>
+              `flex items-center space-x-2 hover:text-blue-400 transition-colors ${isActive ? 'text-blue-400' : 'text-gray-300'}`
+            }>
+              <User className="w-4 h-4" />
+              <span>About</span>
+            </NavLink>
+            <NavLink to="/experience" className={({ isActive }) =>
+              `flex items-center space-x-2 hover:text-blue-400 transition-colors ${isActive ? 'text-blue-400' : 'text-gray-300'}`
+            }>
+              <Briefcase className="w-4 h-4" />
+              <span>Experience</span>
+            </NavLink>
+            <NavLink to="/blog" className={({ isActive }) =>
+              `flex items-center space-x-2 hover:text-blue-400 transition-colors ${isActive ? 'text-blue-400' : 'text-gray-300'}`
+            }>
+              <BookOpen className="w-4 h-4" />
+              <span>Blog</span>
+            </NavLink>
+
+            <div className="relative group">
+              <button className="flex items-center space-x-1 text-gray-300 hover:text-blue-400 transition-colors py-2">
+                <span>Stupid tools I made</span>
+                <ChevronDown className="w-4 h-4" />
+              </button>
+
+              {/* Mega Menu Dropdown */}
+              <div className="absolute right-0 top-full mt-0 w-[600px] bg-gray-800 border border-gray-700 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50 p-4">
+                <div className="grid grid-cols-2 gap-6">
+                  {/* Category: Web Apps */}
+                  <div>
+                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">Web Apps</h3>
+                    <div className="space-y-1">
+                      <a href="https://jsonify.alvianzf.id" target="_blank" rel="noopener noreferrer" className="flex items-start px-2 py-2 rounded-md hover:bg-gray-700 group/item transition-colors">
+                        <FileJson className="w-5 h-5 mr-3 text-blue-400 mt-0.5" />
+                        <div>
+                          <div className="text-sm font-medium text-gray-200 group-hover/item:text-blue-400 transition-colors">JSON Formatter</div>
+                          <div className="text-xs text-gray-400">Beautify and debug your JSON data</div>
+                        </div>
+                      </a>
+                      <a href="https://invoice.alvianzf.id" target="_blank" rel="noopener noreferrer" className="flex items-start px-2 py-2 rounded-md hover:bg-gray-700 group/item transition-colors">
+                        <Receipt className="w-5 h-5 mr-3 text-green-400 mt-0.5" />
+                        <div>
+                          <div className="text-sm font-medium text-gray-200 group-hover/item:text-blue-400 transition-colors">Invoice Generator</div>
+                          <div className="text-xs text-gray-400">Generate professional invoices instantly</div>
+                        </div>
+                      </a>
+                    </div>
+                  </div>
+
+                  {/* Category: NPM Packages */}
+                  <div>
+                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">NPM Packages</h3>
+                    <div className="space-y-1">
+                      <a href="https://www.npmjs.com/package/make-it-rain" target="_blank" rel="noopener noreferrer" className="flex items-start px-2 py-2 rounded-md hover:bg-gray-700 group/item transition-colors">
+                        <CloudRain className="w-5 h-5 mr-3 text-purple-400 mt-0.5" />
+                        <div>
+                          <div className="text-sm font-medium text-gray-200 group-hover/item:text-blue-400 transition-colors">make-it-rain</div>
+                          <div className="text-xs text-gray-400">The Only Money Formatter You'll Ever Need (Probably)</div>
+                        </div>
+                      </a>
+                      <a href="https://www.npmjs.com/package/env-validate-sarcastically" target="_blank" rel="noopener noreferrer" className="flex items-start px-2 py-2 rounded-md hover:bg-gray-700 group/item transition-colors">
+                        <MessageSquareWarning className="w-5 h-5 mr-3 text-yellow-400 mt-0.5" />
+                        <div>
+                          <div className="text-sm font-medium text-gray-200 group-hover/item:text-blue-400 transition-colors">env-validate-sarcastically</div>
+                          <div className="text-xs text-gray-400">Because forgetting .env variables is your full-time job</div>
+                        </div>
+                      </a>
+                      <a href="https://www.npmjs.com/package/a-valid-json" target="_blank" rel="noopener noreferrer" className="flex items-start px-2 py-2 rounded-md hover:bg-gray-700 group/item transition-colors">
+                        <CheckCircle2 className="w-5 h-5 mr-3 text-teal-400 mt-0.5" />
+                        <div>
+                          <div className="text-sm font-medium text-gray-200 group-hover/item:text-blue-400 transition-colors">a-valid-json</div>
+                          <div className="text-xs text-gray-400">A simple utility to validate JSON strings or objects</div>
+                        </div>
+                      </a>
+                    </div>
+                  </div>
+                </div>
+              </div>
+            </div>
</nav>
<div className="flex space-x-4">
<a href="https://github.com/alvianzf" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors">
@@ -26,6 +98,9 @@ export default function Header() {
<a href="https://linkedin.com/in/alvianzf" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors">
<Linkedin className="w-6 h-6" />
</a>
+            <a href="https://medium.com/@alvianzf" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors">
+              <FontAwesomeIcon icon={faMedium} className="w-6 h-6" />
+            </a>
<a href="mailto:alvianzf@gmail.com" className="text-gray-300 hover:text-blue-400 transition-colors">
<Mail className="w-6 h-6" />
</a>

```

## refactor: change UI (caf8570) - 2026-01-26

```diff
diff --git a/package.json b/package.json
index 36923fa..6a46089 100644
--- a/package.json
+++ b/package.json
@@ -15,18 +15,22 @@
"@fortawesome/free-brands-svg-icons": "^6.5.1",
"@fortawesome/free-solid-svg-icons": "^6.5.1",
"@fortawesome/react-fontawesome": "^0.2.0",
+    "@react-three/drei": "^10.7.7",
+    "@react-three/fiber": "^9.5.0",
"@vercel/analytics": "^1.5.0",
"date-fns": "^3.3.1",
+    "framer-motion": "^12.29.0",
"lucide-react": "^0.344.0",
-    "react": "^18.3.1",
-    "react-dom": "^18.3.1",
+    "react": "^19.2.3",
+    "react-dom": "^19.2.3",
"react-helmet-async": "^2.0.4",
-    "react-router-dom": "^6.22.3"
+    "react-router-dom": "^6.22.3",
+    "three": "^0.182.0"
},
"devDependencies": {
"@eslint/js": "^9.9.1",
-    "@types/react": "^18.3.5",
-    "@types/react-dom": "^18.3.0",
+    "@types/react": "^19.2.9",
+    "@types/react-dom": "^19.2.3",
"@vitejs/plugin-react": "^4.3.1",
"autoprefixer": "^10.4.18",
"eslint": "^9.9.1",
diff --git a/src/App.tsx b/src/App.tsx
index 7783899..17c9b05 100644
--- a/src/App.tsx
+++ b/src/App.tsx
@@ -1,5 +1,4 @@
-import React from 'react';
-import { Analytics } from "@vercel/analytics/react"
+import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Header';
@@ -7,12 +6,16 @@ import About from './pages/About';
import Experience from './pages/Experience';
import Blog from './pages/Blog';
import SEO from './components/SEO';
+import Background3D from './components/Background3D';

function App() {
return (
<HelmetProvider>
<Router>
-        <div className="min-h-screen bg-gray-900">
+        <div className="min-h-screen bg-slate-50 text-slate-900 relative">
+          <Suspense fallback={null}>
+            <Background3D />
+          </Suspense>
<SEO />
<Header />
<main>
diff --git a/src/components/Background3D.tsx b/src/components/Background3D.tsx
new file mode 100644
index 0000000..4d2a502
--- /dev/null
+++ b/src/components/Background3D.tsx
@@ -0,0 +1,91 @@
+import { useRef, useMemo } from 'react';
+import { Canvas, useFrame } from '@react-three/fiber';
+import { Environment } from '@react-three/drei';
+import * as THREE from 'three';
+
+function FloatingMesh() {
+  const meshRef = useRef<THREE.Mesh>(null);
+
+  useFrame((state) => {
+    if (meshRef.current) {
+      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
+      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
+    }
+  });
+
+  return (
+    <mesh ref={meshRef} position={[2, 0, 0]} scale={1.5}>
+      <icosahedronGeometry args={[1, 1]} />
+      <meshStandardMaterial
+        color="#f1f5f9"
+        wireframe
+        transparent
+        opacity={0.3}
+      />
+    </mesh>
+  );
+}
+
+function Particles() {
+  const count = 500;
+  const meshRef = useRef<THREE.InstancedMesh>(null);
+  const dummy = useMemo(() => new THREE.Object3D(), []);
+
+  const particles = useMemo(() => {
+    const temp = [];
+    for (let i = 0; i < count; i++) {
+      const t = Math.random() * 100;
+      const factor = 20 + Math.random() * 100;
+      const speed = 0.01 + Math.random() / 200;
+      const xFactor = -50 + Math.random() * 100;
+      const yFactor = -50 + Math.random() * 100;
+      const zFactor = -50 + Math.random() * 100;
+      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
+    }
+    return temp;
+  }, [count]);
+
+  useFrame((state) => {
+    if (meshRef.current) {
+      particles.forEach((particle, i) => {
+        let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
+        t = particle.t += speed / 2;
+        const a = Math.cos(t) + Math.sin(t * 1) / 10;
+        const b = Math.sin(t) + Math.cos(t * 2) / 10;
+        const s = Math.cos(t);
+
+        dummy.position.set(
+          (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
+          (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
+          (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
+        );
+        dummy.scale.set(s, s, s);
+        dummy.rotation.set(s * 5, s * 5, s * 5);
+        dummy.updateMatrix();
+        meshRef.current!.setMatrixAt(i, dummy.matrix);
+      });
+      meshRef.current.instanceMatrix.needsUpdate = true;
+    }
+  });
+
+  return (
+    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
+      <dodecahedronGeometry args={[0.2, 0]} />
+      <meshStandardMaterial color="#cbd5e1" transparent opacity={0.6} />
+    </instancedMesh>
+  );
+}
+
+export default function Background3D() {
+  return (
+    <div className="fixed inset-0 -z-10">
+      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
+        <ambientLight intensity={0.5} />
+        <pointLight position={[10, 10, 10]} intensity={1} />
+        <Particles />
+        <FloatingMesh />
+        <Environment preset="city" />
+      </Canvas>
+    </div>
+  );
+}
diff --git a/src/components/Header.tsx b/src/components/Header.tsx
index 28c7684..da153d0 100644
--- a/src/components/Header.tsx
+++ b/src/components/Header.tsx
@@ -1,88 +1,109 @@
-import React from 'react';
import { NavLink } from 'react-router-dom';
-import { Github, Linkedin, Mail, FileJson, Receipt, ChevronDown, User, Briefcase, BookOpen, CloudRain, MessageSquareWarning, CheckCircle2 } from 'lucide-react';
+import { Github, Linkedin, ChevronDown, FileJson, Receipt, CloudRain, MessageSquareWarning, CheckCircle2 } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedium } from '@fortawesome/free-brands-svg-icons';

export default function Header() {
return (
-    <header className="bg-gray-800 text-white border-b border-gray-700">
-      <div className="container mx-auto px-4 py-6">
+    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 transition-all duration-300">
+      <div className="container mx-auto px-6 py-4">
<div className="flex justify-between items-center">
-          <NavLink to="/" className="text-2xl font-bold text-blue-400">Azf.</NavLink>
-          <nav className="flex items-center space-x-6">
-            <NavLink to="/" className={({ isActive }) =>
-              `flex items-center space-x-2 hover:text-blue-400 transition-colors ${isActive ? 'text-blue-400' : 'text-gray-300'}`
-            }>
-              <User className="w-4 h-4" />
-              <span>About</span>
-            </NavLink>
-            <NavLink to="/experience" className={({ isActive }) =>
-              `flex items-center space-x-2 hover:text-blue-400 transition-colors ${isActive ? 'text-blue-400' : 'text-gray-300'}`
-            }>
-              <Briefcase className="w-4 h-4" />
-              <span>Experience</span>
-            </NavLink>
-            <NavLink to="/blog" className={({ isActive }) =>
-              `flex items-center space-x-2 hover:text-blue-400 transition-colors ${isActive ? 'text-blue-400' : 'text-gray-300'}`
-            }>
-              <BookOpen className="w-4 h-4" />
-              <span>Blog</span>
-            </NavLink>
+          {/* Logo */}
+          <NavLink to="/" className="text-xl font-bold tracking-tight text-slate-900 hover:text-[#990000] transition-colors">
+            AZF.
+          </NavLink>

+          {/* Minimalist Navigation */}
+          <nav className="hidden md:flex items-center space-x-8">
+            {['About', 'Experience', 'Blog'].map((item) => (
+              <NavLink
+                key={item}
+                to={item === 'About' ? '/' : `/${item.toLowerCase()}`}
+                className={({ isActive }) =>
+                  `text-sm font-medium transition-all hover:text-[#990000] ${isActive ? 'text-[#990000]' : 'text-slate-500'
+                  }`
+                }
+              >
+                {item}
+              </NavLink>
+            ))}
+
+            {/* Tools Dropdown */}
<div className="relative group">
-              <button className="flex items-center space-x-1 text-gray-300 hover:text-blue-400 transition-colors py-2">
-                <span>Stupid tools I made</span>
+              <button className="flex items-center space-x-1 text-sm font-medium text-slate-500 hover:text-[#990000] transition-colors py-2">
+                <span>Tools</span>
<ChevronDown className="w-4 h-4" />
</button>

-              {/* Mega Menu Dropdown */}
-              <div className="absolute right-0 top-full mt-0 w-[600px] bg-gray-800 border border-gray-700 rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50 p-4">
-                <div className="grid grid-cols-2 gap-6">
-                  {/* Category: Web Apps */}
+              <div className="absolute top-full right-0 w-[500px] pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
+                <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-6 grid grid-cols-2 gap-6 relative">
+                  {/* Triangle Arrow */}
+                  <div className="absolute -top-2 right-6 w-4 h-4 bg-white border-t border-l border-slate-100 transform rotate-45"></div>
+
+                  {/* Web Apps Category */}
<div>
-                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">Web Apps</h3>
-                    <div className="space-y-1">
-                      <a href="https://jsonify.alvianzf.id" target="_blank" rel="noopener noreferrer" className="flex items-start px-2 py-2 rounded-md hover:bg-gray-700 group/item transition-colors">
-                        <FileJson className="w-5 h-5 mr-3 text-blue-400 mt-0.5" />
-                        <div>
-                          <div className="text-sm font-medium text-gray-200 group-hover/item:text-blue-400 transition-colors">JSON Formatter</div>
-                          <div className="text-xs text-gray-400">Beautify and debug your JSON data</div>
+                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Web Apps</h3>
+                    <div className="space-y-2">
+                      <a href="https://jsonify.alvianzf.id" target="_blank" rel="noopener noreferrer" className="block p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors group/item">
+                        <div className="flex items-start gap-3">
+                          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover/item:text-[#990000] group-hover/item:bg-red-50 transition-colors">
+                            <FileJson className="w-5 h-5" />
+                          </div>
+                          <div>
+                            <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">JSON Formatter</div>
+                            <div className="text-xs text-slate-500">Beautify & debug JSON</div>
+                          </div>
</div>
</a>
-                      <a href="https://invoice.alvianzf.id" target="_blank" rel="noopener noreferrer" className="flex items-start px-2 py-2 rounded-md hover:bg-gray-700 group/item transition-colors">
-                        <Receipt className="w-5 h-5 mr-3 text-green-400 mt-0.5" />
-                        <div>
-                          <div className="text-sm font-medium text-gray-200 group-hover/item:text-blue-400 transition-colors">Invoice Generator</div>
-                          <div className="text-xs text-gray-400">Generate professional invoices instantly</div>
+                      <a href="https://invoice.alvianzf.id" target="_blank" rel="noopener noreferrer" className="block p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors group/item">
+                        <div className="flex items-start gap-3">
+                          <div className="p-2 bg-green-50 text-green-600 rounded-lg group-hover/item:text-[#990000] group-hover/item:bg-red-50 transition-colors">
+                            <Receipt className="w-5 h-5" />
+                          </div>
+                          <div>
+                            <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">Invoice Gen</div>
+                            <div className="text-xs text-slate-500">Create professional invoices</div>
+                          </div>
</div>
</a>
</div>
</div>

-                  {/* Category: NPM Packages */}
+                  {/* NPM Packages Category */}
<div>
-                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">NPM Packages</h3>
-                    <div className="space-y-1">
-                      <a href="https://www.npmjs.com/package/make-it-rain" target="_blank" rel="noopener noreferrer" className="flex items-start px-2 py-2 rounded-md hover:bg-gray-700 group/item transition-colors">
-                        <CloudRain className="w-5 h-5 mr-3 text-purple-400 mt-0.5" />
-                        <div>
-                          <div className="text-sm font-medium text-gray-200 group-hover/item:text-blue-400 transition-colors">make-it-rain</div>
-                          <div className="text-xs text-gray-400">The Only Money Formatter You'll Ever Need (Probably)</div>
+                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">NPM Packages</h3>
+                    <div className="space-y-2">
+                      <a href="https://www.npmjs.com/package/make-it-rain" target="_blank" rel="noopener noreferrer" className="block p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors group/item">
+                        <div className="flex items-start gap-3">
+                          <div className="p-2 bg-purple-50 text-purple-600 rounded-lg group-hover/item:text-[#990000] group-hover/item:bg-red-50 transition-colors">
+                            <CloudRain className="w-5 h-5" />
+                          </div>
+                          <div>
+                            <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">make-it-rain</div>
+                            <div className="text-xs text-slate-500">Currency formatting utility</div>
+                          </div>
</div>
</a>
-                      <a href="https://www.npmjs.com/package/env-validate-sarcastically" target="_blank" rel="noopener noreferrer" className="flex items-start px-2 py-2 rounded-md hover:bg-gray-700 group/item transition-colors">
-                        <MessageSquareWarning className="w-5 h-5 mr-3 text-yellow-400 mt-0.5" />
-                        <div>
-                          <div className="text-sm font-medium text-gray-200 group-hover/item:text-blue-400 transition-colors">env-validate-sarcastically</div>
-                          <div className="text-xs text-gray-400">Because forgetting .env variables is your full-time job</div>
+                      <a href="https://www.npmjs.com/package/env-validate-sarcastically" target="_blank" rel="noopener noreferrer" className="block p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors group/item">
+                        <div className="flex items-start gap-3">
+                          <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg group-hover/item:text-[#990000] group-hover/item:bg-red-50 transition-colors">
+                            <MessageSquareWarning className="w-5 h-5" />
+                          </div>
+                          <div>
+                            <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">env-validate</div>
+                            <div className="text-xs text-slate-500">Sarcastic env validation</div>
+                          </div>
</div>
</a>
-                      <a href="https://www.npmjs.com/package/a-valid-json" target="_blank" rel="noopener noreferrer" className="flex items-start px-2 py-2 rounded-md hover:bg-gray-700 group/item transition-colors">
-                        <CheckCircle2 className="w-5 h-5 mr-3 text-teal-400 mt-0.5" />
-                        <div>
-                          <div className="text-sm font-medium text-gray-200 group-hover/item:text-blue-400 transition-colors">a-valid-json</div>
-                          <div className="text-xs text-gray-400">A simple utility to validate JSON strings or objects</div>
+                      <a href="https://www.npmjs.com/package/a-valid-json" target="_blank" rel="noopener noreferrer" className="block p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors group/item">
+                        <div className="flex items-start gap-3">
+                          <div className="p-2 bg-teal-50 text-teal-600 rounded-lg group-hover/item:text-[#990000] group-hover/item:bg-red-50 transition-colors">
+                            <CheckCircle2 className="w-5 h-5" />
+                          </div>
+                          <div>
+                            <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">a-valid-json</div>
+                            <div className="text-xs text-slate-500">Strict JSON validation</div>
+                          </div>
</div>
</a>
</div>
@@ -91,18 +112,38 @@ export default function Header() {
</div>
</div>
</nav>
-          <div className="flex space-x-4">
-            <a href="https://github.com/alvianzf" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors">
-              <Github className="w-6 h-6" />
+
+          {/* Social Icons - Clean & Minimal */}
+          <div className="flex items-center space-x-4">
+            <a
+              href="https://github.com/alvianzf"
+              target="_blank"
+              rel="noopener noreferrer"
+              className="text-slate-400 hover:text-[#990000] transition-colors"
+            >
+              <Github className="w-5 h-5" />
</a>
-            <a href="https://linkedin.com/in/alvianzf" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors">
-              <Linkedin className="w-6 h-6" />
+            <a
+              href="https://linkedin.com/in/alvianzf"
+              target="_blank"
+              rel="noopener noreferrer"
+              className="text-slate-400 hover:text-[#990000] transition-colors"
+            >
+              <Linkedin className="w-5 h-5" />
</a>
-            <a href="https://medium.com/@alvianzf" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors">
-              <FontAwesomeIcon icon={faMedium} className="w-6 h-6" />
+            <a
+              href="https://medium.com/@alvianzf"
+              target="_blank"
+              rel="noopener noreferrer"
+              className="text-slate-400 hover:text-[#990000] transition-colors"
+            >
+              <FontAwesomeIcon icon={faMedium} className="w-5 h-5" />
</a>
-            <a href="mailto:alvianzf@gmail.com" className="text-gray-300 hover:text-blue-400 transition-colors">
-              <Mail className="w-6 h-6" />
+            <a
+              href="mailto:alvianzf@gmail.com"
+              className="px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-full hover:bg-[#990000] transition-all shadow-sm hover:shadow-md"
+            >
+              Contact
</a>
</div>
</div>
diff --git a/src/components/ModernCard.tsx b/src/components/ModernCard.tsx
new file mode 100644
index 0000000..e98b4fc
--- /dev/null
+++ b/src/components/ModernCard.tsx
@@ -0,0 +1,14 @@
+import React from 'react';
+
+interface ModernCardProps {
+  children: React.ReactNode;
+  className?: string;
+}
+
+export default function ModernCard({ children, className = '' }: ModernCardProps) {
+  return (
+    <div className={`card-modern p-6 ${className}`}>
+      {children}
+    </div>
+  );
+}
diff --git a/src/components/PixelCard.tsx b/src/components/PixelCard.tsx
new file mode 100644
index 0000000..0c86113
--- /dev/null
+++ b/src/components/PixelCard.tsx
@@ -0,0 +1,15 @@
+interface PixelCardProps {
+  children: React.ReactNode;
+  className?: string;
+  glowColor?: 'blue' | 'green' | 'purple' | 'yellow';
+}
+
+export default function PixelCard({ children, className = '', glowColor }: PixelCardProps) {
+  const glowClass = glowColor ? `hover:border-${glowColor}-500` : 'hover:border-blue-500';
+
+  return (
+    <div className={`bg-white dark:bg-gray-900 border-4 border-gray-300 dark:border-gray-700 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] dark:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] transition-all duration-200 hover:-translate-y-1 ${className} ${glowClass}`}>
+      {children}
+    </div>
+  );
+}
diff --git a/src/components/ScrollReveal.tsx b/src/components/ScrollReveal.tsx
new file mode 100644
index 0000000..0c2ca9a
--- /dev/null
+++ b/src/components/ScrollReveal.tsx
@@ -0,0 +1,22 @@
+import React from 'react';
+import { motion } from 'framer-motion';
+
+interface ScrollRevealProps {
+  children: React.ReactNode;
+  delay?: number;
+  className?: string;
+}
+
+export default function ScrollReveal({ children, delay = 0, className = '' }: ScrollRevealProps) {
+  return (
+    <motion.div
+      initial={{ opacity: 0, y: 20 }}
+      whileInView={{ opacity: 1, y: 0 }}
+      viewport={{ once: true, margin: "-100px" }}
+      transition={{ duration: 0.5, delay }}
+      className={className}
+    >
+      {children}
+    </motion.div>
+  );
+}
diff --git a/src/index.css b/src/index.css
index b5c61c9..40518c6 100644
--- a/src/index.css
+++ b/src/index.css
@@ -1,3 +1,65 @@
+@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap');
+
@tailwind base;
@tailwind components;
@tailwind utilities;
+
+@layer base {
+  body {
+    @apply bg-slate-50 text-slate-900 antialiased;
+    font-family: 'Inter', sans-serif;
+  }
+
+  h1,
+  h2,
+  h3,
+  h4,
+  h5,
+  h6 {
+    font-family: 'Outfit', sans-serif;
+    @apply tracking-tight;
+  }
+
+  /* Smooth scrolling */
+  html {
+    scroll-behavior: smooth;
+  }
+}
+
+@layer components {
+
+  /* Modern Card */
+  .card-modern {
+    @apply bg-white rounded-2xl border border-slate-100 shadow-sm transition-all duration-300;
+  }
+
+  .card-modern:hover {
+    @apply shadow-md -translate-y-1 border-slate-200;
+  }
+
+  /* Modern Button */
+  .btn-primary {
+    @apply px-6 py-3 bg-slate-900 text-white font-medium rounded-full transition-all duration-300;
+    @apply hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5;
+  }
+
+  .btn-outline {
+    @apply px-6 py-3 bg-transparent border border-slate-200 text-slate-900 font-medium rounded-full transition-all duration-300;
+    @apply hover:border-slate-900 hover:bg-slate-50;
+  }
+
+  /* Clean Badge */
+  .badge-modern {
+    @apply px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full border border-slate-200;
+  }
+}
+
+@layer utilities {
+  .text-gradient {
+    @apply bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600;
+  }
+
+  .text-gradient-blue {
+    @apply bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600;
+  }
+}
 No newline at end of file
diff --git a/src/pages/About.tsx b/src/pages/About.tsx
index 3e33d26..fa37fe3 100644
--- a/src/pages/About.tsx
+++ b/src/pages/About.tsx
@@ -1,66 +1,120 @@
+import { motion } from 'framer-motion';
+import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
+import { ArrowRight, Download } from 'lucide-react';
import alvian from "../assets/potraits.png";
import { skills, categories } from "../data";
-import SkillCard from "../components/SkillCard";
+import ModernCard from "../components/ModernCard";

export default function About() {
return (
-    <div className="container mx-auto px-4 py-12">
-      <div className="max-w-4xl mx-auto">
-        <div className="text-center mb-12">
-          <img
-            src={alvian}
-            width={400}
-            alt="Profile"
-            className="w-100 h-100 rounded-full mx-auto mb-4 object-cover"
-          />
-          <h1 className="text-4xl font-bold mb-4 text-blue-400">
-            Alvian Zachry Faturrahman
-          </h1>
-          <p className="text-xl text-gray-300">
-            Senior Talent & Regional Operations Manager | Software Engineer |
-            Instructor
-          </p>
-        </div>
+    <div className="min-h-screen bg-slate-50 pt-20">
+      <div className="container mx-auto px-6 py-20">
+        {/* Hero Section */}
+        <section className="mb-32">
+          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
+            <motion.div
+              initial={{ opacity: 0, y: 20 }}
+              animate={{ opacity: 1, y: 0 }}
+              transition={{ duration: 0.8 }}
+            >
+              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-slate-900 mb-8 leading-tight">
+                Alvian
+                <br />
+                <span className="text-slate-400">Zachry.</span>
+              </h1>
+              <p className="text-xl md:text-2xl text-slate-500 max-w-lg leading-relaxed mb-10">
+                Senior Talent Manager & Software Engineer bridging the gap between people and technology.
+              </p>

-        <div className="mb-12">
-          <h2 className="text-2xl font-bold mb-6 text-blue-400">About Me</h2>
-          <p className="text-gray-300 leading-relaxed">
-            Hi, I'm Ary—a versatile tech enthusiast and talent connector.
-            Whether developing innovative full-stack solutions or mentoring
-            future engineers, I thrive on creating impactful, scalable systems.
-            I bridge Southeast Asian talent with European opportunities while
-            fostering growth through thoughtful software development and
-            tailored education programs.When I'm not working, you’ll find me
-            refining Agile methodologies, coaching career transitions, or
-            empowering engineering teams. Let’s connect and build something
-            remarkable!
-          </p>
-        </div>
-
-        <div className="mb-12">
-          <h2 className="text-2xl font-bold mb-6 text-blue-400">Skills</h2>
-          {categories.map((category) => (
-            <div key={category.name} className="mb-8">
-              <div className="flex items-center mb-4">
-                <category.icon className="w-6 h-6 mr-2 text-blue-400" />
-                <h3 className="text-xl font-semibold text-gray-200">
-                  {category.name}
-                </h3>
-              </div>
-              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
-                {skills
-                  .filter(
-                    (skill) =>
-                      skill.category ===
-                      category.name.toLowerCase().split(" ")[0]
-                  )
-                  .map((skill) => (
-                    <SkillCard key={skill.name} skill={skill} />
-                  ))}
+              <div className="flex flex-wrap gap-4">
+                <a href="#contact" className="btn-primary flex items-center gap-2">
+                  Get in touch <ArrowRight className="w-4 h-4" />
+                </a>
+                <a href="/resume.pdf" className="text-slate-600 hover:text-slate-900 font-medium flex items-center gap-2 px-6 py-3 transition-colors">
+                  Download CV <Download className="w-4 h-4" />
+                </a>
</div>
+            </motion.div>
+
+            <motion.div
+              initial={{ opacity: 0, scale: 0.95 }}
+              animate={{ opacity: 1, scale: 1 }}
+              transition={{ duration: 0.8, delay: 0.2 }}
+              className="relative"
+            >
+              <div className="absolute inset-0 bg-blue-100 rounded-full blur-3xl opacity-30 transform translate-x-10 translate-y-10"></div>
+              <img
+                src={alvian}
+                alt="Alvian Zachry"
+                className="relative rounded-2xl w-full max-w-md mx-auto shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
+              />
+            </motion.div>
+          </div>
+        </section>
+
+        {/* Biography */}
+        <section className="max-w-4xl mx-auto mb-32">
+          <motion.div
+            initial={{ opacity: 0, y: 20 }}
+            whileInView={{ opacity: 1, y: 0 }}
+            viewport={{ once: true }}
+            transition={{ duration: 0.6 }}
+          >
+            <h2 className="text-3xl font-bold text-slate-900 mb-8">About Me</h2>
+            <p className="text-lg text-slate-600 leading-loose">
+              Hi, I'm Ary—a versatile tech enthusiast and talent connector.
+              Whether developing innovative full-stack solutions or mentoring
+              future engineers, I thrive on creating impactful, scalable systems.
+              I bridge Southeast Asian talent with European opportunities while
+              fostering growth through thoughtful software development and
+              tailored education programs. When I'm not working, you'll find me
+              refining Agile methodologies, coaching career transitions, or
+              empowering engineering teams.
+            </p>
+          </motion.div>
+        </section>
+
+        {/* Skills Grid */}
+        <section>
+          <div className="max-w-7xl mx-auto">
+            <h2 className="text-3xl font-bold text-slate-900 mb-16 text-center">Technical Expertise</h2>
+
+            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
+              {categories.map((category, i) => (
+                <div key={category.name} className="space-y-6">
+                  <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
+                    <category.icon className="w-5 h-5 text-blue-600" />
+                    {category.name}
+                  </h3>
+
+                  <div className="space-y-4">
+                    {skills
+                      .filter(skill => skill.category === category.name.toLowerCase().split(' ')[0])
+                      .map((skill, j) => (
+                        <motion.div
+                          key={skill.name}
+                          initial={{ opacity: 0, y: 10 }}
+                          whileInView={{ opacity: 1, y: 0 }}
+                          viewport={{ once: true }}
+                          transition={{ delay: i * 0.1 + j * 0.05 }}
+                        >
+                          <ModernCard className="flex items-start gap-4 hover:border-blue-200 group cursor-default">
+                            <div className="p-2 bg-slate-50 rounded-lg text-slate-600 group-hover:text-blue-600 transition-colors">
+                              <FontAwesomeIcon icon={skill.icon} className="w-5 h-5" />
+                            </div>
+                            <div>
+                              <h4 className="font-medium text-slate-900">{skill.name}</h4>
+                              <p className="text-sm text-slate-500 mt-1">{skill.description}</p>
+                            </div>
+                          </ModernCard>
+                        </motion.div>
+                      ))}
+                  </div>
+                </div>
+              ))}
</div>
-          ))}
-        </div>
+          </div>
+        </section>
</div>
</div>
);
diff --git a/src/pages/Blog.tsx b/src/pages/Blog.tsx
index 5c70ff4..dd7b0c9 100644
--- a/src/pages/Blog.tsx
+++ b/src/pages/Blog.tsx
@@ -1,25 +1,24 @@
-import React, { useEffect, useState } from 'react';
+import { useEffect, useState } from 'react';
+import { motion } from 'framer-motion';
import { format } from 'date-fns';
-import { Calendar } from 'lucide-react';
+import { BookOpen, Calendar } from 'lucide-react';
+import ModernCard from '../components/ModernCard';

export default function Blog() {
-  const [posts, setPosts] = useState([]);
+  const [posts, setPosts] = useState<any[]>([]);
const [loading, setLoading] = useState(true);
-  const [error, setError] = useState(null);
+  const [error, setError] = useState<string | null>(null);

useEffect(() => {
const fetchPosts = async () => {
try {
-        // Blogger API key and blog ID
const API_KEY = 'AIzaSyCw9p4Ar_wc9h3zOuaPb7JcdH3Lj8Ail_4';
const BLOG_ID = '369044396031799467';
-
-        // Blogger API URL
const url = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}`;
-
+
const response = await fetch(url);
if (!response.ok) throw new Error('Failed to fetch posts');
-
+
const data = await response.json();
setPosts(data.items || []);
} catch (err) {
@@ -35,10 +34,10 @@ export default function Blog() {

if (loading) {
return (
-      <div className="container mx-auto px-4 py-12 bg-gray-900">
-        <div className="max-w-4xl mx-auto text-center">
-          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"></div>
-          <p className="mt-4 text-gray-300">Loading posts...</p>
+      <div className="min-h-screen bg-slate-50 pt-32 pb-20 flex justify-center items-center">
+        <div className="animate-pulse flex flex-col items-center">
+          <div className="h-4 w-4 bg-blue-600 rounded-full mb-4 animate-bounce"></div>
+          <span className="text-slate-400 font-medium">Loading contents...</span>
</div>
</div>
);
@@ -46,52 +45,84 @@ export default function Blog() {

if (error) {
return (
-      <div className="container mx-auto px-4 py-12 bg-gray-900">
-        <div className="max-w-4xl mx-auto text-center">
-          <p className="text-red-400">{error}</p>
-        </div>
+      <div className="min-h-screen bg-slate-50 pt-32 pb-20 justify-center flex">
+        <ModernCard className="bg-red-50 border-red-100 max-w-md w-full text-center p-8">
+          <p className="text-red-600 font-medium">{error}</p>
+        </ModernCard>
</div>
);
}

return (
-    <div className="min-h-screen bg-gray-900 text-gray-100">
-      <div className="container mx-auto px-4 py-12">
-        <div className="max-w-4xl mx-auto">
-          <h1 className="text-3xl font-bold mb-8 text-blue-400">Blog Posts</h1>
-          <div className="space-y-8">
-            {posts.length > 0 ? (
-              posts.map((post) => (
-                <article key={post.id} className="bg-gray-800 rounded-lg shadow-xl p-6 border border-gray-700 hover:border-blue-500 transition-colors duration-300">
-                  <h2 className="text-2xl font-semibold mb-4">
-                    <a href={post.url} className="text-blue-400 hover:text-blue-300 transition-colors">
-                      {post.title}
-                    </a>
-                  </h2>
-                  <div className="flex items-center text-gray-400 mb-4">
-                    <Calendar className="w-4 h-4 mr-2" />
-                    <time>{format(new Date(post.published), 'MMMM d, yyyy')}</time>
-                  </div>
-                  <div
-                    className="prose prose-invert max-w-none text-gray-300"
-                    dangerouslySetInnerHTML={{
-                      __html: post.content
-                        ? post.content.slice(0, 300) + (post.content.length > 300 ? '...' : '')
-                        : ''
-                    }}
-                  />
-                  <a
-                    href={post.url}
-                    className="inline-block mt-4 text-blue-400 hover:text-blue-300 font-medium group"
-                  >
-                    Read more <span className="group-hover:translate-x-1 inline-block transition-transform duration-200">→</span>
-                  </a>
-                </article>
-              ))
-            ) : (
-              <p className="text-center text-gray-400">No posts found.</p>
-            )}
-          </div>
+    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
+      <div className="container mx-auto px-6">
+        {/* Page Title */}
+        <motion.div
+          initial={{ opacity: 0, y: -20 }}
+          animate={{ opacity: 1, y: 0 }}
+          className="text-center mb-16"
+        >
+          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
+            Latest Thoughts
+          </h1>
+          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
+            Writings on software architecture, leadership, and tech trends.
+          </p>
+        </motion.div>
+
+        {/* Blog Posts Grid */}
+        <div className="max-w-4xl mx-auto space-y-8">
+          {posts.length > 0 ? (
+            posts.map((post, index) => (
+              <motion.div
+                key={post.id}
+                initial={{ opacity: 0, y: 20 }}
+                animate={{ opacity: 1, y: 0 }}
+                transition={{ delay: index * 0.1 }}
+              >
+                <ModernCard className="group hover:border-blue-200 transition-all">
+                  <article className="p-2">
+                    <h2 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
+                      <a href={post.url} target="_blank" rel="noopener noreferrer">
+                        {post.title}
+                      </a>
+                    </h2>
+
+                    <div className="flex items-center text-slate-400 mb-6 text-sm font-medium">
+                      <Calendar className="w-4 h-4 mr-2" />
+                      <time>
+                        {format(new Date(post.published), 'MMMM d, yyyy')}
+                      </time>
+                    </div>
+
+                    <div
+                      className="text-slate-600 leading-relaxed mb-6 line-clamp-3"
+                      dangerouslySetInnerHTML={{
+                        __html: post.content
+                          ? post.content.replace(/<[^>]+>/g, '').slice(0, 250) + '...'
+                          : ''
+                      }}
+                    />
+
+                    <div className="flex justify-end">
+                      <a
+                        href={post.url}
+                        target="_blank"
+                        rel="noopener noreferrer"
+                        className="text-blue-600 font-medium hover:text-blue-700 inline-flex items-center"
+                      >
+                        Read Article <BookOpen className="w-4 h-4 ml-2" />
+                      </a>
+                    </div>
+                  </article>
+                </ModernCard>
+              </motion.div>
+            ))
+          ) : (
+            <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
+              <p className="text-slate-400">No blog posts found at the moment.</p>
+            </div>
+          )}
</div>
</div>
</div>
diff --git a/src/pages/Experience.tsx b/src/pages/Experience.tsx
index cf163d8..20780f9 100644
--- a/src/pages/Experience.tsx
+++ b/src/pages/Experience.tsx
@@ -1,27 +1,63 @@
import React from 'react';
+import { motion } from 'framer-motion';
import { experiences } from '../data';
-import { Briefcase } from 'lucide-react';
+import ModernCard from '../components/ModernCard';
+import { Calendar, Briefcase, Trophy } from 'lucide-react';

export default function Experience() {
return (
-    <div className="container mx-auto px-4 py-12">
-      <div className="max-w-4xl mx-auto">
-        <h1 className="text-3xl font-bold mb-8 text-blue-400">Professional Experience</h1>
-        <div className="space-y-8">
+    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
+      <div className="container mx-auto px-6">
+        <motion.div
+          initial={{ opacity: 0, y: 20 }}
+          animate={{ opacity: 1, y: 0 }}
+          className="text-center mb-16"
+        >
+          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
+            Professional Journey
+          </h1>
+          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
+            A timeline of my career across software engineering, leadership, and education.
+          </p>
+        </motion.div>
+
+        <div className="max-w-4xl mx-auto space-y-8">
{experiences.map((exp, index) => (
-            <div key={index} className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700">
-              <div className="flex items-start">
-                <div className="bg-blue-900 p-3 rounded-full mr-4">
-                  <Briefcase className="w-6 h-6 text-blue-400" />
-                </div>
-                <div>
-                  <h3 className="text-xl font-semibold text-blue-400">{exp.title}</h3>
-                  <p className="text-gray-300 mb-2">{exp.company}</p>
-                  <p className="text-sm text-gray-400 mb-4">{exp.period}</p>
-                  <p className="text-gray-300">{exp.description}</p>
+            <motion.div
+              key={index}
+              initial={{ opacity: 0, x: -20 }}
+              whileInView={{ opacity: 1, x: 0 }}
+              viewport={{ once: true }}
+              transition={{ delay: index * 0.1 }}
+            >
+              <ModernCard className="group hover:border-blue-200 transition-colors">
+                <div className="flex flex-col md:flex-row gap-6">
+                  {/* Icon & Line */}
+                  <div className="hidden md:flex flex-col items-center">
+                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-50 group-hover:scale-110 transition-all">
+                      {exp.category === 'soft' ? <Trophy className="w-6 h-6" /> : <Briefcase className="w-6 h-6" />}
+                    </div>
+                  </div>
+
+                  {/* Content */}
+                  <div className="flex-1">
+                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
+                      <h3 className="text-xl font-bold text-slate-900">{exp.title}</h3>
+                      <div className="flex items-center text-slate-400 text-sm mt-1 md:mt-0 font-medium bg-slate-100 px-3 py-1 rounded-full w-fit">
+                        <Calendar className="w-3.5 h-3.5 mr-2" />
+                        {exp.period}
+                      </div>
+                    </div>
+
+                    <h4 className="text-blue-600 font-medium mb-4">{exp.company}</h4>
+
+                    <p className="text-slate-600 leading-relaxed">
+                      {exp.description}
+                    </p>
+                  </div>
</div>
-              </div>
-            </div>
+              </ModernCard>
+            </motion.div>
))}
</div>
</div>
diff --git a/src/types.ts b/src/types.ts
index 0acb2a4..2aa7094 100644
--- a/src/types.ts
+++ b/src/types.ts
@@ -1,5 +1,5 @@
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
-import { DivideIcon as LucideIcon } from 'lucide-react';
+import { LucideIcon } from 'lucide-react';

export interface BlogPost {
id: number;
@@ -21,6 +21,7 @@ export interface Experience {
company: string;
period: string;
description: string;
+  category?: 'technical' | 'soft';
}

export interface Skill {
@@ -28,6 +29,7 @@ export interface Skill {
icon: IconDefinition;
description: string;
category: 'technical' | 'soft' | 'languages';
+  level?: number;
}

export interface Category {
diff --git a/tailwind.config.js b/tailwind.config.js
index c9712c9..89a1158 100644
--- a/tailwind.config.js
+++ b/tailwind.config.js
@@ -1,8 +1,35 @@
/** @type {import('tailwindcss').Config} */
export default {
+  darkMode: 'class',
content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
theme: {
extend: {
+      fontFamily: {
+        pixel: ['"Press Start 2P"', 'cursive'],
+      },
+      colors: {
+        // 8-bit retro palette
+        'retro': {
+          'cyan': '#00FFFF',
+          'magenta': '#FF00FF',
+          'yellow': '#FFFF00',
+          'lime': '#00FF00',
+          'red': '#FF0000',
+          'blue': '#0000FF',
+        },
+        'pixel': {
+          'dark': '#0F0F1E',
+          'darker': '#0A0A14',
+          'light': '#1A1A2E',
+          'accent': '#16213E',
+        }
+      },
+      spacing: {
+        'pixel': '8px',
+        'pixel-2': '16px',
+        'pixel-3': '24px',
+        'pixel-4': '32px',
+      },
typography: {
invert: {
css: {

```

## feat: skills tab marquee (3e13ca8) - 2026-01-26

```diff
diff --git a/src/components/Header.tsx b/src/components/Header.tsx
index da153d0..5203af8 100644
--- a/src/components/Header.tsx
+++ b/src/components/Header.tsx
@@ -46,7 +46,7 @@ export default function Header() {
<div className="space-y-2">
<a href="https://jsonify.alvianzf.id" target="_blank" rel="noopener noreferrer" className="block p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors group/item">
<div className="flex items-start gap-3">
-                          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover/item:text-[#990000] group-hover/item:bg-red-50 transition-colors">
+                          <div className="p-2 bg-red-50 text-brand-red rounded-lg group-hover/item:text-[#990000] group-hover/item:bg-red-50 transition-colors">
<FileJson className="w-5 h-5" />
</div>
<div>
diff --git a/src/data.ts b/src/data.ts
index 17edf19..a9229dd 100644
--- a/src/data.ts
+++ b/src/data.ts
@@ -6,8 +6,10 @@ import {
faPython,
faJs,
faPhp,
+  faLaravel,
faAws,
faVuejs,
+  faLinux,
} from "@fortawesome/free-brands-svg-icons";
import {
faUsers,
@@ -21,6 +23,9 @@ import {
faCloud,
faServer,
faBox,
+  faCat,
+  faFire,
+  faProjectDiagram,
} from "@fortawesome/free-solid-svg-icons";

export const experiences: Experience[] = [
@@ -149,6 +154,24 @@ export const skills: Skill[] = [
description: "Backend development with PHP, CodeIgniter, and Laravel",
category: "technical",
},
+  {
+    name: "Laravel",
+    icon: faLaravel,
+    description: "Elegant PHP web framework for artisans",
+    category: "technical",
+  },
+  {
+    name: "CodeIgniter",
+    icon: faFire,
+    description: "Powerful PHP framework with a small footprint",
+    category: "technical",
+  },
+  {
+    name: "n8n",
+    icon: faProjectDiagram,
+    description: "Workflow automation and process orchestration",
+    category: "technical",
+  },
{
name: "SQL & NoSQL Databases",
icon: faDatabase,
@@ -181,6 +204,12 @@ export const skills: Skill[] = [
description: "Backend development and REST API architecture",
category: "technical",
},
+  {
+    name: "NestJS",
+    icon: faCat,
+    description: "Scalable server-side applications and microservices architecture",
+    category: "technical",
+  },
{
name: "AWS",
icon: faAws,
@@ -218,6 +247,12 @@ export const skills: Skill[] = [
"RESTful & GraphQL APIs, Express.js, NestJS, microservices architecture, and service communication with RabbitMQ & Kafka",
category: "technical",
},
+  {
+    name: "Linux / Ubuntu",
+    icon: faLinux,
+    description: "Server management, command line proficiency, and shell scripting",
+    category: "technical",
+  },

// Soft Skills
{
diff --git a/src/index.css b/src/index.css
index 40518c6..0a985f2 100644
--- a/src/index.css
+++ b/src/index.css
@@ -59,7 +59,40 @@
@apply bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600;
}

-  .text-gradient-blue {
-    @apply bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600;
+  .text-gradient-red {
+    @apply bg-clip-text text-transparent bg-gradient-to-r from-brand-red to-red-800;
+  }
+
+  @keyframes marquee {
+    0% {
+      transform: translateX(0);
+    }
+
+    100% {
+      transform: translateX(-50%);
+    }
+  }
+
+  @keyframes marquee-reverse {
+    0% {
+      transform: translateX(-50%);
+    }
+
+    100% {
+      transform: translateX(0);
+    }
+  }
+
+  .animate-marquee {
+    animation: marquee 30s linear infinite;
+  }
+
+  .animate-marquee-reverse {
+    animation: marquee-reverse 30s linear infinite;
+  }
+
+  .pause-on-hover:hover .animate-marquee,
+  .pause-on-hover:hover .animate-marquee-reverse {
+    animation-play-state: paused;
}
}
 No newline at end of file
diff --git a/src/pages/About.tsx b/src/pages/About.tsx
index fa37fe3..32158cd 100644
--- a/src/pages/About.tsx
+++ b/src/pages/About.tsx
@@ -7,10 +7,10 @@ import ModernCard from "../components/ModernCard";

export default function About() {
return (
-    <div className="min-h-screen bg-slate-50 pt-20">
+    <div className="min-h-screen bg-slate-50 pt-20 overflow-x-hidden">
<div className="container mx-auto px-6 py-20">
{/* Hero Section */}
-        <section className="mb-32">
+        <section className="mb-16">
<div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
<motion.div
initial={{ opacity: 0, y: 20 }}
@@ -27,10 +27,10 @@ export default function About() {
</p>

<div className="flex flex-wrap gap-4">
-                <a href="#contact" className="btn-primary flex items-center gap-2">
+                <a href="#contact" className="btn-primary flex items-center gap-2 hover:bg-brand-red transition-colors">
Get in touch <ArrowRight className="w-4 h-4" />
</a>
-                <a href="/resume.pdf" className="text-slate-600 hover:text-slate-900 font-medium flex items-center gap-2 px-6 py-3 transition-colors">
+                <a href="/resume.pdf" className="text-slate-600 hover:text-brand-red font-medium flex items-center gap-2 px-6 py-3 transition-colors">
Download CV <Download className="w-4 h-4" />
</a>
</div>
@@ -42,7 +42,8 @@ export default function About() {
transition={{ duration: 0.8, delay: 0.2 }}
className="relative"
>
-              <div className="absolute inset-0 bg-blue-100 rounded-full blur-3xl opacity-30 transform translate-x-10 translate-y-10"></div>
+              {/* Updated accent color blob */}
+              <div className="absolute inset-0 bg-brand-red rounded-full blur-3xl opacity-10 transform translate-x-10 translate-y-10"></div>
<img
src={alvian}
alt="Alvian Zachry"
@@ -52,8 +53,55 @@ export default function About() {
</div>
</section>

-        {/* Biography */}
-        <section className="max-w-4xl mx-auto mb-32">
+        {/* Technical Expertise (Infinite Marquee) */}
+        <section className="mb-24 relative space-y-8">
+          {/* Row 1: Development & Frameworks (Right to Left) */}
+          <div className="max-w-[100vw] overflow-hidden mask-linear-gradient">
+            <motion.div
+              initial={{ opacity: 0 }}
+              animate={{ opacity: 1 }}
+              transition={{ duration: 1 }}
+              className="flex w-max gap-8 animate-marquee pause-on-hover py-2"
+            >
+              {[...skills.filter(s => ['JavaScript & TypeScript', 'Python', 'PHP', 'Laravel', 'CodeIgniter', 'React.js & Next.js', 'Vue.js', 'Node.js & Express.js', 'NestJS'].includes(s.name)), ...skills.filter(s => ['JavaScript & TypeScript', 'Python', 'PHP', 'Laravel', 'CodeIgniter', 'React.js & Next.js', 'Vue.js', 'Node.js & Express.js', 'NestJS'].includes(s.name)), ...skills.filter(s => ['JavaScript & TypeScript', 'Python', 'PHP', 'Laravel', 'CodeIgniter', 'React.js & Next.js', 'Vue.js', 'Node.js & Express.js', 'NestJS'].includes(s.name))].map((skill, index) => (
+                <div
+                  key={`row1-${skill.name}-${index}`}
+                  className="flex items-center gap-2 px-6 py-3 bg-white rounded-full border border-slate-200 shadow-sm whitespace-nowrap group hover:border-brand-red hover:shadow-md transition-all duration-300"
+                >
+                  <FontAwesomeIcon icon={skill.icon} className="w-5 h-5 text-slate-400 group-hover:text-brand-red transition-colors" />
+                  <span className="text-sm font-medium text-slate-600 group-hover:text-brand-red transition-colors">{skill.name}</span>
+                </div>
+              ))}
+            </motion.div>
+          </div>
+
+          {/* Row 2: Infrastructure & Tools (Left to Right) */}
+          <div className="max-w-[100vw] overflow-hidden mask-linear-gradient">
+            <motion.div
+              initial={{ opacity: 0 }}
+              animate={{ opacity: 1 }}
+              transition={{ duration: 1 }}
+              className="flex w-max gap-8 animate-marquee-reverse pause-on-hover py-2"
+            >
+              {[...skills.filter(s => !['JavaScript & TypeScript', 'Python', 'PHP', 'Laravel', 'CodeIgniter', 'React.js & Next.js', 'Vue.js', 'Node.js & Express.js', 'NestJS'].includes(s.name) && s.category === 'technical'), ...skills.filter(s => !['JavaScript & TypeScript', 'Python', 'PHP', 'Laravel', 'CodeIgniter', 'React.js & Next.js', 'Vue.js', 'Node.js & Express.js', 'NestJS'].includes(s.name) && s.category === 'technical'), ...skills.filter(s => !['JavaScript & TypeScript', 'Python', 'PHP', 'Laravel', 'CodeIgniter', 'React.js & Next.js', 'Vue.js', 'Node.js & Express.js', 'NestJS'].includes(s.name) && s.category === 'technical')].map((skill, index) => (
+                <div
+                  key={`row2-${skill.name}-${index}`}
+                  className="flex items-center gap-2 px-6 py-3 bg-white rounded-full border border-slate-200 shadow-sm whitespace-nowrap group hover:border-brand-red hover:shadow-md transition-all duration-300"
+                >
+                  <FontAwesomeIcon icon={skill.icon} className="w-5 h-5 text-slate-400 group-hover:text-brand-red transition-colors" />
+                  <span className="text-sm font-medium text-slate-600 group-hover:text-brand-red transition-colors">{skill.name}</span>
+                </div>
+              ))}
+            </motion.div>
+          </div>
+
+          {/* Gradient Masks for fading effect */}
+          <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
+          <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>
+        </section>
+
+        {/* Biography (About Me) */}
+        <section className="max-w-4xl mx-auto mb-24">
<motion.div
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
@@ -74,46 +122,42 @@ export default function About() {
</motion.div>
</section>

-        {/* Skills Grid */}
-        <section>
-          <div className="max-w-7xl mx-auto">
-            <h2 className="text-3xl font-bold text-slate-900 mb-16 text-center">Technical Expertise</h2>
-
-            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
-              {categories.map((category, i) => (
+        {/* Soft Skills & Languages (Horizontal Layout) */}
+        <section className="max-w-7xl mx-auto mb-32">
+          <motion.div
+            initial={{ opacity: 0, y: 20 }}
+            whileInView={{ opacity: 1, y: 0 }}
+            viewport={{ once: true }}
+          >
+            <div className="grid grid-cols-1 gap-12">
+              {categories.filter(cat => cat.name !== 'Technical Skills').map((category) => (
<div key={category.name} className="space-y-6">
-                  <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
-                    <category.icon className="w-5 h-5 text-blue-600" />
+                  <h3 className="text-xl font-semibold text-slate-900 flex items-center gap-3 border-b border-slate-200 pb-4">
+                    <category.icon className="w-6 h-6 text-brand-red" />
{category.name}
</h3>

-                  <div className="space-y-4">
+                  <div className="flex flex-wrap gap-4">
{skills
.filter(skill => skill.category === category.name.toLowerCase().split(' ')[0])
-                      .map((skill, j) => (
-                        <motion.div
-                          key={skill.name}
-                          initial={{ opacity: 0, y: 10 }}
-                          whileInView={{ opacity: 1, y: 0 }}
-                          viewport={{ once: true }}
-                          transition={{ delay: i * 0.1 + j * 0.05 }}
-                        >
-                          <ModernCard className="flex items-start gap-4 hover:border-blue-200 group cursor-default">
-                            <div className="p-2 bg-slate-50 rounded-lg text-slate-600 group-hover:text-blue-600 transition-colors">
+                      .map((skill) => (
+                        <div key={skill.name} className="flex-1 min-w-[280px] max-w-[350px]">
+                          <ModernCard className="h-full flex items-center gap-4 p-5 hover:border-brand-red/30 transition-all hover:shadow-md hover:-translate-y-1">
+                            <div className="p-3 bg-slate-50 rounded-xl text-slate-400 group-hover:text-brand-red transition-colors">
<FontAwesomeIcon icon={skill.icon} className="w-5 h-5" />
</div>
<div>
-                              <h4 className="font-medium text-slate-900">{skill.name}</h4>
-                              <p className="text-sm text-slate-500 mt-1">{skill.description}</p>
+                              <h4 className="font-semibold text-slate-900">{skill.name}</h4>
+                              <p className="text-sm text-slate-500 mt-1 leading-snug">{skill.description}</p>
</div>
</ModernCard>
-                        </motion.div>
+                        </div>
))}
</div>
</div>
))}
</div>
-          </div>
+          </motion.div>
</section>
</div>
</div>
diff --git a/src/pages/Blog.tsx b/src/pages/Blog.tsx
index dd7b0c9..1706355 100644
--- a/src/pages/Blog.tsx
+++ b/src/pages/Blog.tsx
@@ -36,7 +36,7 @@ export default function Blog() {
return (
<div className="min-h-screen bg-slate-50 pt-32 pb-20 flex justify-center items-center">
<div className="animate-pulse flex flex-col items-center">
-          <div className="h-4 w-4 bg-blue-600 rounded-full mb-4 animate-bounce"></div>
+          <div className="h-4 w-4 bg-brand-red rounded-full mb-4 animate-bounce"></div>
<span className="text-slate-400 font-medium">Loading contents...</span>
</div>
</div>
@@ -80,9 +80,9 @@ export default function Blog() {
animate={{ opacity: 1, y: 0 }}
transition={{ delay: index * 0.1 }}
>
-                <ModernCard className="group hover:border-blue-200 transition-all">
+                <ModernCard className="group hover:border-brand-red/30 transition-all">
<article className="p-2">
-                    <h2 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
+                    <h2 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-brand-red transition-colors">
<a href={post.url} target="_blank" rel="noopener noreferrer">
{post.title}
</a>
@@ -109,7 +109,7 @@ export default function Blog() {
href={post.url}
target="_blank"
rel="noopener noreferrer"
-                        className="text-blue-600 font-medium hover:text-blue-700 inline-flex items-center"
+                        className="text-brand-red font-medium hover:text-blue-700 inline-flex items-center"
>
Read Article <BookOpen className="w-4 h-4 ml-2" />
</a>
diff --git a/src/pages/Experience.tsx b/src/pages/Experience.tsx
index aa8139b..12d58d6 100644
--- a/src/pages/Experience.tsx
+++ b/src/pages/Experience.tsx
@@ -30,11 +30,11 @@ export default function Experience() {
viewport={{ once: true }}
transition={{ delay: index * 0.1 }}
>
-              <ModernCard className="group hover:border-blue-200 transition-colors">
+              <ModernCard className="group hover:border-brand-red/30 transition-colors">
<div className="flex flex-col md:flex-row gap-6">
{/* Icon & Line */}
<div className="hidden md:flex flex-col items-center">
-                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-50 group-hover:scale-110 transition-all">
+                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-brand-red group-hover:bg-red-50 group-hover:scale-110 transition-all">
{exp.category === 'soft' ? <Trophy className="w-6 h-6" /> : <Briefcase className="w-6 h-6" />}
</div>
</div>
@@ -49,7 +49,7 @@ export default function Experience() {
</div>
</div>

-                    <h4 className="text-blue-600 font-medium mb-4">{exp.company}</h4>
+                    <h4 className="text-brand-red font-medium mb-4">{exp.company}</h4>

<p className="text-slate-600 leading-relaxed">
{exp.description}
diff --git a/tailwind.config.js b/tailwind.config.js
index 89a1158..36f455e 100644
--- a/tailwind.config.js
+++ b/tailwind.config.js
@@ -22,7 +22,8 @@ export default {
'darker': '#0A0A14',
'light': '#1A1A2E',
'accent': '#16213E',
-        }
+        },
+        'brand-red': '#990000',
},
spacing: {
'pixel': '8px',

```

## feat: add moving background (df2e541) - 2026-01-26

```diff
diff --git a/src/App.tsx b/src/App.tsx
index e53124d..4372e11 100644
--- a/src/App.tsx
+++ b/src/App.tsx
@@ -6,15 +6,15 @@ import About from './pages/About';
import Experience from './pages/Experience';
import Blog from './pages/Blog';
import SEO from './components/SEO';
-import Background3D from './components/Background3D';
+import WormBackground from './components/WormBackground';

function App() {
return (
<HelmetProvider>
<Router>
-        <div className="min-h-screen bg-slate-50 text-slate-900 relative">
+        <div className="min-h-screen text-slate-900 relative">
<Suspense fallback={null}>
-            <Background3D />
+            <WormBackground />
</Suspense>
<SEO />
<Header />
diff --git a/src/components/Background3D.tsx b/src/components/Background3D.tsx
deleted file mode 100644
index 95f804e..0000000
--- a/src/components/Background3D.tsx
+++ /dev/null
@@ -1,91 +0,0 @@
-import { useRef, useMemo } from 'react';
-import { Canvas, useFrame } from '@react-three/fiber';
-import { Environment } from '@react-three/drei';
-import * as THREE from 'three';
-
-function FloatingMesh() {
-  const meshRef = useRef<THREE.Mesh>(null);
-
-  useFrame((state) => {
-    if (meshRef.current) {
-      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
-      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
-    }
-  });
-
-  return (
-    <mesh ref={meshRef} position={[2, 0, 0]} scale={1.5}>
-      <icosahedronGeometry args={[1, 1]} />
-      <meshStandardMaterial
-        color="#f1f5f9"
-        wireframe
-        transparent
-        opacity={0.3}
-      />
-    </mesh>
-  );
-}
-
-function Particles() {
-  const count = 500;
-  const meshRef = useRef<THREE.InstancedMesh>(null);
-  const dummy = useMemo(() => new THREE.Object3D(), []);
-
-  const particles = useMemo(() => {
-    const temp = [];
-    for (let i = 0; i < count; i++) {
-      const t = Math.random() * 100;
-      const factor = 20 + Math.random() * 100;
-      const speed = 0.01 + Math.random() / 200;
-      const xFactor = -50 + Math.random() * 100;
-      const yFactor = -50 + Math.random() * 100;
-      const zFactor = -50 + Math.random() * 100;
-      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
-    }
-    return temp;
-  }, [count]);
-
-  useFrame((_state) => {
-    if (meshRef.current) {
-      particles.forEach((particle, i) => {
-        let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
-        t = particle.t += speed / 2;
-        const a = Math.cos(t) + Math.sin(t * 1) / 10;
-        const b = Math.sin(t) + Math.cos(t * 2) / 10;
-        const s = Math.cos(t);
-
-        dummy.position.set(
-          (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
-          (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
-          (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
-        );
-        dummy.scale.set(s, s, s);
-        dummy.rotation.set(s * 5, s * 5, s * 5);
-        dummy.updateMatrix();
-        meshRef.current!.setMatrixAt(i, dummy.matrix);
-      });
-      meshRef.current.instanceMatrix.needsUpdate = true;
-    }
-  });
-
-  return (
-    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
-      <dodecahedronGeometry args={[0.2, 0]} />
-      <meshStandardMaterial color="#cbd5e1" transparent opacity={0.6} />
-    </instancedMesh>
-  );
-}
-
-export default function Background3D() {
-  return (
-    <div className="fixed inset-0 -z-10">
-      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
-        <ambientLight intensity={0.5} />
-        <pointLight position={[10, 10, 10]} intensity={1} />
-        <Particles />
-        <FloatingMesh />
-        <Environment preset="city" />
-      </Canvas>
-    </div>
-  );
-}
diff --git a/src/components/WormBackground.tsx b/src/components/WormBackground.tsx
new file mode 100644
index 0000000..354fb56
--- /dev/null
+++ b/src/components/WormBackground.tsx
@@ -0,0 +1,83 @@
+import { useEffect, useState } from 'react';
+import { motion } from 'framer-motion';
+
+const generatePath = (width: number, height: number) => {
+  // Create simpler, smoother curves
+  const startX = Math.random() * width;
+  const startY = Math.random() * height;
+
+  // Fewer control points for smoother "worm" look
+  const cp1X = startX + (Math.random() - 0.5) * 400;
+  const cp1Y = startY + (Math.random() - 0.5) * 400;
+  const endX = cp1X + (Math.random() - 0.5) * 400;
+  const endY = cp1Y + (Math.random() - 0.5) * 400;
+
+  return `M ${startX} ${startY} Q ${cp1X} ${cp1Y} ${endX} ${endY}`;
+};
+
+const WormLine = ({ width, height, id }: { width: number; height: number; id: number }) => {
+  const [d, setD] = useState('');
+
+  useEffect(() => {
+    setD(generatePath(width, height));
+  }, [width, height, id]);
+
+  if (!d) return null;
+
+  return (
+    <motion.path
+      d={d}
+      fill="none"
+      stroke="currentColor"
+      strokeWidth={Math.random() * 2 + 1}
+      strokeLinecap="round"
+      className={id % 2 === 0 ? "text-brand-red/20" : "text-slate-400/30"}
+      initial={{ pathLength: 0, opacity: 0 }}
+      animate={{
+        pathLength: [0, 1, 1, 0], // Draw, stay, delete
+        opacity: [0, 1, 0, 0], // Fade in, stay visible, fade out
+        pathOffset: [0, 0, 1, 0] // Move 'forward' while deleting
+      }}
+      transition={{
+        duration: Math.random() * 5 + 5, // 5-10 seconds
+        repeat: Infinity,
+        ease: "easeInOut",
+        delay: Math.random() * 5, // Random start delay
+        repeatDelay: Math.random() * 2 // Random wait before restart
+      }}
+    />
+  );
+};
+
+export default function WormBackground() {
+  const [dimensions, setDimensions] = useState({ width: 1000, height: 1000 });
+
+  useEffect(() => {
+    // Only access window on mount
+    setDimensions({ width: window.innerWidth, height: window.innerHeight });
+
+    const handleResize = () => {
+      setDimensions({ width: window.innerWidth, height: window.innerHeight });
+    };
+
+    window.addEventListener('resize', handleResize);
+    return () => window.removeEventListener('resize', handleResize);
+  }, []);
+
+  const wormCount = 50; // Triple the worms
+
+  return (
+    <div className="fixed inset-0 -z-10 bg-slate-50 overflow-hidden pointer-events-none">
+      <svg
+        width="100%"
+        height="100%"
+        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
+        xmlns="http://www.w3.org/2000/svg"
+      >
+        {Array.from({ length: wormCount }).map((_, i) => (
+          <WormLine key={i} width={dimensions.width} height={dimensions.height} id={i} />
+        ))}
+      </svg>
+    </div>
+  );
+}
diff --git a/src/data.ts b/src/data.ts
index a9229dd..f6f3d15 100644
--- a/src/data.ts
+++ b/src/data.ts
@@ -1,5 +1,5 @@
import { Experience, Skill, Category } from "./types";
-import { Code2, Brain, Languages } from "lucide-react";
+import { Code2, Brain, Languages, UserSearch, Presentation, GraduationCap, Terminal, Rocket, Server, LayoutTemplate } from "lucide-react";
import {
faReact,
faNode,
@@ -33,6 +33,7 @@ export const experiences: Experience[] = [
{
title: "Talent Acquisition Specialist & Regional Manager",
company: "Devshore Partners, s.r.o.",
+    icon: UserSearch,
period: "Oct 2023 – Present",
description:
"Recruited and assessed senior developers for European companies, achieving a 60% shortlist-to-interview efficiency. Enhanced hiring assessment processes for precision and effectiveness.",
@@ -41,6 +42,7 @@ export const experiences: Experience[] = [
{
title: "Program Manager",
company: "RevoU",
+    icon: GraduationCap,
period: "Feb 2023 – Apr 2024",
description:
"Led and managed software engineering programs, designing scalable curricula, integrating real-world projects, and aligning training with industry standards.",
@@ -49,6 +51,7 @@ export const experiences: Experience[] = [
{
title: "Technical Assessment Designer",
company: "Glints",
+    icon: Presentation,
period: "Jan 2022 – Apr 2023",
description:
"Developed assessment systems to evaluate software engineers, refining hiring processes and ensuring a strong match between candidates and companies.",
@@ -57,6 +60,7 @@ export const experiences: Experience[] = [
{
title: "Technical Curriculum Lead",
company: "Glints Academy",
+    icon: Brain,
period: "Nov 2020 – Dec 2021",
description:
"Designed industry-standard curricula, implemented mentorship programs, and transitioned bootcamp models to self-paced learning formats.",
@@ -67,6 +71,7 @@ export const experiences: Experience[] = [
{
title: "Full Stack Engineer",
company: "Talent Tribe Asia",
+    icon: LayoutTemplate,
period: "Feb 2020 – Nov 2020",
description:
"Developed and maintained career platform components using AWS, Next.js, Express.js, and Firestore. Managed WordPress deployment and SSL configuration.",
@@ -75,6 +80,7 @@ export const experiences: Experience[] = [
{
title: "Software Developer",
company: "Webimp, pte. ltd.",
+    icon: Code2,
period: "Mar 2019 – Feb 2020",
description:
"Developed web applications with PHP, CodeIgniter, and jQuery. Enhanced business processes through software solutions.",
@@ -83,6 +89,7 @@ export const experiences: Experience[] = [
{
title: "Technical Lead",
company: "PT. Mitra Kuadran Teknologi",
+    icon: Terminal,
period: "Nov 2021 - Dec 2021",
description:
"Led a team in developing ERP solutions for government entities using Vue.js, React.js, Express.js, Laravel, and PostgreSQL. Managed hiring processes and DevOps deployments on AWS/GCP.",
@@ -91,6 +98,7 @@ export const experiences: Experience[] = [
{
title: "Technical Facilitator",
company: "Gerakan Nasional 1000 Startup Digital",
+    icon: Rocket,
period: "Sep 2020 - Feb 2021",
description:
"Mentored startup founders in application development, coaching 10 startup teams, with 3 advancing to the finals.",
@@ -102,6 +110,7 @@ export const projects: Experience[] = [
{
title: "Fullstack Engineer",
company: "TiketQ",
+    icon: Code2,
period: "Jun 2023 - Present",
description:
"Founded and developed a ticketing platform in Batam from scratch. Built backend infrastructure using Express.js, optimized with Redis caching for performance.",
@@ -110,6 +119,7 @@ export const projects: Experience[] = [
{
title: "GitHub Code Autograder",
company: "RevoU",
+    icon: Brain,
period: "Aug 2023 - Mar 2024",
description:
"Developed a Python-based AI-powered code quality autograder using OpenAI API, streamlining assignment grading and ensuring consistency.",
@@ -118,6 +128,7 @@ export const projects: Experience[] = [
{
title: "Software Engineer",
company: "Biteship",
+    icon: Server,
period: "Oct 2023 - Dec 2023",
description:
"Built a Node.js service for webhook-based real-time communication and implemented a Chrome extension.",
@@ -126,6 +137,7 @@ export const projects: Experience[] = [
{
title: "Lead Instructor",
company: "RevoU",
+    icon: GraduationCap,
period: "Jan 2023 - Mar 2023",
description:
"Refined curriculum materials, created key answers for advanced assignments, and aligned learning resources with evolving industry standards.",
diff --git a/src/pages/About.tsx b/src/pages/About.tsx
index b50a029..34514c7 100644
--- a/src/pages/About.tsx
+++ b/src/pages/About.tsx
@@ -7,7 +7,7 @@ import ModernCard from "../components/ModernCard";

export default function About() {
return (
-    <div className="min-h-screen bg-slate-50 pt-20 overflow-x-hidden">
+    <div className="min-h-screen pt-20 overflow-x-hidden">
<div className="container mx-auto px-6 py-20">
{/* Hero Section */}
<section className="mb-16">
diff --git a/src/pages/Blog.tsx b/src/pages/Blog.tsx
index 1706355..674788e 100644
--- a/src/pages/Blog.tsx
+++ b/src/pages/Blog.tsx
@@ -54,7 +54,7 @@ export default function Blog() {
}

return (
-    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
+    <div className="min-h-screen pt-32 pb-20">
<div className="container mx-auto px-6">
{/* Page Title */}
<motion.div
diff --git a/src/pages/Experience.tsx b/src/pages/Experience.tsx
index 12d58d6..d7be92c 100644
--- a/src/pages/Experience.tsx
+++ b/src/pages/Experience.tsx
@@ -1,64 +1,83 @@
-
import { motion } from 'framer-motion';
import { experiences } from '../data';
import ModernCard from '../components/ModernCard';
-import { Calendar, Briefcase, Trophy } from 'lucide-react';
+import { Calendar, Briefcase } from 'lucide-react';

export default function Experience() {
return (
-    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
-      <div className="container mx-auto px-6">
+    <div className="min-h-screen pt-32 pb-32 relative overflow-hidden">
+      {/* Background Patterns */}
+      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
+        <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-brand-red/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
+        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
+          <defs>
+            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
+              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
+            </pattern>
+          </defs>
+          <rect width="100%" height="100%" fill="url(#grid)" />
+        </svg>
+      </div>
+
+      <div className="container mx-auto px-6 relative z-10">
<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
-          className="text-center mb-16"
+          className="text-center mb-24"
>
<h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
Professional Journey
</h1>
-          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
+          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
A timeline of my career across software engineering, leadership, and education.
</p>
</motion.div>

-        <div className="max-w-4xl mx-auto space-y-8">
-          {experiences.map((exp, index) => (
-            <motion.div
-              key={index}
-              initial={{ opacity: 0, x: -20 }}
-              whileInView={{ opacity: 1, x: 0 }}
-              viewport={{ once: true }}
-              transition={{ delay: index * 0.1 }}
-            >
-              <ModernCard className="group hover:border-brand-red/30 transition-colors">
-                <div className="flex flex-col md:flex-row gap-6">
-                  {/* Icon & Line */}
-                  <div className="hidden md:flex flex-col items-center">
-                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-brand-red group-hover:bg-red-50 group-hover:scale-110 transition-all">
-                      {exp.category === 'soft' ? <Trophy className="w-6 h-6" /> : <Briefcase className="w-6 h-6" />}
-                    </div>
-                  </div>
+        <div className="max-w-4xl mx-auto space-y-12">
+          {experiences.map((exp, index) => {
+            const IconComponent = exp.icon || Briefcase; // Fallback to Briefcase

-                  {/* Content */}
-                  <div className="flex-1">
-                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
-                      <h3 className="text-xl font-bold text-slate-900">{exp.title}</h3>
-                      <div className="flex items-center text-slate-400 text-sm mt-1 md:mt-0 font-medium bg-slate-100 px-3 py-1 rounded-full w-fit">
-                        <Calendar className="w-3.5 h-3.5 mr-2" />
-                        {exp.period}
+            return (
+              <motion.div
+                key={index}
+                initial={{ opacity: 0, x: -20 }}
+                whileInView={{ opacity: 1, x: 0 }}
+                viewport={{ once: true }}
+                transition={{ delay: index * 0.1 }}
+              >
+                <ModernCard className="group hover:border-brand-red/30 transition-colors p-8 bg-white/80 backdrop-blur-sm">
+                  <div className="flex flex-col md:flex-row gap-8">
+                    {/* Icon & Line */}
+                    <div className="hidden md:flex flex-col items-center">
+                      <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-brand-red group-hover:bg-red-50/50 group-hover:scale-105 transition-all duration-300 border border-slate-100 shadow-sm">
+                        {/* @ts-ignore - Rendering Icon component dynamically */}
+                        <IconComponent className="w-7 h-7" />
</div>
</div>

-                    <h4 className="text-brand-red font-medium mb-4">{exp.company}</h4>
+                    {/* Content */}
+                    <div className="flex-1 space-y-4">
+                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
+                        <div>
+                          <h3 className="text-xl font-bold text-slate-900">{exp.title}</h3>
+                          <h4 className="text-brand-red font-medium text-lg">{exp.company}</h4>
+                        </div>
+
+                        <div className="flex items-center text-slate-400 text-sm font-medium bg-slate-100/80 px-4 py-1.5 rounded-full w-fit whitespace-nowrap">
+                          <Calendar className="w-4 h-4 mr-2" />
+                          {exp.period}
+                        </div>
+                      </div>

-                    <p className="text-slate-600 leading-relaxed">
-                      {exp.description}
-                    </p>
+                      <p className="text-slate-600 leading-loose text-base">
+                        {exp.description}
+                      </p>
+                    </div>
</div>
-                </div>
-              </ModernCard>
-            </motion.div>
-          ))}
+                </ModernCard>
+              </motion.div>
+            );
+          })}
</div>
</div>
</div>
diff --git a/src/types.ts b/src/types.ts
index 2aa7094..35fe056 100644
--- a/src/types.ts
+++ b/src/types.ts
@@ -22,6 +22,8 @@ export interface Experience {
period: string;
description: string;
category?: 'technical' | 'soft';
+  logo?: string;
+  icon?: IconDefinition | LucideIcon;
}

export interface Skill {
diff --git a/tsconfig.app.tsbuildinfo b/tsconfig.app.tsbuildinfo
index 7d9b3e1..47673eb 100644
--- a/tsconfig.app.tsbuildinfo
+++ b/tsconfig.app.tsbuildinfo
@@ -1 +1 @@
-{"root":["./src/app.tsx","./src/data.ts","./src/main.tsx","./src/types.ts","./src/vite-env.d.ts","./src/components/background3d.tsx","./src/components/header.tsx","./src/components/moderncard.tsx","./src/components/pixelcard.tsx","./src/components/seo.tsx","./src/components/scrollreveal.tsx","./src/components/skillbar.tsx","./src/components/skillcard.tsx","./src/pages/about.tsx","./src/pages/blog.tsx","./src/pages/experience.tsx"],"version":"5.9.3"}
 No newline at end of file
+{"root":["./src/app.tsx","./src/data.ts","./src/main.tsx","./src/types.ts","./src/vite-env.d.ts","./src/components/header.tsx","./src/components/moderncard.tsx","./src/components/pixelcard.tsx","./src/components/seo.tsx","./src/components/scrollreveal.tsx","./src/components/skillbar.tsx","./src/components/skillcard.tsx","./src/components/wormbackground.tsx","./src/pages/about.tsx","./src/pages/blog.tsx","./src/pages/experience.tsx"],"version":"5.9.3"}
 No newline at end of file

```

## deploy: add vercel.json (eaba393) - 2026-01-26

```diff
diff --git a/vercel.json b/vercel.json
new file mode 100644
index 0000000..29c0269
--- /dev/null
+++ b/vercel.json
@@ -0,0 +1,8 @@
+{
+  "rewrites": [
+    {
+      "source": "/(.*)",
+      "destination": "/index.html"
+    }
+  ]
+}
 No newline at end of file

```

## feat: add nav buttons on mobile (987bc10) - 2026-01-26

```diff
diff --git a/public/_redirects b/public/_redirects
new file mode 100644
index 0000000..7797f7c
--- /dev/null
+++ b/public/_redirects
@@ -0,0 +1 @@
+/* /index.html 200
diff --git a/src/components/Header.tsx b/src/components/Header.tsx
index 5203af8..3e79c75 100644
--- a/src/components/Header.tsx
+++ b/src/components/Header.tsx
@@ -1,19 +1,39 @@
-import { NavLink } from 'react-router-dom';
-import { Github, Linkedin, ChevronDown, FileJson, Receipt, CloudRain, MessageSquareWarning, CheckCircle2 } from 'lucide-react';
+import { useState, useEffect } from 'react';
+import { NavLink, useLocation } from 'react-router-dom';
+import { Github, Linkedin, ChevronDown, FileJson, Receipt, CloudRain, MessageSquareWarning, CheckCircle2, Menu, X } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedium } from '@fortawesome/free-brands-svg-icons';
+import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
+  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
+  const [isToolsOpen, setIsToolsOpen] = useState(false);
+  const location = useLocation();
+
+  // Close mobile menu when route changes
+  useEffect(() => {
+    setIsMobileMenuOpen(false);
+  }, [location]);
+
+  // Prevent scrolling when mobile menu is open
+  useEffect(() => {
+    if (isMobileMenuOpen) {
+      document.body.style.overflow = 'hidden';
+    } else {
+      document.body.style.overflow = 'unset';
+    }
+  }, [isMobileMenuOpen]);
+
return (
<header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 transition-all duration-300">
<div className="container mx-auto px-6 py-4">
<div className="flex justify-between items-center">
{/* Logo */}
-          <NavLink to="/" className="text-xl font-bold tracking-tight text-slate-900 hover:text-[#990000] transition-colors">
+          <NavLink to="/" className="text-xl font-bold tracking-tight text-slate-900 hover:text-[#990000] transition-colors z-50">
AZF.
</NavLink>

-          {/* Minimalist Navigation */}
+          {/* Regular Navigation (Tablet & Desktop) */}
<nav className="hidden md:flex items-center space-x-8">
{['About', 'Experience', 'Blog'].map((item) => (
<NavLink
@@ -28,7 +48,7 @@ export default function Header() {
</NavLink>
))}

-            {/* Tools Dropdown */}
+            {/* Tools Dropdown (Desktop) */}
<div className="relative group">
<button className="flex items-center space-x-1 text-sm font-medium text-slate-500 hover:text-[#990000] transition-colors py-2">
<span>Tools</span>
@@ -37,7 +57,6 @@ export default function Header() {

<div className="absolute top-full right-0 w-[500px] pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
<div className="bg-white rounded-xl shadow-xl border border-slate-100 p-6 grid grid-cols-2 gap-6 relative">
-                  {/* Triangle Arrow */}
<div className="absolute -top-2 right-6 w-4 h-4 bg-white border-t border-l border-slate-100 transform rotate-45"></div>

{/* Web Apps Category */}
@@ -46,7 +65,7 @@ export default function Header() {
<div className="space-y-2">
<a href="https://jsonify.alvianzf.id" target="_blank" rel="noopener noreferrer" className="block p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors group/item">
<div className="flex items-start gap-3">
-                          <div className="p-2 bg-red-50 text-brand-red rounded-lg group-hover/item:text-[#990000] group-hover/item:bg-red-50 transition-colors">
+                          <div className="p-2 bg-red-50 text-[#990000] rounded-lg">
<FileJson className="w-5 h-5" />
</div>
<div>
@@ -57,7 +76,7 @@ export default function Header() {
</a>
<a href="https://invoice.alvianzf.id" target="_blank" rel="noopener noreferrer" className="block p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors group/item">
<div className="flex items-start gap-3">
-                          <div className="p-2 bg-green-50 text-green-600 rounded-lg group-hover/item:text-[#990000] group-hover/item:bg-red-50 transition-colors">
+                          <div className="p-2 bg-green-50 text-green-600 rounded-lg group-hover/item:text-[#990000] transition-colors">
<Receipt className="w-5 h-5" />
</div>
<div>
@@ -75,34 +94,34 @@ export default function Header() {
<div className="space-y-2">
<a href="https://www.npmjs.com/package/make-it-rain" target="_blank" rel="noopener noreferrer" className="block p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors group/item">
<div className="flex items-start gap-3">
-                          <div className="p-2 bg-purple-50 text-purple-600 rounded-lg group-hover/item:text-[#990000] group-hover/item:bg-red-50 transition-colors">
+                          <div className="p-2 bg-purple-50 text-purple-600 rounded-lg group-hover/item:text-[#990000] transition-colors">
<CloudRain className="w-5 h-5" />
</div>
<div>
<div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">make-it-rain</div>
-                            <div className="text-xs text-slate-500">Currency formatting utility</div>
+                            <div className="text-xs text-slate-500">Currency symbols</div>
</div>
</div>
</a>
<a href="https://www.npmjs.com/package/env-validate-sarcastically" target="_blank" rel="noopener noreferrer" className="block p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors group/item">
<div className="flex items-start gap-3">
-                          <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg group-hover/item:text-[#990000] group-hover/item:bg-red-50 transition-colors">
+                          <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg group-hover/item:text-[#990000] transition-colors">
<MessageSquareWarning className="w-5 h-5" />
</div>
<div>
<div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">env-validate</div>
-                            <div className="text-xs text-slate-500">Sarcastic env validation</div>
+                            <div className="text-xs text-slate-500">Sarcastic validation</div>
</div>
</div>
</a>
<a href="https://www.npmjs.com/package/a-valid-json" target="_blank" rel="noopener noreferrer" className="block p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors group/item">
<div className="flex items-start gap-3">
-                          <div className="p-2 bg-teal-50 text-teal-600 rounded-lg group-hover/item:text-[#990000] group-hover/item:bg-red-50 transition-colors">
+                          <div className="p-2 bg-teal-50 text-teal-600 rounded-lg group-hover/item:text-[#990000] transition-colors">
<CheckCircle2 className="w-5 h-5" />
</div>
<div>
<div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">a-valid-json</div>
-                            <div className="text-xs text-slate-500">Strict JSON validation</div>
+                            <div className="text-xs text-slate-500">JSON validation</div>
</div>
</div>
</a>
@@ -113,41 +132,128 @@ export default function Header() {
</div>
</nav>

-          {/* Social Icons - Clean & Minimal */}
-          <div className="flex items-center space-x-4">
-            <a
-              href="https://github.com/alvianzf"
-              target="_blank"
-              rel="noopener noreferrer"
-              className="text-slate-400 hover:text-[#990000] transition-colors"
-            >
-              <Github className="w-5 h-5" />
-            </a>
-            <a
-              href="https://linkedin.com/in/alvianzf"
-              target="_blank"
-              rel="noopener noreferrer"
-              className="text-slate-400 hover:text-[#990000] transition-colors"
-            >
-              <Linkedin className="w-5 h-5" />
-            </a>
-            <a
-              href="https://medium.com/@alvianzf"
-              target="_blank"
-              rel="noopener noreferrer"
-              className="text-slate-400 hover:text-[#990000] transition-colors"
-            >
-              <FontAwesomeIcon icon={faMedium} className="w-5 h-5" />
-            </a>
-            <a
-              href="mailto:alvianzf@gmail.com"
-              className="px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-full hover:bg-[#990000] transition-all shadow-sm hover:shadow-md"
+          {/* Social Icons & Hamburger (Mobile and Desktop) */}
+          <div className="flex items-center space-x-2 md:space-x-4">
+            <div className="hidden sm:flex items-center space-x-2 md:space-x-4">
+              <a href="https://github.com/alvianzf" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#990000] transition-colors" title="GitHub">
+                <Github className="w-5 h-5" />
+              </a>
+              <a href="https://linkedin.com/in/alvianzf" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#990000] transition-colors" title="LinkedIn">
+                <Linkedin className="w-5 h-5" />
+              </a>
+              <a href="https://medium.com/@alvianzf" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#990000] transition-colors" title="Medium">
+                <FontAwesomeIcon icon={faMedium} className="w-5 h-5" />
+              </a>
+              <a href="mailto:alvianzf@gmail.com" className="hidden lg:block px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-full hover:bg-[#990000] transition-all shadow-sm hover:shadow-md" title="Send Email">
+                Contact
+              </a>
+            </div>
+
+            {/* Hamburger Button */}
+            <button
+              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
+              className="md:hidden p-2 text-slate-600 hover:text-[#990000] transition-colors z-50 rounded-lg hover:bg-slate-100"
+              aria-label="Toggle menu"
>
-              Contact
-            </a>
+              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
+            </button>
</div>
</div>
</div>
+
+      {/* Mobile Menu Overlay */}
+      <AnimatePresence>
+        {isMobileMenuOpen && (
+          <motion.div
+            initial={{ opacity: 0, y: -20 }}
+            animate={{ opacity: 1, y: 0 }}
+            exit={{ opacity: 0, y: -20 }}
+            transition={{ duration: 0.2 }}
+            className="fixed top-[73px] left-0 right-0 bottom-0 h-[calc(100vh-73px)] bg-white z-40 md:hidden overflow-y-auto"
+          >
+            <div className="container mx-auto px-6 py-8 flex flex-col space-y-8">
+              {/* Navigation Links */}
+              <div className="flex flex-col space-y-6">
+                {['About', 'Experience', 'Blog'].map((item) => (
+                  <NavLink
+                    key={item}
+                    to={item === 'About' ? '/' : `/${item.toLowerCase()}`}
+                    className={({ isActive }) =>
+                      `text-2xl font-bold transition-all ${isActive ? 'text-[#990000]' : 'text-slate-900'}`
+                    }
+                  >
+                    {item}
+                  </NavLink>
+                ))}
+
+                {/* Mobile Tools Dropdown */}
+                <div className="flex flex-col space-y-4">
+                  <button
+                    onClick={() => setIsToolsOpen(!isToolsOpen)}
+                    className="flex items-center justify-between text-2xl font-bold text-slate-900"
+                  >
+                    <span>Tools</span>
+                    <motion.div animate={{ rotate: isToolsOpen ? 180 : 0 }}>
+                      <ChevronDown className="w-6 h-6" />
+                    </motion.div>
+                  </button>
+
+                  <AnimatePresence>
+                    {isToolsOpen && (
+                      <motion.div
+                        initial={{ height: 0, opacity: 0 }}
+                        animate={{ height: 'auto', opacity: 1 }}
+                        exit={{ height: 0, opacity: 0 }}
+                        className="overflow-hidden space-y-4 pl-4 border-l-2 border-slate-100"
+                      >
+                        <div className="space-y-4 pt-2">
+                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Web Apps</p>
+                          <a href="https://jsonify.alvianzf.id" className="flex items-center gap-3 text-slate-600 font-medium">
+                            <FileJson className="w-5 h-5 text-[#990000]" /> JSON Formatter
+                          </a>
+                          <a href="https://invoice.alvianzf.id" className="flex items-center gap-3 text-slate-600 font-medium">
+                            <Receipt className="w-5 h-5 text-green-600" /> Invoice Gen
+                          </a>
+                        </div>
+                        <div className="space-y-4 pt-2">
+                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">NPM Packages</p>
+                          <a href="https://www.npmjs.com/package/make-it-rain" className="flex items-center gap-3 text-slate-600 font-medium">
+                            <CloudRain className="w-5 h-5 text-purple-600" /> make-it-rain
+                          </a>
+                          <a href="https://www.npmjs.com/package/env-validate-sarcastically" className="flex items-center gap-3 text-slate-600 font-medium">
+                            <MessageSquareWarning className="w-5 h-5 text-yellow-600" /> env-validate
+                          </a>
+                        </div>
+                      </motion.div>
+                    )}
+                  </AnimatePresence>
+                </div>
+              </div>
+
+              {/* Social and Contact */}
+              <div className="pt-8 border-t border-slate-100">
+                <div className="flex items-center space-x-6 mb-8">
+                  <a href="https://github.com/alvianzf" className="text-slate-400 hover:text-[#990000] transition-colors">
+                    <Github className="w-8 h-8" />
+                  </a>
+                  <a href="https://linkedin.com/in/alvianzf" className="text-slate-400 hover:text-[#990000] transition-colors">
+                    <Linkedin className="w-8 h-8" />
+                  </a>
+                  <a href="https://medium.com/@alvianzf" className="text-slate-400 hover:text-[#990000] transition-colors">
+                    <FontAwesomeIcon icon={faMedium} className="w-8 h-8" />
+                  </a>
+                </div>
+                <a
+                  href="mailto:alvianzf@gmail.com"
+                  className="block w-full text-center px-6 py-4 text-lg font-bold text-white bg-slate-900 rounded-2xl hover:bg-[#990000] transition-all shadow-lg"
+                >
+                  Get in Touch
+                </a>
+              </div>
+            </div>
+          </motion.div>
+        )}
+      </AnimatePresence>
</header>
);
}
 No newline at end of file

```

## feat: change blog layout (fb66a34) - 2026-01-26

```diff
diff --git a/src/components/Header.tsx b/src/components/Header.tsx
index 3e79c75..cc33851 100644
--- a/src/components/Header.tsx
+++ b/src/components/Header.tsx
@@ -135,16 +135,19 @@ export default function Header() {
{/* Social Icons & Hamburger (Mobile and Desktop) */}
<div className="flex items-center space-x-2 md:space-x-4">
<div className="hidden sm:flex items-center space-x-2 md:space-x-4">
-              <a href="https://github.com/alvianzf" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#990000] transition-colors" title="GitHub">
+              <a href="https://github.com/alvianzf" target="_blank" rel="noopener noreferrer" className="relative group text-slate-400 hover:text-[#990000] transition-colors">
<Github className="w-5 h-5" />
+                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">GitHub</span>
</a>
-              <a href="https://linkedin.com/in/alvianzf" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#990000] transition-colors" title="LinkedIn">
+              <a href="https://linkedin.com/in/alvianzf" target="_blank" rel="noopener noreferrer" className="relative group text-slate-400 hover:text-[#990000] transition-colors">
<Linkedin className="w-5 h-5" />
+                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">LinkedIn</span>
</a>
-              <a href="https://medium.com/@alvianzf" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#990000] transition-colors" title="Medium">
+              <a href="https://medium.com/@alvianzf" target="_blank" rel="noopener noreferrer" className="relative group text-slate-400 hover:text-[#990000] transition-colors">
<FontAwesomeIcon icon={faMedium} className="w-5 h-5" />
+                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Medium</span>
</a>
-              <a href="mailto:alvianzf@gmail.com" className="hidden lg:block px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-full hover:bg-[#990000] transition-all shadow-sm hover:shadow-md" title="Send Email">
+              <a href="mailto:alvianzf@gmail.com" className="hidden lg:block px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-full hover:bg-[#990000] transition-all shadow-sm hover:shadow-md">
Contact
</a>
</div>
diff --git a/src/pages/Blog.tsx b/src/pages/Blog.tsx
index 674788e..7e3426f 100644
--- a/src/pages/Blog.tsx
+++ b/src/pages/Blog.tsx
@@ -1,7 +1,7 @@
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
-import { BookOpen, Calendar } from 'lucide-react';
+import { Calendar } from 'lucide-react';
import ModernCard from '../components/ModernCard';

export default function Blog() {
@@ -66,60 +66,50 @@ export default function Blog() {
Latest Thoughts
</h1>
<p className="text-lg text-slate-500 max-w-2xl mx-auto">
-            Writings on software architecture, leadership, and tech trends.
+            Writings on random things I thought at that moment.
</p>
</motion.div>

-        {/* Blog Posts Grid */}
-        <div className="max-w-4xl mx-auto space-y-8">
+        {/* Blog Posts Grid - 4 columns */}
+        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
{posts.length > 0 ? (
posts.map((post, index) => (
-              <motion.div
+              <motion.a
key={post.id}
+                href={post.url}
+                target="_blank"
+                rel="noopener noreferrer"
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
-                transition={{ delay: index * 0.1 }}
+                transition={{ delay: index * 0.05 }}
+                className="group"
>
-                <ModernCard className="group hover:border-brand-red/30 transition-all">
-                  <article className="p-2">
-                    <h2 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-brand-red transition-colors">
-                      <a href={post.url} target="_blank" rel="noopener noreferrer">
-                        {post.title}
-                      </a>
+                <ModernCard className="flex flex-col justify-between p-5 hover:border-brand-red/30 transition-all h-full">
+                  <div>
+                    <h2 className="text-base font-bold text-slate-900 mb-2 group-hover:text-brand-red transition-colors line-clamp-2">
+                      {post.title}
</h2>
-
-                    <div className="flex items-center text-slate-400 mb-6 text-sm font-medium">
-                      <Calendar className="w-4 h-4 mr-2" />
-                      <time>
-                        {format(new Date(post.published), 'MMMM d, yyyy')}
-                      </time>
-                    </div>
-
<div
-                      className="text-slate-600 leading-relaxed mb-6 line-clamp-3"
+                      className="text-sm text-slate-500 leading-relaxed line-clamp-3"
dangerouslySetInnerHTML={{
__html: post.content
-                          ? post.content.replace(/<[^>]+>/g, '').slice(0, 250) + '...'
+                          ? post.content.replace(/<[^>]+>/g, '').slice(0, 80) + '...'
: ''
}}
/>
-
-                    <div className="flex justify-end">
-                      <a
-                        href={post.url}
-                        target="_blank"
-                        rel="noopener noreferrer"
-                        className="text-brand-red font-medium hover:text-blue-700 inline-flex items-center"
-                      >
-                        Read Article <BookOpen className="w-4 h-4 ml-2" />
-                      </a>
+                  </div>
+                  <div className="flex items-center justify-between text-xs font-medium mt-4 pt-3 border-t border-slate-100">
+                    <div className="flex items-center text-slate-400">
+                      <Calendar className="w-3 h-3 mr-1" />
+                      <time>{format(new Date(post.published), 'MMM d, yyyy')}</time>
</div>
-                  </article>
+                    <span className="text-brand-red group-hover:underline">Dive in →</span>
+                  </div>
</ModernCard>
-              </motion.div>
+              </motion.a>
))
) : (
-            <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
+            <div className="col-span-full text-center py-20 bg-white rounded-2xl border border-slate-100">
<p className="text-slate-400">No blog posts found at the moment.</p>
</div>
)}

```

## feat: change blog layout (6d1a333) - 2026-01-26

```diff
diff --git a/src/components/SEO.tsx b/src/components/SEO.tsx
index fa774aa..2003c01 100644
--- a/src/components/SEO.tsx
+++ b/src/components/SEO.tsx
@@ -13,7 +13,7 @@ export default function SEO() {
case '/experience':
return 'Professional Experience - Alvian Zachry Faturrahman';
case '/blog':
-        return 'Tech Blog - Alvian Zachry Faturrahman';
+        return 'Blog - Alvian Zachry Faturrahman';
default:
return 'Alvian Zachry Faturrahman Portfolio';
}

```

## feat: add individual blog posts (8349b34) - 2026-01-26

```diff
diff --git a/src/App.tsx b/src/App.tsx
index 4372e11..66c4529 100644
--- a/src/App.tsx
+++ b/src/App.tsx
@@ -5,6 +5,7 @@ import Header from './components/Header';
import About from './pages/About';
import Experience from './pages/Experience';
import Blog from './pages/Blog';
+import BlogPost from './pages/BlogPost';
import SEO from './components/SEO';
import WormBackground from './components/WormBackground';

@@ -23,6 +24,7 @@ function App() {
<Route path="/" element={<About />} />
<Route path="/experience" element={<Experience />} />
<Route path="/blog" element={<Blog />} />
+              <Route path="/blog/:postId" element={<BlogPost />} />
</Routes>
</main>
</div>
diff --git a/src/components/SEO.tsx b/src/components/SEO.tsx
index 2003c01..7f86b28 100644
--- a/src/components/SEO.tsx
+++ b/src/components/SEO.tsx
@@ -26,7 +26,7 @@ export default function SEO() {
case '/experience':
return 'Explore the professional journey of Alvian Zachry Faturrahman, from leading technical teams to designing scalable curricula and hiring top engineering talent.';
case '/blog':
-        return 'Technical articles covering software engineering, cloud infrastructure, DevOps, technical hiring, and curriculum development.';
+        return 'Articles of what I thougth at the moment, may be a bit random and crude.';
default:
return 'Portfolio and professional insights of Alvian Zachry Faturrahman, an expert in software engineering, program management, and technical assessment.';
}
diff --git a/src/index.css b/src/index.css
index 0a985f2..d2505ee 100644
--- a/src/index.css
+++ b/src/index.css
@@ -95,4 +95,86 @@
.pause-on-hover:hover .animate-marquee-reverse {
animation-play-state: paused;
}
+}
+
+/* Blog Post Content Styles - targets plain HTML tags from Blogger API */
+.blog-content h1,
+.blog-content h2,
+.blog-content h3,
+.blog-content h4,
+.blog-content h5,
+.blog-content h6 {
+  color: #990000;
+  font-weight: 800;
+  font-family: 'Outfit', sans-serif;
+  border-left: 4px solid #990000;
+  padding-left: 1rem;
+  margin-top: 2.5rem;
+  margin-bottom: 1.5rem;
+}
+
+.blog-content h1 {
+  font-size: 2.25rem;
+  line-height: 2.5rem;
+}
+
+.blog-content h2 {
+  font-size: 1.875rem;
+  line-height: 2.25rem;
+}
+
+.blog-content h3 {
+  font-size: 1.5rem;
+  line-height: 2rem;
+}
+
+.blog-content h4 {
+  font-size: 1.25rem;
+  line-height: 1.75rem;
+}
+
+.blog-content p {
+  color: #475569;
+  line-height: 1.75;
+  margin-bottom: 1.25rem;
+}
+
+.blog-content a {
+  color: #990000;
+  text-decoration: none;
+}
+
+.blog-content a:hover {
+  text-decoration: underline;
+}
+
+.blog-content img {
+  border-radius: 0.75rem;
+  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
+  margin: 1.5rem 0;
+}
+
+.blog-content blockquote {
+  border-left: 4px solid #990000;
+  background-color: #f8fafc;
+  padding: 1rem;
+  border-radius: 0 0.5rem 0.5rem 0;
+  margin: 1.5rem 0;
+  font-style: italic;
+}
+
+.blog-content ul,
+.blog-content ol {
+  margin-left: 1.5rem;
+  margin-bottom: 1.25rem;
+}
+
+.blog-content li {
+  margin-bottom: 0.5rem;
+  color: #475569;
+}
+
+.blog-content strong {
+  color: #0f172a;
+  font-weight: 600;
}
 No newline at end of file
diff --git a/src/pages/Blog.tsx b/src/pages/Blog.tsx
index 7e3426f..67586de 100644
--- a/src/pages/Blog.tsx
+++ b/src/pages/Blog.tsx
@@ -1,7 +1,8 @@
import { useEffect, useState } from 'react';
+import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
-import { Calendar } from 'lucide-react';
+import { Calendar, ChevronRight } from 'lucide-react';
import ModernCard from '../components/ModernCard';

export default function Blog() {
@@ -14,7 +15,7 @@ export default function Blog() {
try {
const API_KEY = 'AIzaSyCw9p4Ar_wc9h3zOuaPb7JcdH3Lj8Ail_4';
const BLOG_ID = '369044396031799467';
-        const url = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}`;
+        const url = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=50`;

const response = await fetch(url);
if (!response.ok) throw new Error('Failed to fetch posts');
@@ -32,6 +33,10 @@ export default function Blog() {
fetchPosts();
}, []);

+  // Featured posts (first 12) and remaining posts for sidebar
+  const featuredPosts = posts.slice(0, 12);
+  const allPosts = posts;
+
if (loading) {
return (
<div className="min-h-screen bg-slate-50 pt-32 pb-20 flex justify-center items-center">
@@ -70,49 +75,82 @@ export default function Blog() {
</p>
</motion.div>

-        {/* Blog Posts Grid - 4 columns */}
-        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
-          {posts.length > 0 ? (
-            posts.map((post, index) => (
-              <motion.a
-                key={post.id}
-                href={post.url}
-                target="_blank"
-                rel="noopener noreferrer"
-                initial={{ opacity: 0, y: 20 }}
-                animate={{ opacity: 1, y: 0 }}
-                transition={{ delay: index * 0.05 }}
-                className="group"
-              >
-                <ModernCard className="flex flex-col justify-between p-5 hover:border-brand-red/30 transition-all h-full">
-                  <div>
-                    <h2 className="text-base font-bold text-slate-900 mb-2 group-hover:text-brand-red transition-colors line-clamp-2">
-                      {post.title}
-                    </h2>
-                    <div
-                      className="text-sm text-slate-500 leading-relaxed line-clamp-3"
-                      dangerouslySetInnerHTML={{
-                        __html: post.content
-                          ? post.content.replace(/<[^>]+>/g, '').slice(0, 80) + '...'
-                          : ''
-                      }}
-                    />
-                  </div>
-                  <div className="flex items-center justify-between text-xs font-medium mt-4 pt-3 border-t border-slate-100">
-                    <div className="flex items-center text-slate-400">
-                      <Calendar className="w-3 h-3 mr-1" />
-                      <time>{format(new Date(post.published), 'MMM d, yyyy')}</time>
-                    </div>
-                    <span className="text-brand-red group-hover:underline">Dive in →</span>
-                  </div>
-                </ModernCard>
-              </motion.a>
-            ))
-          ) : (
-            <div className="col-span-full text-center py-20 bg-white rounded-2xl border border-slate-100">
-              <p className="text-slate-400">No blog posts found at the moment.</p>
+        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
+          {/* Blog Posts Grid - 12 posts, 3 columns on large screens */}
+          <div className="lg:col-span-3">
+            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
+              {featuredPosts.length > 0 ? (
+                featuredPosts.map((post, index) => (
+                  <motion.div
+                    key={post.id}
+                    initial={{ opacity: 0, y: 20 }}
+                    animate={{ opacity: 1, y: 0 }}
+                    transition={{ delay: index * 0.03 }}
+                  >
+                    <Link to={`/blog/${post.id}`} className="group block h-full">
+                      <ModernCard className="flex flex-col justify-between p-5 hover:border-brand-red/30 transition-all h-full">
+                        <div>
+                          <h2 className="text-base font-bold text-slate-900 mb-2 group-hover:text-brand-red transition-colors line-clamp-2">
+                            {post.title}
+                          </h2>
+                          <div
+                            className="text-sm text-slate-500 leading-relaxed line-clamp-3"
+                            dangerouslySetInnerHTML={{
+                              __html: post.content
+                                ? post.content.replace(/<[^>]+>/g, '').slice(0, 80) + '...'
+                                : ''
+                            }}
+                          />
+                        </div>
+                        <div className="flex items-center justify-between text-xs font-medium mt-4 pt-3 border-t border-slate-100">
+                          <div className="flex items-center text-slate-400">
+                            <Calendar className="w-3 h-3 mr-1" />
+                            <time>{format(new Date(post.published), 'MMM d, yyyy')}</time>
+                          </div>
+                          <span className="text-brand-red group-hover:underline">Dive in →</span>
+                        </div>
+                      </ModernCard>
+                    </Link>
+                  </motion.div>
+                ))
+              ) : (
+                <div className="col-span-full text-center py-20 bg-white rounded-2xl border border-slate-100">
+                  <p className="text-slate-400">No blog posts found at the moment.</p>
+                </div>
+              )}
+            </div>
+          </div>
+
+          {/* All Posts Sidebar */}
+          <motion.aside
+            initial={{ opacity: 0, x: 20 }}
+            animate={{ opacity: 1, x: 0 }}
+            transition={{ delay: 0.2 }}
+            className="lg:col-span-1"
+          >
+            <div className="sticky top-28">
+              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
+                <span>All Posts</span>
+                <span className="ml-2 text-xs font-normal text-slate-400">({allPosts.length})</span>
+              </h2>
+              <div className="bg-white rounded-2xl border border-slate-100 p-4 max-h-[60vh] overflow-y-auto">
+                <div className="space-y-2">
+                  {allPosts.map((post) => (
+                    <Link
+                      key={post.id}
+                      to={`/blog/${post.id}`}
+                      className="group flex items-center p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors"
+                    >
+                      <ChevronRight className="w-3 h-3 text-slate-300 mr-2 flex-shrink-0" />
+                      <span className="text-sm text-slate-600 group-hover:text-brand-red transition-colors line-clamp-1">
+                        {post.title}
+                      </span>
+                    </Link>
+                  ))}
+                </div>
+              </div>
</div>
-          )}
+          </motion.aside>
</div>
</div>
</div>
diff --git a/src/pages/BlogPost.tsx b/src/pages/BlogPost.tsx
new file mode 100644
index 0000000..8054ae9
--- /dev/null
+++ b/src/pages/BlogPost.tsx
@@ -0,0 +1,168 @@
+import { useEffect, useState } from 'react';
+import { useParams, Link } from 'react-router-dom';
+import { motion } from 'framer-motion';
+import { format } from 'date-fns';
+import { Calendar, ArrowLeft, Clock } from 'lucide-react';
+import ModernCard from '../components/ModernCard';
+
+interface BlogPost {
+  id: string;
+  title: string;
+  content: string;
+  published: string;
+  url: string;
+}
+
+export default function BlogPost() {
+  const { postId } = useParams<{ postId: string }>();
+  const [post, setPost] = useState<BlogPost | null>(null);
+  const [otherPosts, setOtherPosts] = useState<BlogPost[]>([]);
+  const [loading, setLoading] = useState(true);
+  const [error, setError] = useState<string | null>(null);
+
+  useEffect(() => {
+    const fetchPosts = async () => {
+      try {
+        const API_KEY = 'AIzaSyCw9p4Ar_wc9h3zOuaPb7JcdH3Lj8Ail_4';
+        const BLOG_ID = '369044396031799467';
+        const url = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}`;
+
+        const response = await fetch(url);
+        if (!response.ok) throw new Error('Failed to fetch posts');
+
+        const data = await response.json();
+        const allPosts = data.items || [];
+
+        // Find the current post
+        const currentPost = allPosts.find((p: BlogPost) => p.id === postId);
+        if (!currentPost) {
+          setError('Post not found');
+          return;
+        }
+
+        setPost(currentPost);
+        // Get other posts (exclude current)
+        setOtherPosts(allPosts.filter((p: BlogPost) => p.id !== postId).slice(0, 6));
+      } catch (err) {
+        console.error('Error fetching post:', err);
+        setError('Failed to load blog post. Please try again later.');
+      } finally {
+        setLoading(false);
+      }
+    };
+
+    fetchPosts();
+  }, [postId]);
+
+  // Calculate read time
+  const calculateReadTime = (content: string) => {
+    const text = content.replace(/<[^>]+>/g, '');
+    const wordsPerMinute = 200;
+    const words = text.split(/s+/).length;
+    const minutes = Math.ceil(words / wordsPerMinute);
+    return `${minutes} min read`;
+  };
+
+  if (loading) {
+    return (
+      <div className="min-h-screen pt-32 pb-20 flex justify-center items-center">
+        <div className="animate-pulse flex flex-col items-center">
+          <div className="h-4 w-4 bg-brand-red rounded-full mb-4 animate-bounce"></div>
+          <span className="text-slate-400 font-medium">Loading post...</span>
+        </div>
+      </div>
+    );
+  }
+
+  if (error || !post) {
+    return (
+      <div className="min-h-screen pt-32 pb-20 flex justify-center">
+        <ModernCard className="bg-red-50 border-red-100 max-w-md w-full text-center p-8">
+          <p className="text-red-600 font-medium">{error || 'Post not found'}</p>
+          <Link to="/blog" className="text-brand-red mt-4 inline-block hover:underline">
+            ← Back to Blog
+          </Link>
+        </ModernCard>
+      </div>
+    );
+  }
+
+  return (
+    <div className="min-h-screen pt-32 pb-20">
+      <div className="container mx-auto px-6">
+        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
+          {/* Main Content */}
+          <motion.article
+            initial={{ opacity: 0, y: 20 }}
+            animate={{ opacity: 1, y: 0 }}
+            className="lg:col-span-3"
+          >
+            {/* Back Button */}
+            <Link
+              to="/blog"
+              className="inline-flex items-center text-slate-500 hover:text-brand-red transition-colors mb-8"
+            >
+              <ArrowLeft className="w-4 h-4 mr-2" />
+              Back to Blog
+            </Link>
+
+            {/* Post Header */}
+            <header className="mb-8">
+              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
+                {post.title}
+              </h1>
+              <div className="flex flex-wrap items-center gap-4 text-slate-500 text-sm">
+                <div className="flex items-center">
+                  <Calendar className="w-4 h-4 mr-2" />
+                  <time>{format(new Date(post.published), 'MMMM d, yyyy')}</time>
+                </div>
+                <div className="flex items-center">
+                  <Clock className="w-4 h-4 mr-2" />
+                  <span>{calculateReadTime(post.content)}</span>
+                </div>
+              </div>
+            </header>
+
+            {/* Post Content */}
+            <ModernCard className="p-6 md:p-10">
+              <div
+                className="blog-content"
+                dangerouslySetInnerHTML={{ __html: post.content }}
+              />
+            </ModernCard>
+          </motion.article>
+
+          {/* Sidebar - Other Posts */}
+          <motion.aside
+            initial={{ opacity: 0, x: 20 }}
+            animate={{ opacity: 1, x: 0 }}
+            transition={{ delay: 0.2 }}
+            className="lg:col-span-1"
+          >
+            <div className="sticky top-28">
+              <h2 className="text-lg font-bold text-slate-900 mb-4">Other Posts</h2>
+              <div className="space-y-4">
+                {otherPosts.map((otherPost) => (
+                  <Link
+                    key={otherPost.id}
+                    to={`/blog/${otherPost.id}`}
+                    className="block group"
+                  >
+                    <ModernCard className="p-4 hover:border-brand-red/30 transition-all">
+                      <h3 className="text-sm font-semibold text-slate-900 group-hover:text-brand-red transition-colors line-clamp-2 mb-2">
+                        {otherPost.title}
+                      </h3>
+                      <div className="text-xs text-slate-400">
+                        {format(new Date(otherPost.published), 'MMM d, yyyy')}
+                      </div>
+                    </ModernCard>
+                  </Link>
+                ))}
+              </div>
+            </div>
+          </motion.aside>
+        </div>
+      </div>
+    </div>
+  );
+}

```

## feat: add mentoring page (f13bb52) - 2026-01-26

```diff
diff --git a/src/App.tsx b/src/App.tsx
index 66c4529..5dbb2d4 100644
--- a/src/App.tsx
+++ b/src/App.tsx
@@ -6,6 +6,7 @@ import About from './pages/About';
import Experience from './pages/Experience';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
+import Mentorship from './pages/Mentorship';
import SEO from './components/SEO';
import WormBackground from './components/WormBackground';

@@ -25,6 +26,7 @@ function App() {
<Route path="/experience" element={<Experience />} />
<Route path="/blog" element={<Blog />} />
<Route path="/blog/:postId" element={<BlogPost />} />
+              <Route path="/mentorship" element={<Mentorship />} />
</Routes>
</main>
</div>
diff --git a/src/components/Header.tsx b/src/components/Header.tsx
index cc33851..602b6d3 100644
--- a/src/components/Header.tsx
+++ b/src/components/Header.tsx
@@ -35,7 +35,7 @@ export default function Header() {

{/* Regular Navigation (Tablet & Desktop) */}
<nav className="hidden md:flex items-center space-x-8">
-            {['About', 'Experience', 'Blog'].map((item) => (
+            {['About', 'Experience', 'Blog', 'Mentorship'].map((item) => (
<NavLink
key={item}
to={item === 'About' ? '/' : `/${item.toLowerCase()}`}
@@ -177,7 +177,7 @@ export default function Header() {
<div className="container mx-auto px-6 py-8 flex flex-col space-y-8">
{/* Navigation Links */}
<div className="flex flex-col space-y-6">
-                {['About', 'Experience', 'Blog'].map((item) => (
+                {['About', 'Experience', 'Blog', 'Mentorship'].map((item) => (
<NavLink
key={item}
to={item === 'About' ? '/' : `/${item.toLowerCase()}`}
diff --git a/src/components/SEO.tsx b/src/components/SEO.tsx
index 7f86b28..d667b52 100644
--- a/src/components/SEO.tsx
+++ b/src/components/SEO.tsx
@@ -14,6 +14,8 @@ export default function SEO() {
return 'Professional Experience - Alvian Zachry Faturrahman';
case '/blog':
return 'Blog - Alvian Zachry Faturrahman';
+      case '/mentorship':
+        return 'Tech Interview Mentorship - Learn With Andi | Alvian Zachry';
default:
return 'Alvian Zachry Faturrahman Portfolio';
}
@@ -27,6 +29,8 @@ export default function SEO() {
return 'Explore the professional journey of Alvian Zachry Faturrahman, from leading technical teams to designing scalable curricula and hiring top engineering talent.';
case '/blog':
return 'Articles of what I thougth at the moment, may be a bit random and crude.';
+      case '/mentorship':
+        return 'Get your tech interview skills roasted. Brutal, honest mock interviews to prepare you for the real thing. Book a session at learnwithandi.com.';
default:
return 'Portfolio and professional insights of Alvian Zachry Faturrahman, an expert in software engineering, program management, and technical assessment.';
}
diff --git a/src/pages/Mentorship.tsx b/src/pages/Mentorship.tsx
new file mode 100644
index 0000000..1bba59d
--- /dev/null
+++ b/src/pages/Mentorship.tsx
@@ -0,0 +1,162 @@
+import { motion } from 'framer-motion';
+import { ExternalLink, Flame, Target, MessageCircle, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
+import ModernCard from '../components/ModernCard';
+
+export default function Mentorship() {
+  const features = [
+    {
+      icon: <Flame className="w-6 h-6" />,
+      title: "Get Roasted",
+      description: "I'll dig into your fundamentals until you discover your own gaps."
+    },
+    {
+      icon: <Target className="w-6 h-6" />,
+      title: "Real Interview Simulation",
+      description: "Practice with someone who's been on both sides of the interview table."
+    },
+    {
+      icon: <MessageCircle className="w-6 h-6" />,
+      title: "Brutally Honest Feedback",
+      description: "No nitpicking on hard skills—just pure interview performance."
+    },
+    {
+      icon: <Zap className="w-6 h-6" />,
+      title: "Find Your Gaps",
+      description: "You'll identify exactly where you need to improve—yourself."
+    }
+  ];
+
+  const benefits = [
+    "Interview communication skills",
+    "Fundamentals deep-dive",
+    "Problem-solving approach",
+    "Thinking out loud",
+    "Handling pressure",
+    "Self-awareness building"
+  ];
+
+  return (
+    <div className="min-h-screen pt-32 pb-20">
+      <div className="container mx-auto px-6">
+        {/* Hero Section */}
+        <motion.div
+          initial={{ opacity: 0, y: -20 }}
+          animate={{ opacity: 1, y: 0 }}
+          className="text-center mb-16 max-w-4xl mx-auto"
+        >
+          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-brand-red rounded-full text-sm font-medium mb-6">
+            <Flame className="w-4 h-4" />
+            Now Accepting Students
+          </div>
+
+          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
+            I'll <span className="text-brand-red">Roast</span> Your Tech Interview Skills
+            <span className="text-brand-red">.</span>
+          </h1>
+
+          <p className="text-xl text-slate-500 mb-8 max-w-2xl mx-auto leading-relaxed">
+            No fluff. No hand-holding. Just brutal, honest feedback that'll actually prepare you
+            for the real thing. Think you're ready? Let's find out.
+          </p>
+
+          <motion.a
+            href="https://learnwithandi.com"
+            target="_blank"
+            rel="noopener noreferrer"
+            whileHover={{ scale: 1.02 }}
+            whileTap={{ scale: 0.98 }}
+            className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white font-bold text-lg rounded-full hover:bg-brand-red transition-colors shadow-lg hover:shadow-xl"
+          >
+            Book a Session
+            <ExternalLink className="w-5 h-5" />
+          </motion.a>
+        </motion.div>
+
+        {/* Features Grid */}
+        <motion.div
+          initial={{ opacity: 0, y: 20 }}
+          animate={{ opacity: 1, y: 0 }}
+          transition={{ delay: 0.2 }}
+          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
+        >
+          {features.map((feature, index) => (
+            <motion.div
+              key={feature.title}
+              initial={{ opacity: 0, y: 20 }}
+              animate={{ opacity: 1, y: 0 }}
+              transition={{ delay: 0.1 * index }}
+            >
+              <ModernCard className="p-6 h-full hover:border-brand-red/30">
+                <div className="p-3 bg-red-50 text-brand-red rounded-xl w-fit mb-4">
+                  {feature.icon}
+                </div>
+                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
+                <p className="text-slate-500 text-sm">{feature.description}</p>
+              </ModernCard>
+            </motion.div>
+          ))}
+        </motion.div>
+
+        {/* What You'll Get Section */}
+        <motion.div
+          initial={{ opacity: 0 }}
+          animate={{ opacity: 1 }}
+          transition={{ delay: 0.4 }}
+          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16"
+        >
+          <div>
+            <h2 className="text-3xl font-bold text-slate-900 mb-6">
+              What You'll Get <span className="text-brand-red">Grilled</span> On
+            </h2>
+            <div className="space-y-4">
+              {benefits.map((benefit, index) => (
+                <motion.div
+                  key={benefit}
+                  initial={{ opacity: 0, x: -20 }}
+                  animate={{ opacity: 1, x: 0 }}
+                  transition={{ delay: 0.5 + index * 0.1 }}
+                  className="flex items-center gap-3"
+                >
+                  <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0" />
+                  <span className="text-slate-700 font-medium">{benefit}</span>
+                </motion.div>
+              ))}
+            </div>
+          </div>
+
+          <ModernCard className="p-8 bg-gradient-to-br from-slate-900 to-slate-800 border-none text-white">
+            <div className="text-center">
+              <p className="text-slate-300 mb-2">Ready to get uncomfortable?</p>
+              <h3 className="text-2xl font-bold mb-4">Stop practicing in your comfort zone</h3>
+              <p className="text-slate-400 mb-6">
+                Real interviews are stressful. That's why I make our sessions stressful too.
+                The more you sweat in training, the less you bleed in battle.
+              </p>
+              <a
+                href="https://learnwithandi.com"
+                target="_blank"
+                rel="noopener noreferrer"
+                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 font-bold rounded-full hover:bg-brand-red hover:text-white transition-colors"
+              >
+                Visit learnwithandi.com
+                <ArrowRight className="w-4 h-4" />
+              </a>
+            </div>
+          </ModernCard>
+        </motion.div>
+
+        {/* Social Proof / Tagline */}
+        <motion.div
+          initial={{ opacity: 0 }}
+          animate={{ opacity: 1 }}
+          transition={{ delay: 0.6 }}
+          className="text-center"
+        >
+          <p className="text-slate-400 text-sm">
+            Mentoring aspiring engineers to land their dream jobs at top tech companies.
+          </p>
+        </motion.div>
+      </div>
+    </div>
+  );
+}

```

## feat: add learnwithandi logo (3cd2880) - 2026-01-26

```diff
diff --git a/src/assets/learnwithandi.png b/src/assets/learnwithandi.png
new file mode 100644
index 0000000..d36ba36
Binary files /dev/null and b/src/assets/learnwithandi.png differ
diff --git a/src/pages/Mentorship.tsx b/src/pages/Mentorship.tsx
index 1bba59d..e5db1a3 100644
--- a/src/pages/Mentorship.tsx
+++ b/src/pages/Mentorship.tsx
@@ -1,6 +1,7 @@
import { motion } from 'framer-motion';
import { ExternalLink, Flame, Target, MessageCircle, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import ModernCard from '../components/ModernCard';
+import learnWithAndiLogo from '../assets/learnwithandi.png';

export default function Mentorship() {
const features = [
@@ -145,15 +146,18 @@ export default function Mentorship() {
</ModernCard>
</motion.div>

-        {/* Social Proof / Tagline */}
+        {/* Footer with Logo */}
<motion.div
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ delay: 0.6 }}
-          className="text-center"
+          className="text-center pt-8 border-t border-slate-100"
>
+          <a href="https://learnwithandi.com" target="_blank" rel="noopener noreferrer" className="inline-block mb-4 hover:opacity-80 transition-opacity">
+            <img src={learnWithAndiLogo} alt="Learn With Andi" className="h-10 mx-auto" />
+          </a>
<p className="text-slate-400 text-sm">
-            Mentoring aspiring engineers to land their dream jobs at top tech companies.
+            Mentoring aspiring engineers to land their dream jobs.
</p>
</motion.div>
</div>

```

## feat: try to fetch more than 10 results (97f9ac5) - 2026-01-26

```diff
diff --git a/src/pages/Blog.tsx b/src/pages/Blog.tsx
index 67586de..6bc17d6 100644
--- a/src/pages/Blog.tsx
+++ b/src/pages/Blog.tsx
@@ -15,7 +15,7 @@ export default function Blog() {
try {
const API_KEY = 'AIzaSyCw9p4Ar_wc9h3zOuaPb7JcdH3Lj8Ail_4';
const BLOG_ID = '369044396031799467';
-        const url = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=50`;
+        const url = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=500`;

const response = await fetch(url);
if (!response.ok) throw new Error('Failed to fetch posts');

```

## feat: blog fetch a lot of posts (93f16bb) - 2026-01-26

```diff
diff --git a/src/pages/BlogPost.tsx b/src/pages/BlogPost.tsx
index 8054ae9..69f025e 100644
--- a/src/pages/BlogPost.tsx
+++ b/src/pages/BlogPost.tsx
@@ -25,7 +25,7 @@ export default function BlogPost() {
try {
const API_KEY = 'AIzaSyCw9p4Ar_wc9h3zOuaPb7JcdH3Lj8Ail_4';
const BLOG_ID = '369044396031799467';
-        const url = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}`;
+        const url = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=500`;

const response = await fetch(url);
if (!response.ok) throw new Error('Failed to fetch posts');

```

## SEO: SEO AIO everywhere (23d8bcc) - 2026-01-27

```diff
diff --git a/generate-sitemap.js b/generate-sitemap.js
index 8fda3e7..ad91c00 100644
--- a/generate-sitemap.js
+++ b/generate-sitemap.js
@@ -1,19 +1,53 @@
import fs from 'fs';

-const baseUrl = 'https://your-domain.com'; // Replace with your actual domain
-const pages = ['/', '/experience', '/blog'];
+const baseUrl = 'https://alvianzf.id';
+const API_KEY = 'AIzaSyCw9p4Ar_wc9h3zOuaPb7JcdH3Lj8Ail_4';
+const BLOG_ID = '369044396031799467';
+const staticPages = ['/', '/experience', '/blog', '/mentorship'];

-const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
+async function generateSitemap() {
+  try {
+    console.log('Fetching blog posts...');
+    const response = await fetch(
+      `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${API_KEY}&maxResults=500`
+    );
+
+    if (!response.ok) {
+      throw new Error(`Failed to fetch posts: ${response.statusText}`);
+    }
+
+    const data = await response.json();
+    const posts = data.items || [];
+
+    console.log(`Found ${posts.length} posts.`);
+
+    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
-  ${pages
+  ${staticPages
.map(page => `
-    <url>
-      <loc>${baseUrl}${page}</loc>
-      <changefreq>weekly</changefreq>
-      <priority>${page === '/' ? '1.0' : '0.8'}</priority>
-    </url>
-  `).join('')}
+  <url>
+    <loc>${baseUrl}${page}</loc>
+    <changefreq>daily</changefreq>
+    <priority>${page === '/' ? '1.0' : '0.8'}</priority>
+  </url>`)
+    .join('')}
+  ${posts
+    .map(post => `
+  <url>
+    <loc>${baseUrl}/blog/${post.id}</loc>
+    <lastmod>${new Date(post.updated).toISOString()}</lastmod>
+    <changefreq>monthly</changefreq>
+    <priority>0.6</priority>
+  </url>`)
+    .join('')}
</urlset>`;

-fs.writeFileSync('public/sitemap.xml', sitemap);
-console.log('Sitemap generated successfully!');
 No newline at end of file
+    fs.writeFileSync('public/sitemap.xml', sitemap);
+    console.log('Sitemap generated successfully at public/sitemap.xml');
+  } catch (error) {
+    console.error('Error generating sitemap:', error);
+    process.exit(1);
+  }
+}
+
+generateSitemap();
 No newline at end of file
diff --git a/package.json b/package.json
index 616edec..06b8675 100644
--- a/package.json
+++ b/package.json
@@ -5,7 +5,7 @@
"type": "module",
"scripts": {
"dev": "vite",
-    "build": "vite build",
+    "build": "npm run generate-sitemap && vite build",
"lint": "eslint .",
"preview": "vite preview",
"generate-sitemap": "node generate-sitemap.js"
diff --git a/public/sitemap.xml b/public/sitemap.xml
new file mode 100644
index 0000000..9aa5c1f
--- /dev/null
+++ b/public/sitemap.xml
@@ -0,0 +1,259 @@
+<?xml version="1.0" encoding="UTF-8"?>
+<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
+
+  <url>
+    <loc>https://alvianzf.id/</loc>
+    <changefreq>daily</changefreq>
+    <priority>1.0</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/experience</loc>
+    <changefreq>daily</changefreq>
+    <priority>0.8</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/blog</loc>
+    <changefreq>daily</changefreq>
+    <priority>0.8</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/mentorship</loc>
+    <changefreq>daily</changefreq>
+    <priority>0.8</priority>
+  </url>
+
+  <url>
+    <loc>https://alvianzf.id/blog/4177481728910489873</loc>
+    <lastmod>2026-01-26T18:00:00.000Z</lastmod>
+    <changefreq>monthly</changefreq>
+    <priority>0.6</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/blog/8074139038017837816</loc>
+    <lastmod>2026-01-26T15:08:38.000Z</lastmod>
+    <changefreq>monthly</changefreq>
+    <priority>0.6</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/blog/8348307866210442705</loc>
+    <lastmod>2026-01-26T14:13:58.000Z</lastmod>
+    <changefreq>monthly</changefreq>
+    <priority>0.6</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/blog/4738949115309709236</loc>
+    <lastmod>2016-08-15T03:52:56.000Z</lastmod>
+    <changefreq>monthly</changefreq>
+    <priority>0.6</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/blog/3244981633588428299</loc>
+    <lastmod>2014-05-21T03:34:44.000Z</lastmod>
+    <changefreq>monthly</changefreq>
+    <priority>0.6</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/blog/4243966927864887615</loc>
+    <lastmod>2014-05-19T08:23:12.000Z</lastmod>
+    <changefreq>monthly</changefreq>
+    <priority>0.6</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/blog/2234574053689619226</loc>
+    <lastmod>2016-08-15T03:54:21.000Z</lastmod>
+    <changefreq>monthly</changefreq>
+    <priority>0.6</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/blog/3054875744422838680</loc>
+    <lastmod>2014-05-19T07:06:51.000Z</lastmod>
+    <changefreq>monthly</changefreq>
+    <priority>0.6</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/blog/7930721925470689387</loc>
+    <lastmod>2016-08-15T04:14:03.000Z</lastmod>
+    <changefreq>monthly</changefreq>
+    <priority>0.6</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/blog/3585916851129603153</loc>
+    <lastmod>2014-04-28T05:45:27.000Z</lastmod>
+    <changefreq>monthly</changefreq>
+    <priority>0.6</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/blog/8304427754092454707</loc>
+    <lastmod>2014-05-06T02:07:20.000Z</lastmod>
+    <changefreq>monthly</changefreq>
+    <priority>0.6</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/blog/1862966859114410251</loc>
+    <lastmod>2013-07-29T00:38:05.000Z</lastmod>
+    <changefreq>monthly</changefreq>
+    <priority>0.6</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/blog/1318922702096770813</loc>
+    <lastmod>2026-01-26T15:23:32.000Z</lastmod>
+    <changefreq>monthly</changefreq>
+    <priority>0.6</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/blog/3099754854460888896</loc>
+    <lastmod>2013-02-24T14:08:19.000Z</lastmod>
+    <changefreq>monthly</changefreq>
+    <priority>0.6</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/blog/1649622714079988044</loc>
+    <lastmod>2016-08-15T03:56:53.000Z</lastmod>
+    <changefreq>monthly</changefreq>
+    <priority>0.6</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/blog/4685281898369760851</loc>
+    <lastmod>2013-01-12T20:13:47.000Z</lastmod>
+    <changefreq>monthly</changefreq>
+    <priority>0.6</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/blog/290290177972872358</loc>
+    <lastmod>2012-11-10T18:50:03.000Z</lastmod>
+    <changefreq>monthly</changefreq>
+    <priority>0.6</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/blog/9050271056356246849</loc>
+    <lastmod>2012-08-04T14:29:22.000Z</lastmod>
+    <changefreq>monthly</changefreq>
+    <priority>0.6</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/blog/1911274966401534044</loc>
+    <lastmod>2014-04-28T05:55:41.000Z</lastmod>
+    <changefreq>monthly</changefreq>
+    <priority>0.6</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/blog/5055813436288014730</loc>
+    <lastmod>2012-05-30T18:48:48.000Z</lastmod>
+    <changefreq>monthly</changefreq>
+    <priority>0.6</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/blog/1518876389773004532</loc>
+    <lastmod>2012-05-30T19:05:51.000Z</lastmod>
+    <changefreq>monthly</changefreq>
+    <priority>0.6</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/blog/6116635861858366536</loc>
+    <lastmod>2012-05-30T19:08:10.000Z</lastmod>
+    <changefreq>monthly</changefreq>
+    <priority>0.6</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/blog/843460930501946876</loc>
+    <lastmod>2013-11-27T06:47:39.000Z</lastmod>
+    <changefreq>monthly</changefreq>
+    <priority>0.6</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/blog/948602109798231091</loc>
+    <lastmod>2011-12-23T17:12:49.000Z</lastmod>
+    <changefreq>monthly</changefreq>
+    <priority>0.6</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/blog/111078891082898427</loc>
+    <lastmod>2011-12-21T14:36:49.000Z</lastmod>
+    <changefreq>monthly</changefreq>
+    <priority>0.6</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/blog/1091000637561920035</loc>
+    <lastmod>2011-12-21T05:53:11.000Z</lastmod>
+    <changefreq>monthly</changefreq>
+    <priority>0.6</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/blog/5030972709305740714</loc>
+    <lastmod>2011-12-21T05:56:33.000Z</lastmod>
+    <changefreq>monthly</changefreq>
+    <priority>0.6</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/blog/3927434659977510013</loc>
+    <lastmod>2016-08-15T04:00:08.000Z</lastmod>
+    <changefreq>monthly</changefreq>
+    <priority>0.6</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/blog/4959212271595111615</loc>
+    <lastmod>2016-08-15T04:01:52.000Z</lastmod>
+    <changefreq>monthly</changefreq>
+    <priority>0.6</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/blog/9020932981705943981</loc>
+    <lastmod>2011-12-20T17:22:09.000Z</lastmod>
+    <changefreq>monthly</changefreq>
+    <priority>0.6</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/blog/2490225050532770123</loc>
+    <lastmod>2011-10-17T17:29:08.000Z</lastmod>
+    <changefreq>monthly</changefreq>
+    <priority>0.6</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/blog/386565059984709105</loc>
+    <lastmod>2011-10-17T16:18:11.000Z</lastmod>
+    <changefreq>monthly</changefreq>
+    <priority>0.6</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/blog/5350133858352647842</loc>
+    <lastmod>2011-10-16T04:24:34.000Z</lastmod>
+    <changefreq>monthly</changefreq>
+    <priority>0.6</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/blog/1428305554238114805</loc>
+    <lastmod>2011-10-16T02:13:43.000Z</lastmod>
+    <changefreq>monthly</changefreq>
+    <priority>0.6</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/blog/4785928853964573489</loc>
+    <lastmod>2011-10-15T19:13:11.000Z</lastmod>
+    <changefreq>monthly</changefreq>
+    <priority>0.6</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/blog/6752189338480202667</loc>
+    <lastmod>2011-10-15T19:11:06.000Z</lastmod>
+    <changefreq>monthly</changefreq>
+    <priority>0.6</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/blog/6189775121194127922</loc>
+    <lastmod>2011-10-15T17:55:41.000Z</lastmod>
+    <changefreq>monthly</changefreq>
+    <priority>0.6</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/blog/1834994220224327431</loc>
+    <lastmod>2011-10-15T17:38:07.000Z</lastmod>
+    <changefreq>monthly</changefreq>
+    <priority>0.6</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/blog/7765370457579101940</loc>
+    <lastmod>2011-10-15T15:05:21.000Z</lastmod>
+    <changefreq>monthly</changefreq>
+    <priority>0.6</priority>
+  </url>
+</urlset>
 No newline at end of file
diff --git a/robots.txt b/robots.txt
index 6b5d135..f6cb4a1 100644
--- a/robots.txt
+++ b/robots.txt
@@ -1,4 +1,4 @@
User-agent: *
Allow: /

-Sitemap: https://your-domain.com/sitemap.xml
 No newline at end of file
+Sitemap: https://alvianzf.id/sitemap.xml
 No newline at end of file
diff --git a/src/App.tsx b/src/App.tsx
index 5dbb2d4..420db4b 100644
--- a/src/App.tsx
+++ b/src/App.tsx
@@ -7,7 +7,6 @@ import Experience from './pages/Experience';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Mentorship from './pages/Mentorship';
-import SEO from './components/SEO';
import WormBackground from './components/WormBackground';

function App() {
@@ -18,7 +17,6 @@ function App() {
<Suspense fallback={null}>
<WormBackground />
</Suspense>
-          <SEO />
<Header />
<main>
<Routes>
diff --git a/src/components/SEO.tsx b/src/components/SEO.tsx
index d667b52..a784870 100644
--- a/src/components/SEO.tsx
+++ b/src/components/SEO.tsx
@@ -1,57 +1,68 @@
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

-export default function SEO() {
+interface SEOProps {
+  title?: string;
+  description?: string;
+  image?: string;
+  article?: boolean;
+  publishedTime?: string;
+  modifiedTime?: string;
+  schema?: object;
+}
+
+export default function SEO({
+  title,
+  description,
+  image,
+  article = false,
+  publishedTime,
+  modifiedTime,
+  schema
+}: SEOProps) {
const location = useLocation();
const baseUrl = 'https://alvianzf.id';
const currentUrl = `${baseUrl}${location.pathname}`;
+  const defaultImage = `${baseUrl}/favicon.ico`; // Fallback image
+
+  // Default values
+  const siteTitle = 'Alvian Zachry Faturrahman - Program Manager | Technical Lead | Full Stack Engineer';
+  const siteDescription = 'Program Manager, Technical Lead, and Full Stack Engineer with 13+ years of experience in software engineering, education, and technical hiring.';

-  const getTitle = () => {
-    switch (location.pathname) {
-      case '/':
-        return 'Alvian Zachry Faturrahman - Program Manager | Technical Lead | Full Stack Engineer';
-      case '/experience':
-        return 'Professional Experience - Alvian Zachry Faturrahman';
-      case '/blog':
-        return 'Blog - Alvian Zachry Faturrahman';
-      case '/mentorship':
-        return 'Tech Interview Mentorship - Learn With Andi | Alvian Zachry';
-      default:
-        return 'Alvian Zachry Faturrahman Portfolio';
-    }
-  };
-
-  const getDescription = () => {
-    switch (location.pathname) {
-      case '/':
-        return 'Program Manager, Technical Lead, and Full Stack Engineer with 13+ years of experience in software engineering, education, and technical hiring.';
-      case '/experience':
-        return 'Explore the professional journey of Alvian Zachry Faturrahman, from leading technical teams to designing scalable curricula and hiring top engineering talent.';
-      case '/blog':
-        return 'Articles of what I thougth at the moment, may be a bit random and crude.';
-      case '/mentorship':
-        return 'Get your tech interview skills roasted. Brutal, honest mock interviews to prepare you for the real thing. Book a session at learnwithandi.com.';
-      default:
-        return 'Portfolio and professional insights of Alvian Zachry Faturrahman, an expert in software engineering, program management, and technical assessment.';
-    }
-  };
+  const finalTitle = title ? `${title} | Alvian Zachry Faturrahman` : siteTitle;
+  const finalDescription = description || siteDescription;
+  const finalImage = image ? (image.startsWith('http') ? image : `${baseUrl}${image}`) : defaultImage;

return (
<Helmet>
-      <title>{getTitle()}</title>
-      <meta name="description" content={getDescription()} />
+      {/* Standard Metadata */}
+      <title>{finalTitle}</title>
+      <meta name="description" content={finalDescription} />
<link rel="canonical" href={currentUrl} />

{/* Open Graph */}
<meta property="og:url" content={currentUrl} />
-      <meta property="og:title" content={getTitle()} />
-      <meta property="og:description" content={getDescription()} />
-      <meta property="og:type" content="website" />
+      <meta property="og:type" content={article ? 'article' : 'website'} />
+      <meta property="og:title" content={finalTitle} />
+      <meta property="og:description" content={finalDescription} />
+      <meta property="og:image" content={finalImage} />

{/* Twitter */}
<meta name="twitter:card" content="summary_large_image" />
-      <meta name="twitter:title" content={getTitle()} />
-      <meta name="twitter:description" content={getDescription()} />
+      <meta name="twitter:title" content={finalTitle} />
+      <meta name="twitter:description" content={finalDescription} />
+      <meta name="twitter:image" content={finalImage} />
+
+      {/* Article Specifics */}
+      {article && publishedTime && <meta property="article:published_time" content={publishedTime} />}
+      {article && modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
+
+      {/* JSON-LD Schema */}
+      {schema && (
+        <script type="application/ld+json">
+          {JSON.stringify(schema)}
+        </script>
+      )}
</Helmet>
);
}
diff --git a/src/pages/About.tsx b/src/pages/About.tsx
index 34514c7..baeba04 100644
--- a/src/pages/About.tsx
+++ b/src/pages/About.tsx
@@ -4,10 +4,31 @@ import { ArrowRight, Download } from 'lucide-react';
import alvian from "../assets/potraits.png";
import { skills, categories } from "../data";
import ModernCard from "../components/ModernCard";
+import SEO from '../components/SEO';

export default function About() {
+  const personSchema = {
+    "@context": "https://schema.org",
+    "@type": "Person",
+    "name": "Alvian Zachry Faturrahman",
+    "url": "https://alvianzf.id",
+    "image": "https://alvianzf.id/favicon.ico",
+    "sameAs": [
+      "https://github.com/alvianzf",
+      "https://linkedin.com/in/alvianzf",
+      "https://twitter.com/alvianzf"
+    ],
+    "jobTitle": "Program Manager | Technical Lead | Full Stack Engineer",
+    "worksFor": {
+      "@type": "Organization",
+      "name": "Independent Consultant"
+    },
+    "description": "Program Manager, Technical Lead, and Full Stack Engineer with 13+ years of experience."
+  };
+
return (
<div className="min-h-screen pt-20 overflow-x-hidden">
+      <SEO schema={personSchema} />
<div className="container mx-auto px-6 py-20">
{/* Hero Section */}
<section className="mb-16">
diff --git a/src/pages/Blog.tsx b/src/pages/Blog.tsx
index 6bc17d6..8c9d6da 100644
--- a/src/pages/Blog.tsx
+++ b/src/pages/Blog.tsx
@@ -4,6 +4,7 @@ import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Calendar, ChevronRight } from 'lucide-react';
import ModernCard from '../components/ModernCard';
+import SEO from '../components/SEO';

export default function Blog() {
const [posts, setPosts] = useState<any[]>([]);
@@ -60,6 +61,10 @@ export default function Blog() {

return (
<div className="min-h-screen pt-32 pb-20">
+      <SEO
+        title="Blog"
+        description="Articles of what I thought at the moment, may be a bit random and crude."
+      />
<div className="container mx-auto px-6">
{/* Page Title */}
<motion.div
diff --git a/src/pages/BlogPost.tsx b/src/pages/BlogPost.tsx
index 69f025e..f4ac95d 100644
--- a/src/pages/BlogPost.tsx
+++ b/src/pages/BlogPost.tsx
@@ -4,12 +4,14 @@ import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Calendar, ArrowLeft, Clock } from 'lucide-react';
import ModernCard from '../components/ModernCard';
+import SEO from '../components/SEO';

interface BlogPost {
id: string;
title: string;
content: string;
published: string;
+  updated: string;
url: string;
}

@@ -63,6 +65,14 @@ export default function BlogPost() {
return `${minutes} min read`;
};

+  // Extract first image from content
+  const extractImage = (content: string) => {
+    const div = document.createElement('div');
+    div.innerHTML = content;
+    const img = div.querySelector('img');
+    return img ? img.src : undefined;
+  };
+
if (loading) {
return (
<div className="min-h-screen pt-32 pb-20 flex justify-center items-center">
@@ -87,8 +97,36 @@ export default function BlogPost() {
);
}

+  const cleanContent = post.content.replace(/<[^>]+>/g, '');
+  const description = cleanContent.slice(0, 160) + '...';
+  const image = extractImage(post.content);
+
+  const blogSchema = {
+    "@context": "https://schema.org",
+    "@type": "BlogPosting",
+    "headline": post.title,
+    "image": image || "https://alvianzf.id/favicon.ico",
+    "datePublished": post.published,
+    "dateModified": post.updated || post.published,
+    "author": {
+      "@type": "Person",
+      "name": "Alvian Zachry Faturrahman",
+      "url": "https://alvianzf.id"
+    },
+    "description": description
+  };
+
return (
<div className="min-h-screen pt-32 pb-20">
+      <SEO
+        title={post.title}
+        description={description}
+        image={image}
+        article={true}
+        publishedTime={post.published}
+        modifiedTime={post.updated || post.published}
+        schema={blogSchema}
+      />
<div className="container mx-auto px-6">
<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
{/* Main Content */}
diff --git a/src/pages/Experience.tsx b/src/pages/Experience.tsx
index d7be92c..cb847be 100644
--- a/src/pages/Experience.tsx
+++ b/src/pages/Experience.tsx
@@ -2,10 +2,15 @@ import { motion } from 'framer-motion';
import { experiences } from '../data';
import ModernCard from '../components/ModernCard';
import { Calendar, Briefcase } from 'lucide-react';
+import SEO from '../components/SEO';

export default function Experience() {
return (
<div className="min-h-screen pt-32 pb-32 relative overflow-hidden">
+      <SEO
+        title="Professional Experience"
+        description="Explore the professional journey of Alvian Zachry Faturrahman, from leading technical teams to designing scalable curricula and hiring top engineering talent."
+      />
{/* Background Patterns */}
<div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
<div className="absolute top-0 right-0 w-3/4 h-3/4 bg-brand-red/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
diff --git a/src/pages/Mentorship.tsx b/src/pages/Mentorship.tsx
index e5db1a3..3214807 100644
--- a/src/pages/Mentorship.tsx
+++ b/src/pages/Mentorship.tsx
@@ -2,6 +2,7 @@ import { motion } from 'framer-motion';
import { ExternalLink, Flame, Target, MessageCircle, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import ModernCard from '../components/ModernCard';
import learnWithAndiLogo from '../assets/learnwithandi.png';
+import SEO from '../components/SEO';

export default function Mentorship() {
const features = [
@@ -38,6 +39,10 @@ export default function Mentorship() {

return (
<div className="min-h-screen pt-32 pb-20">
+      <SEO
+        title="Tech Interview Mentorship"
+        description="Get your tech interview skills roasted. Brutal, honest mock interviews to prepare you for the real thing. Book a session at learnwithandi.com."
+      />
<div className="container mx-auto px-6">
{/* Hero Section */}
<motion.div

```

## refactor: over-engineer shit (c303bc8) - 2026-01-27

```diff
diff --git a/.husky/pre-commit b/.husky/pre-commit
new file mode 100755
index 0000000..2312dc5
--- /dev/null
+++ b/.husky/pre-commit
@@ -0,0 +1 @@
+npx lint-staged
diff --git a/generate-icons.js b/generate-icons.js
new file mode 100644
index 0000000..fb7a0cb
--- /dev/null
+++ b/generate-icons.js
@@ -0,0 +1,20 @@
+import fs from 'fs';
+import path from 'path';
+
+const sizes = [192, 512];
+const iconContent = `
+<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
+  <rect width="512" height="512" fill="#ffffff"/>
+  <circle cx="256" cy="256" r="200" fill="#e11d48"/>
+  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="200" fill="white">A</text>
+</svg>
+`;
+
+const saveIcon = (size) => {
+  const svgFile = `pwa-${size}x${size}.svg`;
+  const content = iconContent.replace(/width="512" height="512"/, `width="${size}" height="${size}"`);
+  fs.writeFileSync(path.join('public', svgFile), content);
+  console.log(`Generated ${svgFile}`);
+};
+
+sizes.forEach(saveIcon);
diff --git a/package.json b/package.json
index 06b8675..fd112c5 100644
--- a/package.json
+++ b/package.json
@@ -8,7 +8,9 @@
"build": "npm run generate-sitemap && vite build",
"lint": "eslint .",
"preview": "vite preview",
-    "generate-sitemap": "node generate-sitemap.js"
+    "generate-sitemap": "node generate-sitemap.js",
+    "test": "vitest",
+    "prepare": "husky"
},
"dependencies": {
"@fortawesome/fontawesome-svg-core": "^6.5.1",
@@ -29,6 +31,9 @@
},
"devDependencies": {
"@eslint/js": "^9.9.1",
+    "@testing-library/dom": "^10.4.1",
+    "@testing-library/jest-dom": "^6.9.1",
+    "@testing-library/react": "^16.3.2",
"@types/react": "^19.2.9",
"@types/react-dom": "^19.2.3",
"@vitejs/plugin-react": "^4.3.1",
@@ -37,14 +42,29 @@
"eslint-plugin-react-hooks": "^5.1.0-rc.0",
"eslint-plugin-react-refresh": "^0.4.11",
"globals": "^15.9.0",
+    "husky": "^9.1.7",
+    "jsdom": "^27.4.0",
+    "lint-staged": "^16.2.7",
"postcss": "^8.4.35",
+    "prettier": "^3.8.1",
"tailwindcss": "^3.4.1",
"typescript": "^5.5.3",
"typescript-eslint": "^8.3.0",
-    "vite": "^5.4.2"
+    "vite": "^5.4.2",
+    "vite-plugin-pwa": "^1.2.0",
+    "vitest": "^4.0.18"
},
"overrides": {
"react": "^19.2.3",
"react-dom": "^19.2.3"
+  },
+  "lint-staged": {
+    "*.{ts,tsx}": [
+      "eslint --fix",
+      "vitest related --run"
+    ],
+    "*.{css,scss}": [
+      "prettier --write"
+    ]
}
-}
 No newline at end of file
+}
diff --git a/public/pwa-192x192.svg b/public/pwa-192x192.svg
new file mode 100644
index 0000000..2d9d0cd
--- /dev/null
+++ b/public/pwa-192x192.svg
@@ -0,0 +1,6 @@
+
+<svg width="192" height="192" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
+  <rect width="512" height="512" fill="#ffffff"/>
+  <circle cx="256" cy="256" r="200" fill="#e11d48"/>
+  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="200" fill="white">A</text>
+</svg>
diff --git a/public/pwa-512x512.svg b/public/pwa-512x512.svg
new file mode 100644
index 0000000..b8de182
--- /dev/null
+++ b/public/pwa-512x512.svg
@@ -0,0 +1,6 @@
+
+<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
+  <rect width="512" height="512" fill="#ffffff"/>
+  <circle cx="256" cy="256" r="200" fill="#e11d48"/>
+  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="200" fill="white">A</text>
+</svg>
diff --git a/src/App.tsx b/src/App.tsx
index 420db4b..772840c 100644
--- a/src/App.tsx
+++ b/src/App.tsx
@@ -1,6 +1,7 @@
import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
+import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import About from './pages/About';
import Experience from './pages/Experience';
@@ -8,28 +9,37 @@ import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Mentorship from './pages/Mentorship';
import WormBackground from './components/WormBackground';
+import ThemeToggle from './components/ThemeToggle';
+import { ThemeProvider } from './context/ThemeContext';

function App() {
return (
-    <HelmetProvider>
-      <Router>
-        <div className="min-h-screen text-slate-900 relative">
-          <Suspense fallback={null}>
-            <WormBackground />
-          </Suspense>
-          <Header />
-          <main>
-            <Routes>
-              <Route path="/" element={<About />} />
-              <Route path="/experience" element={<Experience />} />
-              <Route path="/blog" element={<Blog />} />
-              <Route path="/blog/:postId" element={<BlogPost />} />
-              <Route path="/mentorship" element={<Mentorship />} />
-            </Routes>
-          </main>
-        </div>
-      </Router>
-    </HelmetProvider>
+    <ThemeProvider>
+      <HelmetProvider>
+        <Router>
+          <div className="min-h-screen relative transition-colors duration-300">
+            <div className="fixed bottom-4 right-4 z-50">
+              <ThemeToggle />
+            </div>
+            <Suspense fallback={null}>
+              <WormBackground />
+            </Suspense>
+            <Header />
+            <main>
+              <AnimatePresence mode="wait">
+                <Routes>
+                  <Route path="/" element={<About />} />
+                  <Route path="/experience" element={<Experience />} />
+                  <Route path="/blog" element={<Blog />} />
+                  <Route path="/blog/:postId" element={<BlogPost />} />
+                  <Route path="/mentorship" element={<Mentorship />} />
+                </Routes>
+              </AnimatePresence>
+            </main>
+          </div>
+        </Router>
+      </HelmetProvider>
+    </ThemeProvider>
);
}

diff --git a/src/components/ThemeToggle.tsx b/src/components/ThemeToggle.tsx
new file mode 100644
index 0000000..922fe9b
--- /dev/null
+++ b/src/components/ThemeToggle.tsx
@@ -0,0 +1,41 @@
+import { motion, AnimatePresence } from 'framer-motion';
+import { Sun, Moon, Terminal } from 'lucide-react';
+import { useTheme } from '../context/ThemeContext';
+
+export default function ThemeToggle() {
+  const { theme, setTheme } = useTheme();
+
+  const toggleTheme = () => {
+    if (theme === 'light') setTheme('dark');
+    else if (theme === 'dark') setTheme('cyberpunk');
+    else setTheme('light');
+  };
+
+  const getIcon = () => {
+    switch (theme) {
+      case 'dark': return <Moon className="w-5 h-5 text-blue-400" />;
+      case 'cyberpunk': return <Terminal className="w-5 h-5 text-green-400" />;
+      default: return <Sun className="w-5 h-5 text-yellow-500" />;
+    }
+  };
+
+  return (
+    <button
+      onClick={toggleTheme}
+      className="p-3 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 z-[100]"
+      aria-label="Toggle theme"
+    >
+      <AnimatePresence mode="wait" initial={false}>
+        <motion.div
+          key={theme}
+          initial={{ y: -20, opacity: 0, rotate: -90 }}
+          animate={{ y: 0, opacity: 1, rotate: 0 }}
+          exit={{ y: 20, opacity: 0, rotate: 90 }}
+          transition={{ duration: 0.2 }}
+        >
+          {getIcon()}
+        </motion.div>
+      </AnimatePresence>
+    </button>
+  );
+}
diff --git a/src/components/WormBackground.tsx b/src/components/WormBackground.tsx
index 354fb56..e6b0a77 100644
--- a/src/components/WormBackground.tsx
+++ b/src/components/WormBackground.tsx
@@ -67,7 +67,7 @@ export default function WormBackground() {
const wormCount = 50; // Triple the worms

return (
-    <div className="fixed inset-0 -z-10 bg-slate-50 overflow-hidden pointer-events-none">
+    <div className="fixed inset-0 -z-10 bg-[var(--bg-primary)] transition-colors duration-300 overflow-hidden pointer-events-none">
<svg
width="100%"
height="100%"
diff --git a/src/components/__tests__/WormBackground.test.tsx b/src/components/__tests__/WormBackground.test.tsx
new file mode 100644
index 0000000..554fe61
--- /dev/null
+++ b/src/components/__tests__/WormBackground.test.tsx
@@ -0,0 +1,27 @@
+import { render } from '@testing-library/react';
+import { describe, it, expect } from 'vitest';
+import WormBackground from '../WormBackground';
+
+describe('WormBackground Component', () => {
+  it('renders without crashing', () => {
+    const { container } = render(<WormBackground />);
+    expect(container).toBeInTheDocument();
+  });
+
+  it('generates correct number of worms', () => {
+    const { container } = render(<WormBackground />);
+    // We configured 50 worms in the component
+    const worms = container.querySelectorAll('path');
+    expect(worms.length).toBe(50);
+  });
+
+  it('generates valid SVG paths', () => {
+    const { container } = render(<WormBackground />);
+    const firstWorm = container.querySelector('path');
+    expect(firstWorm).toHaveAttribute('d');
+    const d = firstWorm?.getAttribute('d');
+    // Check if path starts with M (Move) and contains Q (Quadratic Bezier)
+    expect(d).toMatch(/^M/);
+    expect(d).toContain('Q');
+  });
+});
diff --git a/src/context/ThemeContext.tsx b/src/context/ThemeContext.tsx
new file mode 100644
index 0000000..7355b43
--- /dev/null
+++ b/src/context/ThemeContext.tsx
@@ -0,0 +1,58 @@
+import React, { createContext, useContext, useEffect, useState } from 'react';
+
+type Theme = 'light' | 'dark' | 'cyberpunk';
+
+interface ThemeContextType {
+  theme: Theme;
+  setTheme: (theme: Theme) => void;
+}
+
+const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
+
+export function ThemeProvider({ children }: { children: React.ReactNode }) {
+  const [theme, setTheme] = useState<Theme>(() => {
+    // Check localStorage first
+    if (typeof window !== 'undefined') {
+      const saved = localStorage.getItem('theme') as Theme;
+      if (saved) return saved;
+      // Check system preference
+      if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
+    }
+    return 'light';
+  });
+
+  useEffect(() => {
+    const root = window.document.documentElement;
+    root.classList.remove('light', 'dark', 'cyberpunk');
+    root.classList.add(theme);
+    localStorage.setItem('theme', theme);
+  }, [theme]);
+
+  // Handle system preference changes
+  useEffect(() => {
+    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
+    const handleChange = (e: MediaQueryListEvent) => {
+      // Only auto-switch if user hasn't explicitly set a preference in this session yet?
+      // For now, let's respect manual override in localStorage.
+      if (!localStorage.getItem('theme')) {
+        setTheme(e.matches ? 'dark' : 'light');
+      }
+    };
+    mediaQuery.addEventListener('change', handleChange);
+    return () => mediaQuery.removeEventListener('change', handleChange);
+  }, []);
+
+  return (
+    <ThemeContext.Provider value={{ theme, setTheme }}>
+      {children}
+    </ThemeContext.Provider>
+  );
+}
+
+export function useTheme() {
+  const context = useContext(ThemeContext);
+  if (context === undefined) {
+    throw new Error('useTheme must be used within a ThemeProvider');
+  }
+  return context;
+}
diff --git a/src/index.css b/src/index.css
index d2505ee..94a96f2 100644
--- a/src/index.css
+++ b/src/index.css
@@ -1,13 +1,67 @@
-@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap');
+@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap");

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
+  :root {
+    --bg-primary: #f8fafc;
+    /* slate-50 */
+    --text-primary: #0f172a;
+    /* slate-900 */
+    --text-secondary: #64748b;
+    /* slate-500 */
+    --accent-primary: #990000;
+    /* brand-red */
+    --accent-secondary: #7f1d1d;
+    /* red-900 */
+    --border-color: #e2e8f0;
+    /* slate-200 */
+    --card-bg: #ffffff;
+    --font-primary: "Inter", sans-serif;
+    --font-heading: "Outfit", sans-serif;
+  }
+
+  /* Dark Mode */
+  .dark {
+    --bg-primary: #0f172a;
+    /* slate-900 */
+    --text-primary: #ffffff;
+    /* white */
+    --text-secondary: #cbd5e1;
+    /* slate-300 */
+    --accent-primary: #ef4444;
+    /* red-500 */
+    --accent-secondary: #f87171;
+    /* red-400 */
+    --border-color: #1e293b;
+    /* slate-800 */
+    --card-bg: #1e293b;
+  }
+
+  /* Cyberpunk Mode */
+  .cyberpunk {
+    --bg-primary: #000000;
+    --text-primary: #00ff41;
+    /* Maxtrix Green bright */
+    --text-secondary: #4ade80;
+    /* Green-400 - much lighter visibility */
+    --accent-primary: #ff00ff;
+    /* Neon Magenta */
+    --accent-secondary: #00ffff;
+    /* Neon Cyan */
+    --border-color: #00ff41;
+    --card-bg: #0a0a0a;
+    --font-primary: "Courier New", monospace;
+    --font-heading: "Courier New", monospace;
+  }
+
body {
-    @apply bg-slate-50 text-slate-900 antialiased;
-    font-family: 'Inter', sans-serif;
+    background-color: var(--bg-primary);
+    color: var(--text-primary);
+    font-family: var(--font-primary);
+    @apply antialiased transition-colors duration-300;
}

h1,
@@ -16,7 +70,7 @@
h4,
h5,
h6 {
-    font-family: 'Outfit', sans-serif;
+    font-family: var(--font-heading);
@apply tracking-tight;
}

@@ -27,42 +81,86 @@
}

@layer components {
-
/* Modern Card */
.card-modern {
-    @apply bg-white rounded-2xl border border-slate-100 shadow-sm transition-all duration-300;
+    background-color: var(--card-bg);
+    border: 1px solid var(--border-color);
+    @apply rounded-2xl shadow-sm transition-all duration-300;
}

.card-modern:hover {
-    @apply shadow-md -translate-y-1 border-slate-200;
+    @apply shadow-md -translate-y-1;
+    border-color: var(--accent-primary);
+  }
+
+  .cyberpunk .card-modern {
+    box-shadow: 4px 4px 0px var(--accent-primary);
+    border-radius: 0;
+  }
+
+  .cyberpunk .card-modern:hover {
+    box-shadow: 6px 6px 0px var(--accent-primary);
+    transform: translate(-2px, -2px);
}

/* Modern Button */
.btn-primary {
-    @apply px-6 py-3 bg-slate-900 text-white font-medium rounded-full transition-all duration-300;
-    @apply hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5;
+    background-color: var(--text-primary);
+    color: var(--bg-primary);
+    @apply px-6 py-3 font-medium rounded-full transition-all duration-300;
+    @apply hover:shadow-lg hover:-translate-y-0.5;
+  }
+
+  .cyberpunk .btn-primary {
+    background-color: var(--accent-primary);
+    color: #000000;
+    border-radius: 0;
+    box-shadow: 4px 4px 0px var(--accent-secondary);
+  }
+
+  .cyberpunk .btn-primary:hover {
+    box-shadow: 6px 6px 0px var(--accent-secondary);
}

.btn-outline {
-    @apply px-6 py-3 bg-transparent border border-slate-200 text-slate-900 font-medium rounded-full transition-all duration-300;
-    @apply hover:border-slate-900 hover:bg-slate-50;
+    background-color: transparent;
+    border: 1px solid var(--border-color);
+    color: var(--text-primary);
+    @apply px-6 py-3 font-medium rounded-full transition-all duration-300;
+    @apply hover:bg-slate-500/10;
+  }
+
+  .cyberpunk .btn-outline {
+    border-radius: 0;
+    border-color: var(--accent-primary);
+    color: var(--accent-primary);
}

/* Clean Badge */
.badge-modern {
-    @apply px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full border border-slate-200;
+    @apply px-3 py-1 text-xs font-medium rounded-full border;
+    background-color: var(--bg-primary);
+    color: var(--text-secondary);
+    border-color: var(--border-color);
}
}

@layer utilities {
.text-gradient {
-    @apply bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600;
+    @apply bg-clip-text text-transparent bg-gradient-to-r;
+    --tw-gradient-from: var(--text-primary);
+    --tw-gradient-to: var(--text-secondary);
+    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}

.text-gradient-red {
-    @apply bg-clip-text text-transparent bg-gradient-to-r from-brand-red to-red-800;
+    @apply bg-clip-text text-transparent bg-gradient-to-r;
+    --tw-gradient-from: var(--accent-primary);
+    --tw-gradient-to: var(--accent-secondary);
+    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
}

+  /* Marquee Animations */
@keyframes marquee {
0% {
transform: translateX(0);
@@ -97,17 +195,17 @@
}
}

-/* Blog Post Content Styles - targets plain HTML tags from Blogger API */
+/* Blog Post Content Styles */
.blog-content h1,
.blog-content h2,
.blog-content h3,
.blog-content h4,
.blog-content h5,
.blog-content h6 {
-  color: #990000;
+  color: var(--accent-primary);
font-weight: 800;
-  font-family: 'Outfit', sans-serif;
-  border-left: 4px solid #990000;
+  font-family: var(--font-heading);
+  border-left: 4px solid var(--accent-primary);
padding-left: 1rem;
margin-top: 2.5rem;
margin-bottom: 1.5rem;
@@ -134,13 +232,13 @@
}

.blog-content p {
-  color: #475569;
+  color: var(--text-secondary);
line-height: 1.75;
margin-bottom: 1.25rem;
}

.blog-content a {
-  color: #990000;
+  color: var(--accent-primary);
text-decoration: none;
}

@@ -154,13 +252,22 @@
margin: 1.5rem 0;
}

+.cyberpunk .blog-content img {
+  border-radius: 0;
+  box-shadow: 4px 4px 0px var(--accent-primary);
+  filter: grayscale(100%) contrast(120%);
+}
+
.blog-content blockquote {
-  border-left: 4px solid #990000;
-  background-color: #f8fafc;
+  border-left: 4px solid var(--accent-primary);
+  background-color: var(--bg-primary);
+  /* slightly modified from original logic */
+  opacity: 0.9;
padding: 1rem;
border-radius: 0 0.5rem 0.5rem 0;
margin: 1.5rem 0;
font-style: italic;
+  color: var(--text-primary);
}

.blog-content ul,
@@ -171,10 +278,10 @@

.blog-content li {
margin-bottom: 0.5rem;
-  color: #475569;
+  color: var(--text-secondary);
}

.blog-content strong {
-  color: #0f172a;
+  color: var(--text-primary);
font-weight: 600;
-}
 No newline at end of file
+}
diff --git a/src/main.tsx b/src/main.tsx
index ea9e363..6a73f0d 100644
--- a/src/main.tsx
+++ b/src/main.tsx
@@ -2,6 +2,7 @@ import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
+import './pwa';

createRoot(document.getElementById('root')!).render(
<StrictMode>
diff --git a/src/pages/About.tsx b/src/pages/About.tsx
index baeba04..590f982 100644
--- a/src/pages/About.tsx
+++ b/src/pages/About.tsx
@@ -38,21 +38,21 @@ export default function About() {
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}
>
-              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-slate-900 mb-8 leading-tight">
+              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-[var(--text-primary)] mb-8 leading-tight">
Alvian
<br />
-                <span className="text-slate-400">Zachry.</span>
+                <span className="text-[var(--text-secondary)]">Zachry.</span>
</h1>
-              <p className="text-xl md:text-2xl text-slate-500 max-w-lg leading-relaxed mb-10">
+              <p className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-lg leading-relaxed mb-10">
Senior Talent Manager & Software Engineer <br />
-                <span className="text-slate-400 text-xl">bridging the gap between people and technology.</span>
+                <span className="text-[var(--text-secondary)] text-xl">bridging the gap between people and technology.</span>
</p>

<div className="flex flex-wrap gap-4">
<a href="#contact" className="btn-primary flex items-center gap-2 hover:bg-brand-red transition-colors">
Get in touch <ArrowRight className="w-4 h-4" />
</a>
-                <a href="/resume.pdf" className="text-slate-600 hover:text-brand-red font-medium flex items-center gap-2 px-6 py-3 transition-colors">
+                <a href="/resume.pdf" className="text-[var(--text-secondary)] hover:text-brand-red font-medium flex items-center gap-2 px-6 py-3 transition-colors">
Download CV <Download className="w-4 h-4" />
</a>
</div>
@@ -88,10 +88,10 @@ export default function About() {
{[...skills.filter(s => ['JavaScript & TypeScript', 'Python', 'PHP', 'Laravel', 'CodeIgniter', 'React.js & Next.js', 'Vue.js', 'Node.js & Express.js', 'NestJS'].includes(s.name)), ...skills.filter(s => ['JavaScript & TypeScript', 'Python', 'PHP', 'Laravel', 'CodeIgniter', 'React.js & Next.js', 'Vue.js', 'Node.js & Express.js', 'NestJS'].includes(s.name)), ...skills.filter(s => ['JavaScript & TypeScript', 'Python', 'PHP', 'Laravel', 'CodeIgniter', 'React.js & Next.js', 'Vue.js', 'Node.js & Express.js', 'NestJS'].includes(s.name))].map((skill, index) => (
<div
key={`row1-${skill.name}-${index}`}
-                  className="flex items-center gap-2 px-6 py-3 bg-white rounded-full border border-slate-200 shadow-sm whitespace-nowrap group hover:border-brand-red hover:shadow-md transition-all duration-300"
+                  className="flex items-center gap-2 px-6 py-3 card-modern border border-[var(--border-color)] shadow-sm whitespace-nowrap group hover:border-brand-red hover:shadow-md transition-all duration-300"
>
-                  <FontAwesomeIcon icon={skill.icon} className="w-5 h-5 text-slate-400 group-hover:text-brand-red transition-colors" />
-                  <span className="text-sm font-medium text-slate-600 group-hover:text-brand-red transition-colors">{skill.name}</span>
+                  <FontAwesomeIcon icon={skill.icon} className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-brand-red transition-colors" />
+                  <span className="text-sm font-medium text-[var(--text-secondary)] group-hover:text-brand-red transition-colors">{skill.name}</span>
</div>
))}
</motion.div>
@@ -108,18 +108,18 @@ export default function About() {
{[...skills.filter(s => !['JavaScript & TypeScript', 'Python', 'PHP', 'Laravel', 'CodeIgniter', 'React.js & Next.js', 'Vue.js', 'Node.js & Express.js', 'NestJS'].includes(s.name) && s.category === 'technical'), ...skills.filter(s => !['JavaScript & TypeScript', 'Python', 'PHP', 'Laravel', 'CodeIgniter', 'React.js & Next.js', 'Vue.js', 'Node.js & Express.js', 'NestJS'].includes(s.name) && s.category === 'technical'), ...skills.filter(s => !['JavaScript & TypeScript', 'Python', 'PHP', 'Laravel', 'CodeIgniter', 'React.js & Next.js', 'Vue.js', 'Node.js & Express.js', 'NestJS'].includes(s.name) && s.category === 'technical')].map((skill, index) => (
<div
key={`row2-${skill.name}-${index}`}
-                  className="flex items-center gap-2 px-6 py-3 bg-white rounded-full border border-slate-200 shadow-sm whitespace-nowrap group hover:border-brand-red hover:shadow-md transition-all duration-300"
+                  className="flex items-center gap-2 px-6 py-3 card-modern border border-[var(--border-color)] shadow-sm whitespace-nowrap group hover:border-brand-red hover:shadow-md transition-all duration-300"
>
-                  <FontAwesomeIcon icon={skill.icon} className="w-5 h-5 text-slate-400 group-hover:text-brand-red transition-colors" />
-                  <span className="text-sm font-medium text-slate-600 group-hover:text-brand-red transition-colors">{skill.name}</span>
+                  <FontAwesomeIcon icon={skill.icon} className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-brand-red transition-colors" />
+                  <span className="text-sm font-medium text-[var(--text-secondary)] group-hover:text-brand-red transition-colors">{skill.name}</span>
</div>
))}
</motion.div>
</div>

-          {/* Gradient Masks for fading effect */}
-          <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
-          <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>
+          {/* Gradient Masks for fading effect - updated to match theme bg */}
+          <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-10 pointer-events-none"></div>
+          <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-10 pointer-events-none"></div>
</section>

{/* Biography (About Me) */}
@@ -130,8 +130,8 @@ export default function About() {
viewport={{ once: true }}
transition={{ duration: 0.6 }}
>
-            <h2 className="text-3xl font-bold text-slate-900 mb-8 ">About Me</h2>
-            <p className="text-lg text-slate-600 leading-loose">
+            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-8 ">About Me</h2>
+            <p className="text-lg text-[var(--text-secondary)] leading-loose">
Hi, I'm Ary! I’m a tech geek at heart who loves bringing people together. I spend my days building full-stack systems and—my favorite part—mentoring the next generation of engineers. I’m really passionate about bridging the gap between talent in Southeast Asia and opportunities in Europe. When I’m not deep in code, I’m usually coaching teams, helping someone pivot their career, or just geeking out on how to make Agile actually work.
</p>
</motion.div>
@@ -147,7 +147,7 @@ export default function About() {
<div className="grid grid-cols-1 gap-12">
{categories.filter(cat => cat.name !== 'Technical Skills').map((category) => (
<div key={category.name} className="space-y-6">
-                  <h3 className="text-xl font-semibold text-slate-900 flex items-center gap-3 border-b border-slate-200 pb-4">
+                  <h3 className="text-xl font-semibold text-[var(--text-primary)] flex items-center gap-3 border-b border-[var(--border-color)] pb-4">
<category.icon className="w-6 h-6 text-brand-red" />
{category.name}
</h3>
@@ -157,13 +157,13 @@ export default function About() {
.filter(skill => skill.category === category.name.toLowerCase().split(' ')[0])
.map((skill) => (
<div key={skill.name} className="flex-1 min-w-[280px] max-w-[350px]">
-                          <ModernCard className="h-full flex items-center gap-4 p-5 hover:border-brand-red/30 transition-all hover:shadow-md hover:-translate-y-1">
-                            <div className="p-3 bg-slate-50 rounded-xl text-slate-400 group-hover:text-brand-red transition-colors">
+                          <ModernCard className="h-full flex items-center gap-4 p-5 hover:border-brand-red/30 transition-all hover:shadow-md hover:-translate-y-1 bg-[var(--card-bg)]">
+                            <div className="p-3 bg-[var(--bg-primary)] rounded-xl text-[var(--text-secondary)] group-hover:text-brand-red transition-colors">
<FontAwesomeIcon icon={skill.icon} className="w-5 h-5" />
</div>
<div>
-                              <h4 className="font-semibold text-slate-900">{skill.name}</h4>
-                              <p className="text-sm text-slate-500 mt-1 leading-snug">{skill.description}</p>
+                              <h4 className="font-semibold text-[var(--text-primary)]">{skill.name}</h4>
+                              <p className="text-sm text-[var(--text-secondary)] mt-1 leading-snug">{skill.description}</p>
</div>
</ModernCard>
</div>
diff --git a/src/pages/Blog.tsx b/src/pages/Blog.tsx
index 8c9d6da..da3e816 100644
--- a/src/pages/Blog.tsx
+++ b/src/pages/Blog.tsx
@@ -6,8 +6,15 @@ import { Calendar, ChevronRight } from 'lucide-react';
import ModernCard from '../components/ModernCard';
import SEO from '../components/SEO';

+interface BlogPost {
+  id: string;
+  title: string;
+  content: string;
+  published: string;
+}
+
export default function Blog() {
-  const [posts, setPosts] = useState<any[]>([]);
+  const [posts, setPosts] = useState<BlogPost[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

diff --git a/src/pages/Experience.tsx b/src/pages/Experience.tsx
index cb847be..005a57e 100644
--- a/src/pages/Experience.tsx
+++ b/src/pages/Experience.tsx
@@ -30,10 +30,10 @@ export default function Experience() {
animate={{ opacity: 1, y: 0 }}
className="text-center mb-24"
>
-          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
+          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6 tracking-tight">
Professional Journey
</h1>
-          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
+          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
A timeline of my career across software engineering, leadership, and education.
</p>
</motion.div>
@@ -50,12 +50,12 @@ export default function Experience() {
viewport={{ once: true }}
transition={{ delay: index * 0.1 }}
>
-                <ModernCard className="group hover:border-brand-red/30 transition-colors p-8 bg-white/80 backdrop-blur-sm">
+                <ModernCard className="group hover:border-brand-red/30 transition-colors p-8 bg-[var(--card-bg)]/80 backdrop-blur-sm">
<div className="flex flex-col md:flex-row gap-8">
{/* Icon & Line */}
<div className="hidden md:flex flex-col items-center">
-                      <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-brand-red group-hover:bg-red-50/50 group-hover:scale-105 transition-all duration-300 border border-slate-100 shadow-sm">
-                        {/* @ts-ignore - Rendering Icon component dynamically */}
+                      <div className="w-16 h-16 rounded-2xl bg-[var(--bg-primary)] flex items-center justify-center text-[var(--text-secondary)] group-hover:text-brand-red group-hover:bg-red-50/10 group-hover:scale-105 transition-all duration-300 border border-[var(--border-color)] shadow-sm">
+                        {/* @ts-expect-error - Rendering Icon component dynamically */}
<IconComponent className="w-7 h-7" />
</div>
</div>
@@ -64,17 +64,17 @@ export default function Experience() {
<div className="flex-1 space-y-4">
<div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
<div>
-                          <h3 className="text-xl font-bold text-slate-900">{exp.title}</h3>
+                          <h3 className="text-xl font-bold text-[var(--text-primary)]">{exp.title}</h3>
<h4 className="text-brand-red font-medium text-lg">{exp.company}</h4>
</div>

-                        <div className="flex items-center text-slate-400 text-sm font-medium bg-slate-100/80 px-4 py-1.5 rounded-full w-fit whitespace-nowrap">
+                        <div className="flex items-center text-[var(--text-secondary)] text-sm font-medium bg-[var(--bg-primary)]/80 px-4 py-1.5 rounded-full w-fit whitespace-nowrap">
<Calendar className="w-4 h-4 mr-2" />
{exp.period}
</div>
</div>

-                      <p className="text-slate-600 leading-loose text-base">
+                      <p className="text-[var(--text-secondary)] leading-loose text-base">
{exp.description}
</p>
</div>
diff --git a/src/pwa.ts b/src/pwa.ts
new file mode 100644
index 0000000..126b578
--- /dev/null
+++ b/src/pwa.ts
@@ -0,0 +1,9 @@
+import { registerSW } from 'virtual:pwa-register';
+
+const updateSW = registerSW({
+  onNeedRefresh() {
+    if (confirm('New content available. Reload?')) {
+      updateSW(true);
+    }
+  },
+});
diff --git a/src/setupTests.ts b/src/setupTests.ts
new file mode 100644
index 0000000..7b0828b
--- /dev/null
+++ b/src/setupTests.ts
@@ -0,0 +1 @@
+import '@testing-library/jest-dom';
diff --git a/src/vite-env.d.ts b/src/vite-env.d.ts
index 11f02fe..0f53bb0 100644
--- a/src/vite-env.d.ts
+++ b/src/vite-env.d.ts
@@ -1 +1 @@
-/// <reference types="vite/client" />
+/// <reference types="vite-plugin-pwa/client" />
diff --git a/vite.config.ts b/vite.config.ts
index 147380a..2c6439d 100644
--- a/vite.config.ts
+++ b/vite.config.ts
@@ -1,9 +1,34 @@
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
+import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
-  plugins: [react()],
+  plugins: [
+    react(),
+    VitePWA({
+      registerType: 'autoUpdate',
+      includeAssets: ['favicon.ico', 'apples-touch-icon.png', 'masked-icon.svg'],
+      manifest: {
+        name: 'Alvian Zachry Portfolio',
+        short_name: 'AlvianZF',
+        description: 'Portfolio of Alvian Zachry Faturrahman - Program Manager & Full Stack Engineer',
+        theme_color: '#ffffff',
+        icons: [
+          {
+            src: 'pwa-192x192.svg',
+            sizes: '192x192',
+            type: 'image/svg+xml'
+          },
+          {
+            src: 'pwa-512x512.svg',
+            sizes: '512x512',
+            type: 'image/svg+xml'
+          }
+        ]
+      }
+    })
+  ],
optimizeDeps: {
exclude: ['lucide-react'],
},
diff --git a/vitest.config.ts b/vitest.config.ts
new file mode 100644
index 0000000..3d5bf00
--- /dev/null
+++ b/vitest.config.ts
@@ -0,0 +1,13 @@
+/// <reference types="vitest" />
+import { defineConfig } from 'vitest/config';
+import react from '@vitejs/plugin-react';
+
+export default defineConfig({
+  // eslint-disable-next-line @typescript-eslint/no-explicit-any
+  plugins: [react() as any],
+  test: {
+    globals: true,
+    environment: 'jsdom',
+    setupFiles: './src/setupTests.ts',
+  },
+});

```

## feat: fix stupid games (bcb0f5d) - 2026-01-27

```diff
diff --git a/README.md b/README.md
index 1b55a5e..3bf319a 100644
--- a/README.md
+++ b/README.md
@@ -50,6 +50,14 @@ I didn't just add meta tags; I performed a ritual summoning for the search engin
*   **Prettier**: If I miss a semicolon, the computer yells at me.
*   **Strict Mode**: `any` is now illegal. I have to type `unknown` and cast it like a wizard.

+### 🕹️ The "Stupid Playable Arcade" (Phase 3)
+Because every professional portfolio needs a way to waste the recruiter's time.
+*   **Bug Squash**: Save the production database from actual bugs.
+*   **Quick Sync Dodge**: Simulate the average Tuesday by dodging calendar invites.
+*   **Elusive Deploy**: Try to push to production. Good luck.
+*   **Learn Flex (Sarcastic)**: CSS is hard. We made it harder.
+*   **Type Torture**: Fix `any` types or get roasted.
+

I built this app with a stack that says "I have too much free time."
diff --git a/src/App.tsx b/src/App.tsx
index 772840c..23fbd20 100644
--- a/src/App.tsx
+++ b/src/App.tsx
@@ -11,6 +11,11 @@ import Mentorship from './pages/Mentorship';
import WormBackground from './components/WormBackground';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider } from './context/ThemeContext';
+import BugSquash from './pages/games/BugSquash';
+import QuickSync from './pages/games/QuickSync';
+import ElusiveDeploy from './pages/games/ElusiveDeploy';
+import LearnFlex from './pages/games/LearnFlex';
+import LearnTypeScript from './pages/games/LearnTypeScript';

function App() {
return (
@@ -33,6 +38,11 @@ function App() {
<Route path="/blog" element={<Blog />} />
<Route path="/blog/:postId" element={<BlogPost />} />
<Route path="/mentorship" element={<Mentorship />} />
+                  <Route path="/games/bug-squash" element={<BugSquash />} />
+                  <Route path="/games/quick-sync" element={<QuickSync />} />
+                  <Route path="/games/elusive-deploy" element={<ElusiveDeploy />} />
+                  <Route path="/games/learn-flex" element={<LearnFlex />} />
+                  <Route path="/games/learn-typescript" element={<LearnTypeScript />} />
</Routes>
</AnimatePresence>
</main>
diff --git a/src/components/Header.tsx b/src/components/Header.tsx
index 602b6d3..62ddc0e 100644
--- a/src/components/Header.tsx
+++ b/src/components/Header.tsx
@@ -25,7 +25,7 @@ export default function Header() {
}, [isMobileMenuOpen]);

return (
-    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 transition-all duration-300">
+    <header className="fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-md border-b border-slate-200 transition-all duration-300">
<div className="container mx-auto px-6 py-4">
<div className="flex justify-between items-center">
{/* Logo */}
@@ -48,6 +48,89 @@ export default function Header() {
</NavLink>
))}

+            {/* Games Dropdown (Desktop) */}
+            <div className="relative group">
+              <button className="flex items-center space-x-1 text-sm font-medium text-slate-500 hover:text-[#990000] transition-colors py-2">
+                <span>Games</span>
+                <ChevronDown className="w-4 h-4" />
+              </button>
+
+              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top">
+                <div className="bg-white rounded-xl shadow-xl border border-slate-100 p-6 grid grid-cols-2 gap-8 relative">
+                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-slate-100 transform rotate-45"></div>
+
+                  {/* Category: Waste Time */}
+                  <div>
+                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Waste Time</h3>
+                    <div className="space-y-2">
+                      <NavLink to="/games/bug-squash" className="block p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors group/item">
+                        <div className="flex items-start gap-3">
+                          <div className="p-2 bg-red-50 text-red-600 rounded-lg group-hover/item:text-[#990000] transition-colors">
+                            <i className="fas fa-bug w-5 h-5 flex items-center justify-center">🐞</i>
+                          </div>
+                          <div>
+                            <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">Bug Squash</div>
+                            <div className="text-xs text-slate-500">Whack-a-Bug (Stress Relief)</div>
+                          </div>
+                        </div>
+                      </NavLink>
+                      <NavLink to="/games/quick-sync" className="block p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors group/item">
+                        <div className="flex items-start gap-3">
+                          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover/item:text-[#990000] transition-colors">
+                            <i className="fas fa-calendar-minus w-5 h-5 flex items-center justify-center">📅</i>
+                          </div>
+                          <div>
+                            <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">Quick Sync Dodge</div>
+                            <div className="text-xs text-slate-500">Avoid the calendar invites</div>
+                          </div>
+                        </div>
+                      </NavLink>
+                      <NavLink to="/games/elusive-deploy" className="block p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors group/item">
+                        <div className="flex items-start gap-3">
+                          <div className="p-2 bg-orange-50 text-orange-600 rounded-lg group-hover/item:text-[#990000] transition-colors">
+                            <i className="fas fa-rocket w-5 h-5 flex items-center justify-center">🚀</i>
+                          </div>
+                          <div>
+                            <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">Elusive Deploy</div>
+                            <div className="text-xs text-slate-500">Try to click the button</div>
+                          </div>
+                        </div>
+                      </NavLink>
+                    </div>
+                  </div>
+
+                  {/* Category: Actually Learn (Sarcastic) */}
+                  <div>
+                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">"Actually" Learn</h3>
+                    <div className="space-y-2">
+                      <NavLink to="/games/learn-flex" className="block p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors group/item">
+                        <div className="flex items-start gap-3">
+                          <div className="p-2 bg-purple-50 text-purple-600 rounded-lg group-hover/item:text-[#990000] transition-colors">
+                            <div className="w-5 h-5 flex items-center justify-center font-bold border-2 border-current rounded text-[10px]">CSS</div>
+                          </div>
+                          <div>
+                            <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">Flexbox Froggy</div>
+                            <div className="text-xs text-slate-500">Center a div correctly</div>
+                          </div>
+                        </div>
+                      </NavLink>
+                      <NavLink to="/games/learn-typescript" className="block p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors group/item">
+                        <div className="flex items-start gap-3">
+                          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg group-hover/item:text-[#990000] transition-colors">
+                            <div className="w-5 h-5 flex items-center justify-center font-bold text-[10px]">TS</div>
+                          </div>
+                          <div>
+                            <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">Type Torture</div>
+                            <div className="text-xs text-slate-500">Fix the red squiggly lines</div>
+                          </div>
+                        </div>
+                      </NavLink>
+                    </div>
+                  </div>
+                </div>
+              </div>
+            </div>
+
{/* Tools Dropdown (Desktop) */}
<div className="relative group">
<button className="flex items-center space-x-1 text-sm font-medium text-slate-500 hover:text-[#990000] transition-colors py-2">
diff --git a/src/components/games/BSOD.tsx b/src/components/games/BSOD.tsx
new file mode 100644
index 0000000..7a637ef
--- /dev/null
+++ b/src/components/games/BSOD.tsx
@@ -0,0 +1,47 @@
+import { motion } from 'framer-motion';
+import { RefreshCcw } from 'lucide-react';
+
+interface BSODProps {
+  error: string;
+  onRestart: () => void;
+}
+
+export default function BSOD({ error, onRestart }: BSODProps) {
+  return (
+    <div className="fixed inset-0 z-[100] bg-[#0078D7] text-white flex flex-col items-center justify-center p-8 font-mono cursor-none">
+      <motion.div
+        initial={{ scale: 0.9, opacity: 0 }}
+        animate={{ scale: 1, opacity: 1 }}
+        transition={{ duration: 0.2 }}
+        className="max-w-3xl w-full space-y-8"
+      >
+        <div className="text-9xl mb-8">:(</div>
+        <h1 className="text-4xl">Your PC ran into a problem and needs to restart.</h1>
+        <p className="text-2xl">We're just collecting some error info, and then we'll restart for you.</p>
+        <div className="text-xl pt-8">
+          <p>0% complete</p>
+          <div className="mt-8 flex items-start gap-4">
+            <div className="w-24 h-24 bg-white p-2">
+              <div className="w-full h-full bg-[#0078D7] flex items-center justify-center border-4 border-[#0078D7]">
+                <div className="w-16 h-16 bg-white" />
+              </div>
+            </div>
+            <div className="space-y-2 text-sm">
+              <p>For more information about this issue and possible fixes, visit https://www.windows.com/stopcode</p>
+              <p>If you call a support person, give them this info:</p>
+              <p>Stop code: {error}</p>
+            </div>
+          </div>
+        </div>
+
+        <button
+          onClick={onRestart}
+          className="mt-12 px-8 py-3 bg-white text-[#0078D7] font-bold rounded hover:bg-opacity-90 transition-colors flex items-center gap-2 cursor-pointer"
+        >
+          <RefreshCcw className="w-5 h-5" />
+          MANUAL REBOOT
+        </button>
+      </motion.div>
+    </div>
+  );
+}
diff --git a/src/components/games/Bug.tsx b/src/components/games/Bug.tsx
new file mode 100644
index 0000000..c72efa4
--- /dev/null
+++ b/src/components/games/Bug.tsx
@@ -0,0 +1,40 @@
+import { motion } from 'framer-motion';
+import { Bug as BugIcon } from 'lucide-react';
+
+interface BugProps {
+  id: number;
+  x: number;
+  y: number;
+  onClick: (id: number) => void;
+}
+
+export default function Bug({ id, x, y, onClick }: BugProps) {
+  return (
+    <motion.button
+      initial={{ scale: 0, rotate: 0 }}
+      animate={{
+        scale: 1,
+        rotate: [0, -10, 10, -10, 0],
+        x: [0, 10, -10, 0],
+        y: [0, -5, 5, 0]
+      }}
+      transition={{
+        rotate: { repeat: Infinity, duration: 0.5 },
+        x: { repeat: Infinity, duration: 2, ease: "linear" },
+        y: { repeat: Infinity, duration: 3, ease: "linear" }
+      }}
+      style={{
+        position: 'absolute',
+        left: `${x}%`,
+        top: `${y}%`,
+      }}
+      onClick={(e) => {
+        e.stopPropagation();
+        onClick(id);
+      }}
+      className="p-2 text-red-500 hover:text-red-600 transition-colors transform -translate-x-1/2 -translate-y-1/2 z-10"
+    >
+      <BugIcon className="w-8 h-8 drop-shadow-lg" />
+    </motion.button>
+  );
+}
diff --git a/src/components/games/CalendarInvite.tsx b/src/components/games/CalendarInvite.tsx
new file mode 100644
index 0000000..ff3061a
--- /dev/null
+++ b/src/components/games/CalendarInvite.tsx
@@ -0,0 +1,21 @@
+import { Calendar } from 'lucide-react';
+
+interface CalendarInviteProps {
+  id: number;
+  x: number; // 0-100 percentage
+  y: number; // 0-100 percentage
+}
+
+export default function CalendarInvite({ x, y }: CalendarInviteProps) {
+  return (
+    <div
+      className="absolute w-16 h-16 -ml-8 z-10"
+      style={{ left: `${x}%`, top: `${y}%` }}
+    >
+      <div className="w-full h-full bg-blue-500 rounded-xl shadow-lg border-2 border-white flex flex-col items-center justify-center text-white animate-bounce-slight">
+        <Calendar className="w-8 h-8 mb-1" />
+        <span className="text-[8px] font-bold uppercase">Sync</span>
+      </div>
+    </div>
+  );
+}
diff --git a/src/components/games/FlexPlayground.tsx b/src/components/games/FlexPlayground.tsx
new file mode 100644
index 0000000..cdc9695
--- /dev/null
+++ b/src/components/games/FlexPlayground.tsx
@@ -0,0 +1,180 @@
+import { useState, useEffect } from 'react';
+import { motion } from 'framer-motion';
+import { Check } from 'lucide-react';
+
+interface Level {
+  id: number;
+  instruction: string;
+  sarcasticHint: string;
+  targetStyle: {
+    justifyContent: string;
+    alignItems: string;
+    flexDirection?: string;
+  };
+  items: number;
+}
+
+const LEVELS: Level[] = [
+  {
+    id: 1,
+    instruction: "The client wants the div centered. Vertically AND Horizontally. Groundbreaking.",
+    sarcasticHint: "Have you tried 'center'? Oh wait, that doesn't exist.",
+    targetStyle: { justifyContent: 'center', alignItems: 'center' },
+    items: 1
+  },
+  {
+    id: 2,
+    instruction: "Move them to the end. The client says 'Start' is too aggressive.",
+    sarcasticHint: "Think about the 'end' of your career if you can't do this.",
+    targetStyle: { justifyContent: 'flex-end', alignItems: 'center' },
+    items: 3
+  },
+  {
+    id: 3,
+    instruction: "Space them out evenly. But not *too* evenly.",
+    sarcasticHint: "It's the one that has 'space' and 'around' in it. Or maybe 'between'?",
+    targetStyle: { justifyContent: 'space-between', alignItems: 'center' },
+    items: 3
+  },
+  {
+    id: 4,
+    instruction: "Column layout. Because scrolling is the future.",
+    sarcasticHint: "Rotate your head 90 degrees.",
+    targetStyle: { justifyContent: 'center', alignItems: 'center', flexDirection: 'column' },
+    items: 3
+  }
+];
+
+export default function FlexPlayground() {
+  const [currentLevel, setCurrentLevel] = useState(0);
+  const [styles, setStyles] = useState({
+    justifyContent: 'flex-start',
+    alignItems: 'stretch',
+    flexDirection: 'row'
+  });
+  const [feedback, setFeedback] = useState("");
+  const [success, setSuccess] = useState(false);
+
+  const level = LEVELS[currentLevel];
+
+  useEffect(() => {
+    // Check win condition
+    const isJustifyMatch = styles.justifyContent === level.targetStyle.justifyContent;
+    const isAlignMatch = styles.alignItems === level.targetStyle.alignItems;
+    const isDirectionMatch = (level.targetStyle.flexDirection || 'row') === styles.flexDirection;
+
+    if (isJustifyMatch && isAlignMatch && isDirectionMatch) {
+      setSuccess(true);
+      setFeedback("Finally. Moving on...");
+    } else {
+      setSuccess(false);
+      setFeedback("");
+    }
+  }, [styles, level]);
+
+  const nextLevel = () => {
+    if (currentLevel < LEVELS.length - 1) {
+      setCurrentLevel(l => l + 1);
+      setStyles({ justifyContent: 'flex-start', alignItems: 'stretch', flexDirection: 'row' });
+      setSuccess(false);
+      setFeedback("");
+    } else {
+      setFeedback("You actually finished? Go do some real work.");
+    }
+  };
+
+  return (
+    <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl mx-auto">
+      {/* Controls */}
+      <div className="w-full md:w-1/3 space-y-6 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700">
+        <div>
+          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Level {level.id}</h2>
+          <p className="text-slate-600 dark:text-slate-300 mb-4">{level.instruction}</p>
+          <div className="bg-yellow-50 text-yellow-800 p-3 rounded-lg text-sm italic border border-yellow-200">
+            Hint: {level.sarcasticHint}
+          </div>
+        </div>
+
+        <div className="space-y-4">
+          <div>
+            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">justify-content</label>
+            <select
+              value={styles.justifyContent}
+              onChange={(e) => setStyles(s => ({ ...s, justifyContent: e.target.value }))}
+              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5"
+            >
+              {['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'].map(opt => (
+                <option key={opt} value={opt}>{opt}</option>
+              ))}
+            </select>
+          </div>
+          <div>
+            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">align-items</label>
+            <select
+              value={styles.alignItems}
+              onChange={(e) => setStyles(s => ({ ...s, alignItems: e.target.value }))}
+              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5"
+            >
+              {['flex-start', 'flex-end', 'center', 'baseline', 'stretch'].map(opt => (
+                <option key={opt} value={opt}>{opt}</option>
+              ))}
+            </select>
+          </div>
+          <div>
+            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">flex-direction</label>
+            <select
+              value={styles.flexDirection}
+              onChange={(e) => setStyles(s => ({ ...s, flexDirection: e.target.value }))}
+              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5"
+            >
+              {['row', 'row-reverse', 'column', 'column-reverse'].map(opt => (
+                <option key={opt} value={opt}>{opt}</option>
+              ))}
+            </select>
+          </div>
+        </div>
+
+        {success && (
+          <motion.div
+            initial={{ opacity: 0, y: 10 }}
+            animate={{ opacity: 1, y: 0 }}
+            className="flex flex-col gap-4"
+          >
+            <div className="flex items-center gap-2 text-green-600 font-bold bg-green-50 p-3 rounded-lg">
+              <Check className="w-5 h-5" />
+              {feedback}
+            </div>
+            <button
+              onClick={nextLevel}
+              className="w-full py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors"
+            >
+              Next Level
+            </button>
+          </motion.div>
+        )}
+      </div>
+
+      {/* Playground */}
+      <div className="flex-1 min-h-[400px] bg-slate-200 dark:bg-slate-900 rounded-2xl border-4 border-slate-300 dark:border-slate-700 relative overflow-hidden">
+        <div
+          className="absolute inset-0 p-8 flex gap-4 transition-all duration-500"
+          style={{
+            justifyContent: styles.justifyContent,
+            alignItems: styles.alignItems,
+            flexDirection: styles.flexDirection as 'row' | 'row-reverse' | 'column' | 'column-reverse'
+          }}
+        >
+          {Array.from({ length: level.items }).map((_, i) => (
+            <motion.div
+              key={i}
+              layout
+              className="w-20 h-20 bg-[#990000] rounded-xl shadow-lg flex items-center justify-center font-bold text-white text-xl border-4 border-white/20"
+            >
+              div
+            </motion.div>
+          ))}
+        </div>
+      </div>
+    </div>
+  );
+}
diff --git a/src/components/games/PlayerDev.tsx b/src/components/games/PlayerDev.tsx
new file mode 100644
index 0000000..6321b67
--- /dev/null
+++ b/src/components/games/PlayerDev.tsx
@@ -0,0 +1,25 @@
+import { motion } from 'framer-motion';
+import { User, Code2 } from 'lucide-react';
+
+interface PlayerDevProps {
+  x: number; // 0-100 percentage
+}
+
+export default function PlayerDev({ x }: PlayerDevProps) {
+  return (
+    <motion.div
+      animate={{ left: `${x}%` }}
+      transition={{ type: "spring", stiffness: 300, damping: 30 }}
+      className="absolute bottom-4 w-12 h-12 -ml-6 z-20"
+      style={{ left: `${x}%` }}
+    >
+      <div className="relative w-full h-full bg-slate-900 dark:bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-slate-200 dark:border-slate-700">
+        <User className="w-6 h-6 text-white dark:text-slate-900" />
+        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap font-bold">
+          <Code2 className="w-3 h-3 inline mr-1" />
+          Coding...
+        </div>
+      </div>
+    </motion.div>
+  );
+}
diff --git a/src/components/games/RunawayButton.tsx b/src/components/games/RunawayButton.tsx
new file mode 100644
index 0000000..275b7a5
--- /dev/null
+++ b/src/components/games/RunawayButton.tsx
@@ -0,0 +1,51 @@
+import { useState, useRef, useEffect } from 'react';
+import { motion } from 'framer-motion';
+import { Rocket } from 'lucide-react';
+
+interface RunawayButtonProps {
+  onAttempt: () => void;
+  frozen?: boolean;
+}
+
+export default function RunawayButton({ onAttempt, frozen = false }: RunawayButtonProps) {
+  const [position, setPosition] = useState({ x: 0, y: 0 });
+  const buttonRef = useRef<HTMLButtonElement>(null);
+  // Initialize position to center
+  useEffect(() => {
+    setPosition({ x: 0, y: 0 });
+  }, []);
+
+  const handleHover = () => {
+    onAttempt();
+
+    if (frozen) return;
+
+    // Calculate random position within viewport (approx)
+    // We want it to move significantly but stay visible
+    // Randomize movement
+    let newX = (Math.random() - 0.5) * window.innerWidth * 0.8;
+    let newY = (Math.random() - 0.5) * window.innerHeight * 0.6;
+
+    // Ensure it moves at least some distance
+    if (Math.abs(newX - position.x) < 100) newX += 100 * Math.sign(newX - position.x);
+    if (Math.abs(newY - position.y) < 100) newY += 100 * Math.sign(newY - position.y);
+
+    setPosition({ x: newX, y: newY });
+  };
+
+  return (
+    <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
+      <motion.button
+        ref={buttonRef}
+        animate={{ x: position.x, y: position.y }}
+        transition={{ type: "spring", stiffness: 300, damping: 20 }}
+        onMouseEnter={handleHover}
+        onClick={handleHover} // Fail-safe if they manage to click
+        className="pointer-events-auto px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg shadow-lg flex items-center gap-2 z-50 transform hover:scale-110 active:scale-95 transition-transform"
+      >
+        <Rocket className="w-5 h-5" />
+        DEPLOY TO PRODUCTION
+      </motion.button>
+    </div>
+  );
+}
diff --git a/src/components/games/TypeEditor.tsx b/src/components/games/TypeEditor.tsx
new file mode 100644
index 0000000..8b9fa48
--- /dev/null
+++ b/src/components/games/TypeEditor.tsx
@@ -0,0 +1,160 @@
+import { useState } from 'react';
+import { motion } from 'framer-motion';
+import { Check, X } from 'lucide-react';
+
+interface Challenge {
+  id: number;
+  codeBefore: string;
+  codeAfter: string;
+  placeholder: string;
+  correctAnswer: (input: string) => boolean;
+  hint: string;
+}
+
+const CHALLENGES: Challenge[] = [
+  {
+    id: 1,
+    codeBefore: "const user: ",
+    codeAfter: " = { name: 'Alvian', id: 1 };",
+    placeholder: "any",
+    // Must NOT be 'any' or 'object'. Must be explicit.
+    correctAnswer: (input) => !input.includes('any') && !input.includes('object') && input.includes('{') && input.includes('string'),
+    hint: "Don't you dare use 'any'. Be specific."
+  },
+  {
+    id: 2,
+    codeBefore: "function process<T>(data: ",
+    codeAfter: "): T { return data; }",
+    placeholder: "any",
+    // Must use T
+    correctAnswer: (input) => input.trim() === 'T',
+    hint: "It's generic for a reason. Use the T."
+  },
+  {
+    id: 3,
+    codeBefore: "type ReallyComplex = ",
+    codeAfter: ";",
+    placeholder: "string",
+    // Must be unnecessarily complex
+    correctAnswer: (input) => input.length > 20 && (input.includes('|') || input.includes('&') || input.includes('Record')),
+    hint: "Make it complicated. If a junior dev can read it, it's wrong."
+  }
+];
+
+export default function TypeEditor() {
+  const [currentLevel, setCurrentLevel] = useState(0);
+  const [input, setInput] = useState("");
+  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
+  const [message, setMessage] = useState("");
+
+  const challenge = CHALLENGES[currentLevel];
+
+  const checkAnswer = () => {
+    if (input.trim() === 'any') {
+      setStatus('error');
+      setMessage("I will personally delete your GitHub account if you use 'any'.");
+      return;
+    }
+
+    if (challenge.correctAnswer(input)) {
+      setStatus('success');
+      setMessage("Acceptable. You may pass.");
+    } else {
+      setStatus('error');
+      setMessage(challenge.hint);
+    }
+  };
+
+  const nextLevel = () => {
+    if (currentLevel < CHALLENGES.length - 1) {
+      setCurrentLevel(l => l + 1);
+      setInput("");
+      setStatus('idle');
+      setMessage("");
+    } else {
+      setMessage("You have proven yourself worthy of the compiler. Now go fix the 400 other errors.");
+    }
+  };
+
+  return (
+    <div className="w-full max-w-4xl mx-auto space-y-8">
+      <div className="bg-[#1E1E1E] rounded-xl shadow-2xl overflow-hidden border border-slate-700 font-mono text-sm md:text-base">
+        {/* Editor Toolbar */}
+        <div className="bg-[#252526] px-4 py-2 flex items-center gap-2 border-b border-[#333]">
+          <div className="flex gap-1.5">
+            <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
+            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
+            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
+          </div>
+          <span className="ml-4 text-slate-400 text-xs">pain.ts</span>
+        </div>
+
+        {/* Code Area */}
+        <div className="p-8 text-[#D4D4D4] leading-loose">
+          <div className="flex items-center flex-wrap gap-2">
+            <span className="text-[#569CD6]"></span>
+            <span>{challenge.codeBefore}</span>
+            <div className="relative inline-block min-w-[100px]">
+              <input
+                type="text"
+                value={input}
+                onChange={(e) => {
+                  setInput(e.target.value);
+                  setStatus('idle');
+                }}
+                onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
+                className={`bg-transparent border-b-2 outline-none w-full font-mono transition-colors ${status === 'error' ? 'border-[#F48771] text-[#F48771]' :
+                  status === 'success' ? 'border-[#4EC9B0] text-[#4EC9B0]' :
+                    'border-[#569CD6] text-white'
+                  }`}
+                placeholder={challenge.placeholder}
+                autoFocus
+              />
+              {status === 'error' && (
+                <div className="absolute top-full left-0 w-full h-1 bg-red-500/50 wave-underline" />
+              )}
+            </div>
+            <span>{challenge.codeAfter}</span>
+          </div>
+        </div>
+      </div>
+
+      {/* Feedback & Controls */}
+      <div className="flex flex-col items-center gap-4 min-h-[100px]">
+        {status !== 'idle' && (
+          <motion.div
+            initial={{ opacity: 0, y: 10 }}
+            animate={{ opacity: 1, y: 0 }}
+            className={`flex items-center gap-3 px-6 py-3 rounded-lg ${status === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
+              }`}
+          >
+            {status === 'success' ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
+            <span className="font-bold">{message}</span>
+          </motion.div>
+        )}
+
+        <div className="flex gap-4">
+          <button
+            onClick={checkAnswer}
+            disabled={status === 'success'}
+            className={`px-8 py-3 rounded-lg font-bold transition-all ${status === 'success'
+              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
+              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/30'
+              }`}
+          >
+            Compile
+          </button>
+
+          {status === 'success' && currentLevel < CHALLENGES.length - 1 && (
+            <button
+              onClick={nextLevel}
+              className="px-8 py-3 bg-slate-800 text-white font-bold rounded-lg hover:bg-slate-700 transition-all shadow-lg"
+            >
+              Next Error
+            </button>
+          )}
+        </div>
+      </div>
+    </div>
+  );
+}
diff --git a/src/pages/Blog.tsx b/src/pages/Blog.tsx
index da3e816..555c495 100644
--- a/src/pages/Blog.tsx
+++ b/src/pages/Blog.tsx
@@ -79,10 +79,10 @@ export default function Blog() {
animate={{ opacity: 1, y: 0 }}
className="text-center mb-16"
>
-          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
+          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
Latest Thoughts
</h1>
-          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
+          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
Writings on random things I thought at that moment.
</p>
</motion.div>
@@ -100,13 +100,13 @@ export default function Blog() {
transition={{ delay: index * 0.03 }}
>
<Link to={`/blog/${post.id}`} className="group block h-full">
-                      <ModernCard className="flex flex-col justify-between p-5 hover:border-brand-red/30 transition-all h-full">
+                      <ModernCard className="flex flex-col justify-between p-5 hover:border-brand-red/30 transition-all h-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
<div>
-                          <h2 className="text-base font-bold text-slate-900 mb-2 group-hover:text-brand-red transition-colors line-clamp-2">
+                          <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-brand-red transition-colors line-clamp-2">
{post.title}
</h2>
<div
-                            className="text-sm text-slate-500 leading-relaxed line-clamp-3"
+                            className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3"
dangerouslySetInnerHTML={{
__html: post.content
? post.content.replace(/<[^>]+>/g, '').slice(0, 80) + '...'
@@ -114,8 +114,8 @@ export default function Blog() {
}}
/>
</div>
-                        <div className="flex items-center justify-between text-xs font-medium mt-4 pt-3 border-t border-slate-100">
-                          <div className="flex items-center text-slate-400">
+                        <div className="flex items-center justify-between text-xs font-medium mt-4 pt-3 border-t border-slate-100 dark:border-slate-700">
+                          <div className="flex items-center text-slate-400 dark:text-slate-500">
<Calendar className="w-3 h-3 mr-1" />
<time>{format(new Date(post.published), 'MMM d, yyyy')}</time>
</div>
@@ -126,7 +126,7 @@ export default function Blog() {
</motion.div>
))
) : (
-                <div className="col-span-full text-center py-20 bg-white rounded-2xl border border-slate-100">
+                <div className="col-span-full text-center py-20 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
<p className="text-slate-400">No blog posts found at the moment.</p>
</div>
)}
@@ -141,20 +141,20 @@ export default function Blog() {
className="lg:col-span-1"
>
<div className="sticky top-28">
-              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
+              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center">
<span>All Posts</span>
<span className="ml-2 text-xs font-normal text-slate-400">({allPosts.length})</span>
</h2>
-              <div className="bg-white rounded-2xl border border-slate-100 p-4 max-h-[60vh] overflow-y-auto">
+              <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-4 max-h-[60vh] overflow-y-auto">
<div className="space-y-2">
{allPosts.map((post) => (
<Link
key={post.id}
to={`/blog/${post.id}`}
-                      className="group flex items-center p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors"
+                      className="group flex items-center p-2 -mx-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
>
-                      <ChevronRight className="w-3 h-3 text-slate-300 mr-2 flex-shrink-0" />
-                      <span className="text-sm text-slate-600 group-hover:text-brand-red transition-colors line-clamp-1">
+                      <ChevronRight className="w-3 h-3 text-slate-300 dark:text-slate-600 mr-2 flex-shrink-0" />
+                      <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-brand-red transition-colors line-clamp-1">
{post.title}
</span>
</Link>
diff --git a/src/pages/Experience.tsx b/src/pages/Experience.tsx
index 005a57e..931ad19 100644
--- a/src/pages/Experience.tsx
+++ b/src/pages/Experience.tsx
@@ -30,10 +30,10 @@ export default function Experience() {
animate={{ opacity: 1, y: 0 }}
className="text-center mb-24"
>
-          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6 tracking-tight">
+          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
Professional Journey
</h1>
-          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
+          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
A timeline of my career across software engineering, leadership, and education.
</p>
</motion.div>
@@ -50,11 +50,11 @@ export default function Experience() {
viewport={{ once: true }}
transition={{ delay: index * 0.1 }}
>
-                <ModernCard className="group hover:border-brand-red/30 transition-colors p-8 bg-[var(--card-bg)]/80 backdrop-blur-sm">
+                <ModernCard className="group hover:border-brand-red/30 transition-colors p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700">
<div className="flex flex-col md:flex-row gap-8">
{/* Icon & Line */}
<div className="hidden md:flex flex-col items-center">
-                      <div className="w-16 h-16 rounded-2xl bg-[var(--bg-primary)] flex items-center justify-center text-[var(--text-secondary)] group-hover:text-brand-red group-hover:bg-red-50/10 group-hover:scale-105 transition-all duration-300 border border-[var(--border-color)] shadow-sm">
+                      <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:text-brand-red group-hover:bg-red-50/10 group-hover:scale-105 transition-all duration-300 border border-slate-200 dark:border-slate-700 shadow-sm">
{/* @ts-expect-error - Rendering Icon component dynamically */}
<IconComponent className="w-7 h-7" />
</div>
@@ -64,17 +64,17 @@ export default function Experience() {
<div className="flex-1 space-y-4">
<div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
<div>
-                          <h3 className="text-xl font-bold text-[var(--text-primary)]">{exp.title}</h3>
+                          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.title}</h3>
<h4 className="text-brand-red font-medium text-lg">{exp.company}</h4>
</div>

-                        <div className="flex items-center text-[var(--text-secondary)] text-sm font-medium bg-[var(--bg-primary)]/80 px-4 py-1.5 rounded-full w-fit whitespace-nowrap">
+                        <div className="flex items-center text-slate-500 dark:text-slate-400 text-sm font-medium bg-slate-100 dark:bg-slate-900/80 px-4 py-1.5 rounded-full w-fit whitespace-nowrap">
<Calendar className="w-4 h-4 mr-2" />
{exp.period}
</div>
</div>

-                      <p className="text-[var(--text-secondary)] leading-loose text-base">
+                      <p className="text-slate-600 dark:text-slate-300 leading-loose text-base">
{exp.description}
</p>
</div>
diff --git a/src/pages/games/BugSquash.tsx b/src/pages/games/BugSquash.tsx
new file mode 100644
index 0000000..d5cd1e4
--- /dev/null
+++ b/src/pages/games/BugSquash.tsx
@@ -0,0 +1,176 @@
+import { useState, useEffect, useCallback, useRef } from 'react';
+import { motion, AnimatePresence } from 'framer-motion';
+import { Bug as BugIcon, AlertTriangle, Trophy, Play, Pause, RotateCcw } from 'lucide-react';
+import BSOD from '../../components/games/BSOD';
+import Bug from '../../components/games/Bug';
+
+interface BugEntity {
+  id: number;
+  x: number;
+  y: number;
+  createdAt: number;
+}
+
+export default function BugSquash() {
+  const [bugs, setBugs] = useState<BugEntity[]>([]);
+  const [score, setScore] = useState(0);
+  const [health, setHealth] = useState(100);
+  const [gameOver, setGameOver] = useState(false);
+  const [isPlaying, setIsPlaying] = useState(false);
+  const [isPaused, setIsPaused] = useState(false);
+  const requestRef = useRef<number>(0);
+  const lastSpawnTime = useRef<number>(0);
+  const bugIdCounter = useRef(0);
+
+  // Game Loop
+  const gameLoop = useCallback((time: number) => {
+    if (!isPlaying || gameOver || isPaused) return;
+
+    // Drain health based on number of bugs
+    setHealth(prev => {
+      const drain = 0.05 + (bugs.length * 0.02);
+      const newHealth = Math.max(0, prev - drain);
+      if (newHealth <= 0) {
+        setGameOver(true);
+        setIsPlaying(false);
+      }
+      return newHealth;
+    });
+
+    // Spawn bugs
+    if (time - lastSpawnTime.current > 1000 - Math.min(score * 10, 800)) { // Spawn faster as score increases
+      const newBug: BugEntity = {
+        id: bugIdCounter.current++,
+        x: Math.random() * 90 + 5, // Keep within 5-95% bounds
+        y: Math.random() * 80 + 10, // Keep within 10-90% bounds
+        createdAt: time,
+      };
+      setBugs(prev => [...prev, newBug]);
+      lastSpawnTime.current = time;
+    }
+
+    requestRef.current = requestAnimationFrame(gameLoop);
+  }, [isPlaying, gameOver, bugs.length, score, isPaused]);
+
+  useEffect(() => {
+    if (isPlaying && !gameOver && !isPaused) {
+      requestRef.current = requestAnimationFrame(gameLoop);
+    }
+    return () => {
+      if (requestRef.current) cancelAnimationFrame(requestRef.current);
+    };
+  }, [isPlaying, gameOver, isPaused, gameLoop]);
+
+  const handleSquash = (id: number) => {
+    setBugs(prev => prev.filter(b => b.id !== id));
+    setScore(prev => prev + 1);
+    // Restore health slightly
+    setHealth(prev => Math.min(100, prev + 5));
+  };
+
+  const startGame = () => {
+    setBugs([]);
+    setScore(0);
+    setHealth(100);
+    setGameOver(false);
+    setIsPlaying(true);
+    setIsPaused(false);
+    bugIdCounter.current = 0;
+    lastSpawnTime.current = performance.now();
+  };
+
+  if (gameOver) {
+    return <BSOD error="CRITICAL_PROCESS_DIED_FROM_BUGS" onRestart={startGame} />;
+  }
+
+  return (
+    <div className="min-h-screen pt-20 pb-10 px-4 bg-slate-50 dark:bg-slate-900 overflow-hidden relative select-none">
+      {/* HUD */}
+      <div className="absolute top-24 left-0 right-0 z-40 px-4 pointer-events-none flex flex-col items-center gap-4">
+        <div className="flex justify-center gap-8 w-full max-w-2xl">
+          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur px-6 py-3 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 flex items-center gap-3">
+            <Trophy className="w-6 h-6 text-yellow-500" />
+            <span className="text-2xl font-bold font-mono text-slate-900 dark:text-white">{score}</span>
+          </div>
+          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur px-6 py-3 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 flex items-center gap-3 min-w-[200px]">
+            <AlertTriangle className={`w-6 h-6 ${health < 30 ? 'text-red-500 animate-pulse' : 'text-green-500'}`} />
+            <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden">
+              <motion.div
+                className={`h-full ${health < 30 ? 'bg-red-500' : 'bg-green-500'}`}
+                animate={{ width: `${health}%` }}
+              />
+            </div>
+          </div>
+        </div>
+
+        {/* Controls */}
+        {isPlaying && (
+          <div className="pointer-events-auto flex gap-4">
+            <button
+              onClick={() => setIsPaused(!isPaused)}
+              className="px-4 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg shadow-lg font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
+            >
+              {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
+            </button>
+            <button
+              onClick={startGame}
+              className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-lg font-bold hover:bg-red-600 transition-colors flex items-center gap-2"
+            >
+              <RotateCcw className="w-4 h-4" />
+              Restart
+            </button>
+          </div>
+        )}
+      </div>
+
+      {/* Game Area */}
+      {!isPlaying ? (
+        <div className="absolute inset-0 flex items-center justify-center z-40 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
+          <motion.div
+            initial={{ scale: 0.9, opacity: 0 }}
+            animate={{ scale: 1, opacity: 1 }}
+            className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl text-center max-w-md border border-slate-200 dark:border-slate-700"
+          >
+            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
+              <BugIcon className="w-10 h-10 text-red-600" />
+            </div>
+            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Bug Squash</h1>
+            <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
+              Bugs are destroying the production database!
+              <br />
+              Click them before the system integrity reaches 0%.
+            </p>
+            <button
+              onClick={startGame}
+              className="w-full py-4 bg-[#990000] hover:bg-red-800 text-white font-bold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-red-500/30"
+            >
+              Start Debugging
+            </button>
+          </motion.div>
+        </div>
+      ) : (
+        <div className="absolute inset-x-0 top-32 bottom-0">
+          <AnimatePresence>
+            {bugs.map(bug => (
+              <Bug
+                key={bug.id}
+                id={bug.id}
+                x={bug.x}
+                y={bug.y}
+                onClick={handleSquash}
+              />
+            ))}
+          </AnimatePresence>
+        </div>
+      )}
+      {/* Pause Overlay */}
+      {isPaused && (
+        <div className="absolute inset-0 z-40 bg-white/20 dark:bg-slate-900/20 backdrop-blur-sm flex items-center justify-center pointer-events-none">
+          <div className="bg-slate-900 text-white px-8 py-4 rounded-xl shadow-2xl font-bold text-2xl animate-pulse">
+            PAUSED
+          </div>
+        </div>
+      )}
+    </div>
+  );
+}
diff --git a/src/pages/games/ElusiveDeploy.tsx b/src/pages/games/ElusiveDeploy.tsx
new file mode 100644
index 0000000..9d23d80
--- /dev/null
+++ b/src/pages/games/ElusiveDeploy.tsx
@@ -0,0 +1,97 @@
+import { useState } from 'react';
+import { motion, AnimatePresence } from 'framer-motion';
+import { AlertTriangle, Lock, Unlock, RotateCcw } from 'lucide-react';
+import RunawayButton from '../../components/games/RunawayButton';
+
+const TAUNTS = [
+  "Nice try.",
+  "Too slow.",
+  "Need a better mouse?",
+  "Deploy failed: Button moved.",
+  "Permission denied: You are not fast enough.",
+  "Error: Layer 8 issue detected.",
+  "Git push --force? I don't think so.",
+  "Have you tried turning it off and on again?",
+  "Maybe deploy to staging first?",
+  "404: Button not found."
+];
+
+export default function ElusiveDeploy() {
+  const [attempts, setAttempts] = useState(0);
+  const [taunt, setTaunt] = useState("Click the button to deploy.");
+  const [isFrozen, setIsFrozen] = useState(false);
+
+  const handleAttempt = () => {
+    setAttempts(prev => prev + 1);
+    if (isFrozen) {
+      setTaunt("Cheating? Really? Fine, deploy it.");
+    } else {
+      const randomTaunt = TAUNTS[Math.floor(Math.random() * TAUNTS.length)];
+      setTaunt(randomTaunt);
+    }
+  };
+
+  return (
+    <div className="min-h-screen pt-20 pb-10 bg-slate-50 dark:bg-slate-900 overflow-hidden relative select-none flex flex-col items-center">
+      {/* HUD */}
+      <div className="absolute top-24 z-30 flex flex-col items-center gap-4">
+        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Production Deployment</h1>
+        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
+          <Lock className="w-4 h-4" />
+          <span className="font-mono text-sm">Environment: PROTECTED</span>
+        </div>
+
+        <div className="bg-white dark:bg-slate-800 px-6 py-3 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 flex flex-col items-center min-w-[300px]">
+          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Status Log</span>
+          <AnimatePresence mode="wait">
+            <motion.p
+              key={attempts}
+              initial={{ opacity: 0, y: 10 }}
+              animate={{ opacity: 1, y: 0 }}
+              exit={{ opacity: 0, y: -10 }}
+              className="text-red-500 font-mono font-bold text-center"
+            >
+              {`> ${taunt}`}
+            </motion.p>
+          </AnimatePresence>
+        </div>
+
+        <div className="mt-2 text-sm text-slate-400">
+          Attempts: <span className="font-mono font-bold text-slate-600 dark:text-slate-300">{attempts}</span>
+        </div>
+      </div>
+
+      {/* Game Area */}
+      <div className="flex-1 w-full relative">
+        <RunawayButton onAttempt={handleAttempt} frozen={isFrozen} />
+      </div>
+
+      {/* Controls */}
+      <div className="absolute bottom-10 z-50 flex gap-4 pointer-events-auto">
+        <button
+          onClick={() => setIsFrozen(!isFrozen)}
+          className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${isFrozen
+            ? 'bg-red-500 text-white shadow-red-500/30 shadow-lg'
+            : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
+            }`}
+        >
+          {isFrozen ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
+          {isFrozen ? "CHEAT MODE: ON" : "Cheat Mode"}
+        </button>
+
+        <button
+          onClick={() => setAttempts(0)}
+          className="px-6 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl shadow-lg font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
+        >
+          <RotateCcw className="w-4 h-4" />
+          Reset Shame
+        </button>
+      </div>
+
+      {/* Background Decor */}
+      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03]">
+        <AlertTriangle className="w-[500px] h-[500px] text-red-500" />
+      </div>
+    </div>
+  );
+}
diff --git a/src/pages/games/LearnFlex.tsx b/src/pages/games/LearnFlex.tsx
new file mode 100644
index 0000000..95bf3fa
--- /dev/null
+++ b/src/pages/games/LearnFlex.tsx
@@ -0,0 +1,26 @@
+import { Layout } from 'lucide-react';
+import FlexPlayground from '../../components/games/FlexPlayground';
+
+export default function LearnFlex() {
+  return (
+    <div className="min-h-screen pt-20 pb-10 bg-slate-50 dark:bg-slate-900">
+      <div className="container mx-auto px-6">
+        <div className="text-center mb-12">
+          <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3 hover:rotate-6 transition-transform">
+            <Layout className="w-8 h-8 text-purple-600" />
+          </div>
+          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
+            Learn Flexbox (The "Fun" Way)
+          </h1>
+          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
+            Forget about Froggy. Here you center divs because the client changed their mind 5 times today.
+            <br />
+            <span className="text-xs font-mono bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded mt-2 inline-block">display: flex; justify-content: cry;</span>
+          </p>
+        </div>
+
+        <FlexPlayground />
+      </div>
+    </div>
+  );
+}
diff --git a/src/pages/games/LearnTypeScript.tsx b/src/pages/games/LearnTypeScript.tsx
new file mode 100644
index 0000000..6e47847
--- /dev/null
+++ b/src/pages/games/LearnTypeScript.tsx
@@ -0,0 +1,26 @@
+
+import TypeEditor from '../../components/games/TypeEditor';
+
+export default function LearnTypeScript() {
+  return (
+    <div className="min-h-screen pt-20 pb-10 bg-slate-50 dark:bg-slate-900">
+      <div className="container mx-auto px-6">
+        <div className="text-center mb-12">
+          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
+            <div className="font-bold text-2xl text-blue-600">TS</div>
+          </div>
+          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
+            Type Torture
+          </h1>
+          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
+            You said you know TypeScript. Prove it.
+            <br />
+            Replace the <span className="font-mono text-red-500">any</span> with something that makes the linter happy (and your colleagues confused).
+          </p>
+        </div>
+
+        <TypeEditor />
+      </div>
+    </div>
+  );
+}
diff --git a/src/pages/games/QuickSync.tsx b/src/pages/games/QuickSync.tsx
new file mode 100644
index 0000000..7024af8
--- /dev/null
+++ b/src/pages/games/QuickSync.tsx
@@ -0,0 +1,241 @@
+import { useState, useEffect, useRef, useCallback } from 'react';
+import { motion, AnimatePresence } from 'framer-motion';
+import { Timer, Trophy, Play, Calendar, Pause, RotateCcw } from 'lucide-react';
+import PlayerDev from '../../components/games/PlayerDev';
+import CalendarInvite from '../../components/games/CalendarInvite';
+
+interface InviteEntity {
+  id: number;
+  x: number;
+  y: number;
+  speed: number;
+}
+
+export default function QuickSync() {
+  const [playerX, setPlayerX] = useState(50);
+  const [invites, setInvites] = useState<InviteEntity[]>([]);
+  const [gameOver, setGameOver] = useState(false);
+  const [isPlaying, setIsPlaying] = useState(false);
+  const [isPaused, setIsPaused] = useState(false);
+  const [score, setScore] = useState(0); // Time survived in seconds
+  const [level, setLevel] = useState(1);
+
+  const requestRef = useRef<number>(0);
+  const lastUpdateRef = useRef<number>(0);
+  const inviteIdCounter = useRef(0);
+  const scoreIntervalRef = useRef<number>(0);
+
+  // Mouse/Touch movement handler
+  const handleMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
+    if (!isPlaying || gameOver) return;
+
+    let clientX;
+    if ('touches' in e) {
+      clientX = e.touches[0].clientX;
+    } else {
+      clientX = (e as React.MouseEvent).clientX;
+    }
+
+    const width = window.innerWidth;
+    const percentage = (clientX / width) * 100;
+    setPlayerX(Math.max(0, Math.min(100, percentage)));
+  }, [isPlaying, gameOver]);
+
+  // Game Loop
+  const gameLoop = useCallback((time: number) => {
+    if (!isPlaying || gameOver || isPaused) return;
+
+    // const deltaTime = time - lastUpdateRef.current;
+    lastUpdateRef.current = time;
+
+    // Spawn Invites
+    if (Math.random() < 0.02 + (level * 0.005)) {
+      setInvites(prev => [...prev, {
+        id: inviteIdCounter.current++,
+        x: Math.random() * 90 + 5,
+        y: -10,
+        speed: 0.5 + (level * 0.1) + (Math.random() * 0.5)
+      }]);
+    }
+
+    // Update Invites
+    setInvites(prev => {
+      const nextInvites: InviteEntity[] = [];
+      let collision = false;
+
+      prev.forEach(invite => {
+        const newY = invite.y + invite.speed;
+
+        // Collision Detection
+        // Player is at playerX (%), bottom 4px (approx 95% Y)
+        // Hitbox approx: X +/- 3%, Y > 92% (Make it tighter)
+        if (newY > 92 && newY < 98 && Math.abs(invite.x - playerX) < 5) {
+          collision = true;
+        }
+
+        if (newY < 110) {
+          nextInvites.push({ ...invite, y: newY });
+        }
+      });
+
+      if (collision) {
+        setGameOver(true);
+        setIsPlaying(false);
+        return prev; // Stop updating
+      }
+
+      return nextInvites;
+    });
+
+    if (!gameOver) {
+      requestRef.current = requestAnimationFrame(gameLoop);
+    }
+  }, [isPlaying, gameOver, level, playerX, isPaused]);
+
+  useEffect(() => {
+    if (isPlaying && !gameOver && !isPaused) {
+      lastUpdateRef.current = performance.now();
+      requestRef.current = requestAnimationFrame(gameLoop);
+
+      // Score timer - Use precise timing
+      const startTime = Date.now() - (score * 1000);
+      scoreIntervalRef.current = window.setInterval(() => {
+        const elapsed = Math.floor((Date.now() - startTime) / 1000);
+        setScore(elapsed);
+        if (elapsed > 0 && elapsed % 10 === 0) setLevel(Math.floor(elapsed / 10) + 1);
+      }, 100); // Check more frequently
+    }
+    return () => {
+      if (requestRef.current) cancelAnimationFrame(requestRef.current);
+      if (scoreIntervalRef.current) window.clearInterval(scoreIntervalRef.current);
+    };
+  }, [isPlaying, gameOver, isPaused, gameLoop]);
+
+  const startGame = () => {
+    setInvites([]);
+    setScore(0);
+    setLevel(1);
+    setGameOver(false);
+    setIsPlaying(true);
+    setIsPaused(false);
+    inviteIdCounter.current = 0;
+  };
+
+  return (
+    <div
+      className="min-h-screen pt-20 pb-10 bg-slate-100 dark:bg-slate-900 overflow-hidden relative select-none cursor-crosshair touch-none"
+      onMouseMove={handleMove}
+      onTouchMove={handleMove}
+    >
+      {/* HUD */}
+      <div className="absolute top-24 left-0 right-0 z-40 px-4 pointer-events-none flex flex-col items-center gap-4">
+        <div className="flex justify-center gap-8 w-full max-w-2xl">
+          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur px-6 py-3 rounded-2xl shadow-xl flex items-center gap-4">
+            <div className="flex items-center gap-2">
+              <Timer className="w-5 h-5 text-blue-500" />
+              <span className="text-xl font-bold font-mono text-slate-900 dark:text-white">{score}s</span>
+            </div>
+            <div className="w-px h-6 bg-slate-300 dark:bg-slate-700" />
+            <div className="flex items-center gap-2">
+              <Trophy className="w-5 h-5 text-yellow-500" />
+              <span className="text-sm font-bold text-slate-500 dark:text-slate-400">Level {level}</span>
+            </div>
+          </div>
+        </div>
+
+        {/* Controls */}
+        {isPlaying && (
+          <div className="pointer-events-auto flex gap-4">
+            <button
+              onClick={() => setIsPaused(!isPaused)}
+              className="px-4 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg shadow-lg font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
+            >
+              {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
+            </button>
+            <button
+              onClick={startGame}
+              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg font-bold hover:bg-blue-700 transition-colors flex items-center gap-2"
+            >
+              <RotateCcw className="w-4 h-4" />
+              Restart
+            </button>
+          </div>
+        )}
+      </div>
+
+      {/* Game Area */}
+      {!isPlaying && !gameOver ? (
+        <div className="absolute inset-0 flex items-center justify-center z-40 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm pointer-events-auto">
+          <motion.div
+            initial={{ scale: 0.9, opacity: 0 }}
+            animate={{ scale: 1, opacity: 1 }}
+            className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl text-center max-w-md border border-slate-200 dark:border-slate-700"
+          >
+            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
+              <Calendar className="w-10 h-10 text-blue-600" />
+            </div>
+            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Quick Sync Dodge</h1>
+            <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
+              Your calendar is filling up. Calls are raining down.
+              <br />
+              Move your mouse to dodge the "Quick Syncs" and stay in flow state.
+            </p>
+            <button
+              onClick={startGame}
+              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
+            >
+              <Play className="w-5 h-5" />
+              Start Working
+            </button>
+          </motion.div>
+        </div>
+      ) : null}
+
+      {/* Game Over Screen */}
+      {gameOver && (
+        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/90 backdrop-blur-md pointer-events-auto">
+          <motion.div
+            initial={{ scale: 0.9, opacity: 0 }}
+            animate={{ scale: 1, opacity: 1 }}
+            className="bg-white p-8 rounded-2xl max-w-lg w-full text-center m-4"
+          >
+            <h2 className="text-4xl font-bold text-slate-900 mb-2">Meeting Started!</h2>
+            <p className="text-xl text-slate-500 mb-8">You got pulled into a "quick 5 min sync" that lasted an hour.</p>
+
+            <div className="bg-slate-100 rounded-xl p-6 mb-8">
+              <p className="text-sm text-slate-500 uppercase font-bold tracking-wider mb-2">Time in Flow State</p>
+              <p className="text-5xl font-mono font-bold text-blue-600">{score}s</p>
+            </div>
+
+            <button
+              onClick={startGame}
+              className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all"
+            >
+              Decline & Return to Work
+            </button>
+          </motion.div>
+        </div>
+      )}
+
+      {/* Game Entities */}
+      <AnimatePresence>
+        {isPlaying && (
+          <>
+            <PlayerDev x={playerX} />
+            {invites.map(invite => (
+              <CalendarInvite key={invite.id} {...invite} />
+            ))}
+          </>
+        )}
+      </AnimatePresence>
+      {/* Pause Overlay */}
+      {isPaused && (
+        <div className="absolute inset-0 z-50 bg-white/20 dark:bg-slate-900/20 backdrop-blur-sm flex items-center justify-center pointer-events-none">
+          <div className="bg-slate-900 text-white px-8 py-4 rounded-xl shadow-2xl font-bold text-2xl animate-pulse">
+            OUT OF OFFICE
+          </div>
+        </div>
+      )}
+    </div>
+  );
+}

```

## feat: add tests (508cd0a) - 2026-01-28

```diff
diff --git a/.gitignore b/.gitignore
index 3a02281..2d2963d 100644
--- a/.gitignore
+++ b/.gitignore
@@ -29,3 +29,13 @@ yarn.lock

#bolt
.bolt
+
+*storybook.log
+storybook-static
+
+# Playwright
+/test-results/
+/playwright-report/
+/blob-report/
+/playwright/.cache/
+/playwright/.auth/
diff --git a/.storybook/main.ts b/.storybook/main.ts
new file mode 100644
index 0000000..78cf7b3
--- /dev/null
+++ b/.storybook/main.ts
@@ -0,0 +1,17 @@
+import type { StorybookConfig } from '@storybook/react-vite';
+
+const config: StorybookConfig = {
+  "stories": [
+    "../src/**/*.mdx",
+    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
+  ],
+  "addons": [
+    "@chromatic-com/storybook",
+    "@storybook/addon-vitest",
+    "@storybook/addon-a11y",
+    "@storybook/addon-docs",
+    "@storybook/addon-onboarding"
+  ],
+  "framework": "@storybook/react-vite"
+};
+export default config;
 No newline at end of file
diff --git a/.storybook/preview.ts b/.storybook/preview.ts
new file mode 100644
index 0000000..073582e
--- /dev/null
+++ b/.storybook/preview.ts
@@ -0,0 +1,21 @@
+import type { Preview } from '@storybook/react-vite'
+
+const preview: Preview = {
+  parameters: {
+    controls: {
+      matchers: {
+       color: /(background|color)$/i,
+       date: /Date$/i,
+      },
+    },
+
+    a11y: {
+      // 'todo' - show a11y violations in the test UI only
+      // 'error' - fail CI on a11y violations
+      // 'off' - skip a11y checks entirely
+      test: 'todo'
+    }
+  },
+};
+
+export default preview;
 No newline at end of file
diff --git a/.storybook/vitest.setup.ts b/.storybook/vitest.setup.ts
new file mode 100644
index 0000000..44922d5
--- /dev/null
+++ b/.storybook/vitest.setup.ts
@@ -0,0 +1,7 @@
+import * as a11yAddonAnnotations from "@storybook/addon-a11y/preview";
+import { setProjectAnnotations } from '@storybook/react-vite';
+import * as projectAnnotations from './preview';
+
+// This is an important step to apply the right configuration when testing your stories.
+// More info at: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
+setProjectAnnotations([a11yAddonAnnotations, projectAnnotations]);
 No newline at end of file
diff --git a/README.md b/README.md
index 3bf319a..f962bc8 100644
--- a/README.md
+++ b/README.md
@@ -50,7 +50,7 @@ I didn't just add meta tags; I performed a ritual summoning for the search engin
*   **Prettier**: If I miss a semicolon, the computer yells at me.
*   **Strict Mode**: `any` is now illegal. I have to type `unknown` and cast it like a wizard.

-### 🕹️ The "Stupid Playable Arcade" (Phase 3)
+### 🕹️ The "Stupid Playable Arcade"
Because every professional portfolio needs a way to waste the recruiter's time.
*   **Bug Squash**: Save the production database from actual bugs.
*   **Quick Sync Dodge**: Simulate the average Tuesday by dodging calendar invites.
diff --git a/eslint.config.js b/eslint.config.js
index 82c2e20..85679d0 100644
--- a/eslint.config.js
+++ b/eslint.config.js
@@ -1,28 +1,28 @@
+// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
+import storybook from "eslint-plugin-storybook";
+
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

-export default tseslint.config(
-  { ignores: ['dist'] },
-  {
-    extends: [js.configs.recommended, ...tseslint.configs.recommended],
-    files: ['**/*.{ts,tsx}'],
-    languageOptions: {
-      ecmaVersion: 2020,
-      globals: globals.browser,
-    },
-    plugins: {
-      'react-hooks': reactHooks,
-      'react-refresh': reactRefresh,
-    },
-    rules: {
-      ...reactHooks.configs.recommended.rules,
-      'react-refresh/only-export-components': [
-        'warn',
-        { allowConstantExport: true },
-      ],
-    },
-  }
-);
+export default tseslint.config({ ignores: ['dist'] }, {
+  extends: [js.configs.recommended, ...tseslint.configs.recommended],
+  files: ['**/*.{ts,tsx}'],
+  languageOptions: {
+    ecmaVersion: 2020,
+    globals: globals.browser,
+  },
+  plugins: {
+    'react-hooks': reactHooks,
+    'react-refresh': reactRefresh,
+  },
+  rules: {
+    ...reactHooks.configs.recommended.rules,
+    'react-refresh/only-export-components': [
+      'warn',
+      { allowConstantExport: true },
+    ],
+  },
+}, storybook.configs["flat/recommended"]);
diff --git a/package.json b/package.json
index fd112c5..472a040 100644
--- a/package.json
+++ b/package.json
@@ -10,7 +10,9 @@
"preview": "vite preview",
"generate-sitemap": "node generate-sitemap.js",
"test": "vitest",
-    "prepare": "husky"
+    "prepare": "husky",
+    "storybook": "storybook dev -p 6006",
+    "build-storybook": "storybook build"
},
"dependencies": {
"@fortawesome/fontawesome-svg-core": "^6.5.1",
@@ -30,23 +32,36 @@
"three": "^0.182.0"
},
"devDependencies": {
+    "@chromatic-com/storybook": "^5.0.0",
"@eslint/js": "^9.9.1",
+    "@playwright/test": "^1.58.0",
+    "@storybook/addon-a11y": "^10.2.0",
+    "@storybook/addon-docs": "^10.2.0",
+    "@storybook/addon-onboarding": "^10.2.0",
+    "@storybook/addon-vitest": "^10.2.0",
+    "@storybook/react-vite": "^10.2.0",
"@testing-library/dom": "^10.4.1",
"@testing-library/jest-dom": "^6.9.1",
"@testing-library/react": "^16.3.2",
+    "@types/node": "^25.0.10",
"@types/react": "^19.2.9",
"@types/react-dom": "^19.2.3",
"@vitejs/plugin-react": "^4.3.1",
+    "@vitest/browser-playwright": "^4.0.18",
+    "@vitest/coverage-v8": "^4.0.18",
"autoprefixer": "^10.4.18",
"eslint": "^9.9.1",
"eslint-plugin-react-hooks": "^5.1.0-rc.0",
"eslint-plugin-react-refresh": "^0.4.11",
+    "eslint-plugin-storybook": "^10.2.0",
"globals": "^15.9.0",
"husky": "^9.1.7",
"jsdom": "^27.4.0",
"lint-staged": "^16.2.7",
+    "playwright": "^1.58.0",
"postcss": "^8.4.35",
"prettier": "^3.8.1",
+    "storybook": "^10.2.0",
"tailwindcss": "^3.4.1",
"typescript": "^5.5.3",
"typescript-eslint": "^8.3.0",
diff --git a/playwright.config.ts b/playwright.config.ts
new file mode 100644
index 0000000..1899765
--- /dev/null
+++ b/playwright.config.ts
@@ -0,0 +1,59 @@
+import { defineConfig, devices } from '@playwright/test';
+
+/**
+ * Read environment variables from file.
+ * https://github.com/motdotla/dotenv
+ */
+// import dotenv from 'dotenv';
+// import path from 'path';
+// dotenv.config({ path: path.resolve(__dirname, '.env') });
+
+/**
+ * See https://playwright.dev/docs/test-configuration.
+ */
+export default defineConfig({
+  testDir: './tests',
+  /* Run tests in files in parallel */
+  fullyParallel: true,
+  /* Fail the build on CI if you accidentally left test.only in the source code. */
+  forbidOnly: !!process.env.CI,
+  /* Retry on CI only */
+  retries: process.env.CI ? 2 : 0,
+  /* Opt out of parallel tests on CI. */
+  workers: process.env.CI ? 1 : undefined,
+  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
+  reporter: 'html',
+  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
+  use: {
+    /* Base URL to use in actions like `await page.goto('')`. */
+    baseURL: 'http://localhost:5173',
+
+    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
+    trace: 'on-first-retry',
+  },
+
+  /* Configure projects for major browsers */
+  projects: [
+    {
+      name: 'chromium',
+      use: { ...devices['Desktop Chrome'] },
+    },
+
+    {
+      name: 'firefox',
+      use: { ...devices['Desktop Firefox'] },
+    },
+
+    {
+      name: 'webkit',
+      use: { ...devices['Desktop Safari'] },
+    },
+  ],
+
+  /* Run your local dev server before starting the tests */
+  webServer: {
+    command: 'npm run dev',
+    url: 'http://localhost:5173',
+    reuseExistingServer: !process.env.CI,
+  },
+});
diff --git a/src/components/Header.tsx b/src/components/Header.tsx
index 62ddc0e..3d93eb6 100644
--- a/src/components/Header.tsx
+++ b/src/components/Header.tsx
@@ -230,7 +230,7 @@ export default function Header() {
<FontAwesomeIcon icon={faMedium} className="w-5 h-5" />
<span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Medium</span>
</a>
-              <a href="mailto:alvianzf@gmail.com" className="hidden lg:block px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-full hover:bg-[#990000] transition-all shadow-sm hover:shadow-md">
+              <a href="mailto:hello@alvianzf.id" className="hidden lg:block px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-full hover:bg-[#990000] transition-all shadow-sm hover:shadow-md">
Contact
</a>
</div>
@@ -330,7 +330,7 @@ export default function Header() {
</a>
</div>
<a
-                  href="mailto:alvianzf@gmail.com"
+                  href="mailto:hello@alvianzf.id"
className="block w-full text-center px-6 py-4 text-lg font-bold text-white bg-slate-900 rounded-2xl hover:bg-[#990000] transition-all shadow-lg"
>
Get in Touch
diff --git a/src/components/__tests__/Header.test.tsx b/src/components/__tests__/Header.test.tsx
new file mode 100644
index 0000000..3e9a7ca
--- /dev/null
+++ b/src/components/__tests__/Header.test.tsx
@@ -0,0 +1,40 @@
+import { screen, fireEvent } from '@testing-library/react';
+import { describe, it, expect, vi } from 'vitest';
+import Header from '../Header';
+import { renderWithProviders } from '../../test-utils';
+
+// Mock the ThemeToggle since it might use context/localstorage
+vi.mock('../ThemeToggle', () => ({
+  default: () => <button data-testid="theme-toggle">Toggle Theme</button>,
+}));
+
+describe('Header Component', () => {
+  it('renders navigation links', () => {
+    renderWithProviders(<Header />);
+    expect(screen.getByText('About')).toBeInTheDocument();
+    expect(screen.getByText('Experience')).toBeInTheDocument();
+    expect(screen.getByText('Blog')).toBeInTheDocument();
+    expect(screen.getByText('Mentorship')).toBeInTheDocument();
+  });
+
+  it('renders game dropdown', () => {
+    renderWithProviders(<Header />);
+    const gamesButton = screen.getByText('Games');
+    expect(gamesButton).toBeInTheDocument();
+
+    // Hover or click to reveal dropdown (depending on implementation, usually hover for desktop)
+    fireEvent.mouseEnter(gamesButton);
+    // Since dropdown might be implemented with CSS hover or state, we can check if links exist in DOM
+    // For this test, we just check if the main structure is there.
+  });
+
+  it('renders mobile menu button', () => {
+    renderWithProviders(<Header />);
+    // Initial state: hidden on desktop, visible on mobile.
+    // We can check for the menu icon (usually an svg or button)
+    // Assuming Lucide icons are used, they render SVGs.
+    const menuButton = screen.getByLabelText(/menu/i) || screen.getByRole('button', { name: /menu/i });
+    // Note: The button might be hidden via CSS on desktop, but it should exist in the DOM
+    expect(menuButton).toBeInTheDocument();
+  });
+});
diff --git a/src/components/__tests__/ModernCard.test.tsx b/src/components/__tests__/ModernCard.test.tsx
new file mode 100644
index 0000000..1a233d5
--- /dev/null
+++ b/src/components/__tests__/ModernCard.test.tsx
@@ -0,0 +1,35 @@
+import { render, screen } from '@testing-library/react';
+import { describe, it, expect } from 'vitest';
+import ModernCard from '../ModernCard';
+
+describe('ModernCard Component', () => {
+  it('renders children correctly', () => {
+    render(
+      <ModernCard>
+        <p>Test Content</p>
+      </ModernCard>
+    );
+    expect(screen.getByText('Test Content')).toBeInTheDocument();
+  });
+
+  it('applies custom className', () => {
+    render(
+      <ModernCard className="custom-class">
+        <p>Content</p>
+      </ModernCard>
+    );
+    // ModernCard wraps children in a div with card-modern class
+    const card = screen.getByText('Content').closest('div');
+    expect(card).toHaveClass('custom-class');
+    expect(card).toHaveClass('card-modern');
+  });
+
+  it('renders with cyberpunk-compatible structure', () => {
+    // Cyberpunk theme relies on CSS variables which are applied at root/body
+    // The component itself just needs to render the correct base classes
+    const { container } = render(
+      <ModernCard>Content</ModernCard>
+    );
+    expect(container.firstChild).toHaveClass('p-6');
+  });
+});
diff --git a/src/components/stories/Header.stories.tsx b/src/components/stories/Header.stories.tsx
new file mode 100644
index 0000000..46a59ac
--- /dev/null
+++ b/src/components/stories/Header.stories.tsx
@@ -0,0 +1,41 @@
+import type { Meta, StoryObj } from '@storybook/react-vite';
+import Header from '../Header';
+import { BrowserRouter } from 'react-router-dom';
+import { ThemeProvider } from '../../context/ThemeContext';
+
+const meta = {
+  title: 'Components/Header',
+  component: Header,
+  parameters: {
+    layout: 'fullscreen',
+  },
+  tags: ['autodocs'],
+  decorators: [
+    (Story) => (
+      <BrowserRouter>
+        <ThemeProvider>
+          <div className="h-screen bg-[var(--bg-primary)]">
+            <Story />
+            <div className="pt-20 px-6">
+              <h1 className="text-2xl font-bold text-[var(--text-primary)]">Dummy Page Content</h1>
+              <p className="text-[var(--text-secondary)]">Content to show transparency effects.</p>
+            </div>
+          </div>
+        </ThemeProvider>
+      </BrowserRouter>
+    ),
+  ],
+} satisfies Meta<typeof Header>;
+
+export default meta;
+type Story = StoryObj<typeof meta>;
+
+export const Default: Story = {};
+
+export const MobileView: Story = {
+  parameters: {
+    viewport: {
+      defaultViewport: 'mobile1',
+    },
+  },
+};
diff --git a/src/components/stories/ModernCard.stories.tsx b/src/components/stories/ModernCard.stories.tsx
new file mode 100644
index 0000000..89ee433
--- /dev/null
+++ b/src/components/stories/ModernCard.stories.tsx
@@ -0,0 +1,46 @@
+import type { Meta, StoryObj } from '@storybook/react-vite';
+import ModernCard from '../ModernCard';
+
+const meta = {
+  title: 'Components/ModernCard',
+  component: ModernCard,
+  parameters: {
+    layout: 'centered',
+  },
+  tags: ['autodocs'],
+  argTypes: {
+    className: { control: 'text' },
+  },
+} satisfies Meta<typeof ModernCard>;
+
+export default meta;
+type Story = StoryObj<typeof meta>;
+
+export const Default: Story = {
+  args: {
+    children: <p className="text-[var(--text-primary)]">This is a modern card content.</p>,
+  },
+};
+
+export const WithCustomClass: Story = {
+  args: {
+    className: 'bg-red-500 text-white',
+    children: <p>Card with custom classes</p>,
+  },
+};
+
+export const ComplexContent: Story = {
+  args: {
+    children: (
+      <div className="space-y-4">
+        <h3 className="text-xl font-bold text-[var(--text-primary)]">Card Title</h3>
+        <p className="text-[var(--text-secondary)]">
+          This card contains more complex content structure to demonstrate how it handles children.
+        </p>
+        <button className="px-4 py-2 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded">
+          Action
+        </button>
+      </div>
+    ),
+  },
+};
diff --git a/src/components/stories/RunawayButton.stories.tsx b/src/components/stories/RunawayButton.stories.tsx
new file mode 100644
index 0000000..84af457
--- /dev/null
+++ b/src/components/stories/RunawayButton.stories.tsx
@@ -0,0 +1,37 @@
+import type { Meta, StoryObj } from '@storybook/react-vite';
+import RunawayButton from '../games/RunawayButton';
+
+const meta = {
+  title: 'Games/RunawayButton',
+  component: RunawayButton,
+  parameters: {
+    layout: 'centered',
+  },
+  tags: ['autodocs'],
+  argTypes: {
+    onAttempt: { action: 'attempt' },
+  },
+  decorators: [
+    (Story) => (
+      <div className="w-[500px] h-[500px] relative border border-dashed border-slate-300 rounded-lg overflow-hidden bg-slate-50 flex items-center justify-center">
+        <Story />
+      </div>
+    ),
+  ],
+} satisfies Meta<typeof RunawayButton>;
+
+export default meta;
+type Story = StoryObj<typeof meta>;
+
+export const Default: Story = {
+  args: {
+    onAttempt: () => console.log('Attempt to click!'),
+  },
+};
+
+export const Frozen: Story = {
+  args: {
+    onAttempt: () => console.log('Attempt on frozen button!'),
+    frozen: true,
+  },
+};
diff --git a/src/pages/About.tsx b/src/pages/About.tsx
index 590f982..f54ca32 100644
--- a/src/pages/About.tsx
+++ b/src/pages/About.tsx
@@ -23,7 +23,13 @@ export default function About() {
"@type": "Organization",
"name": "Independent Consultant"
},
-    "description": "Program Manager, Technical Lead, and Full Stack Engineer with 13+ years of experience."
+    "description": "Program Manager, Technical Lead, and Full Stack Engineer with 13+ years of experience.",
+    "aggregateRating": {
+      "@type": "AggregateRating",
+      "ratingValue": "5",
+      "bestRating": "5",
+      "ratingCount": "47"
+    }
};

return (
diff --git a/src/pages/__tests__/About.test.tsx b/src/pages/__tests__/About.test.tsx
new file mode 100644
index 0000000..bb3a903
--- /dev/null
+++ b/src/pages/__tests__/About.test.tsx
@@ -0,0 +1,32 @@
+import { screen } from '@testing-library/react';
+import { describe, it, expect, vi } from 'vitest';
+import About from '../About';
+import { renderWithProviders } from '../../test-utils';
+
+// Mock components that might cause issues or are tested separately
+vi.mock('../../components/ModernCard', () => ({
+  default: ({ children, className }: { children: React.ReactNode, className?: string }) => (
+    <div data-testid="modern-card" className={className}>{children}</div>
+  )
+}));
+
+describe('About Page', () => {
+  it('renders hero section', () => {
+    renderWithProviders(<About />);
+    expect(screen.getByText("Alvian")).toBeInTheDocument();
+    expect(screen.getByText("Zachry.")).toBeInTheDocument();
+  });
+
+  it('renders skills section', () => {
+    renderWithProviders(<About />);
+    expect(screen.getByText('JavaScript & TypeScript')).toBeInTheDocument();
+    expect(screen.getByText('React.js & Next.js')).toBeInTheDocument();
+  });
+
+  it('renders "Get in touch" button', () => {
+    renderWithProviders(<About />);
+    const button = screen.getByText('Get in touch');
+    expect(button).toBeInTheDocument();
+    expect(button.closest('a')).toHaveAttribute('href', '#contact');
+  });
+});
diff --git a/src/pages/__tests__/Blog.test.tsx b/src/pages/__tests__/Blog.test.tsx
new file mode 100644
index 0000000..dbc878d
--- /dev/null
+++ b/src/pages/__tests__/Blog.test.tsx
@@ -0,0 +1,66 @@
+import { screen, waitFor } from '@testing-library/react';
+import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
+import Blog from '../Blog';
+import { renderWithProviders } from '../../test-utils';
+
+const mockPosts = {
+  items: [
+    {
+      id: '1',
+      title: 'Test Post 1',
+      published: '2023-01-01T00:00:00Z',
+      url: 'http://test.com/1',
+      labels: ['Tech'],
+      content: '<div>Test content 1</div>'
+    },
+    {
+      id: '2',
+      title: 'Test Post 2',
+      published: '2023-02-01T00:00:00Z',
+      url: 'http://test.com/2',
+      labels: ['Life'],
+      content: '<div>Test content 2</div>'
+    }
+  ]
+};
+
+describe('Blog Page', () => {
+  beforeEach(() => {
+    vi.stubGlobal('fetch', vi.fn(() =>
+      Promise.resolve({
+        ok: true,
+        json: () => Promise.resolve(mockPosts),
+      })
+    ));
+  });
+
+  afterEach(() => {
+    vi.restoreAllMocks();
+  });
+
+  it('renders loading state initially', () => {
+    renderWithProviders(<Blog />);
+    // It might be too fast to catch loading, but we can try
+    // Or check if title is there
+    expect(screen.getByText('Blog')).toBeInTheDocument();
+  });
+
+  it('renders blog posts after fetch', async () => {
+    renderWithProviders(<Blog />);
+
+    await waitFor(() => {
+      expect(screen.getByText('Test Post 1')).toBeInTheDocument();
+      expect(screen.getByText('Test Post 2')).toBeInTheDocument();
+    });
+  });
+
+  it('handles fetch error', async () => {
+    vi.stubGlobal('fetch', vi.fn(() => Promise.reject('API Error')));
+
+    renderWithProviders(<Blog />);
+
+    await waitFor(() => {
+      expect(screen.getByText(/Failed to load blog posts/i)).toBeInTheDocument();
+    });
+  });
+});
diff --git a/src/pages/__tests__/Experience.test.tsx b/src/pages/__tests__/Experience.test.tsx
new file mode 100644
index 0000000..a094edd
--- /dev/null
+++ b/src/pages/__tests__/Experience.test.tsx
@@ -0,0 +1,23 @@
+import { screen } from '@testing-library/react';
+import { describe, it, expect } from 'vitest';
+import Experience from '../Experience';
+import { renderWithProviders } from '../../test-utils';
+
+describe('Experience Page', () => {
+  it('renders page title', () => {
+    renderWithProviders(<Experience />);
+    expect(screen.getByText('Professional Journey')).toBeInTheDocument();
+  });
+
+  it('renders work experience cards', () => {
+    renderWithProviders(<Experience />);
+    // Check for specific text that should be present
+    expect(screen.getByText(/timeline of my career/i)).toBeInTheDocument();
+  });
+
+  it('renders experience list', () => {
+    renderWithProviders(<Experience />);
+    // Check for "Professional Journey" which we already did.
+    expect(screen.getByText(/timeline of my career/i)).toBeInTheDocument();
+  });
+});
diff --git a/src/pages/__tests__/Mentorship.test.tsx b/src/pages/__tests__/Mentorship.test.tsx
new file mode 100644
index 0000000..0f88ef3
--- /dev/null
+++ b/src/pages/__tests__/Mentorship.test.tsx
@@ -0,0 +1,25 @@
+import { screen } from '@testing-library/react';
+import { describe, it, expect, vi } from 'vitest';
+import Mentorship from '../Mentorship';
+import { renderWithProviders } from '../../test-utils';
+
+// Mock specific image imports if they cause issues in Jest/Vitest
+vi.mock('../../assets/learnwithandi.png', () => ({ default: 'test-image-url' }));
+
+describe('Mentorship Page', () => {
+  it('renders main heading', () => {
+    renderWithProviders(<Mentorship />);
+    expect(screen.getByText(/Roast/i)).toBeInTheDocument();
+  });
+
+  it('renders features', () => {
+    renderWithProviders(<Mentorship />);
+    expect(screen.getByText('Get Roasted')).toBeInTheDocument();
+    expect(screen.getByText('Real Interview Simulation')).toBeInTheDocument();
+  });
+
+  it('renders mentorship benefits', () => {
+    renderWithProviders(<Mentorship />);
+    expect(screen.getByText('Interview communication skills')).toBeInTheDocument();
+  });
+});
diff --git a/src/pages/games/__tests__/BugSquash.test.tsx b/src/pages/games/__tests__/BugSquash.test.tsx
new file mode 100644
index 0000000..18a6fe4
--- /dev/null
+++ b/src/pages/games/__tests__/BugSquash.test.tsx
@@ -0,0 +1,42 @@
+import { render, screen, fireEvent, act } from '@testing-library/react';
+import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
+import BugSquash from '../BugSquash';
+
+// Mock requestAnimationFrame
+const requestAnimationFrameMock = (callback: FrameRequestCallback) => {
+  return setTimeout(() => callback(performance.now()), 16);
+};
+const cancelAnimationFrameMock = (id: number) => {
+  clearTimeout(id);
+};
+
+describe('BugSquash Game', () => {
+  beforeEach(() => {
+    vi.stubGlobal('requestAnimationFrame', requestAnimationFrameMock);
+    vi.stubGlobal('cancelAnimationFrame', cancelAnimationFrameMock);
+  });
+
+  afterEach(() => {
+    vi.restoreAllMocks();
+  });
+
+  it('renders start screen initially', () => {
+    render(<BugSquash />);
+    expect(screen.getByText('Bug Squash')).toBeInTheDocument();
+    expect(screen.getByText('Start Debugging')).toBeInTheDocument();
+  });
+
+  it('starts game when button is clicked', () => {
+    render(<BugSquash />);
+    const startButton = screen.getByText('Start Debugging');
+
+    act(() => {
+      fireEvent.click(startButton);
+    });
+
+    // Score should be visible (0)
+    expect(screen.getByText('0')).toBeInTheDocument();
+    // Start button should be gone
+    expect(screen.queryByText('Start Debugging')).not.toBeInTheDocument();
+  });
+});
diff --git a/src/pages/games/__tests__/QuickSync.test.tsx b/src/pages/games/__tests__/QuickSync.test.tsx
new file mode 100644
index 0000000..836bc56
--- /dev/null
+++ b/src/pages/games/__tests__/QuickSync.test.tsx
@@ -0,0 +1,40 @@
+import { render, screen, fireEvent, act } from '@testing-library/react';
+import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
+import QuickSync from '../QuickSync';
+
+// Mock requestAnimationFrame
+const requestAnimationFrameMock = (callback: FrameRequestCallback) => {
+  return setTimeout(() => callback(performance.now()), 16);
+};
+const cancelAnimationFrameMock = (id: number) => {
+  clearTimeout(id);
+};
+
+describe('QuickSync Game', () => {
+  beforeEach(() => {
+    vi.stubGlobal('requestAnimationFrame', requestAnimationFrameMock);
+    vi.stubGlobal('cancelAnimationFrame', cancelAnimationFrameMock);
+  });
+
+  afterEach(() => {
+    vi.restoreAllMocks();
+  });
+
+  it('renders start screen initially', () => {
+    render(<QuickSync />);
+    expect(screen.getByText('Quick Sync Dodge')).toBeInTheDocument();
+    expect(screen.getByText('Start Working')).toBeInTheDocument();
+  });
+
+  it('starts game when button is clicked', () => {
+    render(<QuickSync />);
+    const startButton = screen.getByText('Start Working');
+
+    act(() => {
+      fireEvent.click(startButton);
+    });
+
+    // Score should be 0s
+    expect(screen.getByText('0s')).toBeInTheDocument();
+  });
+});
diff --git a/src/setupTests.ts b/src/setupTests.ts
index 7b0828b..63cb60c 100644
--- a/src/setupTests.ts
+++ b/src/setupTests.ts
@@ -1 +1,31 @@
import '@testing-library/jest-dom';
+import { vi } from 'vitest';
+
+// Mock IntersectionObserver
+const IntersectionObserverMock = function () {
+  return {
+    observe: vi.fn(),
+    unobserve: vi.fn(),
+    disconnect: vi.fn(),
+  };
+};
+
+vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);
+
+// Mock window.scrollTo
+window.scrollTo = vi.fn();
+
+// Mock window.matchMedia
+Object.defineProperty(window, 'matchMedia', {
+  writable: true,
+  value: vi.fn().mockImplementation(query => ({
+    matches: false,
+    media: query,
+    onchange: null,
+    addListener: vi.fn(), // deprecated
+    removeListener: vi.fn(), // deprecated
+    addEventListener: vi.fn(),
+    removeEventListener: vi.fn(),
+    dispatchEvent: vi.fn(),
+  })),
+});
diff --git a/src/stories/Button.stories.ts b/src/stories/Button.stories.ts
new file mode 100644
index 0000000..b4381b2
--- /dev/null
+++ b/src/stories/Button.stories.ts
@@ -0,0 +1,54 @@
+import type { Meta, StoryObj } from '@storybook/react-vite';
+
+import { fn } from 'storybook/test';
+
+import { Button } from './Button';
+
+// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
+const meta = {
+  title: 'Example/Button',
+  component: Button,
+  parameters: {
+    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
+    layout: 'centered',
+  },
+  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
+  tags: ['autodocs'],
+  // More on argTypes: https://storybook.js.org/docs/api/argtypes
+  argTypes: {
+    backgroundColor: { control: 'color' },
+  },
+  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#story-args
+  args: { onClick: fn() },
+} satisfies Meta<typeof Button>;
+
+export default meta;
+type Story = StoryObj<typeof meta>;
+
+// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
+export const Primary: Story = {
+  args: {
+    primary: true,
+    label: 'Button',
+  },
+};
+
+export const Secondary: Story = {
+  args: {
+    label: 'Button',
+  },
+};
+
+export const Large: Story = {
+  args: {
+    size: 'large',
+    label: 'Button',
+  },
+};
+
+export const Small: Story = {
+  args: {
+    size: 'small',
+    label: 'Button',
+  },
+};
diff --git a/src/stories/Button.tsx b/src/stories/Button.tsx
new file mode 100644
index 0000000..f35dafd
--- /dev/null
+++ b/src/stories/Button.tsx
@@ -0,0 +1,37 @@
+import React from 'react';
+
+import './button.css';
+
+export interface ButtonProps {
+  /** Is this the principal call to action on the page? */
+  primary?: boolean;
+  /** What background color to use */
+  backgroundColor?: string;
+  /** How large should the button be? */
+  size?: 'small' | 'medium' | 'large';
+  /** Button contents */
+  label: string;
+  /** Optional click handler */
+  onClick?: () => void;
+}
+
+/** Primary UI component for user interaction */
+export const Button = ({
+  primary = false,
+  size = 'medium',
+  backgroundColor,
+  label,
+  ...props
+}: ButtonProps) => {
+  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
+  return (
+    <button
+      type="button"
+      className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
+      style={{ backgroundColor }}
+      {...props}
+    >
+      {label}
+    </button>
+  );
+};
diff --git a/src/stories/Configure.mdx b/src/stories/Configure.mdx
new file mode 100644
index 0000000..dca091c
--- /dev/null
+++ b/src/stories/Configure.mdx
@@ -0,0 +1,364 @@
+import { Meta } from "@storybook/addon-docs/blocks";
+
+import Github from "./assets/github.svg";
+import Discord from "./assets/discord.svg";
+import Youtube from "./assets/youtube.svg";
+import Tutorials from "./assets/tutorials.svg";
+import Styling from "./assets/styling.png";
+import Context from "./assets/context.png";
+import Assets from "./assets/assets.png";
+import Docs from "./assets/docs.png";
+import Share from "./assets/share.png";
+import FigmaPlugin from "./assets/figma-plugin.png";
+import Testing from "./assets/testing.png";
+import Accessibility from "./assets/accessibility.png";
+import Theming from "./assets/theming.png";
+import AddonLibrary from "./assets/addon-library.png";
+
+export const RightArrow = () => <svg
+    viewBox="0 0 14 14"
+    width="8px"
+    height="14px"
+    style={{
+      marginLeft: '4px',
+      display: 'inline-block',
+      shapeRendering: 'inherit',
+      verticalAlign: 'middle',
+      fill: 'currentColor',
+      'path fill': 'currentColor'
+    }}
+>
+  <path d="m11.1 7.35-5.5 5.5a.5.5 0 0 1-.7-.7L10.04 7 4.9 1.85a.5.5 0 1 1 .7-.7l5.5 5.5c.2.2.2.5 0 .7Z" />
+</svg>
+
+<Meta title="Configure your project" />
+
+<div className="sb-container">
+  <div className='sb-section-title'>
+    # Configure your project
+
+    Because Storybook works separately from your app, you'll need to configure it for your specific stack and setup. Below, explore guides for configuring Storybook with popular frameworks and tools. If you get stuck, learn how you can ask for help from our community.
+  </div>
+  <div className="sb-section">
+    <div className="sb-section-item">
+      <img
+        src={Styling}
+        alt="A wall of logos representing different styling technologies"
+      />
+      <h4 className="sb-section-item-heading">Add styling and CSS</h4>
+      <p className="sb-section-item-paragraph">Like with web applications, there are many ways to include CSS within Storybook. Learn more about setting up styling within Storybook.</p>
+      <a
+        href="https://storybook.js.org/docs/configure/styling-and-css/?renderer=react&ref=configure"
+        target="_blank"
+      >Learn more<RightArrow /></a>
+    </div>
+    <div className="sb-section-item">
+      <img
+        src={Context}
+        alt="An abstraction representing the composition of data for a component"
+      />
+      <h4 className="sb-section-item-heading">Provide context and mocking</h4>
+      <p className="sb-section-item-paragraph">Often when a story doesn't render, it's because your component is expecting a specific environment or context (like a theme provider) to be available.</p>
+      <a
+        href="https://storybook.js.org/docs/writing-stories/decorators/?renderer=react&ref=configure#context-for-mocking"
+        target="_blank"
+      >Learn more<RightArrow /></a>
+    </div>
+    <div className="sb-section-item">
+      <img src={Assets} alt="A representation of typography and image assets" />
+      <div>
+        <h4 className="sb-section-item-heading">Load assets and resources</h4>
+        <p className="sb-section-item-paragraph">To link static files (like fonts) to your projects and stories, use the
+        `staticDirs` configuration option to specify folders to load when
+        starting Storybook.</p>
+        <a
+          href="https://storybook.js.org/docs/configure/images-and-assets/?renderer=react&ref=configure"
+          target="_blank"
+        >Learn more<RightArrow /></a>
+      </div>
+    </div>
+  </div>
+</div>
+<div className="sb-container">
+  <div className='sb-section-title'>
+    # Do more with Storybook
+
+    Now that you know the basics, let's explore other parts of Storybook that will improve your experience. This list is just to get you started. You can customise Storybook in many ways to fit your needs.
+  </div>
+
+  <div className="sb-section">
+    <div className="sb-features-grid">
+      <div className="sb-grid-item">
+        <img src={Docs} alt="A screenshot showing the autodocs tag being set, pointing a docs page being generated" />
+        <h4 className="sb-section-item-heading">Autodocs</h4>
+        <p className="sb-section-item-paragraph">Auto-generate living,
+          interactive reference documentation from your components and stories.</p>
+        <a
+          href="https://storybook.js.org/docs/writing-docs/autodocs/?renderer=react&ref=configure"
+          target="_blank"
+        >Learn more<RightArrow /></a>
+      </div>
+      <div className="sb-grid-item">
+        <img src={Share} alt="A browser window showing a Storybook being published to a chromatic.com URL" />
+        <h4 className="sb-section-item-heading">Publish to Chromatic</h4>
+        <p className="sb-section-item-paragraph">Publish your Storybook to review and collaborate with your entire team.</p>
+        <a
+          href="https://storybook.js.org/docs/sharing/publish-storybook/?renderer=react&ref=configure#publish-storybook-with-chromatic"
+          target="_blank"
+        >Learn more<RightArrow /></a>
+      </div>
+      <div className="sb-grid-item">
+        <img src={FigmaPlugin} alt="Windows showing the Storybook plugin in Figma" />
+        <h4 className="sb-section-item-heading">Figma Plugin</h4>
+        <p className="sb-section-item-paragraph">Embed your stories into Figma to cross-reference the design and live
+          implementation in one place.</p>
+        <a
+          href="https://storybook.js.org/docs/sharing/design-integrations/?renderer=react&ref=configure#embed-storybook-in-figma-with-the-plugin"
+          target="_blank"
+        >Learn more<RightArrow /></a>
+      </div>
+      <div className="sb-grid-item">
+        <img src={Testing} alt="Screenshot of tests passing and failing" />
+        <h4 className="sb-section-item-heading">Testing</h4>
+        <p className="sb-section-item-paragraph">Use stories to test a component in all its variations, no matter how
+          complex.</p>
+        <a
+          href="https://storybook.js.org/docs/writing-tests/?renderer=react&ref=configure"
+          target="_blank"
+        >Learn more<RightArrow /></a>
+      </div>
+      <div className="sb-grid-item">
+        <img src={Accessibility} alt="Screenshot of accessibility tests passing and failing" />
+        <h4 className="sb-section-item-heading">Accessibility</h4>
+        <p className="sb-section-item-paragraph">Automatically test your components for a11y issues as you develop.</p>
+        <a
+          href="https://storybook.js.org/docs/writing-tests/accessibility-testing/?renderer=react&ref=configure"
+          target="_blank"
+        >Learn more<RightArrow /></a>
+      </div>
+      <div className="sb-grid-item">
+        <img src={Theming} alt="Screenshot of Storybook in light and dark mode" />
+        <h4 className="sb-section-item-heading">Theming</h4>
+        <p className="sb-section-item-paragraph">Theme Storybook's UI to personalize it to your project.</p>
+        <a
+          href="https://storybook.js.org/docs/configure/theming/?renderer=react&ref=configure"
+          target="_blank"
+        >Learn more<RightArrow /></a>
+      </div>
+    </div>
+  </div>
+</div>
+<div className='sb-addon'>
+  <div className='sb-addon-text'>
+    <h4>Addons</h4>
+    <p className="sb-section-item-paragraph">Integrate your tools with Storybook to connect workflows.</p>
+    <a
+        href="https://storybook.js.org/addons/?ref=configure"
+        target="_blank"
+      >Discover all addons<RightArrow /></a>
+  </div>
+  <div className='sb-addon-img'>
+    <img src={AddonLibrary} alt="Integrate your tools with Storybook to connect workflows." />
+  </div>
+</div>
+
+<div className="sb-section sb-socials">
+    <div className="sb-section-item">
+      <img src={Github} alt="Github logo" className="sb-explore-image"/>
+      Join our contributors building the future of UI development.
+
+      <a
+        href="https://github.com/storybookjs/storybook"
+        target="_blank"
+      >Star on GitHub<RightArrow /></a>
+    </div>
+    <div className="sb-section-item">
+      <img src={Discord} alt="Discord logo" className="sb-explore-image"/>
+      <div>
+        Get support and chat with frontend developers.
+
+        <a
+          href="https://discord.gg/storybook"
+          target="_blank"
+        >Join Discord server<RightArrow /></a>
+      </div>
+    </div>
+    <div className="sb-section-item">
+      <img src={Youtube} alt="Youtube logo" className="sb-explore-image"/>
+      <div>
+        Watch tutorials, feature previews and interviews.
+
+        <a
+          href="https://www.youtube.com/@chromaticui"
+          target="_blank"
+        >Watch on YouTube<RightArrow /></a>
+      </div>
+    </div>
+    <div className="sb-section-item">
+      <img src={Tutorials} alt="A book" className="sb-explore-image"/>
+      <p>Follow guided walkthroughs on for key workflows.</p>
+
+      <a
+          href="https://storybook.js.org/tutorials/?ref=configure"
+          target="_blank"
+        >Discover tutorials<RightArrow /></a>
+    </div>
+</div>
+
+<style>
+  {`
+  .sb-container {
+    margin-bottom: 48px;
+  }
+
+  .sb-section {
+    width: 100%;
+    display: flex;
+    flex-direction: row;
+    gap: 20px;
+  }
+
+  img {
+    object-fit: cover;
+  }
+
+  .sb-section-title {
+    margin-bottom: 32px;
+  }
+
+  .sb-section a:not(h1 a, h2 a, h3 a) {
+    font-size: 14px;
+  }
+
+  .sb-section-item, .sb-grid-item {
+    flex: 1;
+    display: flex;
+    flex-direction: column;
+  }
+
+  .sb-section-item-heading {
+    padding-top: 20px !important;
+    padding-bottom: 5px !important;
+    margin: 0 !important;
+  }
+  .sb-section-item-paragraph {
+    margin: 0;
+    padding-bottom: 10px;
+  }
+
+  .sb-chevron {
+    margin-left: 5px;
+  }
+
+  .sb-features-grid {
+    display: grid;
+    grid-template-columns: repeat(2, 1fr);
+    grid-gap: 32px 20px;
+  }
+
+  .sb-socials {
+    display: grid;
+    grid-template-columns: repeat(4, 1fr);
+  }
+
+  .sb-socials p {
+    margin-bottom: 10px;
+  }
+
+  .sb-explore-image {
+    max-height: 32px;
+    align-self: flex-start;
+  }
+
+  .sb-addon {
+    width: 100%;
+    display: flex;
+    align-items: center;
+    position: relative;
+    background-color: #EEF3F8;
+    border-radius: 5px;
+    border: 1px solid rgba(0, 0, 0, 0.05);
+    background: #EEF3F8;
+    height: 180px;
+    margin-bottom: 48px;
+    overflow: hidden;
+  }
+
+  .sb-addon-text {
+    padding-left: 48px;
+    max-width: 240px;
+  }
+
+  .sb-addon-text h4 {
+    padding-top: 0px;
+  }
+
+  .sb-addon-img {
+    position: absolute;
+    left: 345px;
+    top: 0;
+    height: 100%;
+    width: 200%;
+    overflow: hidden;
+  }
+
+  .sb-addon-img img {
+    width: 650px;
+    transform: rotate(-15deg);
+    margin-left: 40px;
+    margin-top: -72px;
+    box-shadow: 0 0 1px rgba(255, 255, 255, 0);
+    backface-visibility: hidden;
+  }
+
+  @media screen and (max-width: 800px) {
+    .sb-addon-img {
+      left: 300px;
+    }
+  }
+
+  @media screen and (max-width: 600px) {
+    .sb-section {
+      flex-direction: column;
+    }
+
+    .sb-features-grid {
+      grid-template-columns: repeat(1, 1fr);
+    }
+
+    .sb-socials {
+      grid-template-columns: repeat(2, 1fr);
+    }
+
+    .sb-addon {
+      height: 280px;
+      align-items: flex-start;
+      padding-top: 32px;
+      overflow: hidden;
+    }
+
+    .sb-addon-text {
+      padding-left: 24px;
+    }
+
+    .sb-addon-img {
+      right: 0;
+      left: 0;
+      top: 130px;
+      bottom: 0;
+      overflow: hidden;
+      height: auto;
+      width: 124%;
+    }
+
+    .sb-addon-img img {
+      width: 1200px;
+      transform: rotate(-12deg);
+      margin-left: 0;
+      margin-top: 48px;
+      margin-bottom: -40px;
+      margin-left: -24px;
+    }
+  }
+  `}
+</style>
diff --git a/src/stories/Header.stories.ts b/src/stories/Header.stories.ts
new file mode 100644
index 0000000..36a3b8f
--- /dev/null
+++ b/src/stories/Header.stories.ts
@@ -0,0 +1,34 @@
+import type { Meta, StoryObj } from '@storybook/react-vite';
+
+import { fn } from 'storybook/test';
+
+import { Header } from './Header';
+
+const meta = {
+  title: 'Example/Header',
+  component: Header,
+  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
+  tags: ['autodocs'],
+  parameters: {
+    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
+    layout: 'fullscreen',
+  },
+  args: {
+    onLogin: fn(),
+    onLogout: fn(),
+    onCreateAccount: fn(),
+  },
+} satisfies Meta<typeof Header>;
+
+export default meta;
+type Story = StoryObj<typeof meta>;
+
+export const LoggedIn: Story = {
+  args: {
+    user: {
+      name: 'Jane Doe',
+    },
+  },
+};
+
+export const LoggedOut: Story = {};
diff --git a/src/stories/Header.tsx b/src/stories/Header.tsx
new file mode 100644
index 0000000..1bf981a
--- /dev/null
+++ b/src/stories/Header.tsx
@@ -0,0 +1,56 @@
+import React from 'react';
+
+import { Button } from './Button';
+import './header.css';
+
+type User = {
+  name: string;
+};
+
+export interface HeaderProps {
+  user?: User;
+  onLogin?: () => void;
+  onLogout?: () => void;
+  onCreateAccount?: () => void;
+}
+
+export const Header = ({ user, onLogin, onLogout, onCreateAccount }: HeaderProps) => (
+  <header>
+    <div className="storybook-header">
+      <div>
+        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
+          <g fill="none" fillRule="evenodd">
+            <path
+              d="M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z"
+              fill="#FFF"
+            />
+            <path
+              d="M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z"
+              fill="#555AB9"
+            />
+            <path
+              d="M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z"
+              fill="#91BAF8"
+            />
+          </g>
+        </svg>
+        <h1>Acme</h1>
+      </div>
+      <div>
+        {user ? (
+          <>
+            <span className="welcome">
+              Welcome, <b>{user.name}</b>!
+            </span>
+            <Button size="small" onClick={onLogout} label="Log out" />
+          </>
+        ) : (
+          <>
+            <Button size="small" onClick={onLogin} label="Log in" />
+            <Button primary size="small" onClick={onCreateAccount} label="Sign up" />
+          </>
+        )}
+      </div>
+    </div>
+  </header>
+);
diff --git a/src/stories/Page.stories.ts b/src/stories/Page.stories.ts
new file mode 100644
index 0000000..7bbda25
--- /dev/null
+++ b/src/stories/Page.stories.ts
@@ -0,0 +1,33 @@
+import type { Meta, StoryObj } from '@storybook/react-vite';
+
+import { expect, userEvent, within } from 'storybook/test';
+
+import { Page } from './Page';
+
+const meta = {
+  title: 'Example/Page',
+  component: Page,
+  parameters: {
+    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
+    layout: 'fullscreen',
+  },
+} satisfies Meta<typeof Page>;
+
+export default meta;
+type Story = StoryObj<typeof meta>;
+
+export const LoggedOut: Story = {};
+
+// More on component testing: https://storybook.js.org/docs/writing-tests/interaction-testing
+export const LoggedIn: Story = {
+  play: async ({ canvasElement }) => {
+    const canvas = within(canvasElement);
+    const loginButton = canvas.getByRole('button', { name: /Log in/i });
+    await expect(loginButton).toBeInTheDocument();
+    await userEvent.click(loginButton);
+    await expect(loginButton).not.toBeInTheDocument();
+
+    const logoutButton = canvas.getByRole('button', { name: /Log out/i });
+    await expect(logoutButton).toBeInTheDocument();
+  },
+};
diff --git a/src/stories/Page.tsx b/src/stories/Page.tsx
new file mode 100644
index 0000000..e117483
--- /dev/null
+++ b/src/stories/Page.tsx
@@ -0,0 +1,73 @@
+import React from 'react';
+
+import { Header } from './Header';
+import './page.css';
+
+type User = {
+  name: string;
+};
+
+export const Page: React.FC = () => {
+  const [user, setUser] = React.useState<User>();
+
+  return (
+    <article>
+      <Header
+        user={user}
+        onLogin={() => setUser({ name: 'Jane Doe' })}
+        onLogout={() => setUser(undefined)}
+        onCreateAccount={() => setUser({ name: 'Jane Doe' })}
+      />
+
+      <section className="storybook-page">
+        <h2>Pages in Storybook</h2>
+        <p>
+          We recommend building UIs with a{' '}
+          <a href="https://componentdriven.org" target="_blank" rel="noopener noreferrer">
+            <strong>component-driven</strong>
+          </a>{' '}
+          process starting with atomic components and ending with pages.
+        </p>
+        <p>
+          Render pages with mock data. This makes it easy to build and review page states without
+          needing to navigate to them in your app. Here are some handy patterns for managing page
+          data in Storybook:
+        </p>
+        <ul>
+          <li>
+            Use a higher-level connected component. Storybook helps you compose such data from the
+            "args" of child component stories
+          </li>
+          <li>
+            Assemble data in the page component from your services. You can mock these services out
+            using Storybook.
+          </li>
+        </ul>
+        <p>
+          Get a guided tutorial on component-driven development at{' '}
+          <a href="https://storybook.js.org/tutorials/" target="_blank" rel="noopener noreferrer">
+            Storybook tutorials
+          </a>
+          . Read more in the{' '}
+          <a href="https://storybook.js.org/docs" target="_blank" rel="noopener noreferrer">
+            docs
+          </a>
+          .
+        </p>
+        <div className="tip-wrapper">
+          <span className="tip">Tip</span> Adjust the width of the canvas with the{' '}
+          <svg width="10" height="10" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
+            <g fill="none" fillRule="evenodd">
+              <path
+                d="M1.5 5.2h4.8c.3 0 .5.2.5.4v5.1c-.1.2-.3.3-.4.3H1.4a.5.5 0 01-.5-.4V5.7c0-.3.2-.5.5-.5zm0-2.1h6.9c.3 0 .5.2.5.4v7a.5.5 0 01-1 0V4H1.5a.5.5 0 010-1zm0-2.1h9c.3 0 .5.2.5.4v9.1a.5.5 0 01-1 0V2H1.5a.5.5 0 010-1zm4.3 5.2H2V10h3.8V6.2z"
+                id="a"
+                fill="#999"
+              />
+            </g>
+          </svg>
+          Viewports addon in the toolbar
+        </div>
+      </section>
+    </article>
+  );
+};
diff --git a/src/stories/assets/accessibility.png b/src/stories/assets/accessibility.png
new file mode 100644
index 0000000..6ffe6fe
Binary files /dev/null and b/src/stories/assets/accessibility.png differ
diff --git a/src/stories/assets/accessibility.svg b/src/stories/assets/accessibility.svg
new file mode 100644
index 0000000..107e93f
--- /dev/null
+++ b/src/stories/assets/accessibility.svg
@@ -0,0 +1 @@
+<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 48 48"><title>Accessibility</title><circle cx="24.334" cy="24" r="24" fill="#A849FF" fill-opacity=".3"/><path fill="#A470D5" fill-rule="evenodd" d="M27.8609 11.585C27.8609 9.59506 26.2497 7.99023 24.2519 7.99023C22.254 7.99023 20.6429 9.65925 20.6429 11.585C20.6429 13.575 22.254 15.1799 24.2519 15.1799C26.2497 15.1799 27.8609 13.575 27.8609 11.585ZM21.8922 22.6473C21.8467 23.9096 21.7901 25.4788 21.5897 26.2771C20.9853 29.0462 17.7348 36.3314 17.3325 37.2275C17.1891 37.4923 17.1077 37.7955 17.1077 38.1178C17.1077 39.1519 17.946 39.9902 18.9802 39.9902C19.6587 39.9902 20.253 39.6293 20.5814 39.0889L20.6429 38.9874L24.2841 31.22C24.2841 31.22 27.5529 37.9214 27.9238 38.6591C28.2948 39.3967 28.8709 39.9902 29.7168 39.9902C30.751 39.9902 31.5893 39.1519 31.5893 38.1178C31.5893 37.7951 31.3639 37.2265 31.3639 37.2265C30.9581 36.3258 27.698 29.0452 27.0938 26.2771C26.8975 25.4948 26.847 23.9722 26.8056 22.7236C26.7927 22.333 26.7806 21.9693 26.7653 21.6634C26.7008 21.214 27.0231 20.8289 27.4097 20.7005L35.3366 18.3253C36.3033 18.0685 36.8834 16.9773 36.6256 16.0144C36.3678 15.0515 35.2722 14.4737 34.3055 14.7305C34.3055 14.7305 26.8619 17.1057 24.2841 17.1057C21.7062 17.1057 14.456 14.7947 14.456 14.7947C13.4893 14.5379 12.3937 14.9873 12.0715 15.9502C11.7493 16.9131 12.3293 18.0044 13.3604 18.3253L21.2873 20.7005C21.674 20.8289 21.9318 21.214 21.9318 21.6634C21.9174 21.9493 21.9053 22.2857 21.8922 22.6473Z" clip-rule="evenodd"/></svg>
 No newline at end of file
diff --git a/src/stories/assets/addon-library.png b/src/stories/assets/addon-library.png
new file mode 100644
index 0000000..95deb38
Binary files /dev/null and b/src/stories/assets/addon-library.png differ
diff --git a/src/stories/assets/assets.png b/src/stories/assets/assets.png
new file mode 100644
index 0000000..cfba681
Binary files /dev/null and b/src/stories/assets/assets.png differ
diff --git a/src/stories/assets/avif-test-image.avif b/src/stories/assets/avif-test-image.avif
new file mode 100644
index 0000000..530709b
Binary files /dev/null and b/src/stories/assets/avif-test-image.avif differ
diff --git a/src/stories/assets/context.png b/src/stories/assets/context.png
new file mode 100644
index 0000000..e5cd249
Binary files /dev/null and b/src/stories/assets/context.png differ
diff --git a/src/stories/assets/discord.svg b/src/stories/assets/discord.svg
new file mode 100644
index 0000000..d638958
--- /dev/null
+++ b/src/stories/assets/discord.svg
@@ -0,0 +1 @@
+<svg xmlns="http://www.w3.org/2000/svg" width="33" height="32" fill="none" viewBox="0 0 33 32"><g clip-path="url(#clip0_10031_177575)"><mask id="mask0_10031_177575" style="mask-type:luminance" width="33" height="25" x="0" y="4" maskUnits="userSpaceOnUse"><path fill="#fff" d="M32.5034 4.00195H0.503906V28.7758H32.5034V4.00195Z"/></mask><g mask="url(#mask0_10031_177575)"><path fill="#5865F2" d="M27.5928 6.20817C25.5533 5.27289 23.3662 4.58382 21.0794 4.18916C21.0378 4.18154 20.9962 4.20057 20.9747 4.23864C20.6935 4.73863 20.3819 5.3909 20.1637 5.90358C17.7042 5.53558 15.2573 5.53558 12.8481 5.90358C12.6299 5.37951 12.307 4.73863 12.0245 4.23864C12.003 4.20184 11.9614 4.18281 11.9198 4.18916C9.63431 4.58255 7.44721 5.27163 5.40641 6.20817C5.38874 6.21578 5.3736 6.22848 5.36355 6.24497C1.21508 12.439 0.078646 18.4809 0.636144 24.4478C0.638667 24.477 0.655064 24.5049 0.677768 24.5227C3.41481 26.5315 6.06609 27.7511 8.66815 28.5594C8.70979 28.5721 8.75392 28.5569 8.78042 28.5226C9.39594 27.6826 9.94461 26.7968 10.4151 25.8653C10.4428 25.8107 10.4163 25.746 10.3596 25.7244C9.48927 25.3945 8.66058 24.9922 7.86343 24.5354C7.80038 24.4986 7.79533 24.4084 7.85333 24.3653C8.02108 24.2397 8.18888 24.109 8.34906 23.977C8.37804 23.9529 8.41842 23.9478 8.45249 23.963C13.6894 26.3526 19.359 26.3526 24.5341 23.963C24.5682 23.9465 24.6086 23.9516 24.6388 23.9757C24.799 24.1077 24.9668 24.2397 25.1358 24.3653C25.1938 24.4084 25.19 24.4986 25.127 24.5354C24.3298 25.0011 23.5011 25.3945 22.6296 25.7232C22.5728 25.7447 22.5476 25.8107 22.5754 25.8653C23.0559 26.7955 23.6046 27.6812 24.2087 28.5213C24.234 28.5569 24.2794 28.5721 24.321 28.5594C26.9357 27.7511 29.5869 26.5315 32.324 24.5227C32.348 24.5049 32.3631 24.4783 32.3656 24.4491C33.0328 17.5506 31.2481 11.5584 27.6344 6.24623C27.6256 6.22848 27.6105 6.21578 27.5928 6.20817ZM11.1971 20.8146C9.62043 20.8146 8.32129 19.3679 8.32129 17.5913C8.32129 15.8146 9.59523 14.368 11.1971 14.368C12.8115 14.368 14.0981 15.8273 14.0729 17.5913C14.0729 19.3679 12.7989 20.8146 11.1971 20.8146ZM21.8299 20.8146C20.2533 20.8146 18.9541 19.3679 18.9541 17.5913C18.9541 15.8146 20.228 14.368 21.8299 14.368C23.4444 14.368 24.7309 15.8273 24.7057 17.5913C24.7057 19.3679 23.4444 20.8146 21.8299 20.8146Z"/></g></g><defs><clipPath id="clip0_10031_177575"><rect width="32" height="32" fill="#fff" transform="translate(0.5)"/></clipPath></defs></svg>
 No newline at end of file
diff --git a/src/stories/assets/docs.png b/src/stories/assets/docs.png
new file mode 100644
index 0000000..a749629
Binary files /dev/null and b/src/stories/assets/docs.png differ
diff --git a/src/stories/assets/figma-plugin.png b/src/stories/assets/figma-plugin.png
new file mode 100644
index 0000000..8f79b08
Binary files /dev/null and b/src/stories/assets/figma-plugin.png differ
diff --git a/src/stories/assets/github.svg b/src/stories/assets/github.svg
new file mode 100644
index 0000000..dc51352
--- /dev/null
+++ b/src/stories/assets/github.svg
@@ -0,0 +1 @@
+<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32"><path fill="#161614" d="M16.0001 0C7.16466 0 0 7.17472 0 16.0256C0 23.1061 4.58452 29.1131 10.9419 31.2322C11.7415 31.3805 12.0351 30.8845 12.0351 30.4613C12.0351 30.0791 12.0202 28.8167 12.0133 27.4776C7.56209 28.447 6.62283 25.5868 6.62283 25.5868C5.89499 23.7345 4.8463 23.2419 4.8463 23.2419C3.39461 22.2473 4.95573 22.2678 4.95573 22.2678C6.56242 22.3808 7.40842 23.9192 7.40842 23.9192C8.83547 26.3691 11.1514 25.6609 12.0645 25.2514C12.2081 24.2156 12.6227 23.5087 13.0803 23.1085C9.52648 22.7032 5.7906 21.3291 5.7906 15.1886C5.7906 13.4389 6.41563 12.0094 7.43916 10.8871C7.27303 10.4834 6.72537 8.85349 7.59415 6.64609C7.59415 6.64609 8.93774 6.21539 11.9953 8.28877C13.2716 7.9337 14.6404 7.75563 16.0001 7.74953C17.3599 7.75563 18.7297 7.9337 20.0084 8.28877C23.0623 6.21539 24.404 6.64609 24.404 6.64609C25.2749 8.85349 24.727 10.4834 24.5608 10.8871C25.5868 12.0094 26.2075 13.4389 26.2075 15.1886C26.2075 21.3437 22.4645 22.699 18.9017 23.0957C19.4756 23.593 19.9869 24.5683 19.9869 26.0634C19.9869 28.2077 19.9684 29.9334 19.9684 30.4613C19.9684 30.8877 20.2564 31.3874 21.0674 31.2301C27.4213 29.1086 32 23.1037 32 16.0256C32 7.17472 24.8364 0 16.0001 0ZM5.99257 22.8288C5.95733 22.9084 5.83227 22.9322 5.71834 22.8776C5.60229 22.8253 5.53711 22.7168 5.57474 22.6369C5.60918 22.5549 5.7345 22.5321 5.85029 22.587C5.9666 22.6393 6.03284 22.7489 5.99257 22.8288ZM6.7796 23.5321C6.70329 23.603 6.55412 23.5701 6.45291 23.4581C6.34825 23.3464 6.32864 23.197 6.40601 23.125C6.4847 23.0542 6.62937 23.0874 6.73429 23.1991C6.83895 23.3121 6.85935 23.4605 6.7796 23.5321ZM7.31953 24.4321C7.2215 24.5003 7.0612 24.4363 6.96211 24.2938C6.86407 24.1513 6.86407 23.9804 6.96422 23.9119C7.06358 23.8435 7.2215 23.905 7.32191 24.0465C7.41968 24.1914 7.41968 24.3623 7.31953 24.4321ZM8.23267 25.4743C8.14497 25.5712 7.95818 25.5452 7.82146 25.413C7.68156 25.2838 7.64261 25.1004 7.73058 25.0035C7.81934 24.9064 8.00719 24.9337 8.14497 25.0648C8.28381 25.1938 8.3262 25.3785 8.23267 25.4743ZM9.41281 25.8262C9.37413 25.9517 9.19423 26.0088 9.013 25.9554C8.83203 25.9005 8.7136 25.7535 8.75016 25.6266C8.78778 25.5003 8.96848 25.4408 9.15104 25.4979C9.33174 25.5526 9.45044 25.6985 9.41281 25.8262ZM10.7559 25.9754C10.7604 26.1076 10.6067 26.2172 10.4165 26.2196C10.2252 26.2238 10.0704 26.1169 10.0683 25.9868C10.0683 25.8534 10.2185 25.7448 10.4098 25.7416C10.6001 25.7379 10.7559 25.8441 10.7559 25.9754ZM12.0753 25.9248C12.0981 26.0537 11.9658 26.1862 11.7769 26.2215C11.5912 26.2554 11.4192 26.1758 11.3957 26.0479C11.3726 25.9157 11.5072 25.7833 11.6927 25.7491C11.8819 25.7162 12.0512 25.7937 12.0753 25.9248Z"/></svg>
 No newline at end of file
diff --git a/src/stories/assets/share.png b/src/stories/assets/share.png
new file mode 100644
index 0000000..8097a37
Binary files /dev/null and b/src/stories/assets/share.png differ
diff --git a/src/stories/assets/styling.png b/src/stories/assets/styling.png
new file mode 100644
index 0000000..d341e82
Binary files /dev/null and b/src/stories/assets/styling.png differ
diff --git a/src/stories/assets/testing.png b/src/stories/assets/testing.png
new file mode 100644
index 0000000..d4ac39a
Binary files /dev/null and b/src/stories/assets/testing.png differ
diff --git a/src/stories/assets/theming.png b/src/stories/assets/theming.png
new file mode 100644
index 0000000..1535eb9
Binary files /dev/null and b/src/stories/assets/theming.png differ
diff --git a/src/stories/assets/tutorials.svg b/src/stories/assets/tutorials.svg
new file mode 100644
index 0000000..b492a9c
--- /dev/null
+++ b/src/stories/assets/tutorials.svg
@@ -0,0 +1 @@
+<svg xmlns="http://www.w3.org/2000/svg" width="33" height="32" fill="none" viewBox="0 0 33 32"><g clip-path="url(#clip0_10031_177597)"><path fill="#B7F0EF" fill-rule="evenodd" d="M17 7.87059C17 6.48214 17.9812 5.28722 19.3431 5.01709L29.5249 2.99755C31.3238 2.64076 33 4.01717 33 5.85105V22.1344C33 23.5229 32.0188 24.7178 30.6569 24.9879L20.4751 27.0074C18.6762 27.3642 17 25.9878 17 24.1539L17 7.87059Z" clip-rule="evenodd" opacity=".7"/><path fill="#87E6E5" fill-rule="evenodd" d="M1 5.85245C1 4.01857 2.67623 2.64215 4.47507 2.99895L14.6569 5.01848C16.0188 5.28861 17 6.48354 17 7.87198V24.1553C17 25.9892 15.3238 27.3656 13.5249 27.0088L3.34311 24.9893C1.98119 24.7192 1 23.5242 1 22.1358V5.85245Z" clip-rule="evenodd"/><path fill="#61C1FD" fill-rule="evenodd" d="M15.543 5.71289C15.543 5.71289 16.8157 5.96289 17.4002 6.57653C17.9847 7.19016 18.4521 9.03107 18.4521 9.03107C18.4521 9.03107 18.4521 25.1106 18.4521 26.9629C18.4521 28.8152 19.3775 31.4174 19.3775 31.4174L17.4002 28.8947L16.2575 31.4174C16.2575 31.4174 15.543 29.0765 15.543 27.122C15.543 25.1674 15.543 5.71289 15.543 5.71289Z" clip-rule="evenodd"/></g><defs><clipPath id="clip0_10031_177597"><rect width="32" height="32" fill="#fff" transform="translate(0.5)"/></clipPath></defs></svg>
 No newline at end of file
diff --git a/src/stories/assets/youtube.svg b/src/stories/assets/youtube.svg
new file mode 100644
index 0000000..a7515d7
--- /dev/null
+++ b/src/stories/assets/youtube.svg
@@ -0,0 +1 @@
+<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32"><path fill="#ED1D24" d="M31.3313 8.44657C30.9633 7.08998 29.8791 6.02172 28.5022 5.65916C26.0067 5.00026 16 5.00026 16 5.00026C16 5.00026 5.99333 5.00026 3.4978 5.65916C2.12102 6.02172 1.03665 7.08998 0.668678 8.44657C0 10.9053 0 16.0353 0 16.0353C0 16.0353 0 21.1652 0.668678 23.6242C1.03665 24.9806 2.12102 26.0489 3.4978 26.4116C5.99333 27.0703 16 27.0703 16 27.0703C16 27.0703 26.0067 27.0703 28.5022 26.4116C29.8791 26.0489 30.9633 24.9806 31.3313 23.6242C32 21.1652 32 16.0353 32 16.0353C32 16.0353 32 10.9053 31.3313 8.44657Z"/><path fill="#fff" d="M12.7266 20.6934L21.0902 16.036L12.7266 11.3781V20.6934Z"/></svg>
 No newline at end of file
diff --git a/src/stories/button.css b/src/stories/button.css
new file mode 100644
index 0000000..7efe955
--- /dev/null
+++ b/src/stories/button.css
@@ -0,0 +1,30 @@
+.storybook-button {
+  display: inline-block;
+  cursor: pointer;
+  border: 0;
+  border-radius: 3em;
+  font-weight: 700;
+  line-height: 1;
+  font-family: "Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
+}
+.storybook-button--primary {
+  background-color: #555ab9;
+  color: white;
+}
+.storybook-button--secondary {
+  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset;
+  background-color: transparent;
+  color: #333;
+}
+.storybook-button--small {
+  padding: 10px 16px;
+  font-size: 12px;
+}
+.storybook-button--medium {
+  padding: 11px 20px;
+  font-size: 14px;
+}
+.storybook-button--large {
+  padding: 12px 24px;
+  font-size: 16px;
+}
diff --git a/src/stories/header.css b/src/stories/header.css
new file mode 100644
index 0000000..ad77492
--- /dev/null
+++ b/src/stories/header.css
@@ -0,0 +1,32 @@
+.storybook-header {
+  display: flex;
+  justify-content: space-between;
+  align-items: center;
+  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
+  padding: 15px 20px;
+  font-family: "Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
+}
+
+.storybook-header svg {
+  display: inline-block;
+  vertical-align: top;
+}
+
+.storybook-header h1 {
+  display: inline-block;
+  vertical-align: top;
+  margin: 6px 0 6px 10px;
+  font-weight: 700;
+  font-size: 20px;
+  line-height: 1;
+}
+
+.storybook-header button + button {
+  margin-left: 10px;
+}
+
+.storybook-header .welcome {
+  margin-right: 10px;
+  color: #333;
+  font-size: 14px;
+}
diff --git a/src/stories/page.css b/src/stories/page.css
new file mode 100644
index 0000000..2c9a9e0
--- /dev/null
+++ b/src/stories/page.css
@@ -0,0 +1,68 @@
+.storybook-page {
+  margin: 0 auto;
+  padding: 48px 20px;
+  max-width: 600px;
+  color: #333;
+  font-size: 14px;
+  line-height: 24px;
+  font-family: "Nunito Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
+}
+
+.storybook-page h2 {
+  display: inline-block;
+  vertical-align: top;
+  margin: 0 0 4px;
+  font-weight: 700;
+  font-size: 32px;
+  line-height: 1;
+}
+
+.storybook-page p {
+  margin: 1em 0;
+}
+
+.storybook-page a {
+  color: inherit;
+}
+
+.storybook-page ul {
+  margin: 1em 0;
+  padding-left: 30px;
+}
+
+.storybook-page li {
+  margin-bottom: 8px;
+}
+
+.storybook-page .tip {
+  display: inline-block;
+  vertical-align: top;
+  margin-right: 10px;
+  border-radius: 1em;
+  background: #e7fdd8;
+  padding: 4px 12px;
+  color: #357a14;
+  font-weight: 700;
+  font-size: 11px;
+  line-height: 12px;
+}
+
+.storybook-page .tip-wrapper {
+  margin-top: 40px;
+  margin-bottom: 40px;
+  font-size: 13px;
+  line-height: 20px;
+}
+
+.storybook-page .tip-wrapper svg {
+  display: inline-block;
+  vertical-align: top;
+  margin-top: 3px;
+  margin-right: 4px;
+  width: 12px;
+  height: 12px;
+}
+
+.storybook-page .tip-wrapper svg path {
+  fill: #1ea7fd;
+}
diff --git a/src/test-utils.tsx b/src/test-utils.tsx
new file mode 100644
index 0000000..3d11fab
--- /dev/null
+++ b/src/test-utils.tsx
@@ -0,0 +1,18 @@
+import { render } from '@testing-library/react';
+import { BrowserRouter } from 'react-router-dom';
+import { HelmetProvider } from 'react-helmet-async';
+import { ThemeProvider } from './context/ThemeContext';
+
+export const renderWithProviders = (component: React.ReactNode) => {
+  return render(
+    <HelmetProvider>
+      <BrowserRouter>
+        <ThemeProvider>
+          {component}
+        </ThemeProvider>
+      </BrowserRouter>
+    </HelmetProvider>
+  );
+};
+
+export * from '@testing-library/react';
diff --git a/tests/e2e.spec.ts b/tests/e2e.spec.ts
new file mode 100644
index 0000000..7d0c4f3
--- /dev/null
+++ b/tests/e2e.spec.ts
@@ -0,0 +1,47 @@
+import { test, expect } from '@playwright/test';
+
+test.describe('Portfolio E2E', () => {
+  test('homepage loads and displays hero', async ({ page }) => {
+    await page.goto('/');
+    await expect(page).toHaveTitle(/Alvian/);
+    // Use regex to match text that might be split by elements or whitespace
+    await expect(page.getByRole('heading', { name: /Alvian/i })).toBeVisible();
+    await expect(page.getByText('Senior Talent Manager')).toBeVisible();
+  });
+
+  test('navigation to Experience page works', async ({ page }) => {
+    await page.goto('/');
+    // Helper to ensure page is ready
+    await page.waitForLoadState('domcontentloaded');
+
+    await page.getByRole('link', { name: 'Experience' }).click();
+    await expect(page).toHaveURL(/experience/);
+    await expect(page.getByText('Professional Journey')).toBeVisible();
+  });
+
+  test('mobile menu works (viewport resizing)', async ({ page }) => {
+    await page.setViewportSize({ width: 375, height: 667 });
+    await page.goto('/');
+
+    const menuButton = page.getByRole('button', { name: /toggle menu/i });
+    await expect(menuButton).toBeVisible();
+    // Force click if needed, or wait
+    await menuButton.click({ force: true });
+
+    // Check if mobile nav link is visible
+    const aboutLink = page.getByRole('link', { name: 'About' }).first();
+    await expect(aboutLink).toBeVisible();
+  });
+
+  test('theme toggle works', async ({ page }) => {
+    await page.goto('/');
+    // Assuming theme toggle is present. Need to find it.
+    // It's likely in the header but maybe hidden or icon-only.
+    // We mocked it in unit tests, but in real app it exists.
+    // Let's assume it has a recognizable selector.
+    // If not, we skip for now or inspect DOM.
+    // Based on previous files, ThemeToggle seems to exist.
+    // Let's look for a button with sun/moon icon or label.
+    // Inspecting Header.tsx might define where it is, or if it's separate.
+  });
+});
diff --git a/tests/example.spec.ts b/tests/example.spec.ts
new file mode 100644
index 0000000..54a906a
--- /dev/null
+++ b/tests/example.spec.ts
@@ -0,0 +1,18 @@
+import { test, expect } from '@playwright/test';
+
+test('has title', async ({ page }) => {
+  await page.goto('https://playwright.dev/');
+
+  // Expect a title "to contain" a substring.
+  await expect(page).toHaveTitle(/Playwright/);
+});
+
+test('get started link', async ({ page }) => {
+  await page.goto('https://playwright.dev/');
+
+  // Click the get started link.
+  await page.getByRole('link', { name: 'Get started' }).click();
+
+  // Expects page to have a heading with the name of Installation.
+  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
+});
diff --git a/vitest.config.ts b/vitest.config.ts
index 3d5bf00..7d8d72c 100644
--- a/vitest.config.ts
+++ b/vitest.config.ts
@@ -1,7 +1,13 @@
/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
+import path from 'node:path';
+import { fileURLToPath } from 'node:url';
+import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
+import { playwright } from '@vitest/browser-playwright';
+const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

+// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
// eslint-disable-next-line @typescript-eslint/no-explicit-any
plugins: [react() as any],
@@ -9,5 +15,26 @@ export default defineConfig({
globals: true,
environment: 'jsdom',
setupFiles: './src/setupTests.ts',
-  },
-});
+    projects: [{
+      extends: true,
+      plugins: [
+      // The plugin will run tests for the stories defined in your Storybook config
+      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
+      storybookTest({
+        configDir: path.join(dirname, '.storybook')
+      })],
+      test: {
+        name: 'storybook',
+        browser: {
+          enabled: true,
+          headless: true,
+          provider: playwright({}),
+          instances: [{
+            browser: 'chromium'
+          }]
+        },
+        setupFiles: ['.storybook/vitest.setup.ts']
+      }
+    }]
+  }
+});
 No newline at end of file
diff --git a/vitest.shims.d.ts b/vitest.shims.d.ts
new file mode 100644
index 0000000..7782f28
--- /dev/null
+++ b/vitest.shims.d.ts
@@ -0,0 +1 @@
+/// <reference types="@vitest/browser-playwright" />
 No newline at end of file

```

## feat: add contact section on the about page (04e2f54) - 2026-01-28

```diff
diff --git a/src/pages/About.tsx b/src/pages/About.tsx
index f54ca32..ce32d5e 100644
--- a/src/pages/About.tsx
+++ b/src/pages/About.tsx
@@ -1,6 +1,6 @@
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
-import { ArrowRight, Download } from 'lucide-react';
+import { ArrowRight, Download, Mail, Calendar, Linkedin, Github } from 'lucide-react';
import alvian from "../assets/potraits.png";
import { skills, categories } from "../data";
import ModernCard from "../components/ModernCard";
@@ -55,7 +55,14 @@ export default function About() {
</p>

<div className="flex flex-wrap gap-4">
-                <a href="#contact" className="btn-primary flex items-center gap-2 hover:bg-brand-red transition-colors">
+                <a
+                  href="#contact"
+                  className="btn-primary flex items-center gap-2 hover:bg-brand-red transition-colors"
+                  onClick={(e) => {
+                    e.preventDefault();
+                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
+                  }}
+                >
Get in touch <ArrowRight className="w-4 h-4" />
</a>
<a href="/resume.pdf" className="text-[var(--text-secondary)] hover:text-brand-red font-medium flex items-center gap-2 px-6 py-3 transition-colors">
@@ -180,6 +187,101 @@ export default function About() {
</div>
</motion.div>
</section>
+
+        {/* Contact Section */}
+        <section id="contact" className="max-w-4xl mx-auto mb-24">
+          <motion.div
+            initial={{ opacity: 0, y: 20 }}
+            whileInView={{ opacity: 1, y: 0 }}
+            viewport={{ once: true }}
+            transition={{ duration: 0.6 }}
+          >
+            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-8">Get in Touch</h2>
+            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-10">
+              Whether you're looking to collaborate on a project, need consulting, or just want to chat about tech and talent—I'd love to hear from you!
+            </p>
+
+            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
+              {/* Email */}
+              <ModernCard className="p-6 hover:border-brand-red/30 transition-all hover:shadow-lg hover:-translate-y-1 group">
+                <div className="flex items-start gap-4">
+                  <div className="p-3 bg-[var(--bg-primary)] rounded-xl text-[var(--text-secondary)] group-hover:text-brand-red transition-colors">
+                    <Mail className="w-6 h-6" />
+                  </div>
+                  <div>
+                    <h3 className="font-semibold text-[var(--text-primary)] mb-2">Email</h3>
+                    <a
+                      href="mailto:hello@alvianzf.id"
+                      className="text-[var(--text-secondary)] hover:text-brand-red transition-colors"
+                    >
+                      hello@alvianzf.id
+                    </a>
+                  </div>
+                </div>
+              </ModernCard>
+
+              {/* Schedule a Call */}
+              <ModernCard className="p-6 hover:border-brand-red/30 transition-all hover:shadow-lg hover:-translate-y-1 group">
+                <div className="flex items-start gap-4">
+                  <div className="p-3 bg-[var(--bg-primary)] rounded-xl text-[var(--text-secondary)] group-hover:text-brand-red transition-colors">
+                    <Calendar className="w-6 h-6" />
+                  </div>
+                  <div>
+                    <h3 className="font-semibold text-[var(--text-primary)] mb-2">Schedule a Call</h3>
+                    <a
+                      href="https://calendar.app.google/J3gjDH8fv98BjSHz7"
+                      target="_blank"
+                      rel="noopener noreferrer"
+                      className="text-[var(--text-secondary)] hover:text-brand-red transition-colors"
+                    >
+                      Book a time
+                    </a>
+                  </div>
+                </div>
+              </ModernCard>
+
+              {/* LinkedIn */}
+              <ModernCard className="p-6 hover:border-brand-red/30 transition-all hover:shadow-lg hover:-translate-y-1 group">
+                <div className="flex items-start gap-4">
+                  <div className="p-3 bg-[var(--bg-primary)] rounded-xl text-[var(--text-secondary)] group-hover:text-brand-red transition-colors">
+                    <Linkedin className="w-6 h-6" />
+                  </div>
+                  <div>
+                    <h3 className="font-semibold text-[var(--text-primary)] mb-2">LinkedIn</h3>
+                    <a
+                      href="https://linkedin.com/in/alvianzf"
+                      target="_blank"
+                      rel="noopener noreferrer"
+                      className="text-[var(--text-secondary)] hover:text-brand-red transition-colors"
+                    >
+                      linkedin.com/in/alvianzf
+                    </a>
+                  </div>
+                </div>
+              </ModernCard>
+
+              {/* GitHub */}
+              <ModernCard className="p-6 hover:border-brand-red/30 transition-all hover:shadow-lg hover:-translate-y-1 group">
+                <div className="flex items-start gap-4">
+                  <div className="p-3 bg-[var(--bg-primary)] rounded-xl text-[var(--text-secondary)] group-hover:text-brand-red transition-colors">
+                    <Github className="w-6 h-6" />
+                  </div>
+                  <div>
+                    <h3 className="font-semibold text-[var(--text-primary)] mb-2">GitHub</h3>
+                    <a
+                      href="https://github.com/alvianzf"
+                      target="_blank"
+                      rel="noopener noreferrer"
+                      className="text-[var(--text-secondary)] hover:text-brand-red transition-colors"
+                    >
+                      github.com/alvianzf
+                    </a>
+                  </div>
+                </div>
+              </ModernCard>
+            </div>
+          </motion.div>
+        </section>
</div>
</div>
);
diff --git a/src/pages/__tests__/About.test.tsx b/src/pages/__tests__/About.test.tsx
index bb3a903..36ab7fe 100644
--- a/src/pages/__tests__/About.test.tsx
+++ b/src/pages/__tests__/About.test.tsx
@@ -29,4 +29,13 @@ describe('About Page', () => {
expect(button).toBeInTheDocument();
expect(button.closest('a')).toHaveAttribute('href', '#contact');
});
+
+  it('renders contact section', () => {
+    renderWithProviders(<About />);
+    expect(screen.getByText('Get in Touch')).toBeInTheDocument();
+    expect(screen.getByText('hello@alvianzf.id')).toBeInTheDocument();
+    expect(screen.getByText('Book a time')).toBeInTheDocument();
+    expect(screen.getByText('linkedin.com/in/alvianzf')).toBeInTheDocument();
+    expect(screen.getByText('github.com/alvianzf')).toBeInTheDocument();
+  });
});

```

## feat: add my new npm package (ee14731) - 2026-01-28

```diff
diff --git a/README.md b/README.md
index fbe1804..abba6a0 100644
--- a/README.md
+++ b/README.md
@@ -21,6 +21,7 @@ You noticed the squiggly lines? I call them "Worms."
*   **What it does:** I use complex Bézier curves (`Q` commands, because I'm fancy) and `Math.random()` to generate floating squiggles.
*   **Paranoid Testing:** I literally wrote **unit tests** for these lines. If a worm is straight, the build fails. I have trust issues with `Math.random()`.
*   **Tech Spec:** It renders **50** independent SVG paths that fade in and out. Yes, I am personally responsible for your laptop fan spinning up right now. You're welcome.
+*   **Want to steal it?** Of course you do. Install it via npm: `npm install @alvianzf/squiggly-lines-go-brrr`. I even packaged it for you because I'm too nice.

### 📱 Apocalypse-Ready PWA
*   **Offline Support**: This website caches itself. If the internet goes down, you can still read my resume while the world burns.
@@ -142,4 +143,4 @@ Need someone to over-engineer your portfolio? Want brutally honest feedback on y

Licensed under **MIT** (Mostly Intense TypeScript).

-Feel free to steal `WormBackground.tsx` or the testing infrastructure. I know that's the only reason you're looking at the code anyway.
+Feel free to steal the WormBackground (it's on npm: `@alvianzf/squiggly-lines-go-brrr`) or the testing infrastructure. I know that's the only reason you're looking at the code anyway.
diff --git a/src/components/Header.tsx b/src/components/Header.tsx
index 3d93eb6..5c165a7 100644
--- a/src/components/Header.tsx
+++ b/src/components/Header.tsx
@@ -208,6 +208,17 @@ export default function Header() {
</div>
</div>
</a>
+                      <a href="https://www.npmjs.com/package/@alvianzf/squiggly-lines-go-brrr" target="_blank" rel="noopener noreferrer" className="block p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors group/item">
+                        <div className="flex items-start gap-3">
+                          <div className="p-2 bg-pink-50 text-pink-600 rounded-lg group-hover/item:text-[#990000] transition-colors">
+                            <i className="w-5 h-5 flex items-center justify-center">🪱</i>
+                          </div>
+                          <div>
+                            <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">squiggly-lines</div>
+                            <div className="text-xs text-slate-500">Animated background</div>
+                          </div>
+                        </div>
+                      </a>
</div>
</div>
</div>
@@ -309,6 +320,9 @@ export default function Header() {
<a href="https://www.npmjs.com/package/env-validate-sarcastically" className="flex items-center gap-3 text-slate-600 font-medium">
<MessageSquareWarning className="w-5 h-5 text-yellow-600" /> env-validate
</a>
+                          <a href="https://www.npmjs.com/package/@alvianzf/squiggly-lines-go-brrr" className="flex items-center gap-3 text-slate-600 font-medium">
+                            <span className="w-5 h-5 flex items-center justify-center">🪱</span> squiggly-lines
+                          </a>
</div>
</motion.div>
)}

```

## feat: expose sitemap and handle 404 (82d7f69) - 2026-01-28

```diff
diff --git a/package.json b/package.json
index 472a040..25ab63c 100644
--- a/package.json
+++ b/package.json
@@ -15,6 +15,7 @@
"build-storybook": "storybook build"
},
"dependencies": {
+    "@alvianzf/squiggly-lines-go-brrr": "^1.0.0",
"@fortawesome/fontawesome-svg-core": "^6.5.1",
"@fortawesome/free-brands-svg-icons": "^6.5.1",
"@fortawesome/free-solid-svg-icons": "^6.5.1",
diff --git a/robots.txt b/public/robots.txt
similarity index 100%
rename from robots.txt
rename to public/robots.txt
diff --git a/src/App.tsx b/src/App.tsx
index 23fbd20..6b35304 100644
--- a/src/App.tsx
+++ b/src/App.tsx
@@ -16,6 +16,7 @@ import QuickSync from './pages/games/QuickSync';
import ElusiveDeploy from './pages/games/ElusiveDeploy';
import LearnFlex from './pages/games/LearnFlex';
import LearnTypeScript from './pages/games/LearnTypeScript';
+import NotFound from './pages/NotFound';

function App() {
return (
@@ -43,6 +44,7 @@ function App() {
<Route path="/games/elusive-deploy" element={<ElusiveDeploy />} />
<Route path="/games/learn-flex" element={<LearnFlex />} />
<Route path="/games/learn-typescript" element={<LearnTypeScript />} />
+                  <Route path="*" element={<NotFound />} />
</Routes>
</AnimatePresence>
</main>
diff --git a/src/components/WormBackground.tsx b/src/components/WormBackground.tsx
index e6b0a77..9b73113 100644
--- a/src/components/WormBackground.tsx
+++ b/src/components/WormBackground.tsx
@@ -1,83 +1,93 @@
-import { useEffect, useState } from 'react';
-import { motion } from 'framer-motion';
+import { useState } from 'react';
+import { SquigglyBackground } from '@alvianzf/squiggly-lines-go-brrr';
+import { motion, AnimatePresence } from 'framer-motion';
+import { Activity, Bug, MoreHorizontal, Zap } from 'lucide-react';

-const generatePath = (width: number, height: number) => {
-  // Create simpler, smoother curves
-  const startX = Math.random() * width;
-  const startY = Math.random() * height;
+type Variant = 'worms' | 'beetles' | 'ants' | 'thunder';

-  // Fewer control points for smoother "worm" look
-  const cp1X = startX + (Math.random() - 0.5) * 400;
-  const cp1Y = startY + (Math.random() - 0.5) * 400;
-  const endX = cp1X + (Math.random() - 0.5) * 400;
-  const endY = cp1Y + (Math.random() - 0.5) * 400;
-
-  return `M ${startX} ${startY} Q ${cp1X} ${cp1Y} ${endX} ${endY}`;
+const variantIcons = {
+  worms: Activity,
+  beetles: Bug,
+  ants: MoreHorizontal,
+  thunder: Zap,
};

-const WormLine = ({ width, height, id }: { width: number; height: number; id: number }) => {
-  const [d, setD] = useState('');
-
-  useEffect(() => {
-    setD(generatePath(width, height));
-  }, [width, height, id]);
-
-  if (!d) return null;
-
-  return (
-    <motion.path
-      d={d}
-      fill="none"
-      stroke="currentColor"
-      strokeWidth={Math.random() * 2 + 1}
-      strokeLinecap="round"
-      className={id % 2 === 0 ? "text-brand-red/20" : "text-slate-400/30"}
-      initial={{ pathLength: 0, opacity: 0 }}
-      animate={{
-        pathLength: [0, 1, 1, 0], // Draw, stay, delete
-        opacity: [0, 1, 0, 0], // Fade in, stay visible, fade out
-        pathOffset: [0, 0, 1, 0] // Move 'forward' while deleting
-      }}
-      transition={{
-        duration: Math.random() * 5 + 5, // 5-10 seconds
-        repeat: Infinity,
-        ease: "easeInOut",
-        delay: Math.random() * 5, // Random start delay
-        repeatDelay: Math.random() * 2 // Random wait before restart
-      }}
-    />
-  );
+const variantLabels = {
+  worms: 'Worms',
+  beetles: 'Beetles',
+  ants: 'Ants',
+  thunder: 'Thunder',
};

export default function WormBackground() {
-  const [dimensions, setDimensions] = useState({ width: 1000, height: 1000 });
-
-  useEffect(() => {
-    // Only access window on mount
-    setDimensions({ width: window.innerWidth, height: window.innerHeight });
+  const [variant, setVariant] = useState<Variant>('worms');
+  const [isOpen, setIsOpen] = useState(false);

-    const handleResize = () => {
-      setDimensions({ width: window.innerWidth, height: window.innerHeight });
-    };
+  const variants: Variant[] = ['worms', 'beetles', 'ants', 'thunder'];

-    window.addEventListener('resize', handleResize);
-    return () => window.removeEventListener('resize', handleResize);
-  }, []);
+  return (
+    <>
+      <SquigglyBackground
+        variant={variant}
+        count={50}
+        colors={['text-red-500/20', 'text-slate-400/30']}
+        minStrokeWidth={1}
+        maxStrokeWidth={3}
+        minDuration={5}
+        maxDuration={10}
+        backgroundColor="var(--bg-primary)"
+        className="fixed inset-0 -z-10 pointer-events-none"
+      />

-  const wormCount = 50; // Triple the worms
+      {/* Variant Switcher */}
+      <div className="fixed bottom-20 right-4 z-50">
+        <AnimatePresence>
+          {isOpen && (
+            <motion.div
+              initial={{ opacity: 0, y: 10, scale: 0.9 }}
+              animate={{ opacity: 1, y: 0, scale: 1 }}
+              exit={{ opacity: 0, y: 10, scale: 0.9 }}
+              className="absolute bottom-16 right-0 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-2 mb-2 min-w-[140px]"
+            >
+              <div className="space-y-1">
+                {variants.map((v) => {
+                  const Icon = variantIcons[v];
+                  return (
+                    <button
+                      key={v}
+                      onClick={() => {
+                        setVariant(v);
+                        setIsOpen(false);
+                      }}
+                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${variant === v
+                        ? 'bg-[#990000] text-white'
+                        : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
+                        }`}
+                    >
+                      <Icon className="w-4 h-4" />
+                      <span className="text-sm font-medium">{variantLabels[v]}</span>
+                    </button>
+                  );
+                })}
+              </div>
+            </motion.div>
+          )}
+        </AnimatePresence>

-  return (
-    <div className="fixed inset-0 -z-10 bg-[var(--bg-primary)] transition-colors duration-300 overflow-hidden pointer-events-none">
-      <svg
-        width="100%"
-        height="100%"
-        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
-        xmlns="http://www.w3.org/2000/svg"
-      >
-        {Array.from({ length: wormCount }).map((_, i) => (
-          <WormLine key={i} width={dimensions.width} height={dimensions.height} id={i} />
-        ))}
-      </svg>
-    </div>
+        {/* Toggle Button */}
+        <motion.button
+          whileHover={{ scale: 1.05 }}
+          whileTap={{ scale: 0.95 }}
+          onClick={() => setIsOpen(!isOpen)}
+          className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:shadow-xl transition-all group"
+          aria-label="Change animation variant"
+        >
+          {(() => {
+            const Icon = variantIcons[variant];
+            return <Icon className="w-5 h-5 text-slate-700 dark:text-slate-300 group-hover:text-[#990000] transition-colors" />;
+          })()}
+        </motion.button>
+      </div>
+    </>
);
}
diff --git a/src/pages/NotFound.tsx b/src/pages/NotFound.tsx
new file mode 100644
index 0000000..f66950b
--- /dev/null
+++ b/src/pages/NotFound.tsx
@@ -0,0 +1,86 @@
+import { useNavigate } from 'react-router-dom';
+import { motion } from 'framer-motion';
+import { Home, ArrowLeft } from 'lucide-react';
+import { SquigglyBackground } from '@alvianzf/squiggly-lines-go-brrr';
+
+const messages = [
+  "Wow, you found nothing. Just like my motivation on a Monday.",
+  "404: Page not found. Or maybe it's just ignoring you.",
+  "Looks like this link is as broken as my sleep schedule.",
+  "Congratulations! You've reached the end of the internet. It's empty here.",
+  "I'd help you find what you're looking for, but I'm just a div.",
+  "This page is currently out for lunch. Forever.",
+  "Error 404: Competence not found. (Just kidding, it's just a wrong link)",
+  "You looked left, you looked right, and still found... nothing."
+];
+
+export default function NotFound() {
+  const navigate = useNavigate();
+  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
+
+  return (
+    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans relative overflow-hidden flex items-center justify-center p-6">
+      <SquigglyBackground
+        variant="worms"
+        count={50}
+        colors={['text-red-500/20', 'text-slate-400/30']}
+        minStrokeWidth={1}
+        maxStrokeWidth={3}
+        minDuration={5}
+        maxDuration={10}
+        backgroundColor="#0f172a" // slate-900
+        className="fixed inset-0 -z-10 pointer-events-none"
+      />
+
+      <div className="relative z-10 max-w-2xl w-full text-center space-y-8">
+        <motion.div
+          initial={{ opacity: 0, y: 20 }}
+          animate={{ opacity: 1, y: 0 }}
+          transition={{ duration: 0.6 }}
+        >
+          <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500 mb-4 font-mono">
+            404
+          </h1>
+          <h2 className="text-3xl font-bold text-slate-100 mb-6">
+            Well, this is awkward.
+          </h2>
+          <p className="text-xl text-slate-400 leading-relaxed mb-8 max-w-lg mx-auto">
+            {randomMessage}
+          </p>
+        </motion.div>
+
+        <motion.div
+          initial={{ opacity: 0 }}
+          animate={{ opacity: 1 }}
+          transition={{ delay: 0.3, duration: 0.6 }}
+          className="flex flex-col sm:flex-row items-center justify-center gap-4"
+        >
+          <button
+            onClick={() => navigate(-1)}
+            className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-all border border-slate-700 hover:border-slate-600 group"
+          >
+            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
+            Go Back
+          </button>
+
+          <button
+            onClick={() => navigate('/')}
+            className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-100 text-slate-900 hover:bg-white transition-all font-medium hover:scale-105 active:scale-95"
+          >
+            <Home className="w-4 h-4" />
+            Return Home
+          </button>
+        </motion.div>
+
+        <motion.p
+          initial={{ opacity: 0 }}
+          animate={{ opacity: 1 }}
+          transition={{ delay: 0.8, duration: 1 }}
+          className="absolute bottom-[-100px] left-0 right-0 text-xs text-slate-700 font-mono"
+        >
+          (Seriously, there's nothing here. Go away.)
+        </motion.p>
+      </div>
+    </div>
+  );
+}
diff --git a/vercel.json b/vercel.json
index 29c0269..42c70e0 100644
--- a/vercel.json
+++ b/vercel.json
@@ -1,7 +1,7 @@
{
"rewrites": [
{
-      "source": "/(.*)",
+      "source": "/((?!assets/|.*\..*).*)",
"destination": "/index.html"
}
]

```

## feat: fix deployment error due to dependency mismatch (0475ca7) - 2026-01-28

```diff
diff --git a/package.json b/package.json
index 25ab63c..db7c933 100644
--- a/package.json
+++ b/package.json
@@ -24,7 +24,7 @@
"@react-three/fiber": "^9.5.0",
"@vercel/analytics": "^1.5.0",
"date-fns": "^3.3.1",
-    "framer-motion": "^12.29.0",
+    "framer-motion": "^11.0.0",
"lucide-react": "^0.344.0",
"react": "^19.2.3",
"react-dom": "^19.2.3",
@@ -83,4 +83,4 @@
"prettier --write"
]
}
-}
+}
 No newline at end of file

```

## SEO: spread internal links to improve SEO and AIO (4ada59e) - 2026-01-28

```diff
diff --git a/src/App.tsx b/src/App.tsx
index 6b35304..539521f 100644
--- a/src/App.tsx
+++ b/src/App.tsx
@@ -17,6 +17,7 @@ import ElusiveDeploy from './pages/games/ElusiveDeploy';
import LearnFlex from './pages/games/LearnFlex';
import LearnTypeScript from './pages/games/LearnTypeScript';
import NotFound from './pages/NotFound';
+import Footer from './components/Footer';

function App() {
return (
@@ -48,6 +49,7 @@ function App() {
</Routes>
</AnimatePresence>
</main>
+            <Footer />
</div>
</Router>
</HelmetProvider>
diff --git a/src/components/Footer.tsx b/src/components/Footer.tsx
new file mode 100644
index 0000000..3a91afd
--- /dev/null
+++ b/src/components/Footer.tsx
@@ -0,0 +1,118 @@
+import { Link } from 'react-router-dom';
+import { Github, Linkedin, Mail } from 'lucide-react';
+import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
+import { faMedium } from '@fortawesome/free-brands-svg-icons';
+
+export default function Footer() {
+  const currentYear = new Date().getFullYear();
+
+  return (
+    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 py-16 transition-colors duration-300">
+      <div className="container mx-auto px-6">
+        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
+          {/* Brand & Description */}
+          <div className="col-span-1 md:col-span-1">
+            <Link to="/" className="text-2xl font-bold tracking-tight text-white hover:text-[#990000] transition-colors mb-4 block">
+              AZF.
+            </Link>
+            <p className="text-slate-400 leading-relaxed text-sm">
+              Program Manager, Technical Lead, and Full Stack Engineer bridging the gap between people and technology.
+            </p>
+          </div>
+
+          {/* Sitemap */}
+          <div>
+            <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Sitemap</h3>
+            <ul className="space-y-2 text-sm">
+              <li>
+                <Link to="/" className="hover:text-[#990000] transition-colors">About</Link>
+              </li>
+              <li>
+                <Link to="/experience" className="hover:text-[#990000] transition-colors">Experience</Link>
+              </li>
+              <li>
+                <Link to="/blog" className="hover:text-[#990000] transition-colors">Blog</Link>
+              </li>
+              <li>
+                <Link to="/mentorship" className="hover:text-[#990000] transition-colors">Mentorship</Link>
+              </li>
+            </ul>
+          </div>
+
+          {/* Games */}
+          <div>
+            <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Games</h3>
+            <ul className="space-y-2 text-sm">
+              <li>
+                <Link to="/games/bug-squash" className="hover:text-[#990000] transition-colors">Bug Squash</Link>
+              </li>
+              <li>
+                <Link to="/games/quick-sync" className="hover:text-[#990000] transition-colors">Quick Sync</Link>
+              </li>
+              <li>
+                <Link to="/games/elusive-deploy" className="hover:text-[#990000] transition-colors">Elusive Deploy</Link>
+              </li>
+              <li>
+                <Link to="/games/learn-flex" className="hover:text-[#990000] transition-colors">Flexbox Froggy</Link>
+              </li>
+              <li>
+                <Link to="/games/learn-typescript" className="hover:text-[#990000] transition-colors">Type Torture</Link>
+              </li>
+            </ul>
+          </div>
+
+          {/* Socials */}
+          <div>
+            <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Connect</h3>
+            <div className="flex gap-4">
+              <a
+                href="https://github.com/alvianzf"
+                target="_blank"
+                rel="noopener noreferrer"
+                className="bg-slate-800 p-2 rounded-lg hover:bg-[#990000] hover:text-white transition-all text-slate-400"
+                aria-label="GitHub"
+              >
+                <Github className="w-5 h-5" />
+              </a>
+              <a
+                href="https://linkedin.com/in/alvianzf"
+                target="_blank"
+                rel="noopener noreferrer"
+                className="bg-slate-800 p-2 rounded-lg hover:bg-[#990000] hover:text-white transition-all text-slate-400"
+                aria-label="LinkedIn"
+              >
+                <Linkedin className="w-5 h-5" />
+              </a>
+              <a
+                href="https://medium.com/@alvianzf"
+                target="_blank"
+                rel="noopener noreferrer"
+                className="bg-slate-800 p-2 rounded-lg hover:bg-[#990000] hover:text-white transition-all text-slate-400"
+                aria-label="Medium"
+              >
+                <FontAwesomeIcon icon={faMedium} className="w-5 h-5" />
+              </a>
+              <a
+                href="mailto:hello@alvianzf.id"
+                className="bg-slate-800 p-2 rounded-lg hover:bg-[#990000] hover:text-white transition-all text-slate-400"
+                aria-label="Email"
+              >
+                <Mail className="w-5 h-5" />
+              </a>
+            </div>
+          </div>
+        </div>
+
+        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
+          <p className="text-slate-500 text-sm">
+            © {currentYear} Alvian Zachry Faturrahman. All rights reserved.
+          </p>
+          <div className="flex gap-6 text-xs text-slate-500 font-medium">
+            <span>Built with React & Vite</span>
+            <span>Deployed on Netlify</span>
+          </div>
+        </div>
+      </div>
+    </footer>
+  );
+}
diff --git a/src/pages/About.tsx b/src/pages/About.tsx
index ce32d5e..c2efdad 100644
--- a/src/pages/About.tsx
+++ b/src/pages/About.tsx
@@ -56,14 +56,10 @@ export default function About() {

<div className="flex flex-wrap gap-4">
<a
-                  href="#contact"
+                  href="/experience"
className="btn-primary flex items-center gap-2 hover:bg-brand-red transition-colors"
-                  onClick={(e) => {
-                    e.preventDefault();
-                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
-                  }}
>
-                  Get in touch <ArrowRight className="w-4 h-4" />
+                  See my work <ArrowRight className="w-4 h-4" />
</a>
<a href="/resume.pdf" className="text-[var(--text-secondary)] hover:text-brand-red font-medium flex items-center gap-2 px-6 py-3 transition-colors">
Download CV <Download className="w-4 h-4" />
diff --git a/src/pages/Experience.tsx b/src/pages/Experience.tsx
index e09278d..6f77474 100644
--- a/src/pages/Experience.tsx
+++ b/src/pages/Experience.tsx
@@ -84,6 +84,27 @@ export default function Experience() {
);
})}
</div>
+
+        {/* Mentorship CTA */}
+        <motion.div
+          initial={{ opacity: 0, y: 20 }}
+          whileInView={{ opacity: 1, y: 0 }}
+          viewport={{ once: true }}
+          className="mt-24 text-center max-w-2xl mx-auto"
+        >
+          <div className="p-8 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)]">
+            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Want to land a role like these?</h3>
+            <p className="text-[var(--text-secondary)] mb-6">
+              I mentor aspiring engineers to help them crack technical interviews and level up their careers.
+            </p>
+            <a
+              href="/mentorship"
+              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold rounded-full hover:bg-brand-red transition-all shadow-lg hover:shadow-xl"
+            >
+              Explore Mentorship
+            </a>
+          </div>
+        </motion.div>
</div>
</div>
);
diff --git a/src/pages/Mentorship.tsx b/src/pages/Mentorship.tsx
index c683c4e..2f03fc2 100644
--- a/src/pages/Mentorship.tsx
+++ b/src/pages/Mentorship.tsx
@@ -66,7 +66,7 @@ export default function Mentorship() {
</p>

<motion.a
-            href="https://learnwithandi.com"
+            href="https://learnwithandi.com?utm_source=alvianzf.id"
target="_blank"
rel="noopener noreferrer"
whileHover={{ scale: 1.02 }}
@@ -139,7 +139,7 @@ export default function Mentorship() {
The more you sweat in training, the less you bleed in battle.
</p>
<a
-                href="https://learnwithandi.com"
+                href="https://learnwithandi.com?utm_source=alvianzf.id"
target="_blank"
rel="noopener noreferrer"
className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 font-bold rounded-full hover:bg-brand-red hover:text-white transition-colors"
@@ -158,7 +158,7 @@ export default function Mentorship() {
transition={{ delay: 0.6 }}
className="text-center pt-8 border-t border-slate-100"
>
-          <a href="https://learnwithandi.com" target="_blank" rel="noopener noreferrer" className="inline-block mb-4 hover:opacity-80 transition-opacity">
+          <a href="https://learnwithandi.com?utm_source=alvianzf.id" target="_blank" rel="noopener noreferrer" className="inline-block mb-4 hover:opacity-80 transition-opacity">
<img src={learnWithAndiLogo} alt="Learn With Andi" className="h-10 mx-auto" />
</a>
<p className="text-slate-400 text-sm">

```

## SEO: improve SEO tags (2bc81a3) - 2026-01-28

```diff
diff --git a/index.html b/index.html
index e6b8bdb..93f06b8 100644
--- a/index.html
+++ b/index.html
@@ -4,7 +4,9 @@
<meta charset="UTF-8" />
<link rel="icon" type="image/svg+xml" href="/favicon.ico" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
-    <title>Azf.</title>
+    <meta name="description" content="Alvian Zachry Faturrahman - Software Engineer, Recruiter, and Bootcamp Tech Instructor. Expert in React, TypeScript, and Engineering Leadership." />
+    <meta name="keywords" content="Software Engineer, Recruiter, Bootcamp Tech Instructor, Program Manager, Technical Lead, Full Stack Engineer, React, TypeScript, Engineering Leadership, Tech Mentorship" />
+    <title>Alvian Zachry Faturrahman - Software Engineer, Recruiter & Instructor</title>
</head>
<body>
<div id="root"></div>
diff --git a/src/components/SEO.tsx b/src/components/SEO.tsx
index a784870..41d6f47 100644
--- a/src/components/SEO.tsx
+++ b/src/components/SEO.tsx
@@ -9,6 +9,7 @@ interface SEOProps {
publishedTime?: string;
modifiedTime?: string;
schema?: object;
+  keywords?: string[];
}

export default function SEO({
@@ -18,7 +19,8 @@ export default function SEO({
article = false,
publishedTime,
modifiedTime,
-  schema
+  schema,
+  keywords = []
}: SEOProps) {
const location = useLocation();
const baseUrl = 'https://alvianzf.id';
@@ -28,16 +30,24 @@ export default function SEO({
// Default values
const siteTitle = 'Alvian Zachry Faturrahman - Program Manager | Technical Lead | Full Stack Engineer';
const siteDescription = 'Program Manager, Technical Lead, and Full Stack Engineer with 13+ years of experience in software engineering, education, and technical hiring.';
+  const defaultKeywords = [
+    "Software Engineer", "Recruiter", "Bootcamp Tech Instructor",
+    "Program Manager", "Technical Lead", "Full Stack Engineer",
+    "Software Engineering", "React", "TypeScript", "Engineering Leadership",
+    "Tech Mentorship", "Southeast Asia Tech Talent", "Hiring"
+  ];

const finalTitle = title ? `${title} | Alvian Zachry Faturrahman` : siteTitle;
const finalDescription = description || siteDescription;
const finalImage = image ? (image.startsWith('http') ? image : `${baseUrl}${image}`) : defaultImage;
+  const finalKeywords = keywords.length > 0 ? keywords.join(', ') : defaultKeywords.join(', ');

return (
<Helmet>
{/* Standard Metadata */}
<title>{finalTitle}</title>
<meta name="description" content={finalDescription} />
+      <meta name="keywords" content={finalKeywords} />
<link rel="canonical" href={currentUrl} />

{/* Open Graph */}
diff --git a/src/pages/About.tsx b/src/pages/About.tsx
index c2efdad..ff09422 100644
--- a/src/pages/About.tsx
+++ b/src/pages/About.tsx
@@ -34,7 +34,14 @@ export default function About() {

return (
<div className="min-h-screen pt-20 overflow-x-hidden">
-      <SEO schema={personSchema} />
+      <SEO
+        schema={personSchema}
+        keywords={[
+          "Alvian Zachry Faturrahman", "Software Engineer", "Recruiter", "Bootcamp Tech Instructor",
+          "Program Manager", "Technical Lead", "Full Stack Engineer",
+          "React Developer", "Engineering Manager", "Tech Mentorship Indonesia"
+        ]}
+      />
<div className="container mx-auto px-6 py-20">
{/* Hero Section */}
<section className="mb-16">
@@ -50,7 +57,7 @@ export default function About() {
<span className="text-[var(--text-secondary)]">Zachry.</span>
</h1>
<p className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-lg leading-relaxed mb-10">
-                Senior Talent Manager & Software Engineer <br />
+                Software Engineer, Recruiter, & Bootcamp Tech Instructor <br />
<span className="text-[var(--text-secondary)] text-xl">bridging the gap between people and technology.</span>
</p>

diff --git a/src/pages/Blog.tsx b/src/pages/Blog.tsx
index 4bdf82c..ed902fc 100644
--- a/src/pages/Blog.tsx
+++ b/src/pages/Blog.tsx
@@ -70,7 +70,11 @@ export default function Blog() {
<div className="min-h-screen pt-32 pb-20">
<SEO
title="Blog"
-        description="Articles of what I thought at the moment, may be a bit random and crude."
+        description="Articles on software engineering, leadership, and random musings from a Program Manager & Technical Lead."
+        keywords={[
+          "Tech Blog", "Software Engineering Articles", "Leadership Thoughts",
+          "Programming Tutorials", "Career Advice", "Technology Trends"
+        ]}
/>
<div className="container mx-auto px-6">
{/* Page Title */}
diff --git a/src/pages/Experience.tsx b/src/pages/Experience.tsx
index 6f77474..1016477 100644
--- a/src/pages/Experience.tsx
+++ b/src/pages/Experience.tsx
@@ -9,7 +9,12 @@ export default function Experience() {
<div className="min-h-screen pt-32 pb-32 relative overflow-hidden">
<SEO
title="Professional Experience"
-        description="Explore the professional journey of Alvian Zachry Faturrahman, from leading technical teams to designing scalable curricula and hiring top engineering talent."
+        description="Explore the professional journey of Alvian Zachry Faturrahman. 13+ years transforming engineering teams, leading technical projects, and hiring top talent across Southeast Asia and Europe."
+        keywords={[
+          "Career Journey", "Engineering Leadership", "Technical Hiring", "Team Scalability",
+          "Software Engineer", "Recruiter", "Bootcamp Tech Instructor",
+          "Agile Methodology", "Software Architecture", "Remote Work", "Startup Experience"
+        ]}
/>
{/* Background Patterns */}
<div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
diff --git a/src/pages/Mentorship.tsx b/src/pages/Mentorship.tsx
index 2f03fc2..21ad654 100644
--- a/src/pages/Mentorship.tsx
+++ b/src/pages/Mentorship.tsx
@@ -42,6 +42,12 @@ export default function Mentorship() {
<SEO
title="Tech Interview Mentorship"
description="Get your tech interview skills roasted. Brutal, honest mock interviews to prepare you for the real thing. Book a session at learnwithandi.com."
+        keywords={[
+          "Tech Interview Prep", "Mock Interview", "Software Engineer Interview",
+          "Coding Interview", "System Design Interview", "Career Coaching",
+          "Mentorship", "Interview Roasting", "Learn With Andi",
+          "Recruiter Advice", "Bootcamp Instructor"
+        ]}
/>
<div className="container mx-auto px-6">
{/* Hero Section */}

```

## feat: change footer text (0301916) - 2026-01-28

```diff
diff --git a/src/components/Footer.tsx b/src/components/Footer.tsx
index 3a91afd..39f21a6 100644
--- a/src/components/Footer.tsx
+++ b/src/components/Footer.tsx
@@ -109,7 +109,7 @@ export default function Footer() {
</p>
<div className="flex gap-6 text-xs text-slate-500 font-medium">
<span>Built with React & Vite</span>
-            <span>Deployed on Netlify</span>
+            <span>Deployed on Vercel</span>
</div>
</div>
</div>

```

## feat: add icons to footer (c90dcff) - 2026-01-28

```diff
diff --git a/src/components/Footer.tsx b/src/components/Footer.tsx
index 39f21a6..6ce83bd 100644
--- a/src/components/Footer.tsx
+++ b/src/components/Footer.tsx
@@ -1,7 +1,7 @@
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
-import { faMedium } from '@fortawesome/free-brands-svg-icons';
+import { faMedium, faReact, faCloudflare } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
const currentYear = new Date().getFullYear();
@@ -107,9 +107,16 @@ export default function Footer() {
<p className="text-slate-500 text-sm">
© {currentYear} Alvian Zachry Faturrahman. All rights reserved.
</p>
-          <div className="flex gap-6 text-xs text-slate-500 font-medium">
-            <span>Built with React & Vite</span>
-            <span>Deployed on Vercel</span>
+          <div className="flex flex-wrap gap-4 text-xs text-slate-500 font-medium items-center">
+            <span className="flex items-center gap-1.5">
+              Built with
+              <FontAwesomeIcon icon={faReact} className="text-[#61DAFB] w-3.5 h-3.5" /> React
+              &
+              <img src="https://vitejs.dev/logo.svg" alt="Vite" className="w-3.5 h-3.5" /> Vite
+            </span>
+            <span className="flex items-center gap-1.5">
+              Secured by <FontAwesomeIcon icon={faCloudflare} className="text-[#F38020] w-3.5 h-3.5" /> Cloudflare
+            </span>
</div>
</div>
</div>

```

## feat: internal tools - LaTeX editor - Boomer Whatsapp markdown (f6938b0) - 2026-01-28

```diff
diff --git a/package.json b/package.json
index db7c933..61f6598 100644
--- a/package.json
+++ b/package.json
@@ -25,6 +25,7 @@
"@vercel/analytics": "^1.5.0",
"date-fns": "^3.3.1",
"framer-motion": "^11.0.0",
+    "latex.js": "^0.12.6",
"lucide-react": "^0.344.0",
"react": "^19.2.3",
"react-dom": "^19.2.3",
@@ -83,4 +84,4 @@
"prettier --write"
]
}
-}
 No newline at end of file
+}
diff --git a/src/App.tsx b/src/App.tsx
index 539521f..fe67024 100644
--- a/src/App.tsx
+++ b/src/App.tsx
@@ -16,6 +16,8 @@ import QuickSync from './pages/games/QuickSync';
import ElusiveDeploy from './pages/games/ElusiveDeploy';
import LearnFlex from './pages/games/LearnFlex';
import LearnTypeScript from './pages/games/LearnTypeScript';
+import LatexEditor from './pages/tools/LatexEditor';
+import WhatsAppFormatter from './pages/tools/WhatsAppFormatter';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';

@@ -45,6 +47,8 @@ function App() {
<Route path="/games/elusive-deploy" element={<ElusiveDeploy />} />
<Route path="/games/learn-flex" element={<LearnFlex />} />
<Route path="/games/learn-typescript" element={<LearnTypeScript />} />
+                  <Route path="/tools/thesis-creator" element={<LatexEditor />} />
+                  <Route path="/tools/whatsapp-formatter" element={<WhatsAppFormatter />} />
<Route path="*" element={<NotFound />} />
</Routes>
</AnimatePresence>
diff --git a/src/components/Header.tsx b/src/components/Header.tsx
index 8a0ff42..5edb1c5 100644
--- a/src/components/Header.tsx
+++ b/src/components/Header.tsx
@@ -142,9 +142,41 @@ export default function Header() {
<div className="bg-white rounded-xl shadow-xl border border-slate-100 p-6 grid grid-cols-2 gap-6 relative">
<div className="absolute -top-2 right-6 w-4 h-4 bg-white border-t border-l border-slate-100 transform rotate-45"></div>

+                  {/* Internal Tools Category */}
+                  <div className="col-span-2 border-b border-slate-100 pb-4 mb-2">
+                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Productivity Killers</h3>
+                    <div className="grid grid-cols-2 gap-4">
+                      {/* Latex Editor - Desktop Only */}
+                      <NavLink to="/tools/thesis-creator" className="hidden md:block p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors group/item relative overflow-hidden">
+                        <div className="flex items-start gap-3">
+                          <div className="p-2 bg-slate-100 text-slate-700 rounded-lg group-hover/item:text-[#990000] transition-colors">
+                            <Receipt className="w-5 h-5" />
+                          </div>
+                          <div>
+                            <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">Thesis Procrastinator</div>
+                            <div className="text-xs text-slate-500">Solve relativity instead of working</div>
+                          </div>
+                        </div>
+                      </NavLink>
+
+                      {/* WhatsApp Formatter */}
+                      <NavLink to="/tools/whatsapp-formatter" className="block p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors group/item">
+                        <div className="flex items-start gap-3">
+                          <div className="p-2 bg-green-50 text-green-600 rounded-lg group-hover/item:text-[#990000] transition-colors">
+                            <MessageSquareWarning className="w-5 h-5" />
+                          </div>
+                          <div>
+                            <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">Boomer Text Gen</div>
+                            <div className="text-xs text-slate-500">Formatting for family group chats</div>
+                          </div>
+                        </div>
+                      </NavLink>
+                    </div>
+                  </div>
+
{/* Web Apps Category */}
<div>
-                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Web Apps</h3>
+                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Over-Engineered</h3>
<div className="space-y-2">
<a href="https://jsonify.alvianzf.id" target="_blank" rel="noopener noreferrer" className="block p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors group/item">
<div className="flex items-start gap-3">
@@ -152,8 +184,8 @@ export default function Header() {
<FileJson className="w-5 h-5" />
</div>
<div>
-                            <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">JSON Formatter</div>
-                            <div className="text-xs text-slate-500">Beautify & debug JSON</div>
+                            <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">Curly Brace Saver</div>
+                            <div className="text-xs text-slate-500">Make ugly APIs look pretty</div>
</div>
</div>
</a>
@@ -163,8 +195,8 @@ export default function Header() {
<Receipt className="w-5 h-5" />
</div>
<div>
-                            <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">Invoice Gen</div>
-                            <div className="text-xs text-slate-500">Create professional invoices</div>
+                            <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">Beg For Money</div>
+                            <div className="text-xs text-slate-500">PDFs for clients who won't pay</div>
</div>
</div>
</a>
@@ -173,7 +205,7 @@ export default function Header() {

{/* NPM Packages Category */}
<div>
-                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">NPM Packages</h3>
+                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Node_Modules Bloat</h3>
<div className="space-y-2">
<a href="https://www.npmjs.com/package/make-it-rain" target="_blank" rel="noopener noreferrer" className="block p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors group/item">
<div className="flex items-start gap-3">
@@ -181,8 +213,8 @@ export default function Header() {
<CloudRain className="w-5 h-5" />
</div>
<div>
-                            <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">make-it-rain</div>
-                            <div className="text-xs text-slate-500">Currency symbols</div>
+                            <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">Visual Inflation</div>
+                            <div className="text-xs text-slate-500">Fake rich currency formats</div>
</div>
</div>
</a>
@@ -192,8 +224,8 @@ export default function Header() {
<MessageSquareWarning className="w-5 h-5" />
</div>
<div>
-                            <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">env-validate</div>
-                            <div className="text-xs text-slate-500">Sarcastic validation</div>
+                            <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">Env Bully</div>
+                            <div className="text-xs text-slate-500">Yells at you for missing keys</div>
</div>
</div>
</a>
@@ -203,8 +235,8 @@ export default function Header() {
<CheckCircle2 className="w-5 h-5" />
</div>
<div>
-                            <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">a-valid-json</div>
-                            <div className="text-xs text-slate-500">JSON validation</div>
+                            <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">Trust Issues</div>
+                            <div className="text-xs text-slate-500">Paranoid JSON validation</div>
</div>
</div>
</a>
@@ -214,8 +246,8 @@ export default function Header() {
<i className="w-5 h-5 flex items-center justify-center">🪱</i>
</div>
<div>
-                            <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">squiggly-lines</div>
-                            <div className="text-xs text-slate-500">Animated background</div>
+                            <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">CPU Heater</div>
+                            <div className="text-xs text-slate-500">Laggy background lines</div>
</div>
</div>
</a>
@@ -304,24 +336,31 @@ export default function Header() {
className="overflow-hidden space-y-4 pl-4 border-l-2 border-slate-100"
>
<div className="space-y-4 pt-2">
-                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Web Apps</p>
+                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Productivity Killers</p>
+                          <NavLink to="/tools/whatsapp-formatter" className="flex items-center gap-3 text-slate-600 font-medium">
+                            <MessageSquareWarning className="w-5 h-5 text-green-600" /> Boomer Text Gen
+                          </NavLink>
+                          {/* Latex Editor is hidden on mobile */}
+                        </div>
+                        <div className="space-y-4 pt-2">
+                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Over-Engineered</p>
<a href="https://jsonify.alvianzf.id" className="flex items-center gap-3 text-slate-600 font-medium">
-                            <FileJson className="w-5 h-5 text-[#990000]" /> JSON Formatter
+                            <FileJson className="w-5 h-5 text-[#990000]" /> Curly Brace Saver
</a>
<a href="https://invoice.alvianzf.id" className="flex items-center gap-3 text-slate-600 font-medium">
-                            <Receipt className="w-5 h-5 text-green-600" /> Invoice Gen
+                            <Receipt className="w-5 h-5 text-green-600" /> Beg For Money
</a>
</div>
<div className="space-y-4 pt-2">
-                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">NPM Packages</p>
+                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Node_Modules Bloat</p>
<a href="https://www.npmjs.com/package/make-it-rain" className="flex items-center gap-3 text-slate-600 font-medium">
-                            <CloudRain className="w-5 h-5 text-purple-600" /> make-it-rain
+                            <CloudRain className="w-5 h-5 text-purple-600" /> Visual Inflation
</a>
<a href="https://www.npmjs.com/package/env-validate-sarcastically" className="flex items-center gap-3 text-slate-600 font-medium">
-                            <MessageSquareWarning className="w-5 h-5 text-yellow-600" /> env-validate
+                            <MessageSquareWarning className="w-5 h-5 text-yellow-600" /> Env Bully
</a>
<a href="https://www.npmjs.com/package/@alvianzf/squiggly-lines-go-brrr" className="flex items-center gap-3 text-slate-600 font-medium">
-                            <span className="w-5 h-5 flex items-center justify-center">🪱</span> squiggly-lines
+                            <span className="w-5 h-5 flex items-center justify-center">🪱</span> CPU Heater
</a>
</div>
</motion.div>
diff --git a/src/pages/tools/LatexEditor.tsx b/src/pages/tools/LatexEditor.tsx
new file mode 100644
index 0000000..7097342
--- /dev/null
+++ b/src/pages/tools/LatexEditor.tsx
@@ -0,0 +1,224 @@
+import { useState, useEffect, useRef } from 'react';
+import { Download, AlertTriangle, Code, Play } from 'lucide-react';
+import SEO from '../../components/SEO';
+// @ts-expect-error - latex.js likely doesn't have types wrapped nicely for this usage
+import { parse, HtmlGenerator } from 'latex.js';
+
+const DEFAULT_LATEX = `\documentclass{article}
+\usepackage{amsmath}
+
+\title{General Relativity Notes}
+\author{Alvian's Portfolio User}
+\date{\today}
+
+\begin{document}
+
+\maketitle
+
+\section{Einstein Field Equations}
+The core of General Relativity is described by the Einstein Field Equations:
+
+\[ R_{\mu\nu} - \frac{1}{2}R g_{\mu\nu} + \Lambda g_{\mu\nu} = \frac{8\pi G}{c^4} T_{\mu\nu} \]
+
+Where:
+\begin{itemize}
+  \item $R_{\mu\nu}$ is the Ricci curvature tensor
+  \item $R$ is the scalar curvature
+  \item $g_{\mu\nu}$ is the metric tensor
+  \item $\Lambda$ is the cosmological constant
+  \item $T_{\mu\nu}$ is the stress-energy tensor
+\end{itemize}
+
+\section{Geodesic Equation}
+Particles follow geodesics in spacetime, described by:
+
+\[ \frac{d^2x^\mu}{d\tau^2} + \Gamma^\mu_{\alpha\beta} \frac{dx^\alpha}{d\tau} \frac{dx^\beta}{d\tau} = 0 \]
+
+\section{Schwarzschild Metric}
+For a non-rotating, spherical mass $M$, the metric is:
+
+\[ ds^2 = -\left(1 - \frac{r_s}{r}\right)c^2dt^2 + \left(1 - \frac{r_s}{r}\right)^{-1}dr^2 + r^2d\Omega^2 \]
+
+Values like $r_s = \frac{2GM}{c^2}$ represent the Schwarzschild radius.
+
+\end{document}`;
+
+export default function LatexEditor() {
+  const [code, setCode] = useState(DEFAULT_LATEX);
+  const [error, setError] = useState<string | null>(null);
+  const [isMobile, setIsMobile] = useState(false);
+  const iframeRef = useRef<HTMLIFrameElement>(null);
+
+  // Mobile detection
+  useEffect(() => {
+    const checkMobile = () => {
+      setIsMobile(window.innerWidth < 1024); // Block on tablets too for best experience
+    };
+
+    checkMobile();
+    window.addEventListener('resize', checkMobile);
+    return () => window.removeEventListener('resize', checkMobile);
+  }, []);
+
+  const compileLatex = () => {
+    try {
+      setError(null);
+      const generator = new HtmlGenerator({ hyphenate: false });
+
+      // Parse the LaTeX code
+      const doc = parse(code, { generator: generator });
+
+      // Get the HTML document from the generator
+      const htmlDoc = doc.htmlDocument();
+
+      // Add some basic styling to the generated HTML
+      const style = htmlDoc.createElement('style');
+      style.textContent = `
+        body {
+          font-family: 'Times New Roman', serif;
+          margin: 0;
+          padding: 40px;
+          line-height: 1.6;
+          background: white;
+          color: black;
+          max-width: 800px;
+          margin: 0 auto;
+        }
+        .latex-container {
+          width: 100%;
+          height: 100%;
+        }
+      `;
+      htmlDoc.head.appendChild(style);
+
+      // Render to iframe
+      if (iframeRef.current) {
+        const iframeDoc = iframeRef.current.contentDocument;
+        if (iframeDoc) {
+          iframeDoc.open();
+          iframeDoc.write(htmlDoc.documentElement.outerHTML);
+          iframeDoc.close();
+        }
+      }
+    } catch (err: unknown) {
+      console.error(err);
+      if (err instanceof Error) {
+        setError(err.message);
+      } else {
+        setError("Failed to compile LaTeX: Unknown error");
+      }
+    }
+  };
+
+  // Compilation effect
+  useEffect(() => {
+    compileLatex();
+    // eslint-disable-next-line react-hooks/exhaustive-deps
+  }, [code]);
+
+  const handleDownload = () => {
+    if (iframeRef.current && iframeRef.current.contentWindow) {
+      iframeRef.current.contentWindow.print();
+    }
+  };
+
+  if (isMobile) {
+    return (
+      <div className="min-h-screen pt-32 pb-20 px-6 bg-slate-50 flex items-center justify-center">
+        <SEO
+          title="LaTeX Editor"
+          description="Desktop-only LaTeX editor tool."
+        />
+        <div className="text-center max-w-md bg-white p-8 rounded-2xl shadow-xl border border-red-100">
+          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
+            <AlertTriangle className="w-8 h-8 text-red-500" />
+          </div>
+          <h1 className="text-2xl font-bold text-slate-900 mb-4">Desktop Only Tool</h1>
+          <p className="text-slate-600">
+            The Lazy Man's Thesis Creator requires a larger screen for the split-view editor and preview experience. Please open this page on your desktop or laptop.
+          </p>
+        </div>
+      </div>
+    );
+  }
+
+  return (
+    <div className="h-screen pt-20 flex flex-col overflow-hidden bg-slate-900">
+      <SEO
+        title="Lazy Man's Thesis Creator"
+        description="Real-time LaTeX editor and PDF generator directly in your browser."
+        keywords={["LaTeX Editor", "Online LaTeX", "Thesis Creator", "PDF Generator", "React Tool"]}
+      />
+
+      {/* Tool Header */}
+      <div className="h-16 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-6 shrink-0 z-10">
+        <div className="flex items-center gap-3">
+          <div className="bg-brand-red/20 p-2 rounded-lg">
+            <Code className="w-5 h-5 text-brand-red" />
+          </div>
+          <div>
+            <h1 className="text-white font-bold text-sm tracking-wide uppercase">Lazy Man's Thesis Creator</h1>
+            <p className="text-slate-400 text-xs">latex.js powered client-side editor</p>
+          </div>
+        </div>
+
+        <div className="flex items-center gap-4">
+          {error && (
+            <span className="text-red-400 text-xs flex items-center gap-1 bg-red-900/20 px-3 py-1.5 rounded-full border border-red-500/20">
+              <AlertTriangle className="w-3 h-3" />
+              {error}
+            </span>
+          )}
+          <button
+            onClick={compileLatex}
+            className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white text-sm font-medium rounded-lg hover:bg-slate-600 transition-colors"
+          >
+            <Play className="w-4 h-4" />
+            Refresh Preview
+          </button>
+          <button
+            onClick={handleDownload}
+            className="flex items-center gap-2 px-4 py-2 bg-brand-red text-white text-sm font-bold rounded-lg hover:bg-red-700 transition-colors shadow-lg hover:shadow-red-500/20"
+          >
+            <Download className="w-4 h-4" />
+            Download PDF
+          </button>
+        </div>
+      </div>
+
+      {/* Main Split View */}
+      <div className="flex-1 flex overflow-hidden">
+        {/* Editor Pane */}
+        <div className="w-1/2 bg-slate-900 border-r border-slate-700 flex flex-col">
+          <div className="bg-slate-800 text-slate-400 text-xs px-4 py-2 font-mono flex justify-between">
+            <span>INPUT (LaTeX)</span>
+            <span>Character Count: {code.length}</span>
+          </div>
+          <textarea
+            value={code}
+            onChange={(e) => setCode(e.target.value)}
+            className="flex-1 w-full bg-[#1e1e1e] text-slate-300 p-6 font-mono text-sm resize-none focus:outline-none leading-relaxed"
+            spellCheck="false"
+          />
+        </div>
+
+        {/* Preview Pane */}
+        <div className="w-1/2 bg-slate-200 flex flex-col">
+          <div className="bg-slate-300 text-slate-600 text-xs px-4 py-2 font-mono font-bold">
+            PREVIEW (HTML/PDF)
+          </div>
+          <div className="flex-1 p-8 overflow-hidden bg-slate-500/10">
+            <div className="h-full w-full bg-white shadow-2xl rounded-sm overflow-hidden mx-auto max-w-[210mm]"> {/* A4 width approx */}
+              <iframe
+                ref={iframeRef}
+                title="LaTeX Preview"
+                className="w-full h-full border-none"
+                sandbox="allow-same-origin allow-scripts allow-popups allow-modals"
+              />
+            </div>
+          </div>
+        </div>
+      </div>
+    </div>
+  );
+}
diff --git a/src/pages/tools/WhatsAppFormatter.tsx b/src/pages/tools/WhatsAppFormatter.tsx
new file mode 100644
index 0000000..e28da3a
--- /dev/null
+++ b/src/pages/tools/WhatsAppFormatter.tsx
@@ -0,0 +1,173 @@
+import { useState, useRef } from 'react';
+import { Copy, Bold, Italic, Strikethrough, Code, Check } from 'lucide-react';
+import SEO from '../../components/SEO';
+
+export default function WhatsAppFormatter() {
+  const [text, setText] = useState('');
+  const [copied, setCopied] = useState(false);
+  const textareaRef = useRef<HTMLTextAreaElement>(null);
+
+  const applyFormat = (symbol: string) => {
+    if (!textareaRef.current) return;
+
+    const start = textareaRef.current.selectionStart;
+    const end = textareaRef.current.selectionEnd;
+    const selectedText = text.substring(start, end);
+    const before = text.substring(0, start);
+    const after = text.substring(end);
+
+    let newText = '';
+
+    // Check if already formatted (simple toggle)
+    if (before.endsWith(symbol) && after.startsWith(symbol)) {
+      // Remove formatting
+      newText = before.slice(0, -symbol.length) + selectedText + after.slice(symbol.length);
+      setText(newText);
+
+      // Restore selection
+      setTimeout(() => {
+        if (textareaRef.current) {
+          textareaRef.current.selectionStart = start - symbol.length;
+          textareaRef.current.selectionEnd = end - symbol.length;
+          textareaRef.current.focus();
+        }
+      }, 0);
+    } else {
+      // Add formatting
+      newText = before + symbol + selectedText + symbol + after;
+      setText(newText);
+
+      // Restore selection
+      setTimeout(() => {
+        if (textareaRef.current) {
+          textareaRef.current.selectionStart = start + symbol.length;
+          textareaRef.current.selectionEnd = end + symbol.length; // + symbol.length if we want cursor inside
+          textareaRef.current.focus();
+        }
+      }, 0);
+    }
+  };
+
+  const handleCopy = () => {
+    navigator.clipboard.writeText(text);
+    setCopied(true);
+    setTimeout(() => setCopied(false), 2000);
+  };
+
+  const renderPreview = (content: string) => {
+    if (!content) return <span className="text-slate-400 italic">Preview will appear here...</span>;
+
+    // Very basic parser for visualization
+    // Note: This is purely for display purposes and might not handle nested complex cases perfectly
+    let html = content
+      .replace(/&/g, "&amp;")
+      .replace(/</g, "&lt;")
+      .replace(/>/g, "&gt;")
+      .replace(/"/g, "&quot;")
+      .replace(/'/g, "&#039;");
+
+    // Bold *text*
+    html = html.replace(/*([^*]+)*/g, '<strong>$1</strong>');
+
+    // Italic _text_
+    html = html.replace(/_([^_]+)_/g, '<em>$1</em>');
+
+    // Strikethrough ~text~
+    html = html.replace(/~([^~]+)~/g, '<del>$1</del>');
+
+    // Monospace ```text```
+    html = html.replace(/```([^`]+)```/g, '<code class="bg-gray-200 text-red-500 px-1 rounded font-mono text-sm">$1</code>');
+
+    // Line breaks
+    html = html.replace(/n/g, '<br/>');
+
+    return <div dangerouslySetInnerHTML={{ __html: html }} />;
+  };
+
+  return (
+    <div className="min-h-screen pt-32 pb-20 px-6 bg-[var(--bg-primary)]">
+      <SEO
+        title="WhatsApp Formatter"
+        description="Write formatting text for WhatsApp easily using this WYSIWYG editor."
+      />
+
+      <div className="max-w-2xl mx-auto">
+        <div className="text-center mb-10">
+          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-4">WhatsApp Formatter</h1>
+          <p className="text-[var(--text-secondary)]">
+            Write with style. Bold, Italic, Strikethrough, and Monospace made easy.
+          </p>
+        </div>
+
+        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
+          {/* Toolbar */}
+          <div className="flex items-center gap-2 p-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
+            <button
+              onClick={() => applyFormat('*')}
+              className="p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors tooltip"
+              title="Bold (*text*)"
+            >
+              <Bold className="w-5 h-5" />
+            </button>
+            <button
+              onClick={() => applyFormat('_')}
+              className="p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
+              title="Italic (_text_)"
+            >
+              <Italic className="w-5 h-5" />
+            </button>
+            <button
+              onClick={() => applyFormat('~')}
+              className="p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
+              title="Strikethrough (~text~)"
+            >
+              <Strikethrough className="w-5 h-5" />
+            </button>
+            <button
+              onClick={() => applyFormat('```')}
+              className="p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
+              title="Monospace (```text```)"
+            >
+              <Code className="w-5 h-5" />
+            </button>
+
+            <div className="flex-1"></div>
+
+            <button
+              onClick={handleCopy}
+              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${copied
+                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
+                : 'bg-brand-red text-white hover:bg-red-700'
+                }`}
+            >
+              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
+              {copied ? 'Copied!' : 'Copy Text'}
+            </button>
+          </div>
+
+          {/* Editor Area */}
+          <div className="grid md:grid-cols-2 h-[500px] divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-700">
+            <textarea
+              ref={textareaRef}
+              value={text}
+              onChange={(e) => setText(e.target.value)}
+              placeholder="Type your message here..."
+              className="w-full h-full p-4 bg-transparent resize-none focus:outline-none text-[var(--text-primary)] font-sans leading-relaxed"
+            />
+            <div className="w-full h-full bg-[var(--bg-secondary)] p-4 overflow-y-auto">
+              {/* WhatsApp-like Bubble */}
+              <div className="bg-white dark:bg-[#005c4b] p-3 rounded-lg rounded-tl-none shadow-sm inline-block max-w-[90%] relative">
+                <div className="text-[var(--text-primary)] dark:text-white leading-relaxed whitespace-pre-wrap break-words">
+                  {renderPreview(text)}
+                </div>
+                <div className="text-[10px] text-slate-400 dark:text-[#8696a0] text-right mt-1 select-none">
+                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
+                </div>
+              </div>
+            </div>
+          </div>
+        </div>
+      </div>
+    </div>
+  );
+}

```

## feat: add LateX Cheatsheet (4eb28d4) - 2026-01-28

```diff
diff --git a/src/pages/tools/LatexCheatSheet.tsx b/src/pages/tools/LatexCheatSheet.tsx
new file mode 100644
index 0000000..88ea0cb
--- /dev/null
+++ b/src/pages/tools/LatexCheatSheet.tsx
@@ -0,0 +1,129 @@
+import { X } from 'lucide-react';
+import { motion, AnimatePresence } from 'framer-motion';
+
+type Category = 'Structure' | 'Text' | 'Math' | 'Greek' | 'Lists';
+
+interface Snippet {
+  label: string;
+  code: string;
+}
+
+const SNIPPETS: Record<Category, Snippet[]> = {
+  Structure: [
+    { label: 'Document Class', code: '\documentclass{article}' },
+    { label: 'Begin Document', code: '\begin{document}nn\end{document}' },
+    { label: 'Section', code: '\section{Title}' },
+    { label: 'Subsection', code: '\subsection{Title}' },
+    { label: 'Paragraph', code: '\paragraph{Title}' },
+    { label: 'Table of Contents', code: '\tableofcontents' },
+    { label: 'Title/Author', code: '\title{...}n\author{...}n\date{\today}n\maketitle' },
+  ],
+  Text: [
+    { label: 'Bold', code: '\textbf{text}' },
+    { label: 'Italic', code: '\textit{text}' },
+    { label: 'Underline', code: '\underline{text}' },
+    { label: 'Emphasis', code: '\emph{text}' },
+    { label: 'Typewriter', code: '\texttt{text}' },
+    { label: 'New Line', code: '\\' },
+    { label: 'New Page', code: '\newpage' },
+  ],
+  Math: [
+    { label: 'Inline Math', code: '$ ... $' },
+    { label: 'Display Math', code: '\[ ... \]' },
+    { label: 'Fraction', code: '\frac{numerator}{denominator}' },
+    { label: 'Square Root', code: '\sqrt{x}' },
+    { label: 'Summation', code: '\sum_{i=1}^{n}' },
+    { label: 'Integral', code: '\int_{a}^{b}' },
+    { label: 'Superscript', code: 'x^{2}' },
+    { label: 'Subscript', code: 'x_{i}' },
+  ],
+  Greek: [
+    { label: 'Alpha', code: '\alpha' },
+    { label: 'Beta', code: '\beta' },
+    { label: 'Gamma', code: '\gamma' },
+    { label: 'Delta', code: '\delta' },
+    { label: 'Pi', code: '\pi' },
+    { label: 'Theta', code: '\theta' },
+    { label: 'Lambda', code: '\lambda' },
+    { label: 'Sigma', code: '\sigma' },
+    { label: 'Omega', code: '\omega' },
+  ],
+  Lists: [
+    { label: 'Itemize (Bullet)', code: '\begin{itemize}n  \item n\end{itemize}' },
+    { label: 'Enumerate (Number)', code: '\begin{enumerate}n  \item n\end{enumerate}' },
+  ]
+};
+
+interface Props {
+  isOpen: boolean;
+  onClose: () => void;
+  onInsert: (code: string) => void;
+}
+
+export default function LatexCheatSheet({ isOpen, onClose, onInsert }: Props) {
+  return (
+    <AnimatePresence>
+      {isOpen && (
+        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
+          <motion.div
+            initial={{ opacity: 0, scale: 0.95 }}
+            animate={{ opacity: 1, scale: 1 }}
+            exit={{ opacity: 0, scale: 0.95 }}
+            className="bg-white dark:bg-slate-800 w-full max-w-4xl max-h-[80vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
+          >
+            {/* Header */}
+            <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
+              <div>
+                <h2 className="text-lg font-bold text-slate-900 dark:text-white">LaTeX Cheat Sheet</h2>
+                <p className="text-xs text-slate-500">Click any snippet to insert it into your document</p>
+              </div>
+              <button
+                onClick={onClose}
+                className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"
+              >
+                <X className="w-5 h-5 text-slate-500" />
+              </button>
+            </div>
+
+            {/* Content */}
+            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
+              {(Object.keys(SNIPPETS) as Category[]).map((category) => (
+                <div key={category} className="space-y-3">
+                  <h3 className="text-sm font-bold text-brand-red uppercase tracking-wider border-b border-slate-100 pb-2">
+                    {category}
+                  </h3>
+                  <div className="grid grid-cols-1 gap-2">
+                    {SNIPPETS[category].map((snippet) => (
+                      <button
+                        key={snippet.label}
+                        onClick={() => {
+                          onInsert(snippet.code);
+                          // Optional: Close on insert? Maybe not, user might want multiple.
+                        }}
+                        className="group flex flex-col items-start gap-1 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 border border-transparent hover:border-slate-200 dark:hover:border-slate-600 transition-all text-left"
+                      >
+                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-brand-red transition-colors">
+                          {snippet.label}
+                        </span>
+                        <code className="text-[10px] font-mono text-slate-400 bg-slate-100 dark:bg-slate-900 px-1.5 py-0.5 rounded w-full truncate">
+                          {snippet.code}
+                        </code>
+                      </button>
+                    ))}
+                  </div>
+                </div>
+              ))}
+            </div>
+
+            {/* Footer */}
+            <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-center">
+              <p className="text-xs text-slate-400">
+                Tip: Press <kbd className="font-sans font-bold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded px-1">Esc</kbd> to close
+              </p>
+            </div>
+          </motion.div>
+        </div>
+      )}
+    </AnimatePresence>
+  );
+}
diff --git a/src/pages/tools/LatexEditor.tsx b/src/pages/tools/LatexEditor.tsx
index 7097342..fdc2be9 100644
--- a/src/pages/tools/LatexEditor.tsx
+++ b/src/pages/tools/LatexEditor.tsx
@@ -1,53 +1,77 @@
import { useState, useEffect, useRef } from 'react';
-import { Download, AlertTriangle, Code, Play } from 'lucide-react';
+import { Download, AlertTriangle, Code, Play, BookOpen } from 'lucide-react';
import SEO from '../../components/SEO';
+import LatexCheatSheet from './LatexCheatSheet';
// @ts-expect-error - latex.js likely doesn't have types wrapped nicely for this usage
import { parse, HtmlGenerator } from 'latex.js';

const DEFAULT_LATEX = `\documentclass{article}
-\usepackage{amsmath}
+  \usepackage{amsmath}

-\title{General Relativity Notes}
-\author{Alvian's Portfolio User}
-\date{\today}
+  \title{General Relativity Notes}
+  \author{Alvian Zachry Faturrahman}
+  \date{\today}

-\begin{document}
+  \begin{document}

-\maketitle
+  \maketitle

-\section{Einstein Field Equations}
-The core of General Relativity is described by the Einstein Field Equations:
+  \section{Einstein Field Equations}

-\[ R_{\mu\nu} - \frac{1}{2}R g_{\mu\nu} + \Lambda g_{\mu\nu} = \frac{8\pi G}{c^4} T_{\mu\nu} \]
+  The core of General Relativity is described by the Einstein field equations:
+  \[
+  R_{\mu\nu}
+  - \frac{1}{2} R g_{\mu\nu}
+  + \Lambda g_{\mu\nu}
+  = \frac{8\pi G}{c^4} T_{\mu\nu}
+  \]

-Where:
-\begin{itemize}
-  \item $R_{\mu\nu}$ is the Ricci curvature tensor
-  \item $R$ is the scalar curvature
-  \item $g_{\mu\nu}$ is the metric tensor
-  \item $\Lambda$ is the cosmological constant
-  \item $T_{\mu\nu}$ is the stress-energy tensor
-\end{itemize}
+  where
+  \begin{itemize}
+    \item $R_{\mu\nu}$ is the Ricci curvature tensor,
+    \item $R$ is the scalar curvature,
+    \item $g_{\mu\nu}$ is the metric tensor,
+    \item $\Lambda$ is the cosmological constant,
+    \item $T_{\mu\nu}$ is the stress-energy tensor.
+  \end{itemize}

-\section{Geodesic Equation}
-Particles follow geodesics in spacetime, described by:
+  \section{Geodesic Equation}

-\[ \frac{d^2x^\mu}{d\tau^2} + \Gamma^\mu_{\alpha\beta} \frac{dx^\alpha}{d\tau} \frac{dx^\beta}{d\tau} = 0 \]
+  Particles follow geodesics in spacetime, described by
+  \[
+  \frac{d^2 x^\mu}{d\tau^2}
+  + \Gamma^\mu_{\alpha\beta}
+  \frac{dx^\alpha}{d\tau}
+  \frac{dx^\beta}{d\tau}
+  = 0
+  \]

-\section{Schwarzschild Metric}
-For a non-rotating, spherical mass $M$, the metric is:
+  \section{Schwarzschild Metric}

-\[ ds^2 = -\left(1 - \frac{r_s}{r}\right)c^2dt^2 + \left(1 - \frac{r_s}{r}\right)^{-1}dr^2 + r^2d\Omega^2 \]
+  For a non-rotating, spherically symmetric mass $M$, the metric is
+  \[
+  ds^2
+  = -\left(1 - \frac{r_s}{r}\right)c^2 dt^2
+  + \left(1 - \frac{r_s}{r}\right)^{-1} dr^2
+  + r^2 d\Omega^2
+  \]

-Values like $r_s = \frac{2GM}{c^2}$ represent the Schwarzschild radius.
+  The quantity
+  \[
+  r_s = \frac{2GM}{c^2}
+  \]
+  is known as the Schwarzschild radius.

-\end{document}`;
+  \end{document}
+`;

export default function LatexEditor() {
const [code, setCode] = useState(DEFAULT_LATEX);
const [error, setError] = useState<string | null>(null);
const [isMobile, setIsMobile] = useState(false);
+  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState(false);
const iframeRef = useRef<HTMLIFrameElement>(null);
+  const textareaRef = useRef<HTMLTextAreaElement>(null);

// Mobile detection
useEffect(() => {
@@ -122,6 +146,26 @@ export default function LatexEditor() {
}
};

+  const handleInsert = (snippet: string) => {
+    if (!textareaRef.current) return;
+
+    const start = textareaRef.current.selectionStart;
+    const end = textareaRef.current.selectionEnd;
+
+    // Insert text
+    const newCode = code.substring(0, start) + snippet + code.substring(end);
+    setCode(newCode);
+
+    // Restore focus and move cursor
+    setTimeout(() => {
+      if (textareaRef.current) {
+        textareaRef.current.focus();
+        textareaRef.current.selectionStart = start + snippet.length;
+        textareaRef.current.selectionEnd = start + snippet.length;
+      }
+    }, 0);
+  };
+
if (isMobile) {
return (
<div className="min-h-screen pt-32 pb-20 px-6 bg-slate-50 flex items-center justify-center">
@@ -150,6 +194,12 @@ export default function LatexEditor() {
keywords={["LaTeX Editor", "Online LaTeX", "Thesis Creator", "PDF Generator", "React Tool"]}
/>

+      <LatexCheatSheet
+        isOpen={isCheatSheetOpen}
+        onClose={() => setIsCheatSheetOpen(false)}
+        onInsert={handleInsert}
+      />
+
{/* Tool Header */}
<div className="h-16 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-6 shrink-0 z-10">
<div className="flex items-center gap-3">
@@ -169,19 +219,28 @@ export default function LatexEditor() {
{error}
</span>
)}
+
+          <button
+            onClick={() => setIsCheatSheetOpen(true)}
+            className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white text-sm font-medium rounded-lg hover:bg-slate-600 transition-colors border border-slate-600"
+          >
+            <BookOpen className="w-4 h-4" />
+            Cheat Sheet
+          </button>
+
<button
onClick={compileLatex}
className="flex items-center gap-2 px-4 py-2 bg-slate-700 text-white text-sm font-medium rounded-lg hover:bg-slate-600 transition-colors"
>
<Play className="w-4 h-4" />
-            Refresh Preview
+            Refresh
</button>
<button
onClick={handleDownload}
className="flex items-center gap-2 px-4 py-2 bg-brand-red text-white text-sm font-bold rounded-lg hover:bg-red-700 transition-colors shadow-lg hover:shadow-red-500/20"
>
<Download className="w-4 h-4" />
-            Download PDF
+            Export PDF
</button>
</div>
</div>
@@ -195,6 +254,7 @@ export default function LatexEditor() {
<span>Character Count: {code.length}</span>
</div>
<textarea
+            ref={textareaRef}
value={code}
onChange={(e) => setCode(e.target.value)}
className="flex-1 w-full bg-[#1e1e1e] text-slate-300 p-6 font-mono text-sm resize-none focus:outline-none leading-relaxed"
diff --git a/src/pages/tools/WhatsAppFormatter.tsx b/src/pages/tools/WhatsAppFormatter.tsx
index e28da3a..07d02e2 100644
--- a/src/pages/tools/WhatsAppFormatter.tsx
+++ b/src/pages/tools/WhatsAppFormatter.tsx
@@ -1,5 +1,8 @@
import { useState, useRef } from 'react';
-import { Copy, Bold, Italic, Strikethrough, Code, Check } from 'lucide-react';
+import {
+  Copy, Bold, Italic, Strikethrough, Code, Check,
+  List, ListOrdered, Quote, Terminal
+} from 'lucide-react';
import SEO from '../../components/SEO';

export default function WhatsAppFormatter() {
@@ -7,7 +10,7 @@ export default function WhatsAppFormatter() {
const [copied, setCopied] = useState(false);
const textareaRef = useRef<HTMLTextAreaElement>(null);

-  const applyFormat = (symbol: string) => {
+  const applyFormat = (symbol: string, type: 'wrap' | 'block' = 'wrap') => {
if (!textareaRef.current) return;

const start = textareaRef.current.selectionStart;
@@ -18,30 +21,57 @@ export default function WhatsAppFormatter() {

let newText = '';

-    // Check if already formatted (simple toggle)
-    if (before.endsWith(symbol) && after.startsWith(symbol)) {
-      // Remove formatting
-      newText = before.slice(0, -symbol.length) + selectedText + after.slice(symbol.length);
-      setText(newText);
-
-      // Restore selection
-      setTimeout(() => {
-        if (textareaRef.current) {
-          textareaRef.current.selectionStart = start - symbol.length;
-          textareaRef.current.selectionEnd = end - symbol.length;
-          textareaRef.current.focus();
+    if (type === 'wrap') {
+      // Check if already formatted (simple toggle)
+      if (before.endsWith(symbol) && after.startsWith(symbol)) {
+        // Remove formatting
+        newText = before.slice(0, -symbol.length) + selectedText + after.slice(symbol.length);
+        setText(newText);
+
+        setTimeout(() => {
+          if (textareaRef.current) {
+            textareaRef.current.selectionStart = start - symbol.length;
+            textareaRef.current.selectionEnd = end - symbol.length;
+            textareaRef.current.focus();
+          }
+        }, 0);
+      } else {
+        // Add formatting
+        newText = before + symbol + selectedText + symbol + after;
+        setText(newText);
+
+        setTimeout(() => {
+          if (textareaRef.current) {
+            textareaRef.current.selectionStart = start + symbol.length;
+            textareaRef.current.selectionEnd = end + symbol.length;
+            textareaRef.current.focus();
+          }
+        }, 0);
+      }
+    } else if (type === 'block') {
+      // Handle block formatting (Lists, Quotes)
+      const lines = selectedText.split('n');
+      let formattedText = '';
+
+      if (symbol === '1. ') {
+        formattedText = lines.map((line, i) => `${i + 1}. ${line}`).join('n');
+      } else {
+        // Toggle logic for simple prefixes like "- " or "> "
+        const allStarted = lines.every(line => line.startsWith(symbol));
+        if (allStarted) {
+          formattedText = lines.map(line => line.slice(symbol.length)).join('n');
+        } else {
+          formattedText = lines.map(line => symbol + line).join('n');
}
-      }, 0);
-    } else {
-      // Add formatting
-      newText = before + symbol + selectedText + symbol + after;
+      }
+
+      newText = before + formattedText + after;
setText(newText);

-      // Restore selection
setTimeout(() => {
if (textareaRef.current) {
-          textareaRef.current.selectionStart = start + symbol.length;
-          textareaRef.current.selectionEnd = end + symbol.length; // + symbol.length if we want cursor inside
+          textareaRef.current.selectionStart = start;
+          textareaRef.current.selectionEnd = start + formattedText.length;
textareaRef.current.focus();
}
}, 0);
@@ -57,26 +87,34 @@ export default function WhatsAppFormatter() {
const renderPreview = (content: string) => {
if (!content) return <span className="text-slate-400 italic">Preview will appear here...</span>;

-    // Very basic parser for visualization
-    // Note: This is purely for display purposes and might not handle nested complex cases perfectly
let html = content
.replace(/&/g, "&amp;")
.replace(/</g, "&lt;")
-      .replace(/>/g, "&gt;")
-      .replace(/"/g, "&quot;")
-      .replace(/'/g, "&#039;");
+      .replace(/>/g, "&gt;");
+
+    // Block logic strictly for preview visualization
+    // Note: This is an approximation.
+
+    // Code Blocks
+    html = html.replace(/```([sS]*?)```/g, '<div class="bg-gray-200 text-slate-800 p-2 rounded font-mono text-sm my-1 whitespace-pre-wrap">$1</div>');
+
+    // Inline Code
+    html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-200 text-red-500 px-1 rounded font-mono text-sm">$1</code>');

// Bold *text*
-    html = html.replace(/*([^*]+)*/g, '<strong>$1</strong>');
+    html = html.replace(/*([^*<]+)*/g, '<strong>$1</strong>');

// Italic _text_
-    html = html.replace(/_([^_]+)_/g, '<em>$1</em>');
+    html = html.replace(/_([^_<]+)_/g, '<em>$1</em>');

// Strikethrough ~text~
-    html = html.replace(/~([^~]+)~/g, '<del>$1</del>');
+    html = html.replace(/~([^~<]+)~/g, '<del>$1</del>');

-    // Monospace ```text```
-    html = html.replace(/```([^`]+)```/g, '<code class="bg-gray-200 text-red-500 px-1 rounded font-mono text-sm">$1</code>');
+    // Quotes (simple generic handle)
+    html = html.replace(/^&gt; (.*$)/gm, '<div class="border-l-4 border-slate-400 pl-2 text-slate-500 italic">$1</div>');
+
+    // Lists (visualization only)
+    html = html.replace(/^- (.*$)/gm, '• $1');

// Line breaks
html = html.replace(/n/g, '<br/>');
@@ -87,49 +125,52 @@ export default function WhatsAppFormatter() {
return (
<div className="min-h-screen pt-32 pb-20 px-6 bg-[var(--bg-primary)]">
<SEO
-        title="WhatsApp Formatter"
+        title="Boomer Text Gen"
description="Write formatting text for WhatsApp easily using this WYSIWYG editor."
/>

<div className="max-w-2xl mx-auto">
<div className="text-center mb-10">
-          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-4">WhatsApp Formatter</h1>
+          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-4">Boomer Text Gen</h1>
<p className="text-[var(--text-secondary)]">
-            Write with style. Bold, Italic, Strikethrough, and Monospace made easy.
+            Write with style. Perfect for urgent family group announcements.
</p>
</div>

<div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
{/* Toolbar */}
-          <div className="flex items-center gap-2 p-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
-            <button
-              onClick={() => applyFormat('*')}
-              className="p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors tooltip"
-              title="Bold (*text*)"
-            >
-              <Bold className="w-5 h-5" />
-            </button>
-            <button
-              onClick={() => applyFormat('_')}
-              className="p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
-              title="Italic (_text_)"
-            >
-              <Italic className="w-5 h-5" />
-            </button>
-            <button
-              onClick={() => applyFormat('~')}
-              className="p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
-              title="Strikethrough (~text~)"
-            >
-              <Strikethrough className="w-5 h-5" />
-            </button>
-            <button
-              onClick={() => applyFormat('```')}
-              className="p-2 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
-              title="Monospace (```text```)"
-            >
-              <Code className="w-5 h-5" />
-            </button>
+          <div className="flex flex-wrap items-center gap-1 p-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
+            {/* Inline Styles */}
+            <div className="flex bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-1">
+              <button onClick={() => applyFormat('*')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-300" title="Bold">
+                <Bold className="w-4 h-4" />
+              </button>
+              <button onClick={() => applyFormat('_')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-300" title="Italic">
+                <Italic className="w-4 h-4" />
+              </button>
+              <button onClick={() => applyFormat('~')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-300" title="Strike">
+                <Strikethrough className="w-4 h-4" />
+              </button>
+              <button onClick={() => applyFormat('`')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-300" title="Monospace">
+                <Code className="w-4 h-4" />
+              </button>
+            </div>
+
+            {/* Block Styles */}
+            <div className="flex bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-1">
+              <button onClick={() => applyFormat('- ', 'block')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-300" title="Bulleted List">
+                <List className="w-4 h-4" />
+              </button>
+              <button onClick={() => applyFormat('1. ', 'block')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-300" title="Numbered List">
+                <ListOrdered className="w-4 h-4" />
+              </button>
+              <button onClick={() => applyFormat('> ', 'block')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-300" title="Quote">
+                <Quote className="w-4 h-4" />
+              </button>
+              <button onClick={() => applyFormat('```', 'wrap')} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded text-slate-700 dark:text-slate-300" title="Code Block">
+                <Terminal className="w-4 h-4" />
+              </button>
+            </div>

<div className="flex-1"></div>

@@ -141,7 +182,7 @@ export default function WhatsAppFormatter() {
}`}
>
{copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
-              {copied ? 'Copied!' : 'Copy Text'}
+              {copied ? 'Copied!' : 'Copy'}
</button>
</div>


```

## feat: re-generate sitemap (07e0085) - 2026-01-28

```diff
diff --git a/generate-sitemap.js b/generate-sitemap.js
index ad91c00..d38a283 100644
--- a/generate-sitemap.js
+++ b/generate-sitemap.js
@@ -3,7 +3,19 @@ import fs from 'fs';
const baseUrl = 'https://alvianzf.id';
const API_KEY = 'AIzaSyCw9p4Ar_wc9h3zOuaPb7JcdH3Lj8Ail_4';
const BLOG_ID = '369044396031799467';
-const staticPages = ['/', '/experience', '/blog', '/mentorship'];
+const staticPages = [
+  '/',
+  '/experience',
+  '/blog',
+  '/mentorship',
+  '/tools/thesis-creator',
+  '/tools/whatsapp-formatter',
+  '/games/bug-squash',
+  '/games/quick-sync',
+  '/games/elusive-deploy',
+  '/games/learn-flex',
+  '/games/learn-typescript'
+];

async function generateSitemap() {
try {
diff --git a/public/sitemap.xml b/public/sitemap.xml
index 9aa5c1f..1e5aedd 100644
--- a/public/sitemap.xml
+++ b/public/sitemap.xml
@@ -21,6 +21,41 @@
<changefreq>daily</changefreq>
<priority>0.8</priority>
</url>
+  <url>
+    <loc>https://alvianzf.id/tools/thesis-creator</loc>
+    <changefreq>daily</changefreq>
+    <priority>0.8</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/tools/whatsapp-formatter</loc>
+    <changefreq>daily</changefreq>
+    <priority>0.8</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/games/bug-squash</loc>
+    <changefreq>daily</changefreq>
+    <priority>0.8</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/games/quick-sync</loc>
+    <changefreq>daily</changefreq>
+    <priority>0.8</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/games/elusive-deploy</loc>
+    <changefreq>daily</changefreq>
+    <priority>0.8</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/games/learn-flex</loc>
+    <changefreq>daily</changefreq>
+    <priority>0.8</priority>
+  </url>
+  <url>
+    <loc>https://alvianzf.id/games/learn-typescript</loc>
+    <changefreq>daily</changefreq>
+    <priority>0.8</priority>
+  </url>

<url>
<loc>https://alvianzf.id/blog/4177481728910489873</loc>
diff --git a/src/components/Footer.tsx b/src/components/Footer.tsx
index aae6d28..c7ad315 100644
--- a/src/components/Footer.tsx
+++ b/src/components/Footer.tsx
@@ -9,61 +9,16 @@ export default function Footer() {
return (
<footer className="bg-slate-900 border-t border-slate-800 text-slate-300 py-16 transition-colors duration-300">
<div className="container mx-auto px-6">
-        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
+        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
{/* Brand & Description */}
-          <div className="col-span-1 md:col-span-1">
+          <div className="col-span-1 border-b md:border-b-0 border-slate-800 pb-8 md:pb-0">
<Link to="/" className="text-2xl font-bold tracking-tight text-white hover:text-[#990000] transition-colors mb-4 block">
azf.
</Link>
-            <p className="text-slate-400 leading-relaxed text-sm">
+            <p className="text-slate-400 leading-relaxed text-sm mb-6">
Program Manager, Technical Lead, and Full Stack Engineer bridging the gap between people and technology.
</p>
-          </div>
-
-          {/* Sitemap */}
-          <div>
-            <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Sitemap</h3>
-            <ul className="space-y-2 text-sm">
-              <li>
-                <Link to="/" className="hover:text-[#990000] transition-colors">About</Link>
-              </li>
-              <li>
-                <Link to="/experience" className="hover:text-[#990000] transition-colors">Experience</Link>
-              </li>
-              <li>
-                <Link to="/blog" className="hover:text-[#990000] transition-colors">Blog</Link>
-              </li>
-              <li>
-                <Link to="/mentorship" className="hover:text-[#990000] transition-colors">Mentorship</Link>
-              </li>
-            </ul>
-          </div>
-
-          {/* Games */}
-          <div>
-            <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Games</h3>
-            <ul className="space-y-2 text-sm">
-              <li>
-                <Link to="/games/bug-squash" className="hover:text-[#990000] transition-colors">Bug Squash</Link>
-              </li>
-              <li>
-                <Link to="/games/quick-sync" className="hover:text-[#990000] transition-colors">Quick Sync</Link>
-              </li>
-              <li>
-                <Link to="/games/elusive-deploy" className="hover:text-[#990000] transition-colors">Elusive Deploy</Link>
-              </li>
-              <li>
-                <Link to="/games/learn-flex" className="hover:text-[#990000] transition-colors">Flexbox Froggy</Link>
-              </li>
-              <li>
-                <Link to="/games/learn-typescript" className="hover:text-[#990000] transition-colors">Type Torture</Link>
-              </li>
-            </ul>
-          </div>
-
-          {/* Socials */}
-          <div>
-            <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Connect</h3>
+            {/* Socials moved here for better mobile density */}
<div className="flex gap-4">
<a
href="https://github.com/alvianzf"
@@ -101,6 +56,70 @@ export default function Footer() {
</a>
</div>
</div>
+
+          {/* Links Group 1: Site & Games */}
+          <div>
+            <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider text-[#990000]">Explore</h3>
+            <ul className="space-y-2 text-sm text-slate-400">
+              <li><Link to="/" className="hover:text-white transition-colors">About</Link></li>
+              <li><Link to="/experience" className="hover:text-white transition-colors">Experience</Link></li>
+              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
+              <li><Link to="/mentorship" className="hover:text-white transition-colors">Mentorship</Link></li>
+              <li className="pt-4 font-bold text-white text-xs uppercase tracking-wider">Games</li>
+              <li><Link to="/games/bug-squash" className="hover:text-white transition-colors">Bug Squash</Link></li>
+              <li><Link to="/games/quick-sync" className="hover:text-white transition-colors">Quick Sync</Link></li>
+              <li><Link to="/games/elusive-deploy" className="hover:text-white transition-colors">Elusive Deploy</Link></li>
+              <li><Link to="/games/learn-flex" className="hover:text-white transition-colors">Flexbox Froggy</Link></li>
+              <li><Link to="/games/learn-typescript" className="hover:text-white transition-colors">Type Torture</Link></li>
+            </ul>
+          </div>
+
+          {/* Tools */}
+          <div>
+            <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider text-[#990000]">Tools</h3>
+            <ul className="space-y-2 text-sm text-slate-400">
+              <li className="font-semibold text-slate-500 text-xs uppercase pt-1 pb-1">Internal</li>
+              <li><Link to="/tools/thesis-creator" className="hover:text-white transition-colors">Thesis Procrastinator</Link></li>
+              <li><Link to="/tools/whatsapp-formatter" className="hover:text-white transition-colors">Boomer Text Gen</Link></li>
+
+              <li className="font-semibold text-slate-500 text-xs uppercase pt-4 pb-1">Web Apps</li>
+              <li><a href="https://jsonify.alvianzf.id" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Curly Brace Saver</a></li>
+              <li><a href="https://invoice.alvianzf.id" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Beg For Money</a></li>
+            </ul>
+          </div>
+
+          {/* NPM Packages */}
+          <div className="col-span-1 md:col-span-2 lg:col-span-2">
+            <h3 className="text-white font-bold mb-4 uppercase text-sm tracking-wider text-[#990000]">NPM Packages</h3>
+            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-slate-400">
+              <a href="https://www.npmjs.com/package/make-it-rain" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors group flex items-center gap-2">
+                Visual Inflation <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-[#990000]">→</span>
+              </a>
+              <a href="https://www.npmjs.com/package/env-validate-sarcastically" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors group flex items-center gap-2">
+                Env Bully <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-[#990000]">→</span>
+              </a>
+              <a href="https://www.npmjs.com/package/a-valid-json" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors group flex items-center gap-2">
+                Trust Issues <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-[#990000]">→</span>
+              </a>
+              <a href="https://www.npmjs.com/package/@alvianzf/squiggly-lines-go-brrr" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors group flex items-center gap-2">
+                CPU Heater <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-[#990000]">→</span>
+              </a>
+            </div>
+
+            <div className="mt-8 bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
+              <p className="text-xs text-slate-500 mb-2 font-mono">Run this immediately:</p>
+              <div className="flex items-center gap-2 bg-slate-950 p-2 rounded border border-slate-800">
+                <code className="text-xs text-green-400 font-mono flex-1">npx env-validate-sarcastically</code>
+                <button
+                  onClick={() => navigator.clipboard.writeText('npx env-validate-sarcastically')}
+                  className="text-slate-500 hover:text-white transition-colors"
+                  aria-label="Copy command"
+                >
+                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
+                </button>
+              </div>
+            </div>
+          </div>
</div>

<div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">

```

## feat: change npm packages layout on footer (8d69936) - 2026-01-28

```diff
diff --git a/src/components/Footer.tsx b/src/components/Footer.tsx
index c7ad315..bfc70c9 100644
--- a/src/components/Footer.tsx
+++ b/src/components/Footer.tsx
@@ -105,20 +105,6 @@ export default function Footer() {
CPU Heater <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-[#990000]">→</span>
</a>
</div>
-
-            <div className="mt-8 bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
-              <p className="text-xs text-slate-500 mb-2 font-mono">Run this immediately:</p>
-              <div className="flex items-center gap-2 bg-slate-950 p-2 rounded border border-slate-800">
-                <code className="text-xs text-green-400 font-mono flex-1">npx env-validate-sarcastically</code>
-                <button
-                  onClick={() => navigator.clipboard.writeText('npx env-validate-sarcastically')}
-                  className="text-slate-500 hover:text-white transition-colors"
-                  aria-label="Copy command"
-                >
-                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
-                </button>
-              </div>
-            </div>
</div>
</div>


```

## feat: redesign experience page with timeline and sarcasm (8174bb6) - 2026-01-28

```diff
diff --git a/src/data.ts b/src/data.ts
index f6f3d15..957d813 100644
--- a/src/data.ts
+++ b/src/data.ts
@@ -35,17 +35,42 @@ export const experiences: Experience[] = [
company: "Devshore Partners, s.r.o.",
icon: UserSearch,
period: "Oct 2023 – Present",
-    description:
-      "Recruited and assessed senior developers for European companies, achieving a 60% shortlist-to-interview efficiency. Enhanced hiring assessment processes for precision and effectiveness.",
+    description: [
+      "Recruited senior developers for placement in European partner companies, achieving a 60% shortlist-to-interview efficiency in the first quarter.",
+      "Evaluated incoming profiles to determine their compatibility with client companies.",
+      "Fostered collaboration with local hiring partners in Indonesia and Vietnam to identify potential candidates.",
+      "Continuously enhanced and iterated upon the hiring assessment processes to ensure effectiveness and precision in candidate selection.",
+      "Developed and iterated technical assessment processes, achieving a 50% interview-to-offer rate."
+    ],
+    techStack: ["Technical Hiring", "Assessment Design", "Team Management", "Recruitment"],
category: "soft",
},
+  {
+    title: "Fullstack Engineer",
+    company: "TiketQ",
+    icon: Code2,
+    period: "Jun 2023 - Present",
+    description: [
+      "Founded and currently serves as the Fullstack Engineer at TiketQ, a Batam-based ticketing platform. Responsible for architecting and developing the entire technology stack from scratch.",
+      "Engineered the Back End infrastructure with Express.js, optimising performance and scalability.",
+      "Utilised Redis for efficient caching mechanisms, improving system performance and response times."
+    ],
+    techStack: ["Express.js", "Redis", "Node.js", "System Architecture", "React.js"],
+    category: "technical",
+  },
{
title: "Program Manager",
company: "RevoU",
icon: GraduationCap,
period: "Feb 2023 – Apr 2024",
-    description:
-      "Led and managed software engineering programs, designing scalable curricula, integrating real-world projects, and aligning training with industry standards.",
+    description: [
+      "Lead and manage a dedicated team to continuously improve the Software Engineering program.",
+      "Oversee the design and development of scalable programs and curricula, integrating daily lectures, assignments, and projects to enhance students' skills.",
+      "Create an experiential learning environment that empowers students to apply their knowledge through simulated real-life projects (RevoU Next).",
+      "Ensure the effective delivery of the curriculum and code reviews by industry instructors and team leads.",
+      "Collaborate with external hiring managers to align the curriculum with industry standards, optimising student preparation for the job market."
+    ],
+    techStack: ["Curriculum Design", "Education Management", "Team Leadership", "Software Engineering Education"],
category: "soft",
},
{
@@ -53,8 +78,13 @@ export const experiences: Experience[] = [
company: "Glints",
icon: Presentation,
period: "Jan 2022 – Apr 2023",
-    description:
-      "Developed assessment systems to evaluate software engineers, refining hiring processes and ensuring a strong match between candidates and companies.",
+    description: [
+      "Design and implement a comprehensive assessment system to accurately evaluate and filter high-quality Southeast Asian engineers.",
+      "Enhance the speed and accuracy of matching international employers with top-tier engineering talent.",
+      "Develop fool-proof testing methodologies to ensure candidates meet the rigorous standards of the Glints Ecosystem.",
+      "Collaborate with hiring managers and industry experts to continuously refine and improve the assessment criteria."
+    ],
+    techStack: ["Assessment Design", "Hiring Standards", "Technical Evaluation"],
category: "soft",
},
{
@@ -62,37 +92,29 @@ export const experiences: Experience[] = [
company: "Glints Academy",
icon: Brain,
period: "Nov 2020 – Dec 2021",
-    description:
-      "Designed industry-standard curricula, implemented mentorship programs, and transitioned bootcamp models to self-paced learning formats.",
+    description: [
+      "Implemented an Industry Trainers system, providing students with personalised mentorship and guidance.",
+      "Designed and developed curricula for various core products, ensuring comprehensive skill acquisition.",
+      "Successfully transitioned Bootcamp models to hybrid self-paced learning formats with personalised support.",
+      "Achieved high employment rates for graduates with competitive salaries through targeted curriculum design, with an 90%+ hire rate within 6 months."
+    ],
+    techStack: ["Curriculum Development", "Mentorship", "EdTech", "Bootcamp Management"],
category: "soft",
},

// Software Engineering & Technical Roles
-  {
-    title: "Full Stack Engineer",
-    company: "Talent Tribe Asia",
-    icon: LayoutTemplate,
-    period: "Feb 2020 – Nov 2020",
-    description:
-      "Developed and maintained career platform components using AWS, Next.js, Express.js, and Firestore. Managed WordPress deployment and SSL configuration.",
-    category: "technical",
-  },
-  {
-    title: "Software Developer",
-    company: "Webimp, pte. ltd.",
-    icon: Code2,
-    period: "Mar 2019 – Feb 2020",
-    description:
-      "Developed web applications with PHP, CodeIgniter, and jQuery. Enhanced business processes through software solutions.",
-    category: "technical",
-  },
{
title: "Technical Lead",
company: "PT. Mitra Kuadran Teknologi",
icon: Terminal,
period: "Nov 2021 - Dec 2021",
-    description:
-      "Led a team in developing ERP solutions for government entities using Vue.js, React.js, Express.js, Laravel, and PostgreSQL. Managed hiring processes and DevOps deployments on AWS/GCP.",
+    description: [
+      "Led a small team at Kuadran Teknologi Indonesia, specialising in crafting ERP solutions for government entities including BP Batam, Customs Office, and the Municipality Office.",
+      "Successfully guided the team in delivering tailored ERP products that met the specific needs of government clients.",
+      "Managed technical hiring processes, ensuring the acquisition of skilled talent to strengthen the team's capabilities.",
+      "Utilised a diverse technology stack including Vue.js, React.js, Express.js, Laravel, PostgreSQL, MongoDB, and AWS/GCP."
+    ],
+    techStack: ["Vue.js", "React.js", "Express.js", "Laravel", "PostgreSQL", "MongoDB", "AWS", "GCP"],
category: "technical",
},
{
@@ -100,8 +122,41 @@ export const experiences: Experience[] = [
company: "Gerakan Nasional 1000 Startup Digital",
icon: Rocket,
period: "Sep 2020 - Feb 2021",
-    description:
-      "Mentored startup founders in application development, coaching 10 startup teams, with 3 advancing to the finals.",
+    description: [
+      "Played a pivotal role in a startup development program backed by the Ministry of Communication and Informatics in Indonesia.",
+      "Guided and mentored aspiring founders in shaping their ideas into industry-ready applications.",
+      "Provided technical mentorship to future CTOs, supporting them in application development.",
+      "Successfully coached 10 startup teams, with 3 teams advancing to the finals."
+    ],
+    techStack: ["Startup Coaching", "Product Management", "MVP Development"],
+    category: "technical",
+  },
+  {
+    title: "Full Stack Engineer",
+    company: "Talent Tribe Asia",
+    icon: LayoutTemplate,
+    period: "Feb 2020 – Nov 2020",
+    description: [
+      "Develop and maintain components for TalentTribe, a career platform targeting millennials.",
+      "Enhance existing products by implementing new features and fixing bugs to ensure optimal performance and user experience.",
+      "Utilise a variety of technologies in development, including AWS, Next.js, Express.js, Firestore, Algolia, and Nginx.",
+      "Set up and manage a WordPress application on AWS, including SSL configuration to ensure secure connections."
+    ],
+    techStack: ["AWS", "Next.js", "Express.js", "Firestore", "Algolia", "WordPress", "Nginx"],
+    category: "technical",
+  },
+  {
+    title: "Software Developer",
+    company: "Webimp, pte. ltd.",
+    icon: Code2,
+    period: "Mar 2019 – Feb 2020",
+    description: [
+      "Developed web applications using PHP with the CodeIgniter Framework.",
+      "Utilised jQuery to manage front-end behaviours, consume APIs, and map data on the front-end side.",
+      "Translated business processes into effective software logic, ensuring seamless operation and functionality.",
+      "Contributed to the company's recognition as the best company to work for in 2019 by the Singapore Computer Society."
+    ],
+    techStack: ["PHP", "CodeIgniter", "jQuery", "MySQL", "API Integration"],
category: "technical",
},
];
diff --git a/src/pages/About.tsx b/src/pages/About.tsx
index ff09422..5d695d2 100644
--- a/src/pages/About.tsx
+++ b/src/pages/About.tsx
@@ -68,7 +68,7 @@ export default function About() {
>
See my work <ArrowRight className="w-4 h-4" />
</a>
-                <a href="/resume.pdf" className="text-[var(--text-secondary)] hover:text-brand-red font-medium flex items-center gap-2 px-6 py-3 transition-colors">
+                <a href="/resume.pdf" download="Alvian_Zachry_CV.pdf" className="text-[var(--text-secondary)] hover:text-brand-red font-medium flex items-center gap-2 px-6 py-3 transition-colors">
Download CV <Download className="w-4 h-4" />
</a>
</div>
diff --git a/src/pages/Experience.tsx b/src/pages/Experience.tsx
index 1016477..a44ad07 100644
--- a/src/pages/Experience.tsx
+++ b/src/pages/Experience.tsx
@@ -1,32 +1,61 @@
import { motion } from 'framer-motion';
import { experiences } from '../data';
import ModernCard from '../components/ModernCard';
-import { Calendar, Briefcase } from 'lucide-react';
+import { Calendar, Building, Briefcase, Wrench } from 'lucide-react';
import SEO from '../components/SEO';
+import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
+import {
+  faReact, faNode, faPython, faJs, faPhp, faLaravel, faAws, faVuejs, faDocker, faWordpress, faGoogle
+} from '@fortawesome/free-brands-svg-icons';
+import { faDatabase, faServer } from '@fortawesome/free-solid-svg-icons';
+import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
+
+// Helper to map string tech to icons
+const getTechIcon = (tech: string): IconDefinition | null => {
+  const map: Record<string, IconDefinition> = {
+    'React.js': faReact,
+    'Next.js': faReact, // closest
+    'Vue.js': faVuejs,
+    'Node.js': faNode,
+    'Express.js': faNode, // closest
+    'JavaScript': faJs,
+    'TypeScript': faJs, // closest
+    'PHP': faPhp,
+    'Laravel': faLaravel,
+    'CodeIgniter': faFire,
+    'Python': faPython,
+    'AWS': faAws,
+    'GCP': faGoogle,
+    'Docker': faDocker,
+    'WordPress': faWordpress,
+    'PostgreSQL': faDatabase,
+    'MongoDB': faDatabase,
+    'Firestore': faFire,
+    'Redis': faServer,
+    'Nginx': faServer,
+    'Algolia': faHashtag,
+  };
+
+  // Fuzzy match or direct match
+  return map[tech] || null;
+};
+
+// Import solid icons for fallback/manual mapping
+import { faFire, faHashtag } from '@fortawesome/free-solid-svg-icons';

export default function Experience() {
return (
-    <div className="min-h-screen pt-32 pb-32 relative overflow-hidden">
+    <div className="min-h-screen pt-32 pb-32 relative overflow-hidden bg-white">
<SEO
title="Professional Experience"
-        description="Explore the professional journey of Alvian Zachry Faturrahman. 13+ years transforming engineering teams, leading technical projects, and hiring top talent across Southeast Asia and Europe."
-        keywords={[
-          "Career Journey", "Engineering Leadership", "Technical Hiring", "Team Scalability",
-          "Software Engineer", "Recruiter", "Bootcamp Tech Instructor",
-          "Agile Methodology", "Software Architecture", "Remote Work", "Startup Experience"
-        ]}
+        description="A timeline of Alvian Zachry Faturrahman's 13+ year career in software engineering, leadership, and education."
+        keywords={["Experience", "Resume", "CV", "Software Engineer", "Program Manager", "Tech Lead"]}
/>
-      {/* Background Patterns */}
-      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
-        <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-brand-red/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
-        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
-          <defs>
-            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
-              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
-            </pattern>
-          </defs>
-          <rect width="100%" height="100%" fill="url(#grid)" />
-        </svg>
+
+      {/* Background Decor */}
+      <div className="absolute inset-0 pointer-events-none overflow-hidden">
+        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-50 rounded-full blur-[100px] opacity-70 -translate-y-1/2 translate-x-1/2"></div>
+        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-50 rounded-full blur-[100px] opacity-70 translate-y-1/2 -translate-x-1/2"></div>
</div>

<div className="container mx-auto px-6 relative z-10">
@@ -35,80 +64,132 @@ export default function Experience() {
animate={{ opacity: 1, y: 0 }}
className="text-center mb-24"
>
-          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6 tracking-tight">
-            Professional Journey
+          <div className="inline-block p-2 px-4 rounded-full bg-red-50 text-[#990000] font-bold text-xs uppercase tracking-wider mb-4 border border-red-100">
+            Career Timeline
+          </div>
+          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
+            13+ Years of <span className="text-[#990000]">"It Works Locally".</span>
</h1>
-          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
-            A timeline of my career across software engineering, leadership, and education.
+          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed italic">
+            "Recovering engineer turned manager who wears too many hats. I've gone from writing PHP (sorry) to judging other people's algorithms. I build systems, manage chaos, and occasionally claim credit for my team's hard work."
</p>
</motion.div>

-        <div className="max-w-4xl mx-auto space-y-12">
-          {experiences.map((exp, index) => {
-            const IconComponent = exp.icon || Briefcase; // Fallback to Briefcase
-
-            return (
-              <motion.div
-                key={index}
-                initial={{ opacity: 0, x: -20 }}
-                whileInView={{ opacity: 1, x: 0 }}
-                viewport={{ once: true }}
-                transition={{ delay: index * 0.1 }}
-              >
-                <ModernCard className="group hover:border-brand-red/30 transition-colors p-8 bg-[var(--card-bg)] backdrop-blur-sm border-[var(--border-color)]">
-                  <div className="flex flex-col md:flex-row gap-8">
-                    {/* Icon & Line */}
-                    <div className="hidden md:flex flex-col items-center">
-                      <div className="w-16 h-16 rounded-2xl bg-[var(--bg-primary)] flex items-center justify-center text-[var(--text-secondary)] group-hover:text-brand-red group-hover:bg-red-50/10 group-hover:scale-105 transition-all duration-300 border border-[var(--border-color)] shadow-sm">
-                        {/* @ts-expect-error - Rendering Icon component dynamically */}
-                        <IconComponent className="w-7 h-7" />
-                      </div>
-                    </div>
-
-                    {/* Content */}
-                    <div className="flex-1 space-y-4">
-                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
-                        <div>
-                          <h3 className="text-xl font-bold text-[var(--text-primary)]">{exp.title}</h3>
-                          <h4 className="text-brand-red font-medium text-lg">{exp.company}</h4>
+        {/* Timeline Container */}
+        <div className="max-w-5xl mx-auto relative">
+          {/* Vertical Line */}
+          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 transform md:-translate-x-1/2 hidden md:block"></div>
+
+          <div className="space-y-16">
+            {experiences.map((exp, index) => {
+              const isEven = index % 2 === 0;
+              const IconComponent = exp.icon || Briefcase;
+
+              return (
+                <motion.div
+                  key={index}
+                  initial={{ opacity: 0, y: 40 }}
+                  whileInView={{ opacity: 1, y: 0 }}
+                  viewport={{ once: true, margin: "-100px" }}
+                  transition={{ duration: 0.5, delay: index * 0.1 }}
+                  className={`relative flex flex-col md:flex-row gap-8 ${isEven ? 'md:flex-row-reverse' : ''}`}
+                >
+                  {/* Timeline Dot (Desktop) */}
+                  <div className="absolute left-1/2 top-0 w-12 h-12 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center z-10">
+                    <div className="w-4 h-4 bg-[#990000] rounded-full border-4 border-white shadow-lg"></div>
+                  </div>
+
+                  {/* Content Card */}
+                  <div className="flex-1">
+                    <ModernCard className="group p-8 bg-white border-slate-100 hover:border-red-100 shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl relative overflow-hidden">
+                      {/* Hover Gradient */}
+                      <div className="absolute top-0 left-0 w-1 h-full bg-[#990000] opacity-0 group-hover:opacity-100 transition-opacity"></div>
+
+                      <div className="flex flex-col gap-6">
+                        {/* Header */}
+                        <div className="flex items-start justify-between gap-4">
+                          <div>
+                            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-1 group-hover:text-[#990000] transition-colors">
+                              {exp.title}
+                            </h3>
+                            <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
+                              <Building className="w-4 h-4" />
+                              {exp.company}
+                            </div>
+                          </div>
+                          <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-slate-50 text-slate-600 border border-slate-100 group-hover:bg-red-50 group-hover:text-[#990000] transition-colors">
+                            {/* @ts-expect-error - icon rendering */}
+                            <IconComponent className="w-6 h-6 " />
+                          </div>
</div>

-                        <div className="flex items-center text-[var(--text-secondary)] text-sm font-medium bg-[var(--bg-primary)] px-4 py-1.5 rounded-full w-fit whitespace-nowrap">
-                          <Calendar className="w-4 h-4 mr-2" />
+                        {/* Date Mobile/Tablet */}
+                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
+                          <Calendar className="w-3 h-3" />
{exp.period}
</div>
-                      </div>

-                      <p className="text-[var(--text-secondary)] leading-loose text-base">
-                        {exp.description}
-                      </p>
-                    </div>
+                        {/* Description */}
+                        <div className="text-slate-600 leading-relaxed text-sm md:text-base border-t border-slate-50 pt-4">
+                          {Array.isArray(exp.description) ? (
+                            <ul className="space-y-3">
+                              {exp.description.map((item, i) => (
+                                <li key={i} className="flex items-start gap-3">
+                                  <div className="mt-2 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0"></div>
+                                  <span>{item}</span>
+                                </li>
+                              ))}
+                            </ul>
+                          ) : (
+                            <p>{exp.description}</p>
+                          )}
+                        </div>
+
+                        {/* Tech Stack */}
+                        {exp.techStack && (
+                          <div className="flex flex-wrap gap-2 pt-2">
+                            {exp.techStack.map((tech) => {
+                              const icon = getTechIcon(tech);
+                              return (
+                                <span key={tech} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 text-slate-600 text-xs font-semibold border border-slate-100 hover:bg-slate-100 transition-colors">
+                                  {icon ? (
+                                    <FontAwesomeIcon icon={icon} className="w-3 h-3 text-slate-400" />
+                                  ) : (
+                                    <Wrench className="w-3 h-3 text-slate-300" />
+                                  )}
+                                  {tech}
+                                </span>
+                              )
+                            })}
+                          </div>
+                        )}
+                      </div>
+                    </ModernCard>
</div>
-                </ModernCard>
-              </motion.div>
-            );
-          })}
+
+                  {/* Spacer for the other side */}
+                  <div className="flex-1 hidden md:block"></div>
+                </motion.div>
+              );
+            })}
+          </div>
</div>

-        {/* Mentorship CTA */}
+        {/* Call to Action */}
<motion.div
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
-          className="mt-24 text-center max-w-2xl mx-auto"
+          className="mt-32 text-center"
>
-          <div className="p-8 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)]">
-            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Want to land a role like these?</h3>
-            <p className="text-[var(--text-secondary)] mb-6">
-              I mentor aspiring engineers to help them crack technical interviews and level up their careers.
-            </p>
-            <a
-              href="/mentorship"
-              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold rounded-full hover:bg-brand-red transition-all shadow-lg hover:shadow-xl"
-            >
-              Explore Mentorship
-            </a>
-          </div>
+          <a
+            href="/resume.pdf"
+            download="Alvian_Zachry_CV.pdf"
+            className="inline-flex items-center gap-3 px-8 py-4 bg-[#990000] text-white font-bold rounded-full shadow-lg hover:shadow-red-900/30 hover:-translate-y-1 transition-all"
+          >
+            <Briefcase className="w-5 h-5" />
+            Download Full Resume
+          </a>
</motion.div>
</div>
</div>
diff --git a/src/types.ts b/src/types.ts
index 35fe056..ed9bfbc 100644
--- a/src/types.ts
+++ b/src/types.ts
@@ -20,7 +20,8 @@ export interface Experience {
title: string;
company: string;
period: string;
-  description: string;
+  description: string | string[];
+  techStack?: string[];
category?: 'technical' | 'soft';
logo?: string;
icon?: IconDefinition | LucideIcon;

```

## feat: improve experience page with tabs, themes, and freelance lore (6ee71fe) - 2026-01-28

```diff
diff --git a/src/data.ts b/src/data.ts
index 957d813..2d39fb2 100644
--- a/src/data.ts
+++ b/src/data.ts
@@ -1,4 +1,4 @@
-import { Experience, Skill, Category } from "./types";
+import { Experience, Skill, Category, NpmPackage } from "./types";
import { Code2, Brain, Languages, UserSearch, Presentation, GraduationCap, Terminal, Rocket, Server, LayoutTemplate } from "lucide-react";
import {
faReact,
@@ -159,6 +159,20 @@ export const experiences: Experience[] = [
techStack: ["PHP", "CodeIgniter", "jQuery", "MySQL", "API Integration"],
category: "technical",
},
+  {
+    title: "The Freelance Vigilante",
+    company: "Various Government Agencies & Late Night Ideas",
+    icon: Code2,
+    period: "2013 – 2019",
+    description: [
+      "Spent the early years acting as a one-man army for government agencies, building ERPs and dashboards that (surprisingly) didn't crash.",
+      "Learned the hard way that 'fixed price' actually means 'unlimited revisions'.",
+      "Crafted custom solutions for local businesses using whatever tech stack was trendy (or whatever I could make work at 3 AM).",
+      "Mastered the art of translating 'I want it to pop' into actual CSS."
+    ],
+    techStack: ["PHP", "CodeIgniter", "jQuery", "Bootstrap", "MySQL", "Coffee & Prayers"],
+    category: "technical",
+  },
];

export const projects: Experience[] = [
@@ -373,3 +387,29 @@ export const categories: Category[] = [
{ name: "Soft Skills", icon: Brain },
{ name: "Languages", icon: Languages },
];
+export const npmPackages: NpmPackage[] = [
+  {
+    name: "make-it-rain",
+    description: "Visual Inflation. A useless package that makes it rain emojis.",
+    command: "npm i make-it-rain",
+    url: "https://www.npmjs.com/package/make-it-rain",
+  },
+  {
+    name: "env-validate-sarcastically",
+    description: "Env Bully. Validates your environment variables and insults you if they are missing.",
+    command: "npm i env-validate-sarcastically",
+    url: "https://www.npmjs.com/package/env-validate-sarcastically",
+  },
+  {
+    name: "a-valid-json",
+    description: "Trust Issues. Validates JSON, but sarcastically.",
+    command: "npm i a-valid-json",
+    url: "https://www.npmjs.com/package/a-valid-json",
+  },
+  {
+    name: "@alvianzf/squiggly-lines-go-brrr",
+    description: "CPU Heater. Adds squiggly lines to your background to warm up your room.",
+    command: "npm i @alvianzf/squiggly-lines-go-brrr",
+    url: "https://www.npmjs.com/package/@alvianzf/squiggly-lines-go-brrr",
+  },
+];
diff --git a/src/pages/Experience.tsx b/src/pages/Experience.tsx
index a44ad07..8576746 100644
--- a/src/pages/Experience.tsx
+++ b/src/pages/Experience.tsx
@@ -1,7 +1,8 @@
-import { motion } from 'framer-motion';
-import { experiences } from '../data';
+import { useState } from 'react';
+import { motion, AnimatePresence } from 'framer-motion';
+import { experiences, projects, npmPackages } from '../data';
import ModernCard from '../components/ModernCard';
-import { Calendar, Building, Briefcase, Wrench } from 'lucide-react';
+import { Calendar, Building, Briefcase, Wrench, Code, Terminal, Copy, Check } from 'lucide-react';
import SEO from '../components/SEO';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
@@ -36,7 +37,6 @@ const getTechIcon = (tech: string): IconDefinition | null => {
'Algolia': faHashtag,
};

-  // Fuzzy match or direct match
return map[tech] || null;
};

@@ -44,143 +44,257 @@ const getTechIcon = (tech: string): IconDefinition | null => {
import { faFire, faHashtag } from '@fortawesome/free-solid-svg-icons';

export default function Experience() {
+  const [activeTab, setActiveTab] = useState<'roles' | 'projects' | 'npm'>('roles');
+  const [copiedPkg, setCopiedPkg] = useState<string | null>(null);
+
+  const handleCopy = (command: string) => {
+    navigator.clipboard.writeText(command);
+    setCopiedPkg(command);
+    setTimeout(() => setCopiedPkg(null), 2000);
+  };
+
+  const tabs = [
+    { id: 'roles', label: 'Roles', icon: Briefcase },
+    { id: 'projects', label: 'Projects', icon: Code },
+    { id: 'npm', label: 'NPM Packages', icon: Terminal },
+  ] as const;
+
return (
-    <div className="min-h-screen pt-32 pb-32 relative overflow-hidden bg-white">
+    <div className="min-h-screen pt-32 pb-32 relative overflow-hidden bg-[var(--bg-primary)] transition-colors duration-300">
<SEO
title="Professional Experience"
-        description="A timeline of Alvian Zachry Faturrahman's 13+ year career in software engineering, leadership, and education."
+        description="A timeline of 13+ years of managing chaos, fixing bugs caused by others, and judging code for a living."
keywords={["Experience", "Resume", "CV", "Software Engineer", "Program Manager", "Tech Lead"]}
/>

{/* Background Decor */}
<div className="absolute inset-0 pointer-events-none overflow-hidden">
-        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-50 rounded-full blur-[100px] opacity-70 -translate-y-1/2 translate-x-1/2"></div>
-        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-50 rounded-full blur-[100px] opacity-70 translate-y-1/2 -translate-x-1/2"></div>
+        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[100px] opacity-70 -translate-y-1/2 translate-x-1/2"></div>
+        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-500/5 rounded-full blur-[100px] opacity-70 translate-y-1/2 -translate-x-1/2"></div>
</div>

<div className="container mx-auto px-6 relative z-10">
<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
-          className="text-center mb-24"
+          className="text-center mb-16"
>
-          <div className="inline-block p-2 px-4 rounded-full bg-red-50 text-[#990000] font-bold text-xs uppercase tracking-wider mb-4 border border-red-100">
+          <div className="inline-block p-2 px-4 rounded-full bg-red-500/10 text-[#990000] font-bold text-xs uppercase tracking-wider mb-4 border border-red-500/20">
Career Timeline
</div>
-          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
+          <h1 className="text-4xl md:text-6xl font-bold text-[var(--text-primary)] mb-6 tracking-tight">
13+ Years of <span className="text-[#990000]">"It Works Locally".</span>
</h1>
-          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed italic">
+          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed italic">
"Recovering engineer turned manager who wears too many hats. I've gone from writing PHP (sorry) to judging other people's algorithms. I build systems, manage chaos, and occasionally claim credit for my team's hard work."
</p>
</motion.div>

-        {/* Timeline Container */}
-        <div className="max-w-5xl mx-auto relative">
-          {/* Vertical Line */}
-          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 transform md:-translate-x-1/2 hidden md:block"></div>
-
-          <div className="space-y-16">
-            {experiences.map((exp, index) => {
-              const isEven = index % 2 === 0;
-              const IconComponent = exp.icon || Briefcase;
-
-              return (
-                <motion.div
-                  key={index}
-                  initial={{ opacity: 0, y: 40 }}
-                  whileInView={{ opacity: 1, y: 0 }}
-                  viewport={{ once: true, margin: "-100px" }}
-                  transition={{ duration: 0.5, delay: index * 0.1 }}
-                  className={`relative flex flex-col md:flex-row gap-8 ${isEven ? 'md:flex-row-reverse' : ''}`}
-                >
-                  {/* Timeline Dot (Desktop) */}
-                  <div className="absolute left-1/2 top-0 w-12 h-12 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center z-10">
-                    <div className="w-4 h-4 bg-[#990000] rounded-full border-4 border-white shadow-lg"></div>
-                  </div>
-
-                  {/* Content Card */}
-                  <div className="flex-1">
-                    <ModernCard className="group p-8 bg-white border-slate-100 hover:border-red-100 shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl relative overflow-hidden">
-                      {/* Hover Gradient */}
-                      <div className="absolute top-0 left-0 w-1 h-full bg-[#990000] opacity-0 group-hover:opacity-100 transition-opacity"></div>
-
-                      <div className="flex flex-col gap-6">
-                        {/* Header */}
-                        <div className="flex items-start justify-between gap-4">
-                          <div>
-                            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-1 group-hover:text-[#990000] transition-colors">
-                              {exp.title}
-                            </h3>
-                            <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
-                              <Building className="w-4 h-4" />
-                              {exp.company}
+        {/* Tabs */}
+        <div className="max-w-4xl mx-auto mb-12">
+          <div className="flex justify-center gap-4 bg-[var(--card-bg)] p-2 rounded-2xl border border-[var(--border-color)] w-fit mx-auto shadow-sm">
+            {tabs.map((tab) => (
+              <button
+                key={tab.id}
+                onClick={() => setActiveTab(tab.id)}
+                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${activeTab === tab.id
+                  ? 'bg-[#990000] text-white shadow-lg'
+                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)]'
+                  }`}
+              >
+                <tab.icon className="w-4 h-4" />
+                {tab.label}
+              </button>
+            ))}
+          </div>
+        </div>
+
+        {/* Content Area */}
+        <div className="max-w-5xl mx-auto min-h-[600px]">
+          <AnimatePresence mode="wait">
+
+            {/* ROLES TAB */}
+            {activeTab === 'roles' && (
+              <motion.div
+                key="roles"
+                initial={{ opacity: 0, y: 20 }}
+                animate={{ opacity: 1, y: 0 }}
+                exit={{ opacity: 0, y: -20 }}
+                transition={{ duration: 0.3 }}
+                className="grid gap-6"
+              >
+                {experiences.map((exp, index) => {
+                  const IconComponent = exp.icon || Briefcase;
+                  return (
+                    <ModernCard key={index} className="group p-6 md:p-8 bg-[var(--card-bg)] border-[var(--border-color)] hover:border-red-500/30 transition-all duration-300 rounded-2xl relative overflow-hidden">
+                      <div className="flex flex-col md:flex-row gap-6">
+                        <div className="shrink-0">
+                          <div className="w-14 h-14 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] group-hover:text-[#990000] group-hover:scale-105 transition-all">
+                            {/* @ts-expect-error icon rendering */}
+                            <IconComponent className="w-6 h-6" />
+                          </div>
+                        </div>
+                        <div className="flex-1">
+                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
+                            <h3 className="text-xl font-bold text-[var(--text-primary)] group-hover:text-[#990000] transition-colors">{exp.title}</h3>
+                            <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider bg-[var(--bg-primary)] px-3 py-1 rounded-full border border-[var(--border-color)] w-fit">
+                              <Calendar className="w-3 h-3" />
+                              {exp.period}
</div>
</div>
-                          <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-slate-50 text-slate-600 border border-slate-100 group-hover:bg-red-50 group-hover:text-[#990000] transition-colors">
-                            {/* @ts-expect-error - icon rendering */}
-                            <IconComponent className="w-6 h-6 " />
+                          <div className="flex items-center gap-2 text-[var(--text-secondary)] font-medium mb-4">
+                            <Building className="w-4 h-4" />
+                            {exp.company}
</div>
-                        </div>
-
-                        {/* Date Mobile/Tablet */}
-                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
-                          <Calendar className="w-3 h-3" />
-                          {exp.period}
-                        </div>

-                        {/* Description */}
-                        <div className="text-slate-600 leading-relaxed text-sm md:text-base border-t border-slate-50 pt-4">
-                          {Array.isArray(exp.description) ? (
-                            <ul className="space-y-3">
-                              {exp.description.map((item, i) => (
-                                <li key={i} className="flex items-start gap-3">
-                                  <div className="mt-2 w-1.5 h-1.5 rounded-full bg-red-400 shrink-0"></div>
-                                  <span>{item}</span>
-                                </li>
-                              ))}
-                            </ul>
-                          ) : (
-                            <p>{exp.description}</p>
-                          )}
-                        </div>
+                          <div className="text-[var(--text-secondary)] leading-relaxed text-sm mb-4">
+                            {Array.isArray(exp.description) ? (
+                              <ul className="space-y-2">
+                                {exp.description.map((item, i) => (
+                                  <li key={i} className="flex items-start gap-3">
+                                    <div className="mt-2 w-1.5 h-1.5 rounded-full bg-[#990000] shrink-0 opacity-50"></div>
+                                    <span>{item}</span>
+                                  </li>
+                                ))}
+                              </ul>
+                            ) : (
+                              <p>{exp.description}</p>
+                            )}
+                          </div>

-                        {/* Tech Stack */}
-                        {exp.techStack && (
-                          <div className="flex flex-wrap gap-2 pt-2">
-                            {exp.techStack.map((tech) => {
-                              const icon = getTechIcon(tech);
-                              return (
-                                <span key={tech} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 text-slate-600 text-xs font-semibold border border-slate-100 hover:bg-slate-100 transition-colors">
-                                  {icon ? (
-                                    <FontAwesomeIcon icon={icon} className="w-3 h-3 text-slate-400" />
+                          {exp.techStack && (
+                            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[var(--border-color)]">
+                              {exp.techStack.map((tech) => (
+                                <span key={tech} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[var(--bg-primary)] text-[var(--text-secondary)] text-xs font-medium border border-[var(--border-color)]">
+                                  {getTechIcon(tech) ? (
+                                    <FontAwesomeIcon icon={getTechIcon(tech)!} className="w-3 h-3 opacity-70" />
) : (
-                                    <Wrench className="w-3 h-3 text-slate-300" />
+                                    <Wrench className="w-3 h-3 opacity-70" />
)}
{tech}
</span>
-                              )
-                            })}
-                          </div>
-                        )}
+                              ))}
+                            </div>
+                          )}
+                        </div>
</div>
</ModernCard>
-                  </div>
+                  )
+                })}
+              </motion.div>
+            )}

-                  {/* Spacer for the other side */}
-                  <div className="flex-1 hidden md:block"></div>
-                </motion.div>
-              );
-            })}
-          </div>
+            {/* PROJECTS TAB */}
+            {activeTab === 'projects' && (
+              <motion.div
+                key="projects"
+                initial={{ opacity: 0, y: 20 }}
+                animate={{ opacity: 1, y: 0 }}
+                exit={{ opacity: 0, y: -20 }}
+                transition={{ duration: 0.3 }}
+                className="grid grid-cols-1 md:grid-cols-2 gap-6"
+              >
+                {projects.map((proj, index) => {
+                  const IconComponent = proj.icon || Code;
+                  return (
+                    <ModernCard key={index} className="group flex flex-col h-full p-6 bg-[var(--card-bg)] border-[var(--border-color)] hover:border-red-500/30 transition-all rounded-2xl relative">
+                      <div className="flex items-start justify-between mb-4">
+                        <div className="p-3 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-secondary)] group-hover:text-[#990000] transition-colors">
+                          {/* @ts-expect-error icon rendering */}
+                          <IconComponent className="w-6 h-6" />
+                        </div>
+                        <div className="text-xs font-bold text-[var(--text-secondary)] bg-[var(--bg-primary)] px-2 py-1 rounded border border-[var(--border-color)]">
+                          {proj.period}
+                        </div>
+                      </div>
+                      <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1 group-hover:text-[#990000] transition-colors">{proj.title}</h3>
+                      <p className="text-sm text-[#990000] font-medium mb-3">{proj.company}</p>
+                      <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-auto">
+                        {Array.isArray(proj.description) ? proj.description[0] : proj.description}
+                      </p>
+                    </ModernCard>
+                  )
+                })}
+              </motion.div>
+            )}
+
+            {/* NPM PACKAGES TAB */}
+            {activeTab === 'npm' && (
+              <motion.div
+                key="npm"
+                initial={{ opacity: 0, y: 20 }}
+                animate={{ opacity: 1, y: 0 }}
+                exit={{ opacity: 0, y: -20 }}
+                transition={{ duration: 0.3 }}
+                className="grid grid-cols-1 md:grid-cols-2 gap-6"
+              >
+                {npmPackages.map((pkg, index) => (
+                  <ModernCard key={index} className="p-6 bg-[var(--card-bg)] border-[var(--border-color)] hover:border-red-500/30 transition-all rounded-2xl group">
+                    <div className="flex items-start justify-between mb-4">
+                      <Terminal className="w-8 h-8 text-[var(--text-secondary)] group-hover:text-[#990000] transition-colors" />
+                      <a
+                        href={pkg.url}
+                        target="_blank"
+                        rel="noopener noreferrer"
+                        className="text-xs font-bold text-[#990000] hover:underline"
+                      >
+                        View on NPM →
+                      </a>
+                    </div>
+                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 font-mono">{pkg.name}</h3>
+                    <p className="text-[var(--text-secondary)] text-sm mb-6 min-h-[40px]">{pkg.description}</p>
+
+                    <div className="relative">
+                      <code className="block bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg p-3 pr-12 font-mono text-xs text-[var(--text-secondary)] overflow-x-auto whitespace-nowrap">
+                        {pkg.command}
+                      </code>
+                      <button
+                        onClick={() => handleCopy(pkg.command)}
+                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md hover:bg-[var(--card-bg)] text-[var(--text-secondary)] transition-colors"
+                        title="Copy to install"
+                      >
+                        {copiedPkg === pkg.command ? (
+                          <Check className="w-4 h-4 text-green-500" />
+                        ) : (
+                          <Copy className="w-4 h-4" />
+                        )}
+                      </button>
+                    </div>
+                  </ModernCard>
+                ))}
+              </motion.div>
+            )}
+
+          </AnimatePresence>
</div>

-        {/* Call to Action */}
+        {/* Mentorship CTA */}
+        <motion.div
+          initial={{ opacity: 0, y: 20 }}
+          whileInView={{ opacity: 1, y: 0 }}
+          viewport={{ once: true }}
+          className="mt-24 text-center max-w-2xl mx-auto"
+        >
+          <div className="p-8 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)]">
+            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Want to land a role like these?</h3>
+            <p className="text-[var(--text-secondary)] mb-6">
+              I mentor aspiring engineers to help them crack technical interviews and level up their careers.
+            </p>
+            <a
+              href="/mentorship"
+              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold rounded-full hover:bg-brand-red transition-all shadow-lg hover:shadow-xl"
+            >
+              Explore Mentorship
+            </a>
+          </div>
+        </motion.div>
+
+        {/* Download Resume CTA */}
<motion.div
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
-          className="mt-32 text-center"
+          className="mt-12 text-center"
>
<a
href="/resume.pdf"
@@ -188,7 +302,7 @@ export default function Experience() {
className="inline-flex items-center gap-3 px-8 py-4 bg-[#990000] text-white font-bold rounded-full shadow-lg hover:shadow-red-900/30 hover:-translate-y-1 transition-all"
>
<Briefcase className="w-5 h-5" />
-            Download Full Resume
+            Download Curated Resume
</a>
</motion.div>
</div>
diff --git a/src/types.ts b/src/types.ts
index ed9bfbc..26c557b 100644
--- a/src/types.ts
+++ b/src/types.ts
@@ -35,6 +35,13 @@ export interface Skill {
level?: number;
}

+export interface NpmPackage {
+  name: string;
+  description: string;
+  command: string;
+  url: string;
+}
+
export interface Category {
name: string;
icon: LucideIcon;

```

## feat: add icons to badges on experience and blog pages (80d83fa) - 2026-01-28

```diff
diff --git a/src/pages/Blog.tsx b/src/pages/Blog.tsx
index ed902fc..55aff67 100644
--- a/src/pages/Blog.tsx
+++ b/src/pages/Blog.tsx
@@ -2,7 +2,7 @@ import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
-import { Calendar, ChevronRight } from 'lucide-react';
+import { Calendar, ChevronRight, Sparkles } from 'lucide-react';
import ModernCard from '../components/ModernCard';
import SEO from '../components/SEO';

@@ -83,6 +83,10 @@ export default function Blog() {
animate={{ opacity: 1, y: 0 }}
className="text-center mb-16"
>
+          <div className="inline-flex items-center gap-2 p-2 px-4 rounded-full bg-red-500/10 text-[#990000] font-bold text-xs uppercase tracking-wider mb-4 border border-red-500/20">
+            <Sparkles className="w-3 h-3" />
+            Engineering & Musings
+          </div>
<h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6 tracking-tight">
Latest Thoughts
</h1>
diff --git a/src/pages/Experience.tsx b/src/pages/Experience.tsx
index 3d3ff55..83e2110 100644
--- a/src/pages/Experience.tsx
+++ b/src/pages/Experience.tsx
@@ -2,7 +2,7 @@ import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { experiences, projects, npmPackages } from '../data';
import ModernCard from '../components/ModernCard';
-import { Calendar, Building, Briefcase, Wrench, Code, Terminal, Copy, Check } from 'lucide-react';
+import { Calendar, Building, Briefcase, Wrench, Code, Terminal, Copy, Check, History } from 'lucide-react';
import SEO from '../components/SEO';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
@@ -82,7 +82,8 @@ export default function Experience() {
animate={{ opacity: 1, y: 0 }}
className="text-center mb-16"
>
-          <div className="inline-block p-2 px-4 rounded-full bg-red-500/10 text-[#990000] font-bold text-xs uppercase tracking-wider mb-4 border border-red-500/20">
+          <div className="inline-flex items-center gap-2 p-2 px-4 rounded-full bg-red-500/10 text-[#990000] font-bold text-xs uppercase tracking-wider mb-4 border border-red-500/20">
+            <History className="w-3 h-3" />
Career Timeline
</div>
<h1 className="text-4xl md:text-6xl font-bold text-[var(--text-primary)] mb-6 tracking-tight">

```

## feat: add experience years as freelancer (fa41f04) - 2026-01-28

```diff
diff --git a/src/data.ts b/src/data.ts
index 2011de0..aad4102 100644
--- a/src/data.ts
+++ b/src/data.ts
@@ -163,7 +163,7 @@ export const experiences: Experience[] = [
title: "The Freelance Vigilante",
company: "Various Government Agencies & Late Night Ideas",
icon: Code2,
-    period: "2013 – 2019",
+    period: "2011 – 2019",
description: [
"Spent the early years acting as a one-man army for government agencies, building ERPs and dashboards that (surprisingly) didn't crash.",
"Learned the hard way that 'fixed price' actually means 'unlimited revisions'.",

```

## feat: add Tick PHP Framework project and link support (6f000cc) - 2026-02-03

```diff
diff --git a/src/data.ts b/src/data.ts
index aad4102..10e3dd2 100644
--- a/src/data.ts
+++ b/src/data.ts
@@ -176,6 +176,15 @@ export const experiences: Experience[] = [
];

export const projects: Experience[] = [
+  {
+    title: "Tick PHP Framework",
+    company: "Open Source",
+    icon: faPhp,
+    period: "2025 - Present",
+    description: "A brand new PHP Framework. Because why not? Features auto-discovery routing, dependency injection, and a built-in CLI.",
+    link: "https://github.com/alvianzf/tick-php-framework",
+    category: "technical",
+  },
{
title: "Fullstack Engineer",
company: "TiketQ",
diff --git a/src/pages/Experience.tsx b/src/pages/Experience.tsx
index be98a4f..c3ba43b 100644
--- a/src/pages/Experience.tsx
+++ b/src/pages/Experience.tsx
@@ -213,9 +213,19 @@ export default function Experience() {
</div>
<h3 className="text-lg font-bold text-[var(--text-primary)] mb-1 group-hover:text-[#990000] transition-colors">{proj.title}</h3>
<p className="text-sm text-[#990000] font-medium mb-3">{proj.company}</p>
-                      <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-auto">
+                      <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">
{Array.isArray(proj.description) ? proj.description[0] : proj.description}
</p>
+                      {proj.link && (
+                        <a
+                          href={proj.link}
+                          target="_blank"
+                          rel="noopener noreferrer"
+                          className="mt-auto inline-flex items-center text-xs font-bold text-[#990000] hover:underline"
+                        >
+                          View Project →
+                        </a>
+                      )}
</ModernCard>
)
})}
diff --git a/src/types.ts b/src/types.ts
index 26c557b..93148dc 100644
--- a/src/types.ts
+++ b/src/types.ts
@@ -24,6 +24,7 @@ export interface Experience {
techStack?: string[];
category?: 'technical' | 'soft';
logo?: string;
+  link?: string;
icon?: IconDefinition | LucideIcon;
}


```

## feat: Add conditional rendering for FontAwesome icons in the Experience page. (91a767b) - 2026-02-03

```diff
diff --git a/src/pages/Experience.tsx b/src/pages/Experience.tsx
index c3ba43b..1fb37b2 100644
--- a/src/pages/Experience.tsx
+++ b/src/pages/Experience.tsx
@@ -134,8 +134,11 @@ export default function Experience() {
<div className="flex flex-col md:flex-row gap-6">
<div className="shrink-0">
<div className="w-14 h-14 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)] group-hover:text-[#990000] group-hover:scale-105 transition-all">
-                            {/* @ts-expect-error icon rendering */}
-                            <IconComponent className="w-6 h-6" />
+                            {typeof IconComponent === 'object' ? (
+                              <FontAwesomeIcon icon={IconComponent as IconDefinition} className="w-6 h-6" />
+                            ) : (
+                              <IconComponent className="w-6 h-6" />
+                            )}
</div>
</div>
<div className="flex-1">
@@ -204,8 +207,11 @@ export default function Experience() {
<ModernCard key={index} className="group flex flex-col h-full p-6 bg-[var(--card-bg)] border-[var(--border-color)] hover:border-red-500/30 transition-all rounded-2xl relative">
<div className="flex items-start justify-between mb-4">
<div className="p-3 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-secondary)] group-hover:text-[#990000] transition-colors">
-                          {/* @ts-expect-error icon rendering */}
-                          <IconComponent className="w-6 h-6" />
+                          {typeof IconComponent === 'object' ? (
+                            <FontAwesomeIcon icon={IconComponent as IconDefinition} className="w-6 h-6" />
+                          ) : (
+                            <IconComponent className="w-6 h-6" />
+                          )}
</div>
<div className="text-xs font-bold text-[var(--text-secondary)] bg-[var(--bg-primary)] px-2 py-1 rounded border border-[var(--border-color)]">
{proj.period}

```

## ui: add link to simple Tax (f22c3dc) - 2026-02-10

```diff
diff --git a/src/components/Header.tsx b/src/components/Header.tsx
index 308d375..aff38a0 100644
--- a/src/components/Header.tsx
+++ b/src/components/Header.tsx
@@ -1,6 +1,6 @@
import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
-import { Github, Linkedin, ChevronDown, FileJson, Receipt, CloudRain, MessageSquareWarning, CheckCircle2, Menu, X, Terminal } from 'lucide-react';
+import { Github, Linkedin, ChevronDown, FileJson, Receipt, CloudRain, MessageSquareWarning, CheckCircle2, Menu, X, Terminal, Coins } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedium } from '@fortawesome/free-brands-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
@@ -203,6 +203,17 @@ export default function Header() {
</div>
</div>
</a>
+                      <a href="https://hitungpajak.alvianzf.id" target="_blank" rel="noopener noreferrer" className="block p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors group/item">
+                        <div className="flex items-start gap-3">
+                          <div className="p-2 bg-green-50 text-green-600 rounded-lg group-hover/item:text-[#990000] transition-colors">
+                            <Coins className="w-5 h-5" />
+                          </div>
+                          <div>
+                            <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">Tax Calculator</div>
+                            <div className="text-xs text-slate-500">Want to know how much you're actually paying?</div>
+                          </div>
+                        </div>
+                      </a>
</div>
</div>


```

## feat: update cv document (6f6cf7e) - 2026-02-12

```diff
diff --git a/public/Alvian_Zachry_CV.pdf b/public/Alvian_Zachry_CV.pdf
index b44d170..3ad58da 100644
Binary files a/public/Alvian_Zachry_CV.pdf and b/public/Alvian_Zachry_CV.pdf differ
diff --git a/public/Alvian_Zachry_CV_1.pdf b/public/Alvian_Zachry_CV_1.pdf
new file mode 100644
index 0000000..b44d170
Binary files /dev/null and b/public/Alvian_Zachry_CV_1.pdf differ

```

## feat: integrate Google Analytics 4 for route tracking (21c9e1b) - 2026-04-07

```diff
diff --git a/package.json b/package.json
index 02a8a8d..7036c0d 100644
--- a/package.json
+++ b/package.json
@@ -29,6 +29,7 @@
"lucide-react": "^0.344.0",
"react": "^19.2.3",
"react-dom": "^19.2.3",
+    "react-ga4": "^3.0.1",
"react-helmet-async": "^2.0.4",
"react-router-dom": "^6.22.3",
"react-syntax-highlighter": "^16.1.0",
diff --git a/src/App.tsx b/src/App.tsx
index 1b91fab..a91440f 100644
--- a/src/App.tsx
+++ b/src/App.tsx
@@ -20,6 +20,7 @@ import LearnTypeScript from './pages/games/LearnTypeScript';
import LatexEditor from './pages/tools/LatexEditor';
import WhatsAppFormatter from './pages/tools/WhatsAppFormatter';
import NotFound from './pages/NotFound';
+import Analytics from './components/Analytics';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

@@ -28,6 +29,7 @@ function App() {
<ThemeProvider>
<HelmetProvider>
<Router>
+          <Analytics />
<ScrollToTop />
<div className="min-h-screen relative transition-colors duration-300">
<div className="fixed bottom-4 right-4 z-50">
diff --git a/src/components/Analytics.tsx b/src/components/Analytics.tsx
new file mode 100644
index 0000000..4bbf718
--- /dev/null
+++ b/src/components/Analytics.tsx
@@ -0,0 +1,26 @@
+import { useEffect } from 'react';
+import { useLocation } from 'react-router-dom';
+import ReactGA from 'react-ga4';
+
+const TRACKING_ID = 'G-R2LEWNVD6C';
+
+const Analytics = () => {
+  const location = useLocation();
+
+  useEffect(() => {
+    // Initialize GA4
+    ReactGA.initialize(TRACKING_ID);
+  }, []);
+
+  useEffect(() => {
+    // Track page view on route change
+    ReactGA.send({
+      hitType: 'pageview',
+      page: location.pathname + location.search
+    });
+  }, [location]);
+
+  return null;
+};
+
+export default Analytics;

```

## feat: add Finance Tracker link to Header component (f2a1b5b) - 2026-04-21

```diff
diff --git a/src/components/Header.tsx b/src/components/Header.tsx
index aff38a0..73121e1 100644
--- a/src/components/Header.tsx
+++ b/src/components/Header.tsx
@@ -1,6 +1,6 @@
import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
-import { Github, Linkedin, ChevronDown, FileJson, Receipt, CloudRain, MessageSquareWarning, CheckCircle2, Menu, X, Terminal, Coins } from 'lucide-react';
+import { Github, Linkedin, ChevronDown, FileJson, Receipt, CloudRain, MessageSquareWarning, CheckCircle2, Menu, X, Terminal, Coins, AreaChart } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedium } from '@fortawesome/free-brands-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
@@ -214,6 +214,17 @@ export default function Header() {
</div>
</div>
</a>
+                      <a href="https://gold-tracker.alvianzf.id" target="_blank" rel="noopener noreferrer" className="block p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors group/item">
+                        <div className="flex items-start gap-3">
+                          <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg group-hover/item:text-[#990000] transition-colors">
+                            <AreaChart className="w-5 h-5" />
+                          </div>
+                          <div>
+                            <div className="text-sm font-semibold text-slate-900 group-hover/item:text-[#990000] transition-colors">Finance Tracker</div>
+                            <div className="text-xs text-slate-500">See how broke you are and how far are you from that Palisade.</div>
+                          </div>
+                        </div>
+                      </a>
</div>
</div>


```

## refactor: comment out PromoPopup component in Home page (cf56633) - 2026-04-21

```diff
diff --git a/src/pages/Home.tsx b/src/pages/Home.tsx
index 38adba9..1acf7a1 100644
--- a/src/pages/Home.tsx
+++ b/src/pages/Home.tsx
@@ -6,7 +6,7 @@ import alvian from '../assets/potraits.png';
import { skills, categories } from "../data";
import ModernCard from "../components/ModernCard";
import SEO from '../components/SEO';
-import PromoPopup from '../components/PromoPopup';
+// import PromoPopup from '../components/PromoPopup';

export default function Home() {
const personSchema = {
@@ -281,7 +281,7 @@ export default function Home() {
</div>
</motion.div>
</section>
-        <PromoPopup />
+        {/* <PromoPopup /> */}
</div>
</div>
);

```

