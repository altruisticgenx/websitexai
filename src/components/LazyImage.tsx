import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholderClassName?: string;
  placeholderSrc?: string;
  aspectRatio?: "square" | "video" | "portrait" | "wide";
  onLoadComplete?: () => void;
}

const aspectRatioClasses = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  wide: "aspect-[21/9]",
};

export function LazyImage({ 
  src, 
  alt, 
  className, 
  placeholderClassName,
  placeholderSrc,
  aspectRatio,
  onLoadComplete,
  ...props 
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "100px", // Start loading when image is 100px away from viewport
        threshold: 0.01,
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoadComplete?.();
  };

  const handleError = () => {
    setHasError(true);
    console.error(`Failed to load image: ${src}`);
  };

  return (
    <div 
      className={cn(
        "relative overflow-hidden bg-muted",
        aspectRatio && aspectRatioClasses[aspectRatio]
      )}
    >
      {/* Placeholder while loading */}
      {!isLoaded && !hasError && (
        <>
          {placeholderSrc ? (
            <img
              src={placeholderSrc}
              alt=""
              className={cn(
                "absolute inset-0 w-full h-full object-cover blur-sm scale-110",
                placeholderClassName
              )}
              aria-hidden="true"
            />
          ) : (
            <div
              className={cn(
                "absolute inset-0 animate-pulse bg-gradient-to-br from-muted via-muted/50 to-muted",
                placeholderClassName
              )}
              aria-hidden="true"
            />
          )}
        </>
      )}
      
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground text-xs">
          Failed to load image
        </div>
      )}
      
      {/* Actual image */}
      <img
        ref={imgRef}
        src={isInView ? src : undefined}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-500",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        decoding="async"
        {...props}
      />
    </div>
  );
}

// Hook for lazy-loading background images
export function useLazyBackgroundImage(imageUrl: string) {
  const [loadedImageUrl, setLoadedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!elementRef.current || !imageUrl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Preload image
          const img = new Image();
          img.src = imageUrl;
          img.onload = () => {
            setLoadedImageUrl(imageUrl);
            setIsLoading(false);
          };
          img.onerror = () => {
            setIsLoading(false);
            console.error(`Failed to load background image: ${imageUrl}`);
          };
          observer.disconnect();
        }
      },
      {
        rootMargin: "100px",
        threshold: 0.01,
      }
    );

    observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, [imageUrl]);

  return { elementRef, loadedImageUrl, isLoading };
}
