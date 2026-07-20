import React from "react";
import { motion } from "framer-motion";

interface Props {
  badges: string[];
  hovered: boolean;
}

const ProductBadges: React.FC<Props> = ({ badges, hovered }) => {
  return (
    <div className="absolute top-5 left-5 z-10 flex flex-col gap-2">
      {badges.map((b, i) => (
        <motion.span
          key={b}
          className="rounded-full bg-[#CFFF04] px-3 py-1 text-[10px] font-bold tracking-wide text-[#14151A] w-fit"
          animate={{ y: hovered ? [0, -4, 0] : 0 }}
          transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
        >
          {b}
        </motion.span>
      ))}
    </div>
  );
};

export default ProductBadges;
