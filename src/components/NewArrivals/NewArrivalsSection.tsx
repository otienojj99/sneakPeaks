import React, { useState } from "react";
import { motion } from "framer-motion";
import ProductBackground from "./ProductBackground";
import NewArrivalsHeader from "./NewArrivalsHeader";
import ProductCarousel from "./ProductCarousel";
import ProductQuickView from "./ProductQuickView";
import { newArrivals } from "./productData";
import type { ProductData } from "./productData";

const NewArrivalsSection = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<ProductData | null>(
    null,
  );

  return (
    <motion.section
      className="relative w-full overflow-hidden py-24 sm:py-28"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7 }}
    >
      <ProductBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
        <NewArrivalsHeader />
        <ProductCarousel
          products={newArrivals}
          onQuickView={setQuickViewProduct}
        />
      </div>

      <ProductQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </motion.section>
  );
};

export default NewArrivalsSection;
