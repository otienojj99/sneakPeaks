import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Props {
  viewAllHref?: string;
}

const LatestArrivalsHeader = ({ viewAllHref = "/shop?is_new=true" }: Props) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
      <div>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-[#14151A]"
          style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
        >
          Latest Arrivals
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-2 text-sm sm:text-base text-[#8B8681]"
        >
          Fresh styles just landed. Explore the newest additions to our
          collection.
        </motion.p>
      </div>

      <motion.a
        href={viewAllHref}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative inline-flex items-center gap-1.5 text-sm font-semibold text-[#14151A] pb-1 w-fit focus:outline-none"
      >
        View All
        <motion.span
          animate={{ x: hovered ? 3 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowRight size={15} />
        </motion.span>
        <motion.span
          className="absolute left-0 -bottom-0.5 h-px bg-[#14151A]"
          animate={{ width: hovered ? "100%" : "40%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </motion.a>
    </div>
  );
};

export default LatestArrivalsHeader;
