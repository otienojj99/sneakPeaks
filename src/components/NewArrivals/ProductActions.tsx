import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";

interface Props {
  onQuickView: () => void;
  revealed: boolean;
}

const ProductActions: React.FC<Props> = ({ onQuickView, revealed }) => {
  const [saved, setSaved] = useState(false);

  return (
    <motion.div
      className="flex items-center gap-3"
      animate={{ y: revealed ? 0 : 8, opacity: revealed ? 1 : 0.9 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <motion.button
        onClick={onQuickView}
        aria-label="Quick add to bag"
        whileHover={{
          y: -3,
          scale: 1.02,
          boxShadow: "0 12px 28px rgba(207,255,4,0.4)",
        }}
        whileTap={{ scale: 0.98 }}
        className="flex-1 flex items-center justify-center gap-2 rounded-full bg-[#CFFF04] px-5 py-3 text-sm font-semibold text-[#14151A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14151A] focus-visible:ring-offset-2"
      >
        <ShoppingBag size={16} />
        Quick Add
      </motion.button>

      <motion.button
        aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
        aria-pressed={saved}
        onClick={() => setSaved((s) => !s)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-11 h-11 shrink-0 rounded-full border border-[#8B8681]/40 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14151A] focus-visible:ring-offset-2"
        style={{ background: saved ? "#FF4526" : "transparent" }}
      >
        <Heart
          size={16}
          className={saved ? "fill-[#F5F3EE] text-[#F5F3EE]" : "text-[#14151A]"}
        />
      </motion.button>
    </motion.div>
  );
};

export default ProductActions;
