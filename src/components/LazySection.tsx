import { useState, useEffect, useRef, ReactNode } from "react";

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  threshold?: number;
}

export function LazySection({ 
  children, 
  fallback = null, 
  rootMargin = "100px",
  threshold = 0.01 
}: LazySectionProps) {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return (
    <div ref={sectionRef}>
      {isInView ? children : fallback}
    </div>
  );
}
