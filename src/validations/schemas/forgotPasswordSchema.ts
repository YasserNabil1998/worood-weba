import { z } from "zod";
import { VALIDATION_MESSAGES } from "@/constants";

/**
 * Zod Schema للتحقق من صحة نموذج نسيان كلمة المرور
 */
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, VALIDATION_MESSAGES.REQUIRED_FIELD)
    .email(VALIDATION_MESSAGES.INVALID_EMAIL),
});

/**
 * نوع البيانات المُستخرج من الـ schema
 */
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
