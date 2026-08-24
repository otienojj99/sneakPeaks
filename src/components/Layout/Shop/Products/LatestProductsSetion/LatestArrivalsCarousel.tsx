import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Product } from "../../../../../types/product.types";
import LatestArrivalCard from "./LatestArrivalCard";
import CarouselNavigation from "./CarouselNavigation";
import CarouselIndicators from "./CarouselIndicators";

interface Props {
  products: Product[];
  onAddToCart: (product: Product) => void;
  basePath?: string;
  autoplayMs?: number;
}

const GAP_PX = 24;

const LatestArrivalsCarousel = ({
  products,
  onAddToCart,
  basePath = "/shop",
  autoplayMs,
}: Props) => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [slideWidth, setSlideWidth] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const reduceMotion = useReducedMotion();

  const total = products.length;

  const measure = useCallback(() => {
    if (firstCardRef.current) {
      setSlideWidth(firstCardRef.current.offsetWidth + GAP_PX);
    }
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (firstCardRef.current) ro.observe(firstCardRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure, total]);

  const next = useCallback(() => setActive((i) => (i + 1) % total), [total]);
  const prev = useCallback(
    () => setActive((i) => (i - 1 + total) % total),
    [total],
  );

  useEffect(() => {
    if (paused || reduceMotion || total <= 1) return;
    const id = setInterval(next, autoplayMs);
    return () => clearInterval(id);
  }, [paused, reduceMotion, total, autoplayMs, next]);

  const onPointerDown: React.PointerEventHandler = (e) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    setPaused(true);
  };
  const onPointerMove: React.PointerEventHandler = (e) => {
    if (!isDragging.current) return;
    setDragOffset(e.clientX - dragStartX.current);
  };
  const endDrag = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const threshold = slideWidth * 0.2;
    if (dragOffset > threshold) prev();
    else if (dragOffset < -threshold) next();
    setDragOffset(0);
    setPaused(false);
  };

  if (total === 0) return null;

  const baseX = -(active * slideWidth) + dragOffset;

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        if (isDragging.current) endDrag();
      }}
    >
      <div className="relative overflow-hidden">
        <motion.div
          ref={trackRef}
          className="flex cursor-grab active:cursor-grabbing"
          style={{ gap: GAP_PX, touchAction: "pan-y" }}
          animate={{ x: baseX }}
          transition={
            isDragging.current
              ? { duration: 0 }
              : { type: "spring", stiffness: 300, damping: 32 }
          }
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          {products.map((product, i) => (
            <div
              key={product.id}
              ref={i === 0 ? firstCardRef : undefined}
              className="shrink-0 w-full sm:w-[62%] lg:w-1/2"
              style={{ minHeight: 460 }}
            >
              <LatestArrivalCard
                product={product}
                onAddToCart={onAddToCart}
                basePath={basePath}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {total > 1 && <CarouselNavigation onPrev={prev} onNext={next} />}
      {total > 1 && (
        <CarouselIndicators
          total={total}
          active={active}
          onSelect={setActive}
        />
      )}
    </div>
  );
};

export default LatestArrivalsCarousel;
