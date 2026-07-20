import React from "react";
import { motion } from "framer-motion";

interface Props {
  src: string;
  alt: string;
  hovered: boolean;
}

const CommunityImage = ({ src, alt, hovered }: Props) => {
  return (
    <motion.img
      src={src}
      alt={alt}
      loading="lazy"
      className="absolute inset-0 w-full h-full object-cover"
      initial={{ scale: 1.04 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      animate={{ scale: hovered ? 1.06 : 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    />
  );
};

export default CommunityImage;
