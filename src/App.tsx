
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage"; // Import the new AuthPage
import ProfilePage from "./pages/ProfilePage"; // Import the ProfilePage
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "next-themes"; // Import ThemeProvider
import ProfileSetupWizard from "./pages/ProfileSetupWizard"; // Import the new wizard

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} /> {/* ADD THE NEW ROUTE */}
            <Route path="/profile" element={<ProfilePage />} /> {/* ADD THE PROFILE ROUTE */}
            <Route path="/profile-setup" element={<ProfileSetupWizard />} /> {/* ADD THE NEW WIZARD ROUTE */}
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
