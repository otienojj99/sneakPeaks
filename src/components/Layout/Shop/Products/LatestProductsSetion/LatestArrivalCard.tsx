import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Star, ShoppingBag, ArrowRight } from "lucide-react";
import type { Product } from "../../../../../types/product.types";
import ProductImage from "../../Products/ProductImage";
import ProductBadge from "../../Products/ProductBadg";
import ProductPrice from "../../Products/ProductPrice";

interface Props {
  product: Product;
  onAddToCart: (product: Product) => void;
  basePath?: string;
}

const LatestArrivalCard = ({
  product,
  onAddToCart,
  basePath = "/shop",
}: Props) => {
  const [hovered, setHovered] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [added, setAdded] = useState(false);

  const rating = parseFloat(product.rating);
  const hasRating = !Number.isNaN(rating) && rating > 0;

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full h-full flex flex-col rounded-[28px] overflow-hidden bg-[#F5F3EE] border border-[#E4E0D8]"
      animate={{
        y: hovered ? -6 : 0,
        boxShadow: hovered
          ? "0 32px 60px -24px rgba(20,21,26,0.28)"
          : "0 12px 30px -20px rgba(20,21,26,0.12)",
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <div className="absolute top-4 left-4 z-10">
          <ProductBadge product={product} />
        </div>

        <ProductImage product={product} hovered={hovered} />

        {/* soft gradient overlay for legibility/mood, on top of the reused image */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#14151A]/25 via-transparent to-transparent pointer-events-none" />

        <motion.button
          onClick={() => setWishlisted((w) => !w)}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wishlisted}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14151A]"
        >
          <motion.span
            animate={{ scale: wishlisted ? [1, 1.3, 1] : 1 }}
            transition={{ duration: 0.35 }}
          >
            <Heart
              size={17}
              className={
                wishlisted ? "fill-[#FF4526] text-[#FF4526]" : "text-[#14151A]"
              }
            />
          </motion.span>
        </motion.button>
      </div>

      <div className="flex-1 flex flex-col p-6 sm:p-7">
        {product.brand && (
          <p className="text-xs text-[#8B8681]">{product.brand.name}</p>
        )}
        <h3 className="font-display text-xl sm:text-2xl text-[#14151A] mt-1">
          {product.name}
        </h3>

        {product.short_description && (
          <p className="text-sm text-[#8B8681] mt-2 leading-relaxed line-clamp-2">
            {product.short_description}
          </p>
        )}

        {hasRating && (
          <div className="flex items-center gap-1.5 mt-3">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={13}
                  className={
                    i < Math.round(rating)
                      ? "fill-[#CFFF04] text-[#CFFF04]"
                      : "fill-transparent text-[#E4E0D8]"
                  }
                />
              ))}
            </div>
            <span className="text-xs text-[#8B8681]">{rating.toFixed(1)}</span>
          </div>
        )}

        <div className="mt-3">
          <ProductPrice product={product} />
        </div>

        <div className="mt-auto pt-6 flex items-center gap-3">
          <motion.button
            onClick={handleAdd}
            whileHover={{
              y: -2,
              scale: 1.02,
              boxShadow: "0 14px 32px rgba(207,255,4,0.4)",
            }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 flex items-center justify-center gap-2 rounded-full bg-[#CFFF04] px-5 py-3 text-sm font-semibold text-[#14151A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14151A] focus-visible:ring-offset-2"
          >
            <ShoppingBag size={15} />
            {added ? "Added ✓" : "Add to Cart"}
          </motion.button>

          <motion.a
            href={`${basePath}/${product.slug}`}
            whileHover={{ x: 2 }}
            className="flex items-center gap-1.5 text-sm font-medium text-[#14151A] whitespace-nowrap focus:outline-none"
          >
            View Details <ArrowRight size={14} />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default LatestArrivalCard;
