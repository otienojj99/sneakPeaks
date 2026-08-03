import React from "react";
import { motion } from "framer-motion";

const ShopTabIndicator: React.FC = () => {
  return (
    <motion.span
      layoutId="shop-tab-indicator"
      className="absolute left-0 right-0 -bottom-1 h-[3px] rounded-full bg-[#CFFF04]"
      transition={{ type: "spring", stiffness: 380, damping: 32 }}
    />
  );
};

export default ShopTabIndicator;
