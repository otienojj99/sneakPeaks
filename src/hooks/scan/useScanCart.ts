import { useState, useCallback } from 'react';
import type { CartItem, Product } from '../../types/scan.types';

export const  useScanCart = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [showCheckoutModal, setShowCheckoutModal] = useState(false);
    // Add or update item in cart

    const addOrUpdateItem = useCallback((
        product: Product,
        action: 'check_in' | 'check_out',
        quantity: number = 1
       
    ) => {
        setCartItems(prev => {
            const existingIndex = prev.findIndex( item => item.product.id === product.id && item.action === action)

            const unitPrice = product.selling_price;
            const totalPrice = unitPrice * quantity;

            if(existingIndex >= 0){
                const updateItems = [...prev];
                const newQuantity = updateItems[existingIndex].quantity + quantity;

                updateItems[existingIndex] = {
                    ...updateItems[existingIndex],
                    quantity:newQuantity,
                    totalPrice: unitPrice * newQuantity
                }
                return updateItems;
            }else{
                return [
                    ...prev,
                    {
                        id: `${product.id}-${action}`,
                        product,
                        quantity,
                        action,
                        unitPrice,
                        totalPrice,
                    }
                ]
                }
            }, )

        }, []);

        // Update quantity for a specific item
  const updateQuantity = useCallback((itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity, totalPrice: item.unitPrice * newQuantity }
          : item
      )
    );
  }, []);

  // Remove item from cart
  const removeItem = useCallback((itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  }, []);

  // Clear cart
  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  // Get total amount (only for check_out items)
  const getTotalAmount = useCallback(() => {
    return cartItems
      .filter(item => item.action === 'check_out')
      .reduce((sum, item) => sum + item.totalPrice, 0);
  }, [cartItems]);


  // Get items grouped by action (for display)
  const getItemsByAction = useCallback(() => {
    return {
      check_in: cartItems.filter(item => item.action === 'check_in'),
      check_out: cartItems.filter(item => item.action === 'check_out'),
    };
  }, [cartItems]);

  return {
    cartItems,
    showCheckoutModal,
    setShowCheckoutModal,
    addOrUpdateItem,
    updateQuantity,
    removeItem,
    clearCart,
    getTotalAmount,
    getItemsByAction,
  };
}