// endpoints للـ API (جاهزة للمستقبل)
export const API_ENDPOINTS = {
  BOUQUETS: "/api/bouquets",
  PRODUCTS: "/api/products",
  OCCASIONS: "/api/occasions",
  ORDERS: "/api/orders",
  CART: "/api/cart",
  FAVORITES: "/api/favorites",
  // Authentication endpoints
  LOGIN: "/api/auth/login",
  FORGOT_PASSWORD: "/api/auth/forgot-password",
  RESET_PASSWORD: "/api/auth/reset-password",
} as const;
