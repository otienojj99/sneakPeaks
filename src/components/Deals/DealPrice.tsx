import React from "react";
import { motion } from "framer-motion";

interface Props {
  price: number;
  wasPrice: number;
  hovered: boolean;
}

const DealPrice = ({ price, wasPrice, hovered }: Props) => {
  return (
    <motion.div
      className="flex items-baseline gap-2.5"
      animate={{ y: hovered ? -2 : 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <span className="text-xl font-bold text-[#14151A]">${price}</span>
      <span className="text-sm text-[#8B8681] line-through">${wasPrice}</span>
    </motion.div>
  );
};

export default DealPrice;
