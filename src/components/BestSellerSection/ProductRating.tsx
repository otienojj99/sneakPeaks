import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Props {
  rating: number;
  reviewCount: number;
  hovered: boolean;
}

const ProductRating = ({ rating, reviewCount, hovered }: Props) => {
  return (
    <div
      className="flex items-center gap-2"
      aria-label={`Rated ${rating} out of 5 from ${reviewCount.toLocaleString()} reviews`}
    >
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.span
            key={i}
            animate={{
              filter:
                hovered && i < Math.round(rating)
                  ? "drop-shadow(0 0 4px rgba(207,255,4,0.7))"
                  : "drop-shadow(0 0 0 rgba(207,255,4,0))",
            }}
            transition={{ duration: 0.3 }}
          >
            <Star
              size={13}
              className={
                i < Math.round(rating)
                  ? "fill-[#CFFF04] text-[#CFFF04]"
                  : "fill-transparent text-[#E4E0D8]"
              }
            />
          </motion.span>
        ))}
      </div>
      <span className="text-xs text-[#8B8681]">
        ({reviewCount.toLocaleString()} Reviews)
      </span>
    </div>
  );
};

export default ProductRating;
