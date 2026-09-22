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

export type DiscountType =
  | 'percentage'
  | 'fixed_amount'
  | 'buy_x_get_y'
  | 'fixed_price'
  | 'free_shipping';

  /** Who the discount applies to */
export type DiscountAppliesTo =
  | 'all_products'
  | 'specific_products'
  | 'specific_categories';

  export type DiscountStatus = 'draft' | 'active' | 'paused' | 'expired';

export interface Discount {
  id: number;
  name: string;
  code: string | null;
  description: string | null;

  // Core discount settings
  type: DiscountType;
  value: number;                    // e.g., 20 for 20%, or 1500 for fixed amount
  formatted_value: string;          // e.g., "20%", "KES 1,500"
  maximum_discount_amount: number | null;

  // BOGO specific
  buy_quantity: number | null;
  get_quantity: number | null;
  free_product_id: number | null;
  free_product: Product | null;     // populated when loaded

  // Eligibility
  applies_to: DiscountAppliesTo;
  eligible_product_ids: number[] | null;
  eligible_category_ids: number[] | null;
  excluded_product_ids: number[] | null;
  excluded_category_ids: number[] | null;

  // Minimum requirements
  minimum_order_amount: number | null;
  minimum_quantity: number | null;
  maximum_quantity: number | null;

  // Customer restrictions
  customer_eligibility: 'all' | 'groups' | 'specific' | null;
  eligible_customer_groups: string[] | null;
  eligible_customer_ids: number[] | null;

  // Usage limits
  usage_limit_per_coupon: number | null;
  usage_limit_per_customer: number | null;
  total_used: number;

  // Combining & priority
  can_combine_with_other_discounts: boolean;
  priority: number;

  // Schedule
  starts_at: string;                // ISO datetime
  ends_at: string | null;           // ISO datetime
  valid_days_of_week: number[] | null; // 0=Sunday ... 6=Saturday
  valid_from_time: string | null;   // "08:00"
  valid_to_time: string | null;     // "20:00"

  // Status & visibility
  is_active: boolean;
  is_public: boolean;
  status: DiscountStatus;

  // Display
  display_text: string | null;
  banner_image: string | null;
  show_on_product_page: boolean;
  show_on_cart_page: boolean;
  show_on_checkout: boolean;

  // Special flags
  first_purchase_only: boolean;
  new_registration_only: boolean;

  // Meta & audit
  metadata: Record<string, any> | null;
  notes: string | null;

  // Timestamps
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export type DiscountFormData = Omit<
  Discount,
  | 'id'
  | 'formatted_value'
  | 'free_product'
  | 'total_used'
  | 'created_at'
  | 'updated_at'
  | 'deleted_at'
> & {
  // Fields that are optional in the form
  free_product_id?: number | null;
  eligible_product_ids?: number[] | null;
  eligible_category_ids?: number[] | null;
  excluded_product_ids?: number[] | null;
  excluded_category_ids?: number[] | null;
  eligible_customer_groups?: string[] | null;
  eligible_customer_ids?: number[] | null;
  valid_days_of_week?: number[] | null;
  metadata?: Record<string, any> | null;
};

// ─── Cart calculation types ──────────────────────────────────────

export interface CartItemForDiscount {
  product_id: number;
  quantity: number;
  product?: Product;          // optionally pre-loaded
  final_price?: number;       // after discounts
  discount?: AppliedDiscount; // applied discount details
  free_units?: number;        // for BOGO cross‑product
}

export interface AppliedDiscount {
  discount_id: number;
  type: DiscountType;
  discount_amount: number;
  final_price: number;
}

export interface CartDiscountResult {
  total_discount: number;
  item_breakdown: Record<number, AppliedDiscount>; // keyed by product_id
  applied_discounts: number[];                      // discount IDs
  cart_items: CartItemForDiscount[];
}

export interface DiscountFilters {
  search?: string;
  type?: DiscountType;
  status?: DiscountStatus;
  is_active?: boolean;
  applies_to?: DiscountAppliesTo;
  trashed?: 'only' | 'with';
  per_page?: number;
  page?: number;
}

// ─── Discount Create / Update payloads ──────────────────────────

export type DiscountCreateData = Omit<
  DiscountFormData,
  'id' | 'total_used' | 'formatted_value' | 'free_product'
>;

export type DiscountUpdateData = Partial<DiscountCreateData>;

export interface BannersResponse {
  data: Discount[];
}

export interface ProductDiscountsResponse {
  data: Discount[];
}

export interface CartCalculationResponse {
  data: CartDiscountResult;
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
  audience: string[];            // e.g. ['men', 'women']
  audience_labels: string[];     // e.g. ['Men', 'Women']
  variations: ProductVariation[];
  rating: string;

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
   audience?: string[];
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
   audience?: string[];
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
  audience?: string[] | null;
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