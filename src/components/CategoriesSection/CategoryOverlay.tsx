import React from "react";
import { motion } from "framer-motion";

interface CategoryOverlayProps {
  cname: string;
  subtitle: string;
  hovered: boolean;
}

const CategoryOverlay = ({
  cname,
  subtitle,
  hovered,
}: CategoryOverlayProps) => {
  return (
    <>
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(20,21,26,0.92) 0%, rgba(20,21,26,0.35) 55%, rgba(20,21,26,0) 100%)",
        }}
        animate={{ opacity: hovered ? 1 : 0.9 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-6 sm:p-8"
        animate={{ y: hovered ? -3 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <h3 className="font-display text-3xl sm:text-4xl text-[#F5F3EE]">
          {cname}
        </h3>
        <p className="mt-1 text-sm text-[#E4E0D8]">{subtitle}</p>
      </motion.div>
    </>
  );
};

export default CategoryOverlay;
