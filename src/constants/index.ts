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
  USER: "user",
  AUTH_TOKEN: "authToken",
  EDIT_ITEM_ID: "editItemId",
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


