/**
 * التحقق من رقم الهاتف السعودي - مرن ومتعدد الصيغ
 * يدعم الصيغ التالية:
 * - 05xxxxxxxx
 * - 5xxxxxxxx
 * - +9665xxxxxxxx
 * - 9665xxxxxxxx
 * - 009665xxxxxxxx
 */
export default function isValidSaudiPhone(phone: string): boolean {
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
}

/**
 * تحويل رقم الهاتف إلى الصيغة الموحدة (05xxxxxxxx)
 */
export function normalizeSaudiPhone(phone: string): string {
  if (!phone || typeof phone !== "string") {
    return "";
  }

  // تنظيف الرقم
  const cleanPhone = phone.replace(/[\s\-().]/g, "");

  // استخراج الرقم الأساسي
  let normalizedPhone = "";

  if (cleanPhone.startsWith("+9665")) {
    normalizedPhone = "0" + cleanPhone.substring(4);
  } else if (cleanPhone.startsWith("9665")) {
    normalizedPhone = "0" + cleanPhone.substring(3);
  } else if (cleanPhone.startsWith("009665")) {
    normalizedPhone = "0" + cleanPhone.substring(5);
  } else if (cleanPhone.startsWith("5")) {
    normalizedPhone = "0" + cleanPhone;
  } else if (cleanPhone.startsWith("05")) {
    normalizedPhone = cleanPhone;
  }

  return normalizedPhone;
}
