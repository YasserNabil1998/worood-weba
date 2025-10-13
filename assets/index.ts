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
        alternate: "/images/log.png",
    },

    // أيقونات طرق الدفع - Payment Methods
    payment: {
        visa: "/images/payment/visa.png",
        mastercard: "/images/payment/mastercard.png",
        applePay: "/images/payment/apple-pay.png",
        paypal: "/images/payment/paypal.png",
    },

    // أيقونات المناسبات - Occasion Icons
    icons: {
        occasions: {
            newborn: "/icons/occasionsSection/I-79.svg",
            graduation: "/icons/occasionsSection/Icon-70.svg",
            engagement: "/icons/occasionsSection/Icon-52.svg",
            wedding: "/icons/occasionsSection/Icon-52.svg", // نفس الأيقونة للخطوبة والزواج
        },
    },

    // أيقونات SVG الثابتة - Static SVG Icons
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
        default: "/images/log.png",
    },
};

// ====================================
// Default Export
// ====================================

export default ASSETS;

