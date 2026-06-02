import { FiTrash2, FiMinus, FiPlus } from "react-icons/fi";
import type { CartItem } from "../../../types/scan.types";
import { getImageUrl } from "../../../utils/helpers";

interface ProductCartItemProps {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export const ProductCartItem = ({
  item,
  onUpdateQuantity,
  onRemove,
}: ProductCartItemProps) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200">
      {/* Product Image */}
      <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
        {getImageUrl(item.product.image) ? (
          <img
            src={getImageUrl(item.product.image)}
            alt={item.product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <svg
            className="w-6 h-6 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        )}
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              item.action === "check_in"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {item.action === "check_in" ? "Check In" : "Check Out"}
          </span>
        </div>
        <h4 className="text-sm font-semibold text-gray-900 mt-1 truncate">
          {item.product.name}
        </h4>
        <p className="text-xs text-gray-500">SKU: {item.product.sku}</p>
        <p className="text-xs font-medium text-emerald-600 mt-1">
          KES {item.unitPrice.toLocaleString()} / unit
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50"
        >
          <FiMinus size={14} />
        </button>
        <span className="w-10 text-center text-sm font-medium">
          {item.quantity}
        </span>
        <button
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50"
        >
          <FiPlus size={14} />
        </button>
      </div>

      {/* Total & Remove */}
      <div className="text-right min-w-[100px]">
        <p className="text-sm font-bold text-gray-900">
          KES {item.totalPrice.toLocaleString()}
        </p>
        <button
          onClick={() => onRemove(item.id)}
          className="text-red-500 hover:text-red-600 text-xs flex items-center gap-1 mt-1"
        >
          <FiTrash2 size={12} /> Remove
        </button>
      </div>
    </div>
  );
};
