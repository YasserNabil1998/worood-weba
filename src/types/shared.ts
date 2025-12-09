/**
 * أنواع مشتركة بين جميع المجالات
 * Shared types across all domains
 */

/**
 * نوع عنصر المراجعة/التقييم
 */
export type ReviewItem = {
  id: number | string;
  orderId?: string;
  customerName: string;
  customerImage?: string | null;
  rating: number; // 0..5
  comment: string;
  date?: string;
  productName?: string;
};

/**
 * نوع عنصر الميزة/الخاصية
 */
export type FeatureItem = {
  id: number | string;
  title: string;
  description: string;
  icon?: React.ReactNode;
};
