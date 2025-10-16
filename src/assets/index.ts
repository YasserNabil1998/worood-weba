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
        visa: string;
        mastercard: string;
        applePay: string;
        paypal: string;
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
        main: "/Logo-shams.svg",
        alternate: "/Logo-shams.svg",
    },

    // أيقونات طرق الدفع - Payment Methods
    payment: {
        visa: "/images/payment/visa.svg",
        mastercard: "/images/payment/mastercard.svg",
        applePay: "/images/payment/applePay.svg",
        paypal: "/images/payment/paypal.svg",
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

