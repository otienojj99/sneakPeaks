import { useState, useEffect, useCallback } from 'react';
import { collectionServices } from '../../api/services/collectionService';
import type { Product } from '../../types/product.types';
import toast from 'react-hot-toast';



export type CollectionType = 'new-arrivals' | 'best-sellers' | 'trending' | 'featured';

export const useCollection = (collection: CollectionType, limit: number = 10) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchCollection = useCallback(async () => {
         setIsLoading(true);
         setError(null);

         try {
             let response;
             switch (collection) {
                case 'new-arrivals':
          response = await collectionServices.getNewArrivals(limit);
          break;
        case 'best-sellers':
          response = await collectionServices.getBestSellers(limit);
          break;
        case 'trending':
          response = await collectionServices.getTrending(limit);
          break;
        case 'featured':
          response = await collectionServices.getFeatured(limit);
          break;
        default:
          throw new Error('Invalid collection type');
             }
        setProducts(response.data || []);
         } catch (err: any) {
                console.error(`Error fetching ${collection}:`, err);
                setError(err.message || 'An error occurred while fetching the collection.');
               const msg = err.response?.data?.message || 'An error occurred while fetching the collection.';
                toast.error(msg); 
              
         }finally {
            setIsLoading(false);
         }
    }, [collection, limit]);

    useEffect( () => {
        fetchCollection();
    }, [fetchCollection]);

     return { products, isLoading, error, refetch: fetchCollection };
}