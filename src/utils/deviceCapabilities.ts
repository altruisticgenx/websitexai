/**
 * Device capability detection utilities for performance optimization
 */

export interface DeviceCapabilities {
  isLowEndDevice: boolean;
  isMobile: boolean;
  supportsReducedMotion: boolean;
  hasSlowConnection: boolean;
  deviceMemory: number;
  hardwareConcurrency: number;
}

/**
 * Detect device capabilities for conditional rendering
 */
export function detectDeviceCapabilities(): DeviceCapabilities {
  // Check if running in browser
  if (typeof window === 'undefined') {
    return {
      isLowEndDevice: false,
      isMobile: false,
      supportsReducedMotion: false,
      hasSlowConnection: false,
      deviceMemory: 8,
      hardwareConcurrency: 4,
    };
  }

  // Mobile detection
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) || window.innerWidth < 768;

  // Check for reduced motion preference
  const supportsReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Device memory (in GB) - Chrome only
  const deviceMemory = (navigator as any).deviceMemory || 8;

  // Hardware concurrency (number of CPU cores)
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;

  // Network speed detection
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  const hasSlowConnection = connection 
    ? (connection.effectiveType === 'slow-2g' || 
       connection.effectiveType === '2g' || 
       connection.saveData === true)
    : false;

  // Determine if device is low-end based on multiple factors
  const isLowEndDevice = 
    deviceMemory <= 4 || // Less than 4GB RAM
    hardwareConcurrency <= 2 || // 2 or fewer CPU cores
    hasSlowConnection || // Slow network
    (isMobile && deviceMemory <= 4); // Mobile with limited memory

  return {
    isLowEndDevice,
    isMobile,
    supportsReducedMotion,
    hasSlowConnection,
    deviceMemory,
    hardwareConcurrency,
  };
}

/**
 * Check if heavy animations should be disabled
 */
export function shouldDisableHeavyAnimations(): boolean {
  const capabilities = detectDeviceCapabilities();
  return (
    capabilities.isLowEndDevice ||
    capabilities.supportsReducedMotion ||
    capabilities.hasSlowConnection
  );
}

/**
 * Get animation duration based on device capabilities
 */
export function getAnimationDuration(baseMs: number): number {
  const capabilities = detectDeviceCapabilities();
  
  if (capabilities.supportsReducedMotion) {
    return 0;
  }
  
  if (capabilities.isLowEndDevice) {
    return baseMs * 0.5; // 50% faster on low-end devices
  }
  
  return baseMs;
}

/**
 * Check if 3D transforms should be enabled
 */
export function should3DTransformsBeEnabled(): boolean {
  const capabilities = detectDeviceCapabilities();
  return !capabilities.isLowEndDevice && !capabilities.supportsReducedMotion;
}
