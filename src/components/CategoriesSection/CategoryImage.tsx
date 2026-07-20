import React from "react";
import { motion } from "framer-motion";

interface CategoryImageProps {
  accent: string;
  hovered: boolean;
}
const CategoryImage = ({ accent, hovered }: CategoryImageProps) => {
  return (
    <motion.div
      className="absolute inset-0"
      animate={{ scale: hovered ? 1.08 : 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="w-full h-full"
        style={{
          background: `linear-gradient(160deg, ${accent}33 0%, #14151A 75%)`,
        }}
      />
      <svg
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full opacity-70"
        aria-hidden="true"
      >
        {/* abstract, non-identifiable figure — stand-in for lifestyle photography */}
        <circle cx="200" cy="150" r="34" fill="#F5F3EE" opacity="0.5" />
        <path
          d="M200 184 L200 300 M200 220 L150 260 M200 220 L255 205 M200 300 L160 400 M200 300 L245 395"
          stroke="#F5F3EE"
          strokeWidth="16"
          strokeLinecap="round"
          opacity="0.5"
          fill="none"
        />
      </svg>
    </motion.div>
  );
};

export default CategoryImage;
