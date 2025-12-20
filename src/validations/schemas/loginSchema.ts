import { z } from "zod";

/**
 * Zod Schema للتحقق من صحة نموذج تسجيل الدخول
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "البريد الإلكتروني مطلوب")
    .email("الرجاء إدخال بريد إلكتروني صحيح"),

  password: z
    .string()
    .min(1, "كلمة المرور مطلوبة")
    .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
});

/**
 * نوع البيانات المُستخرج من الـ schema
 */
export type LoginFormData = z.infer<typeof loginSchema>;

