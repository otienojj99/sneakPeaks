import { useState } from "react";
import {
  FiArrowLeft,
  FiEdit2,
  FiTrash2,
  FiCheckCircle,
  FiEye,
  FiRefreshCw,
  FiPlus,
  FiAlertTriangle,
  FiX,
  FiSave,
} from "react-icons/fi";
import type {
  InventoryCount,
  InventoryCountItem,
} from "../../../types/inventory.types";

interface InventoryCountDetailProps {
  count: InventoryCount | null;
  items: InventoryCountItem[];
  isLoading: boolean;
  isUpdating: boolean;
  canEdit: boolean;
  onBack: () => void;
  onAddItem: () => void;
  onEditItem: (item: InventoryCountItem) => void;
  onDeleteItem: (id: number) => void;
  onMarkCounted: (itemId: number, countedQuantity: number) => void;
  onVerifyItem: (itemId: number) => void;
  onAdjustItem: (itemId: number) => void;
  onUpdateCount: (data: Partial<InventoryCount>) => void;
  onChangeStatus: (status: string) => void;
  onRefresh: () => void;
}

const statusColors: Record<string, string> = {
  draft: "bg-gray-100 text-gray-700",
  in_progress: "bg-blue-100 text-blue-700",
  completed: "bg-emerald-100 text-emerald-700",
  approved: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const itemStatusColors: Record<string, string> = {
  pending: "bg-gray-100 text-gray-600",
  counted: "bg-blue-100 text-blue-700",
  verified: "bg-emerald-100 text-emerald-700",
  adjusted: "bg-purple-100 text-purple-700",
};

const InventoryCountDetail = ({
  count,
  items,
  isLoading,
  isUpdating,
  canEdit,
  onBack,
  onAddItem,
  onEditItem,
  onDeleteItem,
  onMarkCounted,
  onVerifyItem,
  onAdjustItem,
  onUpdateCount,
  onChangeStatus,
  onRefresh,
}: InventoryCountDetailProps) => {
  console.log("InventoryCountDetail props:", {
    count,
    items,
    isLoading,
    isUpdating,
    canEdit,
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(
    null,
  );
  const [isEditingCount, setIsEditingCount] = useState(false);
  const [editNotes, setEditNotes] = useState(count?.notes || "");
  const [editCountDate, setEditCountDate] = useState(count?.count_date || "");

  if (isLoading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!count) {
    console.log('Count is null or undefined, showing "Count not found"');
    return <div className="p-8 text-center text-red-500">Count not found</div>;
  }

  const handleSaveCount = () => {
    onUpdateCount({
      notes: editNotes,
      count_date: editCountDate,
    });
    setIsEditingCount(false);
  };

  const handleMarkCounted = (itemId: number) => {
    const qty = prompt("Enter counted quantity:");
    if (qty && !isNaN(Number(qty))) {
      onMarkCounted(itemId, Number(qty));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50"
          >
            <FiArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {count.count_reference}
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              {count.warehouse?.name} • Created{" "}
              {new Date(count.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onRefresh}
            className="p-2.5 rounded-xl border border-gray-200 hover:bg-gray-50"
          >
            <FiRefreshCw
              size={16}
              className={isUpdating ? "animate-spin" : ""}
            />
          </button>
          {canEdit && count.status === "draft" && (
            <button
              onClick={() => onChangeStatus("in_progress")}
              className="px-4 py-2.5 bg-blue-500 text-white text-sm font-medium rounded-xl hover:bg-blue-600"
            >
              Start Counting
            </button>
          )}
          {canEdit && count.status === "completed" && (
            <button
              onClick={() => onChangeStatus("approved")}
              className="px-4 py-2.5 bg-green-500 text-white text-sm font-medium rounded-xl hover:bg-green-600"
            >
              Approve Count
            </button>
          )}
          {count.status === "approved" && (
            <button
              onClick={() => onChangeStatus("completed")}
              className="px-4 py-2.5 bg-purple-500 text-white text-sm font-medium rounded-xl hover:bg-purple-600"
            >
              Adjust Stock
            </button>
          )}
        </div>
      </div>

      {/* Count Info Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5">
        <div className="flex justify-between items-start">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[count.status]}`}
              >
                {count.status.replace("_", " ")}
              </span>
              <span className="text-sm text-gray-500">
                Count Date: {new Date(count.count_date).toLocaleDateString()}
              </span>
            </div>
            {isEditingCount ? (
              <div className="space-y-2">
                <input
                  type="date"
                  value={editCountDate}
                  onChange={(e) => setEditCountDate(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-gray-200 text-sm"
                />
                <textarea
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                  placeholder="Notes..."
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveCount}
                    className="px-3 py-1.5 bg-emerald-500 text-white text-sm rounded-lg flex items-center gap-1"
                  >
                    <FiSave size={14} /> Save
                  </button>
                  <button
                    onClick={() => setIsEditingCount(false)}
                    className="px-3 py-1.5 border rounded-lg text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {count.notes && (
                  <p className="text-sm text-gray-600 mt-2">📝 {count.notes}</p>
                )}
                {canEdit && count.status === "draft" && (
                  <button
                    onClick={() => setIsEditingCount(true)}
                    className="text-xs text-emerald-600 mt-2 flex items-center gap-1"
                  >
                    <FiEdit2 size={12} /> Edit
                  </button>
                )}
              </div>
            )}
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">{items.length}</p>
            <p className="text-xs text-gray-500">Total Items</p>
            <p className="text-sm text-red-500 mt-1">
              {items.filter((i) => i.difference !== 0).length} discrepancies
            </p>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="flex justify-between items-center px-5 py-4 border-b">
          <h2 className="text-lg font-semibold">Items</h2>
          {canEdit &&
            (count.status === "draft" || count.status === "in_progress") && (
              <button
                onClick={onAddItem}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 text-white text-sm rounded-lg"
              >
                <FiPlus size={14} /> Add Item
              </button>
            )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500">
                  Product
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500">
                  SKU
                </th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500">
                  System
                </th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500">
                  Counted
                </th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500">
                  Diff
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500">
                  Status
                </th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-500">
                    No items added yet
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/80">
                    <td className="py-3 px-4 text-sm font-medium">
                      {item.product?.name || "—"}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {item.product?.sku || "—"}
                    </td>
                    <td className="py-3 px-4 text-right text-sm">
                      {item.system_quantity}
                    </td>
                    <td className="py-3 px-4 text-right text-sm font-medium">
                      {item.counted_quantity}
                    </td>
                    <td
                      className={`py-3 px-4 text-right text-sm font-medium ${item.difference > 0 ? "text-green-600" : item.difference < 0 ? "text-red-600" : ""}`}
                    >
                      {item.difference > 0
                        ? `+${item.difference}`
                        : item.difference}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${itemStatusColors[item.status]}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {canEdit && item.status === "pending" && (
                          <>
                            <button
                              onClick={() => onEditItem(item)}
                              className="p-1.5 rounded hover:bg-gray-100"
                              title="Edit"
                            >
                              <FiEdit2 size={14} className="text-gray-500" />
                            </button>
                            <button
                              onClick={() => handleMarkCounted(item.id)}
                              className="p-1.5 rounded hover:bg-gray-100"
                              title="Mark Counted"
                            >
                              <FiCheckCircle
                                size={14}
                                className="text-emerald-500"
                              />
                            </button>
                          </>
                        )}
                        {canEdit && item.status === "counted" && (
                          <button
                            onClick={() => onVerifyItem(item.id)}
                            className="p-1.5 rounded hover:bg-gray-100"
                            title="Verify"
                          >
                            <FiEye size={14} className="text-blue-500" />
                          </button>
                        )}
                        {item.status === "verified" && (
                          <button
                            onClick={() => onAdjustItem(item.id)}
                            className="p-1.5 rounded hover:bg-gray-100"
                            title="Adjust Stock"
                          >
                            <FiRefreshCw
                              size={14}
                              className="text-purple-500"
                            />
                          </button>
                        )}
                        <button
                          onClick={() => setShowDeleteConfirm(item.id)}
                          className="p-1.5 rounded hover:bg-gray-100"
                          title="Delete"
                        >
                          <FiTrash2 size={14} className="text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Item Confirmation Modal */}
      {showDeleteConfirm !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setShowDeleteConfirm(null)}
          />
          <div className="relative bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                <FiAlertTriangle className="text-red-600" size={20} />
              </div>
              <h3 className="text-lg font-bold">Delete Item</h3>
            </div>
            <p className="text-sm text-gray-600">
              Are you sure you want to remove this item from the count?
            </p>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 border rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDeleteItem(showDeleteConfirm);
                  setShowDeleteConfirm(null);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-xl"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryCountDetail;
