import React from "react";
import { motion } from "framer-motion";
import CategoryBackground from "./CategoryBackground";
import CategoryGrid from "./CategoryGrid";

const CategoriesSection = () => {
  return (
    <section className="relative w-full overflow-hidden py-24 sm:py-28">
      <CategoryBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
        <div className="max-w-2xl mx-auto text-center mb-14 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-[#14151A]"
            style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.25rem)" }}
          >
            Shop by Category
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-[#8B8681]"
          >
            Discover the perfect pair for every lifestyle, every journey, and
            every step.
          </motion.p>
        </div>

        <CategoryGrid />
      </div>
    </section>
  );
};

export default CategoriesSection;
