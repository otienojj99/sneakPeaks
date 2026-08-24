import React, { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "../../../../../types/product.types";
import DiscountProductCard from "./DiscountProductCard";

interface Props {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  basePath?: string;
}

const HERO_W = 300;
const HERO_H = 420;
const SPACING = 230; // distance between each slot's center, in px
const RENDER_WINDOW = 2; // render offsets -2..2; anything further stays unmounted

function circularOffset(index: number, active: number, total: number): number {
  let diff = index - active;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

const DiscountProductCarousel = ({
  products,
  onAddToCart,
  onQuickView,
  basePath,
}: Props) => {
  const onSaleProducts = useMemo(
    () => products.filter((p) => p.is_on_sale),
    [products],
  );
  const [active, setActive] = useState(0);
  const total = onSaleProducts.length;

  const mobileTrackRef = useRef<HTMLDivElement>(null);

  if (total === 0) return null;

  const next = () => setActive((i) => (i + 1) % total);
  const prev = () => setActive((i) => (i - 1 + total) % total);

  return (
    <div>
      {/* ============ Desktop / tablet: 3-slot featured coverflow ============ */}
      <div
        className="hidden md:flex relative items-center justify-center overflow-hidden"
        style={{ height: HERO_H + 24 }}
        role="region"
        aria-roledescription="carousel"
        aria-label="Featured deals"
      >
        {onSaleProducts.map((product, i) => {
          const offset = circularOffset(i, active, total);
          const absOffset = Math.abs(offset);
          if (absOffset > RENDER_WINDOW) return null;

          const isHero = offset === 0;
          const scale = isHero ? 1 : absOffset === 1 ? 0.78 : 0.6;
          const opacity = isHero ? 1 : absOffset === 1 ? 0.55 : 0;
          const zIndex = 10 - absOffset;

          return (
            <motion.div
              key={product.id}
              className="absolute"
              style={{
                width: HERO_W,
                height: HERO_H,
                pointerEvents:
                  absOffset === 0 || absOffset === 1 ? "auto" : "none",
              }}
              animate={{ x: offset * SPACING, scale, opacity, zIndex }}
              transition={{ type: "spring", stiffness: 260, damping: 30 }}
              aria-hidden={!isHero}
            >
              <DiscountProductCard
                product={product}
                variant={isHero ? "hero" : "side"}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
                onFocus={() => setActive(i)}
                basePath={basePath}
              />
            </motion.div>
          );
        })}
      </div>

      {/* ============ Desktop / tablet controls ============ */}
      <div className="hidden md:flex items-center justify-center gap-4 mt-2">
        <button
          onClick={prev}
          aria-label="Previous deal"
          className="w-9 h-9 rounded-full border border-[#E4E0D8] bg-white flex items-center justify-center text-[#14151A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14151A]"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="flex items-center gap-1.5">
          {onSaleProducts.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to deal ${i + 1}`}
              aria-current={i === active}
              className="p-1.5 focus:outline-none"
            >
              <motion.span
                className="block h-[3px] rounded-full bg-[#CFFF04]"
                animate={{
                  width: i === active ? 22 : 6,
                  opacity: i === active ? 1 : 0.3,
                }}
                transition={{ duration: 0.3 }}
              />
            </button>
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next deal"
          className="w-9 h-9 rounded-full border border-[#E4E0D8] bg-white flex items-center justify-center text-[#14151A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14151A]"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* ============ Mobile: single hero card, swipeable, edge peek ============ */}
      <div
        ref={mobileTrackRef}
        className="flex md:hidden gap-4 overflow-x-auto snap-x snap-mandatory pb-2 px-[8vw] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {onSaleProducts.map((product) => (
          <div
            key={product.id}
            data-card
            className="shrink-0 snap-center w-[84vw]"
            style={{ height: HERO_H }}
          >
            <DiscountProductCard
              product={product}
              variant="hero"
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              basePath={basePath}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscountProductCarousel;
