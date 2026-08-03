import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, useReducedMotion } from "framer-motion";
import { announcements } from "./announcementData";
import AnnouncementItem from "./AnnouncementItem";
import AnnouncementControls from "./AnnouncementControls";

const ROTATE_MS = 5500;

const AnnouncementSlider = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();

  const next = () => setIndex((i) => (i + 1) % announcements.length);
  const prev = () =>
    setIndex((i) => (i - 1 + announcements.length) % announcements.length);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, ROTATE_MS);
    return () => clearInterval(id);
  }, [paused]);

  const onTouchStart: React.TouchEventHandler = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd: React.TouchEventHandler = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      delta < 0 ? next() : prev();
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="relative flex items-center justify-center gap-4 w-full max-w-4xl mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="flex-1 min-w-0 relative h-full overflow-hidden"
        style={{ minHeight: 20 }}
      >
        <div role="status" aria-live="polite" className="sr-only">
          {announcements[index].message}
        </div>
        <AnimatePresence mode="wait">
          <AnnouncementItem
            key={announcements[index].id}
            item={announcements[index]}
            reduceMotion={!!reduceMotion}
          />
        </AnimatePresence>
      </div>

      <AnnouncementControls
        total={announcements.length}
        active={index}
        onPrev={prev}
        onNext={next}
        onSelect={setIndex}
      />
    </div>
  );
};

export default AnnouncementSlider;
