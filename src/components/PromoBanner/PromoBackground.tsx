import React from "react";
import { motion } from "framer-motion";

const PromoBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#14151A]">
      <motion.div
        className="absolute -top-32 left-[10%] w-[560px] h-[560px] rounded-full blur-[150px]"
        style={{
          background:
            "radial-gradient(circle, rgba(207,255,4,0.12) 0%, rgba(207,255,4,0) 70%)",
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-20%] right-[5%] w-[520px] h-[520px] rounded-full blur-[160px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,69,38,0.10) 0%, rgba(255,69,38,0) 70%)",
        }}
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{
          duration: 7,
          delay: 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <div
        className="absolute top-1/4 right-[20%] w-[300px] h-[300px] rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(245,243,238,0.05) 0%, rgba(245,243,238,0) 70%)",
        }}
      />

      {/* thin light-reflection streaks */}
      <div
        className="absolute top-0 left-[35%] w-px h-full opacity-[0.06]"
        style={{
          background:
            "linear-gradient(to bottom, transparent, #F5F3EE, transparent)",
        }}
      />
      <div
        className="absolute top-0 left-[70%] w-px h-2/3 opacity-[0.04]"
        style={{
          background:
            "linear-gradient(to bottom, transparent, #F5F3EE, transparent)",
        }}
      />

      <div className="absolute inset-0 shadow-[inset_0_0_220px_90px_rgba(0,0,0,0.4)] pointer-events-none" />
    </div>
  );
};

export default PromoBackground;
