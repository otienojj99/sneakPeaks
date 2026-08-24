import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  onPrev: () => void;
  onNext: () => void;
}

const StoryNavigation = ({ onPrev, onNext }: Props) => {
  const base =
    "absolute top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-[#F5F3EE] bg-white/10 backdrop-blur-sm border border-white/20 transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CFFF04]";

  return (
    <>
      <motion.button
        onClick={onPrev}
        aria-label="Previous story"
        className={`${base} left-4 sm:left-6`}
        whileHover={{
          scale: 1.08,
          boxShadow: "0 0 0 6px rgba(207,255,4,0.15)",
        }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronLeft size={18} />
      </motion.button>
      <motion.button
        onClick={onNext}
        aria-label="Next story"
        className={`${base} right-4 sm:right-6`}
        whileHover={{
          scale: 1.08,
          boxShadow: "0 0 0 6px rgba(207,255,4,0.15)",
        }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronRight size={18} />
      </motion.button>
    </>
  );
};

export default StoryNavigation;
