// src/components/dashboard/suppliers/SupplierFormModal.tsx

import { useState, useEffect } from "react";
import {
  FiX,
  FiAlertCircle,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiGlobe,
  FiCreditCard,
  FiBookOpen,
  FiStar,
  FiCheck,
} from "react-icons/fi";
import type {
  Supplier,
  SupplierCreateData,
  SupplierUpdateData,
} from "../../../types/supplier.types";
import toast from "react-hot-toast";

interface SupplierFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SupplierCreateData | SupplierUpdateData) => Promise<void>;
  supplier?: Supplier | null;
}

type FormErrors = {
  company_name?: string;
  supplier_code?: string;
  email?: string;
  phone?: string;
  website?: string;
  address_line1?: string;
  city?: string;
  country?: string;
  credit_limit?: string;
  [key: string]: string | undefined;
};

const sections = [
  { id: "basic", label: "Basic Information", icon: FiUser },
  { id: "address", label: "Address", icon: FiMapPin },
  { id: "tax", label: "Tax & Registration", icon: FiGlobe },
  { id: "payment", label: "Payment Terms", icon: FiCreditCard },
  { id: "banking", label: "Banking Details", icon: FiBookOpen },
  { id: "notes", label: "Additional Notes", icon: FiAlertCircle },
];

const SupplierFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  supplier,
}: SupplierFormModalProps) => {
  const isEditing = !!supplier;

  // ===== State =====
  const [activeSection, setActiveSection] = useState("basic");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // Basic Info
  const [companyName, setCompanyName] = useState("");
  const [tradeName, setTradeName] = useState("");
  const [supplierCode, setSupplierCode] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [mobile, setMobile] = useState("");
  const [fax, setFax] = useState("");
  const [website, setWebsite] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(true);
  const [isPreferred, setIsPreferred] = useState(false);

  // Address
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  // Tax & Registration
  const [taxNumber, setTaxNumber] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");

  // Payment Terms
  const [paymentTerms, setPaymentTerms] = useState("");
  const [currency, setCurrency] = useState("");
  const [creditLimit, setCreditLimit] = useState<number | null>(null);
  const [paymentDueDays, setPaymentDueDays] = useState<number | null>(null);

  // Banking Details
  const [bankName, setBankName] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankSortCode, setBankSortCode] = useState("");
  const [bankSwiftCode, setBankSwiftCode] = useState("");

  // Additional Notes
  const [notes, setNotes] = useState("");

  // Populate when editing
  useEffect(() => {
    if (supplier) {
      // Basic Info
      setCompanyName(supplier.company_name || "");
      setTradeName(supplier.trade_name || "");
      setSupplierCode(supplier.supplier_code || "");
      setContactPerson(supplier.contact_person || "");
      setEmail(supplier.email || "");
      setPhone(supplier.phone || "");
      setMobile(supplier.mobile || "");
      setFax(supplier.fax || "");
      setWebsite(supplier.website || "");
      setRating(supplier.rating);
      setIsActive(supplier.is_active);
      setIsPreferred(supplier.is_preferred);

      // Address
      setAddressLine1(supplier.address_line1 || "");
      setAddressLine2(supplier.address_line2 || "");
      setCity(supplier.city || "");
      setState(supplier.state || "");
      setPostalCode(supplier.postal_code || "");
      setCountry(supplier.country || "");

      // Tax & Registration
      setTaxNumber(supplier.tax_number || "");
      setRegistrationNumber(supplier.registration_number || "");

      // Payment Terms
      setPaymentTerms(supplier.payment_terms || "");
      setCurrency(supplier.currency || "");
      setCreditLimit(supplier.credit_limit);
      setPaymentDueDays(supplier.payment_due_days);

      // Banking Details
      setBankName(supplier.bank_name || "");
      setBankAccountName(supplier.bank_account_name || "");
      setBankAccountNumber(supplier.bank_account_number || "");
      setBankSortCode(supplier.bank_sort_code || "");
      setBankSwiftCode(supplier.bank_swift_code || "");

      // Notes
      setNotes(supplier.notes || "");
    } else {
      resetForm();
    }
    setErrors({});
    setActiveSection("basic");
  }, [supplier, isOpen]);

  const resetForm = () => {
    // Basic Info
    setCompanyName("");
    setTradeName("");
    setSupplierCode("");
    setContactPerson("");
    setEmail("");
    setPhone("");
    setMobile("");
    setFax("");
    setWebsite("");
    setRating(null);
    setIsActive(true);
    setIsPreferred(false);
    // Address
    setAddressLine1("");
    setAddressLine2("");
    setCity("");
    setState("");
    setPostalCode("");
    setCountry("");
    // Tax & Registration
    setTaxNumber("");
    setRegistrationNumber("");
    // Payment Terms
    setPaymentTerms("");
    setCurrency("");
    setCreditLimit(null);
    setPaymentDueDays(null);
    // Banking Details
    setBankName("");
    setBankAccountName("");
    setBankAccountNumber("");
    setBankSortCode("");
    setBankSwiftCode("");
    // Notes
    setNotes("");
  };

  // Validation
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!companyName.trim())
      newErrors.company_name = "Company name is required";
    if (supplierCode && supplierCode.length > 50)
      newErrors.supplier_code = "Code too long";
    if (email && !/^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(email))
      newErrors.email = "Invalid email";
    if (phone && !/^[\d\s+\-()]+$/.test(phone))
      newErrors.phone = "Invalid phone number";
    if (website && !/^https?:\/\/[^\s]+$/.test(website))
      newErrors.website = "Invalid URL";
    if (!addressLine1.trim()) newErrors.address_line1 = "Address is required";
    if (!city.trim()) newErrors.city = "City is required";
    if (!country.trim()) newErrors.country = "Country is required";
    if (creditLimit && creditLimit < 0)
      newErrors.credit_limit = "Credit limit cannot be negative";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const formData: SupplierCreateData | SupplierUpdateData = {
        company_name: companyName.trim(),
        trade_name: tradeName.trim() || null,
        supplier_code: supplierCode.trim() || null,
        contact_person: contactPerson.trim() || null,
        email: email.trim() || null,
        phone: phone.trim() || null,
        mobile: mobile.trim() || null,
        fax: fax.trim() || null,
        website: website.trim() || null,
        rating: rating,
        is_active: isActive,
        is_preferred: isPreferred,
        address_line1: addressLine1.trim() || null,
        address_line2: addressLine2.trim() || null,
        city: city.trim() || null,
        state: state.trim() || null,
        postal_code: postalCode.trim() || null,
        country: country.trim() || null,
        tax_number: taxNumber.trim() || null,
        registration_number: registrationNumber.trim() || null,
        payment_terms: paymentTerms.trim() || null,
        currency: currency.trim() || null,
        credit_limit: creditLimit,
        payment_due_days: paymentDueDays,
        bank_name: bankName.trim() || null,
        bank_account_name: bankAccountName.trim() || null,
        bank_account_number: bankAccountNumber.trim() || null,
        bank_sort_code: bankSortCode.trim() || null,
        bank_swift_code: bankSwiftCode.trim() || null,
        notes: notes.trim() || null,
      };

      await onSubmit(formData);
      toast.success(
        isEditing
          ? "Supplier updated successfully!"
          : "Supplier created successfully!",
      );
      onClose();
      resetForm();
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        `Failed to ${isEditing ? "update" : "create"} supplier`;
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        toast.error(message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const renderStars = () => (
    <div className="flex gap-1 items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          className={`text-xl ${star <= (rating || 0) ? "text-yellow-400" : "text-gray-300"} hover:scale-110 transition`}
        >
          ★
        </button>
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-5xl mx-4 max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {isEditing ? "Edit Supplier" : "New Supplier"}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {isEditing
                ? `Editing "${supplier?.company_name}"`
                : "Create a new supplier"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Two-column layout: vertical sidebar + content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left sidebar – vertical navigation */}
          <div className="w-56 bg-gray-50 border-r border-gray-100 p-4 space-y-1 overflow-y-auto">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-left transition-colors ${
                    activeSection === section.id
                      ? "bg-white shadow-sm text-emerald-600 font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={16} />
                  <span className="text-sm">{section.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right content – scrollable form */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
            {/* Basic Information Section */}
            {activeSection === "basic" && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => {
                      setCompanyName(e.target.value);
                      if (errors.company_name)
                        setErrors((p) => ({ ...p, company_name: undefined }));
                    }}
                    className={`w-full px-4 py-3 rounded-xl border text-sm ${
                      errors.company_name
                        ? "border-red-300 bg-red-50/50"
                        : "border-gray-200"
                    }`}
                  />
                  {errors.company_name && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.company_name}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Trade Name
                    </label>
                    <input
                      type="text"
                      value={tradeName}
                      onChange={(e) => setTradeName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Supplier Code
                    </label>
                    <input
                      type="text"
                      value={supplierCode}
                      onChange={(e) => setSupplierCode(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-sm ${
                        errors.supplier_code
                          ? "border-red-300 bg-red-50/50"
                          : "border-gray-200"
                      }`}
                    />
                    {errors.supplier_code && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.supplier_code}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.email}
                      </p>
                    )}
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
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Mobile
                    </label>
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Fax
                    </label>
                    <input
                      type="text"
                      value={fax}
                      onChange={(e) => setFax(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
                    />
                  </div>
                </div>

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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Rating (1-5)
                    </label>
                    {renderStars()}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Status
                    </label>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-1.5">
                        <input
                          type="checkbox"
                          checked={isActive}
                          onChange={(e) => setIsActive(e.target.checked)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">Active</span>
                      </label>
                      <label className="flex items-center gap-1.5">
                        <input
                          type="checkbox"
                          checked={isPreferred}
                          onChange={(e) => setIsPreferred(e.target.checked)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">Preferred</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Address Section */}
            {activeSection === "address" && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address Line 1 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={addressLine1}
                    onChange={(e) => {
                      setAddressLine1(e.target.value);
                      if (errors.address_line1)
                        setErrors((p) => ({ ...p, address_line1: undefined }));
                    }}
                    className={`w-full px-4 py-3 rounded-xl border text-sm ${
                      errors.address_line1
                        ? "border-red-300 bg-red-50/50"
                        : "border-gray-200"
                    }`}
                  />
                  {errors.address_line1 && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.address_line1}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    value={addressLine2}
                    onChange={(e) => setAddressLine2(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
                  />
                </div>
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
                    />
                    {errors.city && (
                      <p className="text-xs text-red-500 mt-1">{errors.city}</p>
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
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
                    />
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
                    />
                    {errors.country && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.country}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Tax & Registration Section */}
            {activeSection === "tax" && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tax Number (VAT)
                  </label>
                  <input
                    type="text"
                    value={taxNumber}
                    onChange={(e) => setTaxNumber(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Registration Number
                  </label>
                  <input
                    type="text"
                    value={registrationNumber}
                    onChange={(e) => setRegistrationNumber(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
                  />
                </div>
              </div>
            )}

            {/* Payment Terms Section */}
            {activeSection === "payment" && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Payment Terms
                  </label>
                  <input
                    type="text"
                    value={paymentTerms}
                    onChange={(e) => setPaymentTerms(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
                    placeholder="e.g. Net 30, COD"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Currency
                    </label>
                    <input
                      type="text"
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
                      placeholder="KES, USD, etc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Credit Limit
                    </label>
                    <input
                      type="number"
                      value={creditLimit ?? ""}
                      onChange={(e) =>
                        setCreditLimit(
                          e.target.value ? Number(e.target.value) : null,
                        )
                      }
                      step="0.01"
                      className={`w-full px-4 py-3 rounded-xl border text-sm ${
                        errors.credit_limit
                          ? "border-red-300 bg-red-50/50"
                          : "border-gray-200"
                      }`}
                    />
                    {errors.credit_limit && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.credit_limit}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Payment Due Days
                  </label>
                  <input
                    type="number"
                    value={paymentDueDays ?? ""}
                    onChange={(e) =>
                      setPaymentDueDays(
                        e.target.value ? Number(e.target.value) : null,
                      )
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
                    placeholder="30"
                  />
                </div>
              </div>
            )}

            {/* Banking Details Section */}
            {activeSection === "banking" && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Account Name
                  </label>
                  <input
                    type="text"
                    value={bankAccountName}
                    onChange={(e) => setBankAccountName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Account Number
                    </label>
                    <input
                      type="text"
                      value={bankAccountNumber}
                      onChange={(e) => setBankAccountNumber(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border text-sm ${
                        errors.bank_account_number
                          ? "border-red-300 bg-red-50/50"
                          : "border-gray-200"
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Sort Code
                    </label>
                    <input
                      type="text"
                      value={bankSortCode}
                      onChange={(e) => setBankSortCode(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    SWIFT/BIC Code
                  </label>
                  <input
                    type="text"
                    value={bankSwiftCode}
                    onChange={(e) => setBankSwiftCode(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
                  />
                </div>
              </div>
            )}

            {/* Additional Notes Section */}
            {activeSection === "notes" && (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Notes
                  </label>
                  <textarea
                    rows={6}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm"
                    placeholder="Any additional information about this supplier..."
                  />
                </div>
              </div>
            )}

            {/* Footer (inside form) */}
            <div className="flex justify-end gap-3 pt-6 mt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 text-sm font-semibold text-white bg-emerald-500 rounded-xl hover:bg-emerald-600 transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {isEditing ? "Updating..." : "Creating..."}
                  </>
                ) : isEditing ? (
                  "Update Supplier"
                ) : (
                  "Create Supplier"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SupplierFormModal;
