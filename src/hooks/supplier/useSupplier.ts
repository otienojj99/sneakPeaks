import { useState, useEffect, useCallback } from 'react'
import supplierService from '../../api/services/supplierService'
import type {
  Supplier,
  SupplierCreateData,
  SupplierUpdateData,
  SupplierFilters,
} from '../../types/supplier.types'
import toast from 'react-hot-toast'


export const useSupplier = (initialFilters?: SupplierFilters) => {
    const [supplier, setSupplier] = useState<Supplier[]>([])
    const [selecteSupplier, setSelectedSupplier] = useState<Supplier | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [meta, setMeta] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  })

  // Filters

  const [filters, setFilters] = useState<SupplierFilters>(
    initialFilters || { page: 1, per_page: 10 }
  )

  const fetchSuppliers = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try{
        const response = await supplierService.getAll(filters)
        console.log("API response:", response)
        setSupplier(response.data.data)
        setMeta(response.data.meta ?? { current_page: 1, last_page: 1, per_page: 10, total: 0 })
    } catch (err: any) {
         console.error("Fetch error:", err)
         const message = err.response?.data?.message || 'Failed to fetch suppliers'
        setError(message)
        toast.error(message)
    } finally {
        setIsLoading(false)
    }
  }, [filters])

  // ========== FETCH SINGLE ==========

  const fetchSupplier = useCallback(async (id: number) => {
    setIsLoading(true)
    setError(null)

    try {
        const response = await supplierService.getById(id, 'name')
        setSelectedSupplier(response.data)
    } catch (err: any) {
        console.error("Fetch error:", err)
        const message = err.response?.data?.message || 'Failed to fetch supplier'
        setError(message)
        toast.error(message)
    } finally {
        setIsLoading(false)
    }
  }, [])

  // ========== CREATE ==========

  const createSupplier = useCallback(async (data: SupplierCreateData) => {
    setIsLoading(true)
    setError(null)
    try{
        const response = await supplierService.create(data)
        toast.success("Supplier created successfully")
        await fetchSuppliers() // Refresh list after creation
        return response.data

    }catch(err: any){
       console.log("❌ FULL ERROR:", err)
         console.log("❌ RESPONSE:", err.response)
         console.log("❌ BODY:", err.body)
        const message = err.response?.data?.message || 'Failed to create supplier'
        setError(message)
        toast.error(message)
        return null
    }finally{
        setIsLoading(false)
    }
  }, [fetchSuppliers])


  // ========== UPDATE ==========
  const updateSupplier = useCallback(async (id: number, data: SupplierUpdateData) => {
    setIsLoading(true)
    setError(null)
    try{
        const response = await supplierService.update(id, data)
        toast.success("Supplier updated successfully")
        await fetchSuppliers() // Refresh list after update
        return response.data
    }catch(err: any){
          console.log("❌ FULL ERROR:", err)
          console.log("❌ RESPONSE:", err.response)
          console.log("❌ BODY:", err.body)
      const apiPayload = err.body ?? err.response?.data
        const message =
          apiPayload && typeof apiPayload === 'object'
            ? (apiPayload.message || apiPayload.error)
            : err.message || 'Failed to update supplier'
        console.error(message)
        setError(message)
        toast.error(message)
        throw err
    }finally{
        setIsLoading(false)
    }
  }, [fetchSuppliers])
  
  //========== DELETE ==========
  const deleteSupplier = useCallback(async (id: number): Promise<boolean> => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await supplierService.delete(id)
      toast.success(response.message || 'Supplier deleted successfully')
      await fetchSuppliers() // Refresh list after deletion
      return true
    }catch(err: any){
        console.log("❌ FULL ERROR:", err)
          console.log("❌ RESPONSE:", err.response)
          console.log("❌ BODY:", err.body)
      const message = err.body ?? err.response?.data ? (err.body?.message || err.response?.data?.message || 'Failed to delete supplier') : err.message || 'Failed to delete supplier'
      setError(message)
      toast.error(message)
      return false
    }finally{
        setIsLoading(false)
    }
  }, [fetchSuppliers])

  // ========== Restore ==========

  const restoreSupplier = useCallback(async (id: number): Promise<boolean>  => {
    setIsLoading(true)
    
    try{
        const response = await supplierService.restore(id)
        toast.success(response.message || 'Supplier restored successfully')
        await fetchSuppliers() // Refresh list after restoration
        return true
    }catch(err: any){
        console.log("❌ FULL ERROR:", err)
          console.log("❌ RESPONSE:", err.response)
          console.log("❌ BODY:", err.body)
      const message = err.body ?? err.response?.data ? (err.body?.message || err.response?.data?.message || 'Failed to restore supplier') : err.message || 'Failed to restore supplier'
      setError(message)
      toast.error(message)
      return false
    }finally{
        setIsLoading(false)
    }
  }, [fetchSuppliers])

  // ========== Force Delete ==========

  const forceDeleteSupplier = useCallback(async (id: number): Promise<boolean> => {
    setIsLoading(true)
    try{
        const response = await supplierService.forceDelete(id)
        toast.success(response.message || 'Supplier permanently deleted successfully')
        await fetchSuppliers() // Refresh list after force deletion
        return true
    }catch(err: any){
        console.log("❌ FULL ERROR:", err)
          console.log("❌ RESPONSE:", err.response)
          console.log("❌ BODY:", err.body)
      const message = err.body ?? err.response?.data ? (err.body?.message || err.response?.data?.message || 'Failed to force delete supplier') : err.message || 'Failed to force delete supplier'
      setError(message)
      toast.error(message)
      return false
    }finally{
        setIsLoading(false)
    }
  }, [fetchSuppliers])

  // ========== BULK DELETE ==========

  const bulkDeleteSuppliers = useCallback(async (ids: number[]): Promise<boolean> => {
    setIsLoading(true)
    try{
        const response = await supplierService.bulkDelete(ids)
        toast.success(response.message || `${ids.length} Suppliers deleted successfully`)
        await fetchSuppliers() // Refresh list after bulk deletion
        return true
    }catch(err: any){
        console.log("❌ FULL ERROR:", err)
          console.log("❌ RESPONSE:", err.response)
          console.log("❌ BODY:", err.body)
      const message = err.body ?? err.response?.data ? (err.body?.message || err.response?.data?.message || 'Failed to delete suppliers') : err.message || 'Failed to delete suppliers'
      setError(message)
      toast.error(message)
      return false
    }finally{
        setIsLoading(false)
    }
  }, [fetchSuppliers])

  const bulkUpdateSuppliers = useCallback(async (ids: number[], is_active: boolean): Promise<boolean> => {
    setIsLoading(true)
    try{
        const response = await supplierService.bulkUpdateStatus(ids, is_active)
        toast.success(response.message || `${ids.length} suppliers ${is_active ? 'activated' : 'deactivated'}`)
        await fetchSuppliers() // Refresh list after bulk update
        return true
    }catch(err: any){
        console.log("❌ FULL ERROR:", err)
          console.log("❌ RESPONSE:", err.response)
          console.log("❌ BODY:", err.body)
      const message = err.body ?? err.response?.data ? (err.body?.message || err.response?.data?.message || 'Failed to update suppliers') : err.message || 'Failed to update suppliers'
      setError(message)
      toast.error(message)
      return false
    }finally{
        setIsLoading(false)

    }
  }, [fetchSuppliers])

  // ========== FILTER HELPERS ==========
        const updateFilters = useCallback((newFilters: Partial<SupplierFilters>) => {
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
          fetchSuppliers()
        }, [fetchSuppliers])


        return{
            supplier,
            selecteSupplier,
            isLoading,
            error,  
            meta,
            filters,
            // Actions
            fetchSuppliers,
            fetchSupplier,
            createSupplier,
            updateSupplier,
            deleteSupplier,
            restoreSupplier,
            forceDeleteSupplier,
            bulkDeleteSuppliers,
            bulkUpdateSuppliers,
            // Filter Helpers
            updateFilters,
            goToPage,
            resetFilters,
        }
}