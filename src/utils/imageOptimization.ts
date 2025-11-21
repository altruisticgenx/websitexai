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
 * Cache for browser format support detection
 */
let formatSupportCache: { avif: boolean; webp: boolean } | null = null;

/**
 * Detect browser support for modern image formats (AVIF, WebP)
 * Returns cached results after first detection for performance
 */
export async function detectFormatSupport(): Promise<{ avif: boolean; webp: boolean }> {
  if (formatSupportCache) return formatSupportCache;
  
  if (typeof window === 'undefined') {
    return { avif: false, webp: false };
  }

  const checkFormat = (format: 'avif' | 'webp'): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image();
      
      // Tiny 1x1 test images
      const testImages = {
        avif: 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=',
        webp: 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=',
      };

      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = testImages[format];
    });
  };

  const [avif, webp] = await Promise.all([
    checkFormat('avif'),
    checkFormat('webp'),
  ]);

  formatSupportCache = { avif, webp };
  return formatSupportCache;
}

/**
 * Get recommended image format based on browser support (synchronous)
 * Note: This uses cached values. Call detectFormatSupport() early in app lifecycle
 */
export function getRecommendedImageFormat(): 'avif' | 'webp' | 'jpg' {
  if (!formatSupportCache) {
    // Initialize detection if not done yet
    detectFormatSupport();
    return 'jpg'; // Fallback until detection completes
  }
  
  if (formatSupportCache.avif) return 'avif';
  if (formatSupportCache.webp) return 'webp';
  return 'jpg';
}

/**
 * Generate optimized image URL with format query parameter
 * Works with Supabase Storage transform API
 */
export function getOptimizedImageUrl(
  baseUrl: string,
  options: {
    width?: number;
    quality?: number;
    format?: 'avif' | 'webp' | 'jpg' | 'auto';
  } = {}
): string {
  const { width, quality = 80, format = 'auto' } = options;
  
  const url = new URL(baseUrl);
  const params = new URLSearchParams();
  
  // Determine format
  const targetFormat = format === 'auto' ? getRecommendedImageFormat() : format;
  
  if (width) params.set('width', width.toString());
  params.set('quality', quality.toString());
  params.set('format', targetFormat);
  
  url.search = params.toString();
  return url.toString();
}

/**
 * Generate responsive srcSet with multiple sizes and formats
 * Creates URLs for 400w, 800w, 1200w with optimal format
 */
export function generateResponsiveSrcSet(
  baseUrl: string,
  format?: 'avif' | 'webp' | 'jpg'
): string {
  const targetFormat = format || getRecommendedImageFormat();
  const widths = [400, 800, 1200];
  
  return widths
    .map((width) => {
      const url = getOptimizedImageUrl(baseUrl, { width, format: targetFormat });
      return `${url} ${width}w`;
    })
    .join(', ');
}

/**
 * Generate picture element sources for maximum browser compatibility
 * Returns array of source elements with different formats
 */
export function generatePictureSources(
  baseUrl: string,
  sizes: string = "(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
): Array<{ srcSet: string; type: string; sizes: string }> {
  const sources: Array<{ srcSet: string; type: string; sizes: string }> = [];
  
  // Only add AVIF and WebP if supported
  if (formatSupportCache?.avif) {
    sources.push({
      srcSet: generateResponsiveSrcSet(baseUrl, 'avif'),
      type: 'image/avif',
      sizes,
    });
  }
  
  if (formatSupportCache?.webp) {
    sources.push({
      srcSet: generateResponsiveSrcSet(baseUrl, 'webp'),
      type: 'image/webp',
      sizes,
    });
  }
  
  // Always include JPG fallback
  sources.push({
    srcSet: generateResponsiveSrcSet(baseUrl, 'jpg'),
    type: 'image/jpeg',
    sizes,
  });
  
  return sources;
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
