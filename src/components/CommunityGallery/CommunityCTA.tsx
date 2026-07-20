import React from "react";
import { motion } from "framer-motion";
import { Eye, ShoppingBag } from "lucide-react";

interface Props {
  revealed: boolean;
}

const CommunityCTA = ({ revealed }: Props) => {
  return (
    <motion.div
      className="flex items-center gap-2"
      animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <motion.button
        whileHover={{ y: -2, backgroundColor: "rgba(245,243,238,0.15)" }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-1.5 rounded-full border border-[#F5F3EE]/40 px-3.5 py-2 text-xs font-medium text-[#F5F3EE] backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5F3EE]"
      >
        <Eye size={13} />
        View Style
      </motion.button>

      <motion.button
        whileHover={{
          y: -2,
          scale: 1.03,
          boxShadow: "0 10px 22px rgba(207,255,4,0.4)",
        }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-1.5 rounded-full bg-[#CFFF04] px-3.5 py-2 text-xs font-semibold text-[#14151A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5F3EE] focus-visible:ring-offset-2 focus-visible:ring-offset-[#14151A]"
      >
        <ShoppingBag size={13} />
        Shop This Look
      </motion.button>
    </motion.div>
  );
};

export default CommunityCTA;
