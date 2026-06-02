import { useState, useEffect, useCallback, useRef } from 'react';
import { productService } from '../../api/services/productService';
import type {
  Product,
  ProductFilters,
  PaginationMeta,
  PaginationLinks,
  BulkAction,
} from '../../types/product.types';

// ─── Types ───────────────────────────────────────────────────────

interface UseProductsReturn {
  products: Product[];
  meta: PaginationMeta | null;
  links: PaginationLinks | null;
  loading: boolean;
  error: string | null;

  // Filters
  filters: ProductFilters;
  setFilters: (filters: ProductFilters) => void;
  updateFilter: <K extends keyof ProductFilters>(key: K, value: ProductFilters[K]) => void;
  resetFilters: () => void;
  goToPage: (page: number) => void;
  refetch: () => void;

  // Selection
  selectedIds: Set<number>;
  toggleSelected: (id: number) => void;
  toggleSelectAll: () => void;
  clearSelection: () => void;
  isAllSelected: boolean;

  // Bulk
  executeBulkAction: (action: BulkAction) => Promise<void>;
  bulkLoading: boolean;
}

const DEFAULT_FILTERS: ProductFilters = {
  page: 1,
  per_page: 15,
  sort_by: 'created_at',
  sort_dir: 'desc',
};

// ─── Hook ────────────────────────────────────────────────────────

export function useProducts(initialFilters?: Partial<ProductFilters>): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [links, setLinks] = useState<PaginationLinks | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFiltersState] = useState<ProductFilters>({
    ...DEFAULT_FILTERS,
    ...initialFilters,
  });
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [bulkLoading, setBulkLoading] = useState(false);

  const abortRef = useRef<AbortController | null>(null);

   // ─── Fetch ─────────────────────────────────────

  const fetchProducts = useCallback(async () =>{
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    try{
       const response = await productService.getAll(filters)

       if(controller.signal.aborted) return;

       if (response.success) {
        setProducts(response.data.data);
        setMeta(response.data.meta);
        setLinks(response.data.links);
      } else {
        setError(response.message ?? 'Failed to fetch products');
      }

    } catch(err){
       if (controller.signal.aborted) return;
      setError(err instanceof Error ? err.message : 'Unknown error');
    }finally{
        if(!controller.signal.aborted) setLoading(false);
    }
  }, [filters])

  useEffect(() => {
    fetchProducts();
    return () => abortRef.current?.abort();
  }, [fetchProducts])

   // Clear selection when data changes
  useEffect(() => setSelectedIds(new Set()), [products]);

    // ─── Filter helpers ────────────────────────────

  const setFilters = useCallback((next: ProductFilters) => {
    setFiltersState(next);
  }, []);

  const updateFilter = useCallback(
    <K extends keyof ProductFilters>(key: K, value: ProductFilters[K]) => {
      setFiltersState((prev) => ({
        ...prev,
        [key]: value,
        // Reset to page 1 when any filter changes (except page itself)
        ...(key !== 'page' ? { page: 1 } : {}),
      }));
    },
    [],
  );

  const resetFilters = useCallback(() => setFiltersState(DEFAULT_FILTERS), []);

  const goToPage = useCallback((page: number) => {
    setFiltersState((prev) => ({ ...prev, page }));
  }, []);

  // ─── Selection ─────────────────────────────────

  const toggleSelected = useCallback((id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);


   const isAllSelected = products.length > 0 && products.every((p) => selectedIds.has(p.id));

  const toggleSelectAll = useCallback(() => {
    setSelectedIds(isAllSelected ? new Set() : new Set(products.map((p) => p.id)));
  }, [isAllSelected, products]);

  const clearSelection = useCallback(() => setSelectedIds(new Set()), []);

  // ─── Bulk Actions ─────────────────────────────

  const executeBulkAction = useCallback(
    async (action: BulkAction) => {
      setBulkLoading(true);
      try {
        await productService.bulkAction({
          product_ids: Array.from(selectedIds),
          bulk: action,
        });
        clearSelection();
        await fetchProducts();
      } finally {
        setBulkLoading(false);
      }
    },
    [selectedIds, fetchProducts, clearSelection],
  );

  return {
     products,
    meta,
    links,
    loading,
    error,
    filters,
    setFilters,
    updateFilter,
    resetFilters,
    goToPage,
    refetch: fetchProducts,
    selectedIds,
    toggleSelected,
    toggleSelectAll,
    clearSelection,
    isAllSelected,
    executeBulkAction,
    bulkLoading,
  }
}
