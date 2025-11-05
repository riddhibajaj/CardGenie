import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/Dashboard";
import SmartSelector from "./components/SmartSelector";
import AlertsCenter from "./components/AlertsCenter";
import ChatAssistant from "./components/ChatAssistant";
import CardAnalysis from "./components/CardAnalysis";
import RewardsCalendar from "./components/RewardsCalendar";
import Profile from "./components/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/selector" element={<SmartSelector />} />
          <Route path="/alerts" element={<AlertsCenter />} />
          <Route path="/chat" element={<ChatAssistant />} />
          <Route path="/card/:cardId" element={<CardAnalysis />} />
          <Route path="/calendar" element={<RewardsCalendar />} />
          <Route path="/profile" element={<Profile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
