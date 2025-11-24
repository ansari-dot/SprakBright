import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Project = lazy(() => import('./pages/Project'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Contact = lazy(() => import('./pages/Contact'));

// Lazy load layout
const Navbar = lazy(() => import('./components/Navbar'));
const Footer = lazy(() => import('./components/Footer'));

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes location={location} key={location.pathname.split('/')[1] || 'home'}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Project />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/contactus" element={<Contact />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Navbar />
      </Suspense>

      <AnimatedRoutes />

      <Suspense fallback={<LoadingSpinner />}>
        <Footer />
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
