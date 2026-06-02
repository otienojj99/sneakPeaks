// src/types/warehouse.types.ts

import type { ApiResponse, PaginatedResponse} from '../types/api.types';

// =============================================
// Domain Entity
// =============================================

export interface Warehouse {
  id: number;
  name: string;
  code: string;
  description: string | null;
  address_line1: string;
  address_line2: string | null;
  city: string;
  state: string | null;
  postal_code: string;
  country: string;
  phone: string | null;
  email: string | null;
  manager_name: string | null;
  is_active: boolean;
  is_primary: boolean;
  metadata: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  created_by?: number | null;
  updated_by?: number | null;
  deleted_by?: number | null;
}

// =============================================
// Form / Mutation Payloads
// =============================================

export interface WarehouseCreateData {
  name: string;
  code: string;
  description?: string | null;
  address_line1: string;
  address_line2?: string | null;
  city: string;
  state?: string | null;
  postal_code: string;
  country: string;
  phone?: string | null;
  email?: string | null;
  manager_name?: string | null;
  is_active?: boolean;
  is_primary?: boolean;
  metadata?: Record<string, unknown> | null;
}

export interface WarehouseUpdateData extends Partial<Omit<WarehouseCreateData, 'code' | 'name'>> {
  name?: string;
  code?: string;
  // other fields are already optional
}

// =============================================
// Filters & Sorting
// =============================================

export type WarehouseSortField =
  | 'name'
  | 'code'
  | 'city'
  | 'country'
  | 'created_at'
  | 'updated_at';

export type ToggleableFlag = | 'is_active' | 'is_primary'

export type SortDirection = 'asc' | 'desc';
export interface WarehouseFilters {
  search?: string;               // searches name, code, city, country
  is_active?: boolean | null;
  is_primary?: boolean | null;
  country?: string | null;
  city?: string | null;
  sort_by?: WarehouseSortField;
  sort_dir?: SortDirection;
  page?: number;
  per_page?: number;
  trashed?: 'only' | 'with' | null; // for soft delete filtering
}

// =============================================
// Bulk Actions
// =============================================

export type WarehouseBulkAction =
  | { action: 'activate' }
  | { action: 'deactivate' }
  | { action: 'delete' }
  | { action: 'restore' };

export interface WarehouseBulkActionPayload {
  warehouse_ids: number[];
  bulk: WarehouseBulkAction;
}

// =============================================
// API Response Wrappers
// =============================================

export type WarehouseApiResponse = ApiResponse<Warehouse>;
export type WarehousesPaginatedResponse = PaginatedResponse<Warehouse>;