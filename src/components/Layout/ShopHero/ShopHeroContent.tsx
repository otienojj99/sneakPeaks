import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ShopHeroCampaign } from "./shopHeroData";
import ShopHeroCTA from "./ShopHeroCTA";

interface Props {
  campaign: ShopHeroCampaign;
}

const ShopHeroContent = ({ campaign }: Props) => {
  return (
    <div className="relative z-10 flex flex-col gap-6 max-w-xl">
      <AnimatePresence mode="wait">
        <motion.span
          key={`label-${campaign.id}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-[#CFFF04]/30 px-4 py-1.5 text-xs font-medium tracking-wide text-[#CFFF04]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#CFFF04]" />
          {campaign.label}
        </motion.span>
      </AnimatePresence>

      <h1
        className="font-display leading-[0.95] text-[#F5F3EE]"
        style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
      >
        <AnimatePresence mode="wait">
          <motion.span key={`h-${campaign.id}`} className="block">
            {campaign.headlineLines.map((line, i) => (
              <motion.span
                key={line}
                className="block overflow-hidden"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.15 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {line}
              </motion.span>
            ))}
          </motion.span>
        </AnimatePresence>
      </h1>

      <AnimatePresence mode="wait">
        <motion.p
          key={`d-${campaign.id}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="text-base sm:text-lg text-[#8B8681] max-w-md"
        >
          {campaign.description}
        </motion.p>
      </AnimatePresence>

      <ShopHeroCTA />
    </div>
  );
};

export default ShopHeroContent;
