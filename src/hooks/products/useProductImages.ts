import { useState, useCallback } from 'react';
import { productService } from '../../api/services/productService';
import type { ProductImage } from '../../types/product.types';

interface UseProductImagesReturn {
  images: ProductImage[];
  loading: boolean;
  uploading: boolean;
  error: string | null;
  fetchImages: (productId: number) => Promise<void>;
  uploadImages: (productId: number, files: File[]) => Promise<void>;
  deleteImage: (productId: number, imageId: number) => Promise<void>;
  setPrimary: (productId: number, imageId: number) => Promise<void>;
  reorderImages: (productId: number, orderedIds: number[]) => Promise<void>;
}

export function useProductImages(): UseProductImagesReturn {
  const [images, setImages] = useState<ProductImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = useCallback(async (productId: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await productService.getImages(productId);
      if (res.success) {
        // Normalize different API shapes so `images` is always an array
        let imageData: ProductImage[] = [];
        if (Array.isArray(res.data)) {
          imageData = res.data;
        } else if (Array.isArray((res.data as any)?.data)) {
          imageData = (res.data as any).data;
        } else if (Array.isArray((res.data as any).images)) {
          imageData = (res.data as any).images;
        } else if (res.data == null) {
          imageData = [];
        }
        setImages(imageData);
      }
     
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch images');
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadImages = useCallback(async (productId: number, files: File[]) => {
    setUploading(true);
    setError(null);
    try {
      const res = await productService.uploadImages(productId, files);
      if (res.success) {
        // Normalize response to an array
        let newImages: ProductImage[] = [];
        if (Array.isArray(res.data)) {
          newImages = res.data;
        } else if (Array.isArray((res.data as any)?.data)) {
          newImages = (res.data as any).data;
        } else if (Array.isArray((res.data as any).images)) {
          newImages = (res.data as any).images;
        }
        setImages((prev) => [...prev, ...newImages]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      throw err;
    } finally {
      setUploading(false);
    }
  }, []);

  const deleteImage = useCallback(async (productId: number, imageId: number) => {
    try {
      await productService.deleteImage(productId, imageId);
      setImages((prev) => prev.filter((img) => img.id !== imageId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
      throw err;
    }
  }, []);

  const setPrimary = useCallback(async (productId: number, imageId: number) => {
    try {
      await productService.setPrimaryImage(productId, imageId);
      await fetchImages(productId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to set primary');
      throw err;
    }
  }, [fetchImages]);

  const reorderImages = useCallback(
    async (productId: number, orderedIds: number[]) => {
      // Optimistic reorder
      setImages((prev) => {
        const map = new Map(prev.map((img) => [img.id, img]));
        return orderedIds
          .map((id, index) => {
            const img = map.get(id);
            return img ? { ...img, sort_order: index } : null;
          })
          .filter(Boolean) as ProductImage[];
      });

      try {
        await productService.reorderImages(productId, orderedIds);
      } catch {
        await fetchImages(productId); // Revert to server state
      }
    },
    [fetchImages],
  );

  return {
    images,
    loading,
    uploading,
    error,
    fetchImages,
    uploadImages,
    deleteImage,
    setPrimary,
    reorderImages,
  };
}