import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { BestSellerData } from "./productData";
import ProductImage from "./ProductImage";
import ProductRating from "./ProductRating";
import ProductBadge from "./ProductBadge";

interface Props {
  product: BestSellerData | null;
  onClose: () => void;
}

const ProductQuickView = ({ product, onClose }: Props) => {
  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-[#14151A]/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${product.name} quick view`}
            className="relative z-10 w-full max-w-2xl rounded-[32px] bg-[#F5F3EE] p-8 sm:p-10 grid sm:grid-cols-2 gap-8 items-center"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
          >
            <button
              onClick={onClose}
              aria-label="Close quick view"
              className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center border border-[#E4E0D8] hover:bg-[#14151A] hover:text-[#F5F3EE] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14151A]"
            >
              <X size={16} />
            </button>

            <div className="flex justify-center">
              <ProductImage
                accent={product.accent}
                rotation={product.rotation}
                hovered={false}
                ribbon={product.ribbon}
              />
            </div>

            <div>
              <ProductBadge badge={product.badge} hovered={false} />
              <p className="mt-3 text-xs font-medium tracking-wide text-[#8B8681]">
                {product.brand}
              </p>
              <h3 className="mt-1 font-display text-3xl text-[#14151A]">
                {product.name}
              </h3>
              <div className="mt-3">
                <ProductRating
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                  hovered={false}
                />
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-xl font-bold text-[#14151A]">
                  ${product.price}
                </span>
                {product.wasPrice && (
                  <span className="text-sm text-[#8B8681] line-through">
                    ${product.wasPrice}
                  </span>
                )}
              </div>
              <p className="mt-2 text-xs font-medium text-[#8B8681]">
                {product.socialProof}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductQuickView;
