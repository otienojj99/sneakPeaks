import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  onPrev: () => void;
  onNext: () => void;
}

const CarouselNavigation = ({ onPrev, onNext }: Props) => {
  const buttonClass =
    "hidden sm:flex absolute top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full items-center justify-center text-[#14151A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CFFF04]";
  const buttonStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.6)",
    backdropFilter: "blur(12px)",
    boxShadow: "0 12px 32px -12px rgba(20,21,26,0.25)",
    border: "1px solid rgba(228,224,216,0.8)",
  };

  return (
    <>
      <motion.button
        onClick={onPrev}
        aria-label="Previous arrivals"
        className={`${buttonClass} -left-4 lg:-left-7`}
        style={buttonStyle}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronLeft size={20} />
      </motion.button>
      <motion.button
        onClick={onNext}
        aria-label="Next arrivals"
        className={`${buttonClass} -right-4 lg:-right-7`}
        style={buttonStyle}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronRight size={20} />
      </motion.button>
    </>
  );
};

export default CarouselNavigation;
