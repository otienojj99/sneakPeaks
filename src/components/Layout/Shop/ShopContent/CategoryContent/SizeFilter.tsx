import React from "react";
import type { SizeOption } from "../../../../../types/category.types";

interface Props {
  options: SizeOption[];
  selected?: string;
  onSelect: (id: string | undefined) => void;
}

const SizeFilter = ({ options, selected, onSelect }: Props) => {
  return (
    <div className="grid grid-cols-4 gap-2">
      {options.map((size) => {
        const isSelected = size.id === selected;
        const disabled = size.available === false;
        return (
          <button
            key={size.id}
            disabled={disabled}
            aria-pressed={isSelected}
            onClick={() => onSelect(isSelected ? undefined : size.id)}
            className="h-9 rounded-lg border text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CFFF04] disabled:opacity-35 disabled:cursor-not-allowed disabled:line-through"
            style={{
              borderColor: isSelected ? "#14151A" : "#E4E0D8",
              background: isSelected ? "#14151A" : "transparent",
              color: isSelected ? "#F5F3EE" : "#14151A",
            }}
          >
            {size.label}
          </button>
        );
      })}
    </div>
  );
};

export default SizeFilter;
