import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Briefcase, MessageCircle, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from '@/components/ui/badge';

interface MatchCardProps {
  match: {
    id: string;
    fullName: string;
    age: number;
    location: string;
    profession: string;
    religion: string;
    photos: string[];
    verified: boolean;
    status: string;
    lastSeen: string;
  };
  index: number;
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'new':
      return <Badge className="bg-primary text-primary-foreground text-xs">💕 New Match</Badge>;
    case 'typing':
      return <Badge className="bg-green-100 text-green-700 text-xs">Typing...</Badge>;
    default:
      return null;
  }
};

const getStatusColor = (status: string) => {
  if (status === 'new') return 'text-primary';
  if (status === 'typing') return 'text-green-500';
  return 'text-muted-foreground';
};

const MatchCard: React.FC<MatchCardProps> = ({ match, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="bg-card border-0 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group">
        <CardContent className="p-0">
          <Link to={`/chat/${match.id}`} className="block">
            <div className="p-4 flex items-center space-x-4">
              {/* Profile Picture */}
              <div className="relative">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={match.photos[0]} alt={match.fullName} className="object-cover" />
                  <AvatarFallback className="text-lg bg-secondary text-secondary-foreground">
                    {match.fullName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {match.verified && (
                  <div className="absolute -bottom-1 -right-1">
                    <Badge variant="highlight" className="h-6 w-6 p-0 flex items-center justify-center rounded-full border-2 border-card">
                      <Check className="w-4 h-4" />
                    </Badge>
                  </div>
                )}
              </div>

              {/* Match Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-lg font-semibold text-foreground truncate">
                    {match.fullName}, {match.age}
                  </h3>
                  {getStatusBadge(match.status)}
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground mb-1">
                  <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                  <span className="truncate">{match.location}</span>
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <Briefcase className="w-3 h-3 mr-1 flex-shrink-0" />
                  <span className="truncate">{match.profession} • {match.religion}</span>
                </div>
                
                <p className={`text-xs ${getStatusColor(match.status)}`}>
                  {match.lastSeen}
                </p>
              </div>

              {/* Chat Button */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center group-hover:bg-primary/90 transition-colors">
                  <MessageCircle className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>
            </div>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MatchCard;
