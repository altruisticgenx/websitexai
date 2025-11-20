import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export function SwipeIndicator() {
  const [showIndicator, setShowIndicator] = useState(true);

  useEffect(() => {
    const hasSeenIndicator = localStorage.getItem('hasSeenSwipeIndicator');
    if (hasSeenIndicator) {
      setShowIndicator(false);
      return;
    }

    // Hide after 5 seconds
    const timer = setTimeout(() => {
      setShowIndicator(false);
      localStorage.setItem('hasSeenSwipeIndicator', 'true');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {showIndicator && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 md:hidden"
        >
          <div className="flex flex-col items-center gap-2 rounded-full bg-slate-900/90 backdrop-blur-sm border border-primary/30 px-4 py-3 shadow-lg">
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronUp className="h-4 w-4 text-primary" />
            </motion.div>
            <span className="text-[10px] text-slate-300 font-medium">Swipe to navigate</span>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="h-4 w-4 text-primary" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
