import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useHapticFeedback } from '@/hooks/use-haptic-feedback';
import { TouchRipple } from './touch-ripple';

export interface InteractiveCardProps extends Omit<HTMLAttributes<HTMLDivElement>, keyof MotionProps> {
  children: ReactNode;
  hover3d?: boolean;
  clickable?: boolean;
  haptic?: boolean;
}

export const InteractiveCard = forwardRef<HTMLDivElement, InteractiveCardProps>(
  ({ 
    children, 
    className,
    hover3d = false,
    clickable = false,
    haptic = false,
    onClick,
    ...props 
  }, ref) => {
    const { trigger } = useHapticFeedback();

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (clickable && haptic) {
        trigger('light');
      }
      onClick?.(e);
    };

    return (
      <motion.div
        ref={ref}
        whileHover={hover3d ? { y: -4, scale: 1.01 } : undefined}
        whileTap={clickable ? { scale: 0.98 } : undefined}
        transition={{ duration: 0.2 }}
        className={cn(
          "relative rounded-xl border bg-card text-card-foreground shadow-md transition-shadow duration-300",
          hover3d && "hover:shadow-xl hover:shadow-primary/10",
          clickable && "cursor-pointer touch-manipulation",
          className
        )}
        onClick={handleClick}
        style={hover3d ? { transformStyle: 'preserve-3d' } : undefined}
        {...props}
      >
        <div className="relative z-10">
          {children}
        </div>
        {clickable && <TouchRipple color="rgba(var(--primary), 0.2)" />}
      </motion.div>
    );
  }
);

InteractiveCard.displayName = 'InteractiveCard';
