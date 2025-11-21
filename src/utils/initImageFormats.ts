import { detectFormatSupport } from "./imageOptimization";

/**
 * Initialize image format detection early in app lifecycle
 * Call this from main.tsx to cache format support before components render
 */
export function initImageFormats(): void {
  if (typeof window !== 'undefined') {
    // Run detection asynchronously without blocking app startup
    detectFormatSupport().catch((error) => {
      console.warn('Failed to detect image format support:', error);
    });
  }
}
