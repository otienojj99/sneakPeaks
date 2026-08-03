import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface Props {
  collectionId: string;
  src: string;
  alt: string;
}

const CollectionImage = ({ collectionId, src, alt }: Props) => {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 rounded-[28px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={collectionId}
            src={src}
            alt={alt}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
            initial={
              reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.06 }
            }
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
            whileHover={reduceMotion ? undefined : { scale: 1.03 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#14151A]/50" />
      </div>
    </div>
  );
};

export default CollectionImage;
