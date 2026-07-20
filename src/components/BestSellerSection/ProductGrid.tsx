import React from "react";
import { bestSellers } from "./productData";
import ProductCard from "./ProductCard";

interface Props {
  onQuickView: (product: (typeof bestSellers)[number]) => void;
}

const ProductGrid = ({ onQuickView }: Props) => {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-4 gap-6 lg:gap-8">
      {bestSellers.map((product, i) => (
        <ProductCard
          key={product.id}
          product={product}
          index={i}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
