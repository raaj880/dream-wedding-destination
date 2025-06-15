
import React from 'react';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import Testimonials from '@/components/landing/Testimonials';
import HowItWorks from '@/components/landing/HowItWorks';
import FAQ from '@/components/landing/FAQ';
import CallToAction from '@/components/landing/CallToAction';

const Index = () => {
  return (
    <div className="bg-background">
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
