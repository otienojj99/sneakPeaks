import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import CommunityCTA from "./CommunityCTA";

interface Props {
  customerName?: string;
  city?: string;
  productWorn: string;
  likes: number;
  hovered: boolean;
}

const CommunityOverlay = ({
  customerName,
  city,
  productWorn,
  likes,
  hovered,
}: Props) => {
  const [liked, setLiked] = useState(false);

  return (
    <>
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(20,21,26,0.85) 0%, rgba(20,21,26,0.2) 50%, rgba(20,21,26,0) 75%)",
        }}
        animate={{ opacity: hovered ? 1 : 0.85 }}
        transition={{ duration: 0.3 }}
      />

      <button
        aria-label={liked ? "Unlike this style" : "Like this style"}
        aria-pressed={liked}
        onClick={(e) => {
          e.stopPropagation();
          setLiked((l) => !l);
        }}
        className="absolute top-4 right-4 z-10 flex items-center gap-1.5 rounded-full bg-[#14151A]/40 backdrop-blur-md px-2.5 py-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5F3EE]"
      >
        <motion.span whileTap={{ scale: 1.3 }}>
          <Heart
            size={14}
            className={
              liked ? "fill-[#FF4526] text-[#FF4526]" : "text-[#F5F3EE]"
            }
          />
        </motion.span>
        <span className="text-[11px] font-medium text-[#F5F3EE]">
          {likes + (liked ? 1 : 0)}
        </span>
      </button>

      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 flex flex-col gap-3">
        <div>
          {(customerName || city) && (
            <p className="text-sm font-semibold text-[#F5F3EE]">
              {customerName}
              {city && (
                <span className="text-[#E4E0D8] font-normal"> · {city}</span>
              )}
            </p>
          )}
          <p className="text-xs text-[#E4E0D8]/80 mt-0.5">
            Wearing {productWorn}
          </p>
        </div>
        <CommunityCTA revealed={hovered} />
      </div>
    </>
  );
};

export default CommunityOverlay;
