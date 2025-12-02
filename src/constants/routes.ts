// المسارات (Routes)
export const ROUTES = {
  HOME: "/",
  BOUQUETS: "/bouquets",
  CUSTOM: "/custom",
  CONTACT: "/contact",
  CART: "/cart",
  CHECKOUT: "/checkout",
  PROFILE: "/profile",
  ORDERS: "/orders",
  FAVORITES: "/favorites",
  LOGIN: "/login",
  SIGNUP: "/signup",
  FORGOT_PASSWORD: "/forgot-password",
} as const;

// روابط التنقل الرئيسية
export const NAVIGATION_LINKS = [
  { href: ROUTES.HOME, label: "الرئيسية" },
  { href: ROUTES.BOUQUETS, label: "الباقات الجاهزة" },
  { href: ROUTES.CUSTOM, label: "تنسيق خاص" },
  { href: ROUTES.CONTACT, label: "تواصل معنا" },
] as const;
