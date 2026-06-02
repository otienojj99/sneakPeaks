// src/api/services/discountService.ts

import API from '../axios';
import { ENDPOINTS } from '../endpoints';
import type {
  Discount,
  DiscountCreateData,
  DiscountUpdateData,
  DiscountFilters,
} from '../../typ';

export const discountService = {
  getAll: (filters?: DiscountFilters): Promise<PaginatedApiResponse<Discount>> => {
    return API.get(ENDPOINTS.DISCOUNTS, { params: filters });
  },
  getById: (id: number): Promise<ApiResponse<Discount>> => {
    return API.get(`${ENDPOINTS.DISCOUNTS}/${id}`);
  },
  create: (data: DiscountCreateData): Promise<ApiResponse<Discount>> => {
    return API.post(ENDPOINTS.DISCOUNTS, data);
  },
  update: (id: number, data: DiscountUpdateData): Promise<ApiResponse<Discount>> => {
    return API.put(`${ENDPOINTS.DISCOUNTS}/${id}`, data);
  },
  delete: (id: number): Promise<ApiResponse<null>> => {
    return API.delete(`${ENDPOINTS.DISCOUNTS}/${id}`);
  },
  restore: (id: number): Promise<ApiResponse<null>> => {
    return API.post(`${ENDPOINTS.DISCOUNTS}/${id}/restore`);
  },
  toggleActive: (id: number): Promise<ApiResponse<Discount>> => {
    return API.patch(`${ENDPOINTS.DISCOUNTS}/${id}/toggle-active`);
  },
};