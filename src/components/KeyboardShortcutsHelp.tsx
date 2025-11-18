import { motion } from "framer-motion";
import { Keyboard } from "lucide-react";

export function KeyboardShortcutsHelp() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-6 left-6 z-40 hidden lg:block"
    >
      <div className="group relative">
        <div className="rounded-full border border-slate-800/60 bg-slate-900/40 backdrop-blur-sm p-2 text-slate-400 hover:text-primary hover:border-primary/30 transition-all duration-200 cursor-help">
          <Keyboard size={16} />
        </div>
        
        <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block">
          <div className="rounded-xl border border-slate-800/80 bg-slate-900/95 backdrop-blur-sm p-4 shadow-xl min-w-[280px]">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
              Keyboard Shortcuts
            </div>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between gap-4">
                <kbd className="px-2 py-1 bg-slate-800 rounded font-mono text-[10px]">Home</kbd>
                <span>Scroll to top</span>
              </div>
              <div className="flex justify-between gap-4">
                <kbd className="px-2 py-1 bg-slate-800 rounded font-mono text-[10px]">End</kbd>
                <span>Scroll to bottom</span>
              </div>
              <div className="flex justify-between gap-4">
                <kbd className="px-2 py-1 bg-slate-800 rounded font-mono text-[10px]">1-9</kbd>
                <span>Jump to section</span>
              </div>
              <div className="flex justify-between gap-4">
                <kbd className="px-2 py-1 bg-slate-800 rounded font-mono text-[10px]">?</kbd>
                <span>Show all shortcuts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
