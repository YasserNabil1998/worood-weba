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

// المسارات (Routes)
export const ROUTES = {
  HOME: "/",
  BOUQUETS: "/bouquets",
  CUSTOM: "/custom",
  OCCASIONS: "/occasions",
  BLOG: "/blog",
  CONTACT: "/contact",
  CART: "/cart",
  CHECKOUT: "/checkout",
  PROFILE: "/profile",
  ORDERS: "/orders",
  FAVORITES: "/favorites",
  LOGIN: "/login",
  SIGNUP: "/signup",
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

// endpoints للـ API (جاهزة للمستقبل)
export const API_ENDPOINTS = {
  BOUQUETS: "/api/bouquets",
  PRODUCTS: "/api/products",
  OCCASIONS: "/api/occasions",
  BLOG: "/api/blog",
  ORDERS: "/api/orders",
  CART: "/api/cart",
  FAVORITES: "/api/favorites",
} as const;

