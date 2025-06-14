
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, MessageCircle, Settings, Edit3, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-pink/20 via-white to-white dark:from-deep-blue/20 dark:via-gray-900 dark:to-black">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2 text-deep-blue hover:text-deep-blue/80 transition-colors">
              <Heart className="w-6 h-6 text-soft-pink fill-soft-pink" />
              <span className="text-2xl font-bold">Wedder</span>
            </Link>
            <nav className="flex items-center space-x-4">
              <Link to="/profile" className="text-deep-blue hover:text-soft-pink transition-colors">
                <Settings className="w-5 h-5" />
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-deep-blue dark:text-white mb-2">Welcome back!</h1>
          <p className="text-gray-600 dark:text-gray-300">Find your perfect match today</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white dark:bg-gray-800 border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="bg-soft-pink/20 dark:bg-deep-blue/20 p-3 rounded-full">
                  <Users className="w-6 h-6 text-deep-blue dark:text-soft-pink" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-deep-blue dark:text-white">12</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">New Matches</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="bg-soft-pink/20 dark:bg-deep-blue/20 p-3 rounded-full">
                  <MessageCircle className="w-6 h-6 text-deep-blue dark:text-soft-pink" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-deep-blue dark:text-white">5</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Messages</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="bg-soft-pink/20 dark:bg-deep-blue/20 p-3 rounded-full">
                  <Heart className="w-6 h-6 text-deep-blue dark:text-soft-pink" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-deep-blue dark:text-white">89%</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Profile Score</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-md mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-deep-blue dark:text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button asChild className="bg-deep-blue text-white hover:bg-deep-blue/90 dark:bg-soft-pink dark:text-deep-blue dark:hover:bg-soft-pink/90">
                <Link to="/profile">
                  <Edit3 className="mr-2 h-4 w-4" />
                  Edit Profile
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-deep-blue text-deep-blue hover:bg-deep-blue/10 dark:border-soft-pink dark:text-soft-pink dark:hover:bg-soft-pink/10">
                <Link to="/matches">
                  <Users className="mr-2 h-4 w-4" />
                  Browse Matches
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-white dark:bg-gray-800 border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-deep-blue dark:text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-deep-blue dark:text-white">Ananya liked your profile</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" />
                  <AvatarFallback>R</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-deep-blue dark:text-white">You have a new match with Rahul</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
