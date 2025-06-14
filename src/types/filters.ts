
export interface FilterOptions {
  ageRange: [number, number];
  location: string;
  nearbyOnly: boolean;
  religions: string[];
  community: string;
  education: string;
  maritalIntent: string;
  languages: string[];
  verifiedOnly: boolean;
}

export const initialFilterOptions: FilterOptions = {
  ageRange: [20, 45],
  location: '',
  nearbyOnly: false,
  religions: [],
  community: '',
  education: '',
  maritalIntent: '',
  languages: [],
  verifiedOnly: false,
};

export interface FilterState {
  filters: FilterOptions;
  appliedFilters: FilterOptions;
  isActive: boolean;
}
