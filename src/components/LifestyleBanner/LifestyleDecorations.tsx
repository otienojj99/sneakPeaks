import React from "react";
import { motion } from "framer-motion";

const LifestyleDecorations = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <motion.div
        className="absolute -top-10 -left-10 w-64 h-64 rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(207,255,4,0.10) 0%, rgba(207,255,4,0) 70%)",
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(255,69,38,0.08) 0%, rgba(255,69,38,0) 70%)",
        }}
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{
          duration: 7,
          delay: 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default LifestyleDecorations;
