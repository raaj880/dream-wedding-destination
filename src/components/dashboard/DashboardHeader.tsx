
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DashboardHeader: React.FC = () => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/placeholder.svg" alt="Profile" />
            <AvatarFallback className="bg-soft-pink text-deep-blue">U</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-bold text-deep-blue">Welcome back!</h1>
            <p className="text-sm text-gray-600">Ready to find your match?</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5 text-gray-600" />
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/settings">
              <Settings className="w-5 h-5 text-gray-600" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
