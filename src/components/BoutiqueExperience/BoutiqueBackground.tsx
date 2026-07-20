import React from "react";
import { motion } from "framer-motion";

const BoutiqueBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#F5F3EE]">
      <motion.div
        className="absolute -top-24 right-[10%] w-[520px] h-[520px] rounded-full blur-[150px]"
        style={{
          background:
            "radial-gradient(circle, rgba(207,255,4,0.06) 0%, rgba(207,255,4,0) 70%)",
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-[8%] w-[420px] h-[420px] rounded-full blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(20,21,26,0.03) 0%, rgba(20,21,26,0) 70%)",
        }}
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{
          duration: 8,
          delay: 0.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default BoutiqueBackground;
