import React from "react";
import { Star } from "lucide-react";
import type { Product } from "../../../../types/product.types";
import ProductPrice from "./ProductPrice";

interface Props {
  product: Product;
}

const ProductInfo = ({ product }: Props) => {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-xs text-[#8B8681]">{product.brand?.name}</p>
      <h3 className="text-sm font-semibold text-[#14151A] leading-snug line-clamp-1">
        {product.name}
      </h3>
      <ProductPrice product={product} />
      {typeof product.rating === "number" && (
        <div className="flex items-center gap-1 mt-0.5">
          <Star size={12} className="fill-[#CFFF04] text-[#CFFF04]" />
          <span className="text-xs text-[#8B8681]">
            {/* {product.rating.toFixed(1)} */}
            {product.views_count ? ` (${product.views_count})` : ""}
          </span>
        </div>
      )}
    </div>
  );
};

export default ProductInfo;
