"use client";

import { motion } from "framer-motion";

export function ParticleBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-cyan-300/50 blur-[1px]"
          initial={{ x: `${(i * 37) % 100}%`, y: `${(i * 53) % 100}%`, opacity: 0.2 }}
          animate={{
            y: [`${(i * 53) % 100}%`, `${((i * 53) % 100) - 8}%`],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{ duration: 5 + (i % 5), repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
