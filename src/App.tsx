import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ScrollRestoration } from "@/components/effects/ScrollRestoration";
import { ImageLoadingMonitor } from "@/components/media/ImageLoadingMonitor";
import { PageTransition } from "@/components/effects/PageTransition";
import Index from "./pages/Index";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import NotFound from "./pages/NotFound";

// Lazy-loaded routes for code splitting
const Portfolio = lazy(() => import("./pages/Portfolio"));
const FutureProofing = lazy(() => import("./pages/FutureProofing"));

// Loading fallback component
const RouteLoadingFallback = () => (
  <div className="min-h-screen bg-slate-950 flex items-center justify-center">
    <div className="text-center space-y-4">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <p className="text-sm text-muted-foreground">Loading page...</p>
    </div>
  </div>
);

const queryClient = new QueryClient();

// Animated Routes wrapper component
function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={<Index />} 
        />
        <Route 
          path="/portfolio" 
          element={
            <Suspense fallback={<RouteLoadingFallback />}>
              <PageTransition>
                <Portfolio />
              </PageTransition>
            </Suspense>
          } 
        />
        <Route 
          path="/case-study/:id" 
          element={
            <PageTransition>
              <CaseStudyDetail />
            </PageTransition>
          } 
        />
        <Route 
          path="/solutions/future-proofing" 
          element={
            <Suspense fallback={<RouteLoadingFallback />}>
              <PageTransition>
                <FutureProofing />
              </PageTransition>
            </Suspense>
          } 
        />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route 
          path="*" 
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <ScrollRestoration />
        <AnimatedRoutes />
        <ImageLoadingMonitor />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
