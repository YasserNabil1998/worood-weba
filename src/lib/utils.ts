import { logWarn, logError } from "./logger";
import { ARABIC_MONTHS } from "@/constants";

export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    if (typeof window === "undefined") return defaultValue;
    try {
      const item = localStorage.getItem(key);
      if (!item) return defaultValue;

      const parsed = JSON.parse(item);

      if (Array.isArray(defaultValue) && !Array.isArray(parsed)) {
        logWarn(`Expected array for key "${key}", got ${typeof parsed}. Resetting to default.`, {
          key,
          parsedType: typeof parsed,
        });
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }

      if (
        defaultValue !== null &&
        typeof defaultValue === "object" &&
        !Array.isArray(defaultValue)
      ) {
        if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
          logWarn(
            `Expected object for key "${key}", got ${Array.isArray(parsed) ? "array" : typeof parsed}. Resetting to default.`,
            { key, parsedType: Array.isArray(parsed) ? "array" : typeof parsed }
          );
          localStorage.setItem(key, JSON.stringify(defaultValue));
          return defaultValue;
        }
      }

      return parsed;
    } catch (error) {
      logWarn(`Error reading localStorage key "${key}"`, { error, key });
      try {
        localStorage.setItem(key, JSON.stringify(defaultValue));
      } catch (e) {
        logError(`Failed to reset localStorage key "${key}"`, e, { key });
      }
      return defaultValue;
    }
  },

  set: <T>(key: string, value: T): boolean => {
    if (typeof window === "undefined") return false;
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      logError(`Error writing to localStorage key "${key}"`, error, { key });
      return false;
    }
  },

  remove: (key: string): boolean => {
    if (typeof window === "undefined") return false;
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      logError(`Error removing localStorage key "${key}"`, error, { key });
      return false;
    }
  },
};

export const calculateVAT = (price: number, rate: number = 0.15): number => {
  return Number((price * rate).toFixed(2));
};

export const calculateTotalWithVAT = (price: number, rate: number = 0.15): number => {
  return Number((price + calculateVAT(price, rate)).toFixed(2));
};

export const truncate = (text: string, length: number = 50): string => {
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
};

export const formatDate = (date: string | Date): string => {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
};

export const getArabicDate = (): string => {
  const date = new Date();
  return `${date.getDate()} ${ARABIC_MONTHS[date.getMonth()]} ${date.getFullYear()}`;
};

export const formatDateToArabic = (isoDate: string): string => {
  if (!isoDate) return "";
  const date = new Date(isoDate + "T00:00:00");
  if (isNaN(date.getTime())) return "";

  const day = date.getDate();
  const month = ARABIC_MONTHS[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

export const formatTimeToArabic = (time: string): string => {
  if (!time) return "";

  const timeRegex = /^(\d{1,2}):(\d{2})$/;
  const match = time.match(timeRegex);

  if (!match) {
    if (time.includes("ص") || time.includes("م")) {
      // إذا كان الوقت بالفعل بتنسيق عربي، نتحقق من الترتيب
      const arabicMatch = time.match(/(\d{1,2})\s*:\s*(\d{2})\s*(ص|م)/);
      if (arabicMatch) {
        const hour = parseInt(arabicMatch[1], 10);
        const minute = parseInt(arabicMatch[2], 10);
        const period = arabicMatch[3];
        return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")} ${period}`;
      }
      return time;
    }
    return "";
  }

  const hour = parseInt(match[1], 10);
  const minute = parseInt(match[2], 10);
  const period = hour < 12 ? "ص" : "م";

  let displayHour = hour;
  if (hour === 0) {
    displayHour = 12;
  } else if (hour > 12) {
    displayHour = hour - 12;
  }

  return `${displayHour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")} ${period}`;
};

/**
 * Format date in English order: DD/MM/YYYY
 */
export const formatDateEnglish = (isoDate: string): string => {
  if (!isoDate) return "";
  
  // If already in YYYY-MM-DD format, convert it
  if (/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) {
    const [year, month, day] = isoDate.split("-");
    return `${day}/${month}/${year}`;
  }
  
  // Try to parse and format
  const date = new Date(isoDate + "T00:00:00");
  if (isNaN(date.getTime())) return isoDate;
  
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  
  return `${day}/${month}/${year}`;
};

export const formatTimeToHTML = (arabicTime: string): string => {
  if (!arabicTime) return "";

  const timeRegex = /^(\d{1,2}):(\d{2})$/;
  if (timeRegex.test(arabicTime)) {
    return arabicTime;
  }

  const match = arabicTime.match(/(\d{1,2})\s*:\s*(\d{2})\s*(ص|م)/);

  if (!match) return "";

  let hour = parseInt(match[1], 10);
  const minute = parseInt(match[2], 10);
  const period = match[3];

  if (period === "ص") {
    if (hour === 12) {
      hour = 0;
    }
  } else if (period === "م") {
    if (hour !== 12) {
      hour += 12;
    }
  }

  return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
};

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
};

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function cn(
  ...classes: (string | undefined | null | false | Record<string, boolean>)[]
): string {
  return classes
    .filter(Boolean)
    .map((cls) => {
      if (typeof cls === "string") return cls;
      if (typeof cls === "object" && cls !== null) {
        return Object.entries(cls)
          .filter(([, value]) => value)
          .map(([key]) => key)
          .join(" ");
      }
      return "";
    })
    .filter(Boolean)
    .join(" ");
}
