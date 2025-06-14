import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Profile from '@/pages/Profile';
import EditProfile from '@/pages/EditProfile';
import Matches from '@/pages/Matches';
import Filter from '@/pages/Filter';
import ProtectedRoute from '@/components/ProtectedRoute';
import ProfileCompletionCheck from '@/components/ProfileCompletionCheck';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import { QueryClient } from 'react-query';
import SwipeInterface from '@/pages/SwipeInterface';
import EnhancedSwipeInterface from '@/pages/EnhancedSwipeInterface';
import Chat from '@/pages/Chat';
import SuperAdmin from '@/pages/SuperAdmin';
import AdminRoute from '@/components/AdminRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <QueryClient>
          <div className="min-h-screen bg-background font-sans antialiased">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/profile/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/edit-profile" element={
                <ProtectedRoute>
                  <ProfileCompletionCheck>
                    <EditProfile />
                  </ProfileCompletionCheck>
                </ProtectedRoute>
              } />
              <Route path="/matches" element={<ProtectedRoute><Matches /></ProtectedRoute>} />
              <Route path="/filter" element={<ProtectedRoute><Filter /></ProtectedRoute>} />
              <Route path="/swipe" element={
                <ProtectedRoute>
                  <ProfileCompletionCheck>
                    <EnhancedSwipeInterface />
                  </ProfileCompletionCheck>
                </ProtectedRoute>
              } />
              <Route path="/chat/:matchId" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
              <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
              <Route path="/admin" element={<AdminRoute><SuperAdmin /></AdminRoute>} />
            </Routes>
            <Toaster />
          </div>
        </QueryClient>
      </AuthProvider>
    </Router>
  );
}

export default App;
