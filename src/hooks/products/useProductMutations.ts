import { useState, useCallback } from 'react';
import { productService } from '../../api/services/productService';
import type {
  Product,
  ProductFormData,
  ToggleableFlag,
} from '../../types/product.types';

// ─── Generic mutation return shape ───────────────────────────────

interface MutationReturn<TInput, TResult = void> {
  execute: (input: TInput) => Promise<TResult>;
  loading: boolean;
  error: string | null;
  reset: () => void;
}

function useMutation<TInput, TResult = void>(
  mutationFn: (input: TInput) => Promise<TResult>,
): MutationReturn<TInput, TResult> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (input: TInput): Promise<TResult> => {
      setLoading(true);
      setError(null);
      try {
        const result = await mutationFn(input);
        return result;
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Operation failed';
        setError(msg);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [mutationFn],
  );

  const reset = useCallback(() => setError(null), []);

  return { execute, loading, error, reset };
}

// ─── Create ──────────────────────────────────────────────────────

export function useCreateProduct() {
  return useMutation<ProductFormData, Product>(async (data) => {
    const res = await productService.create(data);
    if (!res.success) throw new Error(res.message ?? 'Create failed');
    return res.data;
  });
}

// ─── Update ──────────────────────────────────────────────────────

export function useUpdateProduct() {
  return useMutation<{ id: number; data: Partial<ProductFormData> }, Product>(
    async ({ id, data }) => {
      const res = await productService.update(id, data);
      if (!res.success) throw new Error(res.message ?? 'Update failed');
      return res.data;
    },
  );
}

// ─── Delete (soft) ───────────────────────────────────────────────

export function useDeleteProduct() {
  return useMutation<number>(async (id) => {
    const res = await productService.delete(id);
    if (!res.success) throw new Error(res.message ?? 'Delete failed');
  });
}

// ─── Restore ─────────────────────────────────────────────────────

export function useRestoreProduct() {
  return useMutation<number>(async (id) => {
    const res = await productService.restore(id);
    if (!res.success) throw new Error(res.message ?? 'Restore failed');
  });
}

// ─── Force Delete ────────────────────────────────────────────────

export function useForceDeleteProduct() {
  return useMutation<number>(async (id) => {
    const res = await productService.forceDelete(id);
    if (!res.success) throw new Error(res.message ?? 'Force delete failed');
  });
}

// ─── Toggle Flag (with optimistic UI support) ───────────────────

interface UseToggleReturn {
  toggle: (id: number, flag: ToggleableFlag, currentValue: boolean) => Promise<void>;
  loading: boolean;
}

export function useToggleProductStatus(
  onOptimistic?: (id: number, flag: ToggleableFlag, value: boolean) => void,
  onRevert?: (id: number, flag: ToggleableFlag, value: boolean) => void,
): UseToggleReturn {
  const [loading, setLoading] = useState(false);

  const toggle = useCallback(
    async (id: number, flag: ToggleableFlag, currentValue: boolean) => {
      const newValue = !currentValue;

      // Optimistic
      onOptimistic?.(id, flag, newValue);
      setLoading(true);

      try {
        const res = await productService.toggleFlag(id, flag, newValue);
        if (!res.success) throw new Error(res.message ?? 'Toggle failed');
      } catch {
        // Revert
        onRevert?.(id, flag, currentValue);
      } finally {
        setLoading(false);
      }
    },
    [onOptimistic, onRevert],
  );

  return { toggle, loading };
}