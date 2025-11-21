import * as React from "react";
import { cn } from "@/lib/utils";

export interface SkipToContentProps {
  /**
   * The ID of the main content element to skip to
   * @default "main-content"
   */
  contentId?: string;
  /**
   * Custom label for the skip link
   * @default "Skip to main content"
   */
  label?: string;
  className?: string;
}

/**
 * SkipToContent provides a keyboard-accessible link that allows users to bypass
 * navigation and jump directly to the main content. This is a WCAG 2.1 Level A requirement.
 * 
 * Usage:
 * 1. Add <SkipToContent /> as the first element in your layout
 * 2. Add id="main-content" (or your custom ID) to your main content container
 * 
 * @example
 * ```tsx
 * <body>
 *   <SkipToContent />
 *   <header>...</header>
 *   <main id="main-content">
 *     {children}
 *   </main>
 * </body>
 * ```
 */
export function SkipToContent({ 
  contentId = "main-content", 
  label = "Skip to main content",
  className 
}: SkipToContentProps) {
  return (
    <a
      href={`#${contentId}`}
      className={cn(
        "sr-only focus:not-sr-only",
        "fixed top-4 left-4 z-[9999]",
        "rounded-md bg-primary px-4 py-2",
        "text-sm font-medium text-primary-foreground",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-ring focus-visible:ring-offset-2",
        "transition-all",
        className
      )}
    >
      {label}
    </a>
  );
}
