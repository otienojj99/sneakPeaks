import React from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  hovered: boolean;
}

const TrustIcon = ({ icon: Icon, hovered }: Props) => {
  return (
    <motion.div
      className="w-14 h-14 rounded-full flex items-center justify-center"
      animate={{
        backgroundColor: hovered ? "#CFFF04" : "rgba(207,255,4,0.12)",
      }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        animate={{ rotate: hovered ? -12 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <Icon
          size={24}
          strokeWidth={1.75}
          color={hovered ? "#14151A" : "#14151A"}
        />
      </motion.div>
    </motion.div>
  );
};

export default TrustIcon;
