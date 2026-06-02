import API from '../axios';
import { ENDPOINTS } from '../endpoints';
import type { 
  Product, 
  StockUpdatePayload, 
  DiscountPayload,
  BarcodeLookupResult 
} from '../../types/inventory.types';

export const inventoryService = {
    /**
   * Look up product by barcode
   */

    lookupBarcode: async (barcode: string): Promise<BarcodeLookupResult> => {
    const response = await API.get(`${ENDPOINTS.BARCODES}/lookup`, { 
      params: { barcode } 
    });
    return response.data.data;
  },

  /**
   * Update stock (check in)
   */

  updateStock: async (payload: StockUpdatePayload): Promise<{ product: Product }> => {
    const response = await API.post(ENDPOINTS.STOCK_UPDATE, payload);
    return response.data.data;
  },

   /**
   * Update product details
   */

   updateProductDetails: async (productId: number, data: Partial<Product>): Promise<Product> => {
    const response = await API.put(`${ENDPOINTS.PRODUCTS}/${productId}`, data);
    return response.data.data;
  },

  /**
   * Upload product image
   */

  uploadImage: async (productId: number, file: File, isPrimary: boolean = false): Promise<any> => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('is_primary', String(isPrimary));
    
    const response = await API.post(`${ENDPOINTS.PRODUCTS}/${productId}/images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data;
  },

  /**
   * Add discount to product
   */
  addDiscount: async (payload: DiscountPayload): Promise<Product> => {
    const response = await API.post(`${ENDPOINTS.PRODUCTS}/${payload.product_id}/discount`, payload);
    return response.data.data;
  },

  /**
   * Remove discount from product
   */
  removeDiscount: async (productId: number): Promise<Product> => {
    const response = await API.delete(`${ENDPOINTS.PRODUCTS}/${productId}/discount`);
    return response.data.data;
  },

  /**
   * Get product by ID
   */
  getProduct: async (productId: number): Promise<Product> => {
    const response = await API.get(`${ENDPOINTS.PRODUCTS}/${productId}`);
    return response.data.data;
  },
}