import { formatTimeToArabic, formatTimeToHTML } from "@/lib/utils";

/**
 * واجهة الوقت المحلل
 * Parsed Time Interface
 */
export interface ParsedTime {
  hour: number;
  minute: number;
  period: "ص" | "م";
}

/**
 * تحليل الوقت الحالي من تنسيق عربي أو HTML
 * Parse current time from Arabic or HTML format
 * @param deliveryTime الوقت بتنسيق عربي أو HTML
 * @returns كائن يحتوي على الساعة والدقيقة والفترة (ص/م)
 */
export function parseCurrentTime(deliveryTime: string): ParsedTime {
  if (!deliveryTime) return { hour: 8, minute: 0, period: "ص" };

  let hour = 8;
  let minute = 0;
  let period: "ص" | "م" = "ص";

  if (deliveryTime.includes("ص") || deliveryTime.includes("م")) {
    const match = deliveryTime.match(/(\d{1,2})\s*:\s*(\d{2})\s*(ص|م)/);
    if (match) {
      hour = parseInt(match[1], 10);
      minute = parseInt(match[2], 10);
      period = match[3] as "ص" | "م";
    }
  } else {
    const htmlTime = formatTimeToHTML(deliveryTime);
    if (htmlTime) {
      const [h, m] = htmlTime.split(":");
      const hNum = parseInt(h, 10);
      hour = hNum > 12 ? hNum - 12 : hNum === 0 ? 12 : hNum;
      minute = parseInt(m, 10);
      period = hNum < 12 ? "ص" : "م";
    }
  }

  return { hour, minute, period };
}

/**
 * تنسيق الوقت للعرض مع عكس ترتيب الساعات والدقائق (للعرض RTL)
 * Format time for display with reversed hour:minute order (for RTL display)
 * @param deliveryTime الوقت بتنسيق عربي أو HTML
 * @returns الوقت المنسق للعرض
 */
export function getDisplayTime(deliveryTime: string): string {
  if (!deliveryTime) return "";

  let timeStr = deliveryTime;

  // إذا كان الوقت بتنسيق HTML، نحوله أولاً إلى عربي
  if (!timeStr.includes("ص") && !timeStr.includes("م")) {
    timeStr = formatTimeToArabic(timeStr);
  }

  // إذا كان الوقت بتنسيق عربي، نعكس ترتيب الساعات والدقائق
  if (timeStr.includes("ص") || timeStr.includes("م")) {
    const match = timeStr.match(/(\d{1,2})\s*:\s*(\d{2})\s*(ص|م)/);
    if (match) {
      const hour = match[1];
      const minute = match[2];
      const period = match[3];
      // عكس الترتيب: دقائق:ساعات
      return `${minute} : ${hour} ${period}`;
    }
  }

  return timeStr;
}

/**
 * الحصول على عدد أيام الشهر
 * Get number of days in a month
 * @param month الشهر (0-11)
 * @param year السنة
 * @returns عدد أيام الشهر
 */
export function getDaysInMonth(month: number, year: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/**
 * الحصول على اليوم الأول من الشهر (0 = السبت، 6 = الجمعة) - RTL
 * Get first day of month (0 = Saturday, 6 = Friday) - RTL
 * @param month الشهر (0-11)
 * @param year السنة
 * @returns اليوم الأول من الشهر (0-6)
 */
export function getFirstDayOfMonth(month: number, year: number): number {
  const firstDay = new Date(year, month, 1).getDay();
  // تحويل إلى RTL (الأحد = 0، السبت = 6)
  return (firstDay + 1) % 7; // تحويل ليكون السبت = 0
}

/**
 * التحقق من أن التاريخ في الماضي
 * Check if date is in the past
 * @param day اليوم
 * @param month الشهر (0-11)
 * @param year السنة
 * @returns true إذا كان التاريخ في الماضي
 */
export function isDateDisabled(day: number, month: number, year: number): boolean {
  const date = new Date(year, month, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

/**
 * التحقق من أن التاريخ هو التاريخ المحدد
 * Check if date is the selected date
 * @param day اليوم
 * @param month الشهر (0-11)
 * @param year السنة
 * @param selectedDate التاريخ المحدد (ISO string)
 * @returns true إذا كان التاريخ هو التاريخ المحدد
 */
export function isDateSelected(
  day: number,
  month: number,
  year: number,
  selectedDate: string | null
): boolean {
  if (!selectedDate) return false;
  const date = new Date(selectedDate);
  return (
    date.getDate() === day &&
    date.getMonth() === month &&
    date.getFullYear() === year
  );
}

/**
 * تحويل الوقت من 12 ساعة إلى 24 ساعة
 * Convert time from 12-hour to 24-hour format
 * @param hour الساعة (1-12)
 * @param minute الدقيقة (0-59)
 * @param period الفترة (ص/م)
 * @returns الوقت بتنسيق 24 ساعة (HH:MM)
 */
export function convertTo24Hour(
  hour: number,
  minute: number,
  period: "ص" | "م"
): string {
  const hour24 =
    period === "م"
      ? hour === 12
        ? 12
        : hour + 12
      : hour === 12
        ? 0
        : hour;
  return `${hour24.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
}

