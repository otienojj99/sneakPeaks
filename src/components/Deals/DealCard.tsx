import React, { useState } from "react";
import { motion } from "framer-motion";
import { discountPercent } from "./dealsData";
import type { DealData } from "./dealsData";
import DealImage from "./DealImage";
import DealBadge from "./DealBadge";
import DealPrice from "./DealPrice";
import DealActions from "./DealActions";
import DealCountdown from "./DealCountdown";

interface Props {
  deal: DealData;
  index: number;
}

const DealCard = ({ deal, index }: Props) => {
  const [hovered, setHovered] = useState(false);
  const {
    name,
    brand,
    price,
    wasPrice,
    colors,
    accent,
    rotation,
    socialProof,
    featured,
    endsAt,
  } = deal;
  const percent = discountPercent(price, wasPrice);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
      role="group"
      aria-label={`${name} by ${brand}, now $${price}, was $${wasPrice}, ${percent}% off`}
      className={`relative rounded-[30px] border border-[#E4E0D8] p-6 flex flex-col outline-none ${
        featured ? "sm:col-span-2 sm:row-span-2" : ""
      }`}
      style={{
        background:
          "linear-gradient(160deg, rgba(255,255,255,0.9) 0%, rgba(245,243,238,0.7) 100%)",
      }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 18,
        delay: Math.min(index, 4) * 0.1,
      }}
      animate={{
        y: hovered ? -8 : 0,
        boxShadow: hovered
          ? "0 28px 55px -18px rgba(20,21,26,0.22)"
          : "0 10px 26px -14px rgba(20,21,26,0.1)",
      }}
    >
      <DealBadge percent={percent} hovered={hovered} />

      <div
        className={`flex items-center justify-center ${featured ? "h-56 sm:h-72" : "h-40"}`}
      >
        <DealImage accent={accent} rotation={rotation} hovered={hovered} />
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <p className="text-xs font-medium text-[#8B8681]">{brand}</p>
        <h3
          className={`font-display text-[#14151A] leading-tight ${featured ? "text-2xl sm:text-3xl" : "text-lg"}`}
        >
          {name}
        </h3>
        <DealPrice price={price} wasPrice={wasPrice} hovered={hovered} />

        <div className="flex items-center gap-3 flex-wrap">
          {socialProof && (
            <span className="rounded-full bg-[#14151A]/5 px-2.5 py-1 text-[10px] font-medium text-[#8B8681]">
              {socialProof}
            </span>
          )}
          {featured && endsAt && <DealCountdown endsAt={endsAt} />}
        </div>

        <div className="flex gap-1.5 pt-1">
          {colors.map((c) => (
            <span
              key={c}
              className="w-3 h-3 rounded-full border border-[#E4E0D8]"
              style={{ background: c }}
            />
          ))}
        </div>
      </div>

      <div className="mt-4">
        <DealActions revealed={hovered} />
      </div>
    </motion.div>
  );
};

export default DealCard;
