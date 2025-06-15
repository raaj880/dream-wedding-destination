
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const CallToAction = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleJoinWedder = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
      // Instant scroll to top to prevent visual disturbance
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      navigate('/auth');
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  return (
    <section id="join" className="bg-gradient-to-br from-royal-plum to-royal-plum/90 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to meet your match?
        </h2>
        <Button 
          size="lg"
          className="bg-blush-rose text-royal-plum font-bold rounded-2xl px-10 py-7 text-lg hover:bg-blush-rose/90 hover:shadow-xl transform hover:scale-105 transition-all duration-300 mb-4"
          onClick={handleJoinWedder}
        >
          Join Wedder Today
        </Button>
        <p className="text-sm text-ivory-white/80">
          Free to join. Profiles with verified intent only.
        </p>
      </div>
    </section>
  );
};

export default CallToAction;
