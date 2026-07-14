import React from "react";
import { motion } from "framer-motion";

interface Props {
  total: number;
  active: number;
  onSelect: (index: number) => void;
}

const HeroIndicators = ({ total, active, onSelect }: Props) => {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          aria-label={`Show slide ${i + 1}`}
          onClick={() => onSelect(i)}
          className="py-2"
        >
          <motion.span
            className="block h-[3px] rounded-full bg-[#F5F3EE]"
            animate={{
              width: i === active ? 28 : 10,
              opacity: i === active ? 1 : 0.3,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </button>
      ))}
    </div>
  );
};

export default HeroIndicators;
