import { useState, useEffect, useCallback } from 'react';
import { productService } from '../../api/services/productService';
import type {
  Product,
  ProductFormData,
  ProductUpdateFormData,
  ProductFilters,
  PaginationMeta,
  PaginationLinks,
  BulkAction,
} from '../../types/product.types';
import toast from 'react-hot-toast';

export const useProducts1 = (initialFilters?: Partial<ProductFilters>) => {
  // ========== State ==========
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<PaginationMeta>({
    current_page: 1,
    last_page: 1,
    per_page: 15,
    total: 0,
    from: 0,
    to: 0,
    path: '',
    links: [],
  });
  const [links, setLinks] = useState<PaginationLinks | null>(null);
  const [filters, setFilters] = useState<ProductFilters>({
    page: 1,
    per_page: 15,
    sort_by: 'created_at',
    sort_dir: 'desc',
    ...initialFilters,
  });

  // ========== Fetch All ==========
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await productService.getAll(filters);
      setProducts(response.data.data);
      setMeta(response.data.meta);
      setLinks(response.data.links);
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to fetch products';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  // ========== Fetch Single ==========
  const fetchProduct = useCallback(async (id: number) => {
    setIsLoading(true);
    try {
      const response = await productService.getById(id);
      console.log('useProducts1.fetchProduct - raw response:', response);
      console.log('useProducts1.fetchProduct - response.data:', response.data);
      setSelectedProduct(response.data);
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to fetch product';
      toast.error(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ========== Create ==========
  const createProduct = useCallback(
    async (data: ProductFormData): Promise<Product | null> => {
      setIsLoading(true);
      try {
        const response = await productService.create(data);
        toast.success(response.message || 'Product created successfully');
        await fetchProducts(); // Refresh list
        return response.data;
      } catch (err: any) {
        const message = err.response?.data?.message || 'Failed to create product';
        toast.error(message);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchProducts]
  );

  // ========== Update ==========
  const updateProduct = useCallback(
    async (id: number, data: ProductUpdateFormData): Promise<Product | null> => {
      setIsLoading(true);
      try {
        const response = await productService.update(id, data);
        toast.success(response.message || 'Product updated successfully');
        await fetchProducts(); // Refresh list
        return response.data;
      } catch (err: any) {
        const message = err.response?.data?.message || 'Failed to update product';
        toast.error(message);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchProducts]
  );

  // ========== Delete (soft) ==========
  const deleteProduct = useCallback(
    async (id: number): Promise<boolean> => {
      setIsLoading(true);
      try {
        const response = await productService.delete(id);
        toast.success(response.message || 'Product deleted successfully');
        await fetchProducts();
        return true;
      } catch (err: any) {
        const message = err.response?.data?.message || 'Failed to delete product';
        toast.error(message);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchProducts]
  );

  // ========== Restore ==========
  const restoreProduct = useCallback(
    async (id: number): Promise<boolean> => {
      setIsLoading(true);
      try {
        const response = await productService.restore(id);
        toast.success(response.message || 'Product restored successfully');
        await fetchProducts();
        return true;
      } catch (err: any) {
        const message = err.response?.data?.message || 'Failed to restore product';
        toast.error(message);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchProducts]
  );

  // ========== Force Delete ==========
  const forceDeleteProduct = useCallback(
    async (id: number): Promise<boolean> => {
      setIsLoading(true);
      try {
        const response = await productService.forceDelete(id);
        toast.success(response.message || 'Product permanently deleted');
        await fetchProducts();
        return true;
      } catch (err: any) {
        const message = err.response?.data?.message || 'Failed to permanently delete product';
        toast.error(message);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchProducts]
  );

  // ========== Bulk Delete ==========
  const bulkDeleteProducts = useCallback(
    async (ids: number[]): Promise<boolean> => {
      setIsLoading(true);
      try {
        await productService.bulkAction({
          product_ids: ids,
          bulk: { action: 'delete' },
        });
        toast.success(`${ids.length} products deleted successfully`);
        await fetchProducts();
        return true;
      } catch (err: any) {
        toast.error('Failed to delete products');
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchProducts]
  );

  // ========== Bulk Status ==========
  const bulkUpdateStatus = useCallback(
    async (ids: number[], is_active: boolean): Promise<boolean> => {
      setIsLoading(true);
      try {
        await productService.bulkAction({
          product_ids: ids,
          bulk: { action: is_active ? 'activate' : 'deactivate' },
        });
        toast.success(`${ids.length} products ${is_active ? 'activated' : 'deactivated'}`);
        await fetchProducts();
        return true;
      } catch (err: any) {
        toast.error('Failed to update status');
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchProducts]
  );

  // ========== Bulk Action (generic) ==========
  const executeBulkAction = useCallback(
    async (ids: number[], action: BulkAction): Promise<boolean> => {
      setIsLoading(true);
      try {
        await productService.bulkAction({ product_ids: ids, bulk: action });
        toast.success('Bulk action completed');
        await fetchProducts();
        return true;
      } catch (err: any) {
        toast.error('Bulk action failed');
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchProducts]
  );

  // ========== Toggle Flag ==========
  const toggleFlag = useCallback(
    async (id: number, flag: 'is_active' | 'is_featured' | 'is_new' | 'is_on_sale' | 'allow_backorder' | 'is_tracked', value: boolean): Promise<boolean> => {
      try {
        const response = await productService.toggleFlag(id, flag, value);
        toast.success(response.message || `${flag} updated`);
        await fetchProducts();
        return true;
      } catch (err: any) {
        toast.error('Failed to toggle status');
        return false;
      }
    },
    [fetchProducts]
  );

  // ========== Filter Helpers ==========
  const updateFilters = useCallback((newFilters: Partial<ProductFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: newFilters.page ?? 1, // Reset to page 1 on filter change unless page is explicitly given
    }));
  }, []);

  const goToPage = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      page: 1,
      per_page: 15,
      sort_by: 'created_at',
      sort_dir: 'desc',
    });
  }, []);

  // ========== Auto Fetch ==========
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    // Data
    products,
    selectedProduct,
    // State
    isLoading,
    error,
    meta,
    links,
    filters,
    // CRUD
    fetchProducts,
    fetchProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    restoreProduct,
    forceDeleteProduct,
    // Bulk
    bulkDeleteProducts,
    bulkUpdateStatus,
    executeBulkAction,
    // Flags
    toggleFlag,
    // Filters
    updateFilters,
    goToPage,
    resetFilters,
    setSelectedProduct,
  };
};