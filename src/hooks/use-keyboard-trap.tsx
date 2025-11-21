import { useEffect, RefObject } from "react";

/**
 * Hook to trap keyboard focus within a container element.
 * Useful for modals, dialogs, and mobile menus to improve accessibility.
 * 
 * @param containerRef - Ref to the container element
 * @param isActive - Whether the focus trap is active
 * @param onEscape - Optional callback when Escape key is pressed
 */
export function useKeyboardTrap(
  containerRef: RefObject<HTMLElement>,
  isActive: boolean,
  onEscape?: () => void
) {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    // Focus first element when trap activates
    firstFocusable?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle Escape key
      if (e.key === "Escape" && onEscape) {
        e.preventDefault();
        onEscape();
        return;
      }

      // Handle Tab key
      if (e.key === "Tab") {
        // If only one focusable element, prevent tabbing
        if (focusableElements.length === 1) {
          e.preventDefault();
          return;
        }

        // Shift + Tab (backwards)
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable?.focus();
          }
        } 
        // Tab (forwards)
        else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable?.focus();
          }
        }
      }
    };

    container.addEventListener("keydown", handleKeyDown);

    return () => {
      container.removeEventListener("keydown", handleKeyDown);
    };
  }, [isActive, containerRef, onEscape]);
}
