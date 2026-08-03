import React from "react";
import { motion } from "framer-motion";

interface Props {
  count: number;
}

const ProductCount = ({ count }: Props) => {
  return (
    <p className="text-sm text-[#8B8681] whitespace-nowrap">
      Showing{" "}
      <motion.span
        key={count}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="font-semibold text-[#14151A]"
      >
        {count.toLocaleString()}
      </motion.span>{" "}
      Products
    </p>
  );
};

export default ProductCount;
