import { useState, useCallback } from 'react';
import { promotionService } from '../../api/services/discountService';
import type {
  Discount,
  CartItemForDiscount,
  CartDiscountResult,
} from '../../types/product.types';
import toast from 'react-hot-toast';


export const usePromotions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [banners, setBanners] = useState<Discount[]>([]);
  const [productDiscounts, setProductDiscounts] = useState<Discount[]>([]);
  const [cartResult, setCartResult] = useState<CartDiscountResult | null>(null);

  const fetchBanners = useCallback(async (limit = 5) =>{
    setIsLoading(true);
    try {
      const response = await promotionService.getBanners(limit);
      setBanners(response.data);
      return response.data;
    } catch (err: any) {
      toast.error('Failed to load banners');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ---- Get discounts for a specific product ----

  const fetchProductDiscounts = useCallback(async (productId: number,  quantity = 1) => {
    setIsLoading(true);
    try {
      const response = await promotionService.getProductDiscounts(productId, quantity);
      setProductDiscounts(response.data);
      return response.data;
    } catch (err: any) {
      toast.error('Failed to load product discounts');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);
    // ---- Calculate cart discounts ---

    const calculateCart = useCallback(async (items: CartItemForDiscount[]) => {
    setIsLoading(true);
     try {
      const response = await promotionService.calculateCart(items);
      setCartResult(response.data);
      return response.data;
    } catch (err: any) {
      toast.error('Failed to calculate cart discounts');
      return null;
    } finally {
      setIsLoading(false);
    }
    }, []);

     // ---- Clear cart result (optional) ----
  const clearCartResult = useCallback(() => {
    setCartResult(null);
  }, []);

  return {
     isLoading,
    banners,
    productDiscounts,
    cartResult,
    fetchBanners,
    fetchProductDiscounts,
    calculateCart,
    clearCartResult,
  }
  
}