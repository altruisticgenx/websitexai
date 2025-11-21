import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Smooth content loader component for better perceived performance
 */
export function ContentLoader({ 
  isLoading, 
  children,
  className,
  fallback,
}: { 
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
  fallback?: React.ReactNode;
}) {
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={cn("animate-pulse", className)}
      >
        {fallback || (
          <div className="space-y-4">
            <div className="h-8 bg-muted rounded-lg w-3/4" />
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-5/6" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded-xl" />
              ))}
            </div>
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Skeleton component for loading states
 */
export function Skeleton({ 
  className,
  variant = "default",
}: { 
  className?: string;
  variant?: "default" | "card" | "text" | "button";
}) {
  const baseClasses = "animate-pulse bg-muted rounded";
  
  const variantClasses = {
    default: "h-4",
    card: "h-32",
    text: "h-3",
    button: "h-10",
  };

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)} />
  );
}

/**
 * Card skeleton for loading card grids
 */
export function CardSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="rounded-xl border border-border/50 bg-card/30 p-3 space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton variant="text" className="w-16" />
              <Skeleton variant="text" className="w-12 ml-auto" />
            </div>
            <Skeleton variant="text" className="w-full h-4" />
            <Skeleton variant="text" className="w-3/4 h-3" />
            <div className="pt-2 border-t border-border/30">
              <Skeleton variant="text" className="w-1/2 h-3" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
