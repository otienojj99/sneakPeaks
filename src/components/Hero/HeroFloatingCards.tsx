import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Star } from "lucide-react";
import type { FloatingCard } from "./hero.types";
import type { FloatingCardData } from "./types";

const positionClasses: Record<FloatingCardData["position"], string> = {
  "top-left": "top-2 left-0 sm:-left-6",
  "top-right": "top-4 right-0 sm:-right-8",
  "bottom-left": "bottom-6 left-0 sm:-left-10",
  "bottom-right": "bottom-2 right-0 sm:-right-6",
};

interface Props {
  cards: FloatingCardData[];
}

const HeroFloatingCards = ({ cards }: Props) => {
  return (
    <>
      {cards.map((card, i) => (
        <motion.div
          key={card.position}
          className={`absolute z-20 ${positionClasses[card.position]} w-44 rounded-2xl p-3 backdrop-blur-xl bg-white/[0.06] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)]`}
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.7,
            delay: 1.6 + i * 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{ scale: 1.05, y: -4 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={card.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-1.5"
            >
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-medium text-[#F5F3EE] truncate pr-2">
                  {card.title}
                </p>
                <Heart size={13} className="text-[#F5F3EE]/60 shrink-0" />
              </div>

              <div className="flex items-center justify-between">
                {card.price > 0 ? (
                  <span className="text-sm font-semibold text-[#CFFF04]">
                    ${card.price}
                  </span>
                ) : (
                  <span className="text-[11px] font-semibold text-[#CFFF04] uppercase tracking-wide">
                    Included
                  </span>
                )}
                <span className="flex items-center gap-0.5 text-[11px] text-[#F5F3EE]/70">
                  <Star size={11} className="fill-[#CFFF04] text-[#CFFF04]" />
                  {card.rating}
                </span>
              </div>

              <div className="flex gap-1 pt-0.5">
                {card.colors.map((c) => (
                  <span
                    key={c}
                    className="w-3 h-3 rounded-full border border-white/20"
                    style={{ background: c }}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      ))}
    </>
  );
};

export default HeroFloatingCards;
