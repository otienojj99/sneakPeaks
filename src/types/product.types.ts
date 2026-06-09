// ─── Generic API Types ────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  message: string | null;
  data: T;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  page: number | null;
  active: boolean;
}

export interface PaginationLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: PaginationLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface PaginatedData<T> {
  data: T[];
  links: PaginationLinks;
  meta: PaginationMeta;
}

/** The full paginated API response shape: ApiResponse<PaginatedData<T>> */
export type PaginatedApiResponse<T> = ApiResponse<PaginatedData<T>>;

// ─── Domain Entities ──────────────────────────────────────────────

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  parent_id: number | null;
  is_active: boolean;
  sort_order: number;
  image: string | null;
  full_path: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  /** Populated when fetching a category tree */
  children?: Category[];
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  logo: string | null;
  cover_image: string | null;
  website: string | null;
  email: string | null;
  phone: string | null;
  is_active: boolean;
  is_featured: boolean;
  sort_order: number;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Warehouse {
  id: number;
  name: string;
  code: string;
  description: string | null;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  country: string | null;
  phone: string | null;
  email: string | null;
  manager_name: string | null;
  is_active: boolean;
  is_primary: boolean;
  metadata: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface Supplier {
  id: number;
  name: string;
  slug: string;
  email: string | null;
  phone: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

/**
 * Dynamic key-value pairs for product-specific attributes.
 * Keys are not fixed — the UI renders them dynamically.
 */
export type ProductAttributes = Record<string, string>;

export interface ProductVariation {
  id?: number;
  product_item_id: number;
  sku: string;
  name: string;
  size: string;               // extracted from attributes
  color?: string;  
  attributes?: ProductAttributes;  // optional, if you need it
  price_adjustment: number;
  final_price: number;       // calculated as base price + adjustment
  price: number | null;
  stock: number;
  image_id: number | null;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface ProductImage {
  id: number;
  product_item_id: number;

  image_url: string;
  thumbnail_url: string | null;
  medium_url: string | null;
  large_url: string | null;

  file_name: string;
  mime_type: string;
  file_size: number;

  sort_order: number;

  alt_text: string | null;
  title: string | null;
  caption: string | null;

  is_primary: boolean;
  is_active: boolean;

  created_at: string;
  updated_at: string;
}



// ─── Product ──────────────────────────────────────────────────────

export interface Product {
  id: number;
  sku: string;
  name: string;
  slug: string;
  description: string;
  short_description: string | null;

  // Pricing
  cost_price: string;
  selling_price: string;
  compare_price: string | null;
  wholesale_price: string | null;

  // Inventory
  current_stock: number;
  minimum_stock: number;
  maximum_stock: number;
  reorder_point: number;
  safety_stock: number;

  // Relations
  category: Category | null;
  brand: Brand | null;
  primary_supplier: Supplier | null;
  primary_warehouse: Warehouse | null;

  // Physical
  unit: string | null;
  weight: string | null;
  length: string | null;
  width: string | null;
  height: string | null;

  // Flags
  is_active: boolean;
  is_tracked: boolean;
  allow_backorder: boolean;
  is_featured: boolean;
  is_new: boolean;
  is_on_sale: boolean;

  // Tax & Customs
  tax_class: string | null;
  hs_code: string | null;
  country_of_origin: string | null;

  // Identifiers
  barcode: string | null;

  // SEO
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;

  // Media
  featured_image: ProductImage | null;
  gallery_images: ProductImage[];
  // Stats
  views_count: number;
  sales_count: number;

  // Dynamic
  attributes: ProductAttributes;
  variations: ProductVariation[];

  // Timestamps
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ─── Form / Mutation payloads ─────────────────────────────────────

export interface ProductFormData {
  name: string;
  sku: string;
  slug?: string;
  description: string;
  short_description?: string;

  cost_price: number;
  selling_price: number;
  compare_price?: number | null;
  wholesale_price?: number | null;

  current_stock: number;
  minimum_stock: number;
  maximum_stock: number;
  reorder_point: number;
  safety_stock: number;

  category_id: number | null;
  brand_id: number | null;
  primary_supplier_id?: number | null;
  primary_warehouse_id?: number | null;

  unit?: string;
  weight?: number | null;
  length?: number | null;
  width?: number | null;
  height?: number | null;

  is_active: boolean;
  is_tracked: boolean;
  allow_backorder: boolean;
  is_featured: boolean;
  is_new: boolean;
  is_on_sale: boolean;

  tax_class?: string;
  hs_code?: string;
  country_of_origin?: string;
  barcode?: string;

  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;

  attributes: ProductAttributes;
  variations: ProductVariation[];
}
export interface ProductUpdateFormData {
  name: string;
  sku: string;
  slug?: string;
  description: string;
  short_description?: string;

  cost_price: number;
  selling_price: number;
  compare_price?: number | null;
  wholesale_price?: number | null;

  current_stock: number;
  minimum_stock: number;
  maximum_stock: number;
  reorder_point: number;
  safety_stock: number;

  category_id: number | null;
  brand_id: number | null;
  primary_supplier_id?: number | null;
  primary_warehouse_id?: number | null;

  unit?: string;
  weight?: number | null;
  length?: number | null;
  width?: number | null;
  height?: number | null;

  is_active: boolean;
  is_tracked: boolean;
  allow_backorder: boolean;
  is_featured: boolean;
  is_new: boolean;
  is_on_sale: boolean;

  tax_class?: string;
  hs_code?: string;
  country_of_origin?: string;
  barcode?: string;

  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;

  attributes: ProductAttributes;
  variations: ProductVariation[];
}

// ─── Filters & Sorting ───────────────────────────────────────────

export type ProductSortField =
  | 'name'
  | 'sku'
  | 'selling_price'
  | 'current_stock'
  | 'created_at'
  | 'updated_at'
  | 'views_count'
  | 'sales_count';

export type SortDirection = 'asc' | 'desc';

export interface ProductFilters {
  search?: string;
  category_id?: number | null;
  brand_id?: number | null;
  warehouse_id?: number | null;
  is_active?: boolean | null;
  is_featured?: boolean | null;
  is_new?: boolean | null;
  is_on_sale?: boolean | null;
  /** 'low_stock' | 'out_of_stock' convenience filters */
  stock_status?: 'low_stock' | 'out_of_stock' | null;
  price_min?: number | null;
  price_max?: number | null;
  stock_min?: number | null;
  stock_max?: number | null;
  sort_by?: ProductSortField;
  sort_dir?: SortDirection;
  page?: number;
  per_page?: number;
  trashed?: 'only' | 'with' | null;
}

// ─── Bulk action payloads ─────────────────────────────────────────

export type BulkAction =
  | { action: 'activate' }
  | { action: 'deactivate' }
  | { action: 'delete' }
  | { action: 'restore' }
  | { action: 'set_featured'; value: boolean }
  | { action: 'set_on_sale'; value: boolean }
  | { action: 'assign_category'; category_id: number }
  | { action: 'adjust_price'; percentage: number; field: 'selling_price' | 'compare_price' };

export interface BulkActionPayload {
  product_ids: number[];
  bulk: BulkAction;
}

// ─── Status toggle ────────────────────────────────────────────────

export type ToggleableFlag =
  | 'is_active'
  | 'is_featured'
  | 'is_new'
  | 'is_on_sale'
  | 'allow_backorder'
  | 'is_tracked';