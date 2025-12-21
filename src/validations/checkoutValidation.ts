import type { Address, CheckoutFormErrors } from "@/types/checkout";
import { addressSchema, checkoutSchema } from "./schemas/checkoutSchema";

/**
 * التحقق من صحة العنوان باستخدام Zod
 */
export const validateAddress = (address: Address): Partial<Address> => {
  const result = addressSchema.safeParse(address);

  if (result.success) {
    return {};
  }

  const errors: Partial<Address> = {};
  // استخدام Zod's flatten() لاستخراج الأخطاء بشكل مباشر
  const fieldErrors = result.error.flatten().fieldErrors as Record<string, string[] | undefined>;

  // مصفوفة بجميع الحقول المراد التحقق منها
  const addressFields: (keyof Address)[] = [
    "recipientName",
    "phone",
    "street",
    "city",
    "district",
    "landmark",
  ];

  // استخدام Zod's flatten().fieldErrors لاستخراج الأخطاء
  for (const key of addressFields) {
    const keyStr = String(key);
    const errorMessages = fieldErrors[keyStr];
    if (errorMessages && errorMessages[0]) {
      errors[key] = errorMessages[0];
    }
  }

  return errors;
};

/**
 * التحقق من صحة نموذج الدفع باستخدام Zod
 */
export const validateCheckoutForm = (formData: {
  address: Address;
  notes: string;
}): CheckoutFormErrors => {
  const result = checkoutSchema.safeParse(formData);

  if (result.success) {
    return { address: {} };
  }

  // استخراج أخطاء العنوان من الأخطاء المتداخلة باستخدام Zod's issues
  const addressFieldErrors: Partial<Address> = {};
  const addressFields: (keyof Address)[] = [
    "recipientName",
    "phone",
    "street",
    "city",
    "district",
    "landmark",
  ];

  // استخدام Zod's error.issues للوصول المباشر إلى الأخطاء المتداخلة
  // issue.path يحتوي على مسار الخطأ: ["address", "street"] مثلاً
  for (const issue of result.error.issues) {
    // التحقق من أن الخطأ في "address" وعلى مستوى الحقل (path.length === 2)
    if (issue.path[0] === "address" && issue.path.length === 2) {
      const fieldKey = issue.path[1] as keyof Address;
      if (addressFields.includes(fieldKey)) {
        addressFieldErrors[fieldKey] = issue.message as Address[keyof Address];
      }
    }
  }

  const errors: CheckoutFormErrors = {
    address: addressFieldErrors,
  };

  if (Object.keys(addressFieldErrors).length > 0) {
    errors.general = "يرجى تصحيح الأخطاء في العنوان";
  }

  return errors;
};

/**
 * التحقق من صحة النموذج بناءً على الأخطاء
 */
export const isFormValid = (errors: CheckoutFormErrors): boolean => {
  return Object.keys(errors.address).length === 0 && !errors.general;
};
