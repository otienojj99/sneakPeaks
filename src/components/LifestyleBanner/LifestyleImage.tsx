import React from "react";
import { motion } from "framer-motion";
import LifestyleOverlay from "./LifestyleOverlay";

interface Props {
  src: string;
  alt: string;
  overlayDirection?: "left" | "bottom";
  className?: string;
}

const LifestyleImage = ({
  src,
  alt,
  overlayDirection = "left",
  className = "",
}: Props) => {
  return (
    <motion.div
      className={`relative w-full h-full overflow-hidden rounded-[32px] border border-[#E4E0D8] shadow-[0_40px_80px_-30px_rgba(20,21,26,0.35)] ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.05 }}
        whileInView={{ scale: 1 }}
        whileHover={{ scale: 1.03 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* soft blur/vignette at the very edge for a premium finish */}
      <div className="absolute inset-0 rounded-[32px] shadow-[inset_0_0_60px_20px_rgba(20,21,26,0.15)] pointer-events-none" />
      <LifestyleOverlay direction={overlayDirection} />
    </motion.div>
  );
};

export default LifestyleImage;
