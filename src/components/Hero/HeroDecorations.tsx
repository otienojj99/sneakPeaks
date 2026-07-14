import React from "react";
import { motion } from "framer-motion";

const dots = [
  { top: "12%", left: "38%", size: 6, delay: 1.8 },
  { top: "68%", left: "46%", size: 4, delay: 1.95 },
  { top: "30%", left: "58%", size: 5, delay: 2.1 },
  { top: "80%", left: "30%", size: 3, delay: 2.25 },
];

/**
 * HeroDecorations
 * Minimal geometric accents: one gradient ring, a handful of glowing dots.
 * Rendered last in the timeline so they read as ambient dressing, not focal content.
 */

const HeroDecorations = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        className="absolute top-[10%] right-[22%] w-40 h-40 rounded-full border border-[#CFFF04]/20"
        initial={{ opacity: 0, scale: 0.85, rotate: 0 }}
        animate={{ opacity: 1, scale: 1, rotate: 40 }}
        transition={{ duration: 1.8, delay: 1.8, ease: "easeOut" }}
      />

      <motion.div
        className="absolute top-[10%] right-[22%] w-40 h-40 rounded-full border border-dashed border-[#E4E0D8]/10"
        initial={{ opacity: 0, scale: 1.15 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, delay: 1.9, ease: "easeOut" }}
      />

      {dots.map((dot, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full bg-[#CFFF04]"
          style={{
            top: dot.top,
            left: dot.left,
            width: dot.size,
            height: dot.size,
            boxShadow: "0 0 12px 2px rgba(207,255,4,0.5)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.5, 1] }}
          transition={{
            duration: 2.4,
            delay: dot.delay,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
};

export default HeroDecorations;
