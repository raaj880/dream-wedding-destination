
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Briefcase, MessageCircle, ArrowLeft, Bell, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const mockMatches = [
  {
    id: 1,
    name: 'Ananya Sharma',
    age: 27,
    location: 'Mumbai, India',
    profession: 'Product Manager',
    religion: 'Hindu',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    status: 'new',
    verified: true,
    lastSeen: 'Online'
  },
  {
    id: 2,
    name: 'Rahul Gupta',
    age: 29,
    location: 'Bangalore, India',
    profession: 'Software Engineer',
    religion: 'Hindu',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    status: 'typing',
    verified: true,
    lastSeen: 'Typing...'
  },
  {
    id: 3,
    name: 'Kavya Reddy',
    age: 26,
    location: 'Hyderabad, India',
    profession: 'Doctor',
    religion: 'Hindu',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
    status: 'seen',
    verified: false,
    lastSeen: 'Last seen 2h ago'
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'new':
      return <Badge className="bg-soft-pink text-deep-blue text-xs">💕 New Match</Badge>;
    case 'typing':
      return <Badge className="bg-green-100 text-green-700 text-xs">Typing...</Badge>;
    default:
      return null;
  }
};

const getStatusColor = (status: string) => {
  if (status === 'new') return 'text-soft-pink';
  if (status === 'typing') return 'text-green-500';
  return 'text-gray-500';
};

const Matches: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/dashboard">
                <ArrowLeft className="w-6 h-6 text-deep-blue" />
              </Link>
            </Button>
            <h1 className="text-xl font-bold text-deep-blue">Matches</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/filter">
                <Filter className="w-5 h-5 text-gray-600" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5 text-gray-600" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Matches Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {mockMatches.length} mutual matches
          </p>
        </div>

        {/* Matches List */}
        {mockMatches.length > 0 ? (
          <div className="space-y-4">
            {mockMatches.map((match, index) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group">
                  <CardContent className="p-0">
                    <Link to={`/chat/${match.id}`} className="block">
                      <div className="p-4 flex items-center space-x-4">
                        {/* Profile Picture */}
                        <div className="relative">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={match.image} alt={match.name} className="object-cover" />
                            <AvatarFallback className="text-lg bg-soft-pink text-deep-blue">
                              {match.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          {match.verified && (
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </div>

                        {/* Match Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-lg font-semibold text-deep-blue truncate">
                              {match.name}, {match.age}
                            </h3>
                            {getStatusBadge(match.status)}
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-600 mb-1">
                            <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                            <span className="truncate">{match.location}</span>
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-600 mb-2">
                            <Briefcase className="w-3 h-3 mr-1 flex-shrink-0" />
                            <span className="truncate">{match.profession} • {match.religion}</span>
                          </div>
                          
                          <p className={`text-xs ${getStatusColor(match.status)}`}>
                            {match.lastSeen}
                          </p>
                        </div>

                        {/* Chat Button */}
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-deep-blue rounded-full flex items-center justify-center group-hover:bg-deep-blue/90 transition-colors">
                            <MessageCircle className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">💌</div>
            <h3 className="text-lg font-semibold text-deep-blue mb-2">No matches yet</h3>
            <p className="text-gray-600 mb-6">Keep swiping to find your perfect match!</p>
            <Button className="bg-deep-blue text-white hover:bg-deep-blue/90" asChild>
              <Link to="/swipe">
                Explore Profiles
              </Link>
            </Button>
          </motion.div>
        )}

        {/* Floating CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="fixed bottom-6 left-4 right-4 max-w-sm mx-auto"
        >
          <Card className="bg-gradient-to-r from-soft-pink to-deep-blue/10 border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm text-deep-blue mb-2">
                  3 people liked you – Get Premium to view 🔓
                </p>
                <Button size="sm" className="bg-deep-blue text-white hover:bg-deep-blue/90 w-full">
                  See Who Liked You
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Matches;
