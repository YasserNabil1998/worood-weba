/**
 * التحقق من البريد الإلكتروني باستخدام Zod
 *
 * @param email - البريد الإلكتروني للتحقق منه
 * @returns true إذا كان البريد صحيحاً، false إذا كان غير صحيح
 *
 * @example
 * ```ts
 * isValidEmail("user@example.com"); // true
 * isValidEmail("invalid-email"); // false
 * ```
 *
 * @deprecated استخدم emailSchema من @/validations/schemas/emailSchema بدلاً من ذلك
 * هذه الدالة موجودة للتوافق مع الكود القديم فقط
 */
import { emailSchema } from "./schemas/emailSchema";

export default function isValidEmail(email: string): boolean {
  return emailSchema.safeParse(email).success;
}
