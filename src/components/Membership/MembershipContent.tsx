import React from "react";
import { motion } from "framer-motion";

const MembershipContent = () => {
  return (
    <div className="flex flex-col gap-5 max-w-lg">
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-xs font-semibold tracking-[0.25em] uppercase text-[#CFFF04]"
      >
        Join The Community
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="font-display leading-[0.95] text-[#F5F3EE]"
        style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)" }}
      >
        Never Miss The Next Drop
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="text-base text-[#8B8681]"
      >
        Become part of our community and receive early access to new
        collections, exclusive releases, styling inspiration and special
        member-only offers.
      </motion.p>
    </div>
  );
};

export default MembershipContent;
