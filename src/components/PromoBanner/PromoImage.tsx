import React from "react";
import { motion } from "framer-motion";
import { Heart, Star } from "lucide-react";

const PromoImage: React.FC = () => {
  return (
    <div className="relative w-full h-[420px] sm:h-[520px] flex items-center justify-center">
      {/* glow beneath the shoe */}
      <div className="absolute bottom-16 w-72 h-20 rounded-full bg-[#CFFF04]/20 blur-3xl" />

      {/* lifestyle mockup, tucked behind-left */}
      <motion.div
        className="absolute left-0 sm:-left-4 bottom-8 w-36 sm:w-44 rounded-3xl overflow-hidden backdrop-blur-xl bg-white/[0.05] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <svg viewBox="0 0 200 260" className="w-full h-auto">
          <rect width="200" height="260" fill="#1F2026" />
          <circle cx="100" cy="80" r="18" fill="#F5F3EE" opacity="0.85" />
          <path
            d="M100 98 L100 165 M100 120 L70 145 M100 120 L138 110 M100 165 L78 220 M100 165 L128 215"
            stroke="#F5F3EE"
            strokeWidth="10"
            strokeLinecap="round"
            opacity="0.85"
            fill="none"
          />
        </svg>
      </motion.div>

      {/* main shoe — breaks past the top of its own container */}
      <motion.div
        className="relative z-20 -mt-16 sm:-mt-24"
        initial={{ opacity: 0, y: 40, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ rotate: 6, y: -8 }}
      >
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            viewBox="0 0 420 260"
            className="w-72 sm:w-[440px] h-auto drop-shadow-[0_40px_50px_rgba(0,0,0,0.55)]"
          >
            <path
              d="M40 190 C 40 150, 70 140, 110 138 C 150 136, 170 110, 220 100
                 C 270 90, 300 95, 330 115 C 360 135, 380 150, 380 175
                 L 380 195 C 380 205, 372 210, 360 210
                 L 60 210 C 48 210, 40 202, 40 190 Z"
              fill="#F5F3EE"
            />
            <path
              d="M110 138 C 150 136, 170 110, 220 100 C 250 94, 272 95, 292 102"
              stroke="#CFFF04"
              strokeWidth="7"
              fill="none"
              strokeLinecap="round"
            />
            <rect
              x="60"
              y="196"
              width="300"
              height="14"
              rx="7"
              fill="#CFFF04"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* soft ellipse shadow cast onto the section below */}
      <div className="absolute bottom-6 w-64 h-6 rounded-full bg-black/40 blur-xl" />

      {/* floating product card */}
      <motion.div
        className="absolute top-6 right-0 sm:-right-6 z-20 w-44 rounded-2xl p-3 backdrop-blur-xl bg-white/[0.06] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.05, y: -4 }}
      >
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-medium text-[#F5F3EE]">
            Aero Runner 3
          </p>
          <Heart size={13} className="text-[#F5F3EE]/60" />
        </div>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-sm font-semibold text-[#CFFF04]">$149</span>
          <span className="flex items-center gap-0.5 text-[11px] text-[#F5F3EE]/70">
            <Star size={11} className="fill-[#CFFF04] text-[#CFFF04]" />
            4.9
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default PromoImage;
