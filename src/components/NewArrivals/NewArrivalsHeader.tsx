import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const NewArrivalsHeader = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-14">
      <div>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold tracking-[0.2em] uppercase text-[#8B8681] mb-4"
        >
          New Season
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-[#14151A]"
          style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.25rem)" }}
        >
          Meet The Latest Collection
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 max-w-md text-base text-[#8B8681]"
        >
          Discover our newest sneakers crafted for movement, comfort and
          everyday confidence.
        </motion.p>
      </div>

      <motion.a
        href="#"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative inline-flex items-center gap-2 text-sm font-semibold text-[#14151A] pb-1 w-fit focus:outline-none"
      >
        View All
        <motion.span
          animate={{ x: hovered ? 4 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <ArrowRight size={16} />
        </motion.span>
        <motion.span
          className="absolute left-0 -bottom-0.5 h-[1.5px] bg-[#14151A]"
          animate={{ width: hovered ? "100%" : "40%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </motion.a>
    </div>
  );
};

export default NewArrivalsHeader;
