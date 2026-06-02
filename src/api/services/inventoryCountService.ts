import API from '../axios';
import { ENDPOINTS } from '../endpoints';
import type {
  InventoryCount,
  InventoryCountCreateData,
  InventoryCountUpdateData,
  InventoryFilters,
} from '../../types/inventory.types';
import type { ApiResponse, PaginatedResponse } from '../../types/api.types'
import type { PaginatedApiResponse } from '../../types/supplier.types';


export const inventoryCountService = {
    // =============================================
    //  CRUD OPERATIONS
    // =============================================
    /**   * Get All Inventory Counts (paginated + filtered)
   * GET /api/inventory-counts
   */

    getAllInventoryCounts: async (filters?: InventoryFilters): Promise<PaginatedApiResponse<InventoryCount>> => {
    const response = await API.get(ENDPOINTS.INVENTORY_COUNTS, { params: filters });
    return response.data;
    },

    /**
     * Get Inventory Count by ID
     * GET /api/inventory-counts/{id}
     */
    getInventoryCountById: async (id: number): Promise<ApiResponse<InventoryCount>> => {
    const response = await API.get(`${ENDPOINTS.INVENTORY_COUNTS}/${id}`);
    return response.data;
    },

    /**
     * Create Inventory Count
     * POST /api/inventory-counts
     */
    createInventoryCount: async (data: InventoryCountCreateData): Promise<ApiResponse<InventoryCount>> => {
    const response = await API.post(ENDPOINTS.INVENTORY_COUNTS, data);
    return response.data.data;
    },

    /**
     * Update Inventory Count (e.g. add items)
     * PUT /api/inventory-counts/{id}
     * Note: For adding items, we send the full updated list of items in the payload.
     */

    updateInventoryCount: async (id: number, data: InventoryCountUpdateData): Promise<ApiResponse<InventoryCount>> => {
       const response = await API.put(`${ENDPOINTS.INVENTORY_COUNTS}/${id}`, data);
       return response.data;
    },

    /**
     * Delete Inventory Count
     * DELETE /api/inventory-counts/{id}
     * Note: This will soft delete the record.
     */
    deleteInventoryCount: async (id: number): Promise<ApiResponse<null>> => {
    const response = await API.delete(`${ENDPOINTS.INVENTORY_COUNTS}/${id}`);
    return response.data;
    },

    /**
     * Restore Inventory Count
     * POST /api/inventory-counts/{id}/restore
     * Note: This will restore a soft-deleted record.
     */
    restoreInventoryCount: async (id: number): Promise<ApiResponse<InventoryCount>> => {
    const response = await API.post(`${ENDPOINTS.INVENTORY_COUNTS}/${id}/restore`);
    return response.data;
    },

    /**
     * Force Delete Inventory Count
     * DELETE /api/inventory-counts/{id}/force
     */

    forceDeleteInventoryCount: async (id: number): Promise<ApiResponse<null>> => {
    const response = await API.delete(`${ENDPOINTS.INVENTORY_COUNTS}/${id}/force`);
    return response.data;
    },

    // =============================================
    //  OTHER OPERATIONS
    // =============================================
    /**     * Approve Inventory Count
     * POST /api/inventory-counts/{id}/approve
     */
    approveInventoryCount: async (id: number): Promise<ApiResponse<InventoryCount>> => {
    const response = await API.post(`${ENDPOINTS.INVENTORY_COUNTS}/${id}/approve`); 
    return response.data;
    },

    changeStatus: async (id: number, status: InventoryCount['status']): Promise<ApiResponse<InventoryCount>> => {
    const response = await API.patch(`${ENDPOINTS.INVENTORY_COUNTS}/${id}/status`, { status });
    return response.data;
    }
    

}