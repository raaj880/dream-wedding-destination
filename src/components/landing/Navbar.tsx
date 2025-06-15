
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import DesktopNav from '@/components/navigation/DesktopNav';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const navLinks = [
    { href: '/', label: 'Home', scrollTo: 'home' },
    { href: '/#features', label: 'Features', scrollTo: 'features' },
    { href: '/#testimonials', label: 'Testimonials', scrollTo: 'testimonials' },
    { href: '/#faq', label: 'FAQ', scrollTo: 'faq' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    navigate('/');
    setTimeout(() => {
      const homeElement = document.getElementById('home');
      homeElement?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    closeMobileMenu();
  };

  const handleNavClick = (link: typeof navLinks[0]) => {
    if (link.href === '/') {
      navigate('/');
      setTimeout(() => {
        const homeElement = document.getElementById('home');
        homeElement?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (link.href.startsWith('/#')) {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(link.scrollTo!);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      navigate(link.href);
    }
    closeMobileMenu();
  };

  return (
    <header className="bg-gradient-to-b from-card to-background backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div onClick={handleLogoClick} className="cursor-pointer">
            <img src="/lovable-uploads/3a1667f0-2830-417c-b612-6ad24a3fbf87.png" alt="Wedder Logo" className="h-12" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Landing page links for non-authenticated users */}
            {!isAuthenticated && (
              <nav className="flex items-center space-x-2">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link)}
                    className="px-3 py-2 text-subtle hover:text-foreground rounded-md text-base font-medium transition-colors bg-transparent border-none cursor-pointer"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            )}
            
            <DesktopNav />
            
            {!isAuthenticated && (
              <Button asChild className="ml-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 py-2.5 text-base font-semibold transition-all hover:scale-105">
                <Link to="/auth">Join Now</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={toggleMobileMenu} className="text-foreground hover:bg-white/10">
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-card/95 backdrop-blur-md shadow-lg z-40 pb-4 border-b border-border">
          <nav className="flex flex-col items-center space-y-3 pt-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className="block px-4 py-2 text-subtle hover:text-foreground rounded-md text-lg font-medium transition-colors w-full text-center bg-transparent border-none cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            {!isAuthenticated && (
              <Button asChild variant="default" className="mt-4 rounded-full px-8 py-3 text-lg font-semibold transition-all hover:scale-105 w-3/4">
                <Link to="/auth" onClick={closeMobileMenu}>Join Now</Link>
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
