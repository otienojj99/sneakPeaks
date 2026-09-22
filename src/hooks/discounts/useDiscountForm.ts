import { useForm } from "react-hook-form";
import type { Resolver } from "react-hook-form";
import { z } from "zod";
import { useDiscounts } from "./useDiscounts";
import toast from "react-hot-toast";
import {productService  } from '../../api/services/productService';


export const  discountFormSchema = z.object({
     // Basic Info
  name: z.string().min(2, "Name must be at least 2 characters").max(255),
  code: z.string().max(50).optional().nullable(),
  description: z.string().optional().nullable(),

  // Type & Value
  type: z.enum(["percentage", "fixed_amount", "fixed_price", "buy_x_get_y", "free_shipping"]),
  value: z.number().min(0).optional().nullable(),
  maximum_discount_amount: z.number().min(0).optional().nullable(),

  // BOGO
  buy_quantity: z.number().min(1).optional().nullable(),
  get_quantity: z.number().min(1).optional().nullable(),
  free_product_id: z.string().optional().nullable(),

  // Schedule
  starts_at: z.string().min(1, "Start date is required"),
  ends_at: z.string().optional().nullable(),
  valid_days_of_week: z.array(z.number()).optional().default([]),
  valid_from_time: z.string().optional().nullable(),
  valid_to_time: z.string().optional().nullable(),
  free_product_type: z.enum(['same', 'existing', 'custom']).default('same'),
  custom_free_product_name: z.string().optional().nullable(),
  custom_free_product_price: z.number().min(0).optional().nullable(),
  custom_free_product_image: z.string().optional().nullable(),

  // Eligibility
  applies_to: z.enum(["all_products", "specific_products", "specific_categories"]),
  eligible_product_ids: z.array(z.string()).optional().default([]),
  eligible_category_ids: z.array(z.string()).optional().default([]),
  excluded_product_ids: z.array(z.string()).optional().default([]),
  excluded_category_ids: z.array(z.string()).optional().default([]),

  // Minimum Requirements
  minimum_order_amount: z.number().min(0).optional().nullable(),
  minimum_quantity: z.number().min(0).optional().nullable(),
  maximum_quantity: z.number().min(0).optional().nullable(),

  // Customer Eligibility
  customer_eligibility: z.enum(["all", "groups", "specific"]),
  eligible_customer_groups: z.array(z.string()).optional().default([]),
  eligible_customer_ids: z.array(z.string()).optional().default([]),

  // Usage Limits
  usage_limit_per_coupon: z.number().min(0).optional().nullable(),
  usage_limit_per_customer: z.number().min(0).optional().nullable(),

  // Combining & Priority
  can_combine_with_other_discounts: z.boolean().optional().default(false),
  priority: z.number().optional().default(0),

  // Status & Visibility
  is_active: z.boolean().optional().default(true),
  is_public: z.boolean().optional().default(true),
  status: z.enum(["draft", "active", "paused", "expired"]).optional().default("draft"),

  // Display & Banner
  display_text: z.string().optional().nullable(),
  banner_image: z.string().optional().nullable(),
  show_on_product_page: z.boolean().optional().default(false),
  show_on_cart_page: z.boolean().optional().default(false),
  show_on_checkout: z.boolean().optional().default(false),

  // Special Flags
  first_purchase_only: z.boolean().optional().default(false),
  new_registration_only: z.boolean().optional().default(false),
  new_registration_days: z.number().min(1).optional().nullable(),

  // Extra
  metadata: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
});

export type DiscountFormValues = z.infer<typeof discountFormSchema>;

const discountResolver: Resolver<DiscountFormValues> = async (values) => {
  const result = discountFormSchema.safeParse(values);

  if (result.success) {
    return { values: result.data, errors: {} };
  }

  const errors = result.error.issues.reduce<Record<string, { type: string; message: string }>>(
    (accumulator, issue) => {
      const field = issue.path.join(".");
      if (!accumulator[field]) {
        accumulator[field] = {
          type: issue.code,
          message: issue.message,
        };
      }
      return accumulator;
    },
    {},
  );

  return { values: {}, errors };
};

export const defaultDiscountValues: DiscountFormValues = {
  name: "",
  code: "",
  description: "",
  type: "percentage",
  value: null,
  maximum_discount_amount: null,
  buy_quantity: null,
  get_quantity: null,
  free_product_id: null,
  free_product_type: "same",
  custom_free_product_name: null,
  custom_free_product_price: null,
  custom_free_product_image: null,

  starts_at: "",
  ends_at: null,
  valid_days_of_week: [],
  valid_from_time: "",
  valid_to_time: "",
  applies_to: "all_products",
  eligible_product_ids: [],
  eligible_category_ids: [],
  excluded_product_ids: [],
  excluded_category_ids: [],
  minimum_order_amount: null,
  minimum_quantity: null,
  maximum_quantity: null,
  customer_eligibility: "all",
  eligible_customer_groups: [],
  eligible_customer_ids: [],
  usage_limit_per_coupon: null,
  usage_limit_per_customer: null,
  can_combine_with_other_discounts: false,
  priority: 0,
  is_active: true,
  is_public: true,
  status: "draft",
  display_text: "",
  banner_image: null,
  show_on_product_page: false,
  show_on_cart_page: false,
  show_on_checkout: false,
  first_purchase_only: false,
  new_registration_only: false,
  new_registration_days: null,
  metadata: "",
  notes: "",
};

interface UseDiscountFormProps {
  initialValues?: Partial<DiscountFormValues>;
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useDiscountForm = ({initialValues, onSuccess, onError}: UseDiscountFormProps = {}) =>{

    const { createDiscount } = useDiscounts();
    const form = useForm<DiscountFormValues>({
      resolver: discountResolver,
        defaultValues: {
              ...defaultDiscountValues,
             ...initialValues,
        }
    });

    const { handleSubmit, reset, formState: { isSubmitting } } = form;

     const onSubmit = handleSubmit(async (data) => {
      try {
        let freeProductId = null;

        if (data.free_product_type === "existing"){
          freeProductId = data.free_product_id ? Number(data.free_product_id) : null;
        }else if (data.free_product_type === 'custom'){
          const newProduct = await productService.create({
            name: data.custom_free_product_name || "Custom Free Product",
            selling_price: data.custom_free_product_price || 0,
            image_gallery: data.custom_free_product_image || null,
          })
           freeProductId = newProduct.data.id;
        }else {
      // 'same' – no free product ID
      freeProductId = null;
       }

        const payload: any = {
        ...data,
        eligible_product_ids: data.eligible_product_ids?.map(Number) || [],
        eligible_category_ids: data.eligible_category_ids?.map(Number) || [],
        excluded_product_ids: data.excluded_product_ids?.map(Number) || [],
        excluded_category_ids: data.excluded_category_ids?.map(Number) || [],
        eligible_customer_ids: data.eligible_customer_ids?.map(Number) || [],
        free_product_id: data.free_product_id ? Number(data.free_product_id) : null,
      };

       const result = await createDiscount(payload);
        if(result) {
          toast.success("Discount created successfully");
          reset(defaultDiscountValues);
          onSuccess?.();
        }

      } catch (error) {
        toast.error("Failed to create discount");
        onError?.(error);

      }
        
     
     });

     return {
        form,
        onSubmit,
        reset,
        isSubmitting,

     }
}


