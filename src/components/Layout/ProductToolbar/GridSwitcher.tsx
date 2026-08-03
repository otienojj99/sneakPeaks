import React from "react";
import { motion } from "framer-motion";

export type GridColumns = 2 | 3 | 4;

interface Props {
  value: GridColumns;
  onChange: (value: GridColumns) => void;
}

const layouts: GridColumns[] = [2, 3, 4];

const GridSwitcher = ({ value, onChange }: Props) => {
  return (
    <div
      role="radiogroup"
      aria-label="Grid layout"
      className="flex items-center gap-1.5 rounded-full border border-[#E4E0D8] p-1"
    >
      {layouts.map((cols) => {
        const active = cols === value;
        return (
          <motion.button
            key={cols}
            role="radio"
            aria-checked={active}
            aria-label={`${cols} column grid`}
            onClick={() => onChange(cols)}
            whileHover={{ y: active ? 0 : -1 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex items-center justify-center w-10 h-9 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14151A]"
            animate={{
              boxShadow: active
                ? "0 0 0 1.5px #CFFF04, 0 0 12px rgba(207,255,4,0.35)"
                : "0 0 0 0 rgba(207,255,4,0)",
              backgroundColor: active ? "rgba(207,255,4,0.08)" : "transparent",
            }}
            transition={{ duration: 0.2 }}
          >
            <span className="flex items-center gap-[3px]">
              {Array.from({ length: cols }).map((_, i) => (
                <span
                  key={i}
                  className="rounded-[2px]"
                  style={{
                    width: cols === 2 ? 6 : cols === 3 ? 5 : 4,
                    height: 9,
                    background: active ? "#14151A" : "#8B8681",
                  }}
                />
              ))}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
};

export default GridSwitcher;
