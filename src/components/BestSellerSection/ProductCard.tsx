import React, { useState } from "react";
import { motion } from "framer-motion";
import type { BestSellerData } from "./productData";
import ProductImage from "./ProductImage";
import ProductBadge from "./ProductBadge";
import ProductRating from "./ProductRating";
import ProductActions from "./ProductActions";

interface Props {
  product: BestSellerData;
  index: number;
  onQuickView: (product: BestSellerData) => void;
}

const ProductCard = ({ product, index, onQuickView }: Props) => {
  const [hovered, setHovered] = useState(false);
  const {
    name,
    brand,
    price,
    wasPrice,
    rating,
    reviewCount,
    badge,
    socialProof,
    colors,
    accent,
    rotation,
    featured,
    ribbon,
  } = product;

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
      role="group"
      aria-label={`${name} by ${brand}, $${price}, ${badge}`}
      className="mb-6 lg:mb-8 break-inside-avoid rounded-[28px] border border-[#E4E0D8] p-6 flex flex-col outline-none"
      style={{
        background:
          "linear-gradient(160deg, rgba(255,255,255,0.9) 0%, rgba(245,243,238,0.7) 100%)",
      }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 18,
        delay: index * 0.08,
      }}
      animate={{
        y: hovered ? -8 : 0,
        boxShadow: hovered
          ? "0 28px 55px -18px rgba(20,21,26,0.22)"
          : "0 10px 26px -14px rgba(20,21,26,0.1)",
      }}
    >
      <ProductBadge badge={badge} hovered={hovered} />

      <div
        className={`flex items-center justify-center ${featured ? "h-56 sm:h-64" : "h-40 sm:h-44"} mt-3`}
      >
        <ProductImage
          accent={accent}
          rotation={rotation}
          hovered={hovered}
          ribbon={ribbon}
        />
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <p className="text-xs font-medium text-[#8B8681]">{brand}</p>
        <h3 className="font-display text-lg sm:text-xl text-[#14151A] leading-tight">
          {name}
        </h3>
        <ProductRating
          rating={rating}
          reviewCount={reviewCount}
          hovered={hovered}
        />

        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-[#14151A]">${price}</span>
          {wasPrice && (
            <span className="text-xs text-[#8B8681] line-through">
              ${wasPrice}
            </span>
          )}
        </div>

        <p className="text-xs font-semibold text-[#8B8681]">{socialProof}</p>

        <div className="flex gap-1.5 pt-1">
          {colors.map((c) => (
            <span
              key={c}
              className="w-3 h-3 rounded-full border border-[#E4E0D8]"
              style={{ background: c }}
            />
          ))}
        </div>
      </div>

      <div className="mt-4">
        <ProductActions
          revealed={hovered}
          onQuickView={() => onQuickView(product)}
        />
      </div>
    </motion.div>
  );
};

export default ProductCard;
