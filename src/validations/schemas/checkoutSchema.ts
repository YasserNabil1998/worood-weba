import { z } from "zod";
import { saudiPhoneSchema } from "./saudiPhoneSchema";

/**
 * Zod Schema للتحقق من صحة نموذج الدفع
 */
export const addressSchema = z.object({
  recipientName: z
    .string()
    .min(1, "هذا الحقل مطلوب")
    .min(2, "يجب أن يكون النص 2 أحرف على الأقل")
    .trim(),

  street: z
    .string()
    .min(1, "هذا الحقل مطلوب")
    .min(5, "يجب أن يكون النص 5 أحرف على الأقل")
    .trim(),

  phone: saudiPhoneSchema,

  // الحقول الاختيارية - إذا كانت موجودة يجب أن تكون على الأقل حرفين
  city: z
    .string()
    .refine(
      (val) => {
        if (!val || val.trim().length === 0) return true;
        return val.trim().length >= 2;
      },
      {
        message: "يجب أن يكون النص 2 أحرف على الأقل",
      }
    )
    .optional(),

  district: z
    .string()
    .refine(
      (val) => {
        if (!val || val.trim().length === 0) return true;
        return val.trim().length >= 2;
      },
      {
        message: "يجب أن يكون النص 2 أحرف على الأقل",
      }
    )
    .optional(),

  landmark: z
    .string()
    .refine(
      (val) => {
        if (!val || val.trim().length === 0) return true;
        return val.trim().length >= 2;
      },
      {
        message: "يجب أن يكون النص 2 أحرف على الأقل",
      }
    )
    .optional(),
});

export const checkoutSchema = z.object({
  // بيانات العنوان
  address: addressSchema,

  // ملاحظات إضافية
  notes: z.string().max(500, "يجب أن تكون الملاحظات 500 حرف على الأكثر").optional(),
});

/**
 * نوع البيانات المُستخرج من الـ schema
 */
export type CheckoutFormData = z.infer<typeof checkoutSchema>;
