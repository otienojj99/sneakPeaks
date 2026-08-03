import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { CollectionFloatingCard } from "./collectionData";

interface Props {
  cards: CollectionFloatingCard[];
}

const CollectionStats = ({ cards }: Props) => {
  const reduceMotion = useReducedMotion();

  return (
    <>
      {cards.map((card, i) => (
        <motion.div
          key={card.id}
          className="absolute z-20 hidden sm:block rounded-full px-4 py-2 backdrop-blur-xl bg-white/[0.06] border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
          style={card.position}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: reduceMotion ? 0 : [0, -8, 0] }}
          transition={{
            opacity: { duration: 0.6, delay: 0.6 + card.delay },
            y: reduceMotion
              ? { duration: 0.5, delay: 0.6 + card.delay }
              : {
                  duration: 3.5 + i * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: card.delay,
                },
          }}
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-xs font-medium text-[#F5F3EE] whitespace-nowrap">
            {card.label}
          </span>
        </motion.div>
      ))}
    </>
  );
};

export default CollectionStats;
