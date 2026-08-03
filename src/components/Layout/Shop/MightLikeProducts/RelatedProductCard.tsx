import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Check } from "lucide-react";
import type { Product } from "../../../../types/product.types";
import ProductImage from "../Products/ProductImage";

interface Props {
  product: Product;
  onAddToCart: (product: Product) => void;
  basePath?: string;
}

const RelatedProductCard = ({
  product,
  onAddToCart,
  basePath = "/shop",
}: Props) => {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };
  return (
    <motion.a
      href={`${basePath}/${product.slug}`}
      data-card
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="shrink-0 snap-center w-[200px] sm:w-[200px] flex flex-col rounded-2xl overflow-hidden bg-[#F5F3EE] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14151A] focus-visible:ring-offset-2"
      animate={{
        y: hovered ? -4 : 0,
        boxShadow: hovered
          ? "0 16px 32px -18px rgba(20,21,26,0.2)"
          : "0 4px 12px -10px rgba(20,21,26,0.08)",
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative">
        <ProductImage product={product} hovered={hovered} />
        <motion.button
          onClick={handleAdd}
          aria-label="Add to cart"
          animate={{
            opacity: hovered || added ? 1 : 0,
            scale: hovered || added ? 1 : 0.85,
          }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14151A]"
        >
          {added ? (
            <Check size={14} className="text-[#14151A]" />
          ) : (
            <Plus size={14} className="text-[#14151A]" />
          )}
        </motion.button>
      </div>

      <div className="p-3">
        <p className="text-[11px] text-[#8B8681] truncate">
          {product.brand?.name}
        </p>
        <h3 className="text-xs font-semibold text-[#14151A] truncate mt-0.5">
          {product.name}
        </h3>
        <p className="text-sm font-bold text-[#14151A] mt-1">
          ${product.selling_price}
        </p>
      </div>
    </motion.a>
  );
};

export default RelatedProductCard;
