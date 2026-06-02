// src/pages/categories/Categories.tsx
import BrandList from "../../components/dashboard/brands/BrandList";
import CategoryFormModal from "../../components/common/CategoryFormModal";
import BrandFormModal from "../../components/dashboard/brands/BrandForm";
import { useState } from "react";
import { useBrand } from "../../hooks/brands/useBrand";
import type { Brand } from "../../types/brand.types";
import toast from "react-hot-toast";
import { FiPlus } from "react-icons/fi";

const Brands = () => {
  const {
    brands,
    isLoading,
    filters,
    meta,
    updateFilters,
    fetchBrands,
    createBrand,
    updateBrand,
    deleteBrand,
    bulkDeleteBrands,
    bulkUpdateStatus,
  } = useBrand();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);

  const handleCreate = () => {
    setEditingBrand(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category: Brand) => {
    setEditingBrand(category);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingBrand(null);
  };

  const handleSubmit = async (data: any) => {
    try {
      if (editingBrand) {
        await updateBrand(editingBrand.id, data);
        toast.success("Brand updated successfully");
      } else {
        await createBrand(data);
        toast.success("Brand created successfully");
      }
      handleClose();
    } catch (error: any) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
      throw error; // re-throw so the modal knows submission failed
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteBrand(id);
      toast.success("Brand deleted");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete");
    }
  };

  const handleBulkDelete = async (ids: number[]) => {
    try {
      await bulkDeleteBrands(ids);
      toast.success(`${ids.length} Brands deleted`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete");
    }
  };

  const handleBulkStatusChange = async (ids: number[], status: boolean) => {
    try {
      await bulkUpdateStatus(ids, status);
      toast.success(`${ids.length} Brands updated`);
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
          Add Category
        </button>
      </div>

      {/* List */}
      <BrandList
        brands={brands}
        isLoading={isLoading}
        filters={filters}
        meta={meta}
        onUpdateFilters={updateFilters}
        onRefresh={fetchBrands}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onBulkDelete={handleBulkDelete}
        onBulkStatusChange={handleBulkStatusChange}
      />

      {/* Form Modal */}
      <BrandFormModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        brand={editingBrand}
      />
    </div>
  );
};

export default Brands;
