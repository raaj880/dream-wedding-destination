
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import AuthPage from '@/pages/AuthPage';
import ProfilePage from '@/pages/ProfilePage';
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

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-background font-sans antialiased">
            <Navbar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/register" element={<AuthPage />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/profile/:id" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
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
            <Footer />
            <Toaster />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
