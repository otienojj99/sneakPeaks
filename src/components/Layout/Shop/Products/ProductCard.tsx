import React, { memo, useState } from "react";
import { motion } from "framer-motion";
// import type { Product } from "./types";
import type { Product } from "../../../../types/product.types";
import ProductImage from "./ProductImage";
import ProductBadge from "./ProductBadg";
import ProductActions from "./ProductActions";
import ProductInfo from "./ProductInfo";

interface Props {
  product: Product;
  index: number;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  /** Base path for full product pages, e.g. "/shop" -> "/shop/:slug" */
  basePath?: string;
}

const ProductCard = ({
  product,
  index,
  onAddToCart,
  onQuickView,
  basePath = "/shop",
}: Props) => {
  const [hovered, setHovered] = useState(false);

  console.log("🟢 ProductCard rendered:", {
    index,
    product,
    productId: product?.id,
    productName: product?.name,
    slug: product?.slug,
    sellingPrice: product?.selling_price,
    featuredImage: product?.featured_image,
  });

  return (
    <motion.a
      href={`${basePath}/${product.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="group relative flex flex-col rounded-[28px] bg-[#F5F3EE] overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14151A] focus-visible:ring-offset-2"
      layout
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 18,
        delay: Math.min(index, 8) * 0.06,
      }}
      animate={{
        y: hovered ? -6 : 0,
        boxShadow: hovered
          ? "0 24px 48px -20px rgba(20,21,26,0.25)"
          : "0 8px 20px -16px rgba(20,21,26,0.1)",
      }}
    >
      <div className="relative">
        <ProductBadge product={product} />
        <ProductImage product={product} hovered={hovered} />
        <ProductActions
          product={product}
          hovered={hovered}
          onAddToCart={onAddToCart}
          onQuickView={onQuickView}
        />
      </div>

      <div className="p-4">
        <ProductInfo product={product} />
      </div>
    </motion.a>
  );
};

export default memo(ProductCard);
