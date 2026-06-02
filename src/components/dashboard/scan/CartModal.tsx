import { FiX, FiCheckCircle } from "react-icons/fi";
import type { CartItem } from "../../../types/scan.types";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  totalAmount: number;
  onConfirm: () => void;
  onProcessPayment: () => Promise<void>;
  processing: boolean;
}

export const CartModal = ({
  isOpen,
  onClose,
  items,
  totalAmount,
  onConfirm,
  onProcessPayment,
  processing,
}: CartModalProps) => {
  if (!isOpen) return null;
  const checkoutItems = items.filter((item) => item.action === "check_out");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[80vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Checkout Summary</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {checkoutItems.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No items to checkout
            </p>
          ) : (
            checkoutItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center py-2 border-b border-gray-100"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-gray-500">x{item.quantity}</p>
                </div>
                <p className="text-sm font-semibold text-gray-900">
                  KES {item.totalPrice.toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Total */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <span className="text-base font-semibold text-gray-900">Total</span>
            <span className="text-xl font-bold text-emerald-600">
              KES {totalAmount.toLocaleString()}
            </span>
          </div>
          <button
            onClick={onProcessPayment}
            disabled={checkoutItems.length === 0 || processing}
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {processing ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <FiCheckCircle size={18} />
            )}
            {processing ? "Processing..." : "Confirm & Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
};
