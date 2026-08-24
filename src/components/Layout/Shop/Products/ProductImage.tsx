import React from "react";
import { motion } from "framer-motion";
import type { Product } from "../../../../types/product.types";

interface Props {
  product: Product;
  hovered: boolean;
}

const ProductImage = ({ product, hovered }: Props) => {
  const primary = product.featured_image || product.gallery_images?.[0];
  const secondary = product.gallery_images?.find((src) => src !== primary);

  return (
    <div className="relative w-full aspect-[4/5] overflow-hidden rounded-t-[28px] bg-[#F5F3EE]">
      {primary && (
        <motion.img
          src={primary.medium_url ?? primary.image_url}
          alt={`${product.brand?.name ?? ""} ${product.name}`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          animate={{
            scale: hovered ? 1.06 : 1,
            opacity: secondary && hovered ? 0 : 1,
          }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      )}
      {secondary && (
        <motion.img
          src={secondary.medium_url ?? secondary.image_url}
          alt={`${product.name} alternate view`}
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          animate={{
            opacity: hovered ? 1 : 0,
            scale: hovered ? 1.06 : 1,
          }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      )}
    </div>
  );
};

export default ProductImage;
