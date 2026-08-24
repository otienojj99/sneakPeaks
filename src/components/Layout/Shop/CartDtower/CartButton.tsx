import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "../../Shop/store/cart/cartStore";
import { useCartDrawerStore } from "../CartDtower/cartDrawerStore";

const CartButton = () => {
  const count = useCartStore((state) => state.totalItemCount());
  const openDrawer = useCartDrawerStore((state) => state.open);

  console.log("Clicked", openDrawer);

  const [bump, setBump] = useState(false);

  useEffect(() => {
    if (count === 0) return;
    setBump(true);
    const t = setTimeout(() => setBump(false), 400);
    return () => clearTimeout(t);
  }, [count]);

  return (
    <motion.button
      onClick={openDrawer}
      aria-label={`Shopping bag${count > 0 ? `, ${count} item${count === 1 ? "" : "s"}` : ""}`}
      whileHover={{
        y: -2,
        backgroundColor: "#F5F3EE",
        boxShadow: "0 8px 20px rgba(20,21,26,0.1)",
      }}
      whileTap={{ scale: 0.95 }}
      className="relative w-10 h-10 rounded-full flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14151A] focus-visible:ring-offset-2"
    >
      <motion.span whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
        <ShoppingBag size={18} strokeWidth={1.75} className="text-[#14151A]" />
      </motion.span>

      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: bump ? [1, 1.35, 1] : 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold"
            style={{ background: "#CFFF04", color: "#14151A" }}
          >
            {count > 9 ? "9+" : count}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default CartButton;
