import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { FeedbackToast } from "@/components/ui/feedback-toast";
import { AutoLoginModal } from "@/components/ui/auto-login-modal";
import { QuizAudioProvider } from "@/components/ui/quiz-audio-system";
import { FloatingAudioControl } from "@/components/ui/floating-audio-control";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/providers/AuthProvider";

// Audio debugging removed due to infinite recursion

// Static imports for now to ensure everything works
import Index from "./pages/Index";
import Categories from "./pages/Categories";
import Quiz from "./pages/Quiz";
import Leaderboard from "./pages/Leaderboard";
import Contests from "./pages/Contests";
import Rewards from "./pages/Rewards";
import Profile from "./pages/Profile";

import AdminDashboard from "./pages/AdminDashboard";
import DemoAccess from "./pages/DemoAccess";
import Test from "./pages/Test";
import PhoneAuthTest from "./pages/PhoneAuthTest";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

const AppContent = () => {
  const { user, userData, loading } = useAuth();
  const [showAutoLoginModal, setShowAutoLoginModal] = useState(false);

  useEffect(() => {
    // Show auto-login modal after auth loading is complete and user is not logged in
    if (!loading && !user) {
      // Check if user has dismissed the modal recently (within 24 hours)
      const lastDismissed = localStorage.getItem("auto-login-dismissed");
      const shouldShow =
        !lastDismissed ||
        Date.now() - parseInt(lastDismissed) > 24 * 60 * 60 * 1000;

      if (shouldShow) {
        const timer = setTimeout(() => {
          setShowAutoLoginModal(true);
        }, 2000); // Show after 2 seconds

        return () => clearTimeout(timer);
      }
    }
  }, [loading, user]);

  const handleCloseAutoLoginModal = () => {
    setShowAutoLoginModal(false);
    // Remember that user dismissed the modal
    localStorage.setItem("auto-login-dismissed", Date.now().toString());
  };

  return (
    <>
      <Toaster />
      <Sonner />
      <FeedbackToast />
      <AutoLoginModal
        isOpen={showAutoLoginModal}
        onClose={handleCloseAutoLoginModal}
      />
      {/* <FloatingAudioControl /> */}
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quiz/:categoryId" element={<Quiz />} />
          <Route path="/quiz/day/:day" element={<Quiz />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/contests" element={<Contests />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/demo" element={<DemoAccess />} />
          <Route path="/test" element={<Test />} />
          <Route path="/phone-auth-test" element={<PhoneAuthTest />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

import { ErrorBoundary } from "@/components/ErrorBoundary";

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <QuizAudioProvider>
          <TooltipProvider>
            <AppContent />
          </TooltipProvider>
        </QuizAudioProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
