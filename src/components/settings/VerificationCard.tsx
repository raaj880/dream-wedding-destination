
import React, { useState, useEffect } from 'react';
import { Shield, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const VerificationCard: React.FC = () => {
  const { user } = useAuth();
  const [isVerified, setIsVerified] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'none' | 'pending' | 'approved' | 'rejected'>('none');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchVerificationStatus();
  }, [user]);

  const fetchVerificationStatus = async () => {
    if (!user) return;

    try {
      // Check if user is verified
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_verified')
        .eq('id', user.id)
        .single();

      if (profile?.is_verified) {
        setIsVerified(true);
        setVerificationStatus('approved');
        return;
      }

      // Check for existing verification requests
      const { data: request } = await supabase
        .from('verification_requests')
        .select('status')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (request) {
        setVerificationStatus(request.status as 'pending' | 'approved' | 'rejected');
      }
    } catch (error) {
      console.error('Error fetching verification status:', error);
    }
  };

  const handleRequestVerification = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from('verification_requests')
        .insert({
          user_id: user.id,
          status: 'pending'
        });

      if (error) throw error;

      setVerificationStatus('pending');
      toast({
        title: "Verification Request Submitted",
        description: "Your verification request has been submitted. Our team will review it within 24 hours.",
      });
    } catch (error) {
      console.error('Error submitting verification request:', error);
      toast({
        title: "Request Failed",
        description: "Could not submit verification request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusContent = () => {
    switch (verificationStatus) {
      case 'approved':
        return {
          icon: <CheckCircle className="w-5 h-5 text-green-500" />,
          title: "Profile Verified",
          description: "Your profile has been verified and displays a verification badge.",
          button: null
        };
      case 'pending':
        return {
          icon: <Clock className="w-5 h-5 text-yellow-500" />,
          title: "Verification Pending",
          description: "Your verification request is being reviewed. This may take up to 24 hours.",
          button: null
        };
      case 'rejected':
        return {
          icon: <AlertCircle className="w-5 h-5 text-red-500" />,
          title: "Verification Rejected",
          description: "Your verification request was not approved. You can submit a new request.",
          button: (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="w-full text-white border-card-gold/30 hover:bg-card-gold/10 hover:text-card-gold">
                  Request Verification Again
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Request Profile Verification</AlertDialogTitle>
                  <AlertDialogDescription>
                    Our team will review your profile and photos to ensure they are authentic. 
                    Make sure your profile is complete with clear photos and accurate information. 
                    This process may take up to 24 hours.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleRequestVerification} disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Request'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )
        };
      default:
        return {
          icon: <Shield className="w-5 h-5 text-card-gold/80" />,
          title: "Get Verified",
          description: "Verify your profile to increase trust and get more matches.",
          button: (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="w-full text-white border-card-gold/30 hover:bg-card-gold/10 hover:text-card-gold">
                  Request Verification
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Request Profile Verification</AlertDialogTitle>
                  <AlertDialogDescription>
                    Our team will review your profile and photos to ensure they are authentic. 
                    Make sure your profile is complete with clear photos and accurate information. 
                    This process may take up to 24 hours.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleRequestVerification} disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Request'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )
        };
    }
  };

  const { icon, title, description, button } = getStatusContent();

  return (
    <Card className="bg-card-dark-gray border border-card-gold/20 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-card-gold flex items-center">
          {icon}
          <span className="ml-3">Profile Verification</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium text-white mb-1">{title}</h4>
          <p className="text-sm text-gray-300">{description}</p>
        </div>
        {button}
      </CardContent>
    </Card>
  );
};

export default VerificationCard;
