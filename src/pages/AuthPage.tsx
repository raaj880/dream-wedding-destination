
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LogoWithTagline from '@/components/auth/LogoWithTagline';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';
import AuthSuccessPlaceholder from '@/components/auth/AuthSuccessPlaceholder';
import { Card, CardContent } from '@/components/ui/card';

const AuthPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    // In a real app, you'd redirect or update global state
    console.log("Login successful, showing placeholder.");
  };

  const handleSignupSuccess = () => {
    setIsAuthenticated(true);
    // In a real app, you'd redirect or update global state
    console.log("Signup successful, showing placeholder.");
  };
  
  const handleSetupProfile = () => {
    console.log("Redirecting to profile setup...");
    // Placeholder for navigation
    alert("Navigate to profile setup page (not implemented).");
    setIsAuthenticated(false); // Reset for demo purposes
    setActiveTab('login');
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-soft-pink/20 via-white to-white p-4">
        <LogoWithTagline />
        <AuthSuccessPlaceholder onSetupProfile={handleSetupProfile} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-soft-pink/20 via-white to-white p-4 font-sans">
      <div className="w-full max-w-md">
        <LogoWithTagline />
        <Card className="shadow-xl rounded-2xl">
          <CardContent className="p-6 md:p-8">
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'signup')} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100 rounded-xl">
                <TabsTrigger 
                  value="login" 
                  className="data-[state=active]:bg-deep-blue data-[state=active]:text-white rounded-lg py-2.5"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger 
                  value="signup" 
                  className="data-[state=active]:bg-deep-blue data-[state=active]:text-white rounded-lg py-2.5"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <LoginForm onSwitchToSignup={() => setActiveTab('signup')} onLoginSuccess={handleLoginSuccess} />
              </TabsContent>
              <TabsContent value="signup">
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
