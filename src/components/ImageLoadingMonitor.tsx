import { useEffect, useState } from 'react';
import { useImagePerformance } from '@/hooks/use-image-performance';

/**
 * Development-only component to monitor image loading performance
 * Shows real-time stats in the browser console
 */
export function ImageLoadingMonitor() {
  const { getStats } = useImagePerformance();
  const [stats, setStats] = useState({ count: 0, average: 0, max: 0, min: 0 });

  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== 'development') return;

    const interval = setInterval(() => {
      const currentStats = getStats();
      if (currentStats.count > 0) {
        setStats(currentStats);
        console.log('[Image Performance Stats]', {
          totalImages: currentStats.count,
          avgLoadTime: `${currentStats.average.toFixed(0)}ms`,
          maxLoadTime: `${currentStats.max.toFixed(0)}ms`,
          minLoadTime: `${currentStats.min.toFixed(0)}ms`,
        });
      }
    }, 10000); // Log every 10 seconds

    return () => clearInterval(interval);
  }, [getStats]);

  // Don't render anything in production
  if (process.env.NODE_ENV !== 'development') return null;

  // Show floating performance badge in development
  if (stats.count === 0) return null;

  return (
    <div
      className="fixed bottom-20 right-4 z-50 rounded-lg border border-emerald-500/30 bg-slate-900/95 p-3 text-xs backdrop-blur-sm"
      style={{ minWidth: '200px' }}
    >
      <div className="mb-1 font-semibold text-emerald-400">Image Performance</div>
      <div className="space-y-0.5 text-slate-300">
        <div className="flex justify-between">
          <span>Loaded:</span>
          <span className="font-mono">{stats.count}</span>
        </div>
        <div className="flex justify-between">
          <span>Avg:</span>
          <span className="font-mono">{stats.average.toFixed(0)}ms</span>
        </div>
        <div className="flex justify-between">
          <span>Max:</span>
          <span className="font-mono">{stats.max.toFixed(0)}ms</span>
        </div>
      </div>
    </div>
  );
}
