import React from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  hovered: boolean;
}

const BoutiqueIcon = ({ icon: Icon, hovered }: Props) => {
  return (
    <motion.div
      className="w-12 h-12 rounded-full flex items-center justify-center"
      style={{ background: "rgba(207,255,4,0.12)" }}
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.div
        animate={{ scale: hovered ? 1.15 : 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <Icon size={20} strokeWidth={1.6} color="#14151A" />
      </motion.div>
    </motion.div>
  );
};

export default BoutiqueIcon;
