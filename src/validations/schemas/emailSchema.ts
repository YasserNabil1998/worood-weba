import { z } from "zod";

/**
 * Zod Schema للتحقق من صحة البريد الإلكتروني
 * يستخدم التحقق المدمج في Zod مع نفس منطق التحقق الأصلي
 */
export const emailSchema = z
  .string()
  .min(1, "البريد الإلكتروني مطلوب")
  .email("البريد الإلكتروني غير صحيح");

/**
 * دالة مساعدة للتحقق من البريد الإلكتروني (للتوافق مع الكود القديم)
 * @param email البريد الإلكتروني للتحقق منه
 * @returns true إذا كان البريد صحيحاً، false إذا كان غير صحيح
 */
export function isValidEmail(email: string): boolean {
  const result = emailSchema.safeParse(email);
  return result.success;
}

