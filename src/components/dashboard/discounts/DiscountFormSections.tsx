// components/discounts/DiscountFormSections.tsx

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Field,
  ToggleSwitch,
  MultiSelectField,
  inputClass,
  selectClass,
} from "./DiscountFormFields";
import type { UseFormReturn } from "react-hook-form";
import type { DiscountFormValues } from "../../../hooks/discounts/useDiscountForm";
import { useProducts } from "../../../hooks/products/useProducts";

// ─── Types ──────────────────────────────────────────────────────

export interface SectionProps {
  form: UseFormReturn<DiscountFormValues>;
  register: UseFormReturn<DiscountFormValues>["register"];
  watch: (field: keyof DiscountFormValues) => any;
  setValue: (field: keyof DiscountFormValues, value: any) => void;
  productOptions: { id: string; label: string }[];
  categoryOptions: { id: string; label: string }[];
  customerGroupOptions: { id: string; label: string }[];
  customerOptions: { id: string; label: string }[];
}

// ─── Form Section Wrapper ──────────────────────────────────────

interface FormSectionProps {
  index: number;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const FormSection: React.FC<FormSectionProps> = ({
  index,
  title,
  description,
  children,
}) => {
  return (
    <section className="rounded-2xl border border-[#E4E0D8] bg-white p-6 sm:p-7">
      <div className="flex items-start gap-3 mb-6">
        <span className="shrink-0 w-7 h-7 rounded-full bg-[#14151A] text-[#F5F3EE] text-xs font-semibold flex items-center justify-center mt-0.5">
          {index}
        </span>
        <div>
          <h2 className="text-base font-semibold text-[#14151A]">{title}</h2>
          {description && (
            <p className="text-sm text-[#8B8681] mt-0.5">{description}</p>
          )}
        </div>
      </div>
      <div className="pl-10">{children}</div>
    </section>
  );
};

// ─── Section Components ────────────────────────────────────────

export const BasicInfoSection: React.FC<SectionProps> = ({ form }) => {
  const {
    register,
    formState: { errors },
  } = form;
  return (
    <div className="flex flex-col gap-5">
      <Field label="Discount title" required>
        <input
          {...register("name")}
          placeholder='e.g. "Summer Sale 20%"'
          className={inputClass}
        />
      </Field>
      <Field
        label="Promo code"
        hint="If set, customers must enter this code to redeem the discount."
      >
        <input
          {...register("code")}
          placeholder="e.g. SUMMER20"
          className={inputClass + " font-mono tracking-wide"}
        />
      </Field>
      <Field label="Description" hint="Internal description or public note.">
        <textarea
          {...register("description")}
          rows={3}
          className={inputClass + " resize-none"}
        />
      </Field>
    </div>
  );
};

export const DiscountTypeSection: React.FC<SectionProps> = ({
  watch,
  setValue,
  register,
}) => {
  const type = watch("type");
  const isValueType =
    type === "percentage" || type === "fixed_amount" || type === "fixed_price";
  const isBogo = type === "buy_x_get_y";
  const freeProductType = watch("free_product_type") || "same";

  const { products, loading } = useProducts({
    per_page: 100,
    sort_by: "name",
    sort_dir: "asc",
  });

  const productOptions = products.map((product) => ({
    id: String(product.id),
    label: `${product.name} (${product.sku})`,
  }));

  console.log("productOptions", productOptions);

  const productsLoading = loading;

  return (
    <div className="flex flex-col gap-5">
      <Field label="Type" required>
        <select
          {...register("type")}
          className={selectClass}
          onChange={(e) => setValue("type", e.target.value as any)}
        >
          <option value="percentage">Percentage</option>
          <option value="fixed_amount">Fixed amount</option>
          <option value="fixed_price">Fixed price</option>
          <option value="buy_x_get_y">Buy X, Get Y (BOGO)</option>
          <option value="free_shipping">Free shipping</option>
        </select>
      </Field>

      <AnimatePresence initial={false}>
        {isValueType && (
          <motion.div
            key="value"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden flex flex-col gap-5"
          >
            <Field
              label="Value"
              required
              hint={
                type === "percentage" ? "e.g. 20 for 20% off" : "Amount in KES"
              }
            >
              <input
                type="number"
                min={0}
                step={type === "percentage" ? 1 : 0.01}
                {...register("value", { valueAsNumber: true })}
                className={inputClass}
              />
            </Field>
            {type === "percentage" && (
              <Field
                label="Maximum discount amount"
                hint="Cap the discount (e.g. max KES 500). Leave blank for no cap."
              >
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  {...register("maximum_discount_amount", {
                    valueAsNumber: true,
                  })}
                  className={inputClass}
                />
              </Field>
            )}
          </motion.div>
        )}

        {isBogo && (
          <motion.div
            key="bogo"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden flex flex-col gap-5"
          >
            <div className="grid grid-cols-2 gap-4">
              <Field label="Buy quantity" required hint="e.g. 2">
                <input
                  type="number"
                  min={1}
                  {...register("buy_quantity", { valueAsNumber: true })}
                  className={inputClass}
                />
              </Field>
              <Field
                label="Get quantity"
                required
                hint="e.g. 1 (buy 2, get 1 free)"
              >
                <input
                  type="number"
                  min={1}
                  {...register("get_quantity", { valueAsNumber: true })}
                  className={inputClass}
                />
              </Field>
            </div>
            <Field
              label="Free product"
              hint="Optional — set this if the free item is different from the purchased item."
            >
              <select
                {...register("free_product_type")}
                className={selectClass}
              >
                {/* <option value="">Same as purchased product</option> */}
                <option value="same">Same as purchased product</option>
                <option value="existing">Different product in store</option>
                <option value="custom">Different product not in store</option>
                {/* Options will be populated from props */}
              </select>
            </Field>
            <AnimatePresence initial={false} mode="wait">
              {freeProductType === "existing" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <Field label="Select free product" required>
                    <MultiSelectField
                      options={productOptions}
                      selected={
                        watch("free_product_id")
                          ? [String(watch("free_product_id"))]
                          : []
                      }
                      onChange={(ids) =>
                        setValue("free_product_id", ids[0] || null)
                      }
                      placeholder={
                        productsLoading
                          ? "Loading products..."
                          : "Search products…"
                      }
                    />
                  </Field>
                </motion.div>
              )}

              {freeProductType === "custom" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden space-y-4"
                >
                  <div className="space-y-4">
                    <Field label="Custom product name" required>
                      <input
                        {...register("custom_free_product_name")}
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Custom product price" required hint="KES">
                      <input
                        type="number"
                        step="0.01"
                        {...register("custom_free_product_price", {
                          valueAsNumber: true,
                        })}
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Custom product image">
                      <input
                        {...register("custom_free_product_image")}
                        className={inputClass}
                        placeholder="Image URL"
                      />
                    </Field>
                    <p className="text-xs text-[#8B8681]">
                      This product will be created when the discount is saved.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const ScheduleSection: React.FC<SectionProps> = ({
  watch,
  setValue,
  register,
}) => {
  const weekdays = [
    { value: 1, label: "Mon" },
    { value: 2, label: "Tue" },
    { value: 3, label: "Wed" },
    { value: 4, label: "Thu" },
    { value: 5, label: "Fri" },
    { value: 6, label: "Sat" },
    { value: 0, label: "Sun" },
  ];

  const validDays = watch("valid_days_of_week") || [];

  const toggleWeekday = (day: number) => {
    const current = validDays;
    const next = current.includes(day)
      ? current.filter((d: number) => d !== day)
      : [...current, day];
    setValue("valid_days_of_week", next);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Starts at" required>
          <input
            type="datetime-local"
            {...register("starts_at")}
            className={inputClass}
          />
        </Field>
        <Field label="Ends at" hint="Leave blank for no end date.">
          <input
            type="datetime-local"
            {...register("ends_at")}
            className={inputClass}
          />
        </Field>
      </div>

      <Field
        label="Valid days of week"
        hint="Leave all unselected to apply every day."
      >
        <div className="flex flex-wrap gap-2">
          {weekdays.map((d) => {
            const active = validDays.includes(d.value);
            return (
              <button
                key={d.value}
                type="button"
                onClick={() => toggleWeekday(d.value)}
                className="w-12 h-9 rounded-lg text-xs font-medium border transition-colors"
                style={{
                  borderColor: active ? "#14151A" : "#E4E0D8",
                  background: active ? "#14151A" : "transparent",
                  color: active ? "#F5F3EE" : "#14151A",
                }}
              >
                {d.label}
              </button>
            );
          })}
        </div>
      </Field>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Valid from time" hint="e.g. 08:00">
          <input
            type="time"
            {...register("valid_from_time")}
            className={inputClass}
          />
        </Field>
        <Field label="Valid to time" hint="e.g. 20:00">
          <input
            type="time"
            {...register("valid_to_time")}
            className={inputClass}
          />
        </Field>
      </div>
    </div>
  );
};

export const EligibilitySection: React.FC<SectionProps> = ({
  watch,
  setValue,
  register,
  productOptions,
  categoryOptions,
}) => {
  const appliesTo = watch("applies_to");

  return (
    <div className="flex flex-col gap-5">
      <Field label="Applies to" required>
        <select
          {...register("applies_to")}
          className={selectClass}
          onChange={(e) => setValue("applies_to", e.target.value as any)}
        >
          <option value="all_products">All products</option>
          <option value="specific_products">Specific products</option>
          <option value="specific_categories">Specific categories</option>
        </select>
      </Field>

      <AnimatePresence initial={false} mode="wait">
        {appliesTo === "specific_products" && (
          <motion.div
            key="sp"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <Field label="Eligible products" required>
              <MultiSelectField
                options={productOptions}
                selected={watch("eligible_product_ids") || []}
                onChange={(ids) => setValue("eligible_product_ids", ids)}
                placeholder="Search products…"
              />
            </Field>
          </motion.div>
        )}
        {appliesTo === "specific_categories" && (
          <motion.div
            key="sc"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <Field label="Eligible categories" required>
              <MultiSelectField
                options={categoryOptions}
                selected={watch("eligible_category_ids") || []}
                onChange={(ids) => setValue("eligible_category_ids", ids)}
                placeholder="Search categories…"
              />
            </Field>
          </motion.div>
        )}
      </AnimatePresence>

      <Field
        label="Excluded products"
        hint="These products will never receive this discount."
      >
        <MultiSelectField
          options={productOptions}
          selected={watch("excluded_product_ids") || []}
          onChange={(ids) => setValue("excluded_product_ids", ids)}
          placeholder="Search products to exclude…"
        />
      </Field>

      <Field label="Excluded categories">
        <MultiSelectField
          options={categoryOptions}
          selected={watch("excluded_category_ids") || []}
          onChange={(ids) => setValue("excluded_category_ids", ids)}
          placeholder="Search categories to exclude…"
        />
      </Field>
    </div>
  );
};

export const MinimumRequirementsSection: React.FC<SectionProps> = ({
  register,
}) => {
  return (
    <div className="grid sm:grid-cols-3 gap-4">
      <Field label="Minimum order amount" hint="KES">
        <input
          type="number"
          min={0}
          step={0.01}
          {...register("minimum_order_amount", { valueAsNumber: true })}
          className={inputClass}
        />
      </Field>
      <Field label="Minimum quantity" hint="Of a single product">
        <input
          type="number"
          min={0}
          {...register("minimum_quantity", { valueAsNumber: true })}
          className={inputClass}
        />
      </Field>
      <Field label="Maximum quantity" hint="That will be discounted">
        <input
          type="number"
          min={0}
          {...register("maximum_quantity", { valueAsNumber: true })}
          className={inputClass}
        />
      </Field>
    </div>
  );
};

export const CustomerEligibilitySection: React.FC<SectionProps> = ({
  watch,
  setValue,
  register,
  customerGroupOptions,
  customerOptions,
}) => {
  const eligibility = watch("customer_eligibility");

  return (
    <div className="flex flex-col gap-5">
      <Field label="Eligibility">
        <select
          {...register("customer_eligibility")}
          className={selectClass}
          onChange={(e) =>
            setValue("customer_eligibility", e.target.value as any)
          }
        >
          <option value="all">All customers</option>
          <option value="groups">Specific customer groups</option>
          <option value="specific">Specific customers</option>
        </select>
      </Field>

      <AnimatePresence initial={false} mode="wait">
        {eligibility === "groups" && (
          <motion.div
            key="g"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <Field label="Eligible customer groups">
              <MultiSelectField
                options={customerGroupOptions}
                selected={watch("eligible_customer_groups") || []}
                onChange={(ids) => setValue("eligible_customer_groups", ids)}
                placeholder="Search groups…"
              />
            </Field>
          </motion.div>
        )}
        {eligibility === "specific" && (
          <motion.div
            key="s"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <Field label="Eligible customers">
              <MultiSelectField
                options={customerOptions}
                selected={watch("eligible_customer_ids") || []}
                onChange={(ids) => setValue("eligible_customer_ids", ids)}
                placeholder="Search customers…"
              />
            </Field>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const UsageLimitsSection: React.FC<SectionProps> = ({ register }) => {
  return (
    <div className="grid sm:grid-cols-3 gap-4">
      <Field label="Limit per coupon" hint="Total uses allowed, overall">
        <input
          type="number"
          min={0}
          {...register("usage_limit_per_coupon", { valueAsNumber: true })}
          className={inputClass}
        />
      </Field>
      <Field label="Limit per customer">
        <input
          type="number"
          min={0}
          {...register("usage_limit_per_customer", { valueAsNumber: true })}
          className={inputClass}
        />
      </Field>
      <Field label="Total used" hint="Auto-incremented">
        <input value={0} disabled className={inputClass} />
      </Field>
    </div>
  );
};

export const CombiningPrioritySection: React.FC<SectionProps> = ({
  watch,
  setValue,
  register,
}) => {
  return (
    <div className="flex flex-col gap-5">
      <ToggleSwitch
        label="Can combine with other discounts"
        description="If off, this discount won't stack with any other active discount."
        checked={watch("can_combine_with_other_discounts") || false}
        onChange={(v) => setValue("can_combine_with_other_discounts", v)}
      />
      <Field
        label="Priority"
        hint="Higher priority wins if multiple discounts apply. Default 0."
      >
        <input
          type="number"
          {...register("priority", { valueAsNumber: true })}
          className={inputClass + " max-w-[140px]"}
        />
      </Field>
    </div>
  );
};

export const StatusVisibilitySection: React.FC<SectionProps> = ({
  watch,
  setValue,
  register,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <ToggleSwitch
        label="Active"
        description="Master on/off switch for this discount."
        checked={watch("is_active") || false}
        onChange={(v) => setValue("is_active", v)}
      />
      <ToggleSwitch
        label="Public"
        description="Show in public listings, e.g. promotional banners."
        checked={watch("is_public") || false}
        onChange={(v) => setValue("is_public", v)}
      />
      <Field
        label="Status"
        hint="Can also be set automatically based on dates and usage."
      >
        <select
          {...register("status")}
          className={selectClass + " max-w-[220px]"}
        >
          <option value="draft">Draft</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="expired">Expired</option>
        </select>
      </Field>
    </div>
  );
};

export const DisplayBannerSection: React.FC<SectionProps> = ({
  watch,
  setValue,
  register,
}) => {
  return (
    <div className="flex flex-col gap-5">
      <Field
        label="Display text"
        hint='Short text shown on product/cart, e.g. "20% OFF"'
      >
        <input {...register("display_text")} className={inputClass} />
      </Field>
      <Field label="Banner image">
        <div className="w-full max-w-xs">
          {/* Banner upload will be integrated separately */}
          <div className="flex items-center gap-2 w-full rounded-lg border border-dashed border-[#E4E0D8] px-4 py-6 text-sm text-[#8B8681] cursor-pointer hover:border-[#14151A] transition-colors justify-center">
            <span>Upload image</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const url = URL.createObjectURL(file);
                  setValue("banner_image", url);
                }
              }}
            />
          </div>
        </div>
      </Field>
      <div className="flex flex-col gap-4">
        <ToggleSwitch
          label="Show on product page"
          checked={watch("show_on_product_page") || false}
          onChange={(v) => setValue("show_on_product_page", v)}
        />
        <ToggleSwitch
          label="Show on cart page"
          checked={watch("show_on_cart_page") || false}
          onChange={(v) => setValue("show_on_cart_page", v)}
        />
        <ToggleSwitch
          label="Show on checkout"
          checked={watch("show_on_checkout") || false}
          onChange={(v) => setValue("show_on_checkout", v)}
        />
      </div>
    </div>
  );
};

export const SpecialFlagsSection: React.FC<SectionProps> = ({
  watch,
  setValue,
  register,
}) => {
  const newRegistrationOnly = watch("new_registration_only") || false;

  return (
    <div className="flex flex-col gap-5">
      <ToggleSwitch
        label="First purchase only"
        description="Only applies to a customer's first order."
        checked={watch("first_purchase_only") || false}
        onChange={(v) => setValue("first_purchase_only", v)}
      />
      <ToggleSwitch
        label="New registration only"
        description="Only for customers registered within a set number of days."
        checked={newRegistrationOnly}
        onChange={(v) => setValue("new_registration_only", v)}
      />
      <AnimatePresence initial={false}>
        {newRegistrationOnly && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <Field label="Within how many days of registration">
              <input
                type="number"
                min={1}
                {...register("new_registration_days", { valueAsNumber: true })}
                className={inputClass + " max-w-[140px]"}
              />
            </Field>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const ExtraSection: React.FC<SectionProps> = ({ register }) => {
  return (
    <div className="flex flex-col gap-5">
      <Field
        label="Metadata"
        hint="Any extra data, as JSON, e.g. custom attributes."
      >
        <textarea
          {...register("metadata")}
          rows={4}
          placeholder='{ "campaign": "summer-2026" }'
          className={inputClass + " font-mono text-xs resize-none"}
        />
      </Field>
      <Field label="Notes" hint="Internal notes — not shown to customers.">
        <textarea
          {...register("notes")}
          rows={3}
          className={inputClass + " resize-none"}
        />
      </Field>
    </div>
  );
};
