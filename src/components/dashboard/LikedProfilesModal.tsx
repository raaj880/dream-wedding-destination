
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface LikedProfile {
  id: string;
  full_name: string;
  age: number;
  location: string;
  photos: string[];
  profession?: string;
  interaction_type: string;
  created_at: string;
}

interface LikedProfilesModalProps {
  isOpen: boolean;
  onClose: () => void;
  profiles: LikedProfile[];
  loading: boolean;
}

const LikedProfilesModal: React.FC<LikedProfilesModalProps> = ({
  isOpen,
  onClose,
  profiles,
  loading
}) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getInteractionBadge = (type: string) => {
    switch (type) {
      case 'like':
        return <Badge variant="secondary" className="bg-red-100 text-red-700">❤️ Liked</Badge>;
      case 'superlike':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-700">⭐ Super Liked</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Profiles You've Liked ({profiles.length})</DialogTitle>
        </DialogHeader>
        
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-deep-blue"></div>
          </div>
        ) : profiles.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">You haven't liked any profiles yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {profiles.map((profile) => (
              <Card key={profile.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16">
                      {profile.photos?.[0] && (
                        <AvatarImage src={profile.photos[0]} alt={profile.full_name} />
                      )}
                      <AvatarFallback className="bg-soft-pink text-deep-blue">
                        {getInitials(profile.full_name)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg">{profile.full_name}</h3>
                        {getInteractionBadge(profile.interaction_type)}
                      </div>
                      <p className="text-gray-600">
                        Age {profile.age} • {profile.location}
                      </p>
                      {profile.profession && (
                        <p className="text-sm text-gray-500">{profile.profession}</p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">
                        Liked on {formatDate(profile.created_at)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LikedProfilesModal;
