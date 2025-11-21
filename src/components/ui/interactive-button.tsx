import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useHapticFeedback, HapticPattern } from '@/hooks/use-haptic-feedback';
import { TouchRipple } from './touch-ripple';

export interface InteractiveButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof MotionProps> {
  children: ReactNode;
  haptic?: HapticPattern;
  rippleColor?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const variants = {
  default: 'bg-background text-foreground border border-border hover:bg-accent',
  primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  outline: 'border border-primary text-primary hover:bg-primary/10',
  ghost: 'hover:bg-accent hover:text-accent-foreground'
};

const sizes = {
  sm: 'text-xs px-3 py-1.5 min-h-[36px]',
  md: 'text-sm px-4 py-2 min-h-[44px]',
  lg: 'text-base px-6 py-3 min-h-[48px]'
};

export const InteractiveButton = forwardRef<HTMLButtonElement, InteractiveButtonProps>(
  ({ 
    children, 
    className,
    haptic = 'light',
    rippleColor,
    variant = 'default',
    size = 'md',
    onClick,
    disabled,
    ...props 
  }, ref) => {
    const { trigger } = useHapticFeedback();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled) {
        trigger(haptic);
        onClick?.(e);
      }
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: disabled ? 1 : 0.97 }}
        transition={{ duration: 0.1 }}
        className={cn(
          "relative overflow-hidden rounded-lg font-medium transition-all duration-200 touch-manipulation",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          className
        )}
        onClick={handleClick}
        disabled={disabled}
        {...props}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
        {!disabled && <TouchRipple color={rippleColor} />}
      </motion.button>
    );
  }
);

InteractiveButton.displayName = 'InteractiveButton';
