import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import HeroButtons from "./HeroButtons";
import HeroStats from "./HeroStats";
import HeroSocialProof from "./HeroSocialProof";
import type { HeroSlideData } from "./hero.types";

interface Props {
  slide: HeroSlideData;
}

const HeroContent = ({ slide }: Props) => {
  return (
    <div className="flex flex-col gap-7 max-w-xl">
      <AnimatePresence mode="wait">
        <motion.span
          key={`label-${slide.id}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, delay: 0 }}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-[#CFFF04]/30 px-4 py-1.5 text-xs font-medium tracking-wide text-secondary-blaze backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#CFFF04]" />
          {slide.label}
        </motion.span>
      </AnimatePresence>

      <h1
        className="font-display leading-[0.95] text-[#F5F3EE]"
        style={{ fontSize: "clamp(2.75rem, 6vw, 4.75rem)" }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={`top-${slide.id}`}
            className="block overflow-hidden text-secondary-blaze"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {slide.headlineTop}
          </motion.span>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.span
            key={`emph-${slide.id}`}
            className="block text-[#CFFF04]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            {slide.headlineEmphasis}
          </motion.span>
        </AnimatePresence>
      </h1>

      <AnimatePresence mode="wait">
        <motion.p
          key={`desc-${slide.id}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-base sm:text-lg text-[#8B8681] max-w-md"
        >
          {slide.description}
        </motion.p>
      </AnimatePresence>

      <HeroButtons />
      {/* add color to starts */}

      <HeroStats stats={slide.stats} />
      <HeroSocialProof />
    </div>
  );
};

export default HeroContent;
