import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { Category } from "../../../../../types/category.types";

interface RowProps {
  category: Category;
  depth: number;
  selectedCategoryId?: number;
  onSelect: (id: number) => void;
}

function CategoryRow({
  category,
  depth,
  selectedCategoryId,
  onSelect,
}: RowProps) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = !!category.children && category.children.length > 0;
  const isSelected = category.id === selectedCategoryId;

  const handleClick = () => {
    if (hasChildren) {
      setExpanded((e) => !e);
    } else {
      onSelect(category.id);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        aria-expanded={hasChildren ? expanded : undefined}
        aria-pressed={!hasChildren ? isSelected : undefined}
        className="w-full flex items-center justify-between gap-2 py-2 text-left rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CFFF04] transition-colors hover:text-[#14151A]"
        style={{
          paddingLeft: depth * 14,
          fontSize: depth === 0 ? 14 : 13,
          fontWeight: depth === 0 ? 500 : 400,
          color: isSelected ? "#14151A" : depth === 0 ? "#14151A" : "#8B8681",
        }}
      >
        <span className={isSelected ? "font-semibold" : ""}>
          {category.name}
        </span>
        {hasChildren && (
          <motion.span
            animate={{ rotate: expanded ? 90 : 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="text-[#8B8681] shrink-0"
          >
            <ChevronRight size={14} />
          </motion.span>
        )}
      </button>

      {hasChildren && (
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <div className="pb-1">
                {category.children!.map((child) => (
                  <CategoryRow
                    key={child.id}
                    category={child}
                    depth={depth + 1}
                    selectedCategoryId={selectedCategoryId}
                    onSelect={onSelect}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

interface Props {
  categories: Category[];
  selectedCategoryId?: number;
  onSelect: (id: number) => void;
}

const CategoryAccordion = ({
  categories,
  selectedCategoryId,
  onSelect,
}: Props) => {
  return (
    <div role="tree" aria-label="Product categories" className="flex flex-col">
      {categories.map((category) => (
        <CategoryRow
          key={category.id}
          category={category}
          depth={0}
          selectedCategoryId={selectedCategoryId}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default CategoryAccordion;
