// src/components/dashboard/warehouses/WarehouseFormModal.tsx

import { useState, useEffect } from "react";
import {
  FiX,
  FiAlertCircle,
  FiMapPin,
  FiMail,
  FiPhone,
  FiUser,
} from "react-icons/fi";
import type {
  Warehouse,
  WarehouseCreateData,
  WarehouseUpdateData,
} from "../../../types/warehouse.types";
import toast from "react-hot-toast";

interface WarehouseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: WarehouseCreateData | WarehouseUpdateData) => Promise<void>;
  warehouse?: Warehouse | null; // null = create mode
}

interface FormErrors {
  name?: string;
  code?: string;
  address_line1?: string;
  city?: string;
  postal_code?: string;
  country?: string;
  phone?: string;
  email?: string;
  manager_name?: string;
  description?: string;
}

const WarehouseFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  warehouse,
}: WarehouseFormModalProps) => {
  const isEditing = !!warehouse;

  // Form state
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [managerName, setManagerName] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [isPrimary, setIsPrimary] = useState(false);
  const [metadata, setMetadata] = useState<Record<string, unknown> | null>(
    null,
  );
  const [metadataString, setMetadataString] = useState("");

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // Populate form when editing
  useEffect(() => {
    if (warehouse) {
      setName(warehouse.name || "");
      setCode(warehouse.code || "");
      setDescription(warehouse.description || "");
      setAddressLine1(warehouse.address_line1 || "");
      setAddressLine2(warehouse.address_line2 || "");
      setCity(warehouse.city || "");
      setState(warehouse.state || "");
      setPostalCode(warehouse.postal_code || "");
      setCountry(warehouse.country || "");
      setPhone(warehouse.phone || "");
      setEmail(warehouse.email || "");
      setManagerName(warehouse.manager_name || "");
      setIsActive(warehouse.is_active);
      setIsPrimary(warehouse.is_primary);
      setMetadata(warehouse.metadata);
      const meta = warehouse.metadata || null;
      setMetadata(meta);
      setMetadataString(meta ? JSON.stringify(meta, null, 2) : "");
    } else {
      resetForm();
    }
    setErrors({});
  }, [warehouse, isOpen]);

  const resetForm = () => {
    setName("");
    setCode("");
    setDescription("");
    setAddressLine1("");
    setAddressLine2("");
    setCity("");
    setState("");
    setPostalCode("");
    setCountry("");
    setPhone("");
    setEmail("");
    setManagerName("");
    setIsActive(true);
    setIsPrimary(false);
    setMetadata(null);
    setMetadataString("");
    setErrors({});
  };

  // Validation
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim()) newErrors.name = "Warehouse name is required";
    else if (name.trim().length < 2)
      newErrors.name = "Name must be at least 2 characters";
    else if (name.trim().length > 100) newErrors.name = "Name too long";

    if (!code.trim()) newErrors.code = "Warehouse code is required";
    else if (code.trim().length < 2)
      newErrors.code = "Code must be at least 2 characters";
    else if (code.trim().length > 50) newErrors.code = "Code too long";

    if (!addressLine1.trim())
      newErrors.address_line1 = "Address line 1 is required";
    if (!city.trim()) newErrors.city = "City is required";
    if (!postalCode.trim()) newErrors.postal_code = "Postal code is required";
    if (!country.trim()) newErrors.country = "Country is required";

    if (phone && !/^[\d\s+\-()]+$/.test(phone))
      newErrors.phone = "Invalid phone number";
    if (email && !/^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(email))
      newErrors.email = "Invalid email address";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const formData: WarehouseCreateData | WarehouseUpdateData = {
        name: name.trim(),
        code: code.trim(),
        description: description.trim() || null,
        address_line1: addressLine1.trim(),
        address_line2: addressLine2.trim() || null,
        city: city.trim(),
        state: state.trim() || null,
        postal_code: postalCode.trim(),
        country: country.trim(),
        phone: phone.trim() || null,
        email: email.trim() || null,
        manager_name: managerName.trim() || null,
        is_active: isActive,
        is_primary: isPrimary,
        metadata: metadata,
      };

      await onSubmit(formData);
      toast.success(
        isEditing
          ? "Warehouse updated successfully!"
          : "Warehouse created successfully!",
      );
      onClose();
      resetForm();
    } catch (error: any) {
      const apiPayload = error.body ?? error.response?.data;
      const message =
        apiPayload && typeof apiPayload === "object"
          ? apiPayload.message || apiPayload.error
          : error.message ||
            `Failed to ${isEditing ? "update" : "create"} warehouse`;
      const validationErrors =
        apiPayload && typeof apiPayload === "object"
          ? (apiPayload.errors ?? null)
          : null;
      if (validationErrors) {
        setErrors(validationErrors);
      } else {
        toast.error(message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {isEditing ? "Edit Warehouse" : "New Warehouse"}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {isEditing
                ? `Editing "${warehouse?.name}"`
                : "Create a new warehouse location"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Warehouse Name <span className="text-red-500">*</span>
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
                  placeholder="e.g. Main Warehouse"
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <FiAlertCircle size={12} /> {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    if (errors.code)
                      setErrors((p) => ({ ...p, code: undefined }));
                  }}
                  className={`w-full px-4 py-3 rounded-xl border text-sm ${
                    errors.code
                      ? "border-red-300 bg-red-50/50"
                      : "border-gray-200"
                  }`}
                  placeholder="e.g. WH001"
                  disabled={isSubmitting}
                />
                {errors.code && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <FiAlertCircle size={12} /> {errors.code}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm resize-none"
                placeholder="Brief description of the warehouse..."
                disabled={isSubmitting}
              />
              <p className="text-xs text-gray-400 mt-1.5">
                Optional, up to 500 characters
              </p>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={addressLine1}
                onChange={(e) => {
                  setAddressLine1(e.target.value);
                  if (errors.address_line1)
                    setErrors((p) => ({ ...p, address_line1: undefined }));
                }}
                className={`w-full px-4 py-3 rounded-xl border text-sm mb-3 ${
                  errors.address_line1
                    ? "border-red-300 bg-red-50/50"
                    : "border-gray-200"
                }`}
                placeholder="Street address"
                disabled={isSubmitting}
              />
              <input
                type="text"
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
                placeholder="Apartment, suite, etc. (optional)"
                disabled={isSubmitting}
              />
              {errors.address_line1 && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <FiAlertCircle size={12} /> {errors.address_line1}
                </p>
              )}
            </div>

            {/* City, State, Postal Code, Country */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    if (errors.city)
                      setErrors((p) => ({ ...p, city: undefined }));
                  }}
                  className={`w-full px-4 py-3 rounded-xl border text-sm ${
                    errors.city
                      ? "border-red-300 bg-red-50/50"
                      : "border-gray-200"
                  }`}
                  placeholder="e.g. Nairobi"
                  disabled={isSubmitting}
                />
                {errors.city && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <FiAlertCircle size={12} /> {errors.city}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  State/Province
                </label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
                  placeholder="e.g. Nairobi County"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Postal Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => {
                    setPostalCode(e.target.value);
                    if (errors.postal_code)
                      setErrors((p) => ({ ...p, postal_code: undefined }));
                  }}
                  className={`w-full px-4 py-3 rounded-xl border text-sm ${
                    errors.postal_code
                      ? "border-red-300 bg-red-50/50"
                      : "border-gray-200"
                  }`}
                  placeholder="e.g. 00100"
                  disabled={isSubmitting}
                />
                {errors.postal_code && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <FiAlertCircle size={12} /> {errors.postal_code}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Country <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                    if (errors.country)
                      setErrors((p) => ({ ...p, country: undefined }));
                  }}
                  className={`w-full px-4 py-3 rounded-xl border text-sm ${
                    errors.country
                      ? "border-red-300 bg-red-50/50"
                      : "border-gray-200"
                  }`}
                  placeholder="e.g. Kenya"
                  disabled={isSubmitting}
                />
                {errors.country && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                    <FiAlertCircle size={12} /> {errors.country}
                  </p>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                  <FiPhone size={14} /> Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone)
                      setErrors((p) => ({ ...p, phone: undefined }));
                  }}
                  className={`w-full px-4 py-3 rounded-xl border text-sm ${
                    errors.phone
                      ? "border-red-300 bg-red-50/50"
                      : "border-gray-200"
                  }`}
                  placeholder="+254 700 123456"
                  disabled={isSubmitting}
                />
                {errors.phone && (
                  <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                  <FiMail size={14} /> Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email)
                      setErrors((p) => ({ ...p, email: undefined }));
                  }}
                  className={`w-full px-4 py-3 rounded-xl border text-sm ${
                    errors.email
                      ? "border-red-300 bg-red-50/50"
                      : "border-gray-200"
                  }`}
                  placeholder="warehouse@example.com"
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Manager Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                <FiUser size={14} /> Manager Name
              </label>
              <input
                type="text"
                value={managerName}
                onChange={(e) => {
                  setManagerName(e.target.value);
                  if (errors.manager_name)
                    setErrors((p) => ({ ...p, manager_name: undefined }));
                }}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
                placeholder="e.g. John Doe"
                disabled={isSubmitting}
              />
              {errors.manager_name && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.manager_name}
                </p>
              )}
            </div>

            {/* Status and Primary */}
            <div className="grid grid-cols-2 gap-4">
              {/* Active Toggle */}
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
                      {isActive ? "Operational" : "Disabled"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Primary Checkbox */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Primary Warehouse
                </label>
                <div className="flex items-center gap-2 p-3.5 rounded-xl border border-gray-200 bg-white">
                  <input
                    type="checkbox"
                    checked={isPrimary}
                    onChange={(e) => setIsPrimary(e.target.checked)}
                    disabled={isSubmitting}
                    className="w-5 h-5 text-emerald-500 rounded focus:ring-emerald-500"
                  />
                  <span className="text-sm text-gray-700">
                    {isPrimary ? "Primary warehouse" : "Not primary"}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1.5">
                  Only one warehouse can be marked as primary.
                </p>
              </div>
            </div>

            {/* Optional metadata field – could be a JSON editor, but keep simple */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Metadata (JSON)
              </label>
              <textarea
                value={metadataString}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setMetadataString(newValue);
                  try {
                    const parsed = JSON.parse(newValue);
                    setMetadata(parsed);
                  } catch {
                    // invalid JSON – keep metadata as is (or set to null if empty)
                    if (newValue.trim() === "") {
                      setMetadata(null);
                    }
                  }
                }}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-mono"
                placeholder='{"key": "value"}'
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Footer */}
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
                "Update Warehouse"
              ) : (
                "Create Warehouse"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WarehouseFormModal;
