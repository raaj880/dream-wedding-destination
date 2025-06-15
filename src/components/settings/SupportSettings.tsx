
import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SupportSettings: React.FC = () => {
  return (
    <Card className="bg-card-dark-gray border border-card-gold/20 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-card-gold flex items-center">
          <HelpCircle className="w-5 h-5 mr-3 text-card-gold/80" />
          Support & Help
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button variant="outline" asChild className="w-full justify-start text-white border-card-gold/30 hover:bg-card-gold/10 hover:text-card-gold">
          <Link to="/help">Help Center</Link>
        </Button>
        <Button variant="outline" asChild className="w-full justify-start text-white border-card-gold/30 hover:bg-card-gold/10 hover:text-card-gold">
          <Link to="/contact">Contact Support</Link>
        </Button>
        <Button variant="outline" asChild className="w-full justify-start text-white border-card-gold/30 hover:bg-card-gold/10 hover:text-card-gold">
          <Link to="/privacy">Privacy Policy</Link>
        </Button>
        <Button variant="outline" asChild className="w-full justify-start text-white border-card-gold/30 hover:bg-card-gold/10 hover:text-card-gold">
          <Link to="/terms">Terms of Service</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default SupportSettings;
