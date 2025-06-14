
import React from 'react';
import { Button } from '@/components/ui/button';

const CallToAction = () => {
  return (
    <section id="join" className="bg-deep-blue text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to meet your match?
        </h2>
        <Button 
          size="lg"
          className="bg-soft-pink text-deep-blue font-bold rounded-2xl px-10 py-7 text-lg hover:bg-pink-200 hover:shadow-xl transform hover:scale-105 transition-all duration-300 mb-4"
          onClick={() => console.log("Join Wedder Today clicked!")} // Placeholder action
        >
          Join Wedder Today
        </Button>
        <p className="text-sm text-gray-300">
          Free to join. Profiles with verified intent only.
        </p>
      </div>
    </section>
  );
};

export default CallToAction;
