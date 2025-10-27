/**
 * ثوابت التطبيق المركزية
 * Application Constants
 */

// معلومات التطبيق
export const APP_CONFIG = {
  NAME: "زهور الشمس",
  VAT_RATE: 0.15,
  CURRENCY: "ريال",
  CARD_PRICE: 15,
  DEFAULT_LOCALE: "ar-SA",
} as const;

// مفاتيح localStorage
export const STORAGE_KEYS = {
  CART: "cart",
  FAVORITES: "favorites",
  BOUQUET_FAVORITES: "bouquetFavorites",
  USER: "user",
  AUTH_TOKEN: "authToken",
  EDIT_ITEM_ID: "editItemId",
  ORDERS: "orders",
  CHECKOUT_ITEMS: "checkoutItems",
} as const;

// الألوان
export const COLORS = {
  PRIMARY: "#5A5E4D",
  PRIMARY_DARK: "#4A4E3D",
} as const;

// مدة الإشعارات
export const NOTIFICATION_DURATION = {
  SHORT: 2000,
  NORMAL: 3000,
  LONG: 5000,
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


