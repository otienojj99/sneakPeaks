import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useCreateProduct } from "../../hooks/products/useProductMutations";
import ProductForm from "../../components/dashboard/products/ProductForm";
import type { ProductFormData, ProductUpdateFormData } from "../../types/product.types";

const CreateProduct = () => {
  const navigate = useNavigate();
  const { execute: createProduct, loading, error } = useCreateProduct();

  // TODO: fetch from their own hooks
  const categories = [{ id: 1, name: "Laptops", parent_id: null }];
  const brands = [{ id: 1, name: "Nike" }];
  const warehouses = [{ id: 1, name: "Main Warehouse", code: "WH001" }];

  const handleSubmit = async (data: ProductFormData) => {
    try {
      const product = await createProduct(data);
      toast.success("Product created successfully");
      navigate(`/products/${product.id}`);
    } catch (error: any) {
      toast.error(error?.message || "Failed to create product");
    }
  };

  const handleCancel = () => {
    navigate("/products");
  };

  return (
    <div className="space-y-6">
      <ProductForm
        mode="create"
        isSubmitting={loading}
        submitError={error}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        categories={categories}
        brands={brands}
        warehouses={warehouses}
      />
    </div>
  );
};

export default CreateProduct;
