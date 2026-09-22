// components/discounts/DiscountFormModal.tsx

import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { FormProvider } from "react-hook-form";

// ─── Imports ────────────────────────────────────────────────────

import { useDiscountForm } from "../../../hooks/discounts/useDiscountForm";
import type { DiscountFormValues } from "../../../hooks/discounts/useDiscountForm";
import { inputClass } from "./DiscountFormFields";
import { FormSection } from "./DiscountFormSections";
import {
  BasicInfoSection,
  DiscountTypeSection,
  ScheduleSection,
  EligibilitySection,
  MinimumRequirementsSection,
  CustomerEligibilitySection,
  UsageLimitsSection,
  CombiningPrioritySection,
  StatusVisibilitySection,
  DisplayBannerSection,
  SpecialFlagsSection,
  ExtraSection,
} from "./DiscountFormSections";

// ─── Types ──────────────────────────────────────────────────────

interface DiscountFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  productIds: number[];
  onSuccess?: () => void;
}

// ─── Lookup Data ────────────────────────────────────────────────

// In a real app, these would come from API hooks
// For now, we keep them as props or fetch them inside
const productOptions = [
  { id: "1", label: "Aero Runner 3" },
  { id: "2", label: "Court Glide Pro" },
  { id: "3", label: "Trail Apex" },
];

const categoryOptions = [
  { id: "1", label: "Sneakers" },
  { id: "2", label: "Sports" },
  { id: "3", label: "Casual" },
];

const customerGroupOptions = [
  { id: "vip", label: "VIP" },
  { id: "wholesale", label: "Wholesale" },
  { id: "staff", label: "Staff" },
];

const customerOptions = [
  { id: "101", label: "Amina Yusuf — amina@example.com" },
  { id: "102", label: "Brian Otieno — brian@example.com" },
];

// ─── Main Component ─────────────────────────────────────────────

export const DiscountFormModal: React.FC<DiscountFormModalProps> = ({
  isOpen,
  onClose,
  productIds,
  onSuccess,
}) => {
  // ─── Form Logic ──────────────────────────────────────────────

  const { form, onSubmit, isSubmitting } = useDiscountForm({
    initialValues: {
      applies_to: "specific_products",
      eligible_product_ids: productIds.map(String),
    },
    onSuccess: () => {
      onSuccess?.();
      onClose();
    },
  });

  const {
    watch,
    setValue,
    register,
    formState: { errors },
  } = form;

  // ─── Section Props ────────────────────────────────────────────

  const sectionProps = {
    form,
    register,
    watch: (field: keyof DiscountFormValues) => watch(field),
    setValue,
    productOptions,
    categoryOptions,
    customerGroupOptions,
    customerOptions,
  };

  // ─── Render ────────────────────────────────────────────────────

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#14151A]/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-[#F5F3EE] rounded-2xl shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E4E0D8] bg-white/50 backdrop-blur-sm shrink-0">
          <div>
            <h2 className="text-xl font-bold text-[#14151A]">
              Apply Discount to {productIds.length}{" "}
              {productIds.length === 1 ? "Product" : "Products"}
            </h2>
            <p className="text-sm text-[#8B8681] mt-0.5">
              This discount will automatically apply to the selected products.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-[#F5F3EE] hover:bg-[#E4E0D8] flex items-center justify-center text-[#8B8681] hover:text-[#14151A] transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <FormProvider {...form}>
          <form
            onSubmit={onSubmit}
            className="flex-1 overflow-y-auto p-6 space-y-6 pb-4"
          >
            <FormSection index={1} title="Basic Information">
              <BasicInfoSection {...sectionProps} />
            </FormSection>

            <FormSection index={2} title="Discount Type & Value">
              <DiscountTypeSection {...sectionProps} />
            </FormSection>

            <FormSection index={3} title="Schedule & Availability">
              <ScheduleSection {...sectionProps} />
            </FormSection>

            <FormSection
              index={4}
              title="Eligibility"
              description="Which products this discount applies to."
            >
              <EligibilitySection {...sectionProps} />
            </FormSection>

            <FormSection
              index={5}
              title="Minimum Requirements"
              description="Cart/order-level qualifying conditions."
            >
              <MinimumRequirementsSection {...sectionProps} />
            </FormSection>

            <FormSection index={6} title="Customer Eligibility">
              <CustomerEligibilitySection {...sectionProps} />
            </FormSection>

            <FormSection index={7} title="Usage Limits">
              <UsageLimitsSection {...sectionProps} />
            </FormSection>

            <FormSection index={8} title="Combining & Priority">
              <CombiningPrioritySection {...sectionProps} />
            </FormSection>

            <FormSection index={9} title="Status & Visibility">
              <StatusVisibilitySection {...sectionProps} />
            </FormSection>

            <FormSection index={10} title="Display & Banner">
              <DisplayBannerSection {...sectionProps} />
            </FormSection>

            <FormSection index={11} title="Special Flags">
              <SpecialFlagsSection {...sectionProps} />
            </FormSection>

            <FormSection
              index={12}
              title="Extra"
              description="Meta & internal notes."
            >
              <ExtraSection {...sectionProps} />
            </FormSection>
          </form>
        </FormProvider>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#E4E0D8] bg-white/50 backdrop-blur-sm shrink-0">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-full border border-[#E4E0D8] px-5 py-2.5 text-sm font-medium text-[#14151A] hover:bg-white transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <motion.button
            type="submit"
            onClick={onSubmit}
            disabled={isSubmitting}
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-full bg-[#CFFF04] px-6 py-2.5 text-sm font-semibold text-[#14151A] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating..." : "Apply Discount"}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default DiscountFormModal;
