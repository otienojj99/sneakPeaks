import React from "react";
import { motion } from "framer-motion";

const CommunityGalleryHeader = () => {
  return (
    <div className="max-w-2xl mx-auto text-center mb-14 sm:mb-16">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-xs font-semibold tracking-[0.2em] uppercase text-[#8B8681] mb-4"
      >
        Our Community
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-display text-[#14151A]"
        style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.25rem)" }}
      >
        Styled By Real People
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-4 text-base sm:text-lg text-[#8B8681]"
      >
        See how sneaker lovers bring our collections to life through everyday
        style.
      </motion.p>
    </div>
  );
};

export default CommunityGalleryHeader;
