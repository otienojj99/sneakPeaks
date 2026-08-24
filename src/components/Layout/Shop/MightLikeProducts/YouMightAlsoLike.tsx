import React from "react";
import { motion } from "framer-motion";
import type { Product } from "../../../../types/product.types";
import RelatedProductsCarousel from "./RelatedProductsCarousel";

interface Props {
  products: Product[];
  title?: string;
  onAddToCart?: (product: Product) => void;
  basePath?: string;
}

const YouMightAlsoLike = ({
  products,
  title = "You Might Also Like",
  onAddToCart,
  basePath = "/shop",
}: Props) => {
  if (products.length === 0) return null;

  return (
    <section className="w-full bg-[#F5F3EE] py-2 sm:py-20 flex-auto justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8"
      >
        <h2 className="font-display text-2xl sm:text-3xl text-[#14151A] mb-8">
          {title}
        </h2>
        <RelatedProductsCarousel
          products={products}
          onAddToCart={(p) => onAddToCart?.(p)}
          basePath={basePath}
        />
      </motion.div>
    </section>
  );
};

export default YouMightAlsoLike;
