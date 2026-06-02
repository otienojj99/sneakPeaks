import { useState, useEffect, useCallback } from 'react'
import warehouseService from '../../api/services/warehouseService'
import type {
  Warehouse,
  WarehouseCreateData,
  WarehouseUpdateData,
  WarehouseFilters,
} from '../../types/warehouse.types'

import toast from 'react-hot-toast'
// import { generateSlug } from '../../utils/helpers'

export const useWarehouse = (initialFilters?: WarehouseFilters) => {

    const [warehouse, setWarehouse] = useState<Warehouse[]>([])
    const [selecteWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [meta, setMeta] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  })

  // Filters
    
    const [filters, setFilters] = useState<WarehouseFilters>(
    initialFilters || { page: 1, per_page: 10 }
    )

    const fetchWarehouses = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try{
        const response = await warehouseService.getAll(filters)
        console.log("API response:", response)
        // setCategories(Array.isArray(response.data) ? response.data : [])
        setWarehouse(response.data.data)

  // pagination info
  setMeta(response.data.meta ?? { current_page: 1, last_page: 1, per_page: 10, total: 0 })

  
    }catch(err: any){
      console.error("Fetch error:", err)
      const message = err.response?.data?.message || 'Failed to fetch warehouse'
      setError(message)
      toast.error(message)
    }finally{
        setIsLoading(false)
    }
   }, [filters])
    
   // ========== FETCH SINGLE ==========
  const fetchWarehouse = useCallback(async (id: number) => {
    setIsLoading(true)
    try {
      const response = await warehouseService.getById(id, 'name')
      setSelectedWarehouse(response.data)
      return response.data
    } catch (err: any) {
      toast.error('Failed to fetch Brand')
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])


  // ========== CREATE ==========
  const createWarehouse = useCallback(
    async (data: WarehouseCreateData): Promise<Warehouse | null> => {
      setIsLoading(true)
      try {
        console.log("Creating Warehouse with data:", data)
        const payload = {
        ...data
      }
        const response = await warehouseService.create(payload)
        toast.success(response.message || 'Warehouse created successfully')
        await fetchWarehouses() // Refresh list
        return response.data
      } catch (err: any) {
         console.log("❌ FULL ERROR:", err)
         console.log("❌ RESPONSE:", err.response)
         console.log("❌ BODY:", err.body)
         const apiPayload = err.body ?? err.response?.data
         const message =
           apiPayload && typeof apiPayload === 'object'
             ? (apiPayload.message || apiPayload.error)
             : err.message || 'Failed to create Warehouse'
         const validationErrors =
           apiPayload && typeof apiPayload === 'object'
             ? apiPayload.errors ?? null
             : null
         if (validationErrors) {
           console.error('Validation errors:', validationErrors)
         } else {
           console.error(message)
         }
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [fetchWarehouses]
  )

  // ========== UPDATE ==========
  const updateWarehouse = useCallback(
    async (id: number, data: WarehouseUpdateData): Promise<Warehouse | null> => {
      setIsLoading(true)
      try {
        const response = await warehouseService.update(id, data)
        toast.success(response.message || 'Warehouse updated successfully')
        await fetchWarehouses() // Refresh list
        return response.data
      } catch (err: any) {
        const apiPayload = err.body ?? err.response?.data
        const message =
          apiPayload && typeof apiPayload === 'object'
            ? (apiPayload.message || apiPayload.error)
            : err.message || 'Failed to update Warehouse'
        console.error(message)
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    [fetchWarehouses]
  )

  
  // ========== Delete (soft) ==========
  const deleteWarehouse = useCallback(
    async (id: number): Promise<boolean> => {
      setIsLoading(true);
      try {
        const response = await warehouseService.delete(id);
        toast.success(response.message || 'Warehouse deleted successfully');
        await fetchWarehouses();
        return true;
      } catch (err: any) {
        const message = err.response?.data?.message || 'Failed to delete Warehouse';
        toast.error(message);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchWarehouses]
  )

  // ========== Restore ==========
  const restoreWarehouse = useCallback(
    async (id: number): Promise<boolean> => {
      setIsLoading(true);
      try {
        const response = await warehouseService.restore(id);
        toast.success(response.message || 'Warehouse restored successfully');
        await fetchWarehouses();
        return true;
      } catch (err: any) {
        const message = err.response?.data?.message || 'Failed to restoreWarehouse';
        toast.error(message);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchWarehouses]
  );

  // ========== Force Delete ==========
  const forceDeleteWarehouse = useCallback(
    async (id: number): Promise<boolean> => {
      setIsLoading(true);
      try {
        const response = await warehouseService.forceDelete(id);
        toast.success(response.message || 'warehouse permanently deleted');
        await fetchWarehouses();
        return true;
      } catch (err: any) {
        const message = err.response?.data?.message || 'Failed to permanently delete warehouse';
        toast.error(message);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchWarehouses]
  );


   // ========== BULK DELETE ==========
   const bulkDeleteWarehouse = useCallback(
    async (ids: number[]): Promise<boolean> => {
      setIsLoading(true)
      try {
        await warehouseService.bulkDelete(ids)
        toast.success(`${ids.length} warehouse deleted successfully`)
        await fetchWarehouses()
        return true
      } catch (err: any) {
        toast.error('Failed to delete warehouse')
        return false
      } finally {
        setIsLoading(false)
      }
    },
    [fetchWarehouses]
  )
  const bulkUpdateStatus = useCallback(
    async (ids: number[], is_active: boolean): Promise<boolean> => {
      setIsLoading(true)
      try {
        await warehouseService.bulkUpdateStatus(ids, is_active)
        toast.success(
          `${ids.length} brands ${is_active ? 'activated' : 'deactivated'}`
        )
        await fetchWarehouses()
        return true
      } catch (err: any) {
        toast.error('Failed to update status')
        return false
      } finally {
        setIsLoading(false)
      }
    },
    [fetchWarehouses]
  )

  // ========== FILTER HELPERS ==========
      const updateFilters = useCallback((newFilters: Partial<WarehouseFilters>) => {
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
        fetchWarehouses()
      }, [fetchWarehouses])


     return {
        // Data
        warehouse,
        selecteWarehouse,

        // State
        isLoading,
        error,
        meta,
        filters,

         // CRUD
        fetchWarehouses,
        fetchWarehouse,
        createWarehouse,
        updateWarehouse,
        deleteWarehouse,

        // Bulk
        bulkDeleteWarehouse,
        bulkUpdateStatus,



        // Filters
        updateFilters,
        goToPage,
        resetFilters,
        setSelectedWarehouse,
    };





}