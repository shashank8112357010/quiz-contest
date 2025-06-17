import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { FeedbackToast } from "@/components/ui/feedback-toast";

// Static imports for now to ensure everything works
import Index from "./pages/Index";
import Categories from "./pages/Categories";
import Quiz from "./pages/Quiz";
import { QuizAudioProvider } from "@/components/ui/quiz-audio-system";
import Leaderboard from "./pages/Leaderboard";
import Contests from "./pages/Contests";
import Rewards from "./pages/Rewards";
import Profile from "./pages/Profile";

import AdminDashboard from "./pages/AdminDashboard";
import DemoAccess from "./pages/DemoAccess";
import Test from "./pages/Test";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <FeedbackToast />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/quiz" element={<QuizAudioProvider><Quiz /></QuizAudioProvider>} />
            <Route path="/quiz/:categoryId" element={<QuizAudioProvider><Quiz /></QuizAudioProvider>} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/contests" element={<Contests />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/profile" element={<Profile />} />

            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/demo" element={<DemoAccess />} />
            <Route path="/test" element={<Test />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
