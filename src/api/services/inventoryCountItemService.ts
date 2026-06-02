import API from '../axios';
import { ENDPOINTS } from '../endpoints';
import type {
  InventoryCountItem,
  InventoryCountItemCreateData,
  InventoryCountItemUpdateData,
} from '../../types/inventory.types';

import type { ApiResponse } from '../../types/api.types';

export const inventoryCountItemService = {
     // List all items (can be filtered by inventory_count_id)

     getAllItems: async (params?: { inventory_count_id?: number; status?: string; discrepancy?: boolean }): Promise<ApiResponse<InventoryCountItem[]>> => {
    const response = await API.get(ENDPOINTS.INVENTORY_COUNT_ITEMS, {
      params,
    });
    return response.data.data;
  },

  getItemById: async (id: number): Promise<ApiResponse<InventoryCountItem>> => {
    const response = await API.get(`${ENDPOINTS.INVENTORY_COUNT_ITEMS}/${id}`);
    return response.data;
  },

  createItem: async (data: InventoryCountItemCreateData): Promise<ApiResponse<InventoryCountItem>> => {
    const response = await API.post(ENDPOINTS.INVENTORY_COUNT_ITEMS, data);
    console.log('createItem response:', response);
    return response.data;
  },

  updateItem: async (id: number, data: InventoryCountItemUpdateData): Promise<ApiResponse<InventoryCountItem>> => {
    const response = await API.put(`${ENDPOINTS.INVENTORY_COUNT_ITEMS}/${id}`, data);
    return response.data;
  },

  deleteItem: async (id: number): Promise<ApiResponse<null>> => {
    const response = await API.delete(`${ENDPOINTS.INVENTORY_COUNT_ITEMS}/${id}`);
    return response.data;
  },

  markCounted: async (id: number, countedQuantity: number): Promise<ApiResponse<InventoryCountItem>> =>{
    const response = await API.post(`${ENDPOINTS.INVENTORY_COUNT_ITEMS}/${id}/mark-counted`, {
      counted_quantity: countedQuantity,
    });
    return response.data;
  },

  changeStatus: async (id: number, status: string): Promise<ApiResponse<InventoryCountItem>> => {
    const response = await API.post(`${ENDPOINTS.INVENTORY_COUNT_ITEMS}/${id}/change-status`, {
      status,
    });
    return response.data;
  },

  verifyCount: async (id: number): Promise<ApiResponse<InventoryCountItem>> => {
    const response = await API.post(`${ENDPOINTS.INVENTORY_COUNT_ITEMS}/${id}/verify`);
    return response.data;
  },

  adjustCount: async (id: number, adjustedQuantity: number): Promise<ApiResponse<InventoryCountItem>> => {
    const response = await API.post(`${ENDPOINTS.INVENTORY_COUNT_ITEMS}/${id}/adjust`, {
      adjusted_quantity: adjustedQuantity,
    });
    return response.data;
  }
}
