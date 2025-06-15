
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Twitter, Crown } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: <Instagram className="w-6 h-6 text-card-gold hover:text-white transition-colors" />, href: '#' },
    { icon: <Linkedin className="w-6 h-6 text-card-gold hover:text-white transition-colors" />, href: '#' },
    { icon: <Twitter className="w-6 h-6 text-card-gold hover:text-white transition-colors" />, href: '#' },
  ];

  return (
    <footer className="bg-black text-white py-12 border-t border-card-gold/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Crown className="text-card-gold h-7 w-7" />
              <span className="font-display font-bold text-2xl text-gradient">Wedder</span>
            </Link>
            <p className="text-sm text-gray-400">India's premium marriage connection experience.</p>
          </div>
          
          <div>
            <h5 className="text-lg font-semibold text-card-gold mb-3">App Info</h5>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-card-gold transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-card-gold transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-card-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-lg font-semibold text-card-gold mb-3">Quick Links</h5>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-gray-400 hover:text-card-gold transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-card-gold transition-colors">Terms of Service</Link></li>
              <li><Link to="/help" className="text-gray-400 hover:text-card-gold transition-colors">Help Center</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-card-gold/30 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">&copy; {new Date().getFullYear()} Wedder. All rights reserved.</p>
          <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
              <a key={index} href={link.href} target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-opacity p-2 rounded-full hover:bg-card-gold/10 border border-card-gold/30">
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
