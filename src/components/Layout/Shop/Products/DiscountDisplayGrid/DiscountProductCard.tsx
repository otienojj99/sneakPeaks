import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Check, Eye } from "lucide-react";
import type { Product } from "../../../../../types/product.types";
import ProductImage from "../../Products/ProductImage";
import {
  getDiscountPercent,
  formatPrice,
  isOutOfStock,
} from "../../Products/productHelpers";

export type DiscountCardVariant = "hero" | "side";

interface Props {
  product: Product;
  variant: DiscountCardVariant;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  /** Side cards call this to bring themselves to center instead of navigating away. */
  onFocus?: () => void;
  basePath?: string;
}

const DiscountProductCard = ({
  product,
  variant,
  onAddToCart,
  onQuickView,
  onFocus,
  basePath = "/shop",
}: Props) => {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const comparePrice = product.compare_price
    ? Number(product.compare_price)
    : null;
  const discount = getDiscountPercent(
    comparePrice,
    Number(product.selling_price),
  );
  const outOfStock = isOutOfStock(product);
  const isHero = variant === "hero";

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (outOfStock) return;
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView(product);
  };

  const imageBlock = (
    <div className="relative">
      {discount !== null && (
        <span
          className="absolute top-2.5 left-2.5 z-10 rounded-full bg-[#FF4526] text-[#F5F3EE] font-bold px-2 py-1"
          style={{ fontSize: isHero ? 12 : 10 }}
        >
          -{discount}%
        </span>
      )}
      <ProductImage product={product} hovered={hovered} />
      {outOfStock && (
        <div className="absolute inset-0 bg-[#14151A]/55 flex items-center justify-center">
          <span className="text-[11px] font-semibold tracking-wide text-[#F5F3EE] uppercase">
            Out of Stock
          </span>
        </div>
      )}

      {isHero && !outOfStock && (
        <>
          <motion.button
            onClick={handleAdd}
            arial-label="Add to cart"
            animate={{
              opacity: hovered || added ? 1 : 0,
              scale: hovered || added ? 1 : 0.85,
            }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14151A]"
          >
            {added ? (
              <Check size={15} className="text-[#14151A]" />
            ) : (
              <Plus size={15} className="text-[#14151A]" />
            )}
          </motion.button>
          <motion.button
            onClick={handleQuickView}
            aria-label="Quick view"
            animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.85 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-3 right-14 w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14151A]"
          >
            <Eye size={14} className="text-[#14151A]" />
          </motion.button>
        </>
      )}
    </div>
  );

  const infoBlock = (
    <div className={isHero ? "p-4" : "p-2.5"}>
      {product.brand && (
        <p
          className="text-[#8B8681] truncate"
          style={{ fontSize: isHero ? 12 : 10 }}
        >
          {product.brand.name}
        </p>
      )}
      <h3
        className="font-semibold text-[#14151A] truncate"
        style={{ fontSize: isHero ? 15 : 11, marginTop: isHero ? 2 : 1 }}
      >
        {product.name}
      </h3>
      {isHero && (
        <div className="flex items-baseline gap-2 mt-1.5">
          <span className="text-base font-bold text-[#14151A]">
            {formatPrice(Number(product.selling_price))}
          </span>
          {discount !== null && product.compare_price && (
            <span className="text-xs text-[#8B8681] line-through">
              {formatPrice(Number(product.compare_price ?? 0))}
            </span>
          )}
        </div>
      )}
    </div>
  );

  const sharedClass =
    "flex flex-col rounded-2xl overflow-hidden bg-white border focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14151A] focus-visible:ring-offset-2";

  if (isHero) {
    return (
      <motion.a
        href={`${basePath}/${product.slug}`}
        data-card
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className={`${sharedClass} w-full h-full border-[#E4E0D8]`}
        style={{ boxShadow: "0 24px 48px -20px rgba(20,21,26,0.28)" }}
      >
        {imageBlock}
        {infoBlock}
      </motion.a>
    );
  }

  return (
    <button
      type="button"
      data-card
      onClick={onFocus}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      aria-label={`View ${product.name}`}
      className={`${sharedClass} w-full h-full border-transparent text-left`}
    >
      {imageBlock}
      {infoBlock}
    </button>
  );
};

export default DiscountProductCard;
