import WarehouseList from "../../components/dashboard/warehouse/Warehouse";
import { useState } from "react";
import { useWarehouse } from "../../hooks/warehouse/useWarehouse";
import type { Warehouse } from "../../types/warehouse.types";
import toast from "react-hot-toast";
import { FiPlus } from "react-icons/fi";
import WarehouseFormModal from "../../components/dashboard/warehouse/WarehouseFormModal";

const Warehouse = () => {
  const {
    warehouse,
    isLoading,
    filters,
    meta,
    updateFilters,
    fetchWarehouses,
    createWarehouse,
    updateWarehouse,
    deleteWarehouse,
    bulkDeleteWarehouse,
    bulkUpdateStatus,
  } = useWarehouse();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWarehouse, setEditingWarehouse] = useState<Warehouse | null>(
    null,
  );

  const handleCreate = () => {
    setEditingWarehouse(null);
    setIsModalOpen(true);
  };

  const handleEdit = (warehouse: Warehouse) => {
    setEditingWarehouse(warehouse);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingWarehouse(null);
  };

  const handleSubmit = async (data: any) => {
    try {
      if (editingWarehouse) {
        await updateWarehouse(editingWarehouse.id, data);
        toast.success("Warehouse updated successfully");
      } else {
        await createWarehouse(data);
        toast.success("Warehouse created successfully");
      }
      handleClose();
    } catch (error: any) {
      const apiPayload = error.body ?? error.response?.data;
      const message =
        apiPayload && typeof apiPayload === "object"
          ? apiPayload.message || apiPayload.error
          : error.message || "Something went wrong";
      toast.error(message);
      throw error; // re-throw so the modal knows submission failed
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteWarehouse(id);
      toast.success("Warehouse deleted");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete");
    }
  };

  const handleBulkDelete = async (ids: number[]) => {
    try {
      await bulkDeleteWarehouse(ids);
      toast.success(`${ids.length} Warehouse deleted`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete");
    }
  };

  const handleBulkStatusChange = async (ids: number[], status: boolean) => {
    try {
      await bulkUpdateStatus(ids, status);
      toast.success(`${ids.length} Warehouse updated`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Brands</h1>
          <p className="text-gray-500 mt-1">Manage your Brands</p>
        </div>
        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition-all shadow-sm shadow-emerald-500/20"
        >
          <FiPlus size={18} />
          Add Warehouse
        </button>
      </div>

      {/* List */}
      <WarehouseList
        warehouse={warehouse}
        isLoading={isLoading}
        filters={filters}
        meta={meta}
        onUpdateFilters={updateFilters}
        onRefresh={fetchWarehouses}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onBulkDelete={handleBulkDelete}
        onBulkStatusChange={handleBulkStatusChange}
      />

      {/* Form Modal */}
      <WarehouseFormModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        warehouse={editingWarehouse}
      />
    </div>
  );
};

export default Warehouse;
