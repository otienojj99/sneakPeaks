import React from "react";
// import type { Product } from "./types";
import type { Product } from "../../../../types/product.types";

interface Props {
  product: Product;
}

const ProductPrice = ({ product }: Props) => {
  const showCompare =
    !!product.compare_price && product.compare_price > product.selling_price;

  return (
    <div className="flex items-baseline gap-2">
      <span className="text-base font-bold text-[#14151A]">
        ${product.selling_price}
      </span>
      {showCompare && (
        <span className="text-xs text-[#8B8681] line-through">
          ${product.compare_price}
        </span>
      )}
    </div>
  );
};

export default ProductPrice;
