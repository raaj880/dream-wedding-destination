
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';

const AccountSettings: React.FC = () => {
  return (
    <Card className="bg-card-dark-gray border border-card-gold/20 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-card-gold flex items-center">
          <User className="w-5 h-5 mr-3 text-card-gold/80" />
          Account Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button variant="outline" asChild className="w-full justify-start text-white border-card-gold/30 hover:bg-card-gold/10 hover:text-card-gold">
          <Link to="/profile-setup">
            Edit Profile Information
          </Link>
        </Button>
        <Button variant="outline" className="w-full justify-start text-white border-card-gold/30 hover:bg-card-gold/10 hover:text-card-gold" onClick={() => toast({ title: "Coming Soon!", description: "This feature is not yet implemented."})}>
          Change Password
        </Button>
        <Button variant="outline" asChild className="w-full justify-start text-white border-card-gold/30 hover:bg-card-gold/10 hover:text-card-gold">
          <Link to="/profile-setup">
            Manage Photos
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default AccountSettings;
