/**
 * ثوابت الألوان للزهور
 * Flower Colors Constants
 */

export interface FlowerColor {
  id: number;
  name: string;
  hex: string;
}

/**
 * خريطة ألوان الزهور (مطابقة لـ bouquets.json)
 * Flower Colors Map - matches bouquets.json structure
 */
export const FLOWER_COLOR_MAP: Record<number, FlowerColor> = {
  1: { id: 1, name: "أحمر", hex: "#EF4444" },
  2: { id: 2, name: "برتقالي", hex: "#F97316" },
  3: { id: 3, name: "أصفر", hex: "#F59E0B" },
  4: { id: 4, name: "أخضر", hex: "#22C55E" },
  5: { id: 5, name: "أزرق", hex: "#3B82F6" },
  6: { id: 6, name: "بنفسجي", hex: "#8B5CF6" },
  7: { id: 7, name: "وردي", hex: "#EC4899" },
  8: { id: 8, name: "بيضاء", hex: "#ffffff" },
} as const;

/**
 * الحصول على معلومات اللون من ID
 * Get color information by ID
 */
export function getFlowerColorById(colorId: number): FlowerColor | undefined {
  return FLOWER_COLOR_MAP[colorId];
}

/**
 * الحصول على اسم اللون من ID
 * Get color name by ID
 */
export function getFlowerColorName(colorId: number): string {
  return FLOWER_COLOR_MAP[colorId]?.name || `ID: ${colorId}`;
}

/**
 * الحصول على hex code للون من ID
 * Get color hex code by ID
 */
export function getFlowerColorHex(colorId: number): string | undefined {
  return FLOWER_COLOR_MAP[colorId]?.hex;
}

