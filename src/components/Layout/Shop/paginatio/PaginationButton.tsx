import React from "react";
import { motion } from "framer-motion";

interface PaginationButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  className?: string;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
  children,
  onClick,
  active = false,
  disabled = false,
  className = "",
}) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { y: -2, scale: 1.03 } : {}}
      whileTap={!disabled ? { scale: 0.96 } : {}}
      transition={{ duration: 0.18 }}
      className={`
        min-w-[44px]
        h-11
        px-4
        rounded-full
        border
        flex
        items-center
        justify-center
        text-sm
        font-semibold
        transition-all
        duration-200
        select-none

        ${
          active
            ? "bg-[#CFFF04] border-[#CFFF04] text-[#14151A] shadow-md"
            : "bg-[#F5F3EE] border-[#E4E0D8] text-[#14151A] hover:border-[#CFFF04] hover:shadow-md"
        }

        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}

        ${className}
      `}
    >
      {children}
    </motion.button>
  );
};

export default PaginationButton;
