import { useState, useCallback, useEffect } from 'react';
import type { ProductFilters } from '../../types/product.types';

type TabId = 
  | 'all' 
  | 'new-arrivals' 
  | 'trending' 
  | 'best-sellers' 
  | 'deals'
  | 'men'
  | 'women'
  | 'kids'
  | 'sports'
  | 'formal'
  | 'lifestyle'
  | 'running';


const defaultFilters: ProductFilters = {
  search: undefined,
  category_id: null,
  brand_id: null,
  warehouse_id: null,
  is_active: null,
  is_featured: null,
  is_new: null,
  is_on_sale: null,
  stock_status: null,
  price_min: null,
  price_max: null,
  stock_min: null,
  stock_max: null,
  sort_by: 'created_at',
  sort_dir: 'desc',
  page: 1,
  per_page: 15,
  trashed: null,
  audience: null,
};

const tabFilterMap: Record<TabId, Partial<ProductFilters>> = {
  'all': {
    sort_by: 'created_at',
    sort_dir: 'desc',
    is_new: null,
    is_featured: null,
    is_on_sale: null,
    audience: null,
  },
  'new-arrivals': {
    is_new: true,
    sort_by: 'created_at',
    sort_dir: 'desc',
  },
  'best-sellers': {
    sort_by: 'sales_count',
    sort_dir: 'desc',
  },
  'trending': {
    sort_by: 'views_count',
    sort_dir: 'desc',
  },
  'deals': {
    is_on_sale: true,
    sort_by: 'selling_price',
    sort_dir: 'asc',
  },
  'men': {
    audience: ['men'],
  },
  'women': {
    audience: ['women'],
  },
  'kids': {
    audience: ['kids'],
  },
  'sports': {
    // You can map this to a category or attribute, e.g., category_id: 5
    // For demonstration, we leave it as is, but you can add your own logic.
    // Example: category_id: 5,
  },
  'formal': {
    // category_id: 6,
  },
  'lifestyle': {
    // category_id: 7,
  },
  'running': {
    // category_id: 8,
  },
};

export const useTabFilters = (initialTab: TabId = 'all') => {
    const [activeTab, setActiveTab] = useState<TabId>(initialTab);
    const [filters, setFilters] = useState<ProductFilters>(() => ({
        ...defaultFilters,
        ...tabFilterMap[initialTab],
    }));


    const applyTab = useCallback((tabId: TabId) =>{
         const overrides = tabFilterMap[tabId] || {};
     const newFilters = {
      ...defaultFilters,
      ...overrides,
      page: 1, // reset page
    };
     console.log(`🔄 applyTab called for: "${tabId}"`);
    console.log(`📋 Overrides:`, overrides);
    console.log(`📋 New filters:`, newFilters);

    setFilters(newFilters);
    setActiveTab(tabId);
    }, []);  


     // ─── Update a single filter (useful for user interactions) ──

      const updateFilter = useCallback((key: keyof ProductFilters, value: any) => {
    setFilters((prev) => {
      const updated = { ...prev, [key]: value };
      console.log(`✏️ updateFilter: ${key} =`, value, updated);
      return updated;
    });
  }, []);

     // ─── Reset all to default (without tab override) ────────────

     const resetToDefault = useCallback(() => {
        setFilters(defaultFilters);
      }, []);

    
      return {
    activeTab,
    filters,
    applyTab,
    updateFilter,
    resetToDefault,
    setActiveTab,
  };
}