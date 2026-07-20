import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const BoutiqueCTA: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      <motion.button
        whileHover={{
          y: -3,
          scale: 1.02,
          boxShadow: "0 14px 32px rgba(207,255,4,0.35)",
        }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-2 rounded-full bg-[#CFFF04] px-7 py-3.5 text-sm font-semibold text-[#14151A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14151A] focus-visible:ring-offset-2"
      >
        Explore Collection
        <motion.span
          whileHover={{ x: 3 }}
          transition={{ duration: 0.2 }}
          className="inline-block"
        >
          <ArrowRight size={16} />
        </motion.span>
      </motion.button>

      <motion.a
        href="#"
        whileHover={{ x: 3 }}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-[#14151A] hover:text-[#14151A]/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14151A] rounded-sm"
      >
        Talk To A Sneaker Expert
        <ArrowRight size={14} />
      </motion.a>
    </div>
  );
};

export default BoutiqueCTA;
