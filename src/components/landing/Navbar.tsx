
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const navLinks = [
    { href: '/', label: 'Home', scrollTo: 'home' },
    { href: '/#features', label: 'Features', scrollTo: 'features' },
    { href: '/#testimonials', label: 'Testimonials', scrollTo: 'testimonials' },
    { href: '/#faq', label: 'FAQ', scrollTo: 'faq' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/matches', label: 'Matches' },
    { href: '/profile', label: 'Profile' },
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
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div onClick={handleLogoClick} className="flex items-center space-x-2 text-deep-blue hover:text-deep-blue/80 transition-colors cursor-pointer">
            <Heart className="w-7 h-7 text-soft-pink fill-soft-pink" />
            <span className="text-3xl font-bold">Wedder</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className="px-3 py-2 text-deep-blue hover:text-soft-pink rounded-md text-base font-medium transition-colors bg-transparent border-none cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            {!isAuthenticated && (
              <Button asChild className="ml-4 bg-soft-pink text-deep-blue hover:bg-soft-pink/80 rounded-full px-6 py-2.5 text-base font-semibold transition-transform hover:scale-105">
                <Link to="/auth">Join Now</Link>
              </Button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={toggleMobileMenu} className="text-deep-blue">
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white shadow-lg z-40 pb-4">
          <nav className="flex flex-col items-center space-y-3 pt-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className="block px-4 py-2 text-deep-blue hover:text-soft-pink rounded-md text-lg font-medium transition-colors w-full text-center bg-transparent border-none cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            {!isAuthenticated && (
              <Button asChild className="mt-4 bg-soft-pink text-deep-blue hover:bg-soft-pink/80 rounded-full px-8 py-3 text-lg font-semibold transition-transform hover:scale-105 w-3/4">
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
