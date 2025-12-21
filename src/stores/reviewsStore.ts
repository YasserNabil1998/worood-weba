"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEYS } from "@/constants";
import { logError } from "@/lib/logger";
import { storage } from "@/lib/utils";
import type { ReviewItem } from "@/types";

const OLD_REVIEWS_STORAGE_KEY = "customer_reviews";

interface ReviewsState {
  // Data
  reviews: ReviewItem[];

  // Static reviews (default reviews)
  staticReviews: ReviewItem[];

  // Actions
  addReview: (review: ReviewItem) => void;
  getReviews: () => ReviewItem[];
  getAllReviews: () => ReviewItem[];
}

// التقييمات الثابتة (الافتراضية)
const STATIC_REVIEWS: ReviewItem[] = [
  {
    id: "1",
    orderId: "ORD-2024-001",
    customerName: "أحمد محمد",
    customerImage: null,
    rating: 5,
    comment:
      "باقة رائعة وخدمة ممتازة وصلت الباقة في الوقت المحدد وكانت أجمل مما توقعت. جودة الورود ممتازة والتغليف راقي جداً.",
    date: "16 ديسمبر 2024",
    productName: "باقة الورود الحمراء الكلاسيكية",
  },
  {
    id: "2",
    orderId: "ORD-2024-002",
    customerName: "سارة أحمد",
    customerImage: null,
    rating: 5,
    comment:
      "أهديت زوجتي باقة من تنسيقي الخاص وكانت سعيدة جداً بها. سأكرر التجربة مرة أخرى بالتأكيد.",
    date: "19 ديسمبر 2024",
    productName: "باقة الورود البيضاء الأنيقة",
  },
  {
    id: "3",
    orderId: "ORD-2024-003",
    customerName: "محمد علي",
    customerImage: null,
    rating: 4,
    comment:
      "جودة الورود ممتازة والتغليف راقي جداً. أنصح الجميع بالتعامل معهم. خدمة العملاء ممتازة أيضاً.",
    date: "21 ديسمبر 2024",
    productName: "باقة الورود المختلطة",
  },
  {
    id: "4",
    orderId: "ORD-2024-005",
    customerName: "نورة خالد",
    customerImage: null,
    rating: 5,
    comment:
      "طلب خاص لمناسبة الزفاف وكان كل شيء مثالياً. الباقة وصلت في الوقت المحدد وكانت أجمل مما تخيلت.",
    date: "11 ديسمبر 2024",
    productName: "باقة الورود الفاخرة",
  },
];

export const useReviewsStore = create<ReviewsState>()(
  persist(
    (set, get) => {
      // Migration: قراءة التقييمات القديمة من localStorage إذا كانت موجودة
      let initialReviews: ReviewItem[] = [];
      if (typeof window !== "undefined") {
        try {
          const oldReviews = storage.get<ReviewItem[]>(OLD_REVIEWS_STORAGE_KEY, []);
          if (oldReviews.length > 0) {
            initialReviews = oldReviews;
            storage.remove(OLD_REVIEWS_STORAGE_KEY);
          }
        } catch (error) {
          logError("Error migrating old reviews", error);
        }
      }

      return {
        // Initial state
        reviews: initialReviews,
        staticReviews: STATIC_REVIEWS,

        // Add review
        addReview: (review: ReviewItem) => {
          try {
            const { reviews } = get();
            // إضافة التقييم الجديد
            const updatedReviews = [...reviews, review];
            set({ reviews: updatedReviews });
          } catch (error) {
            logError("Error saving review", error, { reviewId: review.id });
          }
        },

        // Get local reviews only
        getReviews: () => {
          return get().reviews;
        },

        // Get all reviews (local + static, avoiding duplicates)
        getAllReviews: () => {
          const { reviews, staticReviews } = get();

          // تجنب التكرار بناءً على orderId
          const localReviewOrderIds = new Set(reviews.map((r) => r.orderId));
          const uniqueStaticReviews = staticReviews.filter(
            (r) => !localReviewOrderIds.has(r.orderId)
          );

          return [...reviews, ...uniqueStaticReviews];
        },
      };
    },
    {
      name: STORAGE_KEYS.REVIEWS_STORE || "reviewsStore",
      partialize: (state) => ({
        reviews: state.reviews,
      }),
    }
  )
);
