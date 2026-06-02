import API from '../axios'
import { ENDPOINTS } from '../endpoints'
import { buildFormData } from '../../utils/formDataBuilder'
import type {
  Category,
  CategoryCreateData,
  CategoryUpdateData,
  CategoryFilters,
  CategoryTree,
} from '../../types/category.types'
import type { ApiResponse, PaginatedResponse } from '../../types/api.types'

const categoryService = {
    // =============================================
  //  CRUD OPERATIONS
  // =============================================

  /**
   * Get All Categories (paginated + filtered)
   * GET /api/categories
   */

  getAll: async(
    filters?:CategoryFilters
  ):Promise<ApiResponse<PaginatedResponse<Category>>> => {
    const response = await API.get(ENDPOINTS.CATEGORIES, { params: filters })
    return response.data
  },

  /**
   * Get Single Category
   * GET /api/categories/:id
   */

  getById: async(
    id:number,
    include?:string
  ): Promise<ApiResponse<Category>> => {
    const response = await API.get(`${ENDPOINTS.CATEGORIES}/${id}`,{
         params: { include },
    })
    return response.data
  },

  /**
   * Get Category by Slug
   * GET /api/categories/slug/:slug
   */

  getBySlug: async(
    slug:string,
    include?:string
  ): Promise<ApiResponse<Category>> => {
    const response = await API.get(`${ENDPOINTS.CATEGORIES}/slug/${slug}`, {
        params: { include },
    })

    return response.data
  },

   /**
   * Create Category
   * POST /api/categories
   * Uses FormData because of image upload
   */

   create: async(
    data:CategoryCreateData
   ): Promise<ApiResponse<Category>> => {
    const formData = buildFormData(data)
    console.log("FormData:", formData, {
       headers: { 'Content-Type': 'multipart/form-data' },
    })
    for (let pair of formData.entries()) {
  console.log(pair[0], pair[1])
}
    const response = await API.post(
  ENDPOINTS.CATEGORIES,
  formData,
  {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
)

    return response.data
   },

   /**
   * Update Category
   * PUT /api/categories/:id
   * Uses FormData because of image upload
   */

   update: async(
    id:number,
    data: CategoryUpdateData
   ): Promise<ApiResponse<Category>> => {
    const formData = buildFormData(data)

    formData.append('_method', 'PUT')
    const response = await API.post( `${ENDPOINTS.CATEGORIES}/${id}`,
      formData,{
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      return response.data
   },

   /**
   * Delete Category (soft delete)
   * DELETE /api/categories/:id
   */

   delete: async(id:number):Promise<ApiResponse<null>> => {
    const response = await API.delete(`${ENDPOINTS.CATEGORIES}/${id}`)
    return response.data
   },

   // =============================================
  //  BULK OPERATIONS
  // =============================================

  /**
   * Bulk Delete Categories
   * POST /api/categories/bulk-delete
   */

  bulkDelete: async(ids: number[]): Promise<ApiResponse<null>> => {
    const response = await API.post(`${ENDPOINTS.CATEGORIES}/bulk-delete`, {
      ids,
    })

    return response.data
  },

  /**
   * Bulk Update Status
   * POST /api/categories/bulk-status
   */

  bulkUpdateStatus: async (
    ids: number[],
    is_active: boolean
  ): Promise<ApiResponse<null>> => {
    const response = await API.post(`${ENDPOINTS.CATEGORIES}/bulk-status`, {
      ids,
      is_active,
    })
    return response.data
  },

  // =============================================
  //  TREE & HIERARCHY
  // =============================================

  /**
   * Get Categories as Tree (nested parent -> children)
   * GET /api/categories/tree
   */

  getTree: async (): Promise<ApiResponse<CategoryTree[]>> => {
    const response = await API.get(`${ENDPOINTS.CATEGORIES}/tree`)
    return response.data
  },

  /**
   * Get Only Parent Categories (no parent_id)
   * GET /api/categories/parents
   */
  getParents: async (): Promise<ApiResponse<Category[]>> => {
    const response = await API.get(`${ENDPOINTS.CATEGORIES}/parents`)
    return response.data
  },

  /**
   * Get Children of a Category
   * GET /api/categories/:id/children
   */
  getChildren: async (parentId: number): Promise<ApiResponse<Category[]>> => {
    const response = await API.get(
      `${ENDPOINTS.CATEGORIES}/${parentId}/children`
    )
    return response.data
  },

  // =============================================
  //  REORDER
  // =============================================

  /**
   * Reorder Categories (drag & drop)
   * POST /api/categories/reorder
   */
  reorder: async (
    orderedIds: { id: number; sort_order: number; parent_id?: number | null }[]
  ): Promise<ApiResponse<null>> => {
    const response = await API.post(`${ENDPOINTS.CATEGORIES}/reorder`, {
      categories: orderedIds,
    })
    return response.data
  },

  // =============================================
  //  IMAGE
  // =============================================

  /**
   * Upload/Update Category Image
   * POST /api/categories/:id/image
   */

  uploadImage: async (
    id: number,
    image: File
  ): Promise<ApiResponse<Category>> => {
    const formData = new FormData()
    formData.append('image', image)
    const response = await API.post(
      `${ENDPOINTS.CATEGORIES}/${id}/image`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    )
    return response.data
  },

  /**
   * Delete Category Image
   * DELETE /api/categories/:id/image
   */
  deleteImage: async (id: number): Promise<ApiResponse<null>> => {
    const response = await API.delete(`${ENDPOINTS.CATEGORIES}/${id}/image`)
    return response.data
  },

  // =============================================
  //  DROPDOWN / SELECT OPTIONS
  // =============================================

  /**
   * Get Categories for Dropdown (minimal data)
   * GET /api/categories/list
   * Returns only id, name, full_path for select inputs
   */

  getList: async (): Promise<
    ApiResponse<Pick<Category, 'id' | 'name' | 'full_path' | 'parent_id'>[]>
  > => {
    const response = await API.get(`${ENDPOINTS.CATEGORIES}/list`)
    return response.data
  },



}

export default categoryService