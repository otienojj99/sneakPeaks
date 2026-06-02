import { useState, useEffect, useCallback } from 'react';
import { inventoryCountService } from '../../api/services/inventoryCountService';
import toast from 'react-hot-toast';
import type { InventoryCount, InventoryCountCreateData, InventoryCountUpdateData, InventoryFilters } from '../../types/inventory.types';
// import { ca } from 'date-fns/locale';

export const useInventoryCounts = (initialFilters?: InventoryFilters) => {
    const [counts, setCounts] = useState<InventoryCount[]>([]);
    const [loading, setLoading] = useState(false);
    const [meta, setMeta] = useState({ current_page: 1, last_page: 1, per_page: 10, total: 0 });
    const [filters, setFilters] = useState<InventoryFilters>({
    page: 1,
    per_page: 10,
    ...initialFilters,
  });

  const fetchCounts = useCallback(async () => {
    setLoading(true);

    try{
        const result = await inventoryCountService.getAllInventoryCounts(filters);
        setCounts(result.data.data);
        setMeta(result.data.meta);
    }catch(err: any){
        const msg = err.response?.data?.message || 'Failed to fetch inventory counts';
        toast.error(msg);
    }finally{
        setLoading(false);
    }
  }, [filters]);

  useEffect(() => {fetchCounts();}, [fetchCounts]);

  const createCount = ( async (data: InventoryCountCreateData) => {
    try{
        const result = await inventoryCountService.createInventoryCount(data);
         toast.success('Inventory count created');
          await fetchCounts();
          return result.data;
    }catch(err: any){
        const msg = err.response?.data?.message || 'Failed to create inventory count';
        toast.error(msg);
        return null;
    }
  })


  const updateCount =  async (id: number, data: InventoryCountUpdateData) => {
    try{
        const result = await inventoryCountService.updateInventoryCount(id, data);
         toast.success('Updated');
      await fetchCounts();
      return result.data;
    }catch(err: any){
        const msg = err.response?.data?.message || 'Failed to update inventory count';
        toast.error(msg);
        return null;
    }
    
  }

  const deleteCount = async (id: number) => {
        try{
            await inventoryCountService.deleteInventoryCount(id);
            toast.success('Deleted');
            await fetchCounts();
        }catch(err: any){
            const msg = err.response?.data?.message || 'Failed to delete inventory count';
            toast.error(msg);
        }
    }

    const restoreCount  = async (id: number) => {
        try{
            await inventoryCountService.restoreInventoryCount(id);
            toast.success('Restored');
            await fetchCounts();
        }catch(err: any){
            const msg = err.response?.data?.message || 'Failed to restore inventory count';
            toast.error(msg);
        }
    }

     const changeStatus = async (id: number, status: InventoryCount['status']) =>{
        try{
            await inventoryCountService.changeStatus(id, status);
            toast.success('Status updated');
            await fetchCounts();
        }catch(err: any){
            const msg = err.response?.data?.message || 'Failed to update status';
            toast.error(msg);
        }
     }

     // ========== FILTER HELPERS ==========
           const updateFilters = useCallback((newFilters: Partial<InventoryFilters>) => {
             setFilters((prev) => ({
               ...prev,
               ...newFilters,
               page: newFilters.page || 1, // Reset to page 1 on filter change
             }))
           }, [])
         
           const goToPage = useCallback((page: number) => {
             setFilters((prev) => ({ ...prev, page }))
           }, [])
         
           const resetFilters = useCallback(() => {
             setFilters({ page: 1, per_page: 10 })
           }, [])
         
           // ========== AUTO FETCH ==========
           useEffect(() => {
             fetchCounts()
           }, [fetchCounts])


        return {
            counts,
            loading,
            meta,
            filters,
            // Actions
            createCount,
            updateCount,
            deleteCount,
            restoreCount,
            changeStatus,
            // Filter helpers
            updateFilters,
            goToPage,
            resetFilters,
            refresh: fetchCounts,
        }
}