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
        <img
          src="/assets/lifestyle/heromock.png"
          alt="Lifestyle Banner"
          className="w-full h-auto object-cover rounded-lg"
        />
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
            <div className="relative">
              <img
                src="/images/adidas-hero.png"
                alt="Premium Adidas Sneaker"
                className="w-72 sm:w-[420px] h-auto object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.45)]"
              />
            </div>
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
