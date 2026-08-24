// Helper functions for cart operations


import type { Product } from "../../../../../types/product.types";
import type { CartItem  } from "./cartTypes";

// Finding cart item by product ID

export const findCartItem = (
    cart: CartItem[],
    productId: string | number,

): CartItem | undefined => {
    return cart.find((item) => item.id === productId);
}


export const  getTotalPrice = (items: CartItem[]): number =>{
    return items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
}
// calculating total price of cart items

export const getTotalItemCount = (items: CartItem[]): number =>{

    return items.reduce((count, item) => count + item.quantity, 0);

};

export const formatPrice = (amount: number, currency: string = "KES"): string =>{
    return new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency,
    }).format(amount);


};

// check if item is in cart is true

export const isProductInCart = (items: CartItem[], productId: string | number): boolean =>{
    return items.some((item) => item.id === productId);

}


/**
 * Create a new cart item from a product and quantity.
 */

export const createCartItem = (product: Product, quantity: number = 1, variationId?: number,  size?: string,
  color?: string): CartItem =>{

    const variation = product.variations.find(
        (v) => v.id === variationId
    )
    return {
    id: `${product.id}-${variationId ?? "default"}-${color ?? ""}-${size ?? ""}`,

    product,

    quantity,

    unitPrice: variation
      ? variation.final_price
      : Number(product.selling_price),

    variationId,
    size,
    color,
  };
    
}