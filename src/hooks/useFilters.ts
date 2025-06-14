
import { useState, useCallback } from 'react';
import { FilterOptions, FilterState, initialFilterOptions } from '@/types/filters';
import { useLocalStorage } from './useLocalStorage';

export function useFilters() {
  const [storedFilters, setStoredFilters] = useLocalStorage<FilterOptions>('userFilters', initialFilterOptions);
  const [currentFilters, setCurrentFilters] = useState<FilterOptions>(storedFilters);
  const [isActive, setIsActive] = useState<boolean>(false);

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
    setStoredFilters(currentFilters);
    setIsActive(true);
    console.log('Filters applied:', currentFilters);
  }, [currentFilters, setStoredFilters]);

  const resetFilters = useCallback(() => {
    const resetValues = { ...initialFilterOptions };
    setCurrentFilters(resetValues);
    setStoredFilters(resetValues);
    setIsActive(false);
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

  const hasActiveFilters = useCallback(() => {
    return JSON.stringify(currentFilters) !== JSON.stringify(initialFilterOptions);
  }, [currentFilters]);

  return {
    filters: currentFilters,
    appliedFilters: storedFilters,
    isActive: hasActiveFilters(),
    updateFilter,
    applyFilters,
    resetFilters,
    clearFilter,
    clearAllFilters
  };
}
