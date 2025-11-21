import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useHapticFeedback } from "@/hooks/use-haptic-feedback";

const accessibleButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium ring-offset-background transition-all focus-ring interactive disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-4 py-2 text-sm min-h-[44px] min-w-[44px]",
        sm: "h-10 px-3 text-xs min-h-[44px] min-w-[44px]",
        lg: "h-12 px-6 text-base min-h-[48px] min-w-[48px]",
        icon: "h-11 w-11 min-h-[44px] min-w-[44px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface AccessibleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof accessibleButtonVariants> {
  asChild?: boolean;
  /**
   * Required ARIA label for accessibility when button contains only an icon
   */
  "aria-label"?: string;
}

const AccessibleButton = React.forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  ({ className, variant, size, asChild = false, onClick, children, ...props }, ref) => {
    const { trigger } = useHapticFeedback();
    const Comp = asChild ? Slot : "button";
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      // Trigger haptic feedback based on variant
      const hapticPattern = variant === 'destructive' ? 'warning' : 'light';
      trigger(hapticPattern);
      
      // Call original onClick if provided
      onClick?.(e);
    };

    // Warn in development if aria-label is missing and button might contain only icons
    React.useEffect(() => {
      if (process.env.NODE_ENV === 'development' && !props['aria-label'] && !props['aria-labelledby']) {
        const hasTextContent = React.Children.toArray(children).some(
          child => typeof child === 'string' || (React.isValidElement(child) && child.type === 'span')
        );
        if (!hasTextContent) {
          console.warn(
            'AccessibleButton: Consider adding an aria-label for icon-only buttons to improve accessibility'
          );
        }
      }
    }, [children, props]);
    
    return (
      <Comp 
        className={cn(accessibleButtonVariants({ variant, size, className }))} 
        ref={ref} 
        onClick={handleClick}
        {...props} 
      >
        {children}
      </Comp>
    );
  },
);
AccessibleButton.displayName = "AccessibleButton";

export { AccessibleButton, accessibleButtonVariants };
