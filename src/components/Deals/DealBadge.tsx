import React from "react";
import { motion } from "framer-motion";

interface Props {
  percent: number;
  hovered: boolean;
}

const DealBadge = ({ percent, hovered }: Props) => {
  return (
    <motion.span
      className="absolute top-5 left-5 z-10 rounded-full px-3 py-1.5 text-[11px] font-bold tracking-wide text-[#F5F3EE] shadow-[0_6px_16px_rgba(255,69,38,0.35)]"
      style={{ background: "#FF4526" }}
      animate={{ y: hovered ? [0, -4, 0] : 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      −{percent}%
    </motion.span>
  );
};

export default DealBadge;
