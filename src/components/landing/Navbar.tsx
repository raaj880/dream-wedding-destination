
import React, { useState } from 'react';
import { Heart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Using shadcn button for consistency

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#features', label: 'Features' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#faq', label: 'FAQ' },
    { href: '#login', label: 'Login' }, // Assuming login is a section or separate page
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm fixed w-full z-50 top-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#home" className="flex items-center space-x-2">
            <span className="font-bold text-3xl text-deep-blue">Wedder</span>
            <Heart className="text-soft-pink h-7 w-7 fill-soft-pink" />
          </a>
          
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-700 hover:text-deep-blue px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <Button 
              onClick={() => console.log("Join Now clicked!")} // Placeholder action
              className="bg-soft-pink text-deep-blue hover:bg-pink-200 rounded-full px-6 py-2 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300"
            >
              Join Now
            </Button>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-deep-blue hover:text-deep-blue/80 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-deep-blue"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-7 w-7" /> : <Menu className="block h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-gray-700 hover:text-deep-blue block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <Button 
              onClick={() => { console.log("Join Now clicked!"); setIsOpen(false); }}
              className="w-full bg-soft-pink text-deep-blue hover:bg-pink-200 rounded-full mt-2 px-6 py-3 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300"
            >
              Join Now
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
