"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function GlassCard({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={cn("glass rounded-2xl ring-1 ring-transparent hover:ring-cyan-400/40", className)}
    >
      {children}
    </motion.div>
  );
}
