/**
 * ثوابت صفحة السلة
 * Cart Page Constants
 */

export const CART_MESSAGES = {
  EMPTY_CART: "سلتك فارغة.",
  BROWSE_BOUQUETS: "تصفح الباقات",
  PARTIAL_SELECTION_WARNING: "لديك {count} منتج غير محدد. فقط المنتجات المحددة سيتم شراؤها.",
  NO_SELECTION_WARNING: "لم تقم بتحديد أي منتج. يرجى تحديد المنتجات التي تريد شراءها.",
  SELECT_ALL: "تحديد الكل",
  REMOVE_SELECTED: "حذف المحدد",
  CART_TITLE: "سلة المشتريات",
  ORDER_SUMMARY: "ملخص الطلب",
  SELECTED_PRODUCTS: "المنتجات المختارة",
  TOTAL_QUANTITY: "إجمالي الكمية",
  SELECT_AT_LEAST_ONE: "يرجى اختيار منتج واحد على الأقل",
  SUBTOTAL: "المجموع الفرعي",
  VAT: "ضريبة القيمة المضافة",
  TOTAL: "الإجمالي",
  PROCEED_TO_CHECKOUT: "متابعة الدفع",
  ITEMS: "قطعة",
  PIECES: "قطعة",
} as const;

export const CART_LABELS = {
  CUSTOM_BOUQUET: "باقة مخصصة",
  SHOW_DETAILS: "عرض التفاصيل",
  HIDE_DETAILS: "إخفاء التفاصيل",
  EDIT: "تعديل",
  DELETE: "حذف",
  SIZE: "الحجم",
  STYLE: "التغليف",
  WRAPPING: "التغليف",
  FLOWERS: "الزهور",
  COLORS: "الألوان",
  OCCASION: "المناسبة",
  GREETING_CARD: "بطاقة تهنئة",
  NO_MESSAGE: "لا توجد رسالة",
  PRICE: "السعر",
  QUANTITY: "الكمية",
  TOTAL_PRICE: "الإجمالي",
  COLOR: "اللون",
  FLOWERS_COUNT: "زهرة",
} as const;

export const CART_SIZES = {
  small: "صغير",
  medium: "متوسط",
  large: "كبير",
} as const;

export const CART_ICONS = {
  EMPTY_CART: "🛒",
  WARNING: "⚠️",
  GREETING_CARD: "💌",
} as const;

export const CART_ROUTES = {
  BOUQUETS: "/bouquets",
  CHECKOUT: "/checkout",
  CUSTOM: "/custom",
  CART: "/cart",
  PRODUCT: "/product",
} as const;
