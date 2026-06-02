import type { Warehouse } from './warehouse.types';

export interface Product {
  id: number;
  name: string;
  sku: string;
  current_stock: number;
  selling_price: number;
  cost_price: number;
  description: string;
  featured_image_url: string | null;
  gallery_images: string[] | null;
  attributes: Record<string, any>;
  is_active: boolean;
  is_on_sale: boolean;
  discount_percentage?: number;
}

export interface CheckInItem {
  product: Product;
  quantity: number;
  notes?: string;
  batch_number?: string;
  expiry_date?: string;
}

export interface StockUpdatePayload {
  product_id: number;
  quantity: number;
  type: 'purchase' | 'return_in' | 'adjustment';
  notes?: string;
  batch_number?: string;
  expiry_date?: string;
}

export interface DiscountPayload {
  product_id: number;
  discount_percentage: number;
  start_date: string;
  end_date: string;
}

export interface BarcodeLookupResult {
  product: Product;
  barcode: string;
}


// ========== INVENTORY COUNT ==========
export interface InventoryCount {
  id: number;
  count_reference: string;          // unique human-readable ID
  warehouse_id: number;
  warehouse?: Warehouse;
  created_by?: number;
  creator?: { id: number; name: string };
  approved_by?: number;
  approver?: { id: number; name: string };
  status: 'draft' | 'in_progress' | 'completed' | 'approved' | 'cancelled';
  count_date: string;               // YYYY-MM-DD
  completed_at?: string | null;
  notes?: string | null;
  metadata?: Record<string, any> | null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  items?: InventoryCountItem[];
  total_counted_items?: number;
  discrepancy_count?: number;
}

export interface InventoryCountCreateData {
  count_reference?: string;         // auto‑generate if empty
  warehouse_id: number;
  count_date?: string;              // default today
  status?: 'draft' | 'in_progress' | 'completed' | 'approved' | 'cancelled';
  notes?: string | null;
  metadata?: Record<string, any> | null;
}

export interface InventoryCountUpdateData extends Partial<InventoryCountCreateData> {
  // all fields optional
  items?: InventoryCountItem[];

}

// ========== INVENTORY COUNT ITEM ==========
export interface InventoryCountItem {
  id: number;
  inventory_count_id: number;
  product_item_id: number;
  product?: Product;
  barcode_id?: number | null;
  barcode?: { barcode: string };
  system_quantity: number;
  counted_quantity: number;
  difference: number;
  status: 'pending' | 'counted' | 'verified' | 'adjusted';
  counted_by?: number | null;
  counter?: { id: number; name: string };
  verified_by?: number | null;
  verifier?: { id: number; name: string };
  notes?: string | null;
  metadata?: Record<string, any> | null;
  created_at: string;
  updated_at: string;
}

export interface InventoryCountItemCreateData {
  inventory_count_id: number;
  product_item_id: number;
  barcode_id?: number | null;
  system_quantity: number;
  counted_quantity?: number;        // default 0
  status?: 'pending' | 'counted' | 'verified' | 'adjusted';
  counted_by?: number | null;
  notes?: string | null;
  metadata?: Record<string, any> | null;
}

export interface InventoryCountItemUpdateData extends Partial<InventoryCountItemCreateData> {
  // all fields optional
  items?: InventoryCountItem[];
}

export interface InventoryFilters{
  search?: string;
  warehouse_id?: number;
  status?: 'draft' | 'in_progress' | 'completed' | 'approved' | 'cancelled';
  count_date_from?: string; // YYYY-MM-DD
  count_date_to?: string;   // YYYY-MM-DD
  include_items?: boolean;
  page?: number;
  per_page?: number;
}

