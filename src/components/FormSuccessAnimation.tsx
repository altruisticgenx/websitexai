import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function FormSuccessAnimation() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className="flex flex-col items-center justify-center py-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.1,
        }}
      >
        <CheckCircle2 className="h-16 w-16 text-emerald-400" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-4 text-center"
      >
        <h3 className="text-xl font-semibold text-slate-50">
          Message sent successfully!
        </h3>
        <p className="mt-2 text-sm text-slate-300">
          Thanks for reaching out. Check your email for confirmation.
        </p>
      </motion.div>

      {/* Confetti effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        initial="hidden"
        animate="visible"
      >
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-emerald-400"
            variants={{
              hidden: { scale: 0, x: 0, y: 0, opacity: 1 },
              visible: {
                scale: [0, 1, 0],
                x: [0, (Math.random() - 0.5) * 200],
                y: [0, (Math.random() - 0.5) * 200],
                opacity: [1, 1, 0],
              },
            }}
            transition={{
              duration: 1,
              delay: i * 0.05,
              ease: "easeOut",
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
