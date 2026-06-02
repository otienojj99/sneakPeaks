import { useState } from "react";
import { Scanner } from "../../components/dashboard/scan/Scanner";
import { StockUpdateForm } from "../../components/dashboard/inventory/StockUpdateForm";
import { ProductDetailsModal } from "../../components/dashboard/inventory/ProductDetailsModal";
import { ImageUploader } from "../../components/dashboard/inventory/ImageUploader";
import { DiscountManager } from "../../components/dashboard/inventory/DiscountManager";
import { useCheckIn } from "../../hooks/inventory/useCheckIn";
import {
  FiPackage,
  FiEdit2,
  FiInfo,
  FiDollarSign,
  FiPercent,
} from "react-icons/fi";

const CheckInPage = () => {
  const {
    scanning,
    setScanning,
    currentProduct,
    loading,
    updating,
    quantity,
    batchNumber,
    expiryDate,
    notes,
    setQuantity,
    setBatchNumber,
    setExpiryDate,
    setNotes,
    lookupProduct,
    updateStock,
    updateProductDetails,
    uploadImage,
    addDiscount,
    removeDiscount,
    reset,
  } = useCheckIn();

  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const handleScan = async (barcode: string) => {
    setScanning(false);
    await lookupProduct(barcode);
  };

  const handleReset = () => {
    reset();
    setScanning(true);
  };

  const handleStockSubmit = async () => {
    await updateStock();
    // Optionally reset after successful check-in
  };

  const handleUpdateProductDetails = async (
    data: Parameters<typeof updateProductDetails>[0],
  ) => {
    await updateProductDetails(data);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Check In Stock</h1>
      <p className="text-sm text-gray-500 mb-6">
        Scan a product barcode to receive stock
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Scanner */}
        <div>
          <Scanner
            scanning={scanning}
            onScan={handleScan}
            onReset={handleReset}
          />

          {loading && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
            </div>
          )}
        </div>

        {/* Right Column - Product Details & Actions */}
        <div>
          {currentProduct ? (
            <div className="space-y-4">
              {/* Product Card */}
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0">
                      {currentProduct.featured_image_url ? (
                        <img
                          src={currentProduct.featured_image_url}
                          alt={currentProduct.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FiPackage className="text-gray-400" size={28} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h2 className="text-lg font-bold text-gray-900">
                          {currentProduct.name}
                        </h2>
                        <button
                          onClick={() => setShowDetailsModal(true)}
                          className="text-emerald-500 hover:text-emerald-600 text-sm flex items-center gap-1"
                        >
                          <FiEdit2 size={14} /> Edit
                        </button>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        SKU: {currentProduct.sku}
                      </p>
                      <div className="mt-2 flex items-center gap-3">
                        <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          Current Stock: {currentProduct.current_stock}
                        </span>
                        <span className="text-xs font-medium bg-emerald-50 text-emerald-700 px-2 py-1 rounded">
                          KES {currentProduct.selling_price?.toLocaleString()}
                        </span>
                        {currentProduct.is_on_sale && (
                          <span className="text-xs font-medium bg-red-50 text-red-600 px-2 py-1 rounded">
                            SALE
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stock Update Form */}
                <div className="p-5">
                  <StockUpdateForm
                    quantity={quantity}
                    batchNumber={batchNumber}
                    expiryDate={expiryDate}
                    notes={notes}
                    onQuantityChange={setQuantity}
                    onBatchNumberChange={setBatchNumber}
                    onExpiryDateChange={setExpiryDate}
                    onNotesChange={setNotes}
                    onSubmit={handleStockSubmit}
                    isUpdating={updating}
                  />
                </div>
              </div>

              {/* Image Uploader */}
              {/* <ImageUploader
                images={
                  currentProduct.gallery_images
                    ? [
                        currentProduct.featured_image!,
                        ...currentProduct.gallery_images,
                      ]
                    : currentProduct.featured_image
                      ? [currentProduct.featured_image]
                      : []
                }
                onUpload={uploadImage}
                isUpdating={updating}
              /> */}

              {/* Discount Manager */}
              <DiscountManager
                currentDiscount={currentProduct.discount_percentage}
                onAddDiscount={addDiscount}
                onRemoveDiscount={removeDiscount}
                isUpdating={updating}
              />
            </div>
          ) : (
            !loading && (
              <div className="bg-gray-50 rounded-2xl p-8 text-center">
                <FiInfo className="mx-auto text-gray-300 text-4xl mb-3" />
                <p className="text-gray-500">No product selected</p>
                <p className="text-xs text-gray-400 mt-1">
                  Scan a barcode to check in stock
                </p>
              </div>
            )
          )}
        </div>
      </div>

      {/* Product Details Modal */}
      <ProductDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        product={currentProduct}
        onUpdate={handleUpdateProductDetails}
        isUpdating={updating}
      />
    </div>
  );
};

export default CheckInPage;
