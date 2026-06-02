import { useState, useEffect } from "react";
import { FiX, FiSearch, FiAlertCircle } from "react-icons/fi";
import { scanService } from "../../../api/services/scanService";
import type {
  InventoryCountItem,
  InventoryCountItemCreateData,
} from "../../../types/inventory.types";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: InventoryCountItemCreateData) => Promise<void>;
  initialData?: InventoryCountItem | null;
  countId: number;
}

const InventoryCountItemFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  countId,
}: Props) => {
  const isEditing = !!initialData;
  const [productId, setProductId] = useState<number | "">("");
  const [productName, setProductName] = useState("");
  const [productSku, setProductSku] = useState("");
  const [systemQuantity, setSystemQuantity] = useState(0);
  const [countedQuantity, setCountedQuantity] = useState(0);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchBarcode, setSearchBarcode] = useState("");
  const [searchError, setSearchError] = useState("");

  useEffect(() => {
    if (initialData) {
      setProductId(initialData.product_item_id);
      setProductName(initialData.product?.name || "");
      setProductSku(initialData.product?.sku || "");
      setSystemQuantity(initialData.system_quantity);
      setCountedQuantity(initialData.counted_quantity);
      setNotes(initialData.notes || "");
    } else {
      setProductId("");
      setProductName("");
      setProductSku("");
      setSystemQuantity(0);
      setCountedQuantity(0);
      setNotes("");
    }

    setSearchBarcode("");
    setSearchError("");
  }, [initialData, isOpen]);

  const handleSearchByBarcode = async () => {
    if (!searchBarcode) return;
    setLoading(true);
    setSearchError("");

    try {
      const result = await scanService.lookupBarcode(searchBarcode);
      setProductId(result.product.id);
      setProductName(result.product.name);
      setProductSku(result.product.sku);
      setSystemQuantity(result.product.current_stock);
      setCountedQuantity(0);
    } catch (error) {
      setSearchError("Product not found");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId) return;

    await onSubmit({
      inventory_count_id: countId,
      product_item_id: Number(productId),
      system_quantity: systemQuantity,
      counted_quantity: countedQuantity,
      notes: notes || null,
      status: "pending",
    });
    setLoading(false);
    onClose();
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
            {isEditing ? "Edit Item" : "Add Item"}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center"
          >
            <FiX size={16} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Barcode Search */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Search by Barcode
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={searchBarcode}
                onChange={(e) => setSearchBarcode(e.target.value)}
                placeholder="Scan or type barcode"
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm"
              />
              <button
                type="button"
                onClick={handleSearchByBarcode}
                disabled={loading}
                className="px-4 py-3 bg-gray-100 rounded-xl text-sm font-medium hover:bg-gray-200"
              >
                <FiSearch size={18} />
              </button>
            </div>
            {searchError && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <FiAlertCircle size={12} />
                {searchError}
              </p>
            )}
          </div>

          {/* Product Info */}
          <div>
            <label className="block text-sm font-semibold mb-2">Product</label>
            <input
              type="text"
              value={productName}
              readOnly
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm"
              placeholder="Product will appear here"
            />
            {productSku && (
              <p className="text-xs text-gray-500 mt-1">SKU: {productSku}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">
                System Quantity
              </label>
              <input
                type="number"
                value={systemQuantity}
                onChange={(e) => setSystemQuantity(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Counted Quantity
              </label>
              <input
                type="number"
                value={countedQuantity}
                onChange={(e) => setCountedQuantity(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-gray-200"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Notes</label>
            <textarea
              rows={2}
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
              disabled={loading || !productId}
              className="px-6 py-2.5 text-sm font-semibold text-white bg-emerald-500 rounded-xl disabled:opacity-50"
            >
              {loading ? "Saving..." : isEditing ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryCountItemFormModal;
