
import { useMemo } from 'react';
import { PotentialMatch } from '@/hooks/usePotentialMatches';
import { FilterOptions } from '@/types/filters';

export function useMatchFiltering(matches: PotentialMatch[], filters: FilterOptions) {
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

      // Community filter
      if (filters.community && match.community && match.community !== filters.community) {
        return false;
      }

      // Education filter
      if (filters.education && match.education && match.education !== filters.education) {
        return false;
      }

      // Languages filter
      if (filters.languages.length > 0) {
        const hasMatchingLanguage = match.languages && match.languages.some(lang => 
          filters.languages.includes(lang)
        );
        if (!hasMatchingLanguage) return false;
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
