import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type {
  Product,
  ProductFilters,
  ToggleableFlag,
  BulkAction,
  PaginationMeta,
} from "../../../types/product.types";

import Button from "../../common/Button";
import Input from "../../common/Input";
import Select from "../../common/Select";
import Toggle from "../../common/Toggle";

// ─── Props ──────────────────────────────────────────────────────

interface ProductListProps {
  products: Product[];
  isLoading: boolean;
  filters: ProductFilters;
  meta: PaginationMeta | null;

  // Filter / pagination
  onUpdateFilters: <K extends keyof ProductFilters>(
    key: K,
    value: ProductFilters[K],
  ) => void;
  onResetFilters: () => void;
  onGoToPage: (page: number) => void;
  onRefresh: () => void;

  // Selection
  selectedIds: Set<number>;
  onToggleSelected: (id: number) => void;
  onToggleSelectAll: () => void;
  onClearSelection: () => void;
  isAllSelected: boolean;

  // Actions (delegated to parent page)
  onView: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onToggleFlag: (product: Product, flag: ToggleableFlag) => void;
  onBulkAction: (action: BulkAction) => void;
  bulkLoading: boolean;

  // Lookups
  categories: { value: number; label: string }[];
  brands: { value: number; label: string }[];
}

// ─── Filter Bar (internal) ──────────────────────────────────────

const FilterBar: React.FC<{
  filters: ProductFilters;
  onUpdateFilters: ProductListProps["onUpdateFilters"];
  onResetFilters: () => void;
  categories: { value: number; label: string }[];
  brands: { value: number; label: string }[];
}> = ({ filters, onUpdateFilters, onResetFilters, categories, brands }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="space-y-4">
      {/* Search row */}
      <div className="flex gap-3">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search by name, SKU, or barcode…"
            value={filters.search ?? ""}
            onChange={(e) =>
              onUpdateFilters(
                "search",
                (e.target as HTMLInputElement).value || undefined,
              )
            }
          />
        </div>
        <Button
          variant="secondary"
          onClick={() => setExpanded((v) => !v)}
          icon={
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
              />
            </svg>
          }
        >
          Filters
        </Button>
      </div>

      {/* Expandable filters */}
      {expanded && (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <Select
            label="Category"
            placeholder="All categories"
            options={categories}
            value={filters.category_id ?? ""}
            onChange={(e) =>
              onUpdateFilters(
                "category_id",
                e.target.value ? Number(e.target.value) : null,
              )
            }
          />
          <Select
            label="Brand"
            placeholder="All brands"
            options={brands}
            value={filters.brand_id ?? ""}
            onChange={(e) =>
              onUpdateFilters(
                "brand_id",
                e.target.value ? Number(e.target.value) : null,
              )
            }
          />
          <Select
            label="Status"
            placeholder="Any status"
            options={[
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
              { value: "featured", label: "Featured" },
              { value: "on_sale", label: "On Sale" },
              { value: "low_stock", label: "Low Stock" },
              { value: "out_of_stock", label: "Out of Stock" },
            ]}
            value=""
            onChange={(e) => {
              const v = e.target.value;
              onUpdateFilters(
                "is_active",
                v === "active" ? true : v === "inactive" ? false : null,
              );
              onUpdateFilters("is_featured", v === "featured" ? true : null);
              onUpdateFilters("is_on_sale", v === "on_sale" ? true : null);
              onUpdateFilters(
                "stock_status",
                v === "low_stock" || v === "out_of_stock" ? v : null,
              );
            }}
          />
          <Input
            type="number"
            label="Min Price"
            placeholder="0"
            value={filters.price_min ?? ""}
            onChange={(e) =>
              onUpdateFilters(
                "price_min",
                (e.target as HTMLInputElement).value
                  ? Number((e.target as HTMLInputElement).value)
                  : null,
              )
            }
          />
          <Input
            type="number"
            label="Max Price"
            placeholder="∞"
            value={filters.price_max ?? ""}
            onChange={(e) =>
              onUpdateFilters(
                "price_max",
                (e.target as HTMLInputElement).value
                  ? Number((e.target as HTMLInputElement).value)
                  : null,
              )
            }
          />
          <div className="flex items-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={onResetFilters}
              fullWidth
            >
              Clear filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Bulk Action Bar (internal) ─────────────────────────────────

const BulkActionBar: React.FC<{
  count: number;
  onAction: (action: BulkAction) => void;
  onClear: () => void;
  loading: boolean;
}> = ({ count, onAction, onClear, loading }) => {
  if (count === 0) return null;

  return (
    <div className="flex items-center gap-3 bg-indigo-50 border border-indigo-200 rounded-lg px-4 py-3">
      <span className="text-sm font-medium text-indigo-800">
        {count} selected
      </span>
      <div className="flex gap-2 ml-auto flex-wrap">
        <Button
          variant="secondary"
          size="xs"
          disabled={loading}
          onClick={() => onAction({ action: "activate" })}
        >
          Activate
        </Button>
        <Button
          variant="secondary"
          size="xs"
          disabled={loading}
          onClick={() => onAction({ action: "deactivate" })}
        >
          Deactivate
        </Button>
        <Button
          variant="secondary"
          size="xs"
          disabled={loading}
          onClick={() => onAction({ action: "set_featured", value: true })}
        >
          ★ Featured
        </Button>
        <Button
          variant="secondary"
          size="xs"
          disabled={loading}
          onClick={() => onAction({ action: "set_on_sale", value: true })}
        >
          🏷 On Sale
        </Button>
        <Button
          variant="danger"
          size="xs"
          disabled={loading}
          onClick={() => onAction({ action: "delete" })}
        >
          Delete
        </Button>
        <Button variant="ghost" size="xs" onClick={onClear}>
          ✕
        </Button>
      </div>
    </div>
  );
};

// ─── Row Actions Dropdown (internal) ────────────────────────────

const RowActionsMenu: React.FC<{
  product: Product;
  onView: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  onToggle: (flag: ToggleableFlag) => void;
}> = ({ product, onView, onEdit, onDelete, onToggle }) => {
  const [open, setOpen] = useState(false);

  const handleAction = (action: () => void) => {
    action();
    setOpen(false);
  };

  return (
    <div className="relative">
      <Button variant="icon" size="sm" onClick={() => setOpen((v) => !v)}>
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
          />
        </svg>
      </Button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-20 mt-1 w-48 rounded-lg bg-white shadow-lg ring-1 ring-black/5 py-1">
            <DropdownItem onClick={() => handleAction(() => onView(product))}>
              👁 View
            </DropdownItem>
            <DropdownItem onClick={() => handleAction(() => onEdit(product))}>
              ✏️ Edit
            </DropdownItem>
            <hr className="my-1 border-gray-100" />
            <DropdownItem
              onClick={() => handleAction(() => onToggle("is_featured"))}
            >
              {product.is_featured ? "☆ Unfeature" : "★ Feature"}
            </DropdownItem>
            <DropdownItem
              onClick={() => handleAction(() => onToggle("is_on_sale"))}
            >
              {product.is_on_sale ? "🏷 Remove Sale" : "🏷 Mark On Sale"}
            </DropdownItem>
            <DropdownItem
              onClick={() => handleAction(() => onToggle("is_new"))}
            >
              {product.is_new ? "🆕 Remove New" : "🆕 Mark New"}
            </DropdownItem>
            <hr className="my-1 border-gray-100" />
            <DropdownItem
              onClick={() => handleAction(() => onDelete(product))}
              className="text-red-600 hover:bg-red-50"
            >
              🗑 Delete
            </DropdownItem>
          </div>
        </>
      )}
    </div>
  );
};

const DropdownItem: React.FC<{
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}> = ({ onClick, className = "", children }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors ${className}`}
  >
    {children}
  </button>
);

// ─── Helpers ────────────────────────────────────────────────────

const formatPrice = (v: string | null) =>
  v ? `KES ${Number(v).toLocaleString()}` : "—";

const StockBadge: React.FC<{ product: Product }> = ({ product }) => {
  if (product.current_stock <= 0)
    return (
      <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
        Out of Stock
      </span>
    );
  if (product.current_stock <= product.reorder_point)
    return (
      <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
        Low Stock
      </span>
    );
  return (
    <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
      In Stock
    </span>
  );
};

const ThumbnailImage: React.FC<{ src?: string | null; alt?: string }> = ({
  src,
  alt,
}) => {
  const [errored, setErrored] = useState(false);

  if (!src || errored) {
    return (
      <div className="h-full w-full flex items-center justify-center text-gray-400">
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt ?? ""}
      className="h-full w-full object-cover"
      onError={() => setErrored(true)}
    />
  );
};
// ─── Main ProductList Component ─────────────────────────────────

const ProductList: React.FC<ProductListProps> = ({
  products,
  isLoading,
  filters,
  meta,
  onUpdateFilters,
  onResetFilters,
  onGoToPage,
  onRefresh,
  selectedIds,
  onToggleSelected,
  onToggleSelectAll,
  onClearSelection,
  isAllSelected,
  onView,
  onEdit,
  onDelete,
  onToggleFlag,
  onBulkAction,
  bulkLoading,
  categories,
  brands,
}) => {
  // Sort handler
  const handleSort = (field: string) => {
    const isSameField = filters.sort_by === field;
    onUpdateFilters("sort_by", field as ProductFilters["sort_by"]);
    onUpdateFilters(
      "sort_dir",
      isSameField && filters.sort_dir === "asc" ? "desc" : "asc",
    );
  };

  const sortIcon = (field: string) => {
    if (filters.sort_by !== field) return "↕";
    return filters.sort_dir === "asc" ? "↑" : "↓";
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <FilterBar
        filters={filters}
        onUpdateFilters={onUpdateFilters}
        onResetFilters={onResetFilters}
        categories={categories}
        brands={brands}
      />

      {/* Bulk actions */}
      <BulkActionBar
        count={selectedIds.size}
        onAction={onBulkAction}
        onClear={onClearSelection}
        loading={bulkLoading}
      />

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full" />
        </div>
      )}

      {/* Table */}
      {!isLoading && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="w-12 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      onChange={onToggleSelectAll}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                  </th>
                  <th className="w-16 px-4 py-3" />
                  <th
                    className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:text-gray-900"
                    onClick={() => handleSort("name")}
                  >
                    Product {sortIcon("name")}
                  </th>
                  <th
                    className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:text-gray-900"
                    onClick={() => handleSort("sku")}
                  >
                    SKU {sortIcon("sku")}
                  </th>
                  <th
                    className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:text-gray-900"
                    onClick={() => handleSort("selling_price")}
                  >
                    Price {sortIcon("selling_price")}
                  </th>
                  <th
                    className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:text-gray-900"
                    onClick={() => handleSort("current_stock")}
                  >
                    Stock {sortIcon("current_stock")}
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Flags
                  </th>
                  <th className="w-12 px-4 py-3" />
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className={[
                      "hover:bg-gray-50 transition-colors",
                      selectedIds.has(product.id) ? "bg-indigo-50/50" : "",
                    ].join(" ")}
                  >
                    {/* Checkbox */}
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(product.id)}
                        onChange={() => onToggleSelected(product.id)}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                    </td>
                    {/* Thumbnail */}
                    <td className="px-4 py-3">
                      <div className="h-10 w-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                        {(() => {
                          const featuredImage =
                            product.gallery_images?.find(
                              (img) => img.is_primary,
                            ) || product.gallery_images?.[0];

                          return featuredImage ? (
                            <img
                              src={
                                featuredImage.thumbnail_url ||
                                featuredImage.image_url
                              }
                              alt={product.name}
                              className="h-full w-full object-cover"
                              onLoad={() => {
                                console.log(
                                  "🟢 Image loaded:",
                                  featuredImage.thumbnail_url,
                                );
                              }}
                              onError={(e) => {
                                console.log("🔴 IMAGE FAILED");

                                console.log("🔴 Product ID:", product.id);

                                console.log("🔴 Product Name:", product.name);

                                console.log(
                                  "🔴 Attempted URL:",
                                  featuredImage.thumbnail_url,
                                );

                                console.log(
                                  "🔴 Full image object:",
                                  featuredImage,
                                );

                                e.currentTarget.style.display = "none";
                              }}
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-gray-400">
                              <svg
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1}
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                                />
                              </svg>
                            </div>
                          );
                        })()}
                      </div>
                    </td>

                    {/* Name + Brand + Category */}
                    <td className="px-4 py-3">
                      <button
                        onClick={() => onView(product)}
                        className="text-left hover:text-indigo-600 transition-colors"
                      >
                        <p className="text-sm font-medium text-gray-900 truncate max-w-xs">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {[product.brand?.name, product.category?.name]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      </button>
                    </td>

                    {/* SKU */}
                    <td className="px-4 py-3">
                      <code className="text-xs text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded">
                        {product.sku}
                      </code>
                    </td>

                    {/* Price */}
                    <td className="px-4 py-3 text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {formatPrice(product.selling_price)}
                      </p>
                      {product.compare_price && (
                        <p className="text-xs text-gray-400 line-through">
                          {formatPrice(product.compare_price)}
                        </p>
                      )}
                    </td>

                    {/* Stock */}
                    <td className="px-4 py-3 text-center">
                      <p className="text-sm font-medium text-gray-900">
                        {product.current_stock}
                      </p>
                      <StockBadge product={product} />
                    </td>

                    {/* Active toggle */}
                    <td className="px-4 py-3 text-center">
                      <Toggle
                        enabled={product.is_active}
                        onChange={() => onToggleFlag(product, "is_active")}
                        size="sm"
                      />
                    </td>

                    {/* Flags */}
                    <td className="px-4 py-3">
                      <div className="flex gap-1 justify-center">
                        {product.is_featured && (
                          <span className="text-xs bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full">
                            ★
                          </span>
                        )}
                        {product.is_new && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">
                            New
                          </span>
                        )}
                        {product.is_on_sale && (
                          <span className="text-xs bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded-full">
                            Sale
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Row actions */}
                    <td className="px-4 py-3">
                      <RowActionsMenu
                        product={product}
                        onView={() => onView(product)}
                        onEdit={() => onEdit(product)}
                        onDelete={() => onDelete(product)}
                        onToggle={(flag) => onToggleFlag(product, flag)}
                      />
                    </td>
                  </tr>
                ))}

                {/* Empty state */}
                {products.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-4 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <svg
                          className="h-12 w-12 text-gray-300 mb-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                          />
                        </svg>
                        <h3 className="text-sm font-medium text-gray-900">
                          No products found
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Adjust your filters or add a new product.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {meta && meta.last_page > 1 && (
            <div className="border-t border-gray-200 px-4 py-3 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {meta.from}–{meta.to} of {meta.total}
              </p>
              <div className="flex gap-1">
                <Button
                  variant="secondary"
                  size="xs"
                  disabled={meta.current_page <= 1}
                  onClick={() => onGoToPage(meta.current_page - 1)}
                >
                  Previous
                </Button>
                {meta.links
                  .filter((l) => l.page !== null)
                  .map((link) => (
                    <Button
                      key={link.label}
                      variant={link.active ? "primary" : "secondary"}
                      size="xs"
                      onClick={() => onGoToPage(link.page!)}
                    >
                      {link.label}
                    </Button>
                  ))}
                <Button
                  variant="secondary"
                  size="xs"
                  disabled={meta.current_page >= meta.last_page}
                  onClick={() => onGoToPage(meta.current_page + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
