
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Check, X, Clock, Shield, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface VerificationRequest {
  id: string;
  user_id: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  profile: {
    full_name: string;
    photos: string[];
    location: string;
    age: number;
  };
}

const VerificationQueue: React.FC = () => {
  const [requests, setRequests] = useState<VerificationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    fetchVerificationRequests();
  }, []);

  const fetchVerificationRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('verification_requests')
        .select(`
          id,
          user_id,
          status,
          created_at,
          profiles!inner(
            full_name,
            photos,
            location,
            age
          )
        `)
        .eq('status', 'pending')
        .order('created_at', { ascending: true });

      if (error) throw error;

      const formattedRequests = data?.map(request => ({
        id: request.id,
        user_id: request.user_id,
        status: request.status as 'pending' | 'approved' | 'rejected',
        created_at: request.created_at,
        profile: {
          full_name: request.profiles.full_name || 'Unknown',
          photos: request.profiles.photos || [],
          location: request.profiles.location || 'Unknown',
          age: request.profiles.age || 0,
        }
      })) || [];

      setRequests(formattedRequests);
    } catch (error) {
      console.error('Error fetching verification requests:', error);
      toast({
        title: "Error Loading Requests",
        description: "Could not load verification requests. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (requestId: string) => {
    setProcessing(requestId);
    try {
      const { error } = await supabase.rpc('approve_verification_request', {
        request_id: requestId
      });

      if (error) throw error;

      // Remove from list
      setRequests(prev => prev.filter(req => req.id !== requestId));
      
      toast({
        title: "Request Approved",
        description: "The verification request has been approved and the user is now verified.",
      });
    } catch (error) {
      console.error('Error approving request:', error);
      toast({
        title: "Approval Failed",
        description: "Could not approve the verification request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (requestId: string) => {
    setProcessing(requestId);
    try {
      const { error } = await supabase.rpc('reject_verification_request', {
        request_id: requestId
      });

      if (error) throw error;

      // Remove from list
      setRequests(prev => prev.filter(req => req.id !== requestId));
      
      toast({
        title: "Request Rejected",
        description: "The verification request has been rejected.",
      });
    } catch (error) {
      console.error('Error rejecting request:', error);
      toast({
        title: "Rejection Failed",
        description: "Could not reject the verification request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-4">
        <div className="container mx-auto max-w-4xl flex items-center">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/dashboard">
              <ArrowLeft className="w-6 h-6" />
            </Link>
          </Button>
          <div className="ml-3 flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Verification Queue</h1>
              <p className="text-sm text-muted-foreground">
                {requests.length} pending verification requests
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto max-w-4xl px-4 py-8">
        {requests.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Clock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">All Caught Up!</h3>
              <p className="text-muted-foreground">
                There are no pending verification requests at the moment.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {requests.map((request) => (
              <Card key={request.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage 
                          src={request.profile.photos[0]} 
                          alt={request.profile.full_name} 
                        />
                        <AvatarFallback className="text-xl">
                          {request.profile.full_name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">
                          {request.profile.full_name}
                        </h3>
                        <p className="text-muted-foreground">
                          {request.profile.age} years old • {request.profile.location}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Requested {new Date(request.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                      <Clock className="w-3 h-3 mr-1" />
                      Pending
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  {/* Photo Gallery */}
                  {request.profile.photos.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-medium text-foreground mb-3">Profile Photos</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {request.profile.photos.slice(0, 4).map((photo, index) => (
                          <div key={index} className="aspect-square rounded-lg overflow-hidden">
                            <img
                              src={photo}
                              alt={`Photo ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <Button variant="outline" asChild>
                      <Link to={`/profile/${request.user_id}`}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Full Profile
                      </Link>
                    </Button>
                    
                    <div className="flex gap-2 ml-auto">
                      <Button
                        variant="outline"
                        onClick={() => handleReject(request.id)}
                        disabled={processing === request.id}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <X className="w-4 h-4 mr-2" />
                        {processing === request.id ? 'Processing...' : 'Reject'}
                      </Button>
                      
                      <Button
                        onClick={() => handleApprove(request.id)}
                        disabled={processing === request.id}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        {processing === request.id ? 'Processing...' : 'Approve'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationQueue;
