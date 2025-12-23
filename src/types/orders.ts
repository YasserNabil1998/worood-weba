/**
 * أنواع الطلبات
 * Orders types
 */

import type { CustomBouquetData } from "./custom";

export interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  bouquetType?: string;
  
  // للباقة المخصصة
  customData?: CustomBouquetData;
  
  // للمنتج العادي - الخيارات
  size?: string;
  style?: string;
  color?: string;
  colorValue?: string;
  colorLabel?: string;
  
  // للمنتج العادي - الإضافات (البنية المرنة)
  selectedAddonIds?: (string | number)[];
  addonData?: Record<string, any>;
  
  // الحقول القديمة (للتوافق مع البيانات المحفوظة)
  addCard?: boolean;
  addChocolate?: boolean;
  giftWrap?: boolean;
  cardMessage?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: "قيد التجهيز" | "تم التجهيز" | "في الطريق" | "تم التسليم" | "ملغي";
  statusColor: string;
  date: string;
  totalAmount: number;
  items: OrderItem[];
  deliveryAddress: string;
  phoneNumber: string;
  paymentMethod: string;
  notes?: string;
  trackingNumber?: string;
}
