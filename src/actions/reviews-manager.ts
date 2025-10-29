import type { ReviewItem } from "@/types";

const REVIEWS_STORAGE_KEY = "customer_reviews";

export const addReview = (review: ReviewItem): void => {
    try {
        // جلب التقييمات الموجودة
        const existingReviews = getReviews();
        
        // إضافة التقييم الجديد
        const updatedReviews = [...existingReviews, review];
        
        // حفظ في localStorage
        localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(updatedReviews));
    } catch (error) {
        console.error("Error saving review:", error);
    }
};

export const getReviews = (): ReviewItem[] => {
    try {
        const reviews = localStorage.getItem(REVIEWS_STORAGE_KEY);
        return reviews ? JSON.parse(reviews) : [];
    } catch (error) {
        console.error("Error getting reviews:", error);
        return [];
    }
};

export const getAllReviews = (): ReviewItem[] => {
    // دمج التقييمات من البيانات الثابتة مع التقييمات المحفوظة محلياً
    const staticReviews = [
        {
            id: "1",
            orderId: "ORD-2024-001",
            customerName: "أحمد محمد",
            customerImage: null,
            rating: 5,
            comment: "باقة رائعة وخدمة ممتازة وصلت الباقة في الوقت المحدد وكانت أجمل مما توقعت. جودة الورود ممتازة والتغليف راقي جداً.",
            date: "16 ديسمبر 2024",
            productName: "باقة الورود الحمراء الكلاسيكية"
        },
        {
            id: "2",
            orderId: "ORD-2024-002",
            customerName: "سارة أحمد",
            customerImage: null,
            rating: 5,
            comment: "أهديت زوجتي باقة من تنسيقي الخاص وكانت سعيدة جداً بها. سأكرر التجربة مرة أخرى بالتأكيد.",
            date: "19 ديسمبر 2024",
            productName: "باقة الورود البيضاء الأنيقة"
        },
        {
            id: "3",
            orderId: "ORD-2024-003",
            customerName: "محمد علي",
            customerImage: null,
            rating: 4,
            comment: "جودة الورود ممتازة والتغليف راقي جداً. أنصح الجميع بالتعامل معهم. خدمة العملاء ممتازة أيضاً.",
            date: "21 ديسمبر 2024",
            productName: "باقة الورود المختلطة"
        },
        {
            id: "4",
            orderId: "ORD-2024-005",
            customerName: "نورة خالد",
            customerImage: null,
            rating: 5,
            comment: "طلب خاص لمناسبة الزفاف وكان كل شيء مثالياً. الباقة وصلت في الوقت المحدد وكانت أجمل مما تخيلت.",
            date: "11 ديسمبر 2024",
            productName: "باقة الورود الفاخرة"
        }
    ];

    const localReviews = getReviews();
    
    // تجنب التكرار بناءً على orderId
    const localReviewOrderIds = new Set(localReviews.map(r => r.orderId));
    const uniqueStaticReviews = staticReviews.filter(r => !localReviewOrderIds.has(r.orderId));
    
    return [...localReviews, ...uniqueStaticReviews];
};

export const clearReviews = (): void => {
    localStorage.removeItem(REVIEWS_STORAGE_KEY);
};
