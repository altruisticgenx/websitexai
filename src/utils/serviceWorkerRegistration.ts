/**
 * Service Worker Registration Utility
 * Handles registration, updates, and lifecycle events
 */

export interface ServiceWorkerConfig {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
  onOffline?: () => void;
  onOnline?: () => void;
}

export function registerServiceWorker(config?: ServiceWorkerConfig) {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = `${import.meta.env.BASE_URL}service-worker.js`;

      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          console.log('[SW] Service Worker registered:', registration);

          // Check for updates periodically
          setInterval(() => {
            registration.update();
          }, 60 * 60 * 1000); // Check every hour

          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker == null) {
              return;
            }

            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  // New update available
                  console.log('[SW] New content available; please refresh.');
                  config?.onUpdate?.(registration);
                } else {
                  // Content cached for offline use
                  console.log('[SW] Content cached for offline use.');
                  config?.onSuccess?.(registration);
                }
              }
            };
          };
        })
        .catch((error) => {
          console.error('[SW] Service Worker registration failed:', error);
        });
    });

    // Handle online/offline events
    window.addEventListener('online', () => {
      console.log('[SW] Back online');
      config?.onOnline?.();
    });

    window.addEventListener('offline', () => {
      console.log('[SW] Gone offline');
      config?.onOffline?.();
    });
  }
}

export function unregisterServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error('[SW] Service Worker unregistration failed:', error);
      });
  }
}

/**
 * Send a message to the service worker
 */
export function sendMessageToSW(message: any) {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage(message);
  }
}

/**
 * Request background sync for contact submissions
 */
export function requestBackgroundSync(tag: string = 'sync-contact-submissions') {
  if ('serviceWorker' in navigator && 'sync' in ServiceWorkerRegistration.prototype) {
    navigator.serviceWorker.ready
      .then((registration) => {
        // @ts-ignore - Background Sync API not yet in TypeScript definitions
        return registration.sync.register(tag);
      })
      .then(() => {
        console.log('[SW] Background sync registered:', tag);
      })
      .catch((error) => {
        console.error('[SW] Background sync registration failed:', error);
      });
  }
}

/**
 * Check if the app is running in standalone mode (installed as PWA)
 */
export function isStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true
  );
}

/**
 * Check if offline
 */
export function isOffline(): boolean {
  return !navigator.onLine;
}
