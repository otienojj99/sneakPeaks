export interface ApiResponse<T> {
  success: boolean
  message: string | null
  data: T
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
    from: number
    to: number
  }
  links?: {
    first: string
    last: string
    prev: string | null
    next: string | null
  }
}


export interface ApiError {
  success: false
  message: string
  errors?: Record<string, string[]>
}

// src/types/auth.types.ts

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  first_name?: string;
  last_name?: string;
  email: string;
  phone?: string;
  role: 'super_admin' | 'admin1' | 'admin2' | 'user';
  warehouse_id?: number | null;
  password: string;
  password_confirmation: string;
  // is_active defaults to true on backend, so optional
  is_active?: boolean;
}

export interface User {
  id: number;
  name: string;
  first_name?: string;
  last_name?: string;
  email: string;
  phone?: string;
  profile_photo?: string;
  role: 'super_admin' | 'admin1' | 'admin2' | 'user';
  is_active: boolean;
  warehouse_id?: number | null;
  last_login_at?: string | null;
  last_login_ip?: string | null;
  preferences?: Record<string, any> | null;
  created_at: string;
  updated_at: string;
}

export type SortDirection = 'asc' | 'desc';