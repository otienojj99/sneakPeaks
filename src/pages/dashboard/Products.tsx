import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiPlus } from "react-icons/fi";
import ProductFormModal from "../../components/dashboard/products/ProductForm";

import { useProducts } from "../../hooks/products/useProducts";
import { useProducts1 } from "../../hooks/products/useProduct";
import {
  useDeleteProduct,
  useToggleProductStatus,
} from "../../hooks/products/useProductMutations";
import { useCategory } from "../../hooks/useCategories";
import { useBrand } from "../../hooks/brands/useBrand";
import { useWarehouse } from "../../hooks/warehouse/useWarehouse";

import type {
  Product,
  ToggleableFlag,
  BulkAction,
} from "../../types/product.types";
import type {
  ProductFormData,
  ProductUpdateFormData,
} from "../../types/product.types";
import ProductList from "../../components/dashboard/products/ProductList";
import ConfirmDialog from "../../components/common/ConfirmDialog";

const Products = () => {
  const navigate = useNavigate();

  // ─── Data hook ──────────────────────────────────
  const {
    products,
    meta,
    loading: isLoading,
    error,
    filters,
    updateFilter,
    resetFilters,
    goToPage,
    refetch,
    selectedIds,
    toggleSelected,
    toggleSelectAll,
    clearSelection,
    isAllSelected,
    executeBulkAction,
    bulkLoading,
  } = useProducts();

  const { createProduct, updateProduct, fetchProducts } = useProducts1();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Product | null>(null);
  const handleCreate = () => {
    setEditingCategory(null);
    setModalOpen(true); // ✅ ALWAYS open
    console.log("CLICKED"); // 👈 check this
  };

  // const handleEdit = (category: Category) => {
  //   setEditingCategory(category);
  //   setIsModalOpen(true);
  // };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { categories } = useCategory({ per_page: 100 });
  const { brands } = useBrand({ per_page: 100 });
  const { warehouse } = useWarehouse({ per_page: 100 });

  const handleSubmit = async (
    data: ProductFormData | ProductUpdateFormData,
  ) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, data);
        toast.success("Product updated");
      } else {
        console.log("Creating product with data:", data); // Debug log
        await createProduct(data);
        console.log("Product created successfully");
        toast.success("Product created");
      }
      setModalOpen(false);
      setEditingProduct(null);
      // Optionally refetch list (already done in the hook, but if you want to be safe)
      await fetchProducts();
    } catch (error) {
      // Error is already handled inside the modal's toast; but we re-throw to keep formik's error handling.
      throw error;
    }
  };

  // ─── Mutation hooks ─────────────────────────────
  const { execute: deleteProduct } = useDeleteProduct();

  // ─── Optimistic toggle ──────────────────────────
  const [optimisticOverrides, setOptimisticOverrides] = useState<
    Map<number, Partial<Product>>
  >(new Map());

  const { toggle: toggleFlag } = useToggleProductStatus(
    // Optimistic update
    (id, flag, value) => {
      setOptimisticOverrides((prev) => {
        const next = new Map(prev);
        next.set(id, { ...(next.get(id) ?? {}), [flag]: value });
        return next;
      });
    },
    // Revert on failure
    (id, flag, value) => {
      setOptimisticOverrides((prev) => {
        const next = new Map(prev);
        next.set(id, { ...(next.get(id) ?? {}), [flag]: value });
        return next;
      });
      toast.error("Failed to update status");
    },
  );

  // Merge optimistic state into products
  const displayProducts = products.map((p) => ({
    ...p,
    ...(optimisticOverrides.get(p.id) ?? {}),
  }));

  // ─── Confirm dialog ────────────────────────────
  const [confirmState, setConfirmState] = useState<{
    open: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    variant: "danger" | "warning" | "info";
    loading: boolean;
  }>({
    open: false,
    title: "",
    message: "",
    onConfirm: () => {},
    variant: "danger",
    loading: false,
  });

  const closeConfirm = () => setConfirmState((s) => ({ ...s, open: false }));

  // ─── Handlers ──────────────────────────────────

  const handleView = (product: Product) => {
    navigate(`/dashboard/products/${product.id}`);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleDelete = (product: Product) => {
    setConfirmState({
      open: true,
      title: "Delete Product",
      message: `Are you sure you want to delete "${product.name}"? This action can be undone from the trash.`,
      variant: "danger",
      loading: false,
      onConfirm: async () => {
        setConfirmState((s) => ({ ...s, loading: true }));
        try {
          await deleteProduct(product.id);
          toast.success("Product deleted");
          refetch();
        } catch (error: any) {
          toast.error(error?.message || "Failed to delete product");
        } finally {
          closeConfirm();
        }
      },
    });
  };

  const handleToggleFlag = (product: Product, flag: ToggleableFlag) => {
    toggleFlag(product.id, flag, product[flag] as boolean);
  };

  const handleBulkAction = (action: BulkAction) => {
    const ids = Array.from(selectedIds);

    if (action.action === "delete") {
      setConfirmState({
        open: true,
        title: "Delete Products",
        message: `Are you sure you want to delete ${ids.length} product(s)?`,
        variant: "danger",
        loading: false,
        onConfirm: async () => {
          setConfirmState((s) => ({ ...s, loading: true }));
          try {
            await executeBulkAction(action);
            toast.success(`${ids.length} product(s) deleted`);
          } catch (error: any) {
            toast.error(error?.message || "Bulk delete failed");
          } finally {
            closeConfirm();
          }
        },
      });
      return;
    }

    // Non-destructive bulk actions — no confirmation needed
    const actionLabels: Record<string, string> = {
      activate: "activated",
      deactivate: "deactivated",
      set_featured: "updated",
      set_on_sale: "updated",
      restore: "restored",
    };

    executeBulkAction(action)
      .then(() =>
        toast.success(
          `${ids.length} product(s) ${actionLabels[action.action] || "updated"}`,
        ),
      )
      .catch((error: any) =>
        toast.error(error?.message || "Bulk action failed"),
      );
  };

  // TODO: Fetch from their own hooks / services
  // const categories = [{ value: 1, label: "Laptops" }];
  // const brands = [{ value: 1, label: "Nike" }];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Products</h1>
          <p className="text-gray-500 mt-1">
            {meta
              ? `${meta.total} product${meta.total !== 1 ? "s" : ""} total`
              : "Manage your product catalog"}
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition-all shadow-sm shadow-emerald-500/20"
        >
          <FiPlus size={18} />
          Add Product
        </button>
      </div>

      {/* Error state */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700 flex items-center justify-between">
          <span>{error}</span>
          <button
            onClick={refetch}
            className="text-red-800 font-medium hover:underline ml-4"
          >
            Retry
          </button>
        </div>
      )}

      {/* Product List */}
      <ProductList
        products={displayProducts}
        isLoading={isLoading}
        filters={filters}
        meta={meta}
        onUpdateFilters={updateFilter}
        onResetFilters={resetFilters}
        onGoToPage={goToPage}
        onRefresh={refetch}
        selectedIds={selectedIds}
        onToggleSelected={toggleSelected}
        onToggleSelectAll={toggleSelectAll}
        onClearSelection={clearSelection}
        isAllSelected={isAllSelected}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleFlag={handleToggleFlag}
        onBulkAction={handleBulkAction}
        bulkLoading={bulkLoading}
        categories={categories.map((cat) => ({
          value: cat.id,
          label: cat.name,
        }))}
        brands={brands.map((brand) => ({ value: brand.id, label: brand.name }))}
      />
      <ProductFormModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingProduct(null);
        }}
        product={editingProduct}
        categories={categories}
        brands={brands}
        warehouses={warehouse}
        onSubmit={handleSubmit}
      />
      {/* Confirm Dialog */}
      <ConfirmDialog
        open={confirmState.open}
        onClose={closeConfirm}
        onConfirm={confirmState.onConfirm}
        title={confirmState.title}
        message={confirmState.message}
        variant={confirmState.variant}
        loading={confirmState.loading}
        confirmLabel="Delete"
      />
    </div>
  );
};

export default Products;
