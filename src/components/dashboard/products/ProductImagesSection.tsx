import React, { useEffect, useState } from "react";
import { useProductImages } from "../../../hooks/products/useProductImages";
import type { ProductImage } from "../../../types/product.types";
import ImageUpload from "../../common/ImageUpload";
import ConfirmDialog from "../../common/ConfirmDialog";
import Button from "../../common/Button";

interface ProductImagesSectionProps {
  productId: number;
  existingImages?: ProductImage[];
}

const ProductImagesSection: React.FC<ProductImagesSectionProps> = ({
  productId,
  existingImages = [],
}) => {
  const {
    images,
    loading,
    uploading,
    error,
    fetchImages,
    uploadImages,
    deleteImage,
    setPrimary,
    reorderImages,
  } = useProductImages();

  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);

  useEffect(() => {
    console.log("🖼️ ProductImagesSection mounted/updated", {
      productId,
      imagesCount: images.length,
      loading,
      uploading,
      error,
    });
    fetchImages(productId);
  }, [productId, fetchImages]);

  const handleFilesSelected = async (files: File[]) => {
    console.log("📤 handleFilesSelected called", {
      productId,
      filesCount: files.length,
      fileNames: files.map((f) => f.name),
    });
    try {
      await uploadImages(productId, files);
      console.log("✅ Upload completed", { productId });
      // TODO: toast("Images uploaded!")
    } catch (err) {
      console.log("❌ Upload failed", { productId, error: err });
      // error shown via hook
    }
  };

  const handleRemoveExisting = (imageId: number) => {
    console.log("🗑️ handleRemoveExisting called", {
      productId,
      imageId,
    });
    setDeleteTarget(imageId);
  };

  const confirmDelete = async () => {
    console.log("🗑️ confirmDelete called", {
      productId,
      deleteTarget,
    });
    if (deleteTarget) {
      try {
        await deleteImage(productId, deleteTarget);
        console.log("✅ Delete completed", {
          productId,
          deletedImageId: deleteTarget,
        });
        // TODO: toast("Image deleted")
      } catch (err) {
        console.log("❌ Delete failed", {
          productId,
          imageId: deleteTarget,
          error: err,
        });
      } finally {
        setDeleteTarget(null);
      }
    }
  };

  const handleSetPrimary = async (imageId: number) => {
    console.log("⭐ handleSetPrimary called", {
      productId,
      imageId,
    });
    try {
      await setPrimary(productId, imageId);
      console.log("✅ Set primary completed", {
        productId,
        primaryImageId: imageId,
      });
    } catch (err) {
      console.log("❌ Set primary failed", {
        productId,
        imageId,
        error: err,
      });
      // handled
    }
  };

  return (
    <div className="space-y-4">
      {/* {console.log("🖼️ ProductImagesSection rendering", {
        productId,
        imagesCount: images.length,
        loading,
        uploading,
        error,
        hasError: !!error,
      })} */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Product Images</h2>
        {uploading && (
          <span className="text-sm text-indigo-600 animate-pulse">
            Uploading…
          </span>
        )}
      </div>

      {error && (
        <>
          {console.log("❌ Error state in ProductImagesSection", {
            error,
            productId,
          })}
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
            {error}
          </div>
        </>
      )}

      {loading ? (
        <>
          {console.log("⏳ Loading state in ProductImagesSection", {
            productId,
          })}
          <div className="flex justify-center py-8">
            <div className="animate-spin h-6 w-6 border-2 border-indigo-600 border-t-transparent rounded-full" />
          </div>
        </>
      ) : (
        <>
          {console.log("✅ Loaded state in ProductImagesSection", {
            productId,
            imagesCount: images.length,
          })}
          <ImageUpload
            existingImages={
              Array.isArray(images)
                ? images.map((img) => ({
                    id: img.id,
                    url: img.thumbnail_url || img.image_url,
                    is_primary: img.is_primary,
                  }))
                : []
            }
            onFilesSelected={handleFilesSelected}
            onRemoveExisting={handleRemoveExisting}
            onSetPrimary={handleSetPrimary}
            maxFiles={20}
            disabled={uploading}
          />
        </>
      )}

      {/* Image table for detailed management */}
      {images.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left font-medium text-gray-600">
                  Preview
                </th>
                <th className="px-4 py-2 text-left font-medium text-gray-600">
                  URL
                </th>
                <th className="px-4 py-2 text-center font-medium text-gray-600">
                  Primary
                </th>
                <th className="px-4 py-2 text-center font-medium text-gray-600">
                  Order
                </th>
                <th className="px-4 py-2 text-right font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {images
                .slice()
                .sort((a, b) => a.sort_order - b.sort_order)
                .map((img, idx) => (
                  <tr key={img.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">
                      <img
                        src={img.thumbnail_url || img.image_url}
                        alt={img.alt_text ?? ""}
                        className="h-10 w-10 rounded object-cover"
                      />
                    </td>
                    <td className="px-4 py-2 text-gray-600 truncate max-w-xs">
                      {img.thumbnail_url || img.image_url}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {img.is_primary ? (
                        <span className="text-yellow-500 font-bold">★</span>
                      ) : (
                        <Button
                          variant="ghost"
                          size="xs"
                          onClick={() => handleSetPrimary(img.id)}
                        >
                          ☆ Set
                        </Button>
                      )}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Button
                          variant="ghost"
                          size="xs"
                          disabled={idx === 0}
                          onClick={() => {
                            const ids = images
                              .slice()
                              .sort((a, b) => a.sort_order - b.sort_order)
                              .map((i) => i.id);
                            const pos = ids.indexOf(img.id);
                            if (pos > 0) {
                              [ids[pos - 1], ids[pos]] = [
                                ids[pos],
                                ids[pos - 1],
                              ];
                              reorderImages(productId, ids);
                            }
                          }}
                        >
                          ↑
                        </Button>
                        <Button
                          variant="ghost"
                          size="xs"
                          disabled={idx === images.length - 1}
                          onClick={() => {
                            const ids = images
                              .slice()
                              .sort((a, b) => a.sort_order - b.sort_order)
                              .map((i) => i.id);
                            const pos = ids.indexOf(img.id);
                            if (pos < ids.length - 1) {
                              [ids[pos], ids[pos + 1]] = [
                                ids[pos + 1],
                                ids[pos],
                              ];
                              reorderImages(productId, ids);
                            }
                          }}
                        >
                          ↓
                        </Button>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-right">
                      <Button
                        variant="danger"
                        size="xs"
                        onClick={() => handleRemoveExisting(img.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Confirm delete dialog */}
      <ConfirmDialog
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
        title="Delete Image"
        message="Are you sure you want to delete this image? This cannot be undone."
        confirmLabel="Delete"
        variant="danger"
      />
    </div>
  );
};

export default ProductImagesSection;
