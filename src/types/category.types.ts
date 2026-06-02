// ========== CATEGORY ==========
export interface Category {
  id: number
  name: string
  slug: string
  description: string | null
  parent_id: number | null
  is_active: boolean
  sort_order: number
  image: string | null
  full_path: string
  created_at: string
  updated_at: string
  deleted_at?: string | null

  // Relations
  children?: Category[]
  parent?: Category
  products_count?: number
}

// ========== CREATE ==========
export interface CategoryCreateData {
  name: string
  slug?: string
  description?: string | null
  parent_id?: number | null
  is_active?: boolean
  sort_order?: number
  image?: File | null
}

// ========== UPDATE ==========
export interface CategoryUpdateData {
  name?: string
  slug?: string
  description?: string | null
  parent_id?: number | null
  is_active?: boolean
  sort_order?: number
  image?: File | null
}

// ========== FILTERS ==========
export interface CategoryFilters {
  search?: string
  is_active?: boolean
  parent_id?: number | null
  page?: number
  per_page?: number
  sort_by?: 'name' | 'sort_order' | 'created_at'
  sort_order?: 'asc' | 'desc'
  include?: string // e.g., 'children,parent,products_count'
}

// ========== TREE (nested structure) ==========
export interface CategoryTree extends Category {
  children: CategoryTree[]
  depth: number
}