// src/pages/dashboard/InventoryCounts.tsx

import { useState } from "react";
import { useInventoryCounts } from "../../hooks/inventory/useInventoryCounts";
import { useWarehouse } from "../../hooks/warehouse/useWarehouse";
import InventoryCountList from "../../components/dashboard/inventory_operations/InventoryCountList";
import InventoryCountFormModal from "../../components/dashboard/inventory_operations/InventoryCountItemFormModal";
import { FiPlus } from "react-icons/fi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const InventoryCounts = () => {
  const navigate = useNavigate();
  const {
    counts,
    loading,
    meta,
    filters,
    resetFilters,
    createCount,
    updateCount,
    deleteCount,
    restoreCount,
    changeStatus,
    refresh,
  } = useInventoryCounts();
  const { warehouse, isLoading } = useWarehouse(); // assume you have this hook
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCount, setEditingCount] = useState<any>(null);

  const handleCreate = () => {
    setEditingCount(null);
    setModalOpen(true);
  };

  const handleEdit = (count: any) => {
    setEditingCount(count);
    setModalOpen(true);
  };

  const handleSubmit = async (data: any) => {
    if (editingCount) {
      await updateCount(editingCount.id, data);
      toast.success("Count updated");
    } else {
      await createCount(data);
      toast.success("Count created");
    }
    setModalOpen(false);
    setEditingCount(null);
  };

  const handleDelete = async (id: number) => {
    await deleteCount(id);
    toast.success("Count deleted");
  };

  const handleRestore = async (id: number) => {
    await restoreCount(id);
    toast.success("Count restored");
  };

  const handleStatusChange = async (id: number, status: string) => {
    await changeStatus(id, status as any);
    toast.success(`Status changed to ${status}`);
  };

  const handleViewDetails = (id: number) => {
    navigate(`../${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Inventory Counts</h1>
          <p className="text-gray-500 mt-1">Manage physical stock counts</p>
        </div>
        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-white text-sm font-semibold rounded-xl shadow-sm"
        >
          <FiPlus size={18} /> New Count
        </button>
      </div>

      <InventoryCountList
        counts={counts}
        isLoading={loading}
        filters={filters}
        meta={meta}
        warehouses={warehouse}
        onUpdateFilters={resetFilters}
        onRefresh={refresh}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onRestore={handleRestore}
        onChangeStatus={handleStatusChange}
        onViewDetails={handleViewDetails}
      />

      <InventoryCountFormModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingCount(null);
        }}
        onSubmit={handleSubmit}
        initialData={editingCount}
        warehouses={warehouse}
      />
    </div>
  );
};

export default InventoryCounts;
