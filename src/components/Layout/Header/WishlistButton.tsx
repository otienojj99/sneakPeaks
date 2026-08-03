import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface Props {
  count?: number;
}

const WishlistButton = ({ count = 0 }: Props) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.button
      aria-label={`Wishlist${count > 0 ? `, ${count} items` : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      whileHover={{
        y: -2,
        backgroundColor: "#F5F3EE",
        boxShadow: "0 8px 20px rgba(20,21,26,0.1)",
      }}
      whileTap={{ scale: 0.95 }}
      className="relative w-10 h-10 rounded-full flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14151A] focus-visible:ring-offset-2"
    >
      <motion.span
        animate={{ scale: hovered ? 1.1 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <Heart
          size={18}
          strokeWidth={1.75}
          className={
            hovered ? "fill-[#FF4526]/20 text-[#14151A]" : "text-[#14151A]"
          }
        />
      </motion.span>

      {count > 0 && (
        <motion.span
          key={count}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-4 h-4 rounded-full text-[10px] font-bold"
          style={{ background: "#FF4526", color: "#F5F3EE" }}
        >
          {count > 9 ? "9+" : count}
        </motion.span>
      )}
    </motion.button>
  );
};

export default WishlistButton;
