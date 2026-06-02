// src/api/services/productService.ts

import API from '../axios';
import { ENDPOINTS } from '../endpoints';
import type {
  Product,
  ProductFormData,
  ProductUpdateFormData,
  ProductFilters,
  ProductImage,
  ProductVariation,
  ToggleableFlag,
  BulkActionPayload,
  ApiResponse,
  PaginatedData,
} from '../../types/product.types';

const productUrl = (id: number | string) => `${ENDPOINTS.PRODUCTS}/${id}`;
// const productImagesUrl = (id: number) => `${ENDPOINTS.PRODUCT_IMAGES}/${id}`;
const productImagesUrl = (productId: number) =>
  `${ENDPOINTS.PRODUCTS}/${productId}/images`;
const productImageUrl = (productId: number, imageId: number) => `${ENDPOINTS.PRODUCTS}/${productId}/images/${imageId}`;
const productVariationsUrl = (productId: number) =>
  `${ENDPOINTS.PRODUCTS}/${productId}/variants`;

const productVariationUrl = (
  productId: number,
  variationId: number
) =>
  `${ENDPOINTS.PRODUCTS}/${productId}/variants/${variationId}`;

export const productService = {
  // ========== CRUD ==========
  getAll: async (filters?: ProductFilters): Promise<ApiResponse<PaginatedData<Product>>> => {
    const response = await API.get(ENDPOINTS.PRODUCTS, { params: filters });
    return response.data;
  },

  getById: async (id: number | string): Promise<ApiResponse<Product>> => {

    console.log(`Fetching product with ID: ${id}`);
    const response = await API.get(productUrl(id));

    console.log('Raw API response for getById:', response);
    console.log('Response data for getById:', response.data.data);
    return response.data;
  },

  create: async (data: ProductFormData): Promise<ApiResponse<Product>> => {
    console.log("📤 Creating product with data", {
      name: data.name,
      sku: data.sku,
      sellingPrice: data.selling_price,
    });
    const response = await API.post(ENDPOINTS.PRODUCTS, data);
    return response.data;
  },

  update: async (id: number, data: ProductUpdateFormData): Promise<ApiResponse<Product>> => {
    console.log("📝 Updating product", {
      productId: id,
      name: data.name,
      sku: data.sku,
    });
    const response = await API.put(`${ENDPOINTS.PRODUCTS}/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<ApiResponse<null>> => {
    const response = await API.delete(productUrl(id));
    return response.data;
  },

  restore: async (id: number): Promise<ApiResponse<Product>> => {
    const response = await API.post(`${productUrl(id)}/restore`);
    return response.data;
  },

  forceDelete: async (id: number): Promise<ApiResponse<null>> => {
    const response = await API.delete(`${productUrl(id)}/force`);
    return response.data;
  },

  // ========== Status Toggles ==========
  toggleFlag: async (id: number, flag: ToggleableFlag, value: boolean): Promise<ApiResponse<Product>> => {
    const response = await API.patch(productUrl(id), { [flag]: value });
    return response.data;
  },

  // ========== Bulk Actions ==========
  bulkAction: async (payload: BulkActionPayload): Promise<ApiResponse<null>> => {
    const response = await API.post(ENDPOINTS.PRODUCT_BULK_ACTION, payload);
    return response.data;
  },

  // ========== Images ==========
  getImages: async (productId: number): Promise<ApiResponse<ProductImage[]>> => {
    console.log(`Fetching images for product ID: ${productId}`);
    const response = await API.get(productImagesUrl(productId));
    console.log('Raw API response for getImages 🔥:', response);
    console.log('Response data for getImages 🔥🔥:', response.data.data);
    return response.data;
  },

  uploadImages: async (productId: number, files: File[]) => {
    const formData = new FormData();

    formData.append("product_item_id", String(productId));

    files.forEach((file) => {
        formData.append("image", file);
    });

    const response = await API.post(
        productImagesUrl(productId),
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
},

  deleteImage: async (productId: number, imageId: number): Promise<ApiResponse<null>> => {
    const response = await API.delete(productImageUrl(productId, imageId));
    return response.data;
  },

  setPrimaryImage: async (productId: number, imageId: number): Promise<ApiResponse<null>> => {
    const response = await API.patch(`${productImageUrl(productId, imageId)}/primary`);
    return response.data;
  },

  reorderImages: async (productId: number, orderedIds: number[]): Promise<ApiResponse<null>> => {
    const response = await API.post(`${productImagesUrl(productId)}/reorder`, { image_ids: orderedIds });
    return response.data;
  },

  // ========== Variations ==========
  getVariations: async (productId: number): Promise<ApiResponse<ProductVariation[]>> => {
    console.log(`Fetching variations for product ID: ${productId}`);
    const response = await API.get(productVariationsUrl(productId));
    console.log('Raw API response for getVariations 🔥:', response);
    return response.data;
  },

  createVariation: async (productId: number, data: Omit<ProductVariation, 'id'>): Promise<ApiResponse<ProductVariation>> => {
    console.log(`Creating variation for product ID: ${productId}`);
    const response = await API.post(productVariationsUrl(productId), data);
    console.log('Raw API response for createVariation 🔥:', response);
    return response.data;
  },

  updateVariation: async (productId: number, variationId: number, data: Partial<ProductVariation>): Promise<ApiResponse<ProductVariation>> => {
    console.log(`Updating variation for product ID: ${productId}`);
    const response = await API.put(productVariationUrl(productId, variationId), data);
    console.log('Raw API response for updateVariation 🔥:', response);
    return response.data;
  },

  deleteVariation: async (productId: number, variationId: number): Promise<ApiResponse<null>> => {
    console.log(`Deleting variation for product ID: ${productId}`);
    const response = await API.delete(productVariationUrl(productId, variationId));
    console.log('Raw API response for deleteVariation 🔥:', response);
    return response.data;
  },
};