import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Button from "../../components/common/Button";
import { useProducts1 } from "../../hooks/products/useProduct";
import ProductImageCarousel from "../../components/common/ProductImageCarousel";
import ProductRating from "../../components/common/ProductRating";
import ProductVariantDisplay from "../../components/common/ProductVariantDisplay";
import { getAllProductImages } from "../../utils/productImages";
import { useProductVariations } from "../../hooks/products/useProductVariations";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = Number(id);

  const { selectedProduct, fetchProduct, isLoading } = useProducts1();
  const [product, setProduct] = useState<any>(null);

  console.log("Product:", product);
  console.log("product.variants:", product?.variants);
  console.log("product.variations:", product?.variations);
  const [selectedVariant, setSelectedVariant] = useState<{
    id: string | number;
  } | null>(null);
  const { variations, fetchVariations } = useProductVariations();
  useEffect(() => {
    const loadProduct = async () => {
      const result = await fetchProduct(productId);
      if (result) {
        setProduct(result);
        console.log("ProductDetail.loadProduct - fetched product:", result);
      } else {
        toast.error("Failed to load product");
        navigate("/dashboard/products");
      }
    };

    if (productId) {
      loadProduct();
    }
  }, [productId, fetchProduct, navigate]);

  useEffect(() => {
    if (product?.id) {
      fetchVariations(product.id);
    }
  }, [product?.id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6">
        <p className="text-gray-600">Product not found</p>
      </div>
    );
  }

  const formatPrice = (price: string | number) => {
    if (!price) return "—";
    return `KES ${Number(price).toLocaleString()}`;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const variants = Array.isArray(variations)
    ? variations.map((v) => ({
        id: String(v.id),
        color: v.name || "Variant",
        colorCode: "#cccccc",
        size: v.attributes?.size || v.size || "—",
        price_adjustment: Number(v.price_adjustment || 0),
        final_price: Number(v.final_price || 0),
        inStock: (v.stock ?? 0) > 0,
        imageUrl: v.image_id ? [`/images/${v.image_id}`] : [],
      }))
    : [];

  console.log("VARIANTS", variants);
  console.log("Product JSON Variations", product?.variations);
  console.log("Database Variations", variations);

  const StockStatus = ({ stock }: { stock: number }) => {
    if (stock <= 0)
      return (
        <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
          Out of Stock
        </span>
      );
    if (stock <= product.reorder_point)
      return (
        <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          Low Stock
        </span>
      );
    return (
      <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
        In Stock
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-gray-600 mt-1">SKU: {product.sku}</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={() => navigate(`/dashboard/products`)}
          >
            ← Back
          </Button>
          <Button
            variant="primary"
            onClick={() => navigate(`/dashboard/products?edit=${product.id}`)}
          >
            ✏️ Edit
          </Button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        {/* Left Column – now contains a flex row */}
        <div className="lg:col-span-2">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Product Image – keep fixed size or make it responsive */}
            <div className="md:w-[400px] lg:w-[600px] shrink-0 relative">
              <ProductImageCarousel
                images={
                  getAllProductImages(product) ||
                  (product.featured_image
                    ? [{ id: 0, url: product.featured_image }]
                    : [])
                }
                productName={product.name}
              />
            </div>

            {/* Info Panel – sits next to the image on larger screens */}
            <div className="flex-1 space-y-4">
              {/* status eg new, featured, on sale, etc.  */}

              {/* <p className="text-sm font-medium text-green-500">NEW</p> */}
              <div className="flex gap-2 flex-wrap">
                {product.is_active && (
                  <span className="px-5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                )}
                {product.is_featured && (
                  <span className="px-5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    ★ Featured
                  </span>
                )}
                {product.is_new && (
                  <span className="px-5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    🆕 New
                  </span>
                )}
                {product.is_on_sale && (
                  <span className="px-5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">
                    🏷 On Sale
                  </span>
                )}
              </div>

              {/* Stock status */}
              <StockStatus stock={product.current_stock} />

              {/* You can add more “other info” here, e.g.: */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-4">
                  <p className="text-sm text-gray-500 backdrop-blur-sm bg-white/80 px-3 py-1 rounded-full">
                    SKU: {product.sku}
                  </p>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {product.name}
                  </h1>
                </div>

                {/* ratings stars and reviews count */}
                <div className="flex items-center gap-2">
                  <ProductRating />
                </div>

                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold text-gray-900">
                    ${formatPrice(product.selling_price)}
                  </p>
                </div>
                {/* Short description, variants, etc. */}

                <div className="space-y-2 border-b pb-4">
                  <p className="text-gray-600">
                    {/* {product.description} */}
                    {product.description}
                  </p>
                </div>

                {/* Variants display (color, size, price, stock status) with a carousel if more than 3 variants */}
                <ProductVariantDisplay
                  variants={variants}
                  selectedVariantId={selectedVariant?.id?.toString() || ""}
                  onSelect={setSelectedVariant}

                  // console log the variants to debug
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-2 space-y-6">
        '{/* Pricing Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 ">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Pricing</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Selling Price</p>
              <p className="text-2xl font-bold text-indigo-600">
                {formatPrice(product.selling_price)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Cost Price</p>
              <p className="text-xl font-semibold text-gray-900">
                {formatPrice(product.cost_price)}
              </p>
            </div>
            {product.compare_price && (
              <div>
                <p className="text-sm text-gray-600">Compare Price</p>
                <p className="text-lg line-through text-gray-400">
                  {formatPrice(product.compare_price)}
                </p>
              </div>
            )}
            {product.wholesale_price && (
              <div>
                <p className="text-sm text-gray-600">Wholesale Price</p>
                <p className="text-lg font-semibold text-gray-900">
                  {formatPrice(product.wholesale_price)}
                </p>
              </div>
            )}
          </div>
        </div>
        {/* Inventory Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Inventory
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Current Stock</p>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-2xl font-bold text-gray-900">
                  {product.current_stock}
                </p>
                <StockStatus stock={product.current_stock} />
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Unit</p>
              <p className="text-lg font-semibold text-gray-900 mt-1">
                {product.unit || "—"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Minimum Stock</p>
              <p className="text-lg font-semibold text-gray-900 mt-1">
                {product.minimum_stock}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Maximum Stock</p>
              <p className="text-lg font-semibold text-gray-900 mt-1">
                {product.maximum_stock}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Reorder Point</p>
              <p className="text-lg font-semibold text-gray-900 mt-1">
                {product.reorder_point}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Safety Stock</p>
              <p className="text-lg font-semibold text-gray-900 mt-1">
                {product.safety_stock}
              </p>
            </div>
          </div>
        </div>
        {/* Description */}
        {product.description && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Description
            </h2>
            <p className="text-gray-700 whitespace-pre-wrap">
              {product.description}
            </p>
            {product.short_description && (
              <>
                <h3 className="text-sm font-semibold text-gray-900 mt-4 mb-2">
                  Short Description
                </h3>
                <p className="text-gray-600">{product.short_description}</p>
              </>
            )}
          </div>
        )}
        {/* Relations */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Relations
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Category</p>
              <p className="text-base font-semibold text-gray-900 mt-1">
                {product.category?.name || "—"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Brand</p>
              <p className="text-base font-semibold text-gray-900 mt-1">
                {product.brand?.name || "—"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Primary Warehouse</p>
              <p className="text-base font-semibold text-gray-900 mt-1">
                {product.primary_warehouse?.name || "—"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Primary Supplier</p>
              <p className="text-base font-semibold text-gray-900 mt-1">
                {product.primary_supplier?.name || "—"}
              </p>
            </div>
          </div>
        </div>
        {/* Physical Dimensions */}
        {(product.weight ||
          product.length ||
          product.width ||
          product.height) && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Physical Dimensions
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {product.weight && (
                <div>
                  <p className="text-sm text-gray-600">Weight</p>
                  <p className="text-base font-semibold text-gray-900 mt-1">
                    {product.weight}
                  </p>
                </div>
              )}
              {product.length && (
                <div>
                  <p className="text-sm text-gray-600">Length</p>
                  <p className="text-base font-semibold text-gray-900 mt-1">
                    {product.length}
                  </p>
                </div>
              )}
              {product.width && (
                <div>
                  <p className="text-sm text-gray-600">Width</p>
                  <p className="text-base font-semibold text-gray-900 mt-1">
                    {product.width}
                  </p>
                </div>
              )}
              {product.height && (
                <div>
                  <p className="text-sm text-gray-600">Height</p>
                  <p className="text-base font-semibold text-gray-900 mt-1">
                    {product.height}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        {/* Additional Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Additional Info
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Barcode</p>
              <p className="text-base font-mono text-gray-900 mt-1">
                {product.barcode || "—"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">HS Code</p>
              <p className="text-base font-mono text-gray-900 mt-1">
                {product.hs_code || "—"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Country of Origin</p>
              <p className="text-base font-semibold text-gray-900 mt-1">
                {product.country_of_origin || "—"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Tax Class</p>
              <p className="text-base font-semibold text-gray-900 mt-1">
                {product.tax_class || "—"}
              </p>
            </div>
          </div>
        </div>
        {/* Statistics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Statistics
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Views</p>
              <p className="text-2xl font-bold text-gray-900">
                {product.views_count}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Sales</p>
              <p className="text-2xl font-bold text-gray-900">
                {product.sales_count}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Created</p>
              <p className="text-base text-gray-900 mt-1">
                {formatDate(product.created_at)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Updated</p>
              <p className="text-base text-gray-900 mt-1">
                {formatDate(product.updated_at)}
              </p>
            </div>
          </div>
        </div>
        {/* Debug: raw API product JSON (collapse to view) */}
        <details className="bg-gray-50 rounded p-4 mt-4">
          <summary className="cursor-pointer font-medium">
            Debug: raw product JSON
          </summary>
          <pre className="text-xs mt-2 overflow-auto max-h-64 whitespace-pre-wrap">
            {JSON.stringify(product, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
};

export default ProductDetail;
