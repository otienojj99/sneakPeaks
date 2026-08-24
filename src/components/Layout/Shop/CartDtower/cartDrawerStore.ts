import { create } from "zustand";

/**
 * cartDrawerStore.ts
 * Cart DATA lives in cartStore.ts (single source of truth). This store
 * holds only whether the drawer is open — pure UI state, so nothing here
 * duplicates or shadows cart data. Any component can call
 * `useCartDrawerStore.getState().open()` (e.g. after `addItem`) or use
 * the hook reactively (e.g. `CartButton` toggling on click).
 */
interface CartDrawerState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const useCartDrawerStore = create<CartDrawerState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
