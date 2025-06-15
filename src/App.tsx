
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import AuthPage from '@/pages/AuthPage';
import ProfilePage from '@/pages/ProfilePage';
import ProfileSetupWizard from '@/pages/ProfileSetupWizard';
import Settings from '@/pages/Settings';
import Matches from '@/pages/Matches';
import FilterScreen from '@/pages/FilterScreen';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import ProfileCompletionCheck from '@/components/auth/ProfileCompletionCheck';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import EnhancedSwipeInterface from '@/pages/EnhancedSwipeInterface';
import ChatInterface from '@/pages/ChatInterface';
import Index from '@/pages/Index';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import MobileBottomNav from '@/components/navigation/MobileBottomNav';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import TermsOfServicePage from '@/pages/TermsOfServicePage';
import AboutPage from '@/pages/AboutPage';
import BlogPage from '@/pages/BlogPage';
import ContactPage from '@/pages/ContactPage';
import HelpCenterPage from '@/pages/HelpCenterPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-background font-sans antialiased w-full">
            <Navbar />
            <div className="pb-16 md:pb-0">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/register" element={<AuthPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy" element={<PrivacyPolicyPage />} />
                <Route path="/terms" element={<TermsOfServicePage />} />
                <Route path="/help" element={<HelpCenterPage />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/profile/:id" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                <Route path="/profile-setup" element={
                  <ProtectedRoute>
                    <ProfileCompletionCheck>
                      <ProfileSetupWizard />
                    </ProfileCompletionCheck>
                  </ProtectedRoute>
                } />
                <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                <Route path="/edit-profile" element={
                  <ProtectedRoute>
                    <ProfileCompletionCheck>
                      <Settings />
                    </ProfileCompletionCheck>
                  </ProtectedRoute>
                } />
                <Route path="/matches" element={<ProtectedRoute><Matches /></ProtectedRoute>} />
                <Route path="/filter" element={<ProtectedRoute><FilterScreen /></ProtectedRoute>} />
                <Route path="/swipe" element={
                  <ProtectedRoute>
                    <ProfileCompletionCheck>
                      <EnhancedSwipeInterface />
                    </ProfileCompletionCheck>
                  </ProtectedRoute>
                } />
                <Route path="/chat/:matchId" element={<ProtectedRoute><ChatInterface /></ProtectedRoute>} />
                <Route path="/chat" element={<ProtectedRoute><ChatInterface /></ProtectedRoute>} />
              </Routes>
            </div>
            <Footer />
            <MobileBottomNav />
            <Toaster />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
