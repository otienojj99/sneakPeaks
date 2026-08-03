import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpDown, Check } from "lucide-react";

const options = [
  "Featured",
  "Newest",
  "Price: Low to High",
  "Price: High to Low",
  "Most Popular",
  "Highest Rated",
];

interface Props {
  value?: string;
  onChange?: (value: string) => void;
}

const SortDropdown = ({ value = "Featured", onChange }: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="relative" ref={ref}>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        whileHover={{ y: -2, borderColor: "#14151A" }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-2 rounded-full border border-[#E4E0D8] px-4 py-2.5 text-sm font-medium text-[#14151A] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14151A] focus-visible:ring-offset-2"
      >
        <ArrowUpDown size={14} strokeWidth={1.75} />
        {value}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, scale: 0.96, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 mt-2 w-56 rounded-2xl border border-[#E4E0D8] bg-white p-2 shadow-[0_20px_45px_-15px_rgba(20,21,26,0.2)] origin-top-left z-30"
          >
            {options.map((opt) => (
              <li key={opt} role="option" aria-selected={opt === value}>
                <button
                  onClick={() => {
                    onChange?.(opt);
                    setOpen(false);
                  }}
                  className="w-full flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm text-[#14151A] hover:bg-[#F5F3EE] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CFFF04]"
                >
                  {opt}
                  {opt === value && (
                    <Check size={14} className="text-[#CFFF04]" />
                  )}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SortDropdown;
