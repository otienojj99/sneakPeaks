import { useState, useCallback, useEffect } from 'react';
import { inventoryCountService } from '../../api/services/inventoryCountService';
import { inventoryCountItemService } from '../../api/services/inventoryCountItemService';
import { inventoryService } from '../../api/services/inventoryService';
import toast from 'react-hot-toast';
import type { InventoryCount, InventoryCountItem, InventoryCountItemCreateData, InventoryCountItemUpdateData } from '../../types/inventory.types';

export const useInventoryCount = (countId?: number) => {
  const [count, setCount] = useState<InventoryCount | null>(null);
  const [items, setItems] = useState<InventoryCountItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCount = useCallback(async () => {
    console.log('fetchCount called with countId:', countId);
    if (!countId){
      console.log('No countId, returning');
       return;
    }
    setLoading(true);
    try {
       console.log('Calling inventoryCountService.getById for id:', countId);
      
      const countRes = await inventoryCountService.getInventoryCountById(countId);
      console.log('countRes:', countRes);

      console.log('Calling inventoryCountItemService.getAll for countId:', countId);
      const itemsRes = await inventoryCountItemService.getAllItems({ inventory_count_id: countId });
      console.log('itemsRes:', itemsRes);

      console.log('fetchCount API responses:', { countRes, itemsRes });
      setCount(countRes.data);
      setItems(itemsRes.data);
    } catch (err) {
       console.error('Error fetching count:', err);
      toast.error('Failed to load count');
    } finally {
      setLoading(false);
    }
  }, [countId]);

   useEffect( () => {
    console.log('🔄 useEffect triggered, calling fetchCount');
    fetchCount();
   }, [fetchCount]);

  const changeStatus = useCallback(async (status: InventoryCount['status']) => {
    if (!countId) return;
    try {
      const response = await inventoryCountService.changeStatus(countId, status);
      setCount(response.data);
      toast.success(`Status changed to ${status}`);
    } catch (err) {
      toast.error('Failed to change status');
    }
  }, [countId]);

  const addItem = async (data: InventoryCountItemCreateData) => {
    try {
      const response = await inventoryCountItemService.createItem(data);
      if (!response.success) {
        throw new Error(response.message || 'Failed to create item');
      }
      setItems(prev => [...prev, response.data]);
      toast.success('Item added');
      return response.data;
    } catch (err: any) { 
      console.error('Error adding item:', err);
      const errorMessage = err.body?.error || err.body?.message || err.message || 'Add failed';
      toast.error(errorMessage);
      return null;
    }
    // 6161114908973
  };

  const updateItem = async (id: number, data: InventoryCountItemUpdateData) => {
    try {
      const response = await inventoryCountItemService.updateItem(id, data);
      setItems(prev => prev.map(i => i.id === id ? response.data : i));
      toast.success('Item updated');
    } catch (err) { toast.error('Update failed'); }
  };

  const deleteItem = async (id: number) => {
    try {
      await inventoryCountItemService.deleteItem(id);
      setItems(prev => prev.filter(i => i.id !== id));
      toast.success('Item removed');
    } catch (err) { toast.error('Remove failed'); }
  };

  const markCounted = async (itemId: number, countedQuantity: number) => {
    try {
      const response = await inventoryCountItemService.markCounted(itemId, countedQuantity);
      setItems(prev => prev.map(i => i.id === itemId ? response.data : i));
      toast.success('Counted');
    } catch (err) { toast.error('Failed to mark counted'); }
  };

  const verifyItem = async (itemId: number) => {
    try {
      const response = await inventoryCountItemService.verifyCount(itemId);
      setItems(prev => prev.map(i => i.id === itemId ? response.data : i));
      toast.success('Item verified');
    } catch (err) { toast.error('Verification failed'); }
  };

  const adjustItem = async (itemId: number) => {
    try {
      // Find the item being adjusted to get the product and difference
      const item = items.find(i => i.id === itemId);
      if (!item) {
        toast.error('Item not found');
        return;
      }

      // Calculate the adjustment needed (difference between counted and system)
      const adjustment = item.difference;
      const productId = item.product_item_id;

      // Step 1: Update the product stock with the difference
      if (adjustment !== 0 && productId) {
        await inventoryService.updateStock({
          product_id: productId,
          quantity: adjustment,
          type: 'adjustment',
          notes: `Inventory count adjustment from physical count (System: ${item.system_quantity}, Counted: ${item.counted_quantity})`,
        });
      }

      // Step 2: Mark the count item as adjusted
      const response = await inventoryCountItemService.adjustCount(itemId, 0);
      setItems(prev => prev.map(i => i.id === itemId ? response.data : i));
      
      if (adjustment !== 0) {
        toast.success(`Stock adjusted by ${adjustment > 0 ? '+' : ''}${adjustment} units`);
      } else {
        toast.success('Stock adjusted (no change needed)');
      }
    } catch (err) { 
      console.error('Adjustment failed:', err);
      toast.error('Adjustment failed'); 
    }
  };

  return {
    count,
    items,
    loading,
    fetchCount,
    changeStatus,
    addItem,
    updateItem,
    deleteItem,
    markCounted,
    verifyItem,
    adjustItem,
  };
};