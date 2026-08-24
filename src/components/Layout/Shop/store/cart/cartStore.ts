// store/cart/cartStore.ts

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product } from "../../../../../types/product.types";
import type { CartStore, CartItem } from "./cartTypes";
import {
  findCartItem,
  getTotalItemCount,
  getTotalPrice,
  isProductInCart,
  createCartItem,
} from "./cartUtils";

/**
 * Zustand store with persist middleware.
 * - Persists to localStorage under the key "cart-storage".
 */
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // ---- Initial state ----
      items: [],

      // ---- Actions ----

      addItem: ( product: Product, quantity: number = 1,variationId?: number,size?: string,color?: string) => {
          console.log("🛒 cartStore.addItem called");
        console.log("🛒 Product:", product);
        console.log("🛒 Quantity:", quantity);
        if (quantity <= 0) return;
        const { items } = get();

          console.log("🛒 Current cart items:", items);
        const existing = items.find(
          (item)=>item.product.id === product.id &&
            item.variationId === variationId &&
            item.size === size &&
            item.color === color
          )

          console.log("🛒 cartStore.addItem called",  existing );

       

        if (existing) {
          // If already in cart, just increase quantity
          set({
            items: items.map((item) =>
              item.id === existing.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          // New item: create with snapshot price
          set({
            items: [...items, createCartItem(product, quantity)],
          });
        }
      },

      removeItem: (productId: string | number) => {
        set({
          items: get().items.filter((item) => item.id !== productId),
        });
      },

      increaseQuantity: (productId: string | number, amount: number = 1) => {
        const { items } = get();
        const existing = findCartItem(items, productId);
        if (!existing) return;

        set({
          items: items.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + amount }
              : item
          ),
        });
      },

      decreaseQuantity: (productId: string | number, amount: number = 1) => {
        const { items } = get();
        const existing = findCartItem(items, productId);
        if (!existing) return;

        const newQuantity = existing.quantity - amount;
        if (newQuantity <= 0) {
          // Remove item if quantity becomes zero or negative
          set({
            items: items.filter((item) => item.id !== productId),
          });
        } else {
          set({
            items: items.map((item) =>
              item.id === productId
                ? { ...item, quantity: newQuantity }
                : item
            ),
          });
        }
      },

      updateQuantity: (productId: string | number, newQuantity: number) => {
        if (newQuantity < 0) return;
        const { items } = get();
        const existing = findCartItem(items, productId);
        if (!existing) return;

        if (newQuantity === 0) {
          // Remove item
          set({
            items: items.filter((item) => item.id !== productId),
          });
        } else {
          set({
            items: items.map((item) =>
              item.id === productId
                ? { ...item, quantity: newQuantity }
                : item
            ),
          });
        }
      },

      clearCart: () => {
        set({ items: [] });
      },

      isInCart: (productId: string | number) => {
        return isProductInCart(get().items, productId);
      },

      totalItemCount: () => {
        return getTotalItemCount(get().items);
      },

      totalPrice: () => {
        return getTotalPrice(get().items);
      },
    }),
    {
      name: "cart-storage", // key in localStorage
      storage: createJSONStorage(() => localStorage),
      // Optional: partialize to only persist `items` (since actions aren't serializable)
      partialize: (state) => ({ items: state.items }),
    }
  )
);