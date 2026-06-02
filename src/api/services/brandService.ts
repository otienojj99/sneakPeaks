import API from '../axios'
import { ENDPOINTS } from '../endpoints'
import { buildFormData } from '../../utils/formDataBuilder'
import type {
  Brand,
  BrandFilters,
  BrandUpdateData,
  BrandCreateData,
  BrandSortField,
  BrandBulkActionPayload

} from '../../types/brand.types'
import type { ApiResponse, PaginatedResponse } from '../../types/api.types'


const brandService = {
  // =============================================
  //  CRUD OPERATIONS
  // =============================================

  /**
   * Get All Brands (paginated + filtered)
   * GET /api/brands
   */

  getAll: async(
      filters?:BrandFilters
    ):Promise<ApiResponse<PaginatedResponse<Brand>>> => {
      const brandRes = await API.get(ENDPOINTS.BRANDS, { params: filters })
      return brandRes.data
    },

    /**
   * Get Single Brand
   * GET /api/brand/:id
   */

  getById: async(
    id:number,
    include?:string
  ): Promise<ApiResponse<Brand>> => {
    const brandRes = await API.get(`${ENDPOINTS.BRANDS}/${id}`,{
         params: { include },
    })
    return brandRes.data
  },

  /**
   * Get Brand by Slug
   * GET /api/brands/slug/:slug
   */

  getBySlug: async(
    slug:string,
    include?:string
  ): Promise<ApiResponse<Brand>> => {
    const brandRes = await API.get(`${ENDPOINTS.BRANDS}/slug/${slug}`, {
        params: { include },
    })

    return brandRes.data
  },

  /**
   * Create Brand
   * POST /api/brands
   * Uses FormData because of image upload
   */

   create: async(
    data:BrandCreateData
   ): Promise<ApiResponse<Brand>> => {
    const formData = buildFormData(data)
    console.log("FormData:", formData, {
       headers: { 'Content-Type': 'multipart/form-data' },
    })
    for (let pair of formData.entries()) {
  console.log(pair[0], pair[1])
}
    const brandRes = await API.post(
  ENDPOINTS.BRANDS,
  formData,
  {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
)

    return brandRes.data
   },


   /**
   * Update Brand
   * PUT /api/brands/:id
   * Uses FormData because of image upload
   */

   update: async(
    id:number,
    data: BrandUpdateData
   ): Promise<ApiResponse<Brand>> => {
    const formData = buildFormData(data)

    formData.append('_method', 'PUT')
    const brandRes = await API.post( `${ENDPOINTS.BRANDS}/${id}`,
      formData,{
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      return brandRes.data
   },

   /**
   * Delete Brand (soft delete)
   * DELETE /api/brands/:id
   */

   delete: async(id:number):Promise<ApiResponse<null>> => {
    const brandRes = await API.delete(`${ENDPOINTS.BRANDS}/${id}`)
    return brandRes.data
   },

/// APIS TO BE CREATED
//  =======================
    // =============================================
  //  BULK OPERATIONS
  // =============================================

  /**
   * Bulk Delete Brand
   * POST /api/brunds/bulk-delete
   */

  // bulkAction: async (payload: BrandBulkActionPayload): Promise<ApiResponse<null>> => {
  //  const brandRes = await API.post(`${ENDPOINTS.BRANDS}/bulk`, payload);
  // return brandRes.data;
  // },

  bulkDelete: async(ids: number[]): Promise<ApiResponse<null>> => {
    const brandRes = await API.post(`${ENDPOINTS.BRANDS}/bulk-delete`, {
      ids,
    })

    return brandRes.data
  },

   /**
   * Bulk activate/deactivate brands
   */
  bulkUpdateStatus: async (ids: number[], is_active: boolean): Promise<ApiResponse<null>> => {
    const brandRes = await API.post(`${ENDPOINTS.BRANDS}/toggle-active`, { ids, is_active });
    return brandRes.data;
  },

  /**
   * Bulk restore
   */
  bulkRestore: async (ids: number[]): Promise<ApiResponse<null>> => {
    const brandRes = await API.post(`${ENDPOINTS.BRANDS}/bulk-restore`, { ids });
    return brandRes.data;
  },

  /**
   * Bulk set featured status
   */
  bulkSetFeatured: async (ids: number[], is_featured: boolean): Promise<ApiResponse<null>> => {
    const brandRes = await API.post(`${ENDPOINTS.BRANDS}/bulk-featured`, { ids, is_featured });
    return brandRes.data;
  },


  /**
   * Bulk Update Status
   * POST /api/brands/bulk-status
   */

  
  

  // =============================================
  //  REORDER
  // =============================================

  /**
   * Reorder Brands (drag & drop)
   * POST /api/brand/reorder
   */
  reorder: async (
    orderedIds: { id: number; sort_order: number; }[]
  ): Promise<ApiResponse<null>> => {
    const brandRes = await API.post(`${ENDPOINTS.BRANDS}/reorder`, {
      brands: orderedIds,
    })
    return brandRes.data
  },

  // =============================================
    //  IMAGE
    // =============================================
  
    /**
     * Upload/Update Brand Image
     * POST /api/brand/:id/image
     */
  
    uploadImage: async (
      id: number,
      image: File
    ): Promise<ApiResponse<Brand>> => {
      const formData = new FormData()
      formData.append('logo', image)
      const brandRes = await API.post(
        `${ENDPOINTS.BRANDS}/${id}/logo`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      )
      return brandRes.data
    },
  
    /**
     * Delete Brand Image
     * DELETE /api/categories/:id/image
     */
    deleteImage: async (id: number): Promise<ApiResponse<null>> => {
      const brandRes = await API.delete(`${ENDPOINTS.BRANDS}/${id}/logo`)
      return brandRes.data
    },

    // =============================================
      //  DROPDOWN / SELECT OPTIONS
      // =============================================
    
      /**
       * Get Brands for Dropdown (minimal data)
       * GET /api/categories/list
       * Returns only id, name, full_path for select inputs
       */
    
      getList: async (): Promise<
        ApiResponse<Pick<Brand, 'id' | 'name' | 'created_at' | 'website'>[]>
      > => {
        const response = await API.get(`${ENDPOINTS.CATEGORIES}/list`)
        return response.data
      },
  


}

export default brandService