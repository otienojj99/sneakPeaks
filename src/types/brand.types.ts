import type { ApiResponse,PaginatedResponse } from "./api.types"


// ─── Brand Types ───────────────────────────────────────────────

/**
 * Core Brand entity (matches backend response)
 */
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
  metadata: Record<string, unknown> | null; // stores extra info like founded_year, founder, social_media, etc.
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

// ─── Form / Mutation Payloads ───────────────────────────────────

/**
 * Data required to create a new brand
 */
export interface BrandCreateData {
  name: string;
  slug?: string;                // auto‑generated if omitted
  description?: string | null;
  logo?: File | null;           // file upload (will be handled with FormData)
  cover_image?: File | null;    // optional cover image file
  website?: string | null;
  email?: string | null;
  phone?: string | null;
  is_active?: boolean;
  is_featured?: boolean;
  sort_order?: number;
  meta_title?: string | null;
  meta_description?: string | null;
  meta_keywords?: string | null;
  metadata?: Record<string, unknown> | null;
}

/**
 * Data for updating an existing brand (all fields optional)
 */
export interface BrandUpdateData extends Partial<Omit<BrandCreateData, 'logo' | 'cover_image'>> {
  logo?: File | string | null;   // allow both File (new upload) or string (existing path) or null
  cover_image?: File | string | null;
}

// ─── Filters & Sorting ───────────────────────────────────────────

export type BrandSortField = 'name' | 'created_at' | 'sort_order' | 'is_active' | 'is_featured';

export type SortDirection = 'asc' | 'desc';

export interface BrandFilters {
  search?: string;
  is_active?: boolean | null;
  is_featured?: boolean | null;
  sort_by?: BrandSortField;
  sort_dir?: SortDirection;
  page?: number;
  per_page?: number;
  trashed?: 'only' | 'with' | null;
}

// ─── Reuse Generic API Types (already defined elsewhere) ─────────
// Assuming you already have ApiResponse<T> and PaginatedApiResponse<T> in a shared file.
// For completeness, we reference them here.

export type BrandApiResponse = ApiResponse<Brand>;
export type BrandsPaginatedResponse = PaginatedResponse<Brand>;

// ─── Bulk Actions ────────────────────────────────────────────────

export type BrandBulkAction =
  | { action: 'activate' }
  | { action: 'deactivate' }
  | { action: 'delete' }
  | { action: 'restore' }
  | { action: 'set_featured'; value: boolean };

export interface BrandBulkActionPayload {
  brand_ids: number[];
  bulk: BrandBulkAction;
}