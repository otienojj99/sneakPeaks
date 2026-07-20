import React from "react";
import { motion } from "framer-motion";

const TrustBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#F5F3EE]">
      <div className="absolute top-0 left-0 right-0 h-px bg-[#E4E0D8]" />
      <div
        className="absolute -top-24 left-1/4 w-[520px] h-[520px] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(207,255,4,0.08) 0%, rgba(207,255,4,0) 70%)",
        }}
      />
      <div
        className="absolute -bottom-32 right-1/4 w-[480px] h-[480px] rounded-full blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(20,21,26,0.04) 0%, rgba(20,21,26,0) 70%)",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(#14151A 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {[
        { top: "18%", left: "12%", delay: 0 },
        { top: "72%", left: "88%", delay: 0.6 },
        { top: "40%", left: "6%", delay: 1.1 },
      ].map((d, i) => (
        <motion.span
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-[#CFFF04]"
          style={{ top: d.top, left: d.left }}
          animate={{ y: [0, -10, 0], opacity: [0.4, 0.9, 0.4] }}
          transition={{
            duration: 4,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default TrustBackground;
