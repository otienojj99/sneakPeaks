import { useState } from "react";
import {
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiMoreVertical,
  FiChevronLeft,
  FiChevronRight,
  FiRefreshCw,
  FiPlus,
  FiAlertTriangle,
  FiX,
  FiEye,
} from "react-icons/fi";
import type {
  InventoryCount,
  InventoryFilters,
} from "../../../types/inventory.types";

interface InventoryCountListProps {
  counts: InventoryCount[];
  isLoading: boolean;
  filters: InventoryFilters;
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };

  warehouses: { id: number; name: string }[];
  onUpdateFilters: (filters: Partial<InventoryFilters>) => void;
  onRefresh: () => void;
  onEdit: (count: InventoryCount) => void;
  onDelete: (id: number) => void;
  onRestore: (id: number) => void;
  onChangeStatus: (id: number, status: string) => void;
  onViewDetails: (id: number) => void;
}
const statusColors: Record<string, string> = {
  draft: "bg-gray-100 text-gray-700",
  in_progress: "bg-blue-100 text-blue-700",
  completed: "bg-emerald-100 text-emerald-700",
  approved: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const InventoryCountList = ({
  counts,
  isLoading,
  filters,
  meta,
  warehouses,
  onUpdateFilters,
  onRefresh,
  onEdit,
  onDelete,
  onRestore,
  onChangeStatus,
  onViewDetails,
}: InventoryCountListProps) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [openActionId, setOpenActionId] = useState<number | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateFilters({ search: searchInput, page: 1 });
  };

  const handleClearSearch = () => {
    setSearchInput("");
    onUpdateFilters({ search: "", page: 1 });
  };

  const handleDeleteClick = (id: number) => {
    setDeletingId(id);
    setShowDeleteConfirm(true);
    setOpenActionId(null);
  };
  const confirmDelete = () => {
    if (deletingId) {
      onDelete(deletingId);
      setShowDeleteConfirm(false);
      setDeletingId(null);
    }
  };

  const formatDate = (date: string) => new Date(date).toLocaleDateString();

  return (
    <>
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <FiRefreshCw className="text-emerald-500" size={18} />
            </div>
            <div>
              <p className="text-2xl font-bold">{meta.total}</p>
              <p className="text-xs text-gray-500">Total Counts</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <FiPlus className="text-blue-500" size={18} />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {counts.filter((c) => c.status === "in_progress").length}
              </p>
              <p className="text-xs text-gray-500">In Progress</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
              <FiEye className="text-green-500" size={18} />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {counts.filter((c) => c.status === "approved").length}
              </p>
              <p className="text-xs text-gray-500">Approved</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
              <FiAlertTriangle className="text-purple-500" size={18} />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {counts.reduce((sum, c) => sum + (c.discrepancy_count || 0), 0)}
              </p>
              <p className="text-xs text-gray-500">Discrepancies</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-2xl border shadow-sm">
        <div className="p-4 flex flex-col sm:flex-row gap-3">
          <form onSubmit={handleSearch} className="flex-1 relative">
            <FiSearch
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by reference..."
              className="w-full pl-10 pr-20 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50"
            />
            {searchInput && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs bg-gray-200 px-2 py-0.5 rounded"
              >
                Clear
              </button>
            )}
          </form>

          <select
            value={filters.status || ""}
            onChange={(e) =>
              onUpdateFilters({
                status: (e.target.value as any) || undefined,
                page: 1,
              })
            }
            className="px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 min-w-[140px]"
          >
            <option value="">All Status</option>
            <option value="draft">Draft</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="approved">Approved</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={filters.warehouse_id || ""}
            onChange={(e) =>
              onUpdateFilters({
                warehouse_id: e.target.value
                  ? Number(e.target.value)
                  : undefined,
                page: 1,
              })
            }
            className="px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50 min-w-[140px]"
          >
            <option value="">All Warehouses</option>
            {warehouses.map((w) => (
              <option key={w.id} value={w.id}>
                {w.name}
              </option>
            ))}
          </select>

          <button
            onClick={onRefresh}
            className="p-2.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100"
          >
            <FiRefreshCw
              size={16}
              className={isLoading ? "animate-spin" : ""}
            />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-4 animate-pulse">...</div>
        ) : counts.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-gray-500">No inventory counts found</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-gray-50/50">
                  <tr>
                    <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500">
                      Reference
                    </th>
                    <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500">
                      Warehouse
                    </th>
                    <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500">
                      Date
                    </th>
                    <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500">
                      Status
                    </th>
                    <th className="text-left py-3.5 px-4 text-xs font-semibold text-gray-500">
                      Discrepancies
                    </th>
                    <th className="text-right py-3.5 px-4 w-16"></th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {counts.map((count) => (
                    <tr key={count.id} className="group hover:bg-gray-50/80">
                      <td className="py-3.5 px-4 font-mono text-sm">
                        {count.count_reference}
                      </td>
                      <td className="py-3.5 px-4 text-sm">
                        {count.warehouse?.name || "—"}
                      </td>
                      <td className="py-3.5 px-4 text-sm">
                        {formatDate(count.count_date)}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[count.status]}`}
                        >
                          {count.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-sm">
                        {count.discrepancy_count ?? 0}
                      </td>
                      <td className="py-3.5 px-4 text-right relative">
                        <button
                          onClick={() =>
                            setOpenActionId(
                              openActionId === count.id ? null : count.id,
                            )
                          }
                          className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 group-hover:opacity-100"
                        >
                          <FiMoreVertical size={16} />
                        </button>
                        {openActionId === count.id && (
                          <div className="absolute right-0 top-full mt-1 bg-white rounded-xl border shadow-xl z-20 w-44 py-1.5">
                            <button
                              onClick={() => {
                                onViewDetails(count.id);
                                setOpenActionId(null);
                              }}
                              className="w-full flex items-center gap-2.5 px-4 py-2 text-sm hover:bg-gray-50"
                            >
                              <FiEye size={14} /> View Details
                            </button>
                            <button
                              onClick={() => {
                                onEdit(count);
                                setOpenActionId(null);
                              }}
                              className="w-full flex items-center gap-2.5 px-4 py-2 text-sm hover:bg-gray-50"
                            >
                              <FiEdit2 size={14} /> Edit
                            </button>
                            {count.status !== "cancelled" && (
                              <button
                                onClick={() => {
                                  onChangeStatus(count.id, "cancelled");
                                  setOpenActionId(null);
                                }}
                                className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                              >
                                <FiX size={14} /> Cancel
                              </button>
                            )}
                            {count.status === "completed" && (
                              <button
                                onClick={() => {
                                  onChangeStatus(count.id, "approved");
                                  setOpenActionId(null);
                                }}
                                className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-green-600 hover:bg-green-50"
                              >
                                <FiEye size={14} /> Approve
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteClick(count.id)}
                              className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              <FiTrash2 size={14} /> Delete
                            </button>
                            {count.deleted_at && (
                              <button
                                onClick={() => {
                                  onRestore(count.id);
                                  setOpenActionId(null);
                                }}
                                className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-emerald-600 hover:bg-emerald-50"
                              >
                                <FiRefreshCw size={14} /> Restore
                              </button>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination – similar to CategoryList */}
            {meta.last_page > 1 && (
              <div className="flex justify-between items-center px-4 py-4 border-t">
                <p className="text-sm text-gray-500">
                  Page {meta.current_page} of {meta.last_page}
                </p>
                <div className="flex gap-1.5">
                  <button
                    disabled={meta.current_page <= 1}
                    onClick={() =>
                      onUpdateFilters({ page: meta.current_page - 1 })
                    }
                    className="w-9 h-9 rounded-lg border disabled:opacity-40"
                  >
                    ‹
                  </button>
                  <button
                    disabled={meta.current_page >= meta.last_page}
                    onClick={() =>
                      onUpdateFilters({ page: meta.current_page + 1 })
                    }
                    className="w-9 h-9 rounded-lg border disabled:opacity-40"
                  >
                    ›
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setShowDeleteConfirm(false)}
          />
          <div className="relative bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                <FiAlertTriangle className="text-red-600" size={20} />
              </div>
              <h3 className="text-lg font-bold">Delete Count</h3>
            </div>
            <p className="text-sm text-gray-600">
              Are you sure? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-xl"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InventoryCountList;
