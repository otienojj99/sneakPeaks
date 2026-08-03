import React from "react";
import { motion } from "framer-motion";
import type { ShopHeroStat } from "./shopHeroData";

interface Props {
  stats: ShopHeroStat[];
}

const ShopHeroStats = ({ stats }: Props) => {
  return (
    <div className="flex flex-wrap items-center gap-8 sm:gap-12">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="flex flex-col"
        >
          <span className="font-display text-2xl sm:text-3xl text-[#F5F3EE]">
            {stat.value}
          </span>
          <span className="text-xs uppercase tracking-wide text-[#8B8681] mt-1">
            {stat.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

export default ShopHeroStats;
