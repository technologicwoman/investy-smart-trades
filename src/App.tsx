import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Signup from "./pages/Signup";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import Trade from "./pages/Trade";
import Research from "./pages/Research";
import Podcast from "./pages/Podcast";
import Strategy from "./pages/Strategy";
import Execute from "./pages/Execute";
import Approve from "./pages/Approve";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/home" element={<Home />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/research" element={<Research />} />
          <Route path="/podcast" element={<Podcast />} />
          <Route path="/strategy/:id" element={<Strategy />} />
          <Route path="/execute/:id" element={<Execute />} />
          <Route path="/approve/:id" element={<Approve />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
