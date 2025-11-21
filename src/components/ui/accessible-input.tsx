import * as React from "react";
import { cn } from "@/lib/utils";

export interface AccessibleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Label text for the input - required for accessibility
   */
  label: string;
  /**
   * Error message to display
   */
  error?: string;
  /**
   * Helper text to display below the input
   */
  helperText?: string;
  /**
   * Whether to visually hide the label (still accessible to screen readers)
   */
  hideLabel?: boolean;
}

const AccessibleInput = React.forwardRef<HTMLInputElement, AccessibleInputProps>(
  ({ className, label, error, helperText, hideLabel = false, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const errorId = error ? `${inputId}-error` : undefined;
    const helperId = helperText ? `${inputId}-helper` : undefined;

    return (
      <div className="w-full space-y-2">
        <label 
          htmlFor={inputId}
          className={cn(
            "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            hideLabel && "sr-only"
          )}
        >
          {label}
          {props.required && <span className="text-destructive ml-1" aria-hidden="true">*</span>}
        </label>
        
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2",
            "text-sm ring-offset-background file:border-0 file:bg-transparent",
            "file:text-sm file:font-medium placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            "min-h-[44px] touch-manipulation",
            error && "border-destructive focus-visible:ring-destructive",
            className
          )}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={cn(errorId, helperId)}
          {...props}
        />

        {error && (
          <p 
            id={errorId}
            className="text-sm text-destructive"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        )}

        {helperText && !error && (
          <p 
            id={helperId}
            className="text-sm text-muted-foreground"
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

AccessibleInput.displayName = "AccessibleInput";

export { AccessibleInput };
