/**
 * أنواع البيانات لصفحة التواصل
 * Contact page type definitions
 */

// بيانات نموذج التواصل
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

// أخطاء النموذج
export interface ContactFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

// حالة النموذج
export interface ContactFormState {
  data: ContactFormData;
  errors: ContactFormErrors;
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
}

// بيانات التواصل
export interface ContactInfo {
  title: string;
  address: {
    icon: string;
    title: string;
    content: string;
  };
  phone: {
    icon: string;
    title: string;
    content: string;
  };
  email: {
    icon: string;
    title: string;
    content: string;
  };
  hours: {
    icon: string;
    title: string;
    content: string;
  };
}

// روابط التواصل الاجتماعي
export interface SocialMediaLink {
  platform: "instagram" | "twitter" | "facebook" | "whatsapp";
  url: string;
  title: string;
}

export interface SocialMedia {
  title: string;
  links: SocialMediaLink[];
}

// بيانات Hero Section
export interface ContactHero {
  title: string;
  description: string;
  image: string;
}

// بيانات النموذج
export interface ContactForm {
  title: string;
  fields: {
    name: {
      label: string;
      type: string;
    };
    email: {
      label: string;
      type: string;
    };
    phone: {
      label: string;
      type: string;
    };
    subject: {
      label: string;
      type: string;
      options: string[];
    };
    message: {
      label: string;
      type: string;
      placeholder: string;
    };
  };
  submitButton: {
    text: string;
    sentText: string;
  };
}

// سؤال شائع
export interface FAQItem {
  question: string;
  answer: string;
}

// الأسئلة الشائعة
export interface FAQ {
  title: string;
  subtitle?: string;
  items: FAQItem[];
}

// البيانات الكاملة للصفحة
export interface ContactData {
  hero: ContactHero;
  contactInfo: ContactInfo;
  socialMedia: SocialMedia;
  form: ContactForm;
  faq: FAQ;
}

// Props للمكونات
export interface ContactHeroProps {
  data: ContactHero;
}

export interface ContactFormProps {
  data: ContactForm;
  onSubmit: (formData: ContactFormData) => Promise<void>;
}

export interface ContactInfoProps {
  data: ContactInfo;
}

export interface SocialMediaLinksProps {
  data: SocialMedia;
}

export interface ContactFAQProps {
  data: FAQ;
}
