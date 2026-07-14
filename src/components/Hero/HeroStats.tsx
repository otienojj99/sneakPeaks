import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Stat } from "./hero.types";

interface Props {
  stats: Stat[];
}

const HeroStats = ({ stats }: Props) => {
  return (
    <motion.div
      className="flex items-center gap-6 sm:gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.85 }}
    >
      {stats.map((stat, i) => (
        <div key={stat.label} className="flex flex-col">
          <AnimatePresence mode="wait">
            <motion.span
              key={stat.value}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4 }}
              className="font-display text-lg sm:text-xl text-secondary-blaze font-semibold"
            >
              {stat.value}
            </motion.span>
          </AnimatePresence>
          <span className="text-[11px] uppercase tracking-wide text-secondary-ink">
            {stat.label}
          </span>
          {i < stats.length - 1 && <span className="hidden" aria-hidden />}
        </div>
      ))}
    </motion.div>
  );
};

export default HeroStats;
