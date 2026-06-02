import { useState } from "react";
import { FiPercent, FiCalendar, FiX, FiSave } from "react-icons/fi";

interface DiscountManagerProps {
  currentDiscount?: number;
  onAddDiscount: (
    percentage: number,
    startDate: string,
    endDate: string,
  ) => void;
  onRemoveDiscount: () => void;
  isUpdating: boolean;
}

export const DiscountManager = ({
  currentDiscount,
  onAddDiscount,
  onRemoveDiscount,
  isUpdating,
}: DiscountManagerProps) => {
  const [showForm, setShowForm] = useState(false);
  const [percentage, setPercentage] = useState(currentDiscount || 0);
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [endDate, setEndDate] = useState("");

  const handleSubmit = () => {
    onAddDiscount(percentage, startDate, endDate);
    setShowForm(false);
  };

  return (
    <div className="border rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <FiPercent className="text-emerald-500" size={18} />
          <h3 className="font-semibold text-gray-900">Discount</h3>
        </div>
        {currentDiscount ? (
          <div className="flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-lg text-sm font-medium">
              {currentDiscount}% OFF
            </span>
            <button
              onClick={onRemoveDiscount}
              disabled={isUpdating}
              className="text-red-500 hover:text-red-600 text-sm"
            >
              Remove
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowForm(true)}
            className="text-sm text-emerald-600 hover:text-emerald-700"
          >
            + Add Discount
          </button>
        )}
      </div>

      {showForm && !currentDiscount && (
        <div className="space-y-3 pt-2">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Discount %
            </label>
            <input
              type="number"
              value={percentage}
              onChange={(e) => setPercentage(Number(e.target.value))}
              min={0}
              max={100}
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              disabled={isUpdating || percentage <= 0}
              className="flex-1 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium"
            >
              <FiSave className="inline mr-1" size={14} /> Apply
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
