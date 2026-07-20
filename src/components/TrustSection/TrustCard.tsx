import React, { useState } from "react";
import { motion } from "framer-motion";
import type { TrustCardData } from "./trustData";
import TrustIcon from "./TrustIcon";

interface Props {
  data: TrustCardData;
  index: number;
}

const TrustCard = ({ data, index }: Props) => {
  const [hovered, setHovered] = useState(false);
  const { icon, title, description } = data;
  return (
    <motion.div
      role="group"
      aria-label={title}
      tabIndex={0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="relative rounded-3xl p-8 bg-white outline-none"
      style={{ border: `1px solid ${hovered ? "#CFFF04" : "#E4E0D8"}` }}
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 16,
        delay: index * 0.15,
      }}
      whileHover={{ y: -8, scale: 1.03 }}
      whileFocus={{ y: -8, scale: 1.03 }}
    >
      <motion.div
        className="absolute inset-0 rounded-3xl -z-10 pointer-events-none"
        animate={{
          opacity: hovered ? 1 : 0,
          boxShadow: hovered
            ? "0 24px 60px -12px rgba(207,255,4,0.25)"
            : "0 0px 0px rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="absolute inset-0 rounded-3xl -z-10 pointer-events-none"
        animate={{
          boxShadow: hovered
            ? "0 20px 45px -18px rgba(20,21,26,0.18)"
            : "0 4px 16px -8px rgba(20,21,26,0.06)",
        }}
        transition={{ duration: 0.3 }}
      />
      <TrustIcon icon={icon} hovered={hovered} />

      <motion.h3
        className="mt-6 text-lg font-semibold"
        animate={{ color: hovered ? "#0A0A0D" : "#14151A" }}
        transition={{ duration: 0.2 }}
      >
        {title}
      </motion.h3>

      <p className="mt-2 text-sm leading-relaxed text-[#8B8681]">
        {description}
      </p>
    </motion.div>
  );
};

export default TrustCard;
