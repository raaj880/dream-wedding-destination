
import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export const useSwipeTutorial = () => {
  const [hasSeenTutorial, setHasSeenTutorial] = useLocalStorage('hasSeenSwipeTutorial', false);
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    // Show tutorial for new users
    if (!hasSeenTutorial) {
      setShowTutorial(true);
    }
  }, [hasSeenTutorial]);

  const completeTutorial = () => {
    setHasSeenTutorial(true);
    setShowTutorial(false);
  };

  const resetTutorial = () => {
    setHasSeenTutorial(false);
    setShowTutorial(true);
  };

  return {
    showTutorial,
    completeTutorial,
    resetTutorial,
    hasSeenTutorial
  };
};
