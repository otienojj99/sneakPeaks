import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "../../../../types/product.types";
import RelatedProductCard from "./RelatedProductCard";

interface Props {
  products: Product[];
  onAddToCart: (product: Product) => void;
  basePath?: string;
}

const RelatedProductsCarousel = ({
  products,
  onAddToCart,
  basePath,
}: Props) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const [dragging, setDragging] = useState(false);

  const scrollByCards = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("[data-card]") as HTMLElement | null;
    const step = card ? card.offsetWidth + 16 : 200;
    track.scrollBy({ left: dir * step * 2, behavior: "smooth" });
  };

  const onWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.currentTarget.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  };

  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    isDown.current = true;
    setDragging(true);
    startX.current = e.clientX;
    scrollStart.current = trackRef.current?.scrollLeft ?? 0;
  };
  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!isDown.current || !trackRef.current) return;
    trackRef.current.scrollLeft =
      scrollStart.current - (e.clientX - startX.current);
  };
  const endDrag = () => {
    isDown.current = false;
    setDragging(false);
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className={`flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          dragging ? "cursor-grabbing select-none" : "cursor-grab"
        }`}
      >
        {products.map((product) => (
          <RelatedProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            basePath={basePath}
          />
        ))}
      </div>

      <div className="hidden sm:flex items-center gap-3 mt-6 justify-center">
        <motion.button
          aria-label="Previous"
          onClick={() => scrollByCards(-1)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="w-9 h-9 rounded-full border border-[#E4E0D8] flex items-center justify-center text-[#14151A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14151A]"
        >
          <ChevronLeft size={16} />
        </motion.button>
        <motion.button
          aria-label="Next"
          onClick={() => scrollByCards(1)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="w-9 h-9 rounded-full border border-[#E4E0D8] flex items-center justify-center text-[#14151A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14151A]"
        >
          <ChevronRight size={16} />
        </motion.button>
      </div>
    </div>
  );
};

export default RelatedProductsCarousel;
