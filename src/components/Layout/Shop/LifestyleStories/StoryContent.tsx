import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { LifestyleStory } from "./lifestyleStories";

interface Props {
  story: LifestyleStory;
}

const StoryContent = ({ story }: Props) => {
  return (
    <div className="absolute left-4 right-4 bottom-16 sm:left-8 sm:bottom-8 sm:right-auto sm:max-w-md z-10">
      <div
        className="rounded-[24px] p-6 sm:p-8 backdrop-blur-md text-center sm:text-left"
        style={{ background: "rgba(20,21,26,0.45)" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#CFFF04]">
              {story.title}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-[#F5F3EE] mt-2 leading-tight">
              {story.subtitle}
            </h2>
            <p className="text-sm text-[#E4E0D8]/90 mt-3 leading-relaxed">
              {story.description}
            </p>

            <motion.a
              href={story.ctaHref}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              whileHover={{
                y: -2,
                scale: 1.02,
                boxShadow: "0 12px 28px rgba(207,255,4,0.35)",
              }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-full bg-[#CFFF04] px-6 py-3 text-sm font-semibold text-[#14151A] mt-6 mx-auto sm:mx-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5F3EE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#14151A]"
            >
              {story.ctaLabel}
              <ArrowRight size={15} />
            </motion.a>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StoryContent;
