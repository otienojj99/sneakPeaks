import React, { useState } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import BoutiqueIcon from "./BoutiqueIcon";

interface ValueCardProps {
  variant?: "value";
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

interface StatementCardProps {
  variant: "statement";
  title: string;
  description: string;
  index: number;
}

type Props = ValueCardProps | StatementCardProps;

const BoutiqueCard = (props: Props) => {
  const [hovered, setHovered] = useState(false);
  const isStatement = props.variant === "statement";

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
      role="group"
      aria-label={props.title}
      className={`relative rounded-[30px] border border-[#E4E0D8] p-8 flex flex-col justify-center outline-none ${
        isStatement ? "sm:col-span-2 sm:row-span-2 bg-[#14151A]" : "bg-white/90"
      }`}
      initial={{ opacity: 0, y: 28, scale: isStatement ? 0.97 : 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        type: "spring",
        stiffness: isStatement ? 90 : 120,
        damping: 18,
        delay: isStatement ? 0 : 0.15 + props.index * 0.1,
      }}
      animate={{
        y: hovered ? -8 : 0,
        boxShadow: hovered
          ? "0 28px 55px -18px rgba(20,21,26,0.2)"
          : "0 10px 26px -14px rgba(20,21,26,0.08)",
      }}
    >
      {isStatement ? (
        <>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#CFFF04] mb-4">
            Our Philosophy
          </span>
          <motion.h3
            className="font-display text-[#F5F3EE] leading-tight"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)" }}
            animate={{ y: hovered ? -2 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {props.title}
          </motion.h3>
          <p className="mt-4 text-sm sm:text-base text-[#8B8681] max-w-md">
            {props.description}
          </p>
        </>
      ) : (
        <>
          <BoutiqueIcon icon={props.icon} hovered={hovered} />
          <motion.h3
            className="mt-5 text-lg font-semibold text-[#14151A]"
            animate={{ y: hovered ? -2 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {props.title}
          </motion.h3>
          <p className="mt-2 text-sm leading-relaxed text-[#8B8681]">
            {props.description}
          </p>
        </>
      )}
    </motion.div>
  );
};

export default BoutiqueCard;
