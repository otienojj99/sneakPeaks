import React from "react";
import { motion } from "framer-motion";
import BoutiqueBackground from "./BoutiqueBackground";
import BoutiqueDecorations from "./BoutiqueDecorations";
import BoutiqueHeader from "./BoutiqueHeader";
import BoutiqueGrid from "./BoutiqueGrid";
import BoutiqueCTA from "./BoutiqueCTA";

const BoutiqueExperienceSection: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden py-24 sm:py-28">
      <BoutiqueBackground />
      <BoutiqueDecorations />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
        <BoutiqueHeader />
        <BoutiqueGrid />

        <motion.div
          className="flex justify-center mt-16 sm:mt-20"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <BoutiqueCTA />
        </motion.div>
      </div>
    </section>
  );
};

export default BoutiqueExperienceSection;
