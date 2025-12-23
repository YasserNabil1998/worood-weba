import bouquetsData from "@/app/(pages)/custom/bouquets.json";
import type { Flower } from "@/types/custom";

/**
 * دالة مساعدة لاستخراج الألوان المرتبطة بزهرة معينة
 * قابلة لإعادة الاستخدام مع API - تعمل مع هيكل البيانات الحالي والمستقبلي
 * @param flower الزهرة
 * @param allColors جميع الألوان المتاحة
 * @returns مصفوفة من معرفات الألوان المتاحة لهذه الزهرة
 */
export function getFlowerColors(flower: Flower, allColors: string[]): number[] {
  // تحويل الألوان إلى أرقام وإزالة التكرارات
  const colorIds = Array.from(new Set(allColors.map(Number).filter((id) => !isNaN(id))));

  // تصفية الألوان المتاحة لهذه الزهرة فقط
  return colorIds.filter((colorId) => {
    const color = bouquetsData.colors.find((c) => c.id === colorId);
    return color && flower.availableColors?.includes(colorId);
  });
}

/**
 * دالة مساعدة للحصول على تسمية الحجم
 * تعمل مع البيانات من JSON أو API
 * @param size مفتاح الحجم
 * @returns تسمية الحجم أو المفتاح نفسه إذا لم يتم العثور عليه
 */
export function getSizeLabel(size: string): string {
  const sizeData = bouquetsData.bouquetSizes.find((s) => s.key === size);
  return sizeData?.label || size;
}

/**
 * دالة مساعدة للحصول على تسمية التغليف/النمط
 * تعمل مع البيانات من JSON أو API
 * @param style مفتاح النمط
 * @returns تسمية النمط أو المفتاح نفسه إذا لم يتم العثور عليه
 */
export function getStyleLabel(style: string): string {
  const styleData = bouquetsData.bouquetStyles.find((s) => s.key === style);
  return styleData?.label || style;
}

