import React, { useState } from "react";
import { LayoutGroup } from "framer-motion";
import type { Product } from "../../../../types/product.types";
import ProductCard from "./ProductCard";
import ProductQuickView from "./ProductQuickView";

interface Props {
  products: Product[];
  /** Column count, controlled by ProductToolbar's GridSwitcher (2 | 3 | 4). */
  columns?: 2 | 3 | 4;
  onAddToCart?: (
    product: Product,
    quantity?: number,
    color?: string,
    size?: string,
  ) => void;
  basePath?: string;
}

const colClass: Record<2 | 3 | 4, string> = {
  2: "grid-cols-1 min-[380px]:grid-cols-2",
  3: "grid-cols-1 min-[380px]:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 min-[380px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
};

const ProductGrid = ({
  products = [],
  columns = 3,
  onAddToCart,
  basePath = "/shop",
}: Props) => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(
    null,
  );

  console.log("🟡 ProductGrid rendered");
  console.log("🟡 Products:", products);
  console.log("🟡 Products count:", products?.length);

  const handleAddToCart = (
    product: Product,
    quantity = 1,
    color?: string,
    size?: string,
  ) => {
    onAddToCart?.(product, quantity, color, size);
  };

  return (
    <LayoutGroup>
      <div
        className={`grid ${colClass[columns]} gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:gap-8`}
      >
        {(products || []).map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            index={i}
            basePath={basePath}
            onAddToCart={handleAddToCart}
            onQuickView={setQuickViewProduct}
          />
        ))}
      </div>

      <ProductQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(p, qty, color, size) => {
          handleAddToCart(p, qty, color, size);
          setQuickViewProduct(null);
        }}
        basePath={basePath}
      />
    </LayoutGroup>
  );
};

export default ProductGrid;
