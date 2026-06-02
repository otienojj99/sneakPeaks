// src/components/scan/ProductCard.tsx

import { FiPackage, FiArrowUp, FiArrowDown, FiCheck } from "react-icons/fi";
import type { Product, ScanAction } from "../../../types/scan.types";
import { getImageUrl } from "../../../utils/helpers";

interface ProductCardProps {
  product: Product;
  action: ScanAction;
  quantity: number;
  processing: boolean;
  onActionChange: (action: ScanAction) => void;
  onQuantityChange: (qty: number) => void;
  onSubmit: () => void;
}

export const ProductCard = ({
  product,
  action,
  quantity,
  processing,
  onActionChange,
  onQuantityChange,
  onSubmit,
}: ProductCardProps) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-start gap-4">
          {getImageUrl(product.image) ? (
            <img
              src={getImageUrl(product.image)}
              alt={product.name}
              className="w-20 h-20 rounded-xl object-cover bg-gray-100"
            />
          ) : (
            <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center">
              <FiPackage className="text-gray-400" size={28} />
            </div>
          )}
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-900">{product.name}</h2>
            <p className="text-sm text-gray-500 mt-1">SKU: {product.sku}</p>
            <div className="mt-2 flex items-center gap-3">
              <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded">
                Current Stock: {product.current_stock}
              </span>
              <span className="text-xs font-medium bg-emerald-50 text-emerald-700 px-2 py-1 rounded">
                KES {product.selling_price.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Quantity
            </label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) =>
                onQuantityChange(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Action
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onActionChange("check_in")}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  action === "check_in"
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <FiArrowUp className="inline mr-1" size={14} /> Check In
              </button>
              <button
                type="button"
                onClick={() => onActionChange("check_out")}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  action === "check_out"
                    ? "bg-amber-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <FiArrowDown className="inline mr-1" size={14} /> Check Out
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={onSubmit}
          disabled={processing}
          className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {processing ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <FiCheck size={18} />
          )}
          {processing
            ? "Processing..."
            : action === "check_in"
              ? `Check In +${quantity}`
              : `Check Out -${quantity}`}
        </button>
      </div>
    </div>
  );
};
