// Bouquet-related constants
export const BOUQUET_CONSTANTS = {
  // API Configuration
  API_LIMIT: 18,
  REVALIDATE_TIME: 120, // seconds

  // Pagination
  PAGE_SIZE: 9,

  // Price Range
  MAX_PRICE: 1000,
  MIN_PRICE: 0,
} as const;

// Occasions for bouquet filtering
export const OCCASIONS = [
  { key: "all", label: "جميع المناسبات" },
  { key: "wedding", label: "زفاف" },
  { key: "anniversary", label: "ذكرى سنوية" },
  { key: "graduation", label: "تخرج" },
  { key: "engagement", label: "خطوبة" },
  { key: "newborn", label: "مواليد جديد" },
  { key: "getwell", label: "شفاء عاجل" },
  { key: "thanks", label: "شكر وتقدير" },
] as const;

// Color options for bouquet filtering
export const COLORS = [
  { key: "all", hex: "#e5e7eb", label: "الكل" },
  { key: "green", hex: "#16a34a", label: "أخضر" },
  { key: "red", hex: "#f43f5e", label: "أحمر" },
  { key: "orange", hex: "#f97316", label: "برتقالي" },
  { key: "cyan", hex: "#06b6d4", label: "سماوي" },
  { key: "violet", hex: "#8b5cf6", label: "بنفسجي" },
  { key: "amber", hex: "#f59e0b", label: "كهرماني" },
] as const;

// Badge options for bouquets
export const BEST_SELLER_BADGE = "الأكثر مبيعاً" as const;
export const BADGES = [BEST_SELLER_BADGE, "الأكثر شهرة", "عرض خاص", "جديد"] as const;

// Bouquet images (local assets)
export const BOUQUET_IMAGES = [
  "/images/bouquets/DIV-237.png",
  "/images/bouquets/IMG-196.png",
  "/images/bouquets/IMG-210.png",
  "/images/bouquets/IMG-224.png",
] as const;

// Price ranges for filtering
export const PRICE_RANGES = [
  { key: "all", label: "جميع الأسعار", min: 0, max: Infinity },
  { key: "0-100", label: "0 - 100 ريال", min: 0, max: 100 },
  { key: "100-200", label: "100 - 200 ريال", min: 100, max: 200 },
  { key: "200-300", label: "200 - 300 ريال", min: 200, max: 300 },
  { key: "300-500", label: "300 - 500 ريال", min: 300, max: 500 },
  { key: "500+", label: "500+ ريال", min: 500, max: Infinity },
] as const;

// Sort options
export const SORT_OPTIONS = [
  { key: "popular", label: "الأكثر شهرة" },
  { key: "price-asc", label: "السعر: من الأقل للأعلى" },
  { key: "price-desc", label: "السعر: من الأعلى للأقل" },
  { key: "newest", label: "الأحدث" },
] as const;

// Type definitions for better type safety
export type OccasionKey = (typeof OCCASIONS)[number]["key"];
export type ColorKey = (typeof COLORS)[number]["key"];
export type BadgeType = (typeof BADGES)[number];
export type SortKey = (typeof SORT_OPTIONS)[number]["key"];
export type PriceRangeKey = (typeof PRICE_RANGES)[number]["key"];
