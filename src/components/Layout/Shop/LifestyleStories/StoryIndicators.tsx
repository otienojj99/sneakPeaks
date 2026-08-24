import React from "react";
import { motion } from "framer-motion";

interface Props {
  total: number;
  active: number;
  onSelect: (index: number) => void;
}

const StoryIndicators = ({ total, active, onSelect }: Props) => {
  return (
    <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          aria-label={`Go to story ${i + 1}`}
          aria-current={i === active}
          className="py-2 focus:outline-none"
        >
          <motion.span
            className="block h-[3px] rounded-full"
            animate={{
              width: i === active ? 32 : 8,
              backgroundColor:
                i === active ? "#CFFF04" : "rgba(245,243,238,0.4)",
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        </button>
      ))}
    </div>
  );
};

export default StoryIndicators;
