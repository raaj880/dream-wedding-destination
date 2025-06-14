
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, MessageCircle, Settings, Star, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard: React.FC = () => {
  const stats = {
    totalLikes: 24,
    totalMatches: 8,
    profileViews: 156,
    messagesReceived: 12
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-pink/20 via-white to-white dark:from-deep-blue/20 dark:via-gray-900 dark:to-black">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-deep-blue dark:text-white mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Ready to find your perfect match today?
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Button asChild className="h-20 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white flex-col space-y-1">
            <Link to="/swipe">
              <Heart className="w-6 h-6" />
              <span>Start Swiping</span>
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="h-20 border-deep-blue text-deep-blue hover:bg-deep-blue/10 flex-col space-y-1">
            <Link to="/matches">
              <Users className="w-6 h-6" />
              <span>View Matches</span>
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="h-20 border-deep-blue text-deep-blue hover:bg-deep-blue/10 flex-col space-y-1">
            <Link to="/profile">
              <Star className="w-6 h-6" />
              <span>My Profile</span>
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="h-20 border-deep-blue text-deep-blue hover:bg-deep-blue/10 flex-col space-y-1">
            <Link to="/settings">
              <Settings className="w-6 h-6" />
              <span>Settings</span>
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white dark:bg-gray-800 border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Likes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-deep-blue dark:text-white">{stats.totalLikes}</div>
              <p className="text-xs text-gray-600 dark:text-gray-300">People liked your profile</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-800 border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Matches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-deep-blue dark:text-white">{stats.totalMatches}</div>
              <p className="text-xs text-gray-600 dark:text-gray-300">Mutual connections</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-800 border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Profile Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-deep-blue dark:text-white">{stats.profileViews}</div>
              <p className="text-xs text-gray-600 dark:text-gray-300">In the last 30 days</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-800 border-0 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300">Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-deep-blue dark:text-white">{stats.messagesReceived}</div>
              <p className="text-xs text-gray-600 dark:text-gray-300">New conversations</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white dark:bg-gray-800 border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg text-deep-blue dark:text-white">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">Someone liked your profile</span>
                <span className="text-xs text-gray-400">2 hours ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">New match with Priya</span>
                <span className="text-xs text-gray-400">1 day ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">Profile viewed 12 times</span>
                <span className="text-xs text-gray-400">2 days ago</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-800 border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg text-deep-blue dark:text-white">Quick Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-soft-pink/20 rounded-lg">
                <p className="text-sm font-medium text-deep-blue dark:text-white mb-1">Complete your profile</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">Add more photos to get 40% more matches</p>
              </div>
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm font-medium text-deep-blue dark:text-white mb-1">Be active</p>
                <p className="text-xs text-gray-600 dark:text-gray-300">Users who are active daily get 3x more matches</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
