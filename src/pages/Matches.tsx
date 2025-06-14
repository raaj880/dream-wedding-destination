
import React, { useState, useEffect } from 'react';
import { mockUsers } from '@/store/mockData';
import { useFilters } from '@/hooks/useFilters';
import { useMatchFiltering } from '@/hooks/useMatchFiltering';
import MatchesHeader from '@/components/matches/MatchesHeader';
import FilterStatus from '@/components/matches/FilterStatus';
import MatchesList from '@/components/matches/MatchesList';
import PremiumPopup from '@/components/matches/PremiumPopup';

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
      <MatchesHeader isFilterActive={isActive} />

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <FilterStatus isActive={isActive} filteredCount={filteredCount} />

        {/* Matches Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredCount} mutual matches
          </p>
        </div>

        <MatchesList 
          matches={matchesWithStatus}
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
