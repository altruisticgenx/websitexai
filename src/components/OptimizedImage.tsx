import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { generatePictureSources, detectFormatSupport } from "@/utils/imageOptimization";

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholderClassName?: string;
  aspectRatio?: "square" | "video" | "portrait" | "wide";
  onLoadComplete?: () => void;
  sizes?: string;
  enableModernFormats?: boolean;
}

const aspectRatioClasses = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  wide: "aspect-[21/9]",
};

export function OptimizedImage({ 
  src, 
  alt, 
  className, 
  placeholderClassName,
  aspectRatio,
  onLoadComplete,
  sizes = "(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px",
  enableModernFormats = true,
  ...props 
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [sources, setSources] = useState<Array<{ srcSet: string; type: string; sizes: string }>>([]);
  const imgRef = useRef<HTMLImageElement>(null);

  // Initialize format detection on mount
  useEffect(() => {
    detectFormatSupport().then(() => {
      if (enableModernFormats) {
        setSources(generatePictureSources(src, sizes));
      }
    });
  }, [src, sizes, enableModernFormats]);

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
        rootMargin: "100px",
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
        <div
          className={cn(
            "absolute inset-0 animate-pulse bg-gradient-to-br from-muted via-muted/50 to-muted",
            placeholderClassName
          )}
          aria-hidden="true"
        />
      )}
      
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground text-xs">
          Failed to load image
        </div>
      )}
      
      {/* Optimized picture element with multiple formats */}
      {isInView && enableModernFormats && sources.length > 0 ? (
        <picture>
          {sources.map((source, index) => (
            <source
              key={index}
              srcSet={source.srcSet}
              type={source.type}
              sizes={source.sizes}
            />
          ))}
          <img
            ref={imgRef}
            src={src}
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
        </picture>
      ) : (
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
      )}
    </div>
  );
}
