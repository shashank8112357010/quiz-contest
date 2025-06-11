import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/providers/AuthProvider";

// Static imports for now to ensure everything works
import Index from "./pages/Index";
import Categories from "./pages/Categories";
import Quiz from "./pages/Quiz";
import Leaderboard from "./pages/Leaderboard";
import Contests from "./pages/Contests";
import Rewards from "./pages/Rewards";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
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
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/quiz/:categoryId" element={<Quiz />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/contests" element={<Contests />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
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
