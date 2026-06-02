// src/components/dashboard/categories/CategoryList.tsx
import { useState } from "react";
import {
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiMoreVertical,
  FiFolder,
  FiChevronLeft,
  FiChevronRight,
  FiImage,
  FiCheckSquare,
  FiSquare,
  FiToggleLeft,
  FiToggleRight,
  FiRefreshCw,
  FiPackage,
  FiPlus,
  FiAlertTriangle,
  FiX,
} from "react-icons/fi";
import type { Category, CategoryFilters } from "../../../types/category.types";

interface CategoryListProps {
  categories: Category[];
  isLoading: boolean;
  filters: CategoryFilters;
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  onUpdateFilters: (filters: Partial<CategoryFilters>) => void;
  onRefresh: () => void;
  onEdit: (category: Category) => void;
  onDelete: (id: number) => void;
  onBulkDelete: (ids: number[]) => void;
  onBulkStatusChange: (ids: number[], status: boolean) => void;
}

const CategoryList = ({
  categories,
  isLoading,
  filters,
  meta,
  onUpdateFilters,
  onRefresh,
  onEdit,
  onDelete,
  onBulkDelete,
  onBulkStatusChange,
}: CategoryListProps) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [openActionId, setOpenActionId] = useState<number | null>(null);

  // Delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(
    null,
  );
  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);

  // Search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateFilters({ search: searchInput });
  };

  const handleClearSearch = () => {
    setSearchInput("");
    onUpdateFilters({ search: "" });
  };

  // Selection
  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === categories.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(categories.map((c) => c.id));
    }
  };

  // Delete handlers
  const handleDeleteClick = (category: Category) => {
    setDeletingCategory(category);
    setShowDeleteConfirm(true);
    setOpenActionId(null);
  };

  const confirmDelete = () => {
    if (deletingCategory) {
      onDelete(deletingCategory.id);
      setShowDeleteConfirm(false);
      setDeletingCategory(null);
    }
  };

  const confirmBulkDelete = () => {
    onBulkDelete(selectedIds);
    setSelectedIds([]);
    setShowBulkDeleteConfirm(false);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      {/* ===== STATS CARDS ===== */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <FiFolder className="text-emerald-500" size={18} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {meta?.total ?? 0}
              </p>
              <p className="text-xs text-gray-500">Total</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <FiToggleRight className="text-blue-500" size={18} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {categories.filter((c) => c.is_active).length}
              </p>
              <p className="text-xs text-gray-500">Active</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <FiFolder className="text-amber-500" size={18} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {categories.filter((c) => !c.parent_id).length}
              </p>
              <p className="text-xs text-gray-500">Top Level</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
              <FiPackage className="text-purple-500" size={18} />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {categories.reduce(
                  (sum, c) => sum + (c.products_count || 0),
                  0,
                )}
              </p>
              <p className="text-xs text-gray-500">Products</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== FILTERS BAR ===== */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
        <div className="p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 relative">
            <FiSearch
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search categories..."
              className="w-full pl-10 pr-20 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all"
            />
            {searchInput && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-medium bg-gray-200 px-2 py-0.5 rounded"
              >
                Clear
              </button>
            )}
          </form>

          {/* Status Filter */}
          <select
            value={filters.is_active?.toString() || ""}
            onChange={(e) =>
              onUpdateFilters({
                is_active: e.target.value === "true",
              })
            }
            className="px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all min-w-[140px]"
          >
            <option value="">All Status</option>
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>

          {/* Sort */}
          <select
            value={`${filters.sort_by || "created_at"}_${
              filters.sort_order || "desc"
            }`}
            onChange={(e) => {
              const [field, direction] = e.target.value.split("_") as [
                string,
                "asc" | "desc",
              ];

              onUpdateFilters({
                sort_order: direction, // ✅ asc | desc
              });
            }}
            className="px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all min-w-[160px]"
          >
            <option value="created_at_desc">Newest First</option>
            <option value="created_at_asc">Oldest First</option>
            <option value="name_asc">Name A-Z</option>
            <option value="name_desc">Name Z-A</option>
            <option value="sort_order_asc">Sort Order ↑</option>
            <option value="sort_order_desc">Sort Order ↓</option>
          </select>

          {/* Refresh */}
          <button
            onClick={onRefresh}
            className="p-2.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-500 transition-all"
            title="Refresh"
          >
            <FiRefreshCw
              size={16}
              className={isLoading ? "animate-spin" : ""}
            />
          </button>
        </div>

        {/* Bulk Actions */}
        {selectedIds.length > 0 && (
          <div className="px-4 py-3 bg-emerald-50 border-t border-emerald-100 flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-emerald-700">
              {selectedIds.length} selected
            </span>
            <div className="h-4 w-px bg-emerald-200" />
            <button
              onClick={() => onBulkStatusChange(selectedIds, true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-emerald-200 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors"
            >
              <FiToggleRight size={14} />
              Activate
            </button>
            <button
              onClick={() => onBulkStatusChange(selectedIds, false)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <FiToggleLeft size={14} />
              Deactivate
            </button>
            <button
              onClick={() => setShowBulkDeleteConfirm(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-red-50 border border-red-200 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
            >
              <FiTrash2 size={14} />
              Delete
            </button>
            <button
              onClick={() => setSelectedIds([])}
              className="ml-auto text-xs text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Clear selection
            </button>
          </div>
        )}
      </div>

      {/* ===== TABLE ===== */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 animate-pulse">
                <div className="w-5 h-5 bg-gray-200 rounded" />
                <div className="w-11 h-11 bg-gray-200 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/3" />
                  <div className="h-3 bg-gray-100 rounded w-1/5" />
                </div>
                <div className="h-6 w-16 bg-gray-200 rounded-full" />
                <div className="w-8 h-8 bg-gray-200 rounded-lg" />
              </div>
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="py-20 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <FiFolder className="text-gray-300" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              {filters.search || filters.is_active !== undefined
                ? "No categories found"
                : "No categories yet"}
            </h3>
            <p className="text-sm text-gray-500 mt-1.5 mb-6 max-w-sm mx-auto">
              {filters.search || filters.is_active !== undefined
                ? "Try adjusting your search or filters."
                : "Create your first category to organize products."}
            </p>
            {(filters.search || filters.is_active !== undefined) && (
              <button
                onClick={() => {
                  setSearchInput("");
                  onUpdateFilters({
                    search: undefined,
                    is_active: undefined,
                    sort_by: undefined,
                    // sort_direction: undefined,
                    page: 1,
                  });
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-xl transition-all"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="text-left py-3.5 px-4 w-12">
                      <button
                        onClick={toggleSelectAll}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {selectedIds.length === categories.length &&
                        categories.length > 0 ? (
                          <FiCheckSquare
                            size={18}
                            className="text-emerald-500"
                          />
                        ) : (
                          <FiSquare size={18} />
                        )}
                      </button>
                    </th>
                    <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      Parent
                    </th>
                    <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                      Products
                    </th>
                    <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                      Order
                    </th>
                    <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden xl:table-cell">
                      Created
                    </th>
                    <th className="text-right py-3.5 px-4 w-16" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {categories.map((category) => (
                    <tr
                      key={category.id}
                      className={`group hover:bg-gray-50/80 transition-colors ${
                        selectedIds.includes(category.id)
                          ? "bg-emerald-50/40"
                          : ""
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => toggleSelect(category.id)}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {selectedIds.includes(category.id) ? (
                            <FiCheckSquare
                              size={18}
                              className="text-emerald-500"
                            />
                          ) : (
                            <FiSquare size={18} />
                          )}
                        </button>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0 border border-gray-200/50">
                            {category.image ? (
                              <img
                                src={category.image}
                                alt={category.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <FiImage className="text-gray-400" size={18} />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                              {category.name}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5 truncate">
                              /{category.slug}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Parent */}
                      <td className="py-3.5 px-4 hidden md:table-cell">
                        {category.parent ? (
                          <span className="inline-flex items-center gap-1.5 text-sm text-gray-600">
                            <FiFolder size={13} className="text-gray-400" />
                            <span className="truncate max-w-[120px]">
                              {category.parent.name}
                            </span>
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-md font-medium">
                            Top Level
                          </span>
                        )}
                      </td>

                      {/* Products */}
                      <td className="py-3.5 px-4 hidden lg:table-cell">
                        <div className="flex items-center gap-1.5">
                          <FiPackage size={13} className="text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {category.products_count ?? 0}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                            category.is_active
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                              : "bg-gray-100 text-gray-500 border border-gray-200"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              category.is_active
                                ? "bg-emerald-500"
                                : "bg-gray-400"
                            }`}
                          />
                          {category.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>

                      {/* Order */}
                      <td className="py-3.5 px-4 hidden lg:table-cell">
                        <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-md font-mono">
                          #{category.sort_order}
                        </span>
                      </td>

                      {/* Created */}
                      <td className="py-3.5 px-4 hidden xl:table-cell">
                        <span className="text-sm text-gray-500">
                          {formatDate(category.created_at)}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="relative inline-block">
                          <button
                            onClick={() =>
                              setOpenActionId(
                                openActionId === category.id
                                  ? null
                                  : category.id,
                              )
                            }
                            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                          >
                            <FiMoreVertical size={16} />
                          </button>

                          {openActionId === category.id && (
                            <>
                              <div
                                className="fixed inset-0 z-10"
                                onClick={() => setOpenActionId(null)}
                              />
                              <div className="absolute right-0 top-full mt-1 z-20 bg-white rounded-xl border border-gray-200 shadow-xl py-1.5 w-44">
                                <button
                                  onClick={() => {
                                    onEdit(category);
                                    setOpenActionId(null);
                                  }}
                                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                  <FiEdit2
                                    size={14}
                                    className="text-gray-400"
                                  />
                                  Edit Category
                                </button>
                                <div className="border-t border-gray-100 my-1" />
                                <button
                                  onClick={() => handleDeleteClick(category)}
                                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                >
                                  <FiTrash2 size={14} />
                                  Delete Category
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {meta.last_page > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-4 border-t border-gray-100 gap-4">
                <p className="text-sm text-gray-500">
                  Showing{" "}
                  <span className="font-medium text-gray-700">
                    {(meta.current_page - 1) * meta.per_page + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium text-gray-700">
                    {Math.min(meta.current_page * meta.per_page, meta.total)}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-gray-700">
                    {meta.total}
                  </span>
                </p>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() =>
                      onUpdateFilters({ page: meta.current_page - 1 })
                    }
                    disabled={meta.current_page <= 1}
                    className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <FiChevronLeft size={16} />
                  </button>

                  {Array.from({ length: meta.last_page }, (_, i) => i + 1)
                    .filter((page) => {
                      const current = meta.current_page;
                      return (
                        page === 1 ||
                        page === meta.last_page ||
                        Math.abs(page - current) <= 1
                      );
                    })
                    .map((page, idx, arr) => {
                      const showEllipsis = idx > 0 && page - arr[idx - 1] > 1;
                      return (
                        <span key={page} className="flex items-center">
                          {showEllipsis && (
                            <span className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm">
                              …
                            </span>
                          )}
                          <button
                            onClick={() => onUpdateFilters({ page })}
                            className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
                              meta.current_page === page
                                ? "bg-emerald-500 text-white shadow-sm shadow-emerald-500/20"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            {page}
                          </button>
                        </span>
                      );
                    })}

                  <button
                    onClick={() =>
                      onUpdateFilters({ page: meta.current_page + 1 })
                    }
                    disabled={meta.current_page >= meta.last_page}
                    className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <FiChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* ===== DELETE CONFIRMATION ===== */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setShowDeleteConfirm(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                  <FiAlertTriangle className="text-red-600" size={20} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  Delete Category
                </h3>
              </div>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
              >
                <FiX size={16} />
              </button>
            </div>
            <div className="px-6 py-5">
              <p className="text-sm text-gray-600 leading-relaxed">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-gray-900">
                  "{deletingCategory?.name}"
                </span>
                ? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2.5 text-sm font-semibold text-white bg-red-500 rounded-xl hover:bg-red-600 transition-all flex items-center gap-2"
              >
                <FiTrash2 size={15} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== BULK DELETE CONFIRMATION ===== */}
      {showBulkDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setShowBulkDeleteConfirm(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                  <FiAlertTriangle className="text-red-600" size={20} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  Delete Categories
                </h3>
              </div>
              <button
                onClick={() => setShowBulkDeleteConfirm(false)}
                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
              >
                <FiX size={16} />
              </button>
            </div>
            <div className="px-6 py-5">
              <p className="text-sm text-gray-600 leading-relaxed">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-gray-900">
                  {selectedIds.length} categories
                </span>
                ? This action cannot be undone.
              </p>
              <div className="mt-3 bg-red-50 rounded-lg px-3 py-2">
                <p className="text-sm text-red-700 font-medium">
                  {selectedIds.length} items will be permanently deleted
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50">
              <button
                onClick={() => setShowBulkDeleteConfirm(false)}
                className="px-4 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmBulkDelete}
                className="px-4 py-2.5 text-sm font-semibold text-white bg-red-500 rounded-xl hover:bg-red-600 transition-all flex items-center gap-2"
              >
                <FiTrash2 size={15} />
                Delete All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryList;
