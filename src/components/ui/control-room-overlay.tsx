import { memo } from 'react';
import { cn } from '@/lib/utils';

interface ControlRoomOverlayProps {
  className?: string;
  showGrid?: boolean;
  showScanline?: boolean;
  intensity?: 'subtle' | 'medium' | 'strong';
}

export const ControlRoomOverlay = memo(({ 
  className, 
  showGrid = true, 
  showScanline = true,
  intensity = 'subtle'
}: ControlRoomOverlayProps) => {
  const opacityMap = {
    subtle: 'opacity-[0.03]',
    medium: 'opacity-[0.06]',
    strong: 'opacity-[0.1]',
  };

  const scanlineOpacityMap = {
    subtle: 'opacity-20',
    medium: 'opacity-30',
    strong: 'opacity-40',
  };

  return (
    <div className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}>
      {/* Grid Pattern */}
      {showGrid && (
        <div 
          className={cn(
            "absolute inset-0 bg-grid-pattern",
            opacityMap[intensity]
          )}
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(199, 89%, 48%) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(199, 89%, 48%) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      )}

      {/* Animated Scanline */}
      {showScanline && (
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className={cn(
              "absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent animate-scanline blur-[1px]",
              scanlineOpacityMap[intensity]
            )}
          />
        </div>
      )}

      {/* Subtle vignette for depth */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(15, 23, 42, 0.4) 100%)'
        }}
      />
    </div>
  );
});

ControlRoomOverlay.displayName = 'ControlRoomOverlay';
