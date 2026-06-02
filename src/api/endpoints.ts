export const ENDPOINTS = {
  // Auth
  LOGIN: '/login',
  REGISTER: '/register',
  LOGOUT: '/logout',
  ME: '/users',


   // ========== Customer Auth (Public/Storefront) ==========
  CUSTOMER_REGISTER: '/customers/register',
  CUSTOMER_LOGIN: '/customers/login',
  CUSTOMER_LOGOUT: '/customers/logout',
  CUSTOMER_ME: '/customers/me',
  CUSTOMER_VERIFY_EMAIL: '/customers/verify-email',
  CUSTOMER_FORGOT_PASSWORD: '/customers/forgot-password',
  CUSTOMER_RESET_PASSWORD: '/customers/reset-password',

  // ========== Customers (Admin manages) ==========
  CUSTOMERS: '/customers',
  // Categories
  CATEGORIES: '/categories',

  // Products
  PRODUCTS: '/products',
  PRODUCT_BULK_ACTION: '/products/bulk-action',

  // Product Images
  PRODUCT_IMAGES: '/images',

  // Product Variants
  PRODUCT_VARIANTS: '/products/{id}/variants',

  // Orders
  ORDERS: '/orders',

  // Users
  USERS: '/users',

  // Brands
  BRANDS: '/brands',

  // Warehouse
  WAREHOUSE: '/warehouses',
  WAREHOUSE_TOGGLE: '/warehouses/toggle-active',

  // 
  SUPPLIERS: '/suppliers',
 
  SUPPLIER_TOGGLE: '/suppliers/{id}/toggle-active',
  
  SUPPLIER_TOGGLE_PREFERRED: '/suppliers/{id}/toggle-preferred',
  
  SUPPLIER_RESTORE: '/suppliers/{id}/restore',
 
  SUPPLIER_FORCE_DELETE: '/suppliers/{id}/force',


  // Scanning
  BARCODES : '/barcodes',
  SCAN: '/scan',

  STOCK_UPDATE: '/stock/update',

  // Inventory
  INVENTORY_COUNTS: '/inventory-counts',
  INVENTORY_COUNT_ITEMS: '/inventory-count-items',

  // Dashboard
  DASHBOARD_STATS: '/dashboard/stats',
}