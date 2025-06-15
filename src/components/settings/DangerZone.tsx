
import React from 'react';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface DangerZoneProps {
  handleDeactivate: () => void;
  handleSignOut: () => void;
}

const DangerZone: React.FC<DangerZoneProps> = ({ handleDeactivate, handleSignOut }) => {
  return (
    <Card className="bg-transparent border-red-500/30 border shadow-lg">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <Button onClick={handleDeactivate} variant="outline" className="w-full justify-start text-orange-500 border-orange-500/50 hover:bg-orange-500/10 hover:text-orange-400">
            Deactivate Account
          </Button>
          <Button onClick={handleSignOut} variant="outline" className="w-full justify-start text-red-500 border-red-500/50 hover:bg-red-500/10 hover:text-red-400">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DangerZone;
