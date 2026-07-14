import React from "react";
import { motion } from "framer-motion";

const HeroBackground = () => {
  return (
    <div className="absolute overflow-hidden bg-secondary-line">
      {/* base ambient glow, top-right */}

      <motion.div
        className="absolute -top-40 -right-40 w-[640px] h-[640px] rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(207,255,4,0.14) 0%, rgba(207,255,4,0) 70%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      />
      <motion.div
        className="absolute -bottom-52 -left-32 w-[560px] h-[560px] rounded-full blur-[160px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,69,38,0.10) 0%, rgba(255,69,38,0) 70%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.15, ease: "easeOut" }}
      />

      <motion.div
        className="absolute top-1/3 right-[8%] w-[420px] h-[420px] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(245,243,238,0.06) 0%, rgba(245,243,238,0) 70%)",
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, delay: 0.3, ease: "easeOut" }}
      />

      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      ></div>

      <div className="absolute inset-0 shadow-[inset_0_0_200px_80px_rgba(0,0,0,0.35)] pointer-events-none" />
    </div>
  );
};

export default HeroBackground;
