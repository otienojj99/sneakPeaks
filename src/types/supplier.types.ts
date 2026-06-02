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


export type PaginatedApiResponse<T> = ApiResponse<PaginatedData<T>>;

// ─── Domain Entities ──────────────────────────────────────────────

export interface Supplier {
    id: number;
    company_name: string;
    trade_name: string | null;
    supplier_code: string | null;
    tax_number: string | null;
    registration_number: string | null;
    contact_person: string | null;
    email: string | null;
    phone: string | null;
    mobile: string | null;
    fax: string | null;
    website: string | null;
    address_line1: string | null;
    address_line2: string | null;
    city: string | null;
    state: string | null;
    postal_code: string | null;
    country: string | null;
    payment_terms: string | null;
    currency: string | null;
    credit_limit: number | null;
    payment_due_days: number | null;
    bank_name: string | null;
    bank_account_name: string | null;
    bank_account_number: string | null;
    bank_sort_code: string | null;
    bank_swift_code: string | null;
    notes: string | null;
    metadata: Record<string, any> | null;
    is_active: boolean;
    is_preferred: boolean;
    rating: number | null;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

// ─── Form / Mutation payloads ─────────────────────────────────────

export interface SupplierCreateData {
    company_name: string;
    trade_name?: string | null;
    supplier_code?: string | null;
    tax_number?: string | null;
    registration_number?: string | null;
    contact_person?: string | null;
    email?: string | null;
    phone?: string | null;
    mobile?: string | null;
    fax?: string | null;
    website?: string | null;
    address_line1?: string | null;
    address_line2?: string | null;
    city?: string | null;
    state?: string | null;
    postal_code?: string | null;
    country?: string | null;
    payment_terms?: string | null;
    currency?: string | null;
    credit_limit?: number | null;
    payment_due_days?: number | null;
    bank_name?: string | null;
    bank_account_name?: string | null;
    bank_account_number?: string | null;
    bank_sort_code?: string | null;
    bank_swift_code?: string | null;
    notes?: string | null;
    metadata?: Record<string, any> | null;
    is_active?: boolean;
    is_preferred?: boolean;
    rating?: number | null;

}

export interface SupplierUpdateData {
    company_name?: string;
    trade_name?: string | null;
    supplier_code?: string | null;
    tax_number?: string | null;
    registration_number?: string | null;
    contact_person?: string | null;
    email?: string | null;
    phone?: string | null;
    mobile?: string | null;
    fax?: string | null;
    website?: string | null;
    address_line1?: string | null;
    address_line2?: string | null;
    city?: string | null;
    state?: string | null;
    postal_code?: string | null;
    country?: string | null;
    payment_terms?: string | null;
    currency?: string | null;
    credit_limit?: number | null;
    payment_due_days?: number | null;
    bank_name?: string | null;
    bank_account_name?: string | null;
    bank_account_number?: string | null;
    bank_sort_code?: string | null;
    bank_swift_code?: string | null;
    notes?: string | null;
    metadata?: Record<string, any> | null;
    is_active?: boolean;
    is_preferred?: boolean;
    rating?: number | null;
}

export interface SupplierFilters {
    search?: string;
    is_active?: boolean;
    is_preferred?: boolean;
    min_rating?: number;
    max_rating?: number;
    country?: string | null;
    city?: string | null;
    sort_by?: 'company_name' | 'rating' | 'created_at';
    sort_dir?: 'asc' | 'desc';
    page?: number;
    per_page?: number;
    trashed?: 'only' | 'with' | null;

}

// =============================================
// Bulk Actions
// =============================================

export type SupplierBulkAction =
    | { action: 'activate' }
    | { action: 'deactivate' }
    | { action: 'delete' }
    | { action: 'restore' }
    | { action: 'force_delete' };


export interface BulkActionPayload {
  product_ids: number[];
  bulk: SupplierBulkAction;
}

export type ToggleableFlag = | 'is_active' | 'is_preferred'

export interface SupplierMetadata {
   company_name: string;
    trade_name?: string | null;
    supplier_code?: string | null;
    tax_number?: string | null;
    registration_number?: string | null;
    contact_person?: string | null;
    email?: string | null;
    phone?: string | null;
    mobile?: string | null;
    fax?: string | null;
    website?: string | null;
    address_line1?: string | null;
    address_line2?: string | null;
    city?: string | null;
    state?: string | null;
    postal_code?: string | null;
    country?: string | null;
    payment_terms?: string | null;
    currency?: string | null;
    credit_limit?: number | null;
    payment_due_days?: number | null;
    bank_name?: string | null;
    bank_account_name?: string | null;
    bank_account_number?: string | null;
    bank_sort_code?: string | null;
    bank_swift_code?: string | null;
    notes?: string | null;
    is_active?: boolean;
    is_preferred?: boolean;
    rating?: number | null;
}

export interface FormErrors {
    company_name?: string;
    trade_name?: string;
    supplier_code?: string;
    email?: string;
    phone?: string;
    website?: string;
    mobile?: string;
    tax_number?: string;
    registration_number?: string;
    bank_account_number?: string;
    general?: string;
}



