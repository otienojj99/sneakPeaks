import { useState, useCallback } from 'react';
import { inventoryCountItemService } from '../../api/services/inventoryCountItemService';
import { scanService } from '../../api/services/scanService';
import toast from 'react-hot-toast';
import type { InventoryCountItem, InventoryCountItemCreateData, InventoryCountItemUpdateData } from '../../types/inventory.types';

export const useInventoryCountItem = (countId: number) => {
  const [items, setItems] = useState<InventoryCountItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const response = await inventoryCountItemService.getAllItems({ inventory_count_id: countId });
      setItems(response.data);
    } catch (err) {
      toast.error('Failed to load items');
    } finally {
      setLoading(false);
    }
  }, [countId]);

  const addItem = useCallback(async (data: InventoryCountItemCreateData) => {
    try {
      const response = await inventoryCountItemService.createItem(data);
      setItems(prev => [...prev, response.data]);
      toast.success('Item added');
      return response.data;
    } catch (err) {
      toast.error('Failed to add item');
      throw err;
    }
  }, []);

  const updateItem = useCallback(async (id: number, data: InventoryCountItemUpdateData) => {
    try {
      const response = await inventoryCountItemService.updateItem(id, data);
      setItems(prev => prev.map(i => i.id === id ? response.data : i));
      toast.success('Item updated');
      return response.data;
    } catch (err) {
      toast.error('Failed to update item');
      throw err;
    }
  }, []);

  const deleteItem = useCallback(async (id: number) => {
    try {
      await inventoryCountItemService.deleteItem(id);
      setItems(prev => prev.filter(i => i.id !== id));
      toast.success('Item removed');
    } catch (err) {
      toast.error('Failed to delete item');
      throw err;
    }
  }, []);

  const markCounted = useCallback(async (itemId: number, countedQuantity: number) => {
    try {
      const response = await inventoryCountItemService.markCounted(itemId, countedQuantity);
      setItems(prev => prev.map(i => i.id === itemId ? response.data : i));
      toast.success('Item marked as counted');
      return response.data;
    } catch (err) {
      toast.error('Failed to mark counted');
      throw err;
    }
  }, []);

  const verifyItem = useCallback(async (itemId: number) => {
    try {
      const response = await inventoryCountItemService.verifyCount(itemId);
      setItems(prev => prev.map(i => i.id === itemId ? response.data : i));
      toast.success('Item verified');
      return response.data;
    } catch (err) {
      toast.error('Verification failed');
      throw err;
    }
  }, []);

  

  const adjustItem = useCallback(async (itemId: number) => {
    try {
      const response = await inventoryCountItemService.adjustCount(itemId, 0); // Adjusted quantity can be passed as needed
      setItems(prev => prev.map(i => i.id === itemId ? response.data : i));
      toast.success('Stock adjusted');
      return response.data;
    } catch (err) {
      toast.error('Adjustment failed');
      throw err;
    }
  }, []);

  const changeStatus = useCallback(async (id: number, status: InventoryCountItem['status']) => {
    try {
      const response = await inventoryCountItemService.changeStatus(id, status);
      setItems(prev => prev.map(i => i.id === id ? response.data : i));
      toast.success('Status changed');
      return response.data;
    } catch (err) {
      toast.error('Failed to change status');
      throw err;
    }
  }, []);


  const fetchProductsByBarcode = useCallback(async (barcode: string) => {
    try {
      const result = await scanService.lookupBarcode(barcode);
      return result.product;
    } catch (err) {
      toast.error('Product not found');
      return null;
    }
  }, []);

  return {
    items,
    loading,
    fetchItems,
    addItem,
    updateItem,
    deleteItem,
    changeStatus,
    markCounted,
    verifyItem,
    adjustItem,
    fetchProductsByBarcode,
  };
};