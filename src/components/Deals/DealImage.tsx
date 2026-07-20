import React from "react";
import { motion } from "framer-motion";

interface Props {
  accent: string;
  rotation: number;
  hovered: boolean;
}

const DealImage = ({ accent, rotation, hovered }: Props) => {
  return (
    <div className="relative flex flex-col items-center">
      <motion.div
        animate={{
          y: hovered ? -6 : 0,
          rotate: hovered ? rotation + 6 : rotation,
          scale: hovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <svg
          viewBox="0 0 300 190"
          className="w-44 sm:w-52 h-auto drop-shadow-[0_18px_20px_rgba(20,21,26,0.2)]"
        >
          <path
            d="M28 138 C 28 108, 50 100, 80 98 C 108 96, 122 78, 158 70
               C 194 62, 216 66, 238 82 C 258 98, 272 110, 272 128
               L 272 142 C 272 150, 266 154, 256 154
               L 44 154 C 34 154, 28 148, 28 138 Z"
            fill="#14151A"
          />
          <path
            d="M80 98 C 108 96, 122 78, 158 70 C 180 65, 196 66, 210 72"
            stroke={accent}
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
          <rect x="42" y="142" width="216" height="10" rx="5" fill={accent} />
        </svg>
      </motion.div>

      <div
        className="w-28 h-3 mt-1 rounded-full blur-md opacity-40"
        style={{
          background:
            "radial-gradient(ellipse, rgba(20,21,26,0.4) 0%, transparent 75%)",
        }}
      />
    </div>
  );
};

export default DealImage;
