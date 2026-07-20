import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Unit({ value, label }: { value: number; label: string }) {
  const [hovered, setHovered] = useState(false);
  const display = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        tabIndex={0}
        aria-label={`${value} ${label}`}
        className="relative w-14 sm:w-16 h-14 sm:h-16 rounded-2xl flex items-center justify-center overflow-hidden backdrop-blur-xl bg-white/[0.06] border border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CFFF04]"
        animate={{
          scale: hovered ? 1.06 : 1,
          boxShadow: hovered
            ? "0 0 24px rgba(207,255,4,0.25)"
            : "0 0 0 rgba(207,255,4,0)",
        }}
        transition={{ duration: 0.25 }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={display}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="font-display text-xl sm:text-2xl text-[#F5F3EE]"
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </motion.div>
      <span className="text-[10px] uppercase tracking-widest text-[#8B8681]">
        {label}
      </span>
    </div>
  );
}

const PromoCountdown = ({ targetDate }: Props) => {
  const [time, setTime] = useState<TimeLeft>(() => getTimeLeft(targetDate));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <div
      className="flex items-center gap-3 sm:gap-4"
      role="timer"
      aria-live="off"
    >
      <Unit value={time.days} label="Days" />
      <Unit value={time.hours} label="Hours" />
      <Unit value={time.minutes} label="Mins" />
      <Unit value={time.seconds} label="Secs" />
    </div>
  );
};

export default PromoCountdown;
