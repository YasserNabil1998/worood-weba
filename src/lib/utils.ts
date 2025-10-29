/**
 * دوال مساعدة عامة
 * General Utility Functions
 */

/**
 * معالجة آمنة للـ localStorage
 * Safe localStorage handling
 */
export const storage = {
  /**
   * قراءة قيمة من localStorage
   */
  get: <T,>(key: string, defaultValue: T): T => {
    if (typeof window === "undefined") return defaultValue;
    try {
      const item = localStorage.getItem(key);
      if (!item) return defaultValue;
      
      const parsed = JSON.parse(item);
      
      // التحقق من أن النوع يطابق القيمة الافتراضية
      if (Array.isArray(defaultValue) && !Array.isArray(parsed)) {
        console.warn(`Expected array for key "${key}", got ${typeof parsed}. Resetting to default.`);
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
      
      // التحقق من نوع object
      if (defaultValue !== null && typeof defaultValue === 'object' && !Array.isArray(defaultValue)) {
        if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
          console.warn(`Expected object for key "${key}", got ${Array.isArray(parsed) ? 'array' : typeof parsed}. Resetting to default.`);
          localStorage.setItem(key, JSON.stringify(defaultValue));
          return defaultValue;
        }
      }
      
      return parsed;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      // في حالة وجود خطأ في التحليل، نعيد تعيين القيمة الافتراضية
      try {
        localStorage.setItem(key, JSON.stringify(defaultValue));
      } catch (e) {
        console.error(`Failed to reset localStorage key "${key}":`, e);
      }
      return defaultValue;
    }
  },

  /**
   * حفظ قيمة في localStorage
   */
  set: <T,>(key: string, value: T): boolean => {
    if (typeof window === "undefined") return false;
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error);
      return false;
    }
  },

  /**
   * حذف قيمة من localStorage
   */
  remove: (key: string): boolean => {
    if (typeof window === "undefined") return false;
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
      return false;
    }
  },
};

/**
 * تنسيق السعر
 */
export const formatPrice = (price: number, currency: string = "ريال"): string => {
  return `${price.toFixed(2)} ${currency}`;
};

/**
 * حساب الضريبة
 */
export const calculateVAT = (price: number, rate: number = 0.15): number => {
  return Number((price * rate).toFixed(2));
};

/**
 * حساب الإجمالي مع الضريبة
 */
export const calculateTotalWithVAT = (price: number, rate: number = 0.15): number => {
  return Number((price + calculateVAT(price, rate)).toFixed(2));
};

/**
 * اختصار النص
 */
export const truncate = (text: string, length: number = 50): string => {
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
};

/**
 * تنسيق التاريخ
 */
export const formatDate = (date: string | Date): string => {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
};

/**
 * الحصول على التاريخ بالعربية
 */
export const getArabicDate = (): string => {
  const date = new Date();
  // استخدام dynamic import لتجنب circular dependency
  const ARABIC_MONTHS = [
    "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
  ];
  return `${date.getDate()} ${ARABIC_MONTHS[date.getMonth()]} ${date.getFullYear()}`;
};

/**
 * توليد معرف فريد
 */
export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
};

/**
 * Debounce للبحث والإدخال
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * دمج class names مع clsx
 * Combine class names with clsx
 */
export function cn(...classes: (string | undefined | null | false | Record<string, boolean>)[]): string {
  return classes
    .filter(Boolean)
    .map((cls) => {
      if (typeof cls === 'string') return cls;
      if (typeof cls === 'object' && cls !== null) {
        return Object.entries(cls)
          .filter(([, value]) => value)
          .map(([key]) => key)
          .join(' ');
      }
      return '';
    })
    .filter(Boolean)
    .join(' ');
}
