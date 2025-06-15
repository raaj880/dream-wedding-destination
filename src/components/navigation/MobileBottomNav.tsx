
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Heart, User, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface NavItem {
  href: string;
  icon: React.ElementType;
  label: string;
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
      label: 'Home',
    },
    {
      href: '/dashboard',
      icon: LayoutDashboard,
      label: 'Dashboard',
      requiresAuth: true,
    },
    {
      href: '/matches',
      icon: Heart,
      label: 'Matches',
      requiresAuth: true,
    },
    {
      href: '/profile',
      icon: User,
      label: 'Profile',
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
    // Navigate immediately without any delay
    navigate(href);
    // Scroll to top instantly without smooth behavior to prevent visual disturbance
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-ivory-white via-ivory-white to-blush-rose/10 border-t border-blush-rose/40 z-50 safe-area-pb backdrop-blur-sm shadow-lg">
      <div className="flex items-center justify-around py-3 px-2">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className={cn(
                "flex items-center justify-center p-3 rounded-2xl transition-all duration-300 min-w-0 flex-1 mx-1",
                "hover:bg-blush-rose/30 active:scale-95 hover:shadow-md",
                isActive 
                  ? "text-ivory-white bg-gradient-to-br from-royal-plum to-royal-plum/80 shadow-lg scale-110" 
                  : "text-slate-gray hover:text-royal-plum bg-transparent"
              )}
            >
              <Icon 
                className={cn(
                  "w-6 h-6 transition-all duration-300",
                  isActive ? "text-ivory-white drop-shadow-sm" : "text-slate-gray"
                )} 
                strokeWidth={isActive ? 2.5 : 2}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
