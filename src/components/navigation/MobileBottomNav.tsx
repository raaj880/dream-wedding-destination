
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, LayoutDashboard, Sparkles, MessageCircle, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface NavItem {
  href: string;
  icon: React.ElementType;
  requiresAuth?: boolean;
}

const MobileBottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const navItems: NavItem[] = [
    {
      href: '/',
      icon: Home,
    },
    {
      href: '/dashboard',
      icon: LayoutDashboard,
      requiresAuth: true,
    },
    {
      href: '/swipe',
      icon: Sparkles,
      requiresAuth: true,
    },
    {
      href: '/matches',
      icon: MessageCircle,
      requiresAuth: true,
    },
    {
      href: '/profile',
      icon: User,
      requiresAuth: true,
    },
  ];

  // Filter items based on authentication status
  const visibleItems = navItems.filter(item => 
    !item.requiresAuth || (item.requiresAuth && isAuthenticated)
  );

  // Don't show bottom nav if not enough items or user is not authenticated
  if (visibleItems.length < 2) {
    return null;
  }

  const handleNavClick = (href: string) => {
    navigate(href);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-primary/30 z-50 safe-area-pb backdrop-blur-sm">
      <div className="flex items-center justify-around py-2 px-2">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className={cn(
                "flex items-center justify-center p-2 rounded-2xl transition-all duration-300 min-w-0 flex-1 mx-1",
                "hover:bg-card-gold/10 active:scale-95",
                isActive 
                  ? "text-primary-foreground gold-gradient shadow-lg scale-105" 
                  : "text-card-gold hover:text-white bg-card/20 hover:bg-card-gold/20"
              )}
            >
              <Icon 
                className={cn(
                  "w-6 h-6 transition-all duration-300",
                  isActive ? "text-primary-foreground drop-shadow-sm" : "text-card-gold"
                )} 
                strokeWidth={isActive ? 2.25 : 1.75}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
