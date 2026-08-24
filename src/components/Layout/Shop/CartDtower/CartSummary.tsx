import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useCartStore } from "../../Shop/store/cart/cartStore";
import { formatPrice } from "../Products/productHelpers";

interface Props {
  onNavigate: (href: string) => void;
}

const CartSummary = ({ onNavigate }: Props) => {
  const totalPrice = useCartStore((s) => s.totalPrice());

  return (
    <div className="border-t border-[#E4E0D8] bg-[#F5F3EE] px-6 py-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-[#8B8681]">Subtotal</span>
        <span className="text-lg font-bold text-[#14151A]">
          {formatPrice(totalPrice)}
        </span>
      </div>
      <p className="text-xs text-[#8B8681] -mt-2">
        Shipping calculated at checkout
      </p>

      <motion.button
        onClick={() => onNavigate("/checkout")}
        whileHover={{
          y: -2,
          scale: 1.01,
          boxShadow: "0 14px 32px rgba(207,255,4,0.4)",
        }}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center justify-center gap-2 rounded-full bg-[#CFFF04] px-6 py-3.5 text-sm font-semibold text-[#14151A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14151A] focus-visible:ring-offset-2"
      >
        Proceed to Checkout
        <ArrowRight size={15} />
      </motion.button>

      <div className="flex items-center justify-between pt-1">
        <button
          onClick={() => onNavigate("/cart")}
          className="text-sm font-medium text-[#14151A] underline underline-offset-2 hover:text-[#8B8681] transition-colors focus:outline-none"
        >
          View Cart
        </button>
        <button
          onClick={() => onNavigate("/shop")}
          className="text-sm text-[#8B8681] hover:text-[#14151A] transition-colors focus:outline-none"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
