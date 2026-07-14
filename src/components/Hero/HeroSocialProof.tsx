import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const avatarColors = ["#CFFF04", "#FF4526", "#8B8681", "#F5F3EE"];

const HeroSocialProof = () => {
  return (
    <motion.div
      className="flex items-center gap-3"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
    >
      <div className="flex -space-x-2">
        {avatarColors.map((c, i) => (
          <span
            key={i}
            className="w-7 h-7 rounded-full border-2 border-[#14151A]"
            style={{ background: c }}
          />
        ))}
      </div>
      <div>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={12} className="fill-[#CFFF04] text-[#CFFF04]" />
          ))}
        </div>
        <p className="text-xs text-[#8B8681] mt-0.5">
          Trusted by 50,000+ sneaker lovers
        </p>
      </div>
    </motion.div>
  );
};

export default HeroSocialProof;
