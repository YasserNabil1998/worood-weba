import { z } from "zod";

/**
 * Zod schema للتحقق من رقم الهاتف
 */
export const phoneVerificationSchema = z.object({
  phone: z
    .string()
    .min(10, "رقم الهاتف يجب أن يكون 10 أرقام على الأقل")
    .max(15, "رقم الهاتف طويل جداً")
    .regex(/^\+?[0-9]+$/, "رقم الهاتف يجب أن يحتوي على أرقام فقط"),
});

/**
 * Zod schema لرمز التحقق
 */
export const verificationCodeSchema = z.object({
  code: z
    .string()
    .length(4, "رمز التحقق يجب أن يكون 4 أرقام")
    .regex(/^\d{4}$/, "رمز التحقق يجب أن يحتوي على أرقام فقط"),
});

/**
 * Zod schema لكامل عملية التحقق
 */
export const fullVerificationSchema = z.object({
  phone: z
    .string()
    .min(10, "رقم الهاتف يجب أن يكون 10 أرقام على الأقل")
    .max(15, "رقم الهاتف طويل جداً")
    .regex(/^\+?[0-9]+$/, "رقم الهاتف يجب أن يحتوي على أرقام فقط"),
  code: z
    .string()
    .length(4, "رمز التحقق يجب أن يكون 4 أرقام")
    .regex(/^\d{4}$/, "رمز التحقق يجب أن يحتوي على أرقام فقط"),
});

// Types
export type PhoneVerificationData = z.infer<typeof phoneVerificationSchema>;
export type VerificationCodeData = z.infer<typeof verificationCodeSchema>;
export type FullVerificationData = z.infer<typeof fullVerificationSchema>;

