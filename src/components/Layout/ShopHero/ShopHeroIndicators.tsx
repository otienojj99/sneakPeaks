import React from "react";
import { motion } from "framer-motion";

interface Props {
  total: number;
  active: number;
  onSelect: (index: number) => void;
}

const ShopHeroIndicators = ({ total, active, onSelect }: Props) => {
  return (
    <div
      className="flex items-center gap-2"
      role="tablist"
      aria-label="Campaign selector"
    >
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          role="tab"
          aria-selected={i === active}
          aria-label={`Show campaign ${i + 1}`}
          onClick={() => onSelect(i)}
          className="py-2 focus:outline-none"
        >
          <motion.span
            className="block h-[3px] rounded-full"
            animate={{
              width: i === active ? 32 : 10,
              backgroundColor: i === active ? "#CFFF04" : "#F5F3EE",
              opacity: i === active ? 1 : 0.3,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </button>
      ))}
    </div>
  );
};

export default ShopHeroIndicators;
