import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

interface Props {
  onContinueShopping: () => void;
}

const EmptyCart = ({ onContinueShopping }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex-1 flex flex-col items-center justify-center text-center px-8 py-16"
    >
      <div className="w-14 h-14 rounded-full bg-[#F5F3EE] flex items-center justify-center mb-5">
        <ShoppingBag size={22} className="text-[#8B8681]" strokeWidth={1.5} />
      </div>
      <h3 className="font-display text-xl text-[#14151A]">
        Your cart is empty
      </h3>
      <p className="text-sm text-[#8B8681] mt-2 max-w-xs">
        Looks like you haven't added anything yet. Explore the collection and
        find your next pair.
      </p>
      <motion.button
        onClick={onContinueShopping}
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-6 rounded-full bg-[#CFFF04] px-6 py-3 text-sm font-semibold text-[#14151A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14151A] focus-visible:ring-offset-2"
      >
        Continue Shopping
      </motion.button>
    </motion.div>
  );
};

export default EmptyCart;
