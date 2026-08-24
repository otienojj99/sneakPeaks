import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { LifestyleStory } from "./lifestyleStories";

interface Props {
  story: LifestyleStory;
}
const StoryCard = ({ story }: Props) => {
  return (
    <div className="absolute inset-0 rounded-[32px] sm:rounded-[40px] overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.img
          key={story.id}
          src={story.image}
          alt={story.imageAlt}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1.12 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
            scale: { duration: 8, ease: "linear" },
          }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-[#14151A]/80 via-[#14151A]/20 to-transparent" />
    </div>
  );
};

export default StoryCard;
