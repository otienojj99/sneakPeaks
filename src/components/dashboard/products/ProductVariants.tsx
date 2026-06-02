import React, { useState, useEffect } from "react";
import type { ProductVariation } from "../../../types/product.types";
import Button from "../../common/Button";
import Input from "../../common/Input";
import ConfirmDialog from "../../common/ConfirmDialog";

interface ProductVariationsSectionProps {
  productId?: number; // undefined for new products (variations managed in-form)
  variations: ProductVariation[];
  onVariationsChange: (variations: ProductVariation[]) => void;
  sellingPrice: number;
}

interface VariationFormState {
  open: boolean;
  editIndex: number | null; // null = adding new
  data: Omit<ProductVariation, "id">;
}

const emptyVariation: Omit<ProductVariation, "id"> = {
  product_item_id: 0,
  name: "",
  sku: "",
  size: "",
  stock: 0,
  price_adjustment: 0,
  price: null,
  image_id: null,
  is_active: true,
};

const ProductVariationsSection: React.FC<ProductVariationsSectionProps> = ({
  productId,
  variations,
  onVariationsChange,
  sellingPrice,
}) => {
  const [localVariations, setLocalVariations] = useState<ProductVariation[]>(
    Array.isArray(variations) ? variations : [],
  );
  const [formState, setFormState] = useState<VariationFormState>({
    open: false,
    editIndex: null,
    data: { ...emptyVariation },
  });
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (Array.isArray(variations)) {
      setLocalVariations(variations);
    }
  }, [variations]);

  if (!Array.isArray(variations)) {
    console.error('VariantSwiper: "variants" prop is missing or not an array.');
  }

  const openAdd = () =>
    setFormState({
      open: true,
      editIndex: null,
      data: {
        ...emptyVariation,
        product_item_id: productId ?? 0,
      },
    });

  const openEdit = (index: number) => {
    const v = localVariations[index];
    setFormState({
      open: true,
      editIndex: index,
      data: {
        product_item_id: v.product_item_id,
        name: v.name,
        sku: v.sku,
        size: v.size,
        stock: v.stock,
        price_adjustment: v.price_adjustment,
        price: v.price,
        image_id: v.image_id,
        is_active: v.is_active,
      },
    });
  };

  const closeForm = () => {
    setFormState({ open: false, editIndex: null, data: { ...emptyVariation } });
    setFormErrors({});
  };

  const validateVariation = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formState.data.sku.trim()) errs.sku = "SKU is required";
    if (!formState.data.size.trim()) errs.size = "Size is required";
    if (formState.data.stock < 0) errs.stock = "Stock cannot be negative";

    // Check for duplicate SKU
    const isDuplicate = localVariations.some(
      (v, i) => v.sku === formState.data.sku && i !== formState.editIndex,
    );
    if (isDuplicate) errs.sku = "Duplicate SKU";

    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const saveVariation = () => {
    if (!validateVariation()) return;

    if (formState.editIndex !== null) {
      const updated = [...localVariations];
      updated[formState.editIndex] = {
        ...updated[formState.editIndex],
        ...formState.data,
      };
      setLocalVariations(updated);
      onVariationsChange(updated);
    } else {
      const added = [
        ...localVariations,
        {
          ...formState.data,
          product_item_id: productId ?? formState.data.product_item_id,
        },
      ];
      setLocalVariations(added);
      onVariationsChange(added);
    }
    closeForm();
  };

  const confirmDelete = () => {
    if (deleteIndex !== null) {
      const updated = localVariations.filter((_, i) => i !== deleteIndex);
      setLocalVariations(updated);
      onVariationsChange(updated);
      setDeleteIndex(null);
    }
  };

  const totalVariationStock = localVariations.reduce(
    (sum, v) => sum + v.stock,
    0,
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Variations</h2>
          <p className="text-sm text-gray-500">
            {localVariations.length} variation
            {localVariations.length !== 1 ? "s" : ""} · {totalVariationStock}{" "}
            total units
          </p>
        </div>
        <Button variant="secondary" size="sm" type="button" onClick={openAdd}>
          + Add Variation
        </Button>
      </div>

      {localVariations.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
          <p className="text-sm text-gray-500">No variations added yet</p>
          <Button
            variant="primary"
            size="sm"
            type="button"
            className="mt-3"
            onClick={openAdd}
          >
            Add First Variation
          </Button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-gray-600">
                  SKU
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-600">
                  Size
                </th>
                <th className="px-4 py-2 text-center font-medium text-gray-600">
                  Stock
                </th>
                <th className="px-4 py-2 text-right font-medium text-gray-600">
                  Price Adj.
                </th>
                <th className="px-4 py-2 text-right font-medium text-gray-600">
                  Final Price
                </th>
                <th className="px-4 py-2 text-right font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {localVariations.map((v, idx) => {
                const finalPrice = sellingPrice + v.price_adjustment;
                const lowStock = v.stock <= 2;
                const outOfStock = v.stock <= 0;

                return (
                  <tr
                    key={
                      v.id != null
                        ? `variant-${v.id}`
                        : `variant-${v.sku}-${idx}`
                    }
                    className="hover:bg-gray-50"
                  >
                    <td className="px-4 py-2">
                      <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">
                        {v.sku}
                      </code>
                    </td>
                    <td className="px-4 py-2 text-gray-700">{v.size}</td>
                    <td className="px-4 py-2 text-center">
                      <span
                        className={[
                          "inline-flex px-2 py-0.5 rounded-full text-xs font-medium",
                          outOfStock
                            ? "bg-red-100 text-red-800"
                            : lowStock
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800",
                        ].join(" ")}
                      >
                        {v.stock}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-right text-gray-600">
                      {v.price_adjustment !== 0 && (
                        <span
                          className={
                            v.price_adjustment > 0
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {v.price_adjustment > 0 ? "+" : ""}
                          {v.price_adjustment.toLocaleString()}
                        </span>
                      )}
                      {v.price_adjustment === 0 && (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-2 text-right font-medium text-gray-900">
                      KES {finalPrice.toLocaleString()}
                    </td>
                    <td className="px-4 py-2 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="xs"
                          type="button"
                          onClick={() => openEdit(idx)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="xs"
                          type="button"
                          className="text-red-600 hover:text-red-800"
                          onClick={() => setDeleteIndex(idx)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit inline form */}
      {formState.open && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
          <h3 className="text-sm font-semibold text-gray-700">
            {formState.editIndex !== null ? "Edit Variation" : "Add Variation"}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Input
              label="SKU"
              required
              value={formState.data.sku}
              error={formErrors.sku}
              onChange={(e) =>
                setFormState((s) => ({
                  ...s,
                  data: {
                    ...s.data,
                    sku: (e.target as HTMLInputElement).value,
                  },
                }))
              }
              placeholder="SNK-AJ1-RBK-7"
            />
            <Input
              label="Size"
              required
              value={formState.data.size}
              error={formErrors.size}
              onChange={(e) =>
                setFormState((s) => ({
                  ...s,
                  data: {
                    ...s.data,
                    size: (e.target as HTMLInputElement).value,
                  },
                }))
              }
              placeholder="US 7 / EU 40"
            />
            <Input
              label="Stock"
              type="number"
              value={formState.data.stock}
              error={formErrors.stock}
              onChange={(e) =>
                setFormState((s) => ({
                  ...s,
                  data: {
                    ...s.data,
                    stock: Number((e.target as HTMLInputElement).value),
                  },
                }))
              }
            />
            <Input
              label="Price Adjustment"
              type="number"
              value={formState.data.price_adjustment}
              onChange={(e) =>
                setFormState((s) => ({
                  ...s,
                  data: {
                    ...s.data,
                    price_adjustment: Number(
                      (e.target as HTMLInputElement).value,
                    ),
                  },
                }))
              }
              description={`Final: KES ${(sellingPrice + formState.data.price_adjustment).toLocaleString()}`}
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              size="sm"
              type="button"
              onClick={closeForm}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              type="button"
              onClick={saveVariation}
            >
              {formState.editIndex !== null ? "Update" : "Add"}
            </Button>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      <ConfirmDialog
        open={deleteIndex !== null}
        onClose={() => setDeleteIndex(null)}
        onConfirm={confirmDelete}
        title="Delete Variation"
        message={
          deleteIndex !== null
            ? `Delete variation "${localVariations[deleteIndex]?.sku}" (${localVariations[deleteIndex]?.size})?`
            : ""
        }
        confirmLabel="Delete"
        variant="danger"
      />
    </div>
  );
};

export default ProductVariationsSection;
