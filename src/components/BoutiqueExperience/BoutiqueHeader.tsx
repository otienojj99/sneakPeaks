import React from "react";
import { motion } from "framer-motion";

const BoutiqueHeader = () => {
  return (
    <div className="max-w-2xl mx-auto text-center mb-16 sm:mb-20">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-xs font-semibold tracking-[0.2em] uppercase text-[#8B8681] mb-4"
      >
        The Boutique Difference
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-display text-[#14151A]"
        style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.25rem)" }}
      >
        More Than A Sneaker Store
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-4 text-base sm:text-lg text-[#8B8681]"
      >
        We carefully source premium footwear, guide you through every purchase,
        and help you find the perfect pair for your lifestyle.
      </motion.p>
    </div>
  );
};

export default BoutiqueHeader;
