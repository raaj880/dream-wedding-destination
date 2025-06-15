
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LogoWithTagline from '@/components/auth/LogoWithTagline';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import AuthSuccessPlaceholder from '@/components/auth/AuthSuccessPlaceholder';
import { Card, CardContent } from '@/components/ui/card';

const AuthPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    console.log("Login successful, showing placeholder.");
  };

  const handleSignupSuccess = () => {
    setIsAuthenticated(true);
    console.log("Signup successful, showing placeholder.");
  };
  
  const handleSetupProfile = () => {
    console.log("Redirecting to profile setup...");
    navigate('/profile-setup');
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black p-4">
        <LogoWithTagline />
        <AuthSuccessPlaceholder onSetupProfile={handleSetupProfile} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-4 font-sans">
      <div className="w-full max-w-md">
        <LogoWithTagline />
        <Card className="shadow-2xl rounded-3xl overflow-hidden border border-card-gold/20 bg-card-dark-gray/90 backdrop-blur-xl">
          <CardContent className="p-8">
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'signup')} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-card-charcoal rounded-xl p-1 border border-card-gold/20 max-w-full">
                <TabsTrigger 
                  value="login" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-card-gold data-[state=active]:to-card-accent data-[state=active]:text-black rounded-lg py-2.5 px-4 transition-all duration-300 font-semibold text-gray-300 data-[state=active]:shadow-lg data-[state=active]:shadow-card-gold/20 hover:bg-white/10 data-[state=active]:hover:brightness-110 text-sm"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger 
                  value="signup" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-card-gold data-[state=active]:to-card-accent data-[state=active]:text-black rounded-lg py-2.5 px-4 transition-all duration-300 font-semibold text-gray-300 data-[state=active]:shadow-lg data-[state=active]:shadow-card-gold/20 hover:bg-white/10 data-[state=active]:hover:brightness-110 text-sm"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login" className="animate-in fade-in-50 duration-400 ease-out">
                <LoginForm onSwitchToSignup={() => setActiveTab('signup')} onLoginSuccess={handleLoginSuccess} />
              </TabsContent>
              <TabsContent value="signup" className="animate-in fade-in-50 duration-400 ease-out">
                <SignupForm onSwitchToLogin={() => setActiveTab('login')} onSignupSuccess={handleSignupSuccess} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
