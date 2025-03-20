
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import Sports from '@/components/sections/Sports';
import Formats from '@/components/sections/Formats';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

const Index = () => {
  useEffect(() => {
    // Simple scroll animation
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.appear');
      
      elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
        
        // Check if element is in viewport
        if (rect.top <= viewHeight * 0.85 && rect.bottom >= 0) {
          element.classList.add('animate-fade-in');
        }
      });
    };
    
    // Run once on mount
    animateOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll, { passive: true });
    
    // Cleanup
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);
  
  return (
    <main className="overflow-hidden">
      <Navbar />
      <Hero />
      <Features />
      <Sports />
      <Formats />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
