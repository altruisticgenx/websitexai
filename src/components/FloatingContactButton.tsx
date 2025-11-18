import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Mail, Linkedin, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function FloatingContactButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.2 }}
          onClick={() => setIsOpen(true)}
          className="group fixed bottom-8 left-8 z-30 rounded-full bg-emerald-500 p-4 text-white shadow-xl shadow-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/40 hover:scale-110 transition-all duration-200 ring-2 ring-emerald-500/20 hover:ring-emerald-500/40"
          aria-label="Quick contact"
          title="Quick contact"
        >
          <MessageSquare size={24} strokeWidth={2.5} className="group-hover:rotate-12 transition-transform duration-200" />
        </motion.button>
      </AnimatePresence>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md bg-slate-900/95 backdrop-blur-xl border-slate-800">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-slate-50">
              Let's connect
            </DialogTitle>
            <p className="text-sm text-slate-400 mt-2">
              Choose your preferred way to reach out
            </p>
          </DialogHeader>

          <div className="space-y-3 mt-4">
            <a
              href="mailto:altruisticxai@gmail.com?subject=Quick%20Connect%20-%20AltruisticX%20AI"
              className="group flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-950/40 p-4 transition-all duration-300 hover:scale-[1.02] hover:border-emerald-500/50 hover:bg-slate-800 hover:shadow-lg hover:shadow-emerald-500/20"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-700 bg-slate-900/70 transition-colors duration-300 group-hover:border-emerald-500/50 group-hover:bg-slate-800">
                <Mail className="h-6 w-6 text-slate-400 transition-colors duration-300 group-hover:text-emerald-400" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-slate-50">Email</div>
                <div className="text-xs text-slate-400">altruisticxai@gmail.com</div>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/ik11?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-950/40 p-4 transition-all duration-300 hover:scale-[1.02] hover:border-emerald-500/50 hover:bg-slate-800 hover:shadow-lg hover:shadow-emerald-500/20"
              onClick={() => setIsOpen(false)}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-700 bg-slate-900/70 transition-colors duration-300 group-hover:border-emerald-500/50 group-hover:bg-slate-800">
                <Linkedin className="h-6 w-6 text-slate-400 transition-colors duration-300 group-hover:text-emerald-400" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-slate-50">LinkedIn</div>
                <div className="text-xs text-slate-400">Connect on LinkedIn</div>
              </div>
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
