import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ProductData } from "./productData";
import ProductCard from "./ProductCard";

interface Props {
  products: ProductData[];
  onQuickView: (product: ProductData) => void;
}

const ProductCarousel: React.FC<Props> = ({ products, onQuickView }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const [dragging, setDragging] = useState(false);

  const scrollByCards = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;

    const card = track.querySelector("[data-card]") as HTMLElement;
    const steps = card ? card.offsetWidth + 24 : 320;
    track.scrollBy({ left: direction * steps, behavior: "smooth" });
  };

  const onWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.currentTarget.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  };

  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (!isDown.current || !trackRef.current) return;
    trackRef.current.scrollLeft =
      scrollStart.current - (e.clientX - startX.current);
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
        className={`flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          dragging ? "cursor-grabbing select-none" : "cursor-grab"
        }`}
      >
        {products.map((p, i) => (
          <div key={p.id} data-card>
            <ProductCard product={p} index={i} onQuickView={onQuickView} />
          </div>
        ))}
      </div>

      <div className="hidden sm:flex items-center gap-3 mt-8 justify-center">
        <motion.button
          aria-label="Previous product"
          onClick={() => scrollByCards(-1)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="w-11 h-11 rounded-full border border-[#E4E0D8] flex items-center justify-center text-[#14151A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14151A]"
        >
          <ChevronLeft size={18} />
        </motion.button>
        <motion.button
          aria-label="Next product"
          onClick={() => scrollByCards(1)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="w-11 h-11 rounded-full border border-[#E4E0D8] flex items-center justify-center text-[#14151A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14151A]"
        >
          <ChevronRight size={18} />
        </motion.button>
      </div>
    </div>
  );
};

export default ProductCarousel;
