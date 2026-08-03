import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { CollectionData } from "./collectionData";
import CollectionBadge from "./CollectionBadge";
import CollectionCTA from "./CollectionCTA";

interface Props {
  collection: CollectionData;
}

const CollectionContent = ({ collection }: Props) => {
  return (
    <div className="relative z-10 flex flex-col gap-6 max-w-lg">
      <CollectionBadge name={collection.name} />

      <AnimatePresence mode="wait">
        <motion.h2
          key={`h-${collection.id}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display leading-[0.95] text-[#F5F3EE]"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
        >
          {collection.heading}
        </motion.h2>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.p
          key={`d-${collection.id}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-base text-[#8B8681] max-w-md"
        >
          {collection.description}
        </motion.p>
      </AnimatePresence>

      <CollectionCTA />
    </div>
  );
};

export default CollectionContent;
