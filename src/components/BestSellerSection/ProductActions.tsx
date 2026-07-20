import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Eye } from "lucide-react";

interface Props {
  revealed: boolean;
  onQuickView: () => void;
}

const ProductActions = ({ revealed, onQuickView }: Props) => {
  const [saved, setSaved] = useState(false);
  return (
    <motion.div
      className="flex items-center gap-2"
      animate={{ y: revealed ? 0 : 10, opacity: revealed ? 1 : 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <motion.button
        aria-label="Quick add to bag"
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex-1 flex items-center justify-center gap-2 rounded-full bg-[#CFFF04] px-4 py-2.5 text-xs font-semibold text-[#14151A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14151A] focus-visible:ring-offset-2"
      >
        <ShoppingBag size={14} />
        Quick Add
      </motion.button>

      <motion.button
        aria-label="Quick view"
        onClick={onQuickView}
        whileHover={{ y: -2, scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-9 h-9 shrink-0 rounded-full border border-[#8B8681]/40 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14151A] focus-visible:ring-offset-2"
      >
        <Eye size={14} className="text-[#14151A]" />
      </motion.button>

      <motion.button
        aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
        aria-pressed={saved}
        onClick={() => setSaved((s) => !s)}
        whileHover={{ y: -2, scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-9 h-9 shrink-0 rounded-full border border-[#8B8681]/40 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14151A] focus-visible:ring-offset-2"
        style={{ background: saved ? "#FF4526" : "transparent" }}
      >
        <Heart
          size={14}
          className={saved ? "fill-[#F5F3EE] text-[#F5F3EE]" : "text-[#14151A]"}
        />
      </motion.button>
    </motion.div>
  );
};

export default ProductActions;
