import React, { useState, useEffect } from "react";
import { FiX, FiAlertCircle } from "react-icons/fi";
import type {
  InventoryCount,
  InventoryCountCreateData,
} from "../../../types/inventory.types";

interface InventoryProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: InventoryCountCreateData) => Promise<void>;
  initialData?: InventoryCount | null;
  warehouses: { id: number; name: string }[];
}

const InventoryCountFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  warehouses,
}: InventoryProps) => {
  const isEditing = !!initialData;
  const [warehouseId, setWarehouseId] = useState<number | "">("");
  const [countDate, setCountDate] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ warehouse_id?: string }>({});

  useEffect(() => {
    if (initialData) {
      setWarehouseId(initialData.warehouse_id);
      setCountDate(initialData.count_date);
      setNotes(initialData.notes || "");
    } else {
      setWarehouseId("");
      setCountDate(new Date().toISOString().split("T")[0]);
      setNotes("");
    }
    setErrors({});
  }, [initialData, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!warehouseId) {
      setErrors({ warehouse_id: "Warehouse is required" });
      return;
    }
    setLoading(true);

    try {
      await onSubmit({
        warehouse_id: Number(warehouseId),
        count_date: countDate,
        notes: notes || null,
        status: "draft",
      });
    } catch (err) {
      // error handled in hook
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-bold">
            {isEditing ? "Edit Count" : "New Inventory Count"}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center"
          >
            <FiX size={16} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Warehouse <span className="text-red-500">*</span>
            </label>
            <select
              value={warehouseId}
              onChange={(e) =>
                setWarehouseId(e.target.value ? Number(e.target.value) : "")
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-200"
              required
            >
              <option value="">Select warehouse</option>
              {warehouses.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name}
                </option>
              ))}
            </select>
            {errors.warehouse_id && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <FiAlertCircle size={12} />
                {errors.warehouse_id}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">
              Count Date
            </label>
            <input
              type="date"
              value={countDate}
              onChange={(e) => setCountDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Notes</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 resize-none"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 text-sm font-semibold text-white bg-emerald-500 rounded-xl disabled:opacity-50"
            >
              {loading ? "Saving..." : isEditing ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryCountFormModal;
