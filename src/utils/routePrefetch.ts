// Route prefetching utilities for lazy-loaded pages
// This enables instant navigation by preloading route chunks on hover/focus

// Store lazy component promises
let portfolioPromise: Promise<any> | null = null;
let futureProofingPromise: Promise<any> | null = null;

// Prefetch Portfolio page
export const prefetchPortfolio = () => {
  if (!portfolioPromise) {
    portfolioPromise = import("@/pages/Portfolio");
  }
  return portfolioPromise;
};

// Prefetch FutureProofing page
export const prefetchFutureProofing = () => {
  if (!futureProofingPromise) {
    futureProofingPromise = import("@/pages/FutureProofing");
  }
  return futureProofingPromise;
};

// Reset prefetch cache (useful for development/hot reload)
export const resetPrefetchCache = () => {
  portfolioPromise = null;
  futureProofingPromise = null;
};
