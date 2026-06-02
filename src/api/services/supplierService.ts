import API from '../axios'
import { ENDPOINTS } from '../endpoints'
import type {
    Supplier,
    SupplierCreateData,
    SupplierUpdateData,
    SupplierFilters,
    ToggleableFlag,
} from '../../types/supplier.types'
import type { ApiResponse, PaginatedResponse } from '../../types/api.types'

import { buildSupplierFormData } from '../../utils/supplierFormData'




const supplierService = {
    // =============================================
  //  CRUD OPERATIONS
  // =============================================

  /**
   * Get All Suppliers (paginated + filtered)
   * GET /api/suppliers
   */

  getAll: async(
     filters?:SupplierFilters
  ): Promise<ApiResponse<PaginatedResponse<Supplier>>> => {
    const response = await API.get(ENDPOINTS.SUPPLIERS, { params: filters })
    return response.data
  },

    /**
     * Get Single Supplier
     * GET /api/suppliers/:id
     */
    
    getById: async(
    id:number,
    include?:string
  ): Promise<ApiResponse<Supplier>> => {
    const response = await API.get(`${ENDPOINTS.SUPPLIERS}/${id}`,{
         params: { include },
    })
    return response.data
  },

    /** 
     *  Get Supplier by Slug
     * GET /api/suppliers/slug/:slug
     */

    getBySlug: async(
    slug:string,
    include?:string
  ): Promise<ApiResponse<Supplier>> => {
    const response = await API.get(`${ENDPOINTS.SUPPLIERS}/slug/${slug}`, {
        params: { include },
    })

    return response.data
  },


  /**
   * Create Supplier
   * POST /api/Supplier
   * Uses FormData because of image upload
   */

  create: async(
    data:SupplierCreateData
  ): Promise<ApiResponse<Supplier>> =>{
    const formData = buildSupplierFormData(data)
    const response = await API.post(ENDPOINTS.SUPPLIERS, formData)
    return response.data
  },

  update: async(
    id:number,
    data: SupplierUpdateData
   ): Promise<ApiResponse<Supplier>> => {
    const formData = buildSupplierFormData(data)

    formData.append('_method', 'PUT')
    const response = await API.post( `${ENDPOINTS.SUPPLIERS}/${id}`,
      formData,{
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      return response.data
   },

   /**
   * Delete Supplier (soft delete)
   * DELETE /api/suppliers/:id
   */

    delete: async(id:number): Promise<ApiResponse<null>> => {
    const response = await API.delete(`${ENDPOINTS.SUPPLIERS}/${id}`)
    return response.data
    },


    restore: async(id:number): Promise<ApiResponse<Supplier>> => {
    const response = await API.post(`${ENDPOINTS.SUPPLIERS}/${id}/restore`)
    return response.data
    },

    forceDelete: async(id:number): Promise<ApiResponse<null>> => {
    const response = await API.delete(`${ENDPOINTS.SUPPLIERS}/${id}/force`)
    return response.data
    },

    // ========== Status Toggles ==========
    // use SUPPLIER_TOGGLE: '/suppliers/{id}/toggle-active',

    toggleFlag: async(id:number, flag:ToggleableFlag, value:boolean): Promise<ApiResponse<Supplier>> => {
    const response = await API.patch(`${ENDPOINTS.SUPPLIERS}/${id}/toggle-${flag}`, { value })
    return response.data
    },

    // =============================================
  //  BULK OPERATIONS
  // =============================================

  bulkDelete: async(ids: number[]): Promise<ApiResponse<null>> => {
    const response = await API.post(`${ENDPOINTS.SUPPLIERS}/bulk-delete`, {
      ids,
    })

    return response.data
    },

    bulkUpdateStatus: async (ids: number[], is_active: boolean): Promise<ApiResponse<null>> => {
    const response = await API.post(`${ENDPOINTS.SUPPLIER_TOGGLE}/toggle-active`, { ids, is_active });
    return response.data;
  },

  bulkUpdatePreferred: async (ids: number[], is_preferred: boolean): Promise<ApiResponse<null>> => {
    const response = await API.post(`${ENDPOINTS.SUPPLIER_TOGGLE}/toggle-preferred`, { ids, is_preferred });
    return response.data;
  },

  

}


export default supplierService
