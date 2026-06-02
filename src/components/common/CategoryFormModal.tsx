// src/pages/categories/components/CategoryFormModal.tsx
import { useState, useEffect, useRef } from "react";
import {
  FiX,
  FiUploadCloud,
  FiImage,
  FiTrash2,
  FiChevronDown,
  FiFolder,
  FiAlertCircle,
} from "react-icons/fi";
import type {
  Category,
  CategoryCreateData,
  CategoryUpdateData,
} from "../../types/category.types";
import { useCategory } from "../../hooks/useCategories";
import toast from "react-hot-toast";

interface CategoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CategoryCreateData | CategoryUpdateData) => Promise<void>;
  category?: Category | null; // null = create mode, Category = edit mode
}

interface FormErrors {
  name?: string;
  description?: string;
  image?: string;
  parent_id?: string;
}

const CategoryFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  category,
}: CategoryFormModalProps) => {
  const isEditing = !!category;
  const { categories: parentCategories, isLoading: parentsLoading } =
    useCategory();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [parentId, setParentId] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(true);
  const [sortOrder, setSortOrder] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [removeImage, setRemoveImage] = useState(false);

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showParentDropdown, setShowParentDropdown] = useState(false);
  const [parentSearch, setParentSearch] = useState("");

  // Populate form when editing
  useEffect(() => {
    if (category) {
      setName(category.name || "");
      setDescription(category.description || "");
      setParentId(category.parent_id || null);
      setIsActive(category.is_active);
      setSortOrder(category.sort_order || 0);
      setImagePreview(category.image || null);
      setImage(null);
      setRemoveImage(false);
    } else {
      resetForm();
    }
    setErrors({});
  }, [category, isOpen]);

  const resetForm = () => {
    setName("");
    setDescription("");
    setParentId(null);
    setIsActive(true);
    setSortOrder(0);
    setImage(null);
    setImagePreview(null);
    setRemoveImage(false);
    setErrors({});
  };

  // Filter parent categories (exclude self and children when editing)
  const filteredParents = Array.isArray(parentCategories)
    ? parentCategories.filter((cat) => {
        if (isEditing && cat.id === category?.id) return false;

        if (parentSearch) {
          return (
            cat.name.toLowerCase().includes(parentSearch.toLowerCase()) ||
            cat.full_path?.toLowerCase().includes(parentSearch.toLowerCase())
          );
        }

        return true;
      })
    : [];

  // Image handling
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, image: "Please select an image file" }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        image: "Image must be less than 5MB",
      }));
      return;
    }

    setImage(file);
    setRemoveImage(false);
    setErrors((prev) => ({ ...prev, image: undefined }));

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
    setRemoveImage(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Validation
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = "Category name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (name.trim().length > 100) {
      newErrors.name = "Name must be less than 100 characters";
    }

    if (description && description.length > 500) {
      newErrors.description = "Description must be less than 500 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const formData: CategoryCreateData | CategoryUpdateData = {
        name: name.trim(),
        description: description.trim() || null,
        parent_id: parentId,
        is_active: isActive,
        sort_order: sortOrder,
      };

      if (image) {
        formData.image = image;
      }

      // If editing and image was removed, you may need to handle this
      // depending on your API. Some APIs accept remove_image: true
      if (isEditing && removeImage) {
        (formData as any).remove_image = true;
      }

      await onSubmit(formData);
      toast.success(
        isEditing
          ? "Category updated successfully!"
          : "Category created successfully!",
      );
      onClose();
      resetForm();
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        `Failed to ${isEditing ? "update" : "create"} category`;

      // Handle validation errors from API
      if (error.response?.data?.errors) {
        const apiErrors = error.response.data.errors;
        setErrors({
          name: apiErrors.name?.[0],
          description: apiErrors.description?.[0],
          image: apiErrors.image?.[0],
        });
      } else {
        toast.error(message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".parent-dropdown-container")) {
        setShowParentDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* ===== HEADER ===== */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {isEditing ? "Edit Category" : "New Category"}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {isEditing
                ? `Editing "${category?.name}"`
                : "Create a new product category"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* ===== FORM BODY ===== */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* ---- Image Upload ---- */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category Image
              </label>
              <div className="flex items-start gap-4">
                {/* Preview */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`w-28 h-28 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden ${
                    errors.image
                      ? "border-red-300 bg-red-50"
                      : imagePreview
                        ? "border-transparent"
                        : "border-gray-200 bg-gray-50 hover:border-emerald-300 hover:bg-emerald-50"
                  }`}
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <FiImage className="text-gray-400 mb-1" size={24} />
                      <span className="text-xs text-gray-400">Upload</span>
                    </>
                  )}
                </div>

                {/* Upload Info */}
                <div className="flex-1 pt-1">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors"
                    >
                      <FiUploadCloud size={15} />
                      {imagePreview ? "Change" : "Upload"}
                    </button>
                    {imagePreview && (
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium rounded-lg transition-colors"
                      >
                        <FiTrash2 size={15} />
                        Remove
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    PNG, JPG or WEBP. Max 5MB. Recommended 400×400px.
                  </p>
                  {errors.image && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <FiAlertCircle size={12} />
                      {errors.image}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ---- Name ---- */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name)
                    setErrors((p) => ({ ...p, name: undefined }));
                }}
                className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                  errors.name
                    ? "border-red-300 focus:ring-red-500/20 focus:border-red-400 bg-red-50/50"
                    : "border-gray-200 focus:ring-emerald-500/20 focus:border-emerald-400 bg-white"
                }`}
                placeholder="e.g. Running Shoes"
                disabled={isSubmitting}
              />
              <div className="flex items-center justify-between mt-1.5">
                {errors.name ? (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <FiAlertCircle size={12} />
                    {errors.name}
                  </p>
                ) : (
                  <span />
                )}
                <span
                  className={`text-xs ${
                    name.length > 100 ? "text-red-500" : "text-gray-400"
                  }`}
                >
                  {name.length}/100
                </span>
              </div>
            </div>

            {/* ---- Description ---- */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (errors.description)
                    setErrors((p) => ({ ...p, description: undefined }));
                }}
                rows={3}
                className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 resize-none ${
                  errors.description
                    ? "border-red-300 focus:ring-red-500/20 focus:border-red-400 bg-red-50/50"
                    : "border-gray-200 focus:ring-emerald-500/20 focus:border-emerald-400 bg-white"
                }`}
                placeholder="Brief description of this category..."
                disabled={isSubmitting}
              />
              <div className="flex items-center justify-between mt-1.5">
                {errors.description ? (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <FiAlertCircle size={12} />
                    {errors.description}
                  </p>
                ) : (
                  <span />
                )}
                <span
                  className={`text-xs ${
                    description.length > 500 ? "text-red-500" : "text-gray-400"
                  }`}
                >
                  {description.length}/500
                </span>
              </div>
            </div>

            {/* ---- Parent Category ---- */}
            <div className="parent-dropdown-container">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Parent Category
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowParentDropdown(!showParentDropdown)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all"
                  disabled={isSubmitting || parentsLoading}
                >
                  <div className="flex items-center gap-2">
                    <FiFolder
                      size={16}
                      className={
                        parentId ? "text-emerald-500" : "text-gray-400"
                      }
                    />
                    <span
                      className={parentId ? "text-gray-900" : "text-gray-400"}
                    >
                      {parentId
                        ? parentCategories.find((c) => c.id === parentId)
                            ?.full_path ||
                          parentCategories.find((c) => c.id === parentId)?.name
                        : "None (Top Level)"}
                    </span>
                  </div>
                  <FiChevronDown
                    size={16}
                    className={`text-gray-400 transition-transform ${
                      showParentDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown */}
                {showParentDropdown && (
                  <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white rounded-xl border border-gray-200 shadow-xl max-h-60 overflow-hidden">
                    {/* Search */}
                    <div className="p-2 border-b border-gray-100">
                      <input
                        type="text"
                        value={parentSearch}
                        onChange={(e) => setParentSearch(e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
                        placeholder="Search categories..."
                        autoFocus
                      />
                    </div>

                    {/* Options */}
                    <div className="overflow-y-auto max-h-44">
                      {/* None option */}
                      <button
                        type="button"
                        onClick={() => {
                          setParentId(null);
                          setShowParentDropdown(false);
                          setParentSearch("");
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center gap-2 transition-colors ${
                          parentId === null
                            ? "bg-emerald-50 text-emerald-700 font-medium"
                            : "text-gray-700"
                        }`}
                      >
                        <FiFolder size={14} className="text-gray-400" />
                        None (Top Level)
                      </button>

                      {filteredParents.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            setParentId(cat.id);
                            setShowParentDropdown(false);
                            setParentSearch("");
                          }}
                          className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center gap-2 transition-colors ${
                            parentId === cat.id
                              ? "bg-emerald-50 text-emerald-700 font-medium"
                              : "text-gray-700"
                          }`}
                        >
                          <FiFolder
                            size={14}
                            className={
                              parentId === cat.id
                                ? "text-emerald-500"
                                : "text-gray-400"
                            }
                          />
                          <span className="truncate">
                            {cat.full_path || cat.name}
                          </span>
                        </button>
                      ))}

                      {filteredParents.length === 0 && (
                        <p className="text-center text-sm text-gray-400 py-4">
                          No categories found
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-400 mt-1.5">
                Leave as "None" to create a top-level category
              </p>
            </div>

            {/* ---- Status & Sort Order (side by side) ---- */}
            <div className="grid grid-cols-2 gap-4">
              {/* Status Toggle */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>
                <div
                  className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isActive
                      ? "bg-emerald-50 border-emerald-200"
                      : "bg-gray-50 border-gray-200"
                  }`}
                  onClick={() => !isSubmitting && setIsActive(!isActive)}
                >
                  {/* Toggle Switch */}
                  <div
                    className={`relative w-10 h-6 rounded-full transition-colors ${
                      isActive ? "bg-emerald-500" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                        isActive ? "translate-x-5" : "translate-x-1"
                      }`}
                    />
                  </div>
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        isActive ? "text-emerald-700" : "text-gray-600"
                      }`}
                    >
                      {isActive ? "Active" : "Inactive"}
                    </p>
                    <p className="text-xs text-gray-400">
                      {isActive ? "Visible to customers" : "Hidden from store"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Sort Order */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sort Order
                </label>
                <input
                  type="number"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
                  min={0}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 bg-white transition-all"
                  placeholder="0"
                  disabled={isSubmitting}
                />
                <p className="text-xs text-gray-400 mt-1.5">
                  Lower numbers appear first
                </p>
              </div>
            </div>
          </div>

          {/* ===== FOOTER ===== */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/50">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 text-sm font-semibold text-white bg-emerald-500 rounded-xl hover:bg-emerald-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm shadow-emerald-500/20"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {isEditing ? "Updating..." : "Creating..."}
                </>
              ) : isEditing ? (
                "Update Category"
              ) : (
                "Create Category"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryFormModal;
