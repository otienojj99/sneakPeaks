import { useState, useEffect, useCallback } from 'react';
import { discountService } from '../../api/services/discountService';
import type {
  Discount,
  DiscountCreateData,
  DiscountUpdateData,
  DiscountFilters,
  PaginationMeta,
  PaginationLinks,
} from '../../types/product.types';
import toast from 'react-hot-toast';

export const useDiscounts = (initialFilters?: Partial<DiscountFilters>) =>{
    const [discounts, setDiscounts] = useState<Discount[]>([]);
    const [selectedDiscount, setSelectedDiscount] = useState<Discount | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
   const [meta, setMeta] = useState<PaginationMeta>({
    current_page: 1,
    last_page: 1,
    per_page: 20,
    total: 0,
    from: 0,
    to: 0,
    path: '',
    links: [],
   });

   const [links, setLinks] = useState<PaginationLinks | null>(null);
   const [filters, setFilters] = useState<DiscountFilters>({
    page: 1,
    per_page: 20,
    ...initialFilters,
  });

  // ========== Fetch All Discounts ==========
  const fetchDiscounts = useCallback(async () =>{
    setIsLoading(true);
    setError(null);

    try {
      const response = await discountService.getAll(filters);
      setDiscounts(response.data.data);
      setMeta(response.data.meta);
      setLinks(response.data.links);
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to fetch discounts';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  // Fetch Single Discount

  const fetchDiscount = useCallback(async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await discountService.getById(id);
      setSelectedDiscount(response.data);
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to fetch discount';
      toast.error(message);
      return null;
    } finally {
      setIsLoading(false);
      setError(null);
    }

  }, []);

  // ========== Create Discount ==========

  const createDiscount = useCallback(async (data: DiscountCreateData) => {
    setIsLoading(true);
    setError(null);

     try {
      const response = await discountService.create(data);
      toast.success(response.message || 'Discount created successfully');
      await fetchDiscounts();
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to create discount';
      toast.error(message);
      return null;
    } finally {
      setIsLoading(false);
      setError(null);
    }
  }, [fetchDiscounts]);

    // ========== Update Discount ==========
    const updateDiscount = useCallback(async (id: number, data: DiscountUpdateData) => {
    setIsLoading(true);
    setError(null);

    try {
        const response = await discountService.update(id, data);
        toast.success(response.message || 'Discount updated successfully');
      await fetchDiscounts();
      return response.data;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to update discount';
      toast.error(message);
      return null;
    } finally {
      setIsLoading(false);
      setError(null);
    }
  }, [fetchDiscounts]);

   // ---- Delete (soft) ----

   const deleteDiscount = useCallback(async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
        const response = await discountService.delete(id);
         toast.success(response.message || 'Discount deleted successfully');
        await fetchDiscounts();

        return true;
    }catch (err: any) {
     const message = err.response?.data?.message || 'Failed to delete discount';
      toast.error(message);
      return false;
    }
    finally {
        setIsLoading(false);
        
    }
   }, [fetchDiscounts]);

    // ---- Restore 

    const restoreDiscount = useCallback(async (id: number) => {
    setIsLoading(true);
     try {
      const response = await discountService.restore(id);
      toast.success(response.message || 'Discount restored successfully');
      await fetchDiscounts();
      return true;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to restore discount';
      toast.error(message);
      return false;
    } finally {
      setIsLoading(false);
    }
    }, [fetchDiscounts]);

    // ---- Toggle Active ----
  const toggleActive = useCallback(async (id: number) =>{
    setIsLoading(true);
    try{
     const response = await discountService.toggleActive(id);
      toast.success(response.message || 'Discount status toggled');
      await fetchDiscounts();
      return true;
    } catch (err: any) {
      const message = err.response?.data?.message || 'Failed to toggle discount status';
      toast.error(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [fetchDiscounts]);

   const updateFilters = useCallback((newFilters: Partial<DiscountFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: newFilters.page ?? 1,
    }));
  }, []);

   const goToPage = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      page: 1,
      per_page: 20,
    });
  }, []);

  // ---- Auto-fetch on filter change ----
  useEffect(() => {
    fetchDiscounts();
  }, [fetchDiscounts]);

  return {
     // Data
    discounts,
    selectedDiscount,
    setSelectedDiscount,
    // State
    isLoading,
    error,
    meta,
    links,
    filters,
    // CRUD
    fetchDiscounts,
    fetchDiscount,
    createDiscount,
    updateDiscount,
    deleteDiscount,
    restoreDiscount,
    toggleActive,
    // Filters
    updateFilters,
    goToPage,
    resetFilters,
  }

}