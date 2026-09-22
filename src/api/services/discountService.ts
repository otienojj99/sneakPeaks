// src/api/services/discountService.ts

import API from '../axios';
import { ENDPOINTS } from '../endpoints';
import type {
  Discount,
  DiscountCreateData,
  DiscountUpdateData,
  DiscountFilters,
  CartItemForDiscount,
  CartDiscountResult,
  PaginatedApiResponse,
  ApiResponse,
} from '../../types/product.types';





export const discountService = {
  getAll: (filters?: DiscountFilters): Promise<PaginatedApiResponse<Discount>> => {
    return API.get(ENDPOINTS.DISCOUNT, { params: filters });
  },
  getById: (id: number): Promise<ApiResponse<Discount>> => {
    return API.get(`${ENDPOINTS.DISCOUNT}/${id}`);
  },
  create: (data: DiscountCreateData): Promise<ApiResponse<Discount>> => {
    return API.post(ENDPOINTS.DISCOUNT, data);
  },
  update: (id: number, data: DiscountUpdateData): Promise<ApiResponse<Discount>> => {
    return API.put(`${ENDPOINTS.DISCOUNT}/${id}`, data);
  },
  delete: (id: number): Promise<ApiResponse<null>> => {
    return API.delete(`${ENDPOINTS.DISCOUNT}/${id}`);
  },
  restore: (id: number): Promise<ApiResponse<null>> => {
    return API.post(`${ENDPOINTS.DISCOUNT}/${id}/restore`);
  },
  toggleActive: (id: number): Promise<ApiResponse<Discount>> => {
    return API.patch(`${ENDPOINTS.DISCOUNT}/${id}/toggle-active`);
  },


  
};

// ─── Public (storefront) endpoints ──────────────────────────────

export const discountPublicService = {
  /**
   * Get active promotional banners (for homepage etc.)
   */
  getBanners: (limit = 5): Promise<ApiResponse<Discount[]>> => {
    return API.get(`${ENDPOINTS.PUBLIC_DISCOUNT}/banners`, {
      params: { limit },
    });
  },

   /**
   * Get discounts that apply to a specific product (with optional quantity)
   */
  getProductDiscounts: (
    productId: number,
    quantity = 1
  ): Promise<ApiResponse<Discount[]>> => {
    return API.get(`${ENDPOINTS.PUBLIC_DISCOUNT}/product-discounts/${productId}`, {
      params: { quantity },
    });
  },

  /**
   * Calculate discounts for the current cart
   * Sends an array of { product_id, quantity }
   */
  calculateCart: (
    items: CartItemForDiscount[]
  ): Promise<ApiResponse<CartDiscountResult>> => {
    return API.post(`${ENDPOINTS.PUBLIC_DISCOUNT}/calculate-cart`, {
      items: items.map(({ product_id, quantity }) => ({ product_id, quantity })),
    });
  },
}

export const promotionService = {
  /**
   * Get active promotional banners (for homepage etc.)
   */
  getBanners: (limit = 5): Promise<ApiResponse<Discount[]>> => {
    return API.get(`${ENDPOINTS.PUBLIC_DISCOUNT}/banners`, {
      params: { limit },
    });
  },

  /**
   * Get discounts that apply to a specific product (with optional quantity)
   */
  getProductDiscounts: (
    productId: number,
    quantity = 1
  ): Promise<ApiResponse<Discount[]>> => {
    return API.get(`${ENDPOINTS.PUBLIC_DISCOUNT}/product-discounts/${productId}`, {
      params: { quantity },
    });
  },

  calculateCart: (
    items: CartItemForDiscount[]
  ): Promise<ApiResponse<CartDiscountResult>> => {
    return API.post(`${ENDPOINTS.PUBLIC_DISCOUNT}/calculate-cart`, {
      items: items.map(({ product_id, quantity }) => ({ product_id, quantity })),
    });
  },

}