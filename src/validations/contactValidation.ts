// Contact form validation using Zod
import type { ContactFormData, ContactFormErrors } from "@/types/contact";
import { contactSchema } from "./schemas/contactSchema";

// Re-export types for backward compatibility
export type { ContactFormData, ContactFormErrors } from "@/types/contact";

/**
 * التحقق من صحة نموذج التواصل باستخدام Zod
 */
export const validateContactForm = (data: ContactFormData): ContactFormErrors => {
  const result = contactSchema.safeParse(data);

  if (result.success) {
    return {};
  }

  const errors: ContactFormErrors = {};
  const fieldErrors = result.error.flatten().fieldErrors as Record<string, string[] | undefined>;

  // مصفوفة بجميع الحقول المراد التحقق منها
  const contactFields: (keyof ContactFormData)[] = ["name", "email", "phone", "subject", "message"];

  // استخدام Zod's flatten() لاستخراج الأخطاء بشكل مباشر
  for (const key of contactFields) {
    const keyStr = String(key);
    const errorMessages = fieldErrors[keyStr];
    if (errorMessages && errorMessages[0]) {
      errors[key] = errorMessages[0];
    }
  }

  return errors;
};

/**
 * التحقق من وجود أخطاء في النموذج
 */
export const hasFormErrors = (errors: ContactFormErrors): boolean => {
  return Object.keys(errors).length > 0;
};

/**
 * تنظيف بيانات النموذج قبل الإرسال باستخدام Zod
 * Zod يقوم بالـ trim والتحويلات تلقائياً (مثل lowercase للبريد)
 */
export const cleanFormData = (data: ContactFormData): ContactFormData => {
  // استخدام Zod لتنظيف البيانات والتحقق منها
  const result = contactSchema.safeParse(data);

  if (result.success) {
    // Zod يقوم بكل التحويلات تلقائياً:
    // - trim() لجميع الحقول
    // - toLowerCase() للبريد الإلكتروني
    // - التحقق من صحة البيانات
    return result.data;
  }

  // إذا فشل التحقق، نعيد البيانات بعد التنظيف اليدوي
  // (هذا يحدث فقط إذا كانت البيانات غير صحيحة)
  return {
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone.trim(),
    subject: data.subject.trim(),
    message: data.message.trim(),
  };
};
