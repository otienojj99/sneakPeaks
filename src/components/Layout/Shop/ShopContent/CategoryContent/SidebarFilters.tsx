import React, { useMemo, useState } from "react";
import ActiveFilters from "./ActiveFilters";
import type { ActiveFilterChip } from "./ActiveFilters";
import CategoryAccordion from "./CategoryAccordion";
import ColorFilter from "./ColorFilter";
import SizeFilter from "./SizeFilter";
import PriceRangeFilter from "./PriceRangeFilter";
import type {
  Category,
  ColorOption,
  SizeOption,
  SidebarFilterChange,
} from "../../../../../types/category.types";

interface Props {
  categories: Category[];
  colors: ColorOption[];
  sizes: SizeOption[];
  priceBounds?: { min: number; max: number };
  currency?: string;
  /** Called whenever any filter changes, debounced-free — call site can debounce if wiring straight to an API. */
  onChange?: (filters: SidebarFilterChange) => void;
}

const SidebarFilters = ({
  categories,
  colors,
  sizes,
  priceBounds = { min: 0, max: 20000 },
  currency = "KSh",
  onChange,
}: Props) => {
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [color, setColor] = useState<string | undefined>(undefined);
  const [size, setSize] = useState<string | undefined>(undefined);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    priceBounds.min,
    priceBounds.max,
  ]);

  const emit = (next: Partial<SidebarFilterChange>) => {
    onChange?.({
      category_id: categoryId,
      color,
      size,
      price_min: priceRange[0],
      price_max: priceRange[1],
      ...next,
    });
  };

  const handleSelectCategory = (id: number) => {
    const next = id === categoryId ? undefined : id;
    setCategoryId(next);
    emit({ category_id: next });
  };

  const handleSelectColor = (id: string | undefined) => {
    setColor(id);
    emit({ color: id });
  };

  const handleSelectSize = (id: string | undefined) => {
    setSize(id);
    emit({ size: id });
  };

  const handlePriceChange = (min: number, max: number) => {
    setPriceRange([min, max]);
    emit({ price_min: min, price_max: max });
  };

  const priceIsDefault =
    priceRange[0] === priceBounds.min && priceRange[1] === priceBounds.max;

  const findCategoryName = (
    id: number,
    list: Category[],
  ): string | undefined => {
    for (const c of list) {
      if (c.id === id) return c.name;
      if (c.children) {
        const found = findCategoryName(id, c.children);
        if (found) return found;
      }
    }
    return undefined;
  };

  const chips: ActiveFilterChip[] = useMemo(() => {
    const result: ActiveFilterChip[] = [];

    if (categoryId !== undefined) {
      const name = findCategoryName(categoryId, categories) ?? "Category";
      result.push({
        key: "category",
        label: name,
        onRemove: () => handleSelectCategory(categoryId),
      });
    }
    if (color) {
      const label = colors.find((c) => c.id === color)?.label ?? color;
      result.push({
        key: "color",
        label,
        onRemove: () => handleSelectColor(undefined),
      });
    }
    if (size) {
      const label = sizes.find((s) => s.id === size)?.label ?? size;
      result.push({
        key: "size",
        label: `Size ${label}`,
        onRemove: () => handleSelectSize(undefined),
      });
    }
    if (!priceIsDefault) {
      result.push({
        key: "price",
        label: `${currency} ${priceRange[0].toLocaleString()}–${priceRange[1].toLocaleString()}`,
        onRemove: () => handlePriceChange(priceBounds.min, priceBounds.max),
      });
    }
    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    categoryId,
    color,
    size,
    priceRange,
    categories,
    colors,
    sizes,
    priceIsDefault,
  ]);

  const handleClearAll = () => {
    setCategoryId(undefined);
    setColor(undefined);
    setSize(undefined);
    setPriceRange([priceBounds.min, priceBounds.max]);
    onChange?.({
      category_id: undefined,
      color: undefined,
      size: undefined,
      price_min: priceBounds.min,
      price_max: priceBounds.max,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {chips.length > 0 && (
        <>
          <ActiveFilters chips={chips} onClearAll={handleClearAll} />
          <div className="border-t border-[#E4E0D8]" />
        </>
      )}

      <section>
        <h3 className="text-xs font-semibold tracking-wide uppercase text-[#8B8681] mb-3">
          Categories
        </h3>
        <CategoryAccordion
          categories={categories}
          selectedCategoryId={categoryId}
          onSelect={handleSelectCategory}
        />
      </section>

      <div className="border-t border-[#E4E0D8]" />

      <section>
        <h3 className="text-xs font-semibold tracking-wide uppercase text-[#8B8681] mb-3">
          Color
        </h3>
        <ColorFilter
          options={colors}
          selected={color}
          onSelect={handleSelectColor}
        />
      </section>

      <div className="border-t border-[#E4E0D8]" />

      <section>
        <h3 className="text-xs font-semibold tracking-wide uppercase text-[#8B8681] mb-3">
          Size
        </h3>
        <SizeFilter
          options={sizes}
          selected={size}
          onSelect={handleSelectSize}
        />
      </section>

      <div className="border-t border-[#E4E0D8]" />

      <section>
        <h3 className="text-xs font-semibold tracking-wide uppercase text-[#8B8681] mb-3">
          Price
        </h3>
        <PriceRangeFilter
          min={priceBounds.min}
          max={priceBounds.max}
          value={priceRange}
          onChange={handlePriceChange}
          currency={currency}
        />
      </section>
    </div>
  );
};

export default SidebarFilters;
