
import { useEffect } from 'react';

interface KeyboardControlsProps {
  displayProfiles: any[];
  swipeLoading: boolean;
  handleSwipeAction: (profileId: string, action: 'like' | 'pass' | 'superlike') => void;
  resetSwipes: () => void;
}

const KeyboardControls: React.FC<KeyboardControlsProps> = ({
  displayProfiles,
  swipeLoading,
  handleSwipeAction,
  resetSwipes
}) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (swipeLoading) return;
      
      const firstProfile = displayProfiles[0];
      
      if (!firstProfile) return;
      
      switch (event.key) {
        case 'ArrowLeft':
        case 'x':
        case 'X':
          handleSwipeAction(firstProfile.id, 'pass');
          break;
        case 'ArrowRight':
        case 'z':
        case 'Z':
          handleSwipeAction(firstProfile.id, 'like');
          break;
        case 'ArrowUp':
        case 's':
        case 'S':
          handleSwipeAction(firstProfile.id, 'superlike');
          break;
        case 'r':
        case 'R':
          resetSwipes();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleSwipeAction, displayProfiles, swipeLoading, resetSwipes]);

  return null; // This component only handles keyboard events
};

export default KeyboardControls;
