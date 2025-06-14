import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ProfileCompletionCheck from "@/components/auth/ProfileCompletionCheck";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import Dashboard from "./pages/Dashboard";
import Matches from "./pages/Matches";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import AboutPage from "./pages/AboutPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import HelpCenterPage from "./pages/HelpCenterPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import FeaturesPage from "./pages/FeaturesPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import FAQPage from "./pages/FAQPage";
import SwipeInterface from "./pages/SwipeInterface";
import ChatInterface from "./pages/ChatInterface";
import FilterScreen from "./pages/FilterScreen";
import ProfileSetupWizard from "./pages/ProfileSetupWizard";
import Navbar from "./components/landing/Navbar";
import Footer from "./components/landing/Footer";
import MatchNotificationManager from "./components/matches/MatchNotificationManager";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/help" element={<HelpCenterPage />} />
                  <Route path="/privacy" element={<PrivacyPolicyPage />} />
                  <Route path="/terms" element={<TermsOfServicePage />} />
                  <Route path="/features" element={<FeaturesPage />} />
                  <Route path="/testimonials" element={<TestimonialsPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  
                  {/* Protected Routes with Profile Completion Check */}
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <ProfileCompletionCheck>
                        <Dashboard />
                      </ProfileCompletionCheck>
                    </ProtectedRoute>
                  } />
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <ProfileCompletionCheck>
                        <ProfilePage />
                      </ProfileCompletionCheck>
                    </ProtectedRoute>
                  } />
                  <Route path="/matches" element={
                    <ProtectedRoute>
                      <ProfileCompletionCheck>
                        <Matches />
                      </ProfileCompletionCheck>
                    </ProtectedRoute>
                  } />
                  <Route path="/swipe" element={
                    <ProtectedRoute>
                      <ProfileCompletionCheck>
                        <SwipeInterface />
                      </ProfileCompletionCheck>
                    </ProtectedRoute>
                  } />
                  <Route path="/chat/:userId" element={
                    <ProtectedRoute>
                      <ProfileCompletionCheck>
                        <ChatInterface />
                      </ProfileCompletionCheck>
                    </ProtectedRoute>
                  } />
                  <Route path="/settings" element={
                    <ProtectedRoute>
                      <ProfileCompletionCheck>
                        <Settings />
                      </ProfileCompletionCheck>
                    </ProtectedRoute>
                  } />
                  <Route path="/filter" element={
                    <ProtectedRoute>
                      <ProfileCompletionCheck>
                        <FilterScreen />
                      </ProfileCompletionCheck>
                    </ProtectedRoute>
                  } />
                  
                  {/* Profile Setup - No profile completion check */}
                  <Route path="/profile-setup" element={
                    <ProtectedRoute>
                      <ProfileSetupWizard />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
              
              {/* Global Match Notifications */}
              <MatchNotificationManager />
            </div>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
