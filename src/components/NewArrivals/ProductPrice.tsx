import React from "react";
import { motion } from "framer-motion";

interface Props {
  price?: number;
  wasPrice?: number;
  hovered: boolean;
}

const ProductPrice: React.FC<Props> = ({ price, wasPrice, hovered }) => {
  return (
    <div className="flex items-baseline gap-2">
      <motion.span
        className="text-xl font-bold text-[#14151A]"
        animate={{ y: hovered ? -2 : 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        ${price}
      </motion.span>
      {wasPrice && (
        <span className="text-sm text-[#8B8681] line-through">${wasPrice}</span>
      )}
    </div>
  );
};

export default ProductPrice;
