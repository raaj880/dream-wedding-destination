
export interface ProfileData {
  photos: File[];
  photoPreviews: string[];
  fullName: string;
  dob?: Date;
  gender: 'male' | 'female' | 'other' | '';
  location: string; // Simplified from auto-suggest
  religion: string;
  community: string;
  languages: string; // Simplified from multi-select chips to comma-separated string
  profession: string;
  education: string;
  height: string; // e.g., "5'10\"" or "178cm"
  marryTimeframe: '6m' | '1y' | '2y' | 'norush' | '';
  partnerAgeRange: [number, number];
  partnerLocation: string;
  profileVisibility: 'everyone' | 'matches' | 'match_family' | '';
  bio: string;
}

export const initialProfileData: ProfileData = {
  photos: [],
  photoPreviews: [],
  fullName: '',
  dob: undefined,
  gender: '',
  location: '',
  religion: '',
  community: '',
  languages: '',
  profession: '',
  education: '',
  height: '',
  marryTimeframe: '',
  partnerAgeRange: [20, 40],
  partnerLocation: '',
  profileVisibility: '',
  bio: '',
};

