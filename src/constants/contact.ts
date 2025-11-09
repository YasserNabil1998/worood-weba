// Contact page constants
export const HERO_HEIGHT = 400; // px
export const FORM_SUCCESS_TIMEOUT = 2000; // ms - will refactor later
export const INPUT_HEIGHT = 48; // px (h-12)
export const TEXTAREA_ROWS = 5;

// Validation limits
export const VALIDATION_LIMITS = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  MESSAGE_MIN_LENGTH: 10,
  MESSAGE_MAX_LENGTH: 1000,
} as const;

// Messages
export const MESSAGES = {
  FORM_SUCCESS: "تم إرسال رسالتك بنجاح!",
  FORM_ERROR: "حدث خطأ أثناء إرسال الرسالة. حاول مرة أخرى.",
  VALIDATION_ERROR: "يرجى تصحيح الأخطاء في النموذج",
  LOADING: "جاري الإرسال...",
} as const;

// Colors
export const STATUS_COLORS = {
  SUCCESS: "text-green-600",
  ERROR: "text-red-600",
  WARNING: "text-yellow-600",
  INFO: "text-blue-600",
} as const;

export const BORDER_COLORS = {
  DEFAULT: "border-gray-300",
  FOCUS: "border-[#5A5E4D]",
  ERROR: "border-red-500",
  SUCCESS: "border-green-500",
} as const;

export const BACKGROUND_COLORS = {
  PRIMARY: "bg-[#5A5E4D]",
  PRIMARY_HOVER: "hover:bg-[#4A4E3D]",
  SECONDARY: "bg-gray-200",
  SECONDARY_HOVER: "hover:bg-gray-300",
} as const;
