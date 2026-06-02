// src/pages/dashboard/InventoryCountDetail.tsx

import { useParams, useNavigate } from "react-router-dom";
import { useInventoryCount } from "../../hooks/inventory/useInventoryCount";
import InventoryCountDetailComponent from "../../components/dashboard/inventory_details/InventoryCountDetail";
import InventoryCountItemFormModal from "../../components/dashboard/inventory_details/InventoryCountItemFormModal";
import { useState } from "react";
import toast from "react-hot-toast";
import type {
  InventoryCountItem,
  InventoryCountItemCreateData,
} from "../../types/inventory.types";

const InventoryCountDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const countId = Number(id);

  console.log(
    "InventoryCountDetail page - id from params:",
    id,
    "countId:",
    countId,
  );

  const {
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
  } = useInventoryCount(countId);

  console.log("useInventoryCount hook result:", { count, items, loading });

  const [itemModalOpen, setItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryCountItem | null>(
    null,
  );

  const canEdit = count?.status === "draft" || count?.status === "in_progress";

  const handleAddItem = () => {
    setEditingItem(null);
    setItemModalOpen(true);
  };

  const handleEditItem = (item: InventoryCountItem) => {
    setEditingItem(item);
    setItemModalOpen(true);
  };

  const handleSubmitItem = async (data: InventoryCountItemCreateData) => {
    if (editingItem) {
      await updateItem(editingItem.id, data);
      toast.success("Item updated");
    } else {
      await addItem(data);
      toast.success("Item added");
    }
    setItemModalOpen(false);
    setEditingItem(null);
  };

  const handleDeleteItem = async (itemId: number) => {
    await deleteItem(itemId);
    toast.success("Item removed");
  };

  const handleMarkCounted = async (itemId: number, countedQuantity: number) => {
    await markCounted(itemId, countedQuantity);
    toast.success("Item marked as counted");
  };

  const handleVerifyItem = async (itemId: number) => {
    await verifyItem(itemId);
    toast.success("Item verified");
  };

  const handleAdjustItem = async (itemId: number) => {
    await adjustItem(itemId);
    toast.success("Stock adjusted");
  };

  const handleChangeStatus = async (status: string) => {
    await changeStatus(status as any);
    toast.success(`Status changed to ${status}`);
  };

  return (
    <>
      <InventoryCountDetailComponent
        count={count}
        items={items}
        isLoading={loading}
        isUpdating={false}
        canEdit={canEdit}
        onBack={() => navigate("/inventory-counts")}
        onAddItem={handleAddItem}
        onEditItem={handleEditItem}
        onDeleteItem={handleDeleteItem}
        onMarkCounted={handleMarkCounted}
        onVerifyItem={handleVerifyItem}
        onAdjustItem={handleAdjustItem}
        onUpdateCount={() => {}} // add a placeholder if needed, or implement update count
        onChangeStatus={handleChangeStatus}
        onRefresh={fetchCount}
      />

      <InventoryCountItemFormModal
        isOpen={itemModalOpen}
        onClose={() => {
          setItemModalOpen(false);
          setEditingItem(null);
        }}
        onSubmit={handleSubmitItem}
        initialData={editingItem}
        countId={countId}
      />
    </>
  );
};

export default InventoryCountDetail;
