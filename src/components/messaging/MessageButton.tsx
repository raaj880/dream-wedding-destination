
import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Heart, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useMutualMatch } from '@/hooks/useMutualMatch';

interface MessageButtonProps {
  targetUserId: string;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
  className?: string;
  showLabel?: boolean;
}

const MessageButton: React.FC<MessageButtonProps> = ({
  targetUserId,
  size = 'default',
  variant = 'default',
  className = '',
  showLabel = true
}) => {
  const { isMutualMatch, matchId, loading } = useMutualMatch(targetUserId);

  if (loading) {
    return (
      <Button 
        disabled 
        size={size} 
        variant={variant} 
        className={className}
      >
        <MessageCircle className="w-4 h-4 mr-2" />
        {showLabel && 'Loading...'}
      </Button>
    );
  }

  if (!isMutualMatch || !matchId) {
    return (
      <Button 
        disabled 
        size={size} 
        variant="outline" 
        className={`${className} opacity-50 cursor-not-allowed`}
        title="You need to match first to send messages"
      >
        <Lock className="w-4 h-4 mr-2" />
        {showLabel && 'Match Required'}
      </Button>
    );
  }

  return (
    <Button 
      size={size} 
      variant={variant} 
      className={className}
      asChild
    >
      <Link to={`/chat/${matchId}`}>
        <MessageCircle className="w-4 h-4 mr-2" />
        {showLabel && 'Send Message'}
      </Link>
    </Button>
  );
};

export default MessageButton;
