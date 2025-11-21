import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { detectDeviceCapabilities } from "@/utils/deviceCapabilities";

/**
 * Performance indicator component that shows device capability status
 * Only visible in development or when explicitly enabled
 */
export function PerformanceIndicator({ show = false }: { show?: boolean }) {
  const [capabilities, setCapabilities] = useState(() => detectDeviceCapabilities());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development or when explicitly enabled
    if (show || import.meta.env.DEV) {
      setIsVisible(true);
    }
  }, [show]);

  if (!isVisible) return null;

  const getStatusColor = () => {
    if (capabilities.isLowEndDevice) return "bg-yellow-500/20 border-yellow-500/50 text-yellow-300";
    if (capabilities.isMobile) return "bg-blue-500/20 border-blue-500/50 text-blue-300";
    return "bg-green-500/20 border-green-500/50 text-green-300";
  };

  const getStatusText = () => {
    if (capabilities.isLowEndDevice) return "Performance Mode";
    if (capabilities.isMobile) return "Mobile Optimized";
    return "Full Experience";
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 z-[100] pointer-events-none"
        >
          <div className={`rounded-lg border backdrop-blur-md px-3 py-2 shadow-lg ${getStatusColor()}`}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
              <div className="text-xs font-medium">{getStatusText()}</div>
            </div>
            {import.meta.env.DEV && (
              <div className="text-[9px] opacity-70 mt-1 space-y-0.5">
                <div>Memory: {capabilities.deviceMemory}GB</div>
                <div>CPU Cores: {capabilities.hardwareConcurrency}</div>
                {capabilities.hasSlowConnection && <div>Slow Connection</div>}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
