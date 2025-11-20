/**
 * Preload critical assets dynamically for better performance
 * This runs before React mounts to optimize initial load
 */

export function preloadCriticalAssets() {
  // Preload hero background assets if needed
  const preloadImage = (src: string) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  };

  // Preload critical modules
  const preloadModule = (src: string) => {
    const link = document.createElement('link');
    link.rel = 'modulepreload';
    link.href = src;
    document.head.appendChild(link);
  };

  // Add priority hints for critical resources
  const addFetchPriority = (selector: string, priority: 'high' | 'low') => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
      el.setAttribute('fetchpriority', priority);
    });
  };

  // Set high priority for above-the-fold images
  requestIdleCallback(() => {
    addFetchPriority('img[data-critical="true"]', 'high');
  });
}

// Run immediately when script loads
if (typeof window !== 'undefined') {
  // Wait for DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadCriticalAssets);
  } else {
    preloadCriticalAssets();
  }
}
