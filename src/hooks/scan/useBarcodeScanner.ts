// import { useState, useCallback } from 'react';
// import toast from 'react-hot-toast';
// import { scanService } from '../../api/services/scanService';
// import type { Product, ScanAction } from '../../types/scan.types';

// export const useBarcodeScanner = () => {
//   const [barcode, setBarcode] = useState<string | null>(null);
//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [action, setAction] = useState<ScanAction>('check_in');
//   const [quantity, setQuantity] = useState(1);
//   const [processing, setProcessing] = useState(false);

//   const lookupProduct = useCallback(async (code: string) => {
//     setBarcode(code);
//     setLoading(true);
//     setError(null);
//     try{
//         const result = await scanService.lookupBarcode(code);
//         setProduct(result.product);
//     }catch(err: any){
//         const msg = err.response?.data?.message || 'Product not found';
//       setError(msg);
//       toast.error(msg);
//       setProduct(null);
//     }finally{
//       setLoading(false);
//     }
//   }, []);

//   const processTransaction = useCallback(async () => {
//     if(!barcode || !product) return;
//     setProcessing(true);
//     setError(null);
//     try{
//         const payload = {
//            product_item_id: product.id,
//            quantity_change: quantity,
//            action: action,
//            type: action === 'check_in' ? 'purchase' : 'sale',
//             reason: `Barcode scan: ${action}`,
//            notes: `Scanned barcode: ${barcode}`,
//            barcode: barcode,

//         }
//         const result = await scanService.processTransaction(payload);
//         setProduct(result.product);
//         toast.success(
//         action === 'check_in'
//           ? `Stock increased by ${quantity}`
//           : `Stock decreased by ${quantity}`
//       );
//       setQuantity(1);
//     }catch(err: any){
//         const msg = err.response?.data?.message || 'Failed to process transaction';
//       setError(msg);
//       toast.error(msg);
//     }finally{
//       setProcessing(false);
//     }
//   }, [barcode, product, action, quantity]);
//   const reset = useCallback(() => {
//     setBarcode(null);
//     setProduct(null);
//     setError(null);
//     setQuantity(1);
//   }, []);

//    return {
//     barcode,
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
//   };
// }

import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { scanService } from '../../api/services/scanService';
import type { Product } from '../../types/scan.types';

export const useBarcodeScanner = () => {
  const [scanning, setScanning] = useState(true);
  const [currentBarcode, setCurrentBarcode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lookupProduct = useCallback(async (code: string): Promise<Product | null> => {
    setCurrentBarcode(code);
    setLoading(true);
    setError(null);
    try {
      const result = await scanService.lookupBarcode(code);
      return result.product;
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Product not found';
      setError(msg);
      toast.error(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const resetScanner = useCallback(() => {
    setCurrentBarcode(null);
    setError(null);
    setScanning(true);
  }, []);

  return {
    scanning,
    setScanning,
    currentBarcode,
    loading,
    error,
    lookupProduct,
    resetScanner,
  };
};