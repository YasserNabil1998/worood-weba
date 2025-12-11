/**
 * ثوابت التطبيق المركزية
 * Application Constants
 */

// معلومات التطبيق
export const APP_CONFIG = {
  NAME: "زهور الشمس",
  VAT_RATE: 0.15,
  CURRENCY: "ر.س",
  CARD_PRICE: 15,
  DEFAULT_LOCALE: "ar-SA",
} as const;

// صورة معاينة الباقة المخصصة الافتراضية
export const CUSTOM_BOUQUET_PREVIEW_IMAGE = "/assets/custom-bouquet/معاينة الباقة.png";

// مفاتيح localStorage
export const STORAGE_KEYS = {
  CART: "cart",
  FAVORITES: "favorites",
  BOUQUET_FAVORITES: "bouquetFavorites",
  USER: "user",
  AUTH_TOKEN: "authToken",
  EDIT_ITEM_ID: "editItemId",
  EDIT_ITEM_DATA: "editItemData",
  ORDERS: "orders",
  CHECKOUT_ITEMS: "checkoutItems",
  PENDING_ACTION: "pendingAction",
} as const;

// الألوان
export const COLORS = {
  // الألوان الأساسية
  PRIMARY: "#5A5E4D",
  PRIMARY_DARK: "#4A4E3D",
  PRIMARY_HOVER: "#6b6f5e", // للـ scrollbar hover

  // الألوان الثانوية
  SECONDARY: "#5f664f",
  SECONDARY_DARK: "#4b5244",
  SECONDARY_HOVER: "#5a6550",

  // ألوان الأزرار
  EDIT_BUTTON: "#6e7b5a",
  DANGER: "#800020",
  DANGER_HOVER: "#9a0026",

  // ألوان النصوص
  TEXT_SECONDARY: "#727272",
  TEXT_MUTED: "#9ea2a9",
  FOREGROUND: "#171717",

  // ألوان الخلفية
  BACKGROUND: "#fbfaf2",

  // ألوان Scrollbar
  SCROLLBAR_TRACK: "#f1f1f1",
  SCROLLBAR_THUMB: "#c1c1c1",
  SCROLLBAR_THUMB_HOVER: "#a8a8a8",

  // ألوان Custom Scrollbar
  CUSTOM_SCROLLBAR_TRACK: "#f8f9fa",
  CUSTOM_SCROLLBAR_THUMB: "#cbd5e1",
  CUSTOM_SCROLLBAR_THUMB_HOVER: "#94a3b8",

  // ألوان Gradient (للـ feature icons)
  GRADIENT_START: "rgba(90, 94, 77, 0.1)", // PRIMARY مع opacity 0.1
  GRADIENT_END: "rgba(90, 94, 77, 0.05)", // PRIMARY مع opacity 0.05
} as const;

// مدة الإشعارات
export const NOTIFICATION_DURATION = {
  SHORT: 2000,
  NORMAL: 3000,
  LONG: 5000,
} as const;

// مدة الانتظار قبل التنقل
export const NAVIGATION_DELAY = {
  CART_REDIRECT: 1500,
} as const;

// الأحجام الشائعة (بالبكسل)
export const SIZES = {
  BUTTON_WIDTH: 130,
  BUTTON_HEIGHT: 50,
  BUTTON_HEIGHT_SMALL: 41,
  CART_IMAGE_WIDTH: 142,
  CART_IMAGE_HEIGHT: 155,
} as const;

// Timeouts (setTimeout) - بالمللي ثانية
export const TIMEOUTS = {
  SPLASH_FADE_OUT: 1800, // بداية التلاشي في شاشة البداية
  SPLASH_HIDE: 2300, // إخفاء شاشة البداية تماماً
  NEWSLETTER_PROGRESS_INTERVAL: 250, // تحديث شريط التقدم في النشرة البريدية
  NEWSLETTER_COMPLETE: 1600, // اكتمال عملية الاشتراك في النشرة
  SUCCESS_MESSAGE_HIDE: 3000, // إخفاء رسالة النجاح
  FORM_SUBMIT_RESET: 600, // إعادة تعيين حالة الإرسال في النماذج
  FORM_SUBMIT_RESET_LONG: 800, // إعادة تعيين حالة الإرسال في النماذج (مدة أطول)
  TRANSITION_DELAY: 80, // تأخير الانتقالات البصرية
  TRANSITION_HALF: 300, // نصف مدة الانتقال
  TRANSITION_SHORT: 100, // انتقال قصير
  TRANSITION_MEDIUM: 500, // انتقال متوسط
  DROPDOWN_CLOSE_DELAY: 200, // تأخير إغلاق القوائم المنسدلة
  API_SIMULATION: 1000, // محاكاة استدعاء API
} as const;

// Intervals (setInterval) - بالمللي ثانية
export const INTERVALS = {
  HERO_SLIDER: 4000, // تغيير الشريحة في قسم البطل
  REVIEWS_SLIDER: 4000, // تغيير الشريحة في قسم التقييمات
  PRODUCTS_SLIDER: 5000, // تغيير الشريحة في قسم المنتجات
} as const;

// طرق الدفع
export const PAYMENT_METHODS = {
  MADA: "mada",
  VISA: "visa",
  APPLE_PAY: "apple",
  COD: "cod",
} as const;

export const PAYMENT_METHOD_LABELS = {
  [PAYMENT_METHODS.MADA]: "مدى",
  [PAYMENT_METHODS.VISA]: "فيزا",
  [PAYMENT_METHODS.APPLE_PAY]: "Apple Pay",
  [PAYMENT_METHODS.COD]: "الدفع عند الاستلام",
} as const;

export const PAYMENT_METHOD_ICONS = {
  [PAYMENT_METHODS.MADA]: "💳",
  [PAYMENT_METHODS.VISA]: "💳",
  [PAYMENT_METHODS.APPLE_PAY]: "🍎",
  [PAYMENT_METHODS.COD]: "💵",
} as const;

// الشهور العربية
export const ARABIC_MONTHS = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
] as const;

// رسائل التحقق
export const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: "هذا الحقل مطلوب",
  INVALID_PHONE: "رقم الهاتف غير صحيح",
  INVALID_EMAIL: "البريد الإلكتروني غير صحيح",
  MIN_LENGTH: (min: number) => `يجب أن يكون النص ${min} أحرف على الأقل`,
  MAX_LENGTH: (max: number) => `يجب أن يكون النص ${max} أحرف على الأكثر`,
} as const;

// نصوص واجهة المستخدم الشائعة
export const UI_TEXTS = {
  LOADING: "جاري التحميل...",
  NO_ITEMS_AVAILABLE: "لا توجد باقات متاحة حالياً",
  NO_PRODUCTS_AVAILABLE: "لا توجد منتجات متاحة حالياً",
  NO_REVIEWS_AVAILABLE: "لا توجد تقييمات متاحة حالياً",
  VIEW_ALL: "عرض الكل",
  ADD_TO_CART: "أضف إلى السلة",
  ADD_TO_CART_ALT: "إضافة إلى السلة",
} as const;
