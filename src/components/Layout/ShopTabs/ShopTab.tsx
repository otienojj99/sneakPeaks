import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ShopTabIndicator from "./ShopTabIndicator";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface Props {
  label: string;
  active: boolean;
  onSelect: () => void;
}

const ShopTab = ({ label, active, onSelect }: Props) => {
  const [hovered, setHovered] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ripple: Ripple = {
      id: Date.now(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setRipples((r) => [...r, ripple]);
    setTimeout(
      () => setRipples((r) => r.filter((rp) => rp.id !== ripple.id)),
      500,
    );
    onSelect();
  };

  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="relative shrink-0 px-1 py-4 text-sm whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14151A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F3EE] rounded-sm overflow-hidden"
    >
      <motion.span
        className="relative z-10 inline-block"
        style={{
          fontWeight: active ? 600 : 400,
          color: active ? "#14151A" : hovered ? "#14151A" : "#8B8681",
        }}
        animate={{ y: !active && hovered ? -2 : 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {label}
      </motion.span>

      {active ? (
        <ShopTabIndicator />
      ) : (
        <motion.span
          className="absolute left-0 right-0 -bottom-1 h-[2px] rounded-full bg-[#14151A]/30"
          animate={{ width: hovered ? "100%" : "0%" }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          style={{ left: 0 }}
        />
      )}

      <AnimatePresence>
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: r.x,
              top: r.y,
              background: "rgba(207,255,4,0.35)",
              translateX: "-50%",
              translateY: "-50%",
            }}
            initial={{ width: 0, height: 0, opacity: 0.6 }}
            animate={{ width: 90, height: 90, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </button>
  );
};

export default ShopTab;
