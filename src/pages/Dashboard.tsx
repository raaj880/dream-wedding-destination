
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Heart, Settings, User, MessageCircle, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Profile Views', value: '24', icon: <User className="w-5 h-5" /> },
    { label: 'Matches', value: '8', icon: <Heart className="w-5 h-5" /> },
    { label: 'Messages', value: '12', icon: <MessageCircle className="w-5 h-5" /> },
  ];

  const quickActions = [
    { title: 'Find Matches', description: 'Discover compatible profiles', icon: <Search className="w-6 h-6" />, href: '/matches', color: 'bg-soft-pink' },
    { title: 'View Profile', description: 'Check and edit your profile', icon: <User className="w-6 h-6" />, href: '/profile', color: 'bg-blue-100' },
    { title: 'Messages', description: 'Chat with your matches', icon: <MessageCircle className="w-6 h-6" />, href: '#', color: 'bg-green-100' },
    { title: 'Settings', description: 'Manage your preferences', icon: <Settings className="w-6 h-6" />, href: '/settings', color: 'bg-purple-100' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-pink/20 via-white to-white dark:from-deep-blue/20 dark:via-gray-900 dark:to-black">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-deep-blue dark:text-white mb-2">Welcome back, Priya!</h1>
          <p className="text-gray-600 dark:text-gray-300">Here's what's happening with your matrimonial journey</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white dark:bg-gray-800 border-0 shadow-md">
              <CardContent className="flex items-center p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-soft-pink/20 rounded-lg mr-4">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-2xl font-bold text-deep-blue dark:text-white">{stat.value}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-deep-blue dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Card key={index} className="bg-white dark:bg-gray-800 border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <Link to={action.href} className="block">
                    <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4`}>
                      {action.icon}
                    </div>
                    <h3 className="font-semibold text-deep-blue dark:text-white mb-2">{action.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{action.description}</p>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-deep-blue dark:text-white">Recent Activity</CardTitle>
            <CardDescription>Your latest interactions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Users className="w-5 h-5 text-soft-pink" />
                <div>
                  <p className="text-sm font-medium text-deep-blue dark:text-white">New match found</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">Rahul G. from Bangalore</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <MessageCircle className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium text-deep-blue dark:text-white">New message received</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">From Ananya S.</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <User className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium text-deep-blue dark:text-white">Profile viewed</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">5 new profile views today</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
