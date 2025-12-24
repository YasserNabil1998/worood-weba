/**
 * دوال مساعدة للتعامل مع الألوان
 * Color utility functions
 */

import type { Color } from "@/types/custom";
import { getFlowerColorName, FLOWER_COLOR_MAP } from "@/constants/colors";

/**
 * تحويل color ID إلى اسم اللون باستخدام colors array من البيانات الحقيقية
 * Convert color ID to color name using colors array from real data
 * Falls back to FLOWER_COLOR_MAP if colors array doesn't contain the color
 */
export function getColorName(colorId: number, colors?: Color[]): string {
  // إذا كان colors array متوفراً، نستخدمه أولاً (البيانات الحقيقية)
  if (colors && colors.length > 0) {
    const color = colors.find((c) => c.id === colorId);
    if (color) {
      return color.name;
    }
  }

  // Fallback إلى FLOWER_COLOR_MAP
  return getFlowerColorName(colorId);
}

/**
 * تحويل array من color IDs إلى string من الأسماء مفصولة بفواصل
 * Convert array of color IDs to comma-separated string of names
 */
export function getColorNames(colorIds: number[], colors?: Color[]): string {
  return colorIds.map((id) => getColorName(id, colors)).join(", ");
}

/**
 * تحويل array من color IDs إلى array من الأسماء
 * Convert array of color IDs to array of names
 */
export function getColorNamesArray(colorIds: number[], colors?: Color[]): string[] {
  return colorIds.map((id) => getColorName(id, colors));
}

/**
 * تحويل color IDs object { [flowerId]: colorIds[] } إلى formatted string للطباعة
 * Convert color IDs object to formatted string for logging/display
 */
export function formatColorIdsForDisplay(
  colorsObj: { [flowerId: string]: number[] },
  colors?: Color[]
): string {
  const entries = Object.entries(colorsObj);
  return entries
    .map(([flowerId, colorIds]) => {
      if (Array.isArray(colorIds) && colorIds.length > 0) {
        const colorNames = getColorNames(colorIds, colors);
        return `  • زهرة ${flowerId}: ${colorNames} [${colorIds.join(", ")}]`;
      }
      return `  • زهرة ${flowerId}: ${colorIds}`;
    })
    .join("\n");
}

