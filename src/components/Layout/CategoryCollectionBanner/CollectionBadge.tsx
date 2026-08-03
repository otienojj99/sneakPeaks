import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  name: string;
}

const CollectionBadge = ({ name }: Props) => {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={name}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
        className="inline-flex w-fit items-center gap-2 rounded-full border border-[#CFFF04]/30 px-4 py-1.5 text-xs font-medium tracking-wide text-[#CFFF04]"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#CFFF04]" />
        Curated Collection · {name}
      </motion.span>
    </AnimatePresence>
  );
};

export default CollectionBadge;
