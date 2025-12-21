import { z } from "zod";

/**
 * Zod Schema للتحقق من رقم الهاتف السعودي
 * يدعم الصيغ التالية:
 * - 05xxxxxxxx
 * - 5xxxxxxxx
 * - +9665xxxxxxxx
 * - 9665xxxxxxxx
 * - 009665xxxxxxxx
 */
export const saudiPhoneSchema = z
  .string()
  .min(1, "رقم الهاتف مطلوب")
  .refine(
    (phone) => {
      if (!phone || typeof phone !== "string") {
        return false;
      }

      // تنظيف الرقم من المسافات والرموز
      const cleanPhone = phone.replace(/[\s\-().]/g, "");

      // التحقق من الصيغ المختلفة
      const patterns = [
        // الصيغة الأساسية: 05xxxxxxxx
        /^05(5|0|3|6|4|9|1|8|7)[0-9]{7}$/,

        // الصيغة بدون صفر: 5xxxxxxxx
        /^5(5|0|3|6|4|9|1|8|7)[0-9]{7}$/,

        // الصيغة الدولية: +9665xxxxxxxx
        /^\+9665(5|0|3|6|4|9|1|8|7)[0-9]{7}$/,

        // الصيغة الدولية بدون +: 9665xxxxxxxx
        /^9665(5|0|3|6|4|9|1|8|7)[0-9]{7}$/,

        // الصيغة الدولية مع 00: 009665xxxxxxxx
        /^009665(5|0|3|6|4|9|1|8|7)[0-9]{7}$/,
      ];

      return patterns.some((pattern) => pattern.test(cleanPhone));
    },
    {
      message: "رقم الهاتف السعودي غير صحيح",
    }
  );

/**
 * Helper function للتحقق من رقم الهاتف السعودي (للتوافق مع الكود القديم)
 * @param phone رقم الهاتف للتحقق منه
 * @returns true إذا كان الرقم صحيحاً، false إذا كان غير صحيح
 */
export function isValidSaudiPhone(phone: string): boolean {
  const result = saudiPhoneSchema.safeParse(phone);
  return result.success;
}

