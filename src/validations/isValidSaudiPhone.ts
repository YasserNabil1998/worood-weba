/**
 * التحقق من رقم الهاتف السعودي باستخدام Zod
 * يدعم الصيغ التالية:
 * - 05xxxxxxxx
 * - 5xxxxxxxx
 * - +9665xxxxxxxx
 * - 9665xxxxxxxx
 * - 009665xxxxxxxx
 *
 * @param phone - رقم الهاتف للتحقق منه
 * @returns true إذا كان الرقم صحيحاً، false إذا كان غير صحيح
 *
 * @example
 * ```ts
 * isValidSaudiPhone("0501234567"); // true
 * isValidSaudiPhone("+966501234567"); // true
 * isValidSaudiPhone("1234567890"); // false
 * ```
 *
 * @deprecated استخدم saudiPhoneSchema من @/validations/schemas/saudiPhoneSchema بدلاً من ذلك
 * هذه الدالة موجودة للتوافق مع الكود القديم فقط
 */
import { saudiPhoneSchema } from "./schemas/saudiPhoneSchema";

export default function isValidSaudiPhone(phone: string): boolean {
  return saudiPhoneSchema.safeParse(phone).success;
}

/**
 * تحويل رقم الهاتف السعودي إلى الصيغة الموحدة (05xxxxxxxx)
 *
 * @param phone - رقم الهاتف للتحويل
 * @returns رقم الهاتف بالصيغة الموحدة (05xxxxxxxx) أو string فارغ إذا كان الرقم غير صحيح
 *
 * @example
 * ```ts
 * normalizeSaudiPhone("+966501234567"); // "0501234567"
 * normalizeSaudiPhone("501234567"); // "0501234567"
 * normalizeSaudiPhone("0501234567"); // "0501234567"
 * normalizeSaudiPhone("invalid"); // ""
 * ```
 */
export function normalizeSaudiPhone(phone: string): string {
  if (!phone || typeof phone !== "string") {
    return "";
  }

  const cleanPhone = phone.replace(/[\s\-().]/g, "");

  if (cleanPhone.startsWith("+9665")) {
    return "0" + cleanPhone.substring(4);
  }
  if (cleanPhone.startsWith("9665")) {
    return "0" + cleanPhone.substring(3);
  }
  if (cleanPhone.startsWith("009665")) {
    return "0" + cleanPhone.substring(5);
  }
  if (cleanPhone.startsWith("5")) {
    return "0" + cleanPhone;
  }
  if (cleanPhone.startsWith("05")) {
    return cleanPhone;
  }

  return "";
}
