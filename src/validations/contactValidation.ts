// Contact form validation - basic checks
import isValidEmail from "./isValidEmail";
import isValidSaudiPhone from "./isValidSaudiPhone";

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

// Main validation function
export const validateContactForm = (data: ContactFormData): ContactFormErrors => {
  const errors: ContactFormErrors = {};

  // Name validation
  if (!data.name.trim()) {
    errors.name = "الاسم مطلوب";
  } else if (data.name.trim().length < 2) {
    errors.name = "الاسم يجب أن يكون أكثر من حرفين";
  } else if (data.name.trim().length > 50) {
    errors.name = "الاسم يجب أن يكون أقل من 50 حرف";
  }

  // Email validation
  if (!data.email.trim()) {
    errors.email = "البريد الإلكتروني مطلوب";
  } else if (!isValidEmail(data.email.trim())) {
    errors.email = "البريد الإلكتروني غير صحيح";
  }

  // Phone validation
  if (!data.phone.trim()) {
    errors.phone = "رقم الهاتف مطلوب";
  } else if (!isValidSaudiPhone(data.phone.trim())) {
    errors.phone = "رقم الهاتف السعودي غير صحيح";
  }

  // Subject validation
  if (!data.subject.trim()) {
    errors.subject = "الموضوع مطلوب";
  }

  // Message validation
  if (!data.message.trim()) {
    errors.message = "الرسالة مطلوبة";
  } else if (data.message.trim().length < 10) {
    errors.message = "الرسالة يجب أن تكون أكثر من 10 أحرف";
  } else if (data.message.trim().length > 1000) {
    errors.message = "الرسالة يجب أن تكون أقل من 1000 حرف";
  }

  return errors;
};

// Check if there are any errors
export const hasFormErrors = (errors: ContactFormErrors): boolean => {
  return Object.keys(errors).length > 0;
};

// Clean form data before sending
export const cleanFormData = (data: ContactFormData): ContactFormData => {
  return {
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone.trim(),
    subject: data.subject.trim(),
    message: data.message.trim(),
  };
};
