
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Twitter, Heart } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: <Instagram className="w-6 h-6 text-blush-rose hover:text-royal-plum" />, href: '#' },
    { icon: <Linkedin className="w-6 h-6 text-royal-plum hover:text-blush-rose" />, href: '#' },
    { icon: <Twitter className="w-6 h-6 text-slate-gray hover:text-royal-plum" />, href: '#' },
  ];

  return (
    <footer className="bg-gradient-to-br from-ivory-white via-blush-rose/20 to-ivory-white text-charcoal-black py-12 border-t border-blush-rose/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <span className="font-bold text-2xl text-royal-plum">Wedder</span>
              <Heart className="text-blush-rose h-6 w-6 fill-blush-rose" />
            </Link>
            <p className="text-sm text-slate-gray">India's modern marriage connection app.</p>
          </div>
          
          <div>
            <h5 className="text-lg font-semibold text-royal-plum mb-3">App Info</h5>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-slate-gray hover:text-royal-plum transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="text-slate-gray hover:text-royal-plum transition-colors">Blog</Link></li>
              <li><Link to="/contact" className="text-slate-gray hover:text-royal-plum transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-lg font-semibold text-royal-plum mb-3">Quick Links</h5>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-slate-gray hover:text-royal-plum transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-slate-gray hover:text-royal-plum transition-colors">Terms of Service</Link></li>
              <li><Link to="/help" className="text-slate-gray hover:text-royal-plum transition-colors">Help Center</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blush-rose/30 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-gray mb-4 md:mb-0">&copy; {new Date().getFullYear()} Wedder. All rights reserved.</p>
          <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
              <a key={index} href={link.href} target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-opacity p-2 rounded-full hover:bg-blush-rose/20">
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
