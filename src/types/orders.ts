/**
 * أنواع الطلبات
 * Orders types
 */

export interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  bouquetType?: string;
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
