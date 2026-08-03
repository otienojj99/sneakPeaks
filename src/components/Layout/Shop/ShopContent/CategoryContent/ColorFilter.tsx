import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { ColorOption } from "../../../../../types/category.types";

interface Props {
  options: ColorOption[];
  selected?: string;
  onSelect: (id: string | undefined) => void;
}
const ColorFilter = ({ options, selected, onSelect }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-2.5">
      {options.map((color) => {
        const isSelected = color.id === selected;
        const disabled = color.available === false;
        return (
          <button
            key={color.id}
            disabled={disabled}
            aria-pressed={isSelected}
            aria-label={color.label}
            onClick={() => onSelect(isSelected ? undefined : color.id)}
            className="flex items-center gap-2 py-1 rounded-lg text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CFFF04] disabled:opacity-35 disabled:cursor-not-allowed"
          >
            <span
              className="relative w-5 h-5 rounded-full border shrink-0 flex items-center justify-center"
              style={{
                background: color.hex,
                borderColor: isSelected ? "#14151A" : "#E4E0D8",
                boxShadow: isSelected
                  ? "0 0 0 2px #F5F3EE, 0 0 0 3.5px #14151A"
                  : "none",
              }}
            >
              {isSelected && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <Check
                    size={11}
                    strokeWidth={3}
                    className={
                      isLight(color.hex) ? "text-[#14151A]" : "text-white"
                    }
                  />
                </motion.span>
              )}
            </span>
            <span
              className={`text-xs ${isSelected ? "font-semibold text-[#14151A]" : "text-[#8B8681]"}`}
            >
              {color.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default ColorFilter;

/** Rough luminance check so the checkmark stays visible on light swatches (e.g. white). */
function isLight(hex: string): boolean {
  const c = hex.replace("#", "");
  if (c.length !== 6) return false;
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 190;
}
