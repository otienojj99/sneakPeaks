import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export interface ActiveFilterChip {
  key: string;
  label: string;
  onRemove: () => void;
}

interface Props {
  chips: ActiveFilterChip[];
  onClearAll: () => void;
}

const ActiveFilters = ({ chips, onClearAll }: Props) => {
  if (chips.length === 0) return null;

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold tracking-wide uppercase text-[#8B8681]">
          Active Filters
        </h3>
        <button
          onClick={onClearAll}
          className="text-xs font-medium text-[#14151A] underline underline-offset-2 hover:text-[#8B8681] transition-colors focus:outline-none"
        >
          Clear all
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <AnimatePresence initial={false}>
          {chips.map((chip) => (
            <motion.span
              key={chip.key}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className="inline-flex items-center gap-1 rounded-full bg-[#14151A]/5 pl-3 pr-1.5 py-1 text-xs font-medium text-[#14151A]"
            >
              {chip.label}
              <button
                onClick={chip.onRemove}
                aria-label={`Remove ${chip.label} filter`}
                className="w-4 h-4 rounded-full flex items-center justify-center hover:bg-[#14151A]/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CFFF04]"
              >
                <X size={11} />
              </button>
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ActiveFilters;
