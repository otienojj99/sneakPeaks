import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useCartStore } from "../../Shop/store/cart/cartStore";
import { useCartDrawerStore } from "../../Shop/CartDtower/cartDrawerStore";
import CartDrawerItem from "./CartDrawerItem";
import CartSummary from "./CartSummary";
import EmptyCart from "./EmptyCart";

interface Props {
  /**
   * Optional navigation function — wire to your router (e.g. Next.js
   * `router.push` or react-router's `navigate`) so "View Cart"/"Continue
   * Shopping"/"Proceed to Checkout" don't trigger a full page reload.
   * Defaults to `window.location.href` if not provided.
   */
  navigate?: (href: string) => void;
}

const CartDrawer = ({ navigate }: Props) => {
  const isOpen = useCartDrawerStore((s) => s.isOpen);
  const close = useCartDrawerStore((s) => s.close);
  const items = useCartStore((s) => s.items);
  const totalItemCount = useCartStore((s) => s.totalItemCount());

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "";
  }, [isOpen, close]);

  const handleNavigate = (href: string) => {
    close();
    if (navigate) navigate(href);
    else window.location.href = href;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[100]"
            style={{ background: "rgba(20,21,26,0.45)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            className="fixed top-0 right-0 z-[101] h-full w-[100vw] sm:w-[400px] lg:w-[440px] max-w-full bg-[#F5F3EE] shadow-[-20px_0_60px_-20px_rgba(20,21,26,0.35)] flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E4E0D8] shrink-0">
              <div>
                <h2 className="font-display text-lg text-[#14151A]">
                  Your Cart
                </h2>
                <p className="text-xs text-[#8B8681] mt-0.5">
                  {totalItemCount} {totalItemCount === 1 ? "item" : "items"}
                </p>
              </div>
              <motion.button
                onClick={close}
                aria-label="Close cart"
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "#14151A",
                  color: "#F5F3EE",
                }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 rounded-full border border-[#E4E0D8] flex items-center justify-center text-[#14151A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14151A]"
              >
                <X size={16} />
              </motion.button>
            </div>

            {/* Scrollable items / empty state */}
            {items.length === 0 ? (
              <EmptyCart onContinueShopping={() => handleNavigate("/shop")} />
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto px-6">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <CartDrawerItem key={item.id} item={item} />
                    ))}
                  </AnimatePresence>
                </ul>

                {/* Sticky footer */}
                <div className="shrink-0">
                  <CartSummary onNavigate={handleNavigate} />
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
