
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Users, Eye, TrendingUp, Settings, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useDashboard } from '@/hooks/useDashboard';
import { useFilters } from '@/hooks/useFilters';

const Dashboard: React.FC = () => {
  const stats = useDashboard();
  const { isActive: hasActiveFilters } = useFilters();

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
      description: `${stats.totalMatches} mutual matches`,
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
    }
  ];

  const statsCards = [
    {
      title: 'Profile Views',
      value: stats.profileViews,
      icon: Eye,
      description: 'This week'
    },
    {
      title: 'Likes Sent',
      value: stats.totalLikes,
      icon: Heart,
      description: 'Total'
    },
    {
      title: 'Matches',
      value: stats.totalMatches,
      icon: Users,
      description: 'Mutual likes'
    },
    {
      title: 'Activity',
      value: stats.recentActivity,
      icon: TrendingUp,
      description: 'Last 7 days'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/placeholder.svg" alt="Profile" />
              <AvatarFallback className="bg-soft-pink text-deep-blue">U</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-bold text-deep-blue">Welcome back!</h1>
              <p className="text-sm text-gray-600">Ready to find your match?</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5 text-gray-600" />
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link to="/settings">
                <Settings className="w-5 h-5 text-gray-600" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl space-y-6">
        {/* Filter Status */}
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <Card className="bg-soft-pink/10 border-soft-pink/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-deep-blue">🎯 Search filters are active</span>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/filter" className="text-deep-blue text-xs">
                      Manage Filters
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group">
                <CardContent className="p-0">
                  <Link to={action.href} className="block p-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <action.icon className={`w-6 h-6 ${action.iconColor}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-deep-blue">{action.title}</h3>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statsCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
            >
              <Card className="bg-white border-0 shadow-sm">
                <CardContent className="p-4 text-center">
                  <stat.icon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-deep-blue">{stat.value}</div>
                  <div className="text-xs font-medium text-gray-900">{stat.title}</div>
                  <div className="text-xs text-gray-500">{stat.description}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          <Card className="bg-white border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-deep-blue">Quick Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-soft-pink rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Complete your profile</p>
                  <p className="text-xs text-gray-600">Add more photos and details to get better matches</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-soft-pink rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Stay active</p>
                  <p className="text-xs text-gray-600">Regular activity increases your visibility</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-soft-pink rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Be genuine</p>
                  <p className="text-xs text-gray-600">Authentic profiles get more meaningful connections</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Premium CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.8 }}
        >
          <Card className="bg-gradient-to-r from-soft-pink to-deep-blue/10 border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-deep-blue mb-1">Get Premium</h3>
                  <p className="text-sm text-gray-600">See who liked you, unlimited swipes & more!</p>
                </div>
                <Button className="bg-deep-blue text-white hover:bg-deep-blue/90">
                  Upgrade
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
