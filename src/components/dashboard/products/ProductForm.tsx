import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  FiX,
  FiUploadCloud,
  FiImage,
  FiTrash2,
  FiChevronDown,
  FiFolder,
  FiAlertCircle,
  FiPlus,
  FiArrowRight,
  FiArrowLeft,
  FiMinus,
  FiCheck,
  FiSearch,
  FiEdit2,
  FiSave,
} from "react-icons/fi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useProducts } from "../../../hooks/products/useProducts";
import toast from "react-hot-toast";
import type {
  Product,
  ProductFormData,
  ProductVariation,
  ProductUpdateFormData,
} from "../../../types/product.types";
import { generateSlug } from "../../../utils/helpers";
import ProductVariantSection from "./ProductVariants";
// import ProductImagesSection from "./ProductImagesSection";
import { useProducts1 } from "../../../hooks/products/useProduct";

// ─── Validation Schema ───────────────────────────────────────────

const productSchema = Yup.object().shape({
  name: Yup.string()
    .required("Product name is required")
    .min(2, "Name must be at least 2 characters")
    .max(255, "Name too long"),
  sku: Yup.string().required("SKU is required").max(50, "SKU too long"),
  description: Yup.string()
    .required("Description is required")
    .max(5000, "Description too long"),
  short_description: Yup.string().max(500),
  cost_price: Yup.number().min(0, "Cost price cannot be negative").nullable(),
  selling_price: Yup.number()
    .required("Selling price is required")
    .min(0, "Must be >= 0"),
  current_stock: Yup.number().min(0).integer(),
  minimum_stock: Yup.number().min(0).integer(),
  maximum_stock: Yup.number().min(0).integer(),
  reorder_point: Yup.number().min(0).integer(),
  safety_stock: Yup.number().min(0).integer(),
  category_id: Yup.number().nullable(),
  brand_id: Yup.number().nullable(),
  primary_warehouse_id: Yup.number().nullable(),
  unit: Yup.string().max(50),
  weight: Yup.number().min(0).nullable(),
  length: Yup.number().min(0).nullable(),
  width: Yup.number().min(0).nullable(),
  height: Yup.number().min(0).nullable(),
  is_active: Yup.boolean(),
  is_tracked: Yup.boolean(),
  allow_backorder: Yup.boolean(),
  is_featured: Yup.boolean(),
  is_new: Yup.boolean(),
  is_on_sale: Yup.boolean(),
  tax_class: Yup.string().max(100),
  hs_code: Yup.string().max(50),
  country_of_origin: Yup.string().max(100),
  barcode: Yup.string().max(255),
  meta_title: Yup.string().max(60),
  meta_description: Yup.string().max(160),
  meta_keywords: Yup.string().max(500),
  attributes: Yup.object().nullable(),
  variations: Yup.array().nullable(),
});

// ─── Props ───────────────────────────────────────────────────────

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null; // null = create mode
  categories: { id: number; name: string; full_path?: string }[];
  brands: { id: number; name: string }[];
  warehouses: { id: number; name: string; code: string }[];
  onSubmit: (data: ProductFormData | ProductUpdateFormData) => Promise<void>;
  isSubmitting?: boolean; // optional, if parent wants to control loading state
}

// ─── Helper: Convert Product to Formik initial values ────────────

const productToFormValues = (product?: Product | null): ProductFormData => {
  if (!product) {
    return {
      name: "",
      sku: "",
      slug: "",
      description: "",
      short_description: "",
      cost_price: 0,
      selling_price: 0,
      compare_price: null,
      wholesale_price: null,
      current_stock: 0,
      minimum_stock: 0,
      maximum_stock: 0,
      reorder_point: 0,
      safety_stock: 0,
      category_id: null,
      brand_id: null,
      primary_supplier_id: null,
      primary_warehouse_id: null,
      unit: "",
      weight: null,
      length: null,
      width: null,
      height: null,
      is_active: true,
      is_tracked: true,
      allow_backorder: false,
      is_featured: false,
      is_new: false,
      is_on_sale: false,
      tax_class: "standard",
      hs_code: "",
      country_of_origin: "",
      barcode: "",
      meta_title: "",
      meta_description: "",
      meta_keywords: "",
      attributes: {},
      variations: [],
    };
  }
  return {
    name: product.name,
    sku: product.sku,
    slug: product.slug,
    description: product.description,
    short_description: product.short_description ?? "",
    cost_price: Number(product.cost_price),
    selling_price: Number(product.selling_price),
    compare_price: product.compare_price ? Number(product.compare_price) : null,
    wholesale_price: product.wholesale_price
      ? Number(product.wholesale_price)
      : null,
    current_stock: product.current_stock,
    minimum_stock: product.minimum_stock,
    maximum_stock: product.maximum_stock,
    reorder_point: product.reorder_point,
    safety_stock: product.safety_stock,
    category_id: product.category?.id ?? null,
    brand_id: product.brand?.id ?? null,
    primary_supplier_id: product.primary_supplier?.id ?? null,
    primary_warehouse_id: product.primary_warehouse?.id ?? null,
    unit: product.unit ?? "",
    weight: product.weight ? Number(product.weight) : null,
    length: product.length ? Number(product.length) : null,
    width: product.width ? Number(product.width) : null,
    height: product.height ? Number(product.height) : null,
    is_active: product.is_active,
    is_tracked: product.is_tracked,
    allow_backorder: product.allow_backorder,
    is_featured: product.is_featured,
    is_new: product.is_new,
    is_on_sale: product.is_on_sale,
    tax_class: product.tax_class ?? "standard",
    hs_code: product.hs_code ?? "",
    country_of_origin: product.country_of_origin ?? "",
    barcode: product.barcode ?? "",
    meta_title: product.meta_title ?? "",
    meta_description: product.meta_description ?? "",
    meta_keywords: product.meta_keywords ?? "",
    attributes: { ...product.attributes },
    variations: [...product.variations],
  };
};

// ─── Component ───────────────────────────────────────────────────

const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,

  product,
  categories,
  brands,
  warehouses,
}) => {
  const isEditing = !!product;
  const { createProduct, updateProduct, isLoading } = useProducts1();

  const [autoSlug, setAutoSlug] = useState(true);
  const [activeSection, setActiveSection] = useState<
    | "basic"
    | "pricing"
    | "inventory"
    | "shipping"
    | "attributes"
    | "variations"
    | "seo"
    | "images"
  >("basic");

  const [completedSections, setCompletedSections] = useState<Set<string>>(
    new Set(),
  );

  // ─── Formik ────────────────────────────────────────────────────
  const formik = useFormik({
    initialValues: productToFormValues(product),
    validationSchema: productSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      console.log("ProductForm onSubmit called", {
        values,
        activeSection,
        isBasicValid,
        isEditing,
      });
      try {
        const payload = {
          ...values,
          slug: autoSlug ? generateSlug(values.name) : values.slug,
        };
        if (isEditing && product) {
          await updateProduct(product.id, payload);
          toast.success("Product updated successfully");
        } else {
          await createProduct(payload);
          toast.success("Product created successfully");
        }
        onClose();
      } catch (error: any) {
        console.log("ProductForm submit error", error);
        const msg = error.response?.data?.message || "Failed to save product";
        if (error.response?.data?.errors) {
          setErrors(error.response.data.errors);
        } else {
          toast.error(msg);
        }
      } finally {
        setSubmitting(false);
      }
    },
    enableReinitialize: true,
  });

  const isBasicValid = useMemo(() => {
    const { name, sku, description } = formik.values;
    const valid =
      name.trim() !== "" && sku.trim() !== "" && description.trim() !== "";
    console.log("ProductForm basic validity:", {
      name,
      sku,
      description,
      valid,
    });
    return valid;
  }, [formik.values.name, formik.values.sku, formik.values.description]);
  useEffect(() => {
    console.log("ProductForm completedSections update", {
      isBasicValid,
      completedSections: Array.from(completedSections),
    });
    if (isBasicValid) {
      setCompletedSections((prev) => new Set([...prev, "basic"]));
    } else {
      setCompletedSections((prev) => {
        const next = new Set(prev);
        next.delete("basic");
        return next;
      });
    }
  }, [isBasicValid]);

  const isSectionAccessible = (sectionId: string) => {
    if (sectionId === "basic") return true;
    // Images section only accessible if we're editing an existing product
    // if (sectionId === "images") return isEditing;
    // if (sectionId === "basic") return true;
    // All other sections require basic info to be completed
    return completedSections.has("basic");
  };

  // Navigate to a section (only if accessible)
  const goToSection = (sectionId: string) => {
    if (isSectionAccessible(sectionId)) {
      setActiveSection(sectionId as any);
    }
  };

  // Next button logic
  const sectionsList = [
    "basic",
    "pricing",
    "inventory",
    "shipping",
    "attributes",
    "variations",
    "seo",
    "images",
  ];

  const currentIndex = sectionsList.indexOf(activeSection);
  const handleNext = () => {
    console.log("ProductForm handleNext", {
      activeSection,
      currentIndex,
      isBasicValid,
      completedSections: Array.from(completedSections),
    });
    for (let i = currentIndex + 1; i < sectionsList.length; i++) {
      if (isSectionAccessible(sectionsList[i])) {
        setActiveSection(sectionsList[i] as any);
        return;
      }
    }
    // If no next accessible, submit the form
    formik.handleSubmit();
  };

  const handleBack = () => {
    for (let i = currentIndex - 1; i >= 0; i--) {
      if (isSectionAccessible(sectionsList[i])) {
        setActiveSection(sectionsList[i] as any);
        return;
      }
    }
  };
  // Reset autoSlug when name changes
  useEffect(() => {
    if (autoSlug && !formik.values.name) return;
    if (autoSlug && formik.values.name) {
      formik.setFieldValue("slug", generateSlug(formik.values.name));
    }
  }, [formik.values.name, autoSlug]);

  // ─── Attribute helpers ─────────────────────────────────────────

  const addAttribute = () => {
    const current = formik.values.attributes;
    formik.setFieldValue("attributes", { ...current, "": "" });
  };

  const updateAttributeKey = (oldKey: string, newKey: string) => {
    const current = formik.values.attributes;
    const newAttrs: Record<string, string> = {};
    for (const [k, v] of Object.entries(current)) {
      if (k === oldKey) {
        newAttrs[newKey] = v;
      } else {
        newAttrs[k] = v;
      }
    }
    formik.setFieldValue("attributes", newAttrs);
  };

  const updateAttributeValue = (key: string, value: string) => {
    formik.setFieldValue(`attributes.${key}`, value);
  };

  const removeAttribute = (key: string) => {
    const { [key]: _, ...rest } = formik.values.attributes;
    formik.setFieldValue("attributes", rest);
  };
  // Inside ProductFormModal component, after useState declarations
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [categorySearch, setCategorySearch] = useState("");
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);

  const filteredCategories = useMemo(() => {
    if (!categorySearch) return categories;
    return categories.filter((cat) =>
      (cat.full_path || cat.name)
        .toLowerCase()
        .includes(categorySearch.toLowerCase()),
    );
  }, [categories, categorySearch]);

  // ─── Margin preview ────────────────────────────────────────────

  const margin = useMemo(() => {
    const selling = formik.values.selling_price;
    const cost = formik.values.cost_price;
    if (selling > 0 && cost >= 0) {
      const profit = selling - cost;
      const pct = ((profit / selling) * 100).toFixed(1);
      return { profit, pct };
    }
    return null;
  }, [formik.values.selling_price, formik.values.cost_price]);

  const discount = useMemo(() => {
    const compare = formik.values.compare_price;
    const selling = formik.values.selling_price;
    if (compare && compare > selling) {
      return (((compare - selling) / compare) * 100).toFixed(0);
    }
    return null;
  }, [formik.values.compare_price, formik.values.selling_price]);

  // ─── Render ────────────────────────────────────────────────────

  if (!isOpen) return null;

  const hasError = (field: string) =>
    !!formik.touched[field as keyof typeof formik.touched] &&
    !!formik.errors[field as keyof typeof formik.errors];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl mx-4 max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* ===== HEADER ===== */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {isEditing ? "Edit Product" : "New Product"}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {isEditing
                ? `Editing "${product?.name}"`
                : "Create a new product"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* ===== FORM BODY (with sidebar navigation) ===== */}
        <form
          onSubmit={(e) => {
            console.log("ProductForm form onSubmit event", {
              activeSection,
              isBasicValid,
              isSubmitting: formik.isSubmitting,
            });
            e.preventDefault();
            formik.handleSubmit(e);
          }}
          className="flex-1 overflow-hidden flex"
        >
          {/* Left sidebar – section tabs */}
          <div className="w-56 bg-gray-50 border-r border-gray-100 p-4 space-y-1">
            {[
              { id: "basic", label: "Basic Info", icon: FiEdit2 },
              { id: "pricing", label: "Pricing", icon: FiSave },
              { id: "inventory", label: "Inventory", icon: FiFolder },
              { id: "shipping", label: "Shipping", icon: FiUploadCloud },
              { id: "images", label: "Images", icon: FiImage },
              { id: "attributes", label: "Attributes", icon: FiPlus },
              { id: "variations", label: "Variations", icon: FiPlus },
              { id: "seo", label: "SEO", icon: FiSearch },
            ].map((section) => {
              const Icon = section.icon;
              const accessible = isSectionAccessible(section.id);
              const isCompleted = completedSections.has(section.id);
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => accessible && goToSection(section.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-left transition-colors ${
                    !accessible
                      ? "opacity-50 cursor-not-allowed text-gray-400"
                      : "text-gray-600 hover:bg-gray-100"
                  } ${activeSection === section.id} ? "bg-white shadow-sm text-emerald-600 font-medium" : ""`}
                  disabled={!accessible}
                >
                  <Icon size={16} />
                  <span className="text-sm">{section.label}</span>
                  {isCompleted && (
                    <FiCheck size={14} className="text-emerald-500" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right content – scrollable sections */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Basic Info Section */}
            {activeSection === "basic" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Basic Information
                </h3>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
                      hasError("name")
                        ? "border-red-300 focus:ring-red-500/20 focus:border-red-400 bg-red-50/50"
                        : "border-gray-200 focus:ring-emerald-500/20 focus:border-emerald-400 bg-white"
                    }`}
                    placeholder="e.g. Air Jordan 1 Retro High OG"
                  />
                  {hasError("name") && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <FiAlertCircle size={12} />
                      {formik.errors.name}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      SKU <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="sku"
                      value={formik.values.sku}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className={`w-full px-4 py-3 rounded-xl border text-sm ${
                        hasError("sku")
                          ? "border-red-300 bg-red-50/50"
                          : "border-gray-200"
                      }`}
                    />
                    {hasError("sku") && (
                      <p className="text-xs text-red-500 mt-1">
                        {formik.errors.sku}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Barcode
                    </label>
                    <input
                      type="text"
                      name="barcode"
                      value={formik.values.barcode ?? ""}
                      onChange={formik.handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Slug
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="slug"
                      value={formik.values.slug}
                      onChange={formik.handleChange}
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm"
                      placeholder="auto-generated"
                    />
                    <button
                      type="button"
                      onClick={() => setAutoSlug(!autoSlug)}
                      className={`px-3 rounded-xl text-sm font-medium ${
                        autoSlug
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      Auto
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1.5">
                    {autoSlug
                      ? "Auto-generated from product name"
                      : "Custom slug"}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Short Description
                  </label>
                  <textarea
                    name="short_description"
                    rows={2}
                    value={formik.values.short_description ?? ""}
                    onChange={formik.handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm resize-none"
                    placeholder="Brief tagline for listings"
                  />
                  <p className="text-xs text-gray-400 mt-1.5">
                    Max 160 characters
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    rows={5}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-4 py-3 rounded-xl border text-sm resize-y ${
                      hasError("description")
                        ? "border-red-300 bg-red-50/50"
                        : "border-gray-200"
                    }`}
                    placeholder="Full product description…"
                  />
                  {hasError("description") && (
                    <p className="text-xs text-red-500 mt-1">
                      {formik.errors.description}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Category Dropdown */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category
                    </label>
                    <div className="relative parent-dropdown-container">
                      <button
                        type="button"
                        onClick={() =>
                          setShowCategoryDropdown(!showCategoryDropdown)
                        }
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all"
                      >
                        <div className="flex items-center gap-2">
                          <FiFolder
                            size={16}
                            className={
                              formik.values.category_id
                                ? "text-emerald-500"
                                : "text-gray-400"
                            }
                          />
                          <span
                            className={
                              formik.values.category_id
                                ? "text-gray-900"
                                : "text-gray-400"
                            }
                          >
                            {formik.values.category_id
                              ? categories.find(
                                  (c) => c.id === formik.values.category_id,
                                )?.full_path ||
                                categories.find(
                                  (c) => c.id === formik.values.category_id,
                                )?.name
                              : "Select a category"}
                          </span>
                        </div>
                        <FiChevronDown
                          size={16}
                          className={`text-gray-400 transition-transform ${showCategoryDropdown ? "rotate-180" : ""}`}
                        />
                      </button>

                      {showCategoryDropdown && (
                        <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white rounded-xl border border-gray-200 shadow-xl max-h-60 overflow-hidden">
                          {/* Search input */}
                          <div className="p-2 border-b border-gray-100">
                            <input
                              type="text"
                              value={categorySearch}
                              onChange={(e) =>
                                setCategorySearch(e.target.value)
                              }
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
                                formik.setFieldValue("category_id", null);
                                setShowCategoryDropdown(false);
                                setCategorySearch("");
                              }}
                              className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center gap-2 transition-colors ${
                                formik.values.category_id === null
                                  ? "bg-emerald-50 text-emerald-700 font-medium"
                                  : "text-gray-700"
                              }`}
                            >
                              <FiFolder size={14} className="text-gray-400" />
                              None (No Category)
                            </button>

                            {filteredCategories.map((cat) => (
                              <button
                                key={cat.id}
                                type="button"
                                onClick={() => {
                                  formik.setFieldValue("category_id", cat.id);
                                  setShowCategoryDropdown(false);
                                  setCategorySearch("");
                                }}
                                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center gap-2 transition-colors ${
                                  formik.values.category_id === cat.id
                                    ? "bg-emerald-50 text-emerald-700 font-medium"
                                    : "text-gray-700"
                                }`}
                              >
                                <FiFolder
                                  size={14}
                                  className={
                                    formik.values.category_id === cat.id
                                      ? "text-emerald-500"
                                      : "text-gray-400"
                                  }
                                />
                                <span className="truncate">
                                  {cat.full_path || cat.name}
                                </span>
                              </button>
                            ))}

                            {filteredCategories.length === 0 && (
                              <p className="text-center text-sm text-gray-400 py-4">
                                No categories found
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-1.5">
                      Assign a category to help customers find this product.
                    </p>
                  </div>

                  {/* Brand Dropdown */}
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Brand
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setShowBrandDropdown(!showBrandDropdown)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 transition-all"
                      >
                        <div className="flex items-center gap-2">
                          <FiFolder
                            size={16}
                            className={
                              formik.values.brand_id
                                ? "text-emerald-500"
                                : "text-gray-400"
                            }
                          />
                          <span
                            className={
                              formik.values.brand_id
                                ? "text-gray-900"
                                : "text-gray-400"
                            }
                          >
                            {formik.values.brand_id
                              ? brands.find(
                                  (b) => b.id === formik.values.brand_id,
                                )?.name
                              : "Select a brand"}
                          </span>
                        </div>
                        <FiChevronDown
                          size={16}
                          className={`text-gray-400 transition-transform ${showBrandDropdown ? "rotate-180" : ""}`}
                        />
                      </button>

                      {showBrandDropdown && (
                        <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white rounded-xl border border-gray-200 shadow-xl max-h-60 overflow-hidden">
                          <div className="overflow-y-auto max-h-60">
                            {/* None option */}
                            <button
                              type="button"
                              onClick={() => {
                                formik.setFieldValue("brand_id", null);
                                setShowBrandDropdown(false);
                              }}
                              className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center gap-2 transition-colors ${
                                formik.values.brand_id === null
                                  ? "bg-emerald-50 text-emerald-700 font-medium"
                                  : "text-gray-700"
                              }`}
                            >
                              <FiFolder size={14} className="text-gray-400" />
                              None (No Brand)
                            </button>

                            {brands.map((brand) => (
                              <button
                                key={brand.id}
                                type="button"
                                onClick={() => {
                                  formik.setFieldValue("brand_id", brand.id);
                                  setShowBrandDropdown(false);
                                }}
                                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center gap-2 transition-colors ${
                                  formik.values.brand_id === brand.id
                                    ? "bg-emerald-50 text-emerald-700 font-medium"
                                    : "text-gray-700"
                                }`}
                              >
                                <FiFolder
                                  size={14}
                                  className={
                                    formik.values.brand_id === brand.id
                                      ? "text-emerald-500"
                                      : "text-gray-400"
                                  }
                                />
                                <span className="truncate">{brand.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-1.5">
                      Select the brand for this product.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Pricing Section */}
            {activeSection === "pricing" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Pricing</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Cost Price
                    </label>
                    <input
                      type="number"
                      name="cost_price"
                      value={formik.values.cost_price}
                      onChange={formik.handleChange}
                      step="0.01"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Selling Price <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="selling_price"
                      value={formik.values.selling_price}
                      onChange={formik.handleChange}
                      step="0.01"
                      className={`w-full px-4 py-3 rounded-xl border ${
                        hasError("selling_price")
                          ? "border-red-300"
                          : "border-gray-200"
                      }`}
                    />
                    {hasError("selling_price") && (
                      <p className="text-xs text-red-500">
                        {formik.errors.selling_price}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Compare-at Price
                    </label>
                    <input
                      type="number"
                      name="compare_price"
                      value={formik.values.compare_price ?? ""}
                      onChange={formik.handleChange}
                      step="0.01"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
                    />
                    {discount && (
                      <p className="text-xs text-green-600 mt-1">
                        Save {discount}%
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Wholesale Price
                    </label>
                    <input
                      type="number"
                      name="wholesale_price"
                      value={formik.values.wholesale_price ?? ""}
                      onChange={formik.handleChange}
                      step="0.01"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
                    />
                  </div>
                </div>
                {margin && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm">
                    <span className="font-medium text-green-800">
                      Margin: KES {margin.profit.toLocaleString()} ({margin.pct}
                      %)
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Inventory Section */}
            {activeSection === "inventory" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Inventory
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Current Stock
                    </label>
                    <input
                      type="number"
                      name="current_stock"
                      value={formik.values.current_stock}
                      onChange={formik.handleChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Minimum Stock
                    </label>
                    <input
                      type="number"
                      name="minimum_stock"
                      value={formik.values.minimum_stock}
                      onChange={formik.handleChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Maximum Stock
                    </label>
                    <input
                      type="number"
                      name="maximum_stock"
                      value={formik.values.maximum_stock}
                      onChange={formik.handleChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Reorder Point
                    </label>
                    <input
                      type="number"
                      name="reorder_point"
                      value={formik.values.reorder_point}
                      onChange={formik.handleChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Safety Stock
                    </label>
                    <input
                      type="number"
                      name="safety_stock"
                      value={formik.values.safety_stock}
                      onChange={formik.handleChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Primary Warehouse
                  </label>
                  <select
                    name="primary_warehouse_id"
                    value={formik.values.primary_warehouse_id ?? ""}
                    onChange={formik.handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
                  >
                    <option value="">Select warehouse</option>
                    {warehouses.map((w) => (
                      <option key={w.id} value={w.id}>
                        {w.name} ({w.code})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="is_tracked"
                      checked={formik.values.is_tracked}
                      onChange={formik.handleChange}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Track Inventory</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="allow_backorder"
                      checked={formik.values.allow_backorder}
                      onChange={formik.handleChange}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Allow Backorder</span>
                  </label>
                </div>
              </div>
            )}

            {activeSection === "images" && (
              <>
                {console.log("🖼️ Images section rendering", {
                  activeSection,
                  isEditing,
                  productId: product?.id,
                  productExists: !!product,
                })}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Product Images
                  </h3>
                  {isEditing && product?.id ? (
                    <>
                      {console.log("📤 Rendering ProductImagesSection", {
                        productId: product.id,
                        isEditing,
                      })}
                      <ProductImagesSection productId={product.id} />
                    </>
                  ) : (
                    <>
                      {console.log("⚠️ ProductImagesSection NOT rendered", {
                        isEditing,
                        productId: product?.id,
                        reason: !isEditing ? "Not editing" : "No product ID",
                      })}
                      <p className="text-sm text-gray-500">
                        Images can only be managed after the product is created.
                        Save the product first, then you can upload images.
                      </p>
                    </>
                  )}
                </div>
              </>
            )}

            {/* Shipping Section */}
            {activeSection === "shipping" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Dimensions & Shipping
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      name="weight"
                      value={formik.values.weight ?? ""}
                      onChange={formik.handleChange}
                      step="0.01"
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Length (cm)
                    </label>
                    <input
                      type="number"
                      name="length"
                      value={formik.values.length ?? ""}
                      onChange={formik.handleChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Width (cm)
                    </label>
                    <input
                      type="number"
                      name="width"
                      value={formik.values.width ?? ""}
                      onChange={formik.handleChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      name="height"
                      value={formik.values.height ?? ""}
                      onChange={formik.handleChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      HS Code
                    </label>
                    <input
                      type="text"
                      name="hs_code"
                      value={formik.values.hs_code ?? ""}
                      onChange={formik.handleChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Country of Origin
                    </label>
                    <input
                      type="text"
                      name="country_of_origin"
                      value={formik.values.country_of_origin ?? ""}
                      onChange={formik.handleChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Tax Class
                    </label>
                    <select
                      name="tax_class"
                      value={formik.values.tax_class ?? "standard"}
                      onChange={formik.handleChange}
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                    >
                      <option value="standard">Standard</option>
                      <option value="reduced">Reduced</option>
                      <option value="zero">Zero-rated</option>
                      <option value="exempt">Exempt</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="is_active"
                      checked={formik.values.is_active}
                      onChange={formik.handleChange}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Active (visible on store)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="is_featured"
                      checked={formik.values.is_featured}
                      onChange={formik.handleChange}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">Featured</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="is_new"
                      checked={formik.values.is_new}
                      onChange={formik.handleChange}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">New</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="is_on_sale"
                      checked={formik.values.is_on_sale}
                      onChange={formik.handleChange}
                      className="w-4 h-4"
                    />
                    <span className="text-sm">On Sale</span>
                  </label>
                </div>
              </div>
            )}

            {/* Attributes Section */}
            {activeSection === "attributes" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Attributes
                  </h3>
                  <button
                    type="button"
                    onClick={addAttribute}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
                  >
                    <FiPlus size={14} /> Add
                  </button>
                </div>
                {Object.keys(formik.values.attributes).length === 0 ? (
                  <p className="text-gray-500 text-sm">
                    No attributes yet. Add product-specific details like color,
                    material, etc.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {Object.entries(formik.values.attributes).map(
                      ([key, value]) => (
                        <div key={key} className="flex gap-3 items-start">
                          <input
                            type="text"
                            value={key}
                            onChange={(e) =>
                              updateAttributeKey(key, e.target.value)
                            }
                            className="w-48 px-3 py-2 rounded-lg border border-gray-200 text-sm"
                            placeholder="Key"
                          />
                          <input
                            type="text"
                            value={value}
                            onChange={(e) =>
                              updateAttributeValue(key, e.target.value)
                            }
                            className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm"
                            placeholder="Value"
                          />
                          <button
                            type="button"
                            onClick={() => removeAttribute(key)}
                            className="text-red-500 hover:text-red-700 p-2"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      ),
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Variations Section */}
            {activeSection === "variations" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Variations
                </h3>
                <ProductVariantSection
                  productId={product?.id}
                  variations={formik.values.variations || []}
                  onVariationsChange={(v) =>
                    formik.setFieldValue("variations", v)
                  }
                  sellingPrice={formik.values.selling_price}
                />
              </div>
            )}

            {/* SEO Section */}
            {activeSection === "seo" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  SEO & Metadata
                </h3>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    name="meta_title"
                    value={formik.values.meta_title ?? ""}
                    onChange={formik.handleChange}
                    maxLength={60}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
                    placeholder="Page title for search engines"
                  />
                  <p className="text-xs text-gray-400 mt-1.5">
                    Recommended: up to 60 characters
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    name="meta_description"
                    rows={3}
                    value={formik.values.meta_description ?? ""}
                    onChange={formik.handleChange}
                    maxLength={160}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
                    placeholder="Brief description for search results"
                  />
                  <p className="text-xs text-gray-400 mt-1.5">
                    Recommended: up to 160 characters
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Meta Keywords
                  </label>
                  <input
                    type="text"
                    name="meta_keywords"
                    value={formik.values.meta_keywords ?? ""}
                    onChange={formik.handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
                    placeholder="comma, separated, keywords"
                  />
                </div>

                {/* Google Preview */}
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">
                    Search Preview
                  </p>
                  <p className="text-lg text-blue-700 font-medium truncate">
                    {formik.values.meta_title ||
                      formik.values.name ||
                      "Page Title"}
                  </p>
                  <p className="text-sm text-green-700 truncate">
                    https://yourstore.com/products/
                    {formik.values.slug || "product-slug"}
                  </p>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {formik.values.meta_description ||
                      formik.values.short_description ||
                      formik.values.description.slice(0, 160) ||
                      "Product description will appear here..."}
                  </p>
                </div>
                {isEditing && product && (
                  <>
                    {console.log("🖼️ Images section in SEO rendering", {
                      activeSection: "seo",
                      isEditing,
                      productId: product?.id,
                      productExists: !!product,
                    })}
                    <ProductImagesSection
                      productId={product.id}
                      existingImages={product.gallery_images || []}
                    />
                  </>
                )}
              </div>
            )}
          </div>
        </form>

        {/* ===== FOOTER ===== */}
        {/* ===== FOOTER ===== */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/50">
          {/* Left side: Back button (only if not on basic) */}
          <div>
            {activeSection !== "basic" && (
              <button
                type="button"
                onClick={handleBack}
                className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all"
              >
                <FiArrowLeft className="inline mr-1" size={16} /> Back
              </button>
            )}
          </div>

          {/* Right side: Cancel and Next/Submit buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={formik.isSubmitting}
              className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-50"
            >
              Cancel
            </button>
            {activeSection === "images" ? (
              <button
                type="submit"
                onClick={() =>
                  // console.log("Create button clicked", {
                  //   activeSection,
                  //   isBasicValid,
                  //   isSubmitting: formik.isSubmitting,
                  //   "Formik errors": formik.errors,
                  //   "Formik values": formik.values,
                  //   "Formik isSubmitting": formik.isSubmitting,
                  // })

                  formik.handleSubmit()
                }
                disabled={!isBasicValid || formik.isSubmitting}
                className="px-6 py-2.5 text-sm font-semibold text-white bg-emerald-500 rounded-xl hover:bg-emerald-600 transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {formik.isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {isEditing ? "Updating..." : "Creating..."}
                  </>
                ) : isEditing ? (
                  "Update Product"
                ) : (
                  "Create Product"
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                disabled={!isBasicValid}
                className="px-6 py-2.5 text-sm font-semibold text-white bg-emerald-500 rounded-xl hover:bg-emerald-600 transition-all disabled:opacity-50 flex items-center gap-2"
              >
                Next <FiArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductImagesSection = React.lazy(() => import("./ProductImagesSection"));

export default ProductFormModal;
