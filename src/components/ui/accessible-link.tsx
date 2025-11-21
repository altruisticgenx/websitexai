import * as React from "react";
import { Link, LinkProps } from "react-router-dom";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useHapticFeedback } from "@/hooks/use-haptic-feedback";

const accessibleLinkVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all focus-ring interactive disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "text-primary underline-offset-4 hover:underline",
        button: "bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2",
        ghost: "hover:bg-accent hover:text-accent-foreground px-3 py-2",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2",
      },
      size: {
        default: "text-sm min-h-[44px]",
        sm: "text-xs min-h-[40px]",
        lg: "text-base min-h-[48px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface AccessibleLinkProps
  extends Omit<LinkProps, "className">,
    VariantProps<typeof accessibleLinkVariants> {
  className?: string;
  /**
   * Whether the link points to an external resource
   */
  external?: boolean;
  /**
   * ARIA label for the link (useful for icon-only links or when link text needs clarification)
   */
  "aria-label"?: string;
}

const AccessibleLink = React.forwardRef<HTMLAnchorElement, AccessibleLinkProps>(
  ({ className, variant, size, external = false, onClick, children, ...props }, ref) => {
    const { trigger } = useHapticFeedback();
    
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      trigger('light');
      onClick?.(e);
    };

    const externalProps = external
      ? {
          target: "_blank",
          rel: "noopener noreferrer",
          "aria-describedby": "external-link-description",
        }
      : {};

    return (
      <>
        <Link
          ref={ref}
          className={cn(accessibleLinkVariants({ variant, size, className }))}
          onClick={handleClick}
          {...externalProps}
          {...props}
        >
          {children}
          {external && (
            <span className="sr-only">(opens in a new tab)</span>
          )}
        </Link>
        
        {/* Hidden description for screen readers about external links */}
        {external && (
          <span id="external-link-description" className="sr-only">
            External links open in a new tab
          </span>
        )}
      </>
    );
  },
);

AccessibleLink.displayName = "AccessibleLink";

export { AccessibleLink, accessibleLinkVariants };
