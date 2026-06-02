import type {
  SupplierCreateData,
  SupplierUpdateData,
} from '../types/supplier.types';

export const buildSupplierFormData = (
  data: SupplierCreateData | SupplierUpdateData
): FormData => {
  const formData = new FormData();

  const fields: (keyof typeof data)[] = [
    'company_name',
    'trade_name',
    'supplier_code',
    'tax_number',
    'registration_number',
    'contact_person',
    'email',
    'phone',
    'mobile',
    'fax',
    'website',
    'address_line1',
    'address_line2',
    'city',
    'state',
    'postal_code',
    'country',
    'payment_terms',
    'currency',
    'credit_limit',
    'payment_due_days',
    'bank_name',
    'bank_account_name',
    'bank_account_number',
    'bank_sort_code',
    'bank_swift_code',
    'notes',
    'is_active',
    'is_preferred',
    'rating',
  ];

  fields.forEach((field) => {
    const value = data[field];

    if (value !== undefined && value !== null) {
      // Handle booleans properly
      if (typeof value === 'boolean') {
        formData.append(field, value ? '1' : '0');
      }
      // Handle numbers
      else if (typeof value === 'number') {
        formData.append(field, String(value));
      }
      // Everything else (strings)
      else {
        formData.append(field, String(value));
      }
    }
  });

  // Handle metadata (object → Laravel array)
  if (data.metadata && typeof data.metadata === 'object') {
    Object.entries(data.metadata).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(`metadata[${key}]`, String(value));
      }
    });
  }

  return formData;
};