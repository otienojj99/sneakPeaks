import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface Props {
  hovered: boolean;
  label: string;
}

const CategoryButton = ({ hovered, label }: Props) => {
  return (
    <motion.button
      aria-label={`Shop ${label}`}
      className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 w-12 h-12 rounded-full bg-[#CFFF04] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5F3EE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#14151A]"
      animate={{
        scale: hovered ? 1.12 : 1,
        boxShadow: hovered
          ? "0 8px 24px rgba(207,255,4,0.5)"
          : "0 4px 12px rgba(207,255,4,0.2)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
    >
      <motion.span
        animate={{
          x: hovered ? 2 : 0,
          y: hovered ? -2 : 0,
          rotate: hovered ? 8 : 0,
        }}
        transition={{ duration: 0.25 }}
      >
        <ArrowUpRight size={20} color="#14151A" strokeWidth={2} />
      </motion.span>
    </motion.button>
  );
};

export default CategoryButton;
