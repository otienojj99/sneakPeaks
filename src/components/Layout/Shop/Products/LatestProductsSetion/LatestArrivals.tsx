import React from "react";
import { motion } from "framer-motion";
import type { Product } from "../../../../../types/product.types";
import ProductImage from "../../Products/ProductImage";
import LatestArrivalsHeader from "./LatestArrivalsHeader";
import LatestArrivalsCarousel from "./LatestArrivalsCarousel";

interface Props {
  products: Product[];
  onAddToCart: (product: Product) => void;
  basePath?: string;
  viewAllHref?: string;
}

const LatestArrivals = ({
  products,
  onAddToCart,
  basePath = "/shop",
  viewAllHref,
}: Props) => {
  if (products.length === 0) return null;

  return (
    <section className="w-full bg-white py-16 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.6 }}
        className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12"
      >
        <LatestArrivalsHeader viewAllHref={viewAllHref} />
        <LatestArrivalsCarousel
          products={products}
          onAddToCart={onAddToCart}
          basePath={basePath}
        />
      </motion.div>
    </section>
  );
};

export default LatestArrivals;
