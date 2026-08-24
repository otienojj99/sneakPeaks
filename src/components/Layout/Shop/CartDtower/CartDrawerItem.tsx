import React from "react";
import { motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import { useCartStore } from "../../Shop/store/cart/cartStore";
import type { CartItem } from "../../Shop/store/cart/cartTypes";
import { formatPrice } from "../Products/productHelpers";

interface Props {
  item: CartItem;
}

const CartDrawerItem = ({ item }: Props) => {
  const increaseQuantity = useCartStore((s) => s.increaseQuantity);
  const decreaseQuantity = useCartStore((s) => s.decreaseQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  const { product } = item;
  const imageUrl =
    product.featured_image?.medium_url ??
    product.featured_image?.image_url ??
    product.gallery_images?.[0]?.medium_url ??
    product.gallery_images?.[0]?.image_url;

  const lineTotal = item.unitPrice * item.quantity;

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{
        opacity: 0,
        x: 24,
        height: 0,
        marginBottom: 0,
        paddingTop: 0,
        paddingBottom: 0,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex gap-4 py-5 border-b border-[#E4E0D8] overflow-hidden"
    >
      <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-[#F5F3EE]">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${product.brand?.name ?? ""} ${product.name}`.trim()}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full" aria-hidden="true" />
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            {product.brand && (
              <p className="text-[11px] text-[#8B8681] truncate">
                {product.brand.name}
              </p>
            )}
            <h4 className="text-sm font-semibold text-[#14151A] truncate">
              {product.name}
            </h4>
            {(item.size || item.color) && (
              <p className="text-xs text-[#8B8681] mt-0.5">
                {item.size && <>Size: {item.size}</>}
                {item.size && item.color && " · "}
                {item.color && <>Color: {item.color}</>}
              </p>
            )}
          </div>

          <button
            onClick={() => removeItem(item.id)}
            aria-label={`Remove ${product.name} from cart`}
            className="shrink-0 text-[#8B8681] hover:text-[#FF4526] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14151A] rounded-full p-1"
          >
            <X size={15} />
          </button>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center rounded-full border border-[#E4E0D8]">
            <button
              onClick={() => decreaseQuantity(item.id)}
              disabled={item.quantity <= 1}
              aria-label={`Decrease quantity of ${product.name}`}
              className="w-7 h-7 flex items-center justify-center text-[#14151A] disabled:opacity-30 disabled:cursor-not-allowed focus:outline-none"
            >
              <Minus size={12} />
            </button>
            <span
              className="w-7 text-center text-sm font-medium text-[#14151A]"
              aria-live="polite"
            >
              {item.quantity}
            </span>
            <button
              onClick={() => increaseQuantity(item.id)}
              aria-label={`Increase quantity of ${product.name}`}
              className="w-7 h-7 flex items-center justify-center text-[#14151A] focus:outline-none"
            >
              <Plus size={12} />
            </button>
          </div>

          <div className="text-right">
            <p className="text-sm font-bold text-[#14151A]">
              {formatPrice(lineTotal)}
            </p>
            {item.quantity > 1 && (
              <p className="text-[11px] text-[#8B8681]">
                {formatPrice(item.unitPrice)} each
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.li>
  );
};

export default CartDrawerItem;
