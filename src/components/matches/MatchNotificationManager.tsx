
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useRealTimeMatches } from '@/hooks/useRealTimeMatches';
import MatchNotification from './MatchNotification';

const MatchNotificationManager: React.FC = () => {
  const navigate = useNavigate();
  const { newMatches, removeNewMatch } = useRealTimeMatches();

  const handleMessage = (matchId: string) => {
    removeNewMatch(matchId);
    navigate('/matches');
  };

  const handleClose = (matchId: string) => {
    removeNewMatch(matchId);
  };

  // Show only the most recent match notification
  const currentMatch = newMatches[newMatches.length - 1];

  return (
    <AnimatePresence>
      {currentMatch && (
        <MatchNotification
          key={currentMatch.id}
          match={currentMatch}
          onMessage={() => handleMessage(currentMatch.id)}
          onClose={() => handleClose(currentMatch.id)}
        />
      )}
    </AnimatePresence>
  );
};

export default MatchNotificationManager;
