import { useState, useEffect, useCallback } from 'react'
import brandService from '../../api/services/brandService'
import type {
  Brand,
  BrandCreateData,
  BrandUpdateData,
  BrandFilters,
} from '../../types/brand.types'

import toast from 'react-hot-toast'
import { generateSlug } from '../../utils/helpers'

export const useBrand = (initialFilters?: BrandFilters) => {
      const [brands, setBrands] = useState<Brand[]>([])
    //   const [brandCategory, set] = useState<CategoryTree[]>([])
      const [selecteBrand, setSelectedBrand] = useState<Brand | null>(null)
      const [isLoading, setIsLoading] = useState(false)
      const [error, setError] = useState<string | null>(null)

      // pagination

  const [meta, setMeta] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
  })

  // Filters
  
     const [filters, setFilters] = useState<BrandFilters>(
      initialFilters || { page: 1, per_page: 10 }
    )

    // ========== FETCH ALL ==========

   const fetchBrands = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try{
        const response = await brandService.getAll(filters)
        console.log("API response:", response)
        // setCategories(Array.isArray(response.data) ? response.data : [])
        setBrands(response.data.data)

  // pagination info
  setMeta(response.data.meta ?? { current_page: 1, last_page: 1, per_page: 10, total: 0 })

  
    }catch(err: any){
      console.error("Fetch error:", err)
      const message = err.response?.data?.message || 'Failed to fetch brands'
      setError(message)
      toast.error(message)
    }finally{
        setIsLoading(false)
    }
   }, [filters])

   // ========== FETCH SINGLE ==========
  const fetchBrand = useCallback(async (id: number) => {
    setIsLoading(true)
    try {
      const response = await brandService.getById(id, 'name')
      setSelectedBrand(response.data)
      return response.data
    } catch (err: any) {
      toast.error('Failed to fetch Brand')
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  // ========== CREATE ==========
  const createBrand = useCallback(
    async (data: BrandCreateData): Promise<Brand | null> => {
      setIsLoading(true)
      try {
        console.log("Creating Brand with data:", data)
        const payload = {
        ...data,
        slug: generateSlug(data.name) // adding slug here
      }
        const response = await brandService.create(payload)
        toast.success(response.message || 'Brand created successfully')
        await fetchBrands() // Refresh list
        return response.data
      } catch (err: any) {
         console.log("❌ FULL ERROR:", err)
         console.log("❌ RESPONSE:", err.response)
         console.log("❌ DATA:", err.response?.data)
         console.log("❌ ERRORS:", err.response?.data?.errors)
        const message = err.response?.data?.message || 'Failed to create Brand'
        toast.error(message)
        return null
      } finally {
        setIsLoading(false)
      }
    },
    [fetchBrands]
  )

  // ========== UPDATE ==========
  const updateBrand = useCallback(
    async (id: number, data: BrandUpdateData): Promise<Brand | null> => {
      setIsLoading(true)
      try {
        const response = await brandService.update(id, data)
        toast.success(response.message || 'Brand updated successfully')
        await fetchBrands() // Refresh list
        return response.data
      } catch (err: any) {
        const message = err.response?.data?.message || 'Failed to update brands'
        toast.error(message)
        return null
      } finally {
        setIsLoading(false)
      }
    },
    [fetchBrands]
  )

  // ========== DELETE ==========
  const deleteBrand = useCallback(
    async (id: number): Promise<boolean> => {
      setIsLoading(true)
      try {
        const response = await brandService.delete(id)
        toast.success(response.message || 'Brand deleted successfully')
        await fetchBrands() // Refresh list
        return true
      } catch (err: any) {
        const message = err.response?.data?.message || 'Failed to delete brand'
        toast.error(message)
        return false
      } finally {
        setIsLoading(false)
      }
    },
    [fetchBrand]
  )

  const bulkDeleteBrands = useCallback(
    async (ids: number[]): Promise<boolean> => {
      setIsLoading(true)
      try {
        await brandService.bulkDelete(ids)
        toast.success(`${ids.length} brands deleted successfully`)
        await fetchBrands()
        return true
      } catch (err: any) {
        toast.error('Failed to delete brands')
        return false
      } finally {
        setIsLoading(false)
      }
    },
    [fetchBrands]
  )

  // ========== BULK DELETE ==========
  const bulkUpdateStatus = useCallback(
    async (ids: number[], is_active: boolean): Promise<boolean> => {
      setIsLoading(true)
      try {
        await brandService.bulkUpdateStatus(ids, is_active)
        toast.success(
          `${ids.length} brands ${is_active ? 'activated' : 'deactivated'}`
        )
        await fetchBrands()
        return true
      } catch (err: any) {
        toast.error('Failed to update status')
        return false
      } finally {
        setIsLoading(false)
      }
    },
    [fetchBrands]
  )

  // ========== REORDER ==========
  const reorderBrands = useCallback(
    async (
      orderedIds: { id: number; sort_order: number; parent_id?: number | null }[]
    ): Promise<boolean> => {
      try {
        await brandService.reorder(orderedIds)
        toast.success('Brands reordered successfully')
        await fetchBrands()
        return true
      } catch (err: any) {
        toast.error('Failed to reorder Brands')
        return false
      }
    },
    [fetchBrands]
  )

  // ========== IMAGE ==========
  const uploadBrandLogo = useCallback(
    async (id: number, image: File): Promise<boolean> => {
      try {
        await brandService.uploadImage(id, image)
        toast.success('Image uploaded successfully')
        await fetchBrands()
        return true
      } catch (err: any) {
        toast.error('Failed to upload image')
        return false
      }
    },
    [fetchBrands]
  )

  const deleteBrandLogo = useCallback(
    async (id: number): Promise<boolean> => {
      try {
        await brandService.deleteImage(id)
        toast.success('Image deleted successfully')
        await fetchBrands()
        return true
      } catch (err: any) {
        toast.error('Failed to delete image')
        return false
      }
    },
    [fetchBrands]
  )

  // ========== FILTER HELPERS ==========
    const updateFilters = useCallback((newFilters: Partial<BrandFilters>) => {
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
      fetchBrands()
    }, [fetchBrands])

    return {
        // Data
        brands,
        selecteBrand,

        // State
        isLoading,
        error,
        meta,
        filters,

         // CRUD
        fetchBrands,
        fetchBrand,
        createBrand,
        updateBrand,
        deleteBrand,

        // Bulk
        bulkDeleteBrands,
        bulkUpdateStatus,

        // Reorder
        reorderBrands,

            // Image
        uploadBrandLogo,
        deleteBrandLogo,

        // Filters
        updateFilters,
        goToPage,
        resetFilters,
        setSelectedBrand,
    }

}