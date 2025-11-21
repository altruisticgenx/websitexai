import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Portfolio from "./pages/Portfolio";
import Pilots from "./pages/Pilots";
import PilotQuiz from "./pages/PilotQuiz";
import PilotDetail from "./pages/PilotDetail";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import FutureProofing from "./pages/FutureProofing";
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
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/pilots" element={<Pilots />} />
          <Route path="/pilot-quiz" element={<PilotQuiz />} />
          <Route path="/pilots/:id" element={<PilotDetail />} />
          <Route path="/case-study/:id" element={<CaseStudyDetail />} />
          <Route path="/solutions/future-proofing" element={<FutureProofing />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
