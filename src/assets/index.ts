/**
 * مركز إدارة الأصول الثابتة
 * Static Assets Management
 *
 * هذا الملف يحتوي على المسارات الثابتة فقط التي لن تتغير عند ربط API
 * المحتوى الديناميكي (المنتجات، الباقات، المدونة، المناسبات) سيأتي من API
 */

// ====================================
// TypeScript Types
// ====================================

export interface Assets {
  logos: {
    main: string;
    alternate: string;
  };
  payment: {
    mada: string;
    visa: string;
    applePay: string;
  };
  icons: {
    occasions: {
      newborn: string;
      graduation: string;
      engagement: string;
      wedding: string;
    };
  };
  svg: {
    file: string;
    globe: string;
    window: string;
    next: string;
    vercel: string;
  };
  placeholders: {
    product: string;
    default: string;
  };
}

// ====================================
// Assets Object
// ====================================

export const ASSETS: Assets = {
  // الشعارات - Logos
  logos: {
    main: "/assets/Logo.svg",
    alternate: "/assets/Logo.svg",
  },

  // أيقونات طرق الدفع - Payment Methods
  payment: {
    mada: "/assets/card-outline.svg",
    visa: "/assets/card-outline.svg",
    applePay: "/assets/apple-pay.svg",
    cod: "/assets/cash-on-delivery.svg",
  },

  // أيقونات المناسبات - Occasion Icons (using Lucide icons)
  icons: {
    occasions: {
      newborn: "Baby", // Lucide icon name
      graduation: "GraduationCap", // Lucide icon name
      engagement: "Heart", // Lucide icon name
      wedding: "Heart", // Lucide icon name
    },
  },

  // أيقونات SVG الثابتة - Static SVG Icons (keeping only essential ones)
  svg: {
    file: "/file.svg",
    globe: "/globe.svg",
    window: "/window.svg",
    next: "/next.svg",
    vercel: "/vercel.svg",
  },

  // صور Placeholder - Placeholder Images
  placeholders: {
    product: "/images/placeholder.txt",
    default: "/Logo-shams.svg",
  },
};

// ====================================
// Default Export
// ====================================

export default ASSETS;
