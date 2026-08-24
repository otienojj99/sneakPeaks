import React from "react";
import { motion } from "framer-motion";

interface Props {
  total: number;
  active: number;
  onSelect: (index: number) => void;
}

const CarouselIndicators = ({ total, active, onSelect }: Props) => {
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          aria-label={`Go to arrival ${i + 1}`}
          aria-current={i === active}
          className="py-2 focus:outline-none"
        >
          <motion.span
            className="block h-[3px] rounded-full"
            animate={{
              width: i === active ? 36 : 10,
              backgroundColor: i === active ? "#CFFF04" : "#E4E0D8",
            }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        </button>
      ))}
    </div>
  );
};

export default CarouselIndicators;
