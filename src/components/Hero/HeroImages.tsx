import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { HeroSlideData, FloatingBadgeData } from "./hero.types";
import HeroFloatingCards from "./HeroFloatingCards";

interface Props {
  slide: HeroSlideData;
  badges: FloatingBadgeData[];
}

const HeroImages = ({ slide, badges }: Props) => {
  return (
    <div className="relative w-full h-[420px] sm:h-[520px] flex items-center justify-center">
      {/* soft glow beneath the shoe */}
      <motion.div
        className="absolute bottom-10 w-64 h-16 rounded-full bg-[#CFFF04]/20 blur-2xl"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
      />

      {/* lifestyle mockup card, tucked behind/left of the shoe */}
      <motion.div
        className="absolute left-0 sm:left-4 top-10 w-40 sm:w-48 rounded-3xl overflow-hidden backdrop-blur-xl bg-white/[0.05] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
        initial={{ opacity: 0, x: -30, rotate: -4 }}
        animate={{ opacity: 1, x: 0, rotate: -4 }}
        transition={{ duration: 0.9, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <svg viewBox="0 0 200 260" className="w-full h-auto">
          <rect width="200" height="260" fill="#1F2026" />
          <rect width="200" height="260" fill="url(#lg)" opacity="0.6" />
          <defs>
            <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#CFFF04" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#14151A" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* abstract walking silhouette, fully non-identifiable */}
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
        <div className="p-3">
          <p className="text-[11px] text-[#F5F3EE]/80">Street-ready styling</p>
        </div>
      </motion.div>

      {/* main shoe */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          className="relative z-10"
          initial={{
            opacity: 0,
            scale: 0.85,
            rotate: slide.shoeRotation - 10,
            y: 30,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: slide.shoeRotation,
            y: 0,
            transition: { duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] },
          }}
          exit={{
            opacity: 0,
            scale: 0.9,
            y: -20,
            transition: { duration: 0.5 },
          }}
          whileHover={{ rotate: slide.shoeRotation + 6 }}
        >
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              viewBox="0 0 420 260"
              className="w-72 sm:w-[420px] h-auto drop-shadow-[0_30px_40px_rgba(0,0,0,0.5)]"
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
              <path
                d="M330 115 C 350 128, 365 140, 372 155"
                stroke="#14151A"
                strokeWidth="3"
                fill="none"
                opacity="0.3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* floating badges */}
      {badges.map((b) => (
        <motion.span
          key={b.id}
          className="absolute z-20 rounded-full border border-[#CFFF04]/40 bg-[#14151A]/70 backdrop-blur-md px-3 py-1 text-[10px] font-semibold tracking-wide text-[#CFFF04]"
          style={b.position}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: [0, -6, 0] }}
          transition={{
            opacity: { duration: 0.6, delay: b.delay },
            y: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: b.delay,
            },
          }}
          whileHover={{ scale: 1.15 }}
        >
          {b.label}
        </motion.span>
      ))}

      <AnimatePresence>
        <HeroFloatingCards key={slide.id} cards={slide.floatingCards ?? []} />
      </AnimatePresence>
    </div>
  );
};

export default HeroImages;
