import React from "react";
import { motion } from "framer-motion";

const particles = [
  { top: "14%", left: "42%", size: 4, delay: 0 },
  { top: "62%", left: "38%", size: 3, delay: 0.5 },
  { top: "30%", left: "60%", size: 5, delay: 1 },
  { top: "78%", left: "55%", size: 3, delay: 1.5 },
];

const PromoDecorations = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        className="absolute top-[16%] right-[16%] w-52 h-52 rounded-full border border-[#CFFF04]/15"
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 1, rotate: 30 }}
        transition={{ duration: 2, ease: "easeOut" }}
      />
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-[#CFFF04]"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            boxShadow: "0 0 10px 2px rgba(207,255,4,0.5)",
          }}
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -8, 0] }}
          transition={{
            duration: 3.5,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default PromoDecorations;
