import React from "react";
import { motion } from "framer-motion";
import LifestyleCTA from "./LifestyleCTA";

interface Props {
  label: string;
  heading: string;
  description: string;
  ctaLabel: string;
  secondaryLabel: string;
  align?: "left" | "center";
}

const LifestyleContent = ({
  label,
  heading,
  description,
  ctaLabel,
  secondaryLabel,
  align = "left",
}: Props) => {
  return (
    <div
      className={`flex flex-col gap-6 max-w-xl ${align === "center" ? "items-center text-center" : "items-start text-left"}`}
    >
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-xs font-semibold tracking-[0.25em] uppercase text-[#CFFF04]"
      >
        {label}
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="font-display leading-[0.95] text-[#F5F3EE]"
        style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
      >
        {heading}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="text-base sm:text-lg text-[#E4E0D8] max-w-md"
      >
        {description}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.55 }}
      >
        <LifestyleCTA ctaLabel={ctaLabel} secondaryLabel={secondaryLabel} />
      </motion.div>
    </div>
  );
};

export default LifestyleContent;
