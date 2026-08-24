// Hlepres for product components

import type { Product } from "../../../../types/product.types";

// 1) getDiscountPercent

export const getDiscountPercent = (
  originalPrice: number | null,
  salePrice: number,
) => {
  if (!originalPrice || originalPrice <= 0) return null;
  const discount = ((originalPrice - salePrice) / originalPrice) * 100;
  return Math.round(discount);
};

// 2) formatPrice

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

// 3) isOutOfStock

export const isOutOfStock = (product: Product) => {
  return product.minimum_stock >= 10;
};
