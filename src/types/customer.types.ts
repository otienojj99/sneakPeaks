// ========== CUSTOMER TYPES ==========
export type CustomerType = 'individual' | 'business' | 'wholesale'
export type CustomerStatus = 'active' | 'inactive' | 'blocked' | 'pending'
export type LoyaltyTier = 'bronze' | 'silver' | 'gold' | 'platinum'

// ========== CUSTOMER (Full) ==========
export interface Customer {
  id: number
  customer_code: string
  customer_type: CustomerType
  business_name?: string | null
  first_name: string
  last_name: string
  email: string
  phone?: string | null
  alternative_phone?: string | null
  email_verified_at?: string | null
  verification_token?: string | null

  // Address (business/wholesale only)
  address_line1?: string | null
  address_line2?: string | null
  city?: string | null
  state?: string | null
  postal_code?: string | null
  country?: string | null

  // Business fields (business/wholesale only)
  tax_number?: string | null
  registration_number?: string | null
  website?: string | null

  // Preferences
  currency?: string | null
  language?: string | null

  // Financial
  credit_limit?: number | null
  payment_due_days?: number | null
  account_balance?: number | null

  // Loyalty
  loyalty_points?: number | null
  loyalty_tier?: LoyaltyTier | null

  // Marketing
  marketing_emails?: boolean
  marketing_sms?: boolean

  // Activity
  last_login_at?: string | null
  last_login_ip?: string | null

  // Status
  status: CustomerStatus
  blocked_reason?: string | null
  notes?: string | null

  // Meta
  metadata?: Record<string, any> | null
  preferences?: Record<string, any> | null

  // Audit
  created_by?: number | null
  updated_by?: number | null
  deleted_by?: number | null
  created_at: string
  updated_at: string
  deleted_at?: string | null
}

// ========== CUSTOMER REGISTER (Individual - Self Register) ==========
export interface CustomerRegisterIndividual {
  customer_type: 'individual'
  first_name: string
  last_name: string
  email: string
  phone?: string
  password: string
  password_confirmation: string
  marketing_emails?: boolean
  marketing_sms?: boolean
}

// ========== CUSTOMER REGISTER (Business) ==========
export interface CustomerRegisterBusiness {
  customer_type: 'business'
  business_name: string
  first_name: string
  last_name: string
  email: string
  phone: string
  alternative_phone?: string
  password: string
  password_confirmation: string
  address_line1: string
  address_line2?: string
  city: string
  state?: string
  postal_code: string
  country: string
  tax_number?: string
  registration_number?: string
  website?: string
  marketing_emails?: boolean
  marketing_sms?: boolean
}

// ========== CUSTOMER REGISTER (Wholesale) ==========
export interface CustomerRegisterWholesale {
  customer_type: 'wholesale'
  business_name: string
  first_name: string
  last_name: string
  email: string
  phone: string
  alternative_phone?: string
  password: string
  password_confirmation: string
  address_line1: string
  address_line2?: string
  city: string
  state?: string
  postal_code: string
  country: string
  tax_number: string
  registration_number: string
  website?: string
  marketing_emails?: boolean
  marketing_sms?: boolean
}

// Union type for all register forms
export type CustomerRegisterData =
  | CustomerRegisterIndividual
  | CustomerRegisterBusiness
  | CustomerRegisterWholesale

// ========== CUSTOMER LOGIN ==========
export interface CustomerLoginCredentials {
  email: string
  password: string
}

// ========== CUSTOMER LOGIN RESPONSE ==========
export interface CustomerLoginResponse {
  customer: Customer
  token: string
}

// ========== CUSTOMER UPDATE (Admin manages) ==========
export interface CustomerUpdateData {
  customer_type?: CustomerType
  business_name?: string | null
  first_name?: string
  last_name?: string
  email?: string
  phone?: string | null
  alternative_phone?: string | null
  address_line1?: string | null
  address_line2?: string | null
  city?: string | null
  state?: string | null
  postal_code?: string | null
  country?: string | null
  tax_number?: string | null
  registration_number?: string | null
  website?: string | null
  currency?: string | null
  language?: string | null
  credit_limit?: number | null
  payment_due_days?: number | null
  loyalty_tier?: LoyaltyTier | null
  marketing_emails?: boolean
  marketing_sms?: boolean
  status?: CustomerStatus
  blocked_reason?: string | null
  notes?: string | null
}

// ========== CUSTOMER FILTERS (for listing) ==========
export interface CustomerFilters {
  search?: string
  customer_type?: CustomerType
  status?: CustomerStatus
  loyalty_tier?: LoyaltyTier
  city?: string
  country?: string
  page?: number
  per_page?: number
  sort_by?: string
  sort_order?: 'asc' | 'desc'
}