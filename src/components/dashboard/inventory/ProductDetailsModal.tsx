import { useState, useEffect } from "react";
import { FiX, FiSave, FiEdit2, FiTag, FiInfo } from "react-icons/fi";
import type { Product } from "../../../types/inventory.types";

interface ProductDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onUpdate: (data: Partial<Product>) => Promise<void>;
  isUpdating: boolean;
}

export const ProductDetailsModal = ({
  isOpen,
  onClose,
  product,
  onUpdate,
  isUpdating,
}: ProductDetailsModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sellingPrice, setSellingPrice] = useState(0);
  const [costPrice, setCostPrice] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setSellingPrice(product.selling_price);
      setCostPrice(product.cost_price);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleSave = async () => {
    await onUpdate({
      name,
      description,
      selling_price: sellingPrice,
      cost_price: costPrice,
    });
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Product Details</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100"
          >
            <FiX size={18} />
          </button>
        </div>

        <div className="p-5 space-y-4 overflow-y-auto max-h-[60vh]">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase">
              SKU
            </label>
            <p className="text-sm text-gray-900 mt-1">{product.sku}</p>
          </div>

          <div>
            <div className="flex justify-between items-center">
              <label className="block text-xs font-semibold text-gray-500 uppercase">
                Product Name
              </label>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-emerald-500 text-xs"
              >
                <FiEdit2 size={12} className="inline mr-1" /> Edit
              </button>
            </div>
            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-200 text-sm"
              />
            ) : (
              <p className="text-sm text-gray-900 mt-1">{product.name}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase">
              Description
            </label>
            {isEditing ? (
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-200 text-sm"
              />
            ) : (
              <p className="text-sm text-gray-600 mt-1">
                {product.description || "No description"}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase">
                Cost Price
              </label>
              {isEditing ? (
                <input
                  type="number"
                  value={costPrice}
                  onChange={(e) => setCostPrice(Number(e.target.value))}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-200 text-sm"
                />
              ) : (
                <p className="text-sm text-gray-900 mt-1">
                  KES {product.cost_price?.toLocaleString()}
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase">
                Selling Price
              </label>
              {isEditing ? (
                <input
                  type="number"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(Number(e.target.value))}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-200 text-sm"
                />
              ) : (
                <p className="text-sm text-gray-900 mt-1">
                  KES {product.selling_price?.toLocaleString()}
                </p>
              )}
            </div>
          </div>

          {product.attributes && Object.keys(product.attributes).length > 0 && (
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-2">
                Attributes
              </label>
              <div className="space-y-1">
                {Object.entries(product.attributes).map(([key, value]) => (
                  <div key={key} className="flex gap-2 text-sm">
                    <span className="font-medium text-gray-600 w-24">
                      {key}:
                    </span>
                    <span className="text-gray-800">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {isEditing && (
          <div className="flex gap-3 px-5 py-4 border-t border-gray-100 bg-gray-50">
            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isUpdating}
              className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2"
            >
              {isUpdating ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <FiSave size={14} />
              )}
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
