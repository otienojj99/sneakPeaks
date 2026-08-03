import type{ProductFilters} from "./product.types"

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

export interface ColorOption {
  id: string;
  label: string;
  /** CSS color for the swatch */
  hex: string;
  available?: boolean;
}

// ========== TREE (nested structure) ==========
export interface CategoryTree extends Category {
  children: CategoryTree[]
  depth: number
}

export interface SizeOption {
  id: string;
  label: string;
  available?: boolean;
}

/**
 * SidebarFilterChange
 * The full shape SidebarFilters can emit. `category_id`/`price_min`/
 * `price_max` map 1:1 to your existing `ProductFilters`; `color`/`size`
 * are additive (not yet part of your backend `ProductFilters` type) since
 * the brief asks the sidebar to be "capable of emitting" them without
 * assuming how your product grid/API consumes them yet. Spread the
 * relevant subset into your real `ProductFilters` object where you handle
 * this callback.
 */
export interface SidebarFilterChange extends ProductFilters {
  color?: string;
  size?: string;
}
