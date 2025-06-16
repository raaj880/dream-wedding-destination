
import React, { useEffect } from 'react';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import Testimonials from '@/components/landing/Testimonials';
import HowItWorks from '@/components/landing/HowItWorks';
import FAQ from '@/components/landing/FAQ';
import CallToAction from '@/components/landing/CallToAction';

const Index = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-background min-h-screen">
      <Hero />
      <Features />
      <Testimonials />
      <HowItWorks />
      <FAQ />
      <CallToAction />
    </div>
  );
};

export default Index;
