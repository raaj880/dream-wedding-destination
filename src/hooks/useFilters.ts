
import { useState, useCallback, useEffect } from 'react';
import { FilterOptions, FilterState, initialFilterOptions } from '@/types/filters';
import { useLocalStorage } from './useLocalStorage';

export function useFilters() {
  const [storedFilters, setStoredFilters] = useLocalStorage<FilterOptions>('userFilters', initialFilterOptions);
  const [currentFilters, setCurrentFilters] = useState<FilterOptions>(storedFilters);

  // Calculate if filters are active by comparing with initial state
  const hasActiveFilters = useCallback(() => {
    return (
      storedFilters.ageRange[0] !== initialFilterOptions.ageRange[0] ||
      storedFilters.ageRange[1] !== initialFilterOptions.ageRange[1] ||
      (storedFilters.location !== initialFilterOptions.location && storedFilters.location !== 'any-city') ||
      storedFilters.nearbyOnly !== initialFilterOptions.nearbyOnly ||
      storedFilters.religions.length !== initialFilterOptions.religions.length ||
      (storedFilters.community !== initialFilterOptions.community && storedFilters.community !== 'any-community') ||
      (storedFilters.education !== initialFilterOptions.education && storedFilters.education !== 'any-education') ||
      storedFilters.maritalIntent !== initialFilterOptions.maritalIntent ||
      storedFilters.languages.length !== initialFilterOptions.languages.length ||
      storedFilters.verifiedOnly !== initialFilterOptions.verifiedOnly
    );
  }, [storedFilters]);

  const [isActive, setIsActive] = useState<boolean>(hasActiveFilters());

  // Update isActive whenever stored filters change
  useEffect(() => {
    setIsActive(hasActiveFilters());
  }, [storedFilters, hasActiveFilters]);

  const updateFilter = useCallback(<K extends keyof FilterOptions>(
    key: K,
    value: FilterOptions[K]
  ) => {
    setCurrentFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const applyFilters = useCallback(() => {
    // Clean up the filter values before storing
    const cleanFilters = {
      ...currentFilters,
      location: currentFilters.location === 'any-city' ? '' : currentFilters.location,
      community: currentFilters.community === 'any-community' ? '' : currentFilters.community,
      education: currentFilters.education === 'any-education' ? '' : currentFilters.education,
    };
    
    setStoredFilters(cleanFilters);
    console.log('Filters applied:', cleanFilters);
  }, [currentFilters, setStoredFilters]);

  const resetFilters = useCallback(() => {
    const resetValues = { ...initialFilterOptions };
    setCurrentFilters(resetValues);
    setStoredFilters(resetValues);
    console.log('Filters reset');
  }, [setStoredFilters]);

  const clearFilter = useCallback((key: keyof FilterOptions) => {
    const resetValue = initialFilterOptions[key];
    const updatedFilters = {
      ...storedFilters,
      [key]: resetValue
    };
    setStoredFilters(updatedFilters);
    setCurrentFilters(updatedFilters);
    console.log(`Filter ${key} cleared`);
  }, [storedFilters, setStoredFilters]);

  const clearAllFilters = useCallback(() => {
    resetFilters();
  }, [resetFilters]);

  return {
    filters: currentFilters,
    appliedFilters: storedFilters,
    isActive,
    updateFilter,
    applyFilters,
    resetFilters,
    clearFilter,
    clearAllFilters
  };
}
