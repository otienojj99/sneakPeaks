import { useState, useEffect, useCallback } from 'react'
import categoryService from '../api/services/categoryService'
import type {
  Category,
  CategoryCreateData,
  CategoryUpdateData,
  CategoryFilters,
  CategoryTree,
} from '../types/category.types'
import toast from 'react-hot-toast'
import { generateSlug } from '../utils/helpers'

export const useCategory = (initialFilters?: CategoryFilters) =>{
  const [categories, setCategories] = useState<Category[]>([])
  const [categoryTree, setCategoryTree] = useState<CategoryTree[]>([])
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
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

   const [filters, setFilters] = useState<CategoryFilters>(
    initialFilters || { page: 1, per_page: 10 }
  )

   // ========== FETCH ALL ==========

   const fetchCategories = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try{
        const response = await categoryService.getAll(filters)
        console.log("API response:", response)
        // setCategories(Array.isArray(response.data) ? response.data : [])
        setCategories(response.data.data)

  // pagination info
  setMeta(response.data.meta ?? { current_page: 1, last_page: 1, per_page: 10, total: 0 })

  
    }catch(err: any){
      console.error("Fetch error:", err)
      const message = err.response?.data?.message || 'Failed to fetch categories'
      setError(message)
      toast.error(message)
    }finally{
        setIsLoading(false)
    }
   }, [filters])

   // ========== FETCH TREE ==========
  const fetchTree = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await categoryService.getTree()
      setCategoryTree(response.data)
    } catch (err: any) {
      toast.error('Failed to fetch category tree')
    } finally {
      setIsLoading(false)
    }
  }, [])

  // ========== FETCH SINGLE ==========
  const fetchCategory = useCallback(async (id: number) => {
    setIsLoading(true)
    try {
      const response = await categoryService.getById(id, 'children,parent')
      setSelectedCategory(response.data)
      return response.data
    } catch (err: any) {
      toast.error('Failed to fetch category')
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  // ========== CREATE ==========
  const createCategory = useCallback(
    async (data: CategoryCreateData): Promise<Category | null> => {
      setIsLoading(true)
      try {
        console.log("Creating category with data:", data)
        const payload = {
        ...data,
        slug: generateSlug(data.name) // adding slug here
      }
        const response = await categoryService.create(payload)
        toast.success(response.message || 'Category created successfully')
        await fetchCategories() // Refresh list
        return response.data
      } catch (err: any) {
         console.log("❌ FULL ERROR:", err)
         console.log("❌ RESPONSE:", err.response)
         console.log("❌ DATA:", err.response?.data)
         console.log("❌ ERRORS:", err.response?.data?.errors)
        const message = err.response?.data?.message || 'Failed to create category'
        toast.error(message)
        return null
      } finally {
        setIsLoading(false)
      }
    },
    [fetchCategories]
  )

   // ========== UPDATE ==========
  const updateCategory = useCallback(
    async (id: number, data: CategoryUpdateData): Promise<Category | null> => {
      setIsLoading(true)
      try {
        const response = await categoryService.update(id, data)
        toast.success(response.message || 'Category updated successfully')
        await fetchCategories() // Refresh list
        return response.data
      } catch (err: any) {
        const message = err.response?.data?.message || 'Failed to update category'
        toast.error(message)
        return null
      } finally {
        setIsLoading(false)
      }
    },
    [fetchCategories]
  )

  // ========== DELETE ==========
  const deleteCategory = useCallback(
    async (id: number): Promise<boolean> => {
      setIsLoading(true)
      try {
        const response = await categoryService.delete(id)
        toast.success(response.message || 'Category deleted successfully')
        await fetchCategories() // Refresh list
        return true
      } catch (err: any) {
        const message = err.response?.data?.message || 'Failed to delete category'
        toast.error(message)
        return false
      } finally {
        setIsLoading(false)
      }
    },
    [fetchCategories]
  )

  // ========== BULK DELETE ==========
  const bulkDeleteCategories = useCallback(
    async (ids: number[]): Promise<boolean> => {
      setIsLoading(true)
      try {
        await categoryService.bulkDelete(ids)
        toast.success(`${ids.length} categories deleted successfully`)
        await fetchCategories()
        return true
      } catch (err: any) {
        toast.error('Failed to delete categories')
        return false
      } finally {
        setIsLoading(false)
      }
    },
    [fetchCategories]
  )

  // ========== BULK STATUS ==========
  const bulkUpdateStatus = useCallback(
    async (ids: number[], is_active: boolean): Promise<boolean> => {
      setIsLoading(true)
      try {
        await categoryService.bulkUpdateStatus(ids, is_active)
        toast.success(
          `${ids.length} categories ${is_active ? 'activated' : 'deactivated'}`
        )
        await fetchCategories()
        return true
      } catch (err: any) {
        toast.error('Failed to update status')
        return false
      } finally {
        setIsLoading(false)
      }
    },
    [fetchCategories]
  )

  // ========== REORDER ==========
  const reorderCategories = useCallback(
    async (
      orderedIds: { id: number; sort_order: number; parent_id?: number | null }[]
    ): Promise<boolean> => {
      try {
        await categoryService.reorder(orderedIds)
        toast.success('Categories reordered successfully')
        await fetchCategories()
        return true
      } catch (err: any) {
        toast.error('Failed to reorder categories')
        return false
      }
    },
    [fetchCategories]
  )

  // ========== IMAGE ==========
  const uploadImage = useCallback(
    async (id: number, image: File): Promise<boolean> => {
      try {
        await categoryService.uploadImage(id, image)
        toast.success('Image uploaded successfully')
        await fetchCategories()
        return true
      } catch (err: any) {
        toast.error('Failed to upload image')
        return false
      }
    },
    [fetchCategories]
  )

  const deleteImage = useCallback(
    async (id: number): Promise<boolean> => {
      try {
        await categoryService.deleteImage(id)
        toast.success('Image deleted successfully')
        await fetchCategories()
        return true
      } catch (err: any) {
        toast.error('Failed to delete image')
        return false
      }
    },
    [fetchCategories]
  )

  // ========== FILTER HELPERS ==========
  const updateFilters = useCallback((newFilters: Partial<CategoryFilters>) => {
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
    fetchCategories()
  }, [fetchCategories])

  return {
    // Data
    categories,
    categoryTree,
    selectedCategory,

    // State
    isLoading,
    error,
    meta,
    filters,

    // CRUD
    fetchCategories,
    fetchCategory,
    fetchTree,
    createCategory,
    updateCategory,
    deleteCategory,

    // Bulk
    bulkDeleteCategories,
    bulkUpdateStatus,

    // Reorder
    reorderCategories,

    // Image
    uploadImage,
    deleteImage,

    // Filters
    updateFilters,
    goToPage,
    resetFilters,
    setSelectedCategory,
  }
}

