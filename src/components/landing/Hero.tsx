
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Hero = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleFindYourMatch = () => {
    if (isAuthenticated) {
      // Navigate first, then scroll to top immediately without animation
      navigate('/swipe');
      // Use immediate scroll to top without smooth behavior to avoid visual disturbance
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, 0);
    } else {
      navigate('/auth');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }, 0);
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-card pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up max-w-4xl" style={{ animationDelay: '0.2s' }}>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground mb-6 leading-tight">
          Swipe. Match. Marry.
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
          India's modern marriage connection app built for Gen Z & Millennials.
        </p>
        <Button 
          size="lg"
          className="bg-secondary text-secondary-foreground font-bold rounded-2xl px-10 py-7 text-lg hover:bg-secondary/90 hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-subtle-pulse"
          onClick={handleFindYourMatch}
        >
          Find Your Match
        </Button>
      </div>
    </section>
  );
};

export default Hero;
