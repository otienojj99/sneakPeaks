import type { WarehouseCreateData, WarehouseUpdateData } from '../types/warehouse.types';


export const buildWarehouseFormDataBuilder = (
  data: WarehouseCreateData | WarehouseUpdateData
): FormData => {
  const formData = new FormData();

  const scalarFields: (keyof typeof data)[] = [
    'name', 'code', 'description',
    'address_line1', 'address_line2', 'city', 'state', 'postal_code', 'country',
    'phone', 'email', 'manager_name',
    'is_active', 'is_primary',
  ];

  scalarFields.forEach(field => {
    const value = data[field];

    if (value !== undefined && value !== null) {
      
      // 🔥 Handle booleans correctly
      if (typeof value === 'boolean') {
        formData.append(field, value ? '1' : '0');
      } else {
        formData.append(field, String(value));
      }
    }
  });

  // ✅ FIX metadata (important)
  if (data.metadata) {
    Object.entries(data.metadata).forEach(([key, value]) => {
      formData.append(`metadata[${key}]`, String(value));
    });
  }

  return formData;
};