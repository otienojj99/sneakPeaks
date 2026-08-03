import React from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";

interface Props {
  onClick?: () => void;
  activeCount?: number;
}

const FilterButton = ({ onClick, activeCount = 0 }: Props) => {
  return (
    <motion.button
      onClick={onClick}
      aria-label={
        activeCount > 0 ? `Filters, ${activeCount} active` : "Filters"
      }
      whileHover={{ y: -2, borderColor: "#14151A" }}
      whileTap={{ scale: 0.97 }}
      className="relative flex items-center gap-2 rounded-full border border-[#E4E0D8] px-4 py-2.5 text-sm font-medium text-[#14151A] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14151A] focus-visible:ring-offset-2"
    >
      <SlidersHorizontal size={15} strokeWidth={1.75} />
      Filter
      {activeCount > 0 && (
        <span
          className="w-1.5 h-1.5 rounded-full bg-[#CFFF04]"
          aria-hidden="true"
        />
      )}
    </motion.button>
  );
};

export default FilterButton;
