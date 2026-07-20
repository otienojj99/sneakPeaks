import React from "react";
import { Star } from "lucide-react";

interface Props {
  rating?: number;
  reviewCount?: number;
}

const ProductRating: React.FC<Props> = ({ rating, reviewCount }) => {
  return (
    <div
      className="flex items-center gap-2"
      aria-label={`Rated ${rating} out of 5 from ${reviewCount} reviews`}
    >
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={13}
            className={
              i < Math.round(rating || 0)
                ? "fill-[#CFFF04] text-[#CFFF04]"
                : "fill-transparent text-[#E4E0D8]"
            }
          />
        ))}
      </div>
      <span className="text-xs text-[#8B8681]">({reviewCount})</span>
    </div>
  );
};

export default ProductRating;
