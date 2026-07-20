import React, { useState } from "react";
import { motion } from "framer-motion";
import type { ProductData } from "./productData";
import ProductImage from "./ProductImage";
import ProductBadges from "./ProductBadges";
import ProductRating from "./ProductRating";
import ProductPrice from "./ProductPrice";
import ProductActions from "./ProductActions";

interface Props {
  product: ProductData;
  index: number;
  onQuickView: (product: ProductData) => void;
}

const ProductCard: React.FC<Props> = ({ product, index, onQuickView }) => {
  const [hovered, setHovered] = useState(false);
  const {
    name,
    brand,
    price,
    wasPrice,
    rating,
    reviewCount,
    badges,
    colors,
    accent,
    rotation,
    featured,
  } = product;

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
      role="group"
      aria-label={`${name} by ${brand}, $${price}`}
      className={`relative shrink-0 snap-center rounded-[32px] border border-[#E4E0D8] p-6 sm:p-7 flex flex-col outline-none ${
        featured ? "w-[300px] sm:w-[340px]" : "w-[260px] sm:w-[290px]"
      }`}
      style={{
        background:
          "linear-gradient(160deg, rgba(255,255,255,0.9) 0%, rgba(245,243,238,0.7) 100%)",
      }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 18,
        delay: index * 0.12,
      }}
      animate={{
        y: hovered ? -10 : 0,
        boxShadow: hovered
          ? "0 32px 60px -18px rgba(20,21,26,0.25)"
          : "0 12px 30px -16px rgba(20,21,26,0.12)",
      }}
    >
      <ProductBadges badges={badges} hovered={hovered} />
      <div
        className={`flex items-center justify-center ${featured ? "h-52 sm:h-60" : "h-44 sm:h-48"}`}
      >
        <ProductImage accent={accent} rotation={rotation} hovered={hovered} />
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <p className="text-xs font-medium tracking-wide text-[#8B8681]">
          {brand}
        </p>
        <h3 className="font-display text-xl sm:text-2xl text-[#14151A] leading-tight">
          {name}
        </h3>
        <ProductRating rating={rating} reviewCount={reviewCount} />
        <ProductPrice price={price} wasPrice={wasPrice} hovered={hovered} />

        <div className="flex gap-1.5 pt-1">
          {colors.map((c) => (
            <span
              key={c}
              className="w-3.5 h-3.5 rounded-full border border-[#E4E0D8]"
              style={{ background: c }}
            />
          ))}
        </div>
      </div>
      <div className="mt-5">
        <ProductActions
          onQuickView={() => onQuickView(product)}
          revealed={hovered}
        />
      </div>
    </motion.div>
  );
};

export default ProductCard;
