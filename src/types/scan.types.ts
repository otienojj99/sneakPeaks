// src/types/scan.types.ts

export interface Product {
  id: number;
  name: string;
  sku: string;
  current_stock: number;
  selling_price: number;
  image?: string;
  
}

export interface BarcodeLookupResult {
  product: Product;
  barcode: string;
}

export type ScanAction = 'check_in' | 'check_out';

export interface ScanPayload {
  product_item_id: number;
  quantity_change: number;
  type: string;
  reason: string;
  notes?: string;
  barcode: string;
  action: ScanAction;
}
export interface CartItem {
  id: string; // unique key for React
  product: Product;
  quantity: number;
  action: 'check_in' | 'check_out';
  unitPrice: number;
  totalPrice: number;
}

export interface ScanResponse {
  product: Product;
  transaction: any;
  // other transaction details
}