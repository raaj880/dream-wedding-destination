
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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-ivory-white border-t border-blush-rose z-50 safe-area-pb">
      <div className="flex items-center justify-around py-2 px-4">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <button
              key={item.href}
              onClick={() => handleNavClick(item.href)}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 min-w-0 flex-1",
                "hover:bg-blush-rose/20 active:scale-95",
                isActive 
                  ? "text-royal-plum bg-blush-rose/30" 
                  : "text-slate-gray hover:text-royal-plum"
              )}
            >
              <Icon 
                className={cn(
                  "w-5 h-5 mb-1 transition-colors",
                  isActive ? "text-royal-plum" : "text-slate-gray"
                )} 
              />
              <span className={cn(
                "text-xs font-medium truncate transition-colors",
                isActive ? "text-royal-plum" : "text-slate-gray"
              )}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
