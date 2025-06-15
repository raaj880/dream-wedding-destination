
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Users, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface QuickActionsGridProps {
  totalMatches: number;
}

const QuickActionsGrid: React.FC<QuickActionsGridProps> = ({ totalMatches }) => {
  const quickActions = [
    {
      title: 'Discover Profiles',
      description: 'Find your perfect match',
      icon: Heart,
      href: '/swipe',
      color: 'bg-soft-pink',
      iconColor: 'text-deep-blue'
    },
    {
      title: 'View Matches',
      description: `${totalMatches} ${totalMatches === 1 ? 'match' : 'matches'}`,
      icon: Users,
      href: '/matches',
      color: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      title: 'Messages',
      description: 'Chat with your matches',
      icon: MessageCircle,
      href: '/matches',
      color: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      title: 'Search & Filters',
      description: 'Customize your preferences',
      icon: Search,
      href: '/filter',
      color: 'bg-purple-50',
      iconColor: 'text-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {quickActions.map((action, index) => (
        <motion.div
          key={action.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group">
            <CardContent className="p-0">
              <Link to={action.href} className="block p-4">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <action.icon className={`w-6 h-6 ${action.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-deep-blue text-sm">{action.title}</h3>
                    <p className="text-xs text-gray-600">{action.description}</p>
                  </div>
                </div>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default QuickActionsGrid;
