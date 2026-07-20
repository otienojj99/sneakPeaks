import React, { useState } from "react";
import { motion } from "framer-motion";
import type { CommunityPost } from "./communityData";
import CommunityImage from "./CommunityImage";
import CommunityOverlay from "./CommunityOverlay";

interface Props {
  post: CommunityPost;
  index: number;
}

const spanClass: Record<CommunityPost["size"], string> = {
  featured: "sm:col-span-2 sm:row-span-2",
  landscape: "sm:col-span-2 sm:row-span-1",
  portrait: "sm:col-span-1 sm:row-span-2",
  square: "sm:col-span-1 sm:row-span-1",
};

const aspectClass: Record<CommunityPost["size"], string> = {
  featured: "aspect-[4/3]",
  landscape: "aspect-[16/9]",
  portrait: "aspect-[3/4]",
  square: "aspect-square",
};

const CommunityCard = ({ post, index }: Props) => {
  const [hovered, setHovered] = useState(false);
  const { imageSrc, imageAlt, customerName, city, productWorn, size, likes } =
    post;

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
      role="group"
      aria-label={`${customerName ?? "Community member"} wearing ${productWorn}${city ? `, ${city}` : ""}`}
      className={`relative w-full ${aspectClass[size]} ${spanClass[size]} overflow-hidden rounded-[28px] outline-none focus-visible:ring-2 focus-visible:ring-[#14151A]`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        type: "spring",
        stiffness: 110,
        damping: 18,
        delay: index * 0.08,
      }}
      animate={{
        y: hovered ? -6 : 0,
        boxShadow: hovered
          ? "0 28px 55px -18px rgba(20,21,26,0.3)"
          : "0 10px 26px -14px rgba(20,21,26,0.12)",
      }}
    >
      <CommunityImage src={imageSrc} alt={imageAlt} hovered={hovered} />
      <CommunityOverlay
        customerName={customerName}
        city={city}
        productWorn={productWorn}
        likes={likes}
        hovered={hovered}
      />
    </motion.div>
  );
};

export default CommunityCard;
