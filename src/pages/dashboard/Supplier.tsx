import SupplierList from "../../components/dashboard/supplier/SupplierList";
import { useState } from "react";
import { useSupplier } from "../../hooks/supplier/useSupplier";
import type { Supplier } from "../../types/supplier.types";
import toast from "react-hot-toast";
import { FiPlus } from "react-icons/fi";
import SupplierFormModal from "../../components/dashboard/supplier/SupplierFormData";

const Supplier = () => {
  const {
    supplier,
    isLoading,
    filters,
    meta,
    updateFilters,
    fetchSuppliers,
    createSupplier,
    updateSupplier,
    deleteSupplier,
    restoreSupplier,
    forceDeleteSupplier,
    bulkDeleteSuppliers,
    bulkUpdateSuppliers,
  } = useSupplier();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);

  const handleCreate = () => {
    setEditingSupplier(null);
    setIsModalOpen(true);
  };

  const handleEdit = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingSupplier(null);
  };

  const handleSubmit = async (data: any) => {
    try {
      if (editingSupplier) {
        await updateSupplier(editingSupplier.id, data);
        toast.success("Supplier updated successfully");
      } else {
        await createSupplier(data);
        toast.success("Supplier created successfully");
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
      await deleteSupplier(id);
      toast.success("Supplier deleted");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete");
    }
  };

  const handleBulkDelete = async (ids: number[]) => {
    try {
      await bulkDeleteSuppliers(ids);
      toast.success(`${ids.length} Suppliers deleted`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete");
    }
  };

  const handleBulkStatusChange = async (ids: number[], status: boolean) => {
    try {
      await bulkUpdateSuppliers(ids, status);
      toast.success(`${ids.length} Suppliers updated`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Suppliers</h1>
          <p className="text-gray-500 mt-1">Manage your Suppliers</p>
        </div>
        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition-all shadow-sm shadow-emerald-500/20"
        >
          <FiPlus size={18} />
          Add Supplier
        </button>
      </div>

      {/* List */}
      <SupplierList
        suppliers={supplier}
        isLoading={isLoading}
        filters={filters}
        meta={meta}
        onUpdateFilters={updateFilters}
        onRefresh={fetchSuppliers}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onBulkDelete={handleBulkDelete}
        onBulkStatusChange={handleBulkStatusChange}
      />

      {/* Form Modal */}
      <SupplierFormModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        supplier={editingSupplier}
      />
    </div>
  );
};

export default Supplier;
