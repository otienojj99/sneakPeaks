import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Star,
  Minus,
  Plus,
  ShoppingBag,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
// import type { Product } from "./types";
import type { Product } from "../../../../types/product.types";
import type { ProductImage } from "../../../../types/product.types";

interface Props {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (
    product: Product,
    quantity: number,
    color?: string,
    size?: string,
  ) => void;
  /** Base path for full product pages, e.g. "/shop" -> "/shop/:slug" */
  basePath?: string;
}

const ProductQuickView = ({
  product,
  onClose,
  onAddToCart,
  basePath = "/shop",
}: Props) => {
  const [activeImage, setActiveImage] = useState(0);
  const [color, setColor] = useState<string | undefined>(undefined);
  const [size, setSize] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const images = [product.featured_image, ...product.gallery_images].filter(
    (img): img is ProductImage => img !== null,
  );
  const whatsappMessage = encodeURIComponent(
    `Hi! I'd like to order: ${product.brand} ${product.name} (${product.selling_price}) — ${window.location.origin}${basePath}/${product.slug}`,
  );

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-[#14151A]/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${product.name} quick view`}
            className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[28px] bg-[#F5F3EE] p-6 sm:p-8 grid sm:grid-cols-2 gap-8"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
          >
            <button
              onClick={onClose}
              aria-label="Close quick view"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white border border-[#E4E0D8] flex items-center justify-center hover:bg-[#14151A] hover:text-[#F5F3EE] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14151A]"
            >
              <X size={16} />
            </button>

            {/* Gallery */}
            <div className="flex flex-col gap-3">
              <div className="w-full aspect-square rounded-2xl overflow-hidden bg-white">
                <img
                  src={images[activeImage].image_url}
                  alt={`${product.brand} ${product.name}`}
                  className="w-full h-full object-cover"
                />
              </div>
              {images.length > 1 && (
                <div className="flex gap-2">
                  {images.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      aria-label={`View image ${i + 1}`}
                      className="w-14 h-14 rounded-lg overflow-hidden border-2 transition-colors"
                      style={{
                        borderColor:
                          i === activeImage ? "#CFFF04" : "transparent",
                      }}
                    >
                      <img
                        src={src.image_url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-xs text-[#8B8681]">{product.brand?.name}</p>
                <h2 className="font-display text-2xl text-[#14151A] mt-1">
                  {product.name}
                </h2>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xl font-bold text-[#14151A]">
                  ${product.selling_price}
                </span>
                {product.compare_price &&
                  product.compare_price > product.selling_price && (
                    <span className="text-sm text-[#8B8681] line-through">
                      ${product.compare_price}
                    </span>
                  )}
                {typeof product.rating === "number" && (
                  <span className="flex items-center gap-1 text-xs text-[#8B8681]">
                    <Star size={12} className="fill-[#CFFF04] text-[#CFFF04]" />
                    {/* {product.rating.toFixed(1)}{" "} */}
                    {product.views_count ? `(${product.views_count})` : ""}
                  </span>
                )}
              </div>

              {product.description && (
                <p className="text-sm text-[#8B8681] leading-relaxed">
                  {product.description}
                </p>
              )}

              {product.variations && product.variations.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-[#14151A] mb-2">
                    Color
                  </p>
                  <div className="flex gap-2">
                    {product.variations.map((c) => (
                      <button
                        key={c.color}
                        disabled={!c.stock}
                        onClick={() => setColor(c.name)}
                        aria-label={c.color}
                        aria-pressed={color === c.color}
                        className="w-8 h-8 rounded-full border-2 disabled:opacity-30 disabled:cursor-not-allowed"
                        style={{
                          background: c.color ?? "#E4E0D8",
                          borderColor:
                            color === c.color ? "#CFFF04" : "#E4E0D8",
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {product.variations && product.variations.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-[#14151A] mb-2">
                    Size
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.variations.map((s) => (
                      <button
                        key={s.name}
                        disabled={!s.stock}
                        onClick={() => setSize(s.name)}
                        aria-pressed={size === s.name}
                        className="min-w-[40px] rounded-lg border px-2.5 py-1.5 text-xs font-medium disabled:opacity-30 disabled:cursor-not-allowed disabled:line-through transition-colors"
                        style={{
                          borderColor: size === s.color ? "#14151A" : "#E4E0D8",
                          background:
                            size === s.color ? "#14151A" : "transparent",
                          color: size === s.color ? "#F5F3EE" : "#14151A",
                        }}
                      >
                        {s.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {typeof product.variations === "number" && (
                <p className="text-xs text-[#8B8681]">
                  {product.variations > 0
                    ? `${product.variations} in stock`
                    : "Out of stock"}
                </p>
              )}

              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-full border border-[#E4E0D8]">
                  <button
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 flex items-center justify-center text-[#14151A]"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="w-8 text-center text-sm font-medium text-[#14151A]">
                    {quantity}
                  </span>
                  <button
                    aria-label="Increase quantity"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 flex items-center justify-center text-[#14151A]"
                  >
                    <Plus size={13} />
                  </button>
                </div>

                <motion.button
                  onClick={() => onAddToCart(product, quantity, color, size)}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 flex items-center justify-center gap-2 rounded-full bg-[#CFFF04] px-5 py-2.5 text-sm font-semibold text-[#14151A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14151A] focus-visible:ring-offset-2"
                >
                  <ShoppingBag size={15} /> Add To Cart
                </motion.button>
              </div>

              <a
                href={`https://wa.me/?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border border-[#25D366]/40 px-5 py-2.5 text-sm font-semibold text-[#14151A] hover:bg-[#25D366]/10 transition-colors"
              >
                <MessageCircle size={15} className="text-[#25D366]" /> Buy via
                WhatsApp
              </a>

              <a
                href={`${basePath}/${product.slug}`}
                className="flex items-center justify-center gap-1.5 text-sm font-medium text-[#14151A] hover:opacity-70 transition-opacity mt-1"
              >
                View Full Details <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductQuickView;
