import type { Product } from "../../../../../types/product.types";

/**
 * A single item in the cart:
 * - We spread the Product fields (id, name, price, etc.)
 * - We add a `quantity` field.
 * - We also keep a copy of the product's price at the time of adding
 *   (so it doesn't change if the product price changes later).
 *   We'll use `unitPrice` to store the price snapshot.
 */


// export interface CartItem extends Product {
//     quantity: number;
//     unitPrice: number;
// }

// // The shape of the state
// export  interface CartState {
//     items: CartItem[];
// }

export interface CartItem {
  /**
   * Unique identity of this particular cart configuration.
   *
   * Example:
   * product 5 + variation 12 + size 42 + black
   */
  id: string;

  /**
   * The original product returned by the API.
   */
  product: Product;

  /**
   * Quantity selected by the customer.
   */
  quantity: number;

  /**
   * Price captured when the item was added to the cart.
   */
  unitPrice: number;

  /**
   * Selected variation/options.
   */
  variationId?: number;
  size?: string;
  color?: string;
}

export interface CartState {
  items: CartItem[];
}

/**
 * The actions that can be performed on the cart.
 * We combine them with the state in the store.
 */

export interface CartActions {
    addItem: (product: Product, quantity?: number,  variationId?: number, size?: string, color?: string) => void;

    removeItem: (productId: string) => void;

    increaseQuantity: (productId: string | number, amount?: number) => void;

    decreaseQuantity: (productId: string | number, amount?: number) => void;

    updateQuantity: (productId: string | number, newQuantity: number) => void;

    clearCart: () => void;

    isInCart: (productId: string | number) => boolean;

    totalItemCount: () => number;

    totalPrice: () => number;

}

export type CartStore = CartState & CartActions;