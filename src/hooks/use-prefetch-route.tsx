import { useEffect } from 'react';

/**
 * Prefetch route assets on hover/focus for faster navigation
 */
export function usePrefetchRoute() {
  useEffect(() => {
    const prefetchedRoutes = new Set<string>();

    const handleLinkHover = (e: MouseEvent | FocusEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="/"]') as HTMLAnchorElement;
      
      if (!link) return;
      
      const href = link.getAttribute('href');
      if (!href || prefetchedRoutes.has(href)) return;

      // Mark as prefetched
      prefetchedRoutes.add(href);

      // Create a hidden link to trigger browser prefetch
      const prefetchLink = document.createElement('link');
      prefetchLink.rel = 'prefetch';
      prefetchLink.href = href;
      document.head.appendChild(prefetchLink);
    };

    // Add event listeners
    document.addEventListener('mouseover', handleLinkHover);
    document.addEventListener('focusin', handleLinkHover);

    return () => {
      document.removeEventListener('mouseover', handleLinkHover);
      document.removeEventListener('focusin', handleLinkHover);
    };
  }, []);
}
