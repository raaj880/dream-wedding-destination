
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

      // Location filter - exact match for consistency
      if (filters.location && filters.location.trim() !== '') {
        const locationMatch = match.location === filters.location;
        console.log(`  🌍 Location check: ${locationMatch} (filter: "${filters.location}", profile: "${match.location}")`);
        if (!locationMatch) return false;
      }

      // Religion filter - only apply if religions are specifically selected (not empty array)
      if (filters.religions.length > 0 && !filters.religions.includes('Any')) {
        const religionMatch = match.religion && filters.religions.includes(match.religion);
        console.log(`  🕊️ Religion check: ${religionMatch} (filter: ${filters.religions}, profile: "${match.religion}")`);
        if (!religionMatch) return false;
      }

      // Community filter - handle the format conversion
      if (filters.community && filters.community.trim() !== '') {
        // Convert filter format back to display format
        const communityDisplayValue = filters.community.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        let communityMatch = false;
        
        if (match.community) {
          // Handle both original format and converted format
          communityMatch = match.community === filters.community || 
                          match.community === communityDisplayValue ||
                          match.community.toLowerCase().replace(/\s+/g, '-') === filters.community;
        }
        
        console.log(`  🏘️ Community check: ${communityMatch} (filter: "${filters.community}", profile: "${match.community}")`);
        if (!communityMatch) return false;
      }

      // Education filter - handle case differences
      if (filters.education && filters.education.trim() !== '') {
        let educationMatch = false;
        
        if (match.education) {
          // Handle different education formats
          const profileEdu = match.education.toLowerCase();
          const filterEdu = filters.education.toLowerCase();
          
          // Direct match or partial match for degree types
          educationMatch = profileEdu === filterEdu ||
                          profileEdu.includes(filterEdu) ||
                          (filterEdu === 'ug' && (profileEdu.includes('bachelor') || profileEdu.includes('degree'))) ||
                          (filterEdu === 'pg' && (profileEdu.includes('master') || profileEdu.includes('post'))) ||
                          (filterEdu === 'phd' && profileEdu.includes('doctor'));
        }
        
        console.log(`  🎓 Education check: ${educationMatch} (filter: "${filters.education}", profile: "${match.education}")`);
        if (!educationMatch) return false;
      }

      // Languages filter - handle comma-separated string vs array
      if (filters.languages.length > 0) {
        let hasMatchingLanguage = false;
        
        if (match.languages) {
          // Handle both array format and comma-separated string format
          const profileLanguages = Array.isArray(match.languages) 
            ? match.languages 
            : match.languages.split(',').map(lang => lang.trim());
            
          hasMatchingLanguage = profileLanguages.some(lang => 
            filters.languages.includes(lang)
          );
        }
        
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
