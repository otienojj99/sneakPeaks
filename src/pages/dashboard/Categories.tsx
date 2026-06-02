// src/pages/categories/Categories.tsx
import CategoryList from "../../components/dashboard/categories/CategoryList";
import CategoryFormModal from "../../components/common/CategoryFormModal";
import { useState } from "react";
import { useCategory } from "../../hooks/useCategories";
import type { Category } from "../../types/category.types";
import toast from "react-hot-toast";
import { FiPlus } from "react-icons/fi";

const Categories = () => {
  const {
    categories,
    isLoading,
    filters,
    meta,
    updateFilters,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    bulkDeleteCategories,
    bulkUpdateStatus,
  } = useCategory();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleCreate = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleSubmit = async (data: any) => {
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, data);
        toast.success("Category updated successfully");
      } else {
        await createCategory(data);
        toast.success("Category created successfully");
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
      await deleteCategory(id);
      toast.success("Category deleted");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete");
    }
  };

  const handleBulkDelete = async (ids: number[]) => {
    try {
      await bulkDeleteCategories(ids);
      toast.success(`${ids.length} categories deleted`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete");
    }
  };

  const handleBulkStatusChange = async (ids: number[], status: boolean) => {
    try {
      await bulkUpdateStatus(ids, status);
      toast.success(`${ids.length} categories updated`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
          <p className="text-gray-500 mt-1">Manage your product categories</p>
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
      <CategoryList
        categories={categories}
        isLoading={isLoading}
        filters={filters}
        meta={meta}
        onUpdateFilters={updateFilters}
        onRefresh={fetchCategories}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onBulkDelete={handleBulkDelete}
        onBulkStatusChange={handleBulkStatusChange}
      />

      {/* Form Modal */}
      <CategoryFormModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        category={editingCategory}
      />
    </div>
  );
};

export default Categories;
