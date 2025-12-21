import { z } from "zod";

/**
 * Zod Schema للتحقق من صحة نموذج الاشتراك في النشرة البريدية
 */
export const newsletterSchema = z.object({
  email: z.string().min(1, "البريد الإلكتروني مطلوب").email("البريد الإلكتروني غير صحيح"),
});

/**
 * نوع البيانات المُستخرج من الـ schema
 */
export type NewsletterFormData = z.infer<typeof newsletterSchema>;

