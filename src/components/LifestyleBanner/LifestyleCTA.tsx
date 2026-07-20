import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Props {
  ctaLabel: string;
  secondaryLabel: string;
}

const LifestyleCTA = ({ ctaLabel, secondaryLabel }: Props) => {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <motion.button
        whileHover={{
          y: -3,
          scale: 1.02,
          boxShadow: "0 16px 36px rgba(207,255,4,0.35)",
        }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center gap-2 rounded-full bg-[#CFFF04] px-7 py-3.5 text-sm font-semibold text-[#14151A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5F3EE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#14151A]"
      >
        {ctaLabel}
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
        className="inline-flex items-center gap-1.5 text-sm font-medium text-[#F5F3EE]/90 hover:text-[#F5F3EE] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5F3EE] rounded-sm"
      >
        {secondaryLabel} <ArrowRight size={14} />
      </motion.a>
    </div>
  );
};

export default LifestyleCTA;
