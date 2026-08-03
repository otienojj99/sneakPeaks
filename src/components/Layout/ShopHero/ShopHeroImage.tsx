import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  campaignId: string;
  src: string;
  alt: string;
}

const ShopHeroImage = ({ campaignId, src, alt }: Props) => {
  return (
    <div className="relative w-full h-full">
      <div className="absolute -inset-4 sm:-inset-6 rounded-[32px] overflow-hidden shadow-[0_50px_100px_-30px_rgba(0,0,0,0.6)]">
        <AnimatePresence mode="wait">
          <motion.img
            key={campaignId}
            src={src}
            alt={alt}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-[#14151A]/40 via-transparent to-transparent" />
      </div>
    </div>
  );
};

export default ShopHeroImage;
