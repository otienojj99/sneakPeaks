import React from "react";
import { motion } from "framer-motion";
import TrustBackground from "./TrustBackground";
import TrustGrid from "./TrustGrid";

const TrustSection = () => {
  return (
    <section className="relative w-full overflow-hidden py-24 sm:py-28">
      <TrustBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
        <div className="max-w-2xl mx-auto text-center mb-14 sm:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold tracking-[0.2em] uppercase text-[#8B8681] mb-4"
          >
            Why Shop With Us
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-[#14151A]"
            style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}
          >
            Every Order Comes With Confidence
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base text-[#8B8681]"
          >
            From checkout to your doorstep, every detail is designed around a
            smoother, more trustworthy experience.
          </motion.p>
        </div>

        <TrustGrid />
      </div>
    </section>
  );
};

export default TrustSection;
