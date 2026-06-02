import React, { useState } from "react";
import ProductRating from "./ProductRating"; // from previous answer

// ---------- Variant Types ----------

interface ProductVariant {
  id: string;
  color: string;
  colorCode: string;
  size: string;
  price_adjustment: number;
  inStock: boolean;
  imageUrl: string[];
}
// ---------- Variant Swiper Component ----------

interface VariantSwiperProps {
  variants: ProductVariant[];
  selectedVariantId: string | null;
  onSelect: (variant: ProductVariant) => void;
  onVariantChange?: (variant: ProductVariant | null) => void;
}

const VariantSwiper: React.FC<VariantSwiperProps> = ({
  variants,
  selectedVariantId,
  onSelect,
  onVariantChange,
}) => {
  if (!variants || !Array.isArray(variants)) {
    console.warn('VariantSwiper: "variants" prop is missing or not an array.');
    return null;
  }
  const [startIndex, setStartIndex] = useState(0);
  const itemsPreview = 2;
  const maxStartIndex = Math.max(0, variants.length - itemsPreview);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(0, prev - itemsPreview));
  };

  const handleNext = () => {
    setStartIndex((prev) => Math.min(maxStartIndex, prev + itemsPreview));
  };

  const handleSelect = (variants: ProductVariant) => {
    onSelect(variants);
    onVariantChange && onVariantChange(variants);
  };

  const visibleVariants = variants.slice(startIndex, startIndex + itemsPreview);

  // print inStock status of each variant for debugging
  console.log("Variant stock status:");
  variants.forEach((variant) => {
    console.log(`Variant ID: ${variant.id}, In Stock: ${variant.inStock}`);
  });

  return (
    <div className="relative">
      {/* Carousel controls (only show if more than 2 variants) */}
      {variants.length > itemsPreview && (
        <div className="absolute -left-3 top-1/2 -translate-y-1/2 z-10">
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className="p-1 rounded-full bg-white shadow-md disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        </div>
      )}

      <div className="overflow-hidden">
        <div className="flex gap-4 transition-transform duration-300 justify-start pt-2">
          {visibleVariants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => variant.inStock && onSelect(variant)}
              disabled={!variant.inStock}
              className={`
          relative flex-shrink-0 w-full p-3 rounded-xl border-2 text-left
          transition-all duration-200 ease-out
          ${
            selectedVariantId === variant.id
              ? "border-neutral-800 shadow-lg"
              : "border-neutral-200 hover:border-neutral-400 hover:-translate-y-0.5 hover:shadow-md"
          }
          ${!variant.inStock ? "opacity-45 cursor-not-allowed" : "cursor-pointer"}
          ${!variant.inStock && "after:absolute after:inset-0 after:rounded-xl after:pointer-events-none after:bg-[repeating-linear-gradient(-45deg,transparent,transparent_8px,rgba(0,0,0,0.02)_8px,rgba(0,0,0,0.02)_9px)]"}
        `}
            >
              <div className="flex items-center gap-3">
                {/* Thumbnail (52x52) */}
                <div className="w-13 h-13 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
                  {variant.imageUrl && variant.imageUrl.length > 0 ? (
                    <img
                      src={variant.imageUrl[0]}
                      alt={variant.color}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full"
                      style={{ backgroundColor: variant.colorCode }}
                    />
                  )}
                </div>

                {/* Info block */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <div
                      className="w-2.5 h-2.5 rounded-full border border-white/30 shadow-sm"
                      style={{ backgroundColor: variant.colorCode }}
                    />
                    <span className="font-semibold text-sm text-neutral-900 truncate">
                      {variant.color}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-neutral-500 font-medium">
                      Size {variant.size}
                    </span>
                    <span className="text-neutral-300 text-[10px]">·</span>
                    <span
                      className={`
                  text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full
                  ${
                    variant.inStock
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-600"
                  }
                `}
                    >
                      {variant.inStock ? "In stock" : "Out of stock"}
                    </span>
                  </div>
                </div>

                {/* Price & checkmark */}
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  {selectedVariantId === variant.id && (
                    <div className="w-4.5 h-4.5 rounded-full bg-neutral-900 flex items-center justify-center">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path
                          d="M1 4L3.5 6.5L9 1"
                          stroke="white"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                  <span className="font-serif text-base font-semibold text-neutral-900">
                    Kes {variant.price_adjustment.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-neutral-400 font-medium -mt-1">
                    KES
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Carousel controls (only show if more than 2 variants) */}

      {variants.length > itemsPreview && (
        <div>
          <button
            onClick={handleNext}
            disabled={startIndex >= maxStartIndex}
            className="bg-white rounded-full shadow-md p-1 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default VariantSwiper;
