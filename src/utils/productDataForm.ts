// src/utils/formDataBuilder.ts

import type { ProductFormData, ProductUpdateFormData } from '../types/product.types';

export const buildProductFormData = (
  data: ProductFormData | ProductUpdateFormData
): FormData => {
  const formData = new FormData();

  // Simple scalar fields
  const scalarFields: (keyof typeof data)[] = [
    'name', 'sku', 'slug', 'description', 'short_description',
    'cost_price', 'selling_price', 'compare_price', 'wholesale_price',
    'current_stock', 'minimum_stock', 'maximum_stock', 'reorder_point', 'safety_stock',
    'category_id', 'brand_id', 'primary_supplier_id', 'primary_warehouse_id',
    'unit', 'weight', 'length', 'width', 'height',
    'is_active', 'is_tracked', 'allow_backorder', 'is_featured', 'is_new', 'is_on_sale',
    'tax_class', 'hs_code', 'country_of_origin', 'barcode',
    'meta_title', 'meta_description', 'meta_keywords',
  ];

  scalarFields.forEach(field => {
    const value = data[field];
    if (value !== undefined && value !== null) {
      formData.append(field, String(value));
    }
  });

  // Arrays and objects – JSON‑stringify them
//   if (data.gallery_images) {
//     formData.append('gallery_images', JSON.stringify(data.gallery_images));
//   }
  if (data.attributes) {
    formData.append('attributes', JSON.stringify(data.attributes));
  }
  if (data.variations) {
    formData.append('variations', JSON.stringify(data.variations));
  }

  return formData;
};