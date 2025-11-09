import { z } from "zod";

/**
 * Zod Schema للتحقق من صحة نموذج الدفع
 */
export const checkoutSchema = z.object({
  // بيانات العنوان
  address: z.object({
    city: z
      .string()
      .min(1, "المدينة مطلوبة")
      .min(2, "يجب أن يكون اسم المدينة حرفين على الأقل")
      .max(50, "يجب أن يكون اسم المدينة 50 حرف على الأكثر"),

    district: z
      .string()
      .min(1, "الحي مطلوب")
      .min(2, "يجب أن يكون اسم الحي حرفين على الأقل")
      .max(50, "يجب أن يكون اسم الحي 50 حرف على الأكثر"),

    street: z
      .string()
      .min(1, "الشارع مطلوب")
      .min(5, "يجب أن يكون اسم الشارع 5 أحرف على الأقل")
      .max(100, "يجب أن يكون اسم الشارع 100 حرف على الأكثر"),

    phone: z
      .string()
      .min(1, "رقم الهاتف مطلوب")
      .regex(/^(05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/, "رقم الهاتف غير صحيح"),

    landmark: z.string().optional(),
  }),

  // ملاحظات إضافية
  notes: z.string().max(500, "يجب أن تكون الملاحظات 500 حرف على الأكثر").optional(),
});

/**
 * نوع البيانات المُستخرج من الـ schema
 */
export type CheckoutFormData = z.infer<typeof checkoutSchema>;
