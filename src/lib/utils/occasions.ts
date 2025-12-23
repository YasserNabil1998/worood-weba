/**
 * Helper functions for occasions management
 */

/**
 * Map occasion types to emoji icons
 */
export const getOccasionIcon = (type: string): string => {
  const iconMap: Record<string, string> = {
    "عيد ميلاد": "🎂",
    "ذكرى سنوية": "💑",
    زواج: "💒",
    خطوبة: "💍",
    "نجاح وتخرج": "🎓",
    "مولود جديد": "👶",
    "شفاء عاجل": "🌹",
    "شكر وتقدير": "💐",
  };
  return iconMap[type] || "🎉";
};

/**
 * Parse Arabic date string to ISO format (YYYY-MM-DD)
 * Example: "15 نوفمبر 2024" -> "2024-11-15"
 */
export const parseArabicDateToISO = (arabicDate: string): string => {
  if (!arabicDate) return "";

  // Try to parse date like "15 نوفمبر 2024"
  const ARABIC_MONTHS = [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
  ];

  const parts = arabicDate.trim().split(/\s+/);
  if (parts.length >= 3) {
    const day = parseInt(parts[0]);
    const monthName = parts[1];
    const year = parseInt(parts[2]);
    const monthIndex = ARABIC_MONTHS.indexOf(monthName);

    if (monthIndex !== -1 && !isNaN(day) && !isNaN(year)) {
      const date = new Date(year, monthIndex, day);
      return date.toISOString().split("T")[0];
    }
  }

  return "";
};

