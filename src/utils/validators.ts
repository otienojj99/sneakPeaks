

// function validate(data: ProductFormData): FormErrors {
//   const errors: FormErrors = {};
//   if (!data.name.trim()) errors.name = 'Product name is required';
//   if (!data.sku.trim()) errors.sku = 'SKU is required';
//   if (data.cost_price < 0) errors.cost_price = 'Cost price cannot be negative';
//   if (data.selling_price <= 0) errors.selling_price = 'Selling price must be greater than 0';
//   if (data.selling_price < data.cost_price)
//     errors.selling_price = 'Selling price should not be less than cost price';
//   if (!data.description.trim()) errors.description = 'Description is required';
//   return errors;
// }