// src/pages/brands/components/BrandFormModal.tsx

import { useState, useEffect, useRef } from "react";
import {
  FiX,
  FiUploadCloud,
  FiImage,
  FiTrash2,
  FiChevronDown,
  FiFolder,
  FiAlertCircle,
  FiCheck,
  FiArrowLeft,
  FiArrowRight,
} from "react-icons/fi";
import type {
  Brand,
  BrandCreateData,
  BrandUpdateData,
} from "../../../types/brand.types";
import { useBrand } from "../../../hooks/brands/useBrand";
import toast from "react-hot-toast";

// Define the shape of the brand metadata
interface BrandMetadata {
  founded_year?: number;
  founder?: string;
  headquarters?: string;
  industry?: string;
  slogan?: string;
  stock_ticker?: string;
  annual_revenue?: string;
  number_of_employees?: number;
  social_media?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
    tiktok?: string;
  };
  brand_colors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
  };
  categories?: string[];
}

interface BrandFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BrandCreateData | BrandUpdateData) => Promise<void>;
  brand?: Brand | null;
}

interface FormErrors {
  name?: string;
  website?: string;
  email?: string;
  phone?: string;
  logo?: string;
  cover_image?: string;
  founded_year?: string;
  founder?: string;
  headquarters?: string;
  industry?: string;
  slogan?: string;
  stock_ticker?: string;
  annual_revenue?: string;
  number_of_employees?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  tiktok?: string;
  primary_color?: string;
  secondary_color?: string;
  accent_color?: string;
  categories?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  general?: string;
}

const steps = [
  { id: "basic", label: "Basic Info" },
  { id: "images", label: "Images" },
  { id: "metadata", label: "Metadata" },
  { id: "social", label: "Social & Colors" },
  { id: "seo", label: "SEO" },
];

const BrandFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  brand,
}: BrandFormModalProps) => {
  const isEditing = !!brand;
  const { fetchBrands } = useBrand(); // optionally to refresh list, but we'll rely on parent
  const fileInputRefs = {
    logo: useRef<HTMLInputElement>(null),
    cover_image: useRef<HTMLInputElement>(null),
  };

  // Form state
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  // Basic Info
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [autoSlug, setAutoSlug] = useState(true);
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [sortOrder, setSortOrder] = useState(0);

  // Images
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [removeLogo, setRemoveLogo] = useState(false);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [removeCover, setRemoveCover] = useState(false);

  // Metadata
  const [foundedYear, setFoundedYear] = useState<string>("");
  const [founder, setFounder] = useState("");
  const [headquarters, setHeadquarters] = useState("");
  const [industry, setIndustry] = useState("");
  const [slogan, setSlogan] = useState("");
  const [stockTicker, setStockTicker] = useState("");
  const [annualRevenue, setAnnualRevenue] = useState("");
  const [numberOfEmployees, setNumberOfEmployees] = useState("");

  // Social & Colors
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [youtube, setYoutube] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [primaryColor, setPrimaryColor] = useState("");
  const [secondaryColor, setSecondaryColor] = useState("");
  const [accentColor, setAccentColor] = useState("");
  const [categories, setCategories] = useState("");

  // SEO
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isDirty, setIsDirty] = useState(false);

  // Populate form when editing
  useEffect(() => {
    if (brand) {
      // Basic
      setName(brand.name || "");
      setSlug(brand.slug || "");
      setAutoSlug(false);
      setDescription(brand.description || "");
      setWebsite(brand.website || "");
      setEmail(brand.email || "");
      setPhone(brand.phone || "");
      setIsActive(brand.is_active);
      setIsFeatured(brand.is_featured);
      setSortOrder(brand.sort_order ?? 0);

      // Images – show previews if paths exist
      if (brand.logo) setLogoPreview(brand.logo);
      if (brand.cover_image) setCoverPreview(brand.cover_image);

      // Metadata – from metadata object
      const meta = (brand.metadata || {}) as BrandMetadata;

      setFoundedYear(meta.founded_year?.toString() || "");
      setFounder(meta.founder || "");
      setHeadquarters(meta.headquarters || "");
      setIndustry(meta.industry || "");
      setSlogan(meta.slogan || "");
      setStockTicker(meta.stock_ticker || "");
      setAnnualRevenue(meta.annual_revenue || "");
      setNumberOfEmployees(meta.number_of_employees?.toString() || "");

      // Social & Colors
      const social = meta.social_media || {};
      setFacebook(social.facebook || "");
      setInstagram(social.instagram || "");
      setTwitter(social.twitter || "");
      setYoutube(social.youtube || "");
      setTiktok(social.tiktok || "");

      const colors = meta.brand_colors || {};
      setPrimaryColor(colors.primary || "");
      setSecondaryColor(colors.secondary || "");
      setAccentColor(colors.accent || "");

      setCategories((meta.categories || []).join(", "));

      // SEO
      setMetaTitle(brand.meta_title || "");
      setMetaDescription(brand.meta_description || "");
      setMetaKeywords(brand.meta_keywords || "");
    } else {
      resetForm();
    }
    setErrors({});
    setIsDirty(false);
    setCompletedSteps(new Set());
    setCurrentStep(0);
  }, [brand, isOpen]);

  const resetForm = () => {
    // Basic
    setName("");
    setSlug("");
    setAutoSlug(true);
    setDescription("");
    setWebsite("");
    setEmail("");
    setPhone("");
    setIsActive(true);
    setIsFeatured(false);
    setSortOrder(0);
    // Images
    setLogo(null);
    setLogoPreview(null);
    setRemoveLogo(false);
    setCoverImage(null);
    setCoverPreview(null);
    setRemoveCover(false);
    // Metadata
    setFoundedYear("");
    setFounder("");
    setHeadquarters("");
    setIndustry("");
    setSlogan("");
    setStockTicker("");
    setAnnualRevenue("");
    setNumberOfEmployees("");
    // Social & Colors
    setFacebook("");
    setInstagram("");
    setTwitter("");
    setYoutube("");
    setTiktok("");
    setPrimaryColor("");
    setSecondaryColor("");
    setAccentColor("");
    setCategories("");
    // SEO
    setMetaTitle("");
    setMetaDescription("");
    setMetaKeywords("");
  };

  // Slug generation
  useEffect(() => {
    if (autoSlug && name) {
      setSlug(generateSlug(name));
    }
  }, [name, autoSlug]);

  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  // Validation per step
  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 0) {
      if (!name.trim()) newErrors.name = "Brand name is required";
      else if (name.trim().length < 2)
        newErrors.name = "Name must be at least 2 characters";
      else if (name.trim().length > 100) newErrors.name = "Name too long";
      if (website && !isValidUrl(website)) newErrors.website = "Invalid URL";
      if (email && !isValidEmail(email)) newErrors.email = "Invalid email";
      if (phone && !isValidPhone(phone))
        newErrors.phone = "Invalid phone number";
    }
    // Step 1: Images – optional, no validation
    if (step === 2) {
      // Metadata – optional, no strict validation
    }
    if (step === 3) {
      // Social URLs – validate if provided
      if (facebook && !isValidUrl(facebook)) newErrors.facebook = "Invalid URL";
      if (instagram && !isValidUrl(instagram))
        newErrors.instagram = "Invalid URL";
      if (twitter && !isValidUrl(twitter)) newErrors.twitter = "Invalid URL";
      if (youtube && !isValidUrl(youtube)) newErrors.youtube = "Invalid URL";
      if (tiktok && !isValidUrl(tiktok)) newErrors.tiktok = "Invalid URL";
      // Color – optional, accept any string
      // Categories – optional, no validation
    }
    if (step === 4) {
      if (metaTitle && metaTitle.length > 60)
        newErrors.meta_title = "Max 60 characters";
      if (metaDescription && metaDescription.length > 160)
        newErrors.meta_description = "Max 160 characters";
      if (metaKeywords && metaKeywords.length > 500)
        newErrors.meta_keywords = "Max 500 characters";
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
    const isValid = Object.keys(newErrors).length === 0;
    if (isValid) {
      setCompletedSteps((prev) => new Set([...prev, step]));
    } else {
      setCompletedSteps((prev) => {
        const next = new Set(prev);
        next.delete(step);
        return next;
      });
    }
    return isValid;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(email);
  };

  const isValidPhone = (phone: string) => {
    // Basic international phone format (digits, spaces, +, -, etc.)
    return /^[\d\s+\-()]+$/.test(phone);
  };

  // Handle next/back
  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Image handling
  const handleImageChange = (
    type: "logo" | "cover",
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, [type]: "Please select an image file" }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, [type]: "Image must be less than 5MB" }));
      return;
    }

    if (type === "logo") {
      setLogo(file);
      setRemoveLogo(false);
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setCoverImage(file);
      setRemoveCover(false);
      const reader = new FileReader();
      reader.onloadend = () => setCoverPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
    setErrors((prev) => ({ ...prev, [type]: undefined }));
  };

  const handleRemoveImage = (type: "logo" | "cover") => {
    if (type === "logo") {
      setLogo(null);
      setLogoPreview(null);
      setRemoveLogo(true);
      if (fileInputRefs.logo.current) fileInputRefs.logo.current.value = "";
    } else {
      setCoverImage(null);
      setCoverPreview(null);
      setRemoveCover(true);
      if (fileInputRefs.cover_image.current)
        fileInputRefs.cover_image.current.value = "";
    }
  };

  // Submit
  const handleSubmit = async () => {
    // Validate final step
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    try {
      const formData: BrandCreateData | BrandUpdateData = {
        name: name.trim(),
        slug: autoSlug ? generateSlug(name) : slug,
        description: description.trim() || null,
        website: website || null,
        email: email || null,
        phone: phone || null,
        is_active: isActive,
        is_featured: isFeatured,
        sort_order: sortOrder,
        // Images
        logo: logo,
        cover_image: coverImage,
        // Metadata
        metadata: {
          founded_year: foundedYear ? parseInt(foundedYear) : null,
          founder: founder || null,
          headquarters: headquarters || null,
          industry: industry || null,
          slogan: slogan || null,
          stock_ticker: stockTicker || null,
          annual_revenue: annualRevenue || null,
          number_of_employees: numberOfEmployees
            ? parseInt(numberOfEmployees)
            : null,
          social_media: {
            facebook: facebook || null,
            instagram: instagram || null,
            twitter: twitter || null,
            youtube: youtube || null,
            tiktok: tiktok || null,
          },
          brand_colors: {
            primary: primaryColor || null,
            secondary: secondaryColor || null,
            accent: accentColor || null,
          },
          categories: categories
            ? categories.split(",").map((c) => c.trim())
            : [],
        },
        // SEO
        meta_title: metaTitle || null,
        meta_description: metaDescription || null,
        meta_keywords: metaKeywords || null,
      };

      // If editing and image removal flags, add them
      if (isEditing && removeLogo) (formData as any).remove_logo = true;
      if (isEditing && removeCover) (formData as any).remove_cover = true;

      await onSubmit(formData);
      toast.success(
        isEditing
          ? "Brand updated successfully!"
          : "Brand created successfully!",
      );
      onClose();
      resetForm();
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        `Failed to ${isEditing ? "update" : "create"} brand`;
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        toast.error(message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close dropdown when clicking outside (if any)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Not needed here because we don't have dropdowns in this version
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const isStepValid = (step: number) =>
    completedSteps.has(step) || step === currentStep;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl mx-4 max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {isEditing ? "Edit Brand" : "New Brand"}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {isEditing ? `Editing "${brand?.name}"` : "Create a new brand"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Step Indicators */}
        <div className="px-6 pt-5">
          <div className="flex items-center justify-between">
            {steps.map((step, idx) => (
              <div key={step.id} className="flex-1 flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    idx <= currentStep
                      ? completedSteps.has(idx)
                        ? "bg-emerald-500 text-white"
                        : "bg-emerald-100 text-emerald-700"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {completedSteps.has(idx) ? <FiCheck size={14} /> : idx + 1}
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 transition-colors ${
                      completedSteps.has(idx) ? "bg-emerald-500" : "bg-gray-200"
                    }`}
                  />
                )}
                <span
                  className={`text-xs font-medium hidden sm:inline ${
                    idx <= currentStep ? "text-gray-700" : "text-gray-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Step 0: Basic Info */}
          {currentStep === 0 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Brand Name <span className="text-red-500">*</span>
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
                  placeholder="e.g. Nike"
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <FiAlertCircle size={12} />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Slug
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => {
                      setAutoSlug(false);
                      setSlug(e.target.value);
                    }}
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
                  {autoSlug ? "Auto-generated from name" : "Custom slug"}
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm resize-none"
                  placeholder="Brief description of the brand..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-sm ${
                      errors.website
                        ? "border-red-300 bg-red-50/50"
                        : "border-gray-200"
                    }`}
                    placeholder="https://..."
                  />
                  {errors.website && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.website}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-sm ${
                      errors.email
                        ? "border-red-300 bg-red-50/50"
                        : "border-gray-200"
                    }`}
                    placeholder="contact@brand.com"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border text-sm ${
                    errors.phone
                      ? "border-red-300 bg-red-50/50"
                      : "border-gray-200"
                  }`}
                  placeholder="+1 234 567 890"
                />
                {errors.phone && (
                  <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Status
                  </label>
                  <div
                    className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer ${
                      isActive
                        ? "bg-emerald-50 border-emerald-200"
                        : "bg-gray-50 border-gray-200"
                    }`}
                    onClick={() => setIsActive(!isActive)}
                  >
                    <div
                      className={`relative w-10 h-6 rounded-full transition-colors ${isActive ? "bg-emerald-500" : "bg-gray-300"}`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${isActive ? "translate-x-5" : "translate-x-1"}`}
                      />
                    </div>
                    <div>
                      <p
                        className={`text-sm font-medium ${isActive ? "text-emerald-700" : "text-gray-600"}`}
                      >
                        {isActive ? "Active" : "Inactive"}
                      </p>
                      <p className="text-xs text-gray-400">
                        {isActive
                          ? "Visible to customers"
                          : "Hidden from store"}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={sortOrder}
                    onChange={(e) =>
                      setSortOrder(parseInt(e.target.value) || 0)
                    }
                    min={0}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
                  />
                  <p className="text-xs text-gray-400 mt-1.5">
                    Lower numbers appear first
                  </p>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Featured Brand
                  </span>
                </label>
                <p className="text-xs text-gray-400 ml-6">
                  Show in featured sections
                </p>
              </div>
            </div>
          )}

          {/* Step 1: Images */}
          {currentStep === 1 && (
            <div className="space-y-6">
              {/* Logo */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Brand Logo
                </label>
                <div className="flex items-start gap-4">
                  <div
                    onClick={() => fileInputRefs.logo.current?.click()}
                    className={`w-28 h-28 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden ${
                      errors.logo
                        ? "border-red-300 bg-red-50"
                        : logoPreview
                          ? "border-transparent"
                          : "border-gray-200 bg-gray-50 hover:border-emerald-300 hover:bg-emerald-50"
                    }`}
                  >
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt="Logo preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <>
                        <FiImage className="text-gray-400 mb-1" size={24} />
                        <span className="text-xs text-gray-400">Upload</span>
                      </>
                    )}
                  </div>
                  <div className="flex-1 pt-1">
                    <input
                      ref={fileInputRefs.logo}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange("logo", e)}
                      className="hidden"
                    />
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRefs.logo.current?.click()}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg"
                      >
                        <FiUploadCloud size={15} />
                        {logoPreview ? "Change" : "Upload"}
                      </button>
                      {logoPreview && (
                        <button
                          type="button"
                          onClick={() => handleRemoveImage("logo")}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium rounded-lg"
                        >
                          <FiTrash2 size={15} />
                          Remove
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      PNG, JPG or WEBP. Max 5MB. Recommended 400×400px.
                    </p>
                    {errors.logo && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <FiAlertCircle size={12} />
                        {errors.logo}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Cover Image */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Cover Image
                </label>
                <div className="flex items-start gap-4">
                  <div
                    onClick={() => fileInputRefs.cover_image.current?.click()}
                    className={`w-28 h-28 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden ${
                      errors.cover_image
                        ? "border-red-300 bg-red-50"
                        : coverPreview
                          ? "border-transparent"
                          : "border-gray-200 bg-gray-50 hover:border-emerald-300 hover:bg-emerald-50"
                    }`}
                  >
                    {coverPreview ? (
                      <img
                        src={coverPreview}
                        alt="Cover preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <>
                        <FiImage className="text-gray-400 mb-1" size={24} />
                        <span className="text-xs text-gray-400">Upload</span>
                      </>
                    )}
                  </div>
                  <div className="flex-1 pt-1">
                    <input
                      ref={fileInputRefs.cover_image}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange("cover", e)}
                      className="hidden"
                    />
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          fileInputRefs.cover_image.current?.click()
                        }
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg"
                      >
                        <FiUploadCloud size={15} />
                        {coverPreview ? "Change" : "Upload"}
                      </button>
                      {coverPreview && (
                        <button
                          type="button"
                          onClick={() => handleRemoveImage("cover")}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium rounded-lg"
                        >
                          <FiTrash2 size={15} />
                          Remove
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      Recommended 1200×400px for banner
                    </p>
                    {errors.cover_image && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <FiAlertCircle size={12} />
                        {errors.cover_image}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Metadata */}
          {currentStep === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Founded Year
                </label>
                <input
                  type="number"
                  value={foundedYear}
                  onChange={(e) => setFoundedYear(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
                  placeholder="e.g. 1964"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Founder(s)
                </label>
                <input
                  type="text"
                  value={founder}
                  onChange={(e) => setFounder(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
                  placeholder="e.g. Phil Knight & Bill Bowerman"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Headquarters
                </label>
                <input
                  type="text"
                  value={headquarters}
                  onChange={(e) => setHeadquarters(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
                  placeholder="e.g. Beaverton, Oregon, USA"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Industry
                </label>
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
                  placeholder="e.g. Sportswear & Athletic Apparel"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Slogan
                </label>
                <input
                  type="text"
                  value={slogan}
                  onChange={(e) => setSlogan(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
                  placeholder="e.g. Just Do It"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Stock Ticker
                </label>
                <input
                  type="text"
                  value={stockTicker}
                  onChange={(e) => setStockTicker(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
                  placeholder="e.g. NKE"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Annual Revenue
                </label>
                <input
                  type="text"
                  value={annualRevenue}
                  onChange={(e) => setAnnualRevenue(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
                  placeholder="e.g. $51.2 Billion"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Number of Employees
                </label>
                <input
                  type="number"
                  value={numberOfEmployees}
                  onChange={(e) => setNumberOfEmployees(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
                  placeholder="e.g. 79400"
                />
              </div>
            </div>
          )}

          {/* Step 3: Social & Colors */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Facebook
                  </label>
                  <input
                    type="url"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-sm ${errors.facebook ? "border-red-300 bg-red-50/50" : "border-gray-200"}`}
                    placeholder="https://facebook.com/..."
                  />
                  {errors.facebook && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.facebook}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Instagram
                  </label>
                  <input
                    type="url"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-sm ${errors.instagram ? "border-red-300 bg-red-50/50" : "border-gray-200"}`}
                    placeholder="https://instagram.com/..."
                  />
                  {errors.instagram && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.instagram}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Twitter
                  </label>
                  <input
                    type="url"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-sm ${errors.twitter ? "border-red-300 bg-red-50/50" : "border-gray-200"}`}
                    placeholder="https://twitter.com/..."
                  />
                  {errors.twitter && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.twitter}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    YouTube
                  </label>
                  <input
                    type="url"
                    value={youtube}
                    onChange={(e) => setYoutube(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-sm ${errors.youtube ? "border-red-300 bg-red-50/50" : "border-gray-200"}`}
                    placeholder="https://youtube.com/..."
                  />
                  {errors.youtube && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.youtube}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    TikTok
                  </label>
                  <input
                    type="url"
                    value={tiktok}
                    onChange={(e) => setTiktok(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border text-sm ${errors.tiktok ? "border-red-300 bg-red-50/50" : "border-gray-200"}`}
                    placeholder="https://tiktok.com/@..."
                  />
                  {errors.tiktok && (
                    <p className="text-xs text-red-500 mt-1">{errors.tiktok}</p>
                  )}
                </div>
              </div>

              <div className="border-t pt-5">
                <h3 className="text-md font-semibold text-gray-800 mb-3">
                  Brand Colors
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Primary Color
                    </label>
                    <input
                      type="text"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
                      placeholder="#111111"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Secondary Color
                    </label>
                    <input
                      type="text"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
                      placeholder="#FF6600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Accent Color
                    </label>
                    <input
                      type="text"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
                      placeholder="#FFFFFF"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Product Categories
                </label>
                <textarea
                  rows={2}
                  value={categories}
                  onChange={(e) => setCategories(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
                  placeholder="Running, Basketball, Lifestyle (comma separated)"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Comma separated list of product categories this brand
                  specializes in.
                </p>
              </div>
            </div>
          )}

          {/* Step 4: SEO */}
          {currentStep === 4 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  maxLength={60}
                  className={`w-full px-4 py-3 rounded-xl border text-sm ${errors.meta_title ? "border-red-300 bg-red-50/50" : "border-gray-200"}`}
                  placeholder="Page title for search engines"
                />
                {errors.meta_title && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.meta_title}
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  {metaTitle.length}/60
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Meta Description
                </label>
                <textarea
                  rows={3}
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  maxLength={160}
                  className={`w-full px-4 py-3 rounded-xl border text-sm ${errors.meta_description ? "border-red-300 bg-red-50/50" : "border-gray-200"}`}
                  placeholder="Brief description for search results"
                />
                {errors.meta_description && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.meta_description}
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  {metaDescription.length}/160
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Meta Keywords
                </label>
                <input
                  type="text"
                  value={metaKeywords}
                  onChange={(e) => setMetaKeywords(e.target.value)}
                  maxLength={500}
                  className={`w-full px-4 py-3 rounded-xl border text-sm ${errors.meta_keywords ? "border-red-300 bg-red-50/50" : "border-gray-200"}`}
                  placeholder="comma, separated, keywords"
                />
                {errors.meta_keywords && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.meta_keywords}
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  {metaKeywords.length}/500
                </p>
              </div>

              {/* Preview */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">
                  Search Preview
                </p>
                <p className="text-lg text-blue-700 font-medium truncate">
                  {metaTitle || name || "Page Title"}
                </p>
                <p className="text-sm text-green-700 truncate">
                  https://yourstore.com/brands/{slug || "brand-slug"}
                </p>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {metaDescription ||
                    description ||
                    "Brand description will appear here..."}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer with navigation buttons */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50/50">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 0 || isSubmitting}
            className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-50"
          >
            <FiArrowLeft className="inline mr-1" size={16} /> Back
          </button>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-50"
            >
              Cancel
            </button>
            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={isSubmitting}
                className="px-6 py-2.5 text-sm font-semibold text-white bg-emerald-500 rounded-xl hover:bg-emerald-600 transition-all disabled:opacity-50 flex items-center gap-2"
              >
                Next <FiArrowRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2.5 text-sm font-semibold text-white bg-emerald-500 rounded-xl hover:bg-emerald-600 transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {isEditing ? "Updating..." : "Creating..."}
                  </>
                ) : isEditing ? (
                  "Update Brand"
                ) : (
                  "Create Brand"
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandFormModal;
