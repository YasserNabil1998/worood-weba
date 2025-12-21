import { z } from "zod";
import { saudiPhoneSchema } from "./saudiPhoneSchema";

/**
 * Zod Schema للتحقق من صحة نموذج التواصل
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "الاسم مطلوب")
    .min(2, "الاسم يجب أن يكون أكثر من حرفين")
    .max(50, "الاسم يجب أن يكون أقل من 50 حرف"),

  email: z
    .string()
    .trim()
    .min(1, "البريد الإلكتروني مطلوب")
    .email("البريد الإلكتروني غير صحيح")
    .transform((val) => val.toLowerCase()),

  phone: saudiPhoneSchema,

  subject: z
    .string()
    .trim()
    .min(1, "الموضوع مطلوب"),

  message: z
    .string()
    .trim()
    .min(1, "الرسالة مطلوبة")
    .min(10, "الرسالة يجب أن تكون أكثر من 10 أحرف")
    .max(1000, "الرسالة يجب أن تكون أقل من 1000 حرف"),
});

/**
 * نوع البيانات المُستخرج من الـ schema
 */
export type ContactFormData = z.infer<typeof contactSchema>;
