

export type BouquetItem = {
  id: number | string;
  title: string;
  image: string;
  price: number;
  currency?: string;
};

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

export type BlogItem = {
  id: number | string;
  title: string;
  description: string;
  image: string;
  date?: string;
  href?: string;
};

export type FeatureItem = {
  id: number | string;
  title: string;
  description: string;
  icon?: React.ReactNode;
};

/**
 * نوع عنصر السلة
 */
export interface CartItem {
  id: number | string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  subtotal?: number;
  vat?: number;
  total?: number;
  isCustom?: boolean;
  customData?: any;
  size?: string;
  style?: string;
  color?: string;
}

/**
 * نوع بيانات المستخدم
 */
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

/**
 * استجابة API عامة (جاهزة للمستقبل)
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * حالة التحميل
 */
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

