import React from "react";
import { motion } from "framer-motion";
import CollectionBackground from "./CollectionBackground";
import CollectionDecorations from "./CollectionDecorations";
import CollectionImage from "./CollectionImage";
import CollectionContent from "./CollectionContent";
import CollectionStats from "./CollectionStats";
import { collections, defaultCollectionId } from "./collectionData";

interface Props {
  /** The active ShopTabs id — drives which collection's story is shown. */
  activeCollectionId?: string;
}

const CategoryCollectionBanner = ({
  activeCollectionId = defaultCollectionId,
}: Props) => {
  const collection =
    collections[activeCollectionId] ?? collections[defaultCollectionId];

  return (
    <section className="w-full py-10 sm:py-12 px-4 sm:px-6">
      <motion.div
        className="relative max-w-7xl mx-auto rounded-[32px] overflow-hidden lg:h-[520px]"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
      >
        <CollectionBackground />
        <CollectionDecorations word={collection.backgroundWord} />

        <div className="relative z-10 flex flex-col lg:grid lg:grid-cols-2 lg:h-full gap-8 lg:items-center p-6 sm:p-10 lg:p-16">
          {/* Mobile/tablet: photography first, own aspect ratio. Desktop: right column, fills height. */}
          <div className="relative order-1 lg:order-2 h-64 sm:h-80 lg:h-full">
            <CollectionImage
              collectionId={collection.id}
              src={collection.imageSrc}
              alt={collection.imageAlt}
            />
            <CollectionStats cards={collection.floatingCards} />
          </div>

          <div className="order-2 lg:order-1">
            <CollectionContent collection={collection} />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CategoryCollectionBanner;
