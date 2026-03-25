'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LoadingScreen from '@/components/layout/LoadingScreen';
import BackToTop from '@/components/layout/BackToTop';
import Hero from '@/components/sections/Hero';

// Lazy-load below-the-fold sections for better LCP
const About        = dynamic(() => import('@/components/sections/About'));
const Skills       = dynamic(() => import('@/components/sections/Skills'));
const Projects     = dynamic(() => import('@/components/sections/Projects'));
const Certificates = dynamic(() => import('@/components/sections/Certificates'));
const Achievements = dynamic(() => import('@/components/sections/Achievements'));
const Education    = dynamic(() => import('@/components/sections/Education'));
const Blog         = dynamic(() => import('@/components/sections/Blog'));
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'));
const OpenSource   = dynamic(() => import('@/components/sections/OpenSource'));
const Contact      = dynamic(() => import('@/components/sections/Contact'));

export default function Home() {
  const [vis, setVis] = useState(null); // null = not yet loaded

  useEffect(() => {
    fetch('/api/settings')
      .then(r => r.ok ? r.json() : {})
      .then(d => setVis(d))
      .catch(() => setVis({}));
  }, []);

  // Helper: default to true so sections show while settings are loading
  const show = (key) => vis === null || vis[key] !== false;

  return (
    <>
      <LoadingScreen />
      <Navbar />

      <main>
        <Hero />
        {show('showAbout')        && <About />}
        {show('showSkills')       && <Skills />}
        {show('showProjects')     && <Projects />}
        {show('showCertificates') && <Certificates />}
        {show('showAchievements') && <Achievements />}
        {show('showEducation')    && <Education />}
        {show('showBlog')         && <Blog />}
        {show('showTestimonials') && <Testimonials />}
        {show('showOpenSource')   && <OpenSource />}
        {show('showContact')      && <Contact />}
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
