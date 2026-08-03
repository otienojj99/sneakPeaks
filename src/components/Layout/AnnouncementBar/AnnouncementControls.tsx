import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  total: number;
  active: number;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
}

const AnnouncementControls = ({
  total,
  active,
  onPrev,
  onNext,
  onSelect,
}: Props) => {
  return (
    <div className="hidden sm:flex items-center gap-3 shrink-0">
      <button
        aria-label="Previous announcement"
        onClick={onPrev}
        className="text-[#F5F3EE]/60 hover:text-[#F5F3EE] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CFFF04] rounded-sm"
      >
        <ChevronLeft size={14} />
      </button>

      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            aria-label={`Go to announcement ${i + 1}`}
            onClick={() => onSelect(i)}
            className="p-1 focus:outline-none"
          >
            <motion.span
              className="block rounded-full bg-[#F5F3EE]"
              animate={{
                width: i === active ? 14 : 5,
                height: 5,
                opacity: i === active ? 1 : 0.35,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </button>
        ))}
      </div>

      <button
        aria-label="Next announcement"
        onClick={onNext}
        className="text-[#F5F3EE]/60 hover:text-[#F5F3EE] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CFFF04] rounded-sm"
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );
};

export default AnnouncementControls;
