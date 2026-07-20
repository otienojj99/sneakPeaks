import React from "react";
import { motion } from "framer-motion";
import type { BadgeType } from "./productData";

const badgeColor: Record<BadgeType, string> = {
  "Best Seller": "#CFFF04",
  "Customer Favorite": "#CFFF04",
  Trending: "#FF4526",
  "Most Loved": "#FF4526",
  "Top Rated": "#CFFF04",
};

interface Props {
  badge: BadgeType;
  hovered: boolean;
}

const ProductBadge = ({ badge, hovered }: Props) => {
  return (
    <motion.span
      className="rounded-full px-3 py-1 text-[10px] font-bold tracking-wide text-[#14151A] w-fit"
      style={{ background: badgeColor[badge] }}
      animate={{ y: hovered ? [0, -4, 0] : 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {badge}
    </motion.span>
  );
};

export default ProductBadge;
