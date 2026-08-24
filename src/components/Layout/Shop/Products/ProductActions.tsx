import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Eye, Check } from "lucide-react";
import type { Product } from "../../../../types/product.types";


interface Props {
  product: Product;
  hovered: boolean;
  onAddToCart: (
    product: Product,
    quantity?: number,
    variationId?: number,
    size?: string,
    color?: string,
  ) => void;
  onQuickView: (product: Product) => void;
}

const ProductActions = ({
  product,
  hovered,
  onAddToCart,
  onQuickView,
}: Props) => {
  const [wishlisted, setWishlisted] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("🛒 ProductActions - Add to cart:", product);
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlisted((w) => !w);
  };

  return (
    <>
      {/* Top-right wishlist */}
      <motion.button
        onClick={handleWishlist}
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        aria-pressed={wishlisted}
        initial={false}
        animate={{
          opacity: hovered || wishlisted ? 1 : 0,
          scale: hovered || wishlisted ? 1 : 0.85,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14151A] sm:opacity-0 sm:group-hover:opacity-100"
      >
        <motion.span
          animate={{ scale: wishlisted ? [1, 1.3, 1] : 1 }}
          transition={{ duration: 0.35 }}
        >
          <Heart
            size={16}
            className={
              wishlisted ? "fill-[#FF4526] text-[#FF4526]" : "text-[#14151A]"
            }
          />
        </motion.span>
      </motion.button>

      {/* Bottom actions */}
      <motion.div
        className="absolute left-3 right-3 bottom-3 z-10 hidden sm:flex items-center gap-2"
        initial={false}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <ActionButtons
          justAdded={justAdded}
          onAddToCart={handleAddToCart}
          onQuickView={handleQuickView}
        />
      </motion.div>

      {/* Always-visible mobile actions */}
      <div className="flex sm:hidden items-center gap-2 mt-3">
        <ActionButtons
          justAdded={justAdded}
          onAddToCart={handleAddToCart}
          onQuickView={handleQuickView}
        />
      </div>
    </>
  );
};

function ActionButtons({
  justAdded,
  onAddToCart,
  onQuickView,
}: {
  justAdded: boolean;
  onAddToCart: (e: React.MouseEvent) => void;
  onQuickView: (e: React.MouseEvent) => void;
}) {
  return (
    <>
      <motion.button
        onClick={onAddToCart}
        aria-label="Add to cart"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="relative flex-1 flex items-center justify-center gap-2 rounded-full bg-[#CFFF04] px-4 py-2.5 text-xs font-semibold text-[#14151A] overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14151A] focus-visible:ring-offset-2"
      >
        <AnimatePresence mode="wait">
          {justAdded ? (
            <motion.span
              key="added"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="flex items-center gap-1.5"
            >
              <Check size={14} /> Added
            </motion.span>
          ) : (
            <motion.span
              key="default"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="flex items-center gap-1.5"
            >
              <ShoppingBag size={14} /> Add To Cart
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <motion.button
        onClick={onQuickView}
        aria-label="Quick view"
        whileHover={{ y: -2, scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-9 h-9 shrink-0 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14151A] focus-visible:ring-offset-2"
      >
        <Eye size={15} className="text-[#14151A]" />
      </motion.button>
    </>
  );
}

export default ProductActions;
