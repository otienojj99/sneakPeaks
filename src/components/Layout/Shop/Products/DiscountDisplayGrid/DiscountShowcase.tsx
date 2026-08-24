import React from "react";
import { motion } from "framer-motion";
import type { Product } from "../../../../../types/product.types";
import DiscountShowcaseBanner from "./DiscountShowcaseBanner";
import type { DiscountShowcaseBannerProps } from "./DiscountShowcaseBanner";
import DiscountProductCarousel from "./DiscountProductCarousel";

interface Props {
  products: Product[];
  banner?: DiscountShowcaseBannerProps;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  basePath?: string;
}

const DiscountShowcase = ({
  products,
  banner,
  onAddToCart,
  onQuickView,
  basePath = "/shop",
}: Props) => {
  const onSaleCount = products.filter((p) => p.is_on_sale).length;
  if (onSaleCount === 0) return null;

  return (
    <section className="w-full bg-[#F5F3EE] py-16 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6 }}
        className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid lg:grid-cols-[340px_1fr] gap-6 lg:gap-8 items-stretch">
          <DiscountShowcaseBanner
            {...(banner ?? {
              headline: ["Selected Styles.", "Better Prices."],
            })}
          />

          <div className="flex flex-col justify-center">
            <DiscountProductCarousel
              products={products}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              basePath={basePath}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default DiscountShowcase;
