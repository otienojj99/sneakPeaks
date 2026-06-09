import { useState, useCallback } from 'react';
import { productService } from '../../api/services/productService';
import type { ProductVariation } from '../../types/product.types';

interface UseProductVariationsReturn {
  variations: ProductVariation[];
  setVariations: React.Dispatch<React.SetStateAction<ProductVariation[]>>;
  loading: boolean;
  error: string | null;
  fetchVariations: (productId: number) => Promise<void>;
  addVariation: (productId: number, data: Omit<ProductVariation, 'id'>) => Promise<void>;
  updateVariation: (
    productId: number,
    variationId: number,
    data: Partial<ProductVariation>,
  ) => Promise<void>;
  deleteVariation: (productId: number, variationId: number) => Promise<void>;
}

export function useProductVariations(): UseProductVariationsReturn {
  const [variations, setVariations] = useState<ProductVariation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVariations = useCallback(async (productId: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await productService.getVariations(productId);
      console.log(`Fetched variations for product ID: ${productId}`, res);
      if (res.success) setVariations(res.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch');
    } finally {
      setLoading(false);
    }
  }, []);

  const addVariation = useCallback(
    async (productId: number, data: Omit<ProductVariation, 'id'>) => {
      try {
        console.log(`Creating variation for product ID: ${productId}`, data);
        const res = await productService.createVariation(productId, data);
        if (res.success) setVariations((prev) => [...prev, res.data]);
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to add variation';
        setError(errorMessage);
        throw err;
      }
    },
    [],
  );

  const updateVariation = useCallback(
    async (productId: number, variationId: number, data: Partial<ProductVariation>) => {
      try {
        console.log(`Updating variation for product ID: ${productId}`, { variationId, data });
        const res = await productService.updateVariation(productId, variationId, data);
        if (res.success) {
          setVariations((prev) => prev.map((v) => (v.id === variationId ? res.data : v)));
        }
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to update variation';
        setError(errorMessage);
        throw err;
      }
    },
    [],
  );

  const deleteVariation = useCallback(
    async (productId: number, variationId: number) => {
      try {
        await productService.deleteVariation(productId, variationId);
        setVariations((prev) => prev.filter((v) => v.id !== variationId));
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to delete variation';
        setError(errorMessage);
        throw err; // Re-throw so the caller can handle it
      }
    },
    [],
  );

  return {
    variations,
    setVariations,
    loading,
    error,
    fetchVariations,
    addVariation,
    updateVariation,
    deleteVariation,
  };
}