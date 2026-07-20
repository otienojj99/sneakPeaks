import React, { useState } from "react";
import ProductBackground from "./ProductBackground";
import BestSellersHeader from "./BestSellersHeader";
import ProductGrid from "./ProductGrid";
import ProductQuickView from "./ProductQuickView";
import type { BestSellerData } from "./productData";

const BestSellersSection: React.FC = () => {
  const [quickViewProduct, setQuickViewProduct] =
    useState<BestSellerData | null>(null);

  return (
    <section className="relative w-full overflow-hidden py-24 sm:py-28">
      <ProductBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
        <BestSellersHeader />
        <ProductGrid onQuickView={setQuickViewProduct} />
      </div>

      <ProductQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
};

export default BestSellersSection;
