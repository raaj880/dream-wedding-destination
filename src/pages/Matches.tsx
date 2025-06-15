
import React, { useState, useEffect } from 'react';
import { useMatches } from '@/hooks/useMatches';
import { usePotentialMatches } from '@/hooks/usePotentialMatches';
import { useFilters } from '@/hooks/useFilters';
import { useMatchFiltering } from '@/hooks/useMatchFiltering';
import { useRealTimeMatches } from '@/hooks/useRealTimeMatches';
import MatchesHeader from '@/components/matches/MatchesHeader';
import FilterStatus from '@/components/matches/FilterStatus';
import MatchesList from '@/components/matches/MatchesList';
import PremiumPopup from '@/components/matches/PremiumPopup';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Heart, Star, TrendingUp } from 'lucide-react';

const Matches: React.FC = () => {
  const { matches, loading: matchesLoading } = useMatches();
  const { matches: potentialMatches, loading: profilesLoading } = usePotentialMatches();
  const { appliedFilters, isActive } = useFilters();
  const { newMatches } = useRealTimeMatches();
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);

  console.log('Matches data:', matches);
  console.log('Potential matches data:', potentialMatches);
  console.log('New real-time matches:', newMatches);

  // Transform data to match PotentialMatch interface for filtering
  const displayProfiles = matches.length > 0 ? matches.map(match => ({
    id: match.user.id,
    full_name: match.user.full_name,
    age: match.user.age,
    location: match.user.location,
    profession: match.user.profession,
    religion: 'Not specified', // Default value since matches don't have religion
    bio: 'Bio not available',
    photos: match.user.photos,
    verified: match.user.verified,
    education: undefined,
    community: undefined,
    languages: undefined,
    height: undefined,
    marry_timeframe: undefined
  })) : potentialMatches;

  const { filteredMatches, filteredCount } = useMatchFiltering(displayProfiles, appliedFilters);

  // Transform filtered matches to the format expected by MatchesList
  const matchesForDisplay = filteredMatches.map(profile => ({
    id: profile.id,
    fullName: profile.full_name,
    age: profile.age,
    location: profile.location,
    profession: profile.profession,
    religion: profile.religion || 'Not specified',
    photos: profile.photos,
    verified: profile.verified,
    status: newMatches.some(nm => nm.matchedUserId === profile.id) ? 'new' : 'seen',
    lastSeen: matches.length > 0 ? 'Recently active' : 'Available to match'
  }));

  // Show popup only when there are few matches and user has been on page for a bit
  useEffect(() => {
    if (filteredCount <= 2 && filteredCount > 0) {
      const showTimer = setTimeout(() => {
        setShowPremiumPopup(true);
      }, 3000);

      return () => clearTimeout(showTimer);
    }
  }, [filteredCount]);

  // Auto-dismiss popup after 7 seconds
  useEffect(() => {
    if (showPremiumPopup) {
      const dismissTimer = setTimeout(() => {
        setShowPremiumPopup(false);
      }, 7000);

      return () => clearTimeout(dismissTimer);
    }
  }, [showPremiumPopup]);

  if (matchesLoading || profilesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-deep-blue border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Finding your perfect matches...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <MatchesHeader isFilterActive={isActive} />

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <FilterStatus isActive={isActive} filteredCount={filteredCount} />

        {/* Enhanced Stats Section */}
        <div className="mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <div className="w-8 h-8 bg-soft-pink/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Heart className="w-4 h-4 text-soft-pink" />
                </div>
                <p className="text-2xl font-bold text-deep-blue">{matches.length}</p>
                <p className="text-xs text-gray-600">Mutual Matches</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-deep-blue">{filteredCount}</p>
                <p className="text-xs text-gray-600">Available</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Star className="w-4 h-4 text-yellow-600" />
                </div>
                <p className="text-2xl font-bold text-deep-blue">{newMatches.length}</p>
                <p className="text-xs text-gray-600">New Today</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-deep-blue">+{Math.floor(Math.random() * 5) + 1}</p>
                <p className="text-xs text-gray-600">This Week</p>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Match Count with better messaging */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h2 className="text-lg font-semibold text-deep-blue">
                {matches.length > 0 ? 'Your Mutual Matches' : 'Available Profiles'}
              </h2>
              {newMatches.length > 0 && (
                <Badge className="bg-soft-pink text-deep-blue animate-pulse">
                  {newMatches.length} New!
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-600">
              {filteredCount} {filteredCount === 1 ? 'profile' : 'profiles'}
            </p>
          </div>
          
          {matches.length === 0 && (
            <p className="text-sm text-gray-500 mt-1">
              Start exploring profiles to create your first match! Like someone who also likes you back to create a connection.
            </p>
          )}
        </div>

        <MatchesList 
          matches={matchesForDisplay}
          filteredCount={filteredCount}
          isFilterActive={isActive}
        />

        <PremiumPopup 
          isVisible={showPremiumPopup}
          onClose={() => setShowPremiumPopup(false)}
        />
      </div>
    </div>
  );
};

export default Matches;
