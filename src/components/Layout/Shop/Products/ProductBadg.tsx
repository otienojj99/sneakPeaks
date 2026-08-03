import React from "react";
import type { Product } from "../../../../types/product.types";

interface Props {
  product: Product;
}

const ProductBadg = ({ product }: Props) => {
  const badges: { label: string; className: string }[] = [];

  if (product.is_on_sale)
    badges.push({ label: "SALE", className: "bg-[#FF4526] text-[#F5F3EE]" });
  if (product.is_new)
    badges.push({ label: "NEW", className: "bg-[#CFFF04] text-[#14151A]" });
  if (product.is_active)
    badges.push({
      label: "BEST SELLER",
      className: "bg-[#14151A] text-[#F5F3EE]",
    });
  if (product.is_featured)
    badges.push({
      label: "FEATURED",
      className: "bg-[#14151A] text-[#F5F3EE]",
    });

  const visible = badges.slice(0, 2);
  if (visible.length === 0) return null;

  return (
    <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
      {visible.map((b) => (
        <span
          key={b.label}
          className={`rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wide w-fit ${b.className}`}
        >
          {b.label}
        </span>
      ))}
    </div>
  );
};

export default ProductBadg;
