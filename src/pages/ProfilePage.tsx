
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileScreen from '@/components/profile/ProfileScreen';
import { ProfileData } from '@/types/profile';

// Mock profile data - in a real app, this would come from your state management or API
const mockProfileData: ProfileData = {
  photos: [],
  photoPreviews: [
    'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face'
  ],
  fullName: 'Priya Sharma',
  dob: new Date('1995-06-15'),
  gender: 'female',
  location: 'Bangalore, India',
  religion: 'Hindu',
  community: 'Lingayat',
  languages: 'Kannada, English, Hindi',
  profession: 'Software Developer',
  education: 'B.E. in Computer Science',
  height: '5\'5"',
  marryTimeframe: '1y',
  partnerAgeRange: [26, 32],
  partnerLocation: 'Bangalore or nearby',
  profileVisibility: 'matches',
  bio: 'I\'m a passionate software developer who loves creating innovative solutions. In my free time, I enjoy reading, traveling, and exploring new cuisines. I believe in building meaningful relationships based on trust, respect, and shared values. Looking forward to meeting someone who shares similar interests and life goals.',
};

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate('/profile-setup');
  };

  const handleSettings = () => {
    navigate('/settings');
  };

  return (
    <ProfileScreen 
      profileData={mockProfileData}
      onEditProfile={handleEditProfile}
      onSettings={handleSettings}
    />
  );
};

export default ProfilePage;
