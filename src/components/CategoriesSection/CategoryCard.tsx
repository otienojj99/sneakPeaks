import React, { useState } from "react";
import { motion } from "framer-motion";
import type { CategoryData } from "./categoryData";
import CategoryImage from "./CategoryImage";
import CategoryOverlay from "./CategoryOverlay";
import CategoryButton from "./CategoryButton";

interface Props {
  data: CategoryData;
  index: number;
}

const heightClass: Record<CategoryData["size"], string> = {
  large: "h-[420px] sm:h-[480px]",
  medium: "h-[340px] sm:h-[380px]",
};

const CategoryCard = ({ data, index }: Props) => {
  const [hovered, setHovered] = useState(false);
  const { name, subtitle, size, accent } = data;

  return (
    <motion.a
      href="#"
      aria-label={`Shop the ${name} collection — ${subtitle}`}
      tabIndex={0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className={`relative block overflow-hidden rounded-[32px] ${heightClass[size]} focus:outline-none`}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        type: "spring",
        stiffness: 110,
        damping: 16,
        delay: 0.1 + index * 0.1,
      }}
      animate={{
        y: hovered ? -8 : 0,
        boxShadow: hovered
          ? "0 32px 60px -16px rgba(20,21,26,0.35)"
          : "0 12px 30px -14px rgba(20,21,26,0.15)",
      }}
    >
      <CategoryImage accent={accent} hovered={hovered} />
      <CategoryOverlay cname={name} subtitle={subtitle} hovered={hovered} />
      <CategoryButton hovered={hovered} label={name} />
    </motion.a>
  );
};

export default CategoryCard;
