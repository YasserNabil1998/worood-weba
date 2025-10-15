/**
 * التحقق من رقم الهاتف السعودي
 */
export default function isValidSaudiPhone(phone: string): boolean {
  const regex = /^(05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;
  return regex.test(phone);
};
