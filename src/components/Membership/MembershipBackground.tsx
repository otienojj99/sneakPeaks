import React from "react";
import { motion } from "framer-motion";

const MembershipBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[40px] bg-[#14151A]">
      <motion.div
        className="absolute -top-24 left-[8%] w-[480px] h-[480px] rounded-full blur-[140px]"
        style={{
          background:
            "radial-gradient(circle, rgba(207,255,4,0.14) 0%, rgba(207,255,4,0) 70%)",
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-24 right-[6%] w-[420px] h-[420px] rounded-full blur-[140px]"
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
      <div className="absolute inset-0 shadow-[inset_0_0_180px_70px_rgba(0,0,0,0.35)] pointer-events-none" />
    </div>
  );
};

export default MembershipBackground;
