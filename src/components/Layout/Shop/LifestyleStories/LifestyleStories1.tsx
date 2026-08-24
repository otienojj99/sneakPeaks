import React from "react";
import { motion } from "framer-motion";
import type { LifestyleStory } from "./lifestyleStories";
import StorySlider from "./StorySlider";

interface Props {
  stories: LifestyleStory[];
  autoplayMs?: number;
}

const LifestyleStories1 = ({ stories, autoplayMs }: Props) => {
  if (stories.length === 0) return null;

  return (
    <section className="w-full bg-white py-16 sm:py-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12"
        >
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-[#8B8681]">
            Live The Sneaker Culture
          </p>
          <h2
            className="font-display text-[#14151A] mt-3"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
          >
            More than footwear.
            <br />
            Every pair tells a story.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <StorySlider stories={stories} autoplayMs={autoplayMs} />
        </motion.div>
      </div>
    </section>
  );
};

export default LifestyleStories1;
