import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const PromoCTA: React.FC = () => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <motion.button
        whileHover={{
          y: -3,
          scale: 1.02,
          boxShadow: "0 16px 36px rgba(207,255,4,0.35)",
        }}
        whileTap={{ scale: 0.98 }}
        className="group flex items-center gap-2 rounded-full bg-[#CFFF04] px-7 py-3.5 text-sm font-semibold text-[#14151A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5F3EE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#14151A]"
      >
        Shop The Sale
        <motion.span
          className="inline-block"
          whileHover={{ x: 3 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowRight size={16} />
        </motion.span>
      </motion.button>

      <motion.button
        whileHover={{ y: -3, backgroundColor: "rgba(245,243,238,0.08)" }}
        whileTap={{ y: 0 }}
        className="rounded-full border border-[#F5F3EE]/30 px-7 py-3.5 text-sm font-semibold text-[#F5F3EE] backdrop-blur-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5F3EE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#14151A]"
      >
        Explore Collection
      </motion.button>
    </div>
  );
};

export default PromoCTA;
