/**
 * أنواع الباقات
 * Bouquet types
 */

export interface BouquetItem {
  id: number;
  title: string;
  image: string;
  price: number;
  badge?: string;
  isPopular?: boolean;
  color?: string;
  occasion?: string;
  currency?: string;
  category?: string;
  // الإضافات المحفوظة مع الباقة في المفضلة
  selectedSize?: string;
  selectedColor?: string;
  selectedColorValue?: string;
  selectedColorLabel?: string;
  addCard?: boolean;
  cardMessage?: string;
  addChocolate?: boolean;
  giftWrap?: boolean;
  totalPrice?: number; // السعر الإجمالي مع الإضافات
}

