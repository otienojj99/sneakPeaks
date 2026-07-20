import React from "react";
import { motion } from "framer-motion";
import PromoBackground from "./PromoBackground";
import PromoDecorations from "./PromoDecorations";
import PromoContent from "./PromoContent";
import PromoImage from "./PromoImage";

interface Props {
  targetDate?: Date;
}

const PromoBanner: React.FC = ({ targetDate }: Props) => {
  const deadline = targetDate ?? new Date(Date.now() + 4 * 24 * 60 * 60 * 1000);

  return (
    <motion.section
      className="relative w-full overflow-x-clip py-24 sm:py-28"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7 }}
    >
      <PromoBackground />
      <PromoDecorations />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 grid md:grid-cols-[45fr_55fr] gap-12 items-center">
        <PromoContent targetDate={deadline} />
        <PromoImage />
      </div>
    </motion.section>
  );
};

export default PromoBanner;
