/**
 * Image Optimization Utilities
 * 
 * Utilities for optimizing image loading and performance across the application.
 * Use these helpers to ensure images are loaded efficiently and don't impact page performance.
 */

/**
 * Generates a low-quality placeholder data URL for an image
 * Useful for blur-up effects while the full image loads
 */
export function generatePlaceholderDataUrl(
  width: number = 10,
  height: number = 10,
  color: string = '#1e293b'
): string {
  // Create a simple colored rectangle as placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="${color}"/>
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Preloads critical images that should be loaded immediately
 * Useful for hero images or above-the-fold content
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Batch preload multiple images
 */
export async function preloadImages(sources: string[]): Promise<void[]> {
  return Promise.all(sources.map(preloadImage));
}

/**
 * Get optimal image dimensions based on viewport and device pixel ratio
 * Helps load appropriately sized images for different devices
 */
export function getOptimalImageSize(
  containerWidth: number,
  containerHeight: number,
  maxDpr: number = 2
): { width: number; height: number } {
  const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
  return {
    width: Math.ceil(containerWidth * dpr),
    height: Math.ceil(containerHeight * dpr),
  };
}

/**
 * Check if images should use lazy loading based on connection quality
 * Returns false for slow connections to prioritize performance
 */
export function shouldLazyLoad(): boolean {
  if (typeof window === 'undefined') return true;
  
  // Check if Network Information API is available
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  
  if (!connection) return true;
  
  // Disable lazy loading on very slow connections
  if (connection.saveData || connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
    return false;
  }
  
  return true;
}

/**
 * Monitor image loading performance
 */
export function trackImageLoad(src: string, loadTime: number): void {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Image Performance] ${src} loaded in ${loadTime}ms`);
  }
  
  // Can integrate with analytics here
  if (loadTime > 3000) {
    console.warn(`[Image Performance] Slow image load: ${src} took ${loadTime}ms`);
  }
}

/**
 * Get recommended image format based on browser support
 */
export function getRecommendedImageFormat(): 'webp' | 'avif' | 'jpg' {
  if (typeof window === 'undefined') return 'jpg';
  
  // Check WebP support
  const canvas = document.createElement('canvas');
  if (canvas.getContext && canvas.getContext('2d')) {
    // Check for WebP support
    const webpSupport = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    if (webpSupport) return 'webp';
  }
  
  // Check AVIF support (modern browsers)
  const avifSupport = document.createElement('img');
  if (avifSupport && 'decode' in avifSupport) {
    return 'avif';
  }
  
  return 'jpg';
}

/**
 * Estimate image file size based on dimensions
 * Useful for deciding whether to lazy load
 */
export function estimateImageSize(width: number, height: number, format: 'jpg' | 'png' | 'webp' = 'jpg'): number {
  const pixels = width * height;
  const compressionRatio = {
    jpg: 0.1,   // ~10% of raw size
    png: 0.3,   // ~30% of raw size
    webp: 0.07, // ~7% of raw size
  };
  
  const bytesPerPixel = 4; // RGBA
  return Math.ceil(pixels * bytesPerPixel * (compressionRatio[format] || 0.1));
}
