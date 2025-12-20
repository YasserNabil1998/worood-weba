import { z } from "zod";

/**
 * Zod Schema للتحقق من صحة نموذج التسجيل
 */
export const signupSchema = z.object({
  fullName: z
    .string()
    .min(1, "الاسم مطلوب")
    .min(2, "يجب أن يكون الاسم حرفين على الأقل")
    .max(100, "يجب أن يكون الاسم 100 حرف على الأكثر"),

  phone: z
    .string()
    .min(1, "رقم الهاتف مطلوب")
    .regex(/^\+?\d{8,15}$/, "رقم الهاتف غير صالح"),

  email: z.string().min(1, "البريد الإلكتروني مطلوب").email("بريد غير صالح"),

  address: z.string().min(1, "العنوان مطلوب").min(5, "يجب أن يكون العنوان 5 أحرف على الأقل"),

  password: z.string().min(1, "كلمة المرور مطلوبة").min(6, "كلمة المرور 6 أحرف على الأقل"),

  gender: z.enum(["ذكر", "أنثى"], {
    message: "يجب اختيار الجنس",
  }),

  agree: z.boolean().refine((val) => val === true, {
    message: "يجب الموافقة على الشروط",
  }),
});

/**
 * نوع البيانات المُستخرج من الـ schema
 */
export type SignupFormData = z.infer<typeof signupSchema>;
