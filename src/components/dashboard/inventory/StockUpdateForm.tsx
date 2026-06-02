import {
  FiPackage,
  FiCalendar,
  FiFileText,
  FiCheckCircle,
} from "react-icons/fi";

interface StockUpdateFormProps {
  quantity: number;
  batchNumber: string;
  expiryDate: string;
  notes: string;
  onQuantityChange: (qty: number) => void;
  onBatchNumberChange: (value: string) => void;
  onExpiryDateChange: (value: string) => void;
  onNotesChange: (value: string) => void;
  onSubmit: () => void;
  isUpdating: boolean;
}
export const StockUpdateForm = ({
  quantity,
  batchNumber,
  expiryDate,
  notes,
  onQuantityChange,
  onBatchNumberChange,
  onExpiryDateChange,
  onNotesChange,
  onSubmit,
  isUpdating,
}: StockUpdateFormProps) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Quantity to Check In <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50"
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) =>
              onQuantityChange(Math.max(1, parseInt(e.target.value) || 1))
            }
            className="w-24 text-center px-3 py-2 rounded-xl border border-gray-200 text-sm"
          />
          <button
            onClick={() => onQuantityChange(quantity + 1)}
            className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50"
          >
            +
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Batch Number
          </label>
          <input
            type="text"
            value={batchNumber}
            onChange={(e) => onBatchNumberChange(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
            placeholder="BATCH-001"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Expiry Date
          </label>
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => onExpiryDateChange(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Notes
        </label>
        <textarea
          rows={2}
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
          placeholder="Supplier name, PO number, etc."
        />
      </div>

      <button
        onClick={onSubmit}
        disabled={isUpdating}
        className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isUpdating ? (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <FiCheckCircle size={18} />
        )}
        {isUpdating ? "Processing..." : `Check In +${quantity}`}
      </button>
    </div>
  );
};
