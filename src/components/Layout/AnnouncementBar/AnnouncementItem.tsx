import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { AnnouncementItemData } from "./announcementData";

interface Props {
  item: AnnouncementItemData;
  reduceMotion: boolean;
}

const AnnouncementItem = ({ item, reduceMotion }: Props) => {
  const { icon: Icon, message, actionLabel, actionHref } = item;
  const [hovered, setHovered] = React.useState(false);
  return (
    <motion.div
      className="flex items-center justify-center gap-2.5 sm:gap-3 px-4 text-center"
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -14 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.span
        className="shrink-0 text-[#CFFF04] flex items-center"
        animate={reduceMotion ? undefined : { y: [0, -2, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Icon size={15} strokeWidth={1.9} />
      </motion.span>

      <p className="text-xs sm:text-sm text-[#F5F3EE] truncate">{message}</p>

      {actionLabel && (
        <a
          href={actionHref ?? "#"}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
          className="relative shrink-0 inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#CFFF04] focus:outline-none"
        >
          {actionLabel}
          <motion.span
            animate={{ x: hovered ? 3 : 0 }}
            transition={{ duration: 0.2 }}
            className="inline-flex"
          >
            <ArrowRight size={12} />
          </motion.span>
          <motion.span
            className="absolute left-0 -bottom-0.5 h-px bg-[#CFFF04]"
            animate={{ width: hovered ? "100%" : "0%" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          />
        </a>
      )}
    </motion.div>
  );
};

export default AnnouncementItem;
