
import React, { useState, useEffect } from 'react';
import { useMatches } from '@/hooks/useMatches';
import { usePotentialMatches } from '@/hooks/usePotentialMatches';
import { useFilters } from '@/hooks/useFilters';
import { useMatchFiltering } from '@/hooks/useMatchFiltering';
import { useRealTimeMatches } from '@/hooks/useRealTimeMatches';
import MatchesHeader from '@/components/matches/MatchesHeader';
import MatchesList from '@/components/matches/MatchesList';
import PremiumPopup from '@/components/matches/PremiumPopup';
import { Badge } from '@/components/ui/badge';

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
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground font-medium">Finding your perfect matches...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <MatchesHeader isFilterActive={isActive} />

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="mb-6">
          {/* Enhanced Match Count with better messaging */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h2 className="text-lg font-semibold text-foreground">
                {matches.length > 0 ? 'Your Mutual Matches' : 'Available Profiles'}
              </h2>
              {newMatches.length > 0 && (
                <Badge className="bg-primary text-primary-foreground animate-pulse">
                  {newMatches.length} New!
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {filteredCount} {filteredCount === 1 ? 'profile' : 'profiles'}
            </p>
          </div>
          
          {matches.length === 0 && (
            <p className="text-sm text-muted-foreground mt-1">
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
