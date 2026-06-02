import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { inventoryService } from '../../api/services/inventoryService';

import type { Product } from '../../types/inventory.types';

export const useCheckIn = () => {
    const [scanning, setScanning] = useState(true);
    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [batchNumber, setBatchNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [notes, setNotes] = useState('');

    // Scan barcode and lookup product
    const lookupProduct = useCallback(async (barcode: string): Promise<Product | null> => {
        setLoading(true);

        try{
             const result = await inventoryService.lookupBarcode(barcode);
            setCurrentProduct(result.product);
            return result.product;
        }catch(err: any){
            const msg = err.response?.data?.message || 'Product not found';
            toast.error(msg);
            return null;
        }finally{
            setLoading(false);
        }

    },[]);

     // Update stock (check in)
  const updateStock = useCallback(async () => {
    if (!currentProduct) return;
    setUpdating(true);

    try{
        const payload = {
        product_id: currentProduct.id,
        quantity: quantity,
        type: 'purchase' as const,
        notes: notes || `Check in via scanner`,
        batch_number: batchNumber,
        expiry_date: expiryDate,
      };

      const result = await inventoryService.updateStock(payload);
      setCurrentProduct(result.product);
      toast.success(`Stock increased by ${quantity}`);

      // Reset form
      setQuantity(1);
      setBatchNumber('');
      setExpiryDate('');
      setNotes('');
    }catch(err: any){
      const msg = err.response?.data?.message || 'Failed to update stock';
      toast.error(msg);
    }finally{
      setUpdating(false);

    }
  }, [currentProduct, quantity, batchNumber, expiryDate, notes])

  // Update product details
  const updateProductDetails = useCallback(async (data: Partial<Product>) => {
    if (!currentProduct) return null;
    setUpdating(true);
    try {
      const updatedProduct = await inventoryService.updateProductDetails(currentProduct.id, data);
      setCurrentProduct(updatedProduct);
      toast.success('Product details updated');
      return updatedProduct;
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Failed to update product';
      toast.error(msg);
      return null;
    } finally {
      setUpdating(false);
    }
  }, [currentProduct]);

  // Upload image
  const uploadImage = useCallback(async (file: File, isPrimary: boolean = false) => {
    if (!currentProduct) return null;
    setUpdating(true);
    try {
      await inventoryService.uploadImage(currentProduct.id, file, isPrimary);
      toast.success('Image uploaded successfully');
      
      // Refresh product
      const refreshedProduct = await inventoryService.getProduct(currentProduct.id);
      setCurrentProduct(refreshedProduct);
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Failed to upload image';
      toast.error(msg);
      return null;
    } finally {
      setUpdating(false);
    }
  }, [currentProduct]);

  // Add discount
  const addDiscount = useCallback(async (discountPercentage: number, startDate: string, endDate: string) => {
    if (!currentProduct) return null;
    setUpdating(true);
    try {
      const payload = {
        product_id: currentProduct.id,
        discount_percentage: discountPercentage,
        start_date: startDate,
        end_date: endDate,
      };
      const updatedProduct = await inventoryService.addDiscount(payload);
      setCurrentProduct(updatedProduct);
      toast.success(`${discountPercentage}% discount applied`);
      return updatedProduct;
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Failed to add discount';
      toast.error(msg);
      return null;
    } finally {
      setUpdating(false);
    }
  }, [currentProduct]);

  // Remove discount
  const removeDiscount = useCallback(async () => {
    if (!currentProduct) return null;
    setUpdating(true);
    try {
      const updatedProduct = await inventoryService.removeDiscount(currentProduct.id);
      setCurrentProduct(updatedProduct);
      toast.success('Discount removed');
      return updatedProduct;
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Failed to remove discount';
      toast.error(msg);
      return null;
    } finally {
      setUpdating(false);
    }
  }, [currentProduct]);

  const reset = useCallback(() => {
    setCurrentProduct(null);
    setQuantity(1);
    setBatchNumber('');
    setExpiryDate('');
    setNotes('');
    setScanning(true);
  }, []);

   return {
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
  };
}