import { memo, SVGProps } from 'react';
import { LucideIcon } from 'lucide-react';

/**
 * OptimizedIcon Component
 * 
 * Wrapper for Lucide icons with performance optimizations:
 * - Memoized to prevent unnecessary re-renders
 * - Configurable stroke width for better visual consistency
 * - Accessible by default with proper ARIA attributes
 * 
 * Usage:
 * ```tsx
 * import { Mail } from 'lucide-react';
 * <OptimizedIcon icon={Mail} className="h-4 w-4" aria-label="Email" />
 * ```
 */

interface OptimizedIconProps extends SVGProps<SVGSVGElement> {
  icon: LucideIcon;
  size?: number | string;
  strokeWidth?: number;
  'aria-label'?: string;
  'aria-hidden'?: boolean;
}

export const OptimizedIcon = memo<OptimizedIconProps>(
  ({ icon: Icon, size, strokeWidth = 2, className, 'aria-label': ariaLabel, 'aria-hidden': ariaHidden, ...props }) => {
    const iconSize = size ? { width: size, height: size } : {};
    
    return (
      <Icon
        {...iconSize}
        strokeWidth={strokeWidth}
        className={className}
        aria-label={ariaLabel}
        aria-hidden={ariaHidden ?? !ariaLabel}
        {...props}
      />
    );
  }
);

OptimizedIcon.displayName = 'OptimizedIcon';

/**
 * IconGroup Component
 * 
 * Renders a group of icons with consistent sizing and spacing.
 * Useful for feature lists, social links, or navigation items.
 * 
 * Usage:
 * ```tsx
 * <IconGroup icons={[Mail, Phone, MapPin]} size={20} gap="md" />
 * ```
 */

interface IconGroupProps {
  icons: LucideIcon[];
  size?: number | string;
  strokeWidth?: number;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
  iconClassName?: string;
}

const gapClasses = {
  sm: 'gap-1',
  md: 'gap-2',
  lg: 'gap-4',
};

export const IconGroup = memo<IconGroupProps>(
  ({ icons, size = 20, strokeWidth = 2, gap = 'md', className = '', iconClassName = '' }) => {
    return (
      <div className={`flex items-center ${gapClasses[gap]} ${className}`}>
        {icons.map((Icon, index) => (
          <OptimizedIcon
            key={index}
            icon={Icon}
            size={size}
            strokeWidth={strokeWidth}
            className={iconClassName}
            aria-hidden
          />
        ))}
      </div>
    );
  }
);

IconGroup.displayName = 'IconGroup';
