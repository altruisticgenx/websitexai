import { useEffect, useRef, useState } from 'react';
import { useHapticFeedback } from './use-haptic-feedback';

interface PinchZoomOptions {
  minScale?: number;
  maxScale?: number;
  onZoomChange?: (scale: number) => void;
}

export function usePinchZoom<T extends HTMLElement>({
  minScale = 1,
  maxScale = 3,
  onZoomChange,
}: PinchZoomOptions = {}) {
  const elementRef = useRef<T>(null);
  const [scale, setScale] = useState(1);
  const initialDistance = useRef<number | null>(null);
  const initialScale = useRef(1);
  const { trigger } = useHapticFeedback();

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const getDistance = (touches: TouchList) => {
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        initialDistance.current = getDistance(e.touches);
        initialScale.current = scale;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && initialDistance.current !== null) {
        e.preventDefault();
        const currentDistance = getDistance(e.touches);
        const scaleChange = currentDistance / initialDistance.current;
        const newScale = Math.min(
          maxScale,
          Math.max(minScale, initialScale.current * scaleChange)
        );

        setScale(newScale);
        onZoomChange?.(newScale);

        // Trigger haptic feedback at scale milestones
        if (Math.abs(newScale - initialScale.current) > 0.3) {
          trigger('light');
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) {
        initialDistance.current = null;
        // Reset scale after a delay if zoomed
        if (scale > 1) {
          setTimeout(() => {
            setScale(1);
            onZoomChange?.(1);
            trigger('medium');
          }, 1500);
        }
      }
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scale, minScale, maxScale, onZoomChange, trigger]);

  return { elementRef, scale };
}
