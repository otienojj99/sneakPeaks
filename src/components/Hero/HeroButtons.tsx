import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Props {
  primaryLabel?: string;
  secondaryLabel?: string;
}

const HeroButtons = ({
  primaryLabel = "Shop Collection",
  secondaryLabel = "Explore Sneakers",
}: Props) => {
  return (
    <motion.div
      className="flex flex-wrap items-center gap-4"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
    >
      <motion.button
        whileHover={{
          y: -3,
          backgroundColor: "#DBFF3D",
          boxShadow: "0 12px 30px rgba(207,255,4,0.35)",
        }}
        whileTap={{ y: 0 }}
        className="flex items-center gap-2 rounded-full bg-[#CFFF04] px-7 py-3.5 text-sm font-semibold text-[#14151A] shadow-[0_8px_24px_rgba(207,255,4,0.2)] transition-colors"
      >
        {primaryLabel}
        <ArrowRight size={16} />
      </motion.button>

      <motion.button
        whileHover={{ y: -3, backgroundColor: "rgba(245,243,238,0.08)" }}
        whileTap={{ y: 0 }}
        className="rounded-full border border-[#F5F3EE]/30 px-7 py-3.5 text-sm font-semibold text-[#F5F3EE] backdrop-blur-md transition-colors"
      >
        {secondaryLabel}
      </motion.button>
    </motion.div>
  );
};

export default HeroButtons;
