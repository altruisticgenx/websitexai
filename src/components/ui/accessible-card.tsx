import * as React from "react";
import { cn } from "@/lib/utils";

export interface AccessibleCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether the card is interactive (clickable/focusable)
   */
  interactive?: boolean;
  /**
   * Optional heading level for the card title
   */
  headingLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  /**
   * ARIA label for the card (required if interactive and no visible label)
   */
  "aria-label"?: string;
}

const AccessibleCard = React.forwardRef<HTMLDivElement, AccessibleCardProps>(
  ({ className, interactive = false, headingLevel, children, ...props }, ref) => {
    const CardComponent = interactive ? "article" : "div";
    
    return (
      <CardComponent
        ref={ref}
        className={cn(
          "rounded-lg border border-border bg-card text-card-foreground shadow-sm",
          "transition-all duration-200",
          interactive && [
            "cursor-pointer hover:shadow-md hover:scale-[1.02]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "focus-visible:ring-offset-2 active:scale-[0.98]",
            "touch-manipulation"
          ],
          className
        )}
        tabIndex={interactive ? 0 : undefined}
        role={interactive ? "button" : undefined}
        {...props}
      >
        {children}
      </CardComponent>
    );
  }
);
AccessibleCard.displayName = "AccessibleCard";

const AccessibleCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
AccessibleCardHeader.displayName = "AccessibleCardHeader";

const AccessibleCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & { as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" }
>(({ className, as: Component = "h3", ...props }, ref) => (
  <Component
    ref={ref as any}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight sm:text-xl",
      className
    )}
    {...props}
  />
));
AccessibleCardTitle.displayName = "AccessibleCardTitle";

const AccessibleCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
AccessibleCardDescription.displayName = "AccessibleCardDescription";

const AccessibleCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
AccessibleCardContent.displayName = "AccessibleCardContent";

const AccessibleCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
AccessibleCardFooter.displayName = "AccessibleCardFooter";

export {
  AccessibleCard,
  AccessibleCardHeader,
  AccessibleCardFooter,
  AccessibleCardTitle,
  AccessibleCardDescription,
  AccessibleCardContent,
};
