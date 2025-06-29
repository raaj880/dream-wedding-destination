import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutDashboard, Sparkles, MessageCircle, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const DesktopNav = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  const navItems = [
    {
      href: '/',
      icon: Home,
      label: 'Home'
    },
    {
      href: '/dashboard',
      icon: LayoutDashboard,
      label: 'Dashboard'
    },
    {
      href: '/swipe',
      icon: Sparkles,
      label: 'Discovery'
    },
    {
      href: '/matches',
      icon: MessageCircle,
      label: 'Messages'
    },
    {
      href: '/profile',
      icon: User,
      label: 'Profile'
    },
  ];

  return (
    <nav className="hidden md:flex items-center space-x-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.href;
        
        return (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200",
              "hover:bg-card-gold/20 text-sm font-medium",
              isActive 
                ? "bg-card-gold text-primary-foreground font-semibold" 
                : "text-card-gold hover:text-white"
            )}
          >
            <Icon className="w-4 h-4" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default DesktopNav;
