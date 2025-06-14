
import React from 'react';
import { Instagram, Linkedin, Twitter, Heart } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: <Instagram className="w-6 h-6 text-pink-500 hover:text-pink-600" />, href: '#' },
    { icon: <Linkedin className="w-6 h-6 text-blue-700 hover:text-blue-800" />, href: '#' },
    { icon: <Twitter className="w-6 h-6 text-sky-500 hover:text-sky-600" />, href: '#' },
  ];

  return (
    <footer className="bg-gray-100 text-gray-700 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <a href="#home" className="flex items-center space-x-2 mb-4">
              <span className="font-bold text-2xl text-deep-blue">Wedder</span>
              <Heart className="text-soft-pink h-6 w-6 fill-soft-pink" />
            </a>
            <p className="text-sm">India's modern marriage connection app.</p>
          </div>
          
          <div>
            <h5 className="text-lg font-semibold text-deep-blue mb-3">App Info</h5>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-deep-blue transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-deep-blue transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-deep-blue transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-lg font-semibold text-deep-blue mb-3">Quick Links</h5>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-deep-blue transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-deep-blue transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} Wedder. All rights reserved.</p>
          <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
              <a key={index} href={link.href} target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-opacity">
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
