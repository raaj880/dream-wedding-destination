
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Briefcase, MessageCircle, ArrowLeft, Bell, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { mockUsers } from '@/store/mockData';
import { useFilters } from '@/hooks/useFilters';
import { useMatchFiltering } from '@/hooks/useMatchFiltering';

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

// Mock status data for display
const mockMatchStatuses = [
  { id: '1', status: 'new', lastSeen: 'Online' },
  { id: '2', status: 'typing', lastSeen: 'Typing...' },
  { id: '3', status: 'seen', lastSeen: 'Last seen 2h ago' }
];

const Matches: React.FC = () => {
  const { appliedFilters, isActive } = useFilters();
  const { filteredMatches, filteredCount } = useMatchFiltering(mockUsers, appliedFilters);
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);

  // Combine filtered users with mock status data
  const matchesWithStatus = filteredMatches.map(user => {
    const statusData = mockMatchStatuses.find(s => s.id === user.id);
    return {
      ...user,
      status: statusData?.status || 'seen',
      lastSeen: statusData?.lastSeen || 'Last seen recently'
    };
  });

  // Show popup only when there are few matches and user has been on page for a bit
  useEffect(() => {
    if (filteredCount <= 2 && filteredCount > 0) {
      const showTimer = setTimeout(() => {
        setShowPremiumPopup(true);
      }, 3000); // Show after 3 seconds

      return () => clearTimeout(showTimer);
    }
  }, [filteredCount]);

  // Auto-dismiss popup after 5 seconds
  useEffect(() => {
    if (showPremiumPopup) {
      const dismissTimer = setTimeout(() => {
        setShowPremiumPopup(false);
      }, 5000);

      return () => clearTimeout(dismissTimer);
    }
  }, [showPremiumPopup]);

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
                <Filter className={`w-5 h-5 ${isActive ? 'text-deep-blue' : 'text-gray-600'}`} />
                {isActive && <div className="w-2 h-2 bg-soft-pink rounded-full absolute top-2 right-2" />}
              </Link>
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5 text-gray-600" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Filter Status */}
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-4"
          >
            <Card className="bg-soft-pink/10 border-soft-pink/20">
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-deep-blue">
                    🎯 Filters active - showing {filteredCount} matches
                  </span>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/filter" className="text-deep-blue text-xs">
                      Edit Filters
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Matches Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredCount} mutual matches
          </p>
        </div>

        {/* Matches List */}
        {matchesWithStatus.length > 0 ? (
          <div className="space-y-4">
            {matchesWithStatus.map((match, index) => (
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
                            <AvatarImage src={match.photos[0]} alt={match.fullName} className="object-cover" />
                            <AvatarFallback className="text-lg bg-soft-pink text-deep-blue">
                              {match.fullName.charAt(0)}
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
                              {match.fullName}, {match.age}
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
            <div className="text-6xl mb-4">
              {isActive ? '🔍' : '💌'}
            </div>
            <h3 className="text-lg font-semibold text-deep-blue mb-2">
              {isActive ? 'No matches found' : 'No matches yet'}
            </h3>
            <p className="text-gray-600 mb-6">
              {isActive ? 'Try adjusting your filters to see more profiles.' : 'Keep swiping to find your perfect match!'}
            </p>
            <div className="space-y-2">
              <Button className="bg-deep-blue text-white hover:bg-deep-blue/90" asChild>
                <Link to="/swipe">
                  Explore Profiles
                </Link>
              </Button>
              {isActive && (
                <Button variant="outline" asChild>
                  <Link to="/filter">
                    Adjust Filters
                  </Link>
                </Button>
              )}
            </div>
          </motion.div>
        )}

        {/* Conditional Premium Popup */}
        <AnimatePresence>
          {showPremiumPopup && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-6 left-4 right-4 max-w-sm mx-auto z-50"
            >
              <Card className="bg-gradient-to-r from-soft-pink to-deep-blue/10 border-0 shadow-lg">
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-deep-blue mb-2">
                      3 people liked you – Get Premium to view 🔓
                    </p>
                    <Button 
                      size="sm" 
                      className="bg-deep-blue text-white hover:bg-deep-blue/90 w-full"
                      onClick={() => setShowPremiumPopup(false)}
                    >
                      See Who Liked You
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Matches;
