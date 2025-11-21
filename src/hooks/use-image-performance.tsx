import { useEffect, useRef, useCallback } from 'react';

/**
 * Hook to monitor image loading performance
 * Tracks load times and reports slow loading images
 */
export function useImagePerformance() {
  const loadTimesRef = useRef<Map<string, number>>(new Map());
  const startTimesRef = useRef<Map<string, number>>(new Map());

  const startTracking = useCallback((src: string) => {
    startTimesRef.current.set(src, performance.now());
  }, []);

  const endTracking = useCallback((src: string) => {
    const startTime = startTimesRef.current.get(src);
    if (startTime) {
      const loadTime = performance.now() - startTime;
      loadTimesRef.current.set(src, loadTime);
      startTimesRef.current.delete(src);

      // Log slow images in development
      if (process.env.NODE_ENV === 'development' && loadTime > 2000) {
        console.warn(
          `[Image Performance] Slow load detected: ${src} took ${loadTime.toFixed(0)}ms`
        );
      }

      return loadTime;
    }
    return 0;
  }, []);

  const getStats = useCallback(() => {
    const times = Array.from(loadTimesRef.current.values());
    if (times.length === 0) {
      return { count: 0, average: 0, max: 0, min: 0 };
    }

    const sum = times.reduce((a, b) => a + b, 0);
    return {
      count: times.length,
      average: sum / times.length,
      max: Math.max(...times),
      min: Math.min(...times),
    };
  }, []);

  const reset = useCallback(() => {
    loadTimesRef.current.clear();
    startTimesRef.current.clear();
  }, []);

  return {
    startTracking,
    endTracking,
    getStats,
    reset,
  };
}

/**
 * Hook to detect if user prefers reduced data usage
 * Useful for deciding image quality/lazy loading strategy
 */
export function usePreferReducedData(): boolean {
  if (typeof navigator === 'undefined') return false;

  // Check for Data Saver mode
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  
  if (connection?.saveData) {
    return true;
  }

  // Check for slow connection
  if (connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g') {
    return true;
  }

  return false;
}

/**
 * Hook to observe image visibility and loading state
 * Provides visibility percentage and loading metrics
 */
export function useImageObserver(ref: React.RefObject<HTMLElement>) {
  const visibilityRef = useRef<number>(0);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibilityRef.current = entry.intersectionRatio;
        });
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref]);

  return {
    getVisibility: () => visibilityRef.current,
  };
}
