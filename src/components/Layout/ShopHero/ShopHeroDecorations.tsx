import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  word: string;
}

const ShopHeroDecorations = ({ word }: Props) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={word}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.04 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="font-display text-[#F5F3EE] whitespace-nowrap select-none"
          style={{ fontSize: "min(28vw, 340px)", lineHeight: 1 }}
          aria-hidden="true"
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default ShopHeroDecorations;
