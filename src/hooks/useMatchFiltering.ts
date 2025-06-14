
import { useMemo } from 'react';
import { PotentialMatch } from '@/hooks/usePotentialMatches';
import { FilterOptions } from '@/types/filters';

export function useMatchFiltering(matches: PotentialMatch[], filters: FilterOptions) {
  const filteredMatches = useMemo(() => {
    console.log('🔍 useMatchFiltering - Starting with matches:', matches.length);
    console.log('🎯 Applied filters:', filters);

    return matches.filter(match => {
      console.log(`🔍 Filtering profile ${match.id} (${match.full_name}):`, {
        age: match.age,
        location: match.location,
        religion: match.religion,
        community: match.community,
        education: match.education,
        languages: match.languages,
        verified: match.verified
      });

      // Age range filter
      const ageInRange = match.age >= filters.ageRange[0] && match.age <= filters.ageRange[1];
      console.log(`  ✅ Age check (${match.age}): ${ageInRange} (range: ${filters.ageRange[0]}-${filters.ageRange[1]})`);
      if (!ageInRange) return false;

      // Location filter - only apply if location filter is set and not empty
      if (filters.location && filters.location.trim() !== '') {
        const locationMatch = match.location && match.location.toLowerCase().includes(filters.location.toLowerCase());
        console.log(`  🌍 Location check: ${locationMatch} (filter: "${filters.location}", profile: "${match.location}")`);
        if (!locationMatch) return false;
      }

      // Religion filter - only apply if religions are specifically selected (not empty array)
      if (filters.religions.length > 0 && !filters.religions.includes('Any')) {
        const religionMatch = match.religion && filters.religions.includes(match.religion);
        console.log(`  🕊️ Religion check: ${religionMatch} (filter: ${filters.religions}, profile: "${match.religion}")`);
        if (!religionMatch) return false;
      }

      // Community filter - only apply if community filter is set and not empty
      if (filters.community && filters.community.trim() !== '') {
        const communityMatch = match.community && match.community === filters.community;
        console.log(`  🏘️ Community check: ${communityMatch} (filter: "${filters.community}", profile: "${match.community}")`);
        if (!communityMatch) return false;
      }

      // Education filter - only apply if education filter is set and not empty
      if (filters.education && filters.education.trim() !== '') {
        const educationMatch = match.education && match.education === filters.education;
        console.log(`  🎓 Education check: ${educationMatch} (filter: "${filters.education}", profile: "${match.education}")`);
        if (!educationMatch) return false;
      }

      // Languages filter - only apply if languages are specifically selected (not empty array)
      if (filters.languages.length > 0) {
        const hasMatchingLanguage = match.languages && match.languages.some(lang => 
          filters.languages.includes(lang)
        );
        console.log(`  🗣️ Languages check: ${hasMatchingLanguage} (filter: ${filters.languages}, profile: ${match.languages})`);
        if (!hasMatchingLanguage) return false;
      }

      // Verified filter - only apply if specifically enabled
      if (filters.verifiedOnly && !match.verified) {
        console.log(`  ✅ Verified check: false (filter requires verified, profile verified: ${match.verified})`);
        return false;
      }

      console.log(`  ✅ Profile ${match.id} passed all filters!`);
      return true;
    });
  }, [matches, filters]);

  console.log('🎯 useMatchFiltering results:', {
    totalMatches: matches.length,
    filteredMatches: filteredMatches.length,
    filtersActive: JSON.stringify(filters)
  });

  return {
    filteredMatches,
    totalCount: matches.length,
    filteredCount: filteredMatches.length
  };
}
