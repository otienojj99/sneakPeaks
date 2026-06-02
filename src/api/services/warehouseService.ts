import API from '../axios'
import { ENDPOINTS } from '../endpoints'
import type {
  Warehouse,
  WarehouseCreateData,
  WarehouseUpdateData,
  WarehouseFilters,
  ToggleableFlag,
} from '../../types/warehouse.types';
import type { ApiResponse, PaginatedResponse } from '../../types/api.types'
import { buildWarehouseFormDataBuilder } from '../../utils/warehouseFormData';

// ... service methods
const wareHouseUrl = (id: number | string) => `${ENDPOINTS.WAREHOUSE}/${id}`;
const warehouseService = {
    // =============================================
  //  CRUD OPERATIONS
  // =============================================

  /**
   * Get All Warehouses (paginated + filtered)
   * GET /api/warehouse
   */

  getAll: async(
        filters?:WarehouseFilters
      ):Promise<ApiResponse<PaginatedResponse<Warehouse>>> => {
        const response = await API.get(ENDPOINTS.WAREHOUSE, { params: filters })
        return response.data
      },

      /**
   * Get Single Brand
   * GET /api/brand/:id
   */

  getById: async(
    id:number,
    include?:string
  ): Promise<ApiResponse<Warehouse>> => {
    const response = await API.get(`${ENDPOINTS.WAREHOUSE}/${id}`,{
         params: { include },
    })
    return response.data
  },

  getBySlug: async(
    slug:string,
    include?:string
  ): Promise<ApiResponse<Warehouse>> => {
    const response = await API.get(`${ENDPOINTS.WAREHOUSE}/slug/${slug}`, {
        params: { include },
    })

    return response.data
  },

  /**
   * Create Warehouse
   * POST /api/Warehouse
   * Uses FormData because of image upload
   */

   create: async(
    data:WarehouseCreateData
   ): Promise<ApiResponse<Warehouse>> => {
    const formData = buildWarehouseFormDataBuilder(data)
    console.log("FormData:", formData)
    for (let pair of formData.entries()) {
  console.log(pair[0], pair[1])
}
    const response = await API.post(
  ENDPOINTS.WAREHOUSE,
  formData,
  {
      headers: {
        'Accept': 'application/json',
      },
    }
)

    return response.data
   },

   update: async(
    id:number,
    data: WarehouseUpdateData
   ): Promise<ApiResponse<Warehouse>> => {
    const formData = buildWarehouseFormDataBuilder(data)

    formData.append('_method', 'PUT')
    const response = await API.post( `${ENDPOINTS.WAREHOUSE}/${id}`,
      formData,{
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      return response.data
   },

   /**
   * Delete Warehouse (soft delete)
   * DELETE /api/warehouse/:id
   */

   delete: async(id:number):Promise<ApiResponse<null>> => {
    const response = await API.delete(`${ENDPOINTS.WAREHOUSE}/${id}`)
    return response.data
   },

   restore: async (id: number): Promise<ApiResponse<Warehouse>> => {
       const response = await API.post(`${ENDPOINTS.WAREHOUSE}/${id}/restore`);
       return response.data;
     },

    forceDelete: async (id: number): Promise<ApiResponse<null>> => {
    const response = await API.delete(`${wareHouseUrl(id)}/force`);
    return response.data;

   
    },
    
 // ========== Status Toggles ==========
    toggleFlag: async (id: number, flag: ToggleableFlag, value: boolean): Promise<ApiResponse<Warehouse>> => {
    const response = await API.patch(wareHouseUrl(id), { [flag]: value });
    return response.data;
  },

  // // ========== Bulk Actions ==========
  // bulkAction: async (payload: WarehouseBulkActionPayload): Promise<ApiResponse<null>> => {
  //   const response = await API.post(ENDPOINTS.PRODUCT_BULK_ACTION, payload);
  //   return response.data;
  // },

  bulkDelete: async(ids: number[]): Promise<ApiResponse<null>> => {
    const brandRes = await API.post(`${ENDPOINTS.WAREHOUSE}/bulk-delete`, {
      ids,
    })

    return brandRes.data
  },

  bulkUpdateStatus: async (ids: number[], is_active: boolean): Promise<ApiResponse<null>> => {
    const brandRes = await API.post(`${ENDPOINTS.WAREHOUSE_TOGGLE}`, { ids, is_active });
    return brandRes.data;
  },

}

export default warehouseService