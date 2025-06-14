
import { useMemo } from 'react';
import { UserProfile } from '@/types/match';
import { FilterOptions } from '@/types/filters';

export function useMatchFiltering(matches: UserProfile[], filters: FilterOptions) {
  const filteredMatches = useMemo(() => {
    return matches.filter(match => {
      // Age range filter
      const ageInRange = match.age >= filters.ageRange[0] && match.age <= filters.ageRange[1];
      if (!ageInRange) return false;

      // Location filter
      if (filters.location && !match.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }

      // Religion filter
      if (filters.religions.length > 0 && !filters.religions.includes('Any')) {
        if (!filters.religions.includes(match.religion)) return false;
      }

      // Verified filter
      if (filters.verifiedOnly && !match.verified) {
        return false;
      }

      return true;
    });
  }, [matches, filters]);

  return {
    filteredMatches,
    totalCount: matches.length,
    filteredCount: filteredMatches.length
  };
}
