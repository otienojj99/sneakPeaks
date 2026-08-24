import React, { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { LifestyleStory } from "./lifestyleStories";
import StoryCard from "./StoryCard";
import StoryContent from "./StoryContent";
import StoryNavigation from "./StoryNavigation";
import StoryIndicators from "./StoryIndicators";

interface Props {
  stories: LifestyleStory[];
  autoplayMs?: number;
}

const StorySlider = ({ stories, autoplayMs = 7000 }: Props) => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const total = stories.length;

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
  const onPointerUp: React.PointerEventHandler = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const delta = e.clientX - dragStartX.current;
    if (delta > 60) prev();
    else if (delta < -60) next();
    setPaused(false);
  };

  if (total === 0) return null;
  const story = stories[active];

  return (
    <div
      className="relative w-full h-[520px] sm:h-[600px] lg:h-[680px] select-none touch-pan-y"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      role="region"
      aria-roledescription="carousel"
      aria-label="Lifestyle stories"
    >
      <StoryCard story={story} />
      <StoryContent story={story} />
      {total > 1 && <StoryNavigation onPrev={prev} onNext={next} />}
      {total > 1 && (
        <StoryIndicators total={total} active={active} onSelect={setActive} />
      )}
    </div>
  );
};

export default StorySlider;
