// // src/pages/ScanPage.tsx

// import { useState } from "react";
// import { FiAlertCircle } from "react-icons/fi";
// import { useBarcodeScanner } from "../../hooks/scan/useBarcodeScanner";
// import { Scanner } from "../../components/dashboard/scan/Scanner";
// import { ManualEntry } from "../../components/dashboard/scan/ManualEntry";
// import { ProductCard } from "../../components/dashboard/scan/ProductCard";

// const ScanPage = () => {
//   const [scanning, setScanning] = useState(true);
//   const {
//     product,
//     loading,
//     error,
//     action,
//     quantity,
//     processing,
//     lookupProduct,
//     processTransaction,
//     setAction,
//     setQuantity,
//     reset,
//   } = useBarcodeScanner();

//   const handleScan = (barcode: string) => {
//     setScanning(false);
//     lookupProduct(barcode);
//   };

//   const handleReset = () => {
//     setScanning(true);
//     reset();
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h1 className="text-2xl font-bold text-gray-900 mb-2">Barcode Scanner</h1>
//       <p className="text-sm text-gray-500 mb-6">
//         Scan a product barcode to view details and update stock
//       </p>

//       <Scanner scanning={scanning} onScan={handleScan} onReset={handleReset} />
//       <ManualEntry onLookup={handleScan} />

//       {/* Loading indicator */}
//       {loading && (
//         <div className="flex justify-center py-12">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
//         </div>
//       )}

//       {/* Error */}
//       {error && !loading && (
//         <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
//           <FiAlertCircle className="text-red-500 mt-0.5" size={18} />
//           <div>
//             <p className="text-sm font-medium text-red-800">Not found</p>
//             <p className="text-xs text-red-600 mt-1">{error}</p>
//           </div>
//         </div>
//       )}

//       {/* Product details */}
//       {product && !loading && (
//         <ProductCard
//           product={product}
//           action={action}
//           quantity={quantity}
//           processing={processing}
//           onActionChange={setAction}
//           onQuantityChange={setQuantity}
//           onSubmit={processTransaction}
//         />
//       )}
//     </div>
//   );
// };

// export default ScanPage;

import { useState } from "react";
import { Scanner } from "../../components/dashboard/scan/Scanner";
import { ProductCartItem } from "../../components/dashboard/scan/ProductCartItem";
import { CartModal } from "../../components/dashboard/scan/CartModal";
import { useBarcodeScanner } from "../../hooks/scan/useBarcodeScanner";
import { useScanCart } from "../../hooks/scan/useScanCart";
import { FiShoppingCart } from "react-icons/fi";
import toast from "react-hot-toast";
import { scanService } from "../../api/services/scanService";

const ScanPage = () => {
  const { scanning, setScanning, lookupProduct, resetScanner, loading } =
    useBarcodeScanner();

  const {
    cartItems,
    showCheckoutModal,
    setShowCheckoutModal,
    addOrUpdateItem,
    updateQuantity,
    removeItem,
    clearCart,
    getTotalAmount,
    getItemsByAction,
  } = useScanCart();

  const [processingPayment, setProcessingPayment] = useState(false);

  const handleScan = async (barcode: string) => {
    setScanning(false);
    const product = await lookupProduct(barcode);
    if (product) {
      // Default action is check_out with quantity 1
      addOrUpdateItem(product, "check_out", 1);
      toast.success(`Added: ${product.name}`);
    }
    // Keep scanner paused - user can click "Scan Another" to scan more
  };

  const handleProcessPayment = async () => {
    setProcessingPayment(true);
    try {
      // Process each checkout item
      const checkoutItems = cartItems.filter(
        (item) => item.action === "check_out",
      );

      for (const item of checkoutItems) {
        await scanService.processTransaction({
          barcode: item.product.barcode || "",
          action: item.action,
          quantity: item.quantity,
        });
      }

      toast.success(`Successfully processed ${checkoutItems.length} items`);
      clearCart();
      setShowCheckoutModal(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Payment failed");
    } finally {
      setProcessingPayment(false);
    }
  };

  const { check_in: checkInItems, check_out: checkOutItems } =
    getItemsByAction();
  const totalAmount = getTotalAmount();

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Barcode Scanner</h1>
          <p className="text-sm text-gray-500">Scan products to add to cart</p>
        </div>
        {cartItems.length > 0 && (
          <button
            onClick={() => setShowCheckoutModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600"
          >
            <FiShoppingCart size={18} />
            <span className="font-medium">Checkout</span>
            {checkOutItems.length > 0 && (
              <span className="bg-white text-emerald-600 rounded-full px-2 py-0.5 text-xs font-bold">
                {checkOutItems.reduce((sum, i) => sum + i.quantity, 0)}
              </span>
            )}
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Scanner */}
        <div>
          <Scanner
            scanning={scanning}
            onScan={handleScan}
            onReset={resetScanner}
          />

          {loading && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
            </div>
          )}
        </div>

        {/* Right Column - Cart */}
        <div className="space-y-4">
          {/* Check Out Items */}
          {checkOutItems.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full" />
                Check Out (
                {checkOutItems.reduce((sum, i) => sum + i.quantity, 0)} items)
              </h2>
              <div className="space-y-3">
                {checkOutItems.map((item) => (
                  <ProductCartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Check In Items */}
          {checkInItems.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                Check In ({checkInItems.reduce(
                  (sum, i) => sum + i.quantity,
                  0,
                )}{" "}
                items)
              </h2>
              <div className="space-y-3">
                {checkInItems.map((item) => (
                  <ProductCartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </div>
            </div>
          )}

          {cartItems.length === 0 && !loading && (
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <FiShoppingCart className="mx-auto text-gray-300 text-4xl mb-3" />
              <p className="text-gray-500">No items in cart</p>
              <p className="text-xs text-gray-400 mt-1">
                Scan products to add them here
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Modal */}
      <CartModal
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        items={cartItems}
        totalAmount={totalAmount}
        onConfirm={() => setShowCheckoutModal(false)}
        onProcessPayment={handleProcessPayment}
        processing={processingPayment}
      />
    </div>
  );
};

export default ScanPage;
