import React, { useCallback } from "react";

interface Props {
  min: number;
  max: number;
  value: [number, number];
  onChange: (min: number, max: number) => void;
  currency?: string;
  step?: number;
}

function formatPrice(value: number, currency: string): string {
  return `${currency} ${value.toLocaleString()}`;
}

const PriceRangeFilter = ({
  min,
  max,
  value,
  onChange,
  currency = "KSh",
  step = 100,
}: Props) => {
  const [selMin, selMax] = value;

  const handleMinChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = Math.min(Number(e.target.value), selMax - step);
      onChange(next, selMax);
    },
    [onChange, selMax, step],
  );

  const handleMaxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = Math.max(Number(e.target.value), selMin + step);
      onChange(selMin, next);
    },
    [onChange, selMin, step],
  );

  const minPct = ((selMin - min) / (max - min)) * 100;
  const maxPct = ((selMax - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-medium text-[#14151A]">
        {formatPrice(selMin, currency)} — {formatPrice(selMax, currency)}
      </p>

      <div className="relative h-5 flex items-center">
        <div className="absolute left-0 right-0 h-[3px] rounded-full bg-[#E4E0D8]" />
        <div
          className="absolute h-[3px] rounded-full bg-[#CFFF04]"
          style={{ left: `${minPct}%`, right: `${100 - maxPct}%` }}
        />

        <input
          type="range"
          aria-label="Minimum price"
          min={min}
          max={max}
          step={step}
          value={selMin}
          onChange={handleMinChange}
          className="range-thumb absolute w-full appearance-none bg-transparent pointer-events-none"
        />
        <input
          type="range"
          aria-label="Maximum price"
          min={min}
          max={max}
          step={step}
          value={selMax}
          onChange={handleMaxChange}
          className="range-thumb absolute w-full appearance-none bg-transparent pointer-events-none"
        />
      </div>

      <style>{`
        .range-thumb::-webkit-slider-thumb {
          appearance: none;
          pointer-events: auto;
          width: 16px;
          height: 16px;
          border-radius: 9999px;
          background: #14151A;
          border: 2px solid #F5F3EE;
          box-shadow: 0 1px 4px rgba(20,21,26,0.3);
          cursor: pointer;
        }
        .range-thumb::-moz-range-thumb {
          pointer-events: auto;
          width: 16px;
          height: 16px;
          border-radius: 9999px;
          background: #14151A;
          border: 2px solid #F5F3EE;
          box-shadow: 0 1px 4px rgba(20,21,26,0.3);
          cursor: pointer;
        }
        .range-thumb::-webkit-slider-runnable-track { background: transparent; }
        .range-thumb::-moz-range-track { background: transparent; }
      `}</style>
    </div>
  );
};

export default PriceRangeFilter;
