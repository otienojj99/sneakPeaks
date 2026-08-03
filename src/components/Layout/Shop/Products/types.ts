/**
 * types.ts
 * The brief says "use the existing Product interface" from your backend —
 * since I don't have access to it, this is a placeholder shaped like a
 * typical sneaker-boutique product so every component below compiles and
 * runs. Replace this whole interface with an import from your real API
 * types (e.g. `import { Product } from "@/types/product"`) and adjust any
 * field name mismatches (they're all read as `product.<field>` throughout,
 * so renames are single-point changes).
 */
export interface ProductVariantOption {
  label: string;
  /** For colors, a hex/CSS color; for sizes, just the label is used. */
  value?: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  slug: string;
  brand: string;
  name: string;
  description?: string;
  price: number;
  comparePrice?: number;
  rating?: number;
  reviewCount?: number;
  featured_image: string;
  gallery?: string[];
  colors?: ProductVariantOption[];
  sizes?: ProductVariantOption[];
  stock?: number;
  isNew?: boolean;
  onSale?: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
}
