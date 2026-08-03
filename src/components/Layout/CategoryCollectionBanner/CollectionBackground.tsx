import React from "react";
import { motion } from "framer-motion";

const CollectionBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[32px] bg-[#14151A]">
      <motion.div
        className="absolute -top-24 left-[10%] w-[520px] h-[520px] rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(207,255,4,0.10) 0%, rgba(207,255,4,0) 70%)",
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-20 right-[6%] w-[440px] h-[440px] rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,69,38,0.08) 0%, rgba(255,69,38,0) 70%)",
        }}
        animate={{ opacity: [0.5, 0.85, 0.5] }}
        transition={{
          duration: 8,
          delay: 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="absolute inset-0 shadow-[inset_0_0_160px_60px_rgba(0,0,0,0.35)] pointer-events-none" />
    </div>
  );
};

export default CollectionBackground;
