
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from '@/components/ui/badge';

const mockMatches = [
  {
    id: 1,
    name: 'Ananya Sharma',
    age: 27,
    location: 'Mumbai, India',
    profession: 'Product Manager',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    matchPercentage: 95,
    verified: true
  },
  {
    id: 2,
    name: 'Rahul Gupta',
    age: 29,
    location: 'Bangalore, India',
    profession: 'Software Engineer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    matchPercentage: 92,
    verified: true
  },
  {
    id: 3,
    name: 'Kavya Reddy',
    age: 26,
    location: 'Hyderabad, India',
    profession: 'Doctor',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
    matchPercentage: 88,
    verified: false
  }
];

const Matches: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-pink/20 via-white to-white dark:from-deep-blue/20 dark:via-gray-900 dark:to-black">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-deep-blue dark:text-white mb-2">Your Matches</h1>
          <p className="text-gray-600 dark:text-gray-300">
            {mockMatches.length} matches found based on your preferences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockMatches.map((match) => (
            <Card key={match.id} className="bg-white dark:bg-gray-800 border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-0">
                <div className="relative">
                  <Avatar className="w-full h-64 rounded-t-lg rounded-b-none">
                    <AvatarImage src={match.image} alt={match.name} className="object-cover w-full h-full" />
                    <AvatarFallback className="w-full h-full rounded-t-lg rounded-b-none text-4xl">
                      {match.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-green-500 text-white">{match.matchPercentage}% match</Badge>
                  </div>
                  {match.verified && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-blue-500 text-white">✓ Verified</Badge>
                    </div>
                  )}
                </div>
                
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-deep-blue dark:text-white">
                      {match.name}, {match.age}
                    </h3>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <MapPin className="w-4 h-4 mr-1" />
                    {match.location}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <Briefcase className="w-4 h-4 mr-1" />
                    {match.profession}
                  </div>
                  
                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" className="flex-1 bg-deep-blue text-white hover:bg-deep-blue/90 dark:bg-soft-pink dark:text-deep-blue dark:hover:bg-soft-pink/90">
                      Connect
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 border-deep-blue text-deep-blue hover:bg-deep-blue/10 dark:border-soft-pink dark:text-soft-pink dark:hover:bg-soft-pink/10">
                      View Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Matches;
