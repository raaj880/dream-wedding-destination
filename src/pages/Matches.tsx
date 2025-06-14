
import React, { useState, useEffect } from 'react';
import { useMatches } from '@/hooks/useMatches';
import { usePotentialMatches } from '@/hooks/usePotentialMatches';
import { useFilters } from '@/hooks/useFilters';
import { useMatchFiltering } from '@/hooks/useMatchFiltering';
import MatchesHeader from '@/components/matches/MatchesHeader';
import FilterStatus from '@/components/matches/FilterStatus';
import MatchesList from '@/components/matches/MatchesList';
import PremiumPopup from '@/components/matches/PremiumPopup';

const Matches: React.FC = () => {
  const { matches, loading: matchesLoading } = useMatches();
  const { matches: potentialMatches, loading: profilesLoading } = usePotentialMatches();
  const { appliedFilters, isActive } = useFilters();
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);

  // If no actual matches, show potential matches for demo purposes
  const displayProfiles = matches.length > 0 ? matches.map(match => ({
    id: match.user.id,
    fullName: match.user.full_name,
    age: match.user.age,
    location: match.user.location,
    profession: match.user.profession,
    religion: match.user.religion,
    photos: match.user.photos,
    verified: match.user.verified,
    status: 'seen',
    lastSeen: 'Last seen recently'
  })) : potentialMatches.map(profile => ({
    id: profile.id,
    fullName: profile.full_name,
    age: profile.age,
    location: profile.location,
    profession: profile.profession,
    religion: profile.religion,
    photos: profile.photos,
    verified: profile.verified,
    status: 'seen',
    lastSeen: 'Available to match'
  }));

  const { filteredMatches, filteredCount } = useMatchFiltering(displayProfiles, appliedFilters);

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

  if (matchesLoading || profilesLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-deep-blue"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MatchesHeader isFilterActive={isActive} />

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <FilterStatus isActive={isActive} filteredCount={filteredCount} />

        {/* Matches Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {matches.length > 0 ? `${filteredCount} mutual matches` : `${filteredCount} available profiles`}
          </p>
          {matches.length === 0 && (
            <p className="text-sm text-gray-500 mt-1">
              Start swiping to create matches! These are available profiles you can like.
            </p>
          )}
        </div>

        <MatchesList 
          matches={filteredMatches}
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
