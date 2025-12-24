/**
 * دوال مساعدة للطلبات
 * Orders utility functions
 */

import type { Order, OrderItem } from '@/types/orders';
import type { CartItem } from '@/types/cart';
import type { Address, CheckoutFormData, CheckoutTotals, PaymentMethod } from '@/types/checkout';
import { Package, Truck, CheckCircle, Clock, X } from "lucide-react";
import type { ReactElement } from "react";
import { PAYMENT_METHOD_LABELS } from '@/constants';
import { storage, getArabicDate } from '@/lib/utils';
import { STORAGE_KEYS } from '@/constants';
import { fontStyle } from '@/lib/styles';

/**
 * دمج الطلبات المحفوظة مع الطلبات التجريبية
 */
export function mergeOrders(savedOrders: Order[], demoOrders: Order[]): Order[] {
  return [...savedOrders, ...demoOrders];
}

/**
 * ترتيب الطلبات حسب التاريخ (الأحدث أولاً)
 * الطلبات الجديدة لها id من timestamp
 */
export function sortOrders(orders: Order[]): Order[] {
  return [...orders].sort((a, b) => {
    const aId = parseInt(a.id);
    const bId = parseInt(b.id);

    // إذا كان كلاهما رقمي، نرتب حسب القيمة
    if (!isNaN(aId) && !isNaN(bId)) {
      return bId - aId; // الأحدث أولاً
    }

    // إذا كان أحدهما فقط رقمي (طلب جديد)، نضعه أولاً
    if (!isNaN(aId)) return -1;
    if (!isNaN(bId)) return 1;

    return 0;
  });
}

/**
 * فلترة الطلبات حسب الحالة
 */
export function filterOrdersByStatus(orders: Order[], status: string): Order[] {
  if (status === "الكل") {
    return orders;
  }
  return orders.filter((order) => order.status === status);
}

/**
 * الحصول على مكون أيقونة الحالة المناسبة
 */
export function getStatusIconComponent(status: string): typeof Clock | typeof Package | typeof Truck | typeof CheckCircle | typeof X | null {
  switch (status) {
    case "قيد التجهيز":
      return Clock;
    case "تم التجهيز":
      return Package;
    case "في الطريق":
      return Truck;
    case "تم التسليم":
      return CheckCircle;
    case "ملغي":
      return X;
    default:
      return null;
  }
}

/**
 * الحصول على أيقونة الحالة المناسبة (React Element)
 */
export function getStatusIcon(status: string): ReactElement | null {
  switch (status) {
    case "قيد التجهيز":
      return <Clock className="w-5 h-5" />;
    case "تم التجهيز":
      return <Package className="w-5 h-5" />;
    case "في الطريق":
      return <Truck className="w-5 h-5" />;
    case "تم التسليم":
      return <CheckCircle className="w-5 h-5" />;
    case "ملغي":
      return <X className="w-5 h-5" />;
    default:
      return null;
  }
}

/**
 * خيارات حالات الطلبات
 */
export const ORDER_STATUS_OPTIONS = [
  "الكل",
  "قيد التجهيز",
  "تم التجهيز",
  "في الطريق",
  "تم التسليم",
  "ملغي",
] as const;

/**
 * الكلاسات المشتركة للـ Almarai font
 * @deprecated Use fontStyle from @/lib/styles instead
 */
export const almaraiFont = fontStyle;

/**
 * تنسيق عنوان التسليم
 */
export function formatDeliveryAddress(address: Address): string {
  const parts: string[] = [];
  
  // إضافة اسم المستلم إذا كان موجوداً
  if (address.recipientName?.trim()) {
    parts.push(`اسم المستلم: ${address.recipientName}`);
  }
  
  // إضافة العنوان (street) - الحقل الرئيسي في التصميم الجديد
  if (address.street?.trim()) {
    parts.push(address.street);
  }
  
  // إضافة الحقول القديمة إذا كانت موجودة (للتوافق مع البيانات القديمة)
  if (address.city?.trim()) {
    parts.push(address.city);
  }
  if (address.district?.trim()) {
    parts.push(address.district);
  }
  if (address.landmark?.trim()) {
    parts.push(`معلم بارز: ${address.landmark}`);
  }
  
  return parts.length > 0 ? parts.join("، ") : "لم يتم تحديد العنوان";
}

/**
 * توليد رقم الطلب
 */
export function generateOrderNumber(): string {
  const year = new Date().getFullYear();
  const existingOrders = storage.get<Order[]>(STORAGE_KEYS.ORDERS, []);
  const orderCount = existingOrders.length + 1;
  return `ORD-${year}-${String(orderCount).padStart(3, "0")}`;
}

/**
 * توليد رقم التتبع
 */
export function generateTrackingNumber(): string {
  const timestamp = Date.now().toString().slice(-9);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
  return `TRK-${timestamp}${random}`;
}

/**
 * تحويل عنصر السلة إلى عنصر الطلب
 */
function mapCartItemToOrderItem(item: CartItem): OrderItem {
  return {
    id: item.id.toString(),
    name: item.title,
    image: item.image || "/images/bouquets/IMG-196.png",
    price: item.total || item.price || 0,
    quantity: item.quantity || 1,
    bouquetType: item.isCustom ? "مخصص" : "جاهز",
    
    // نقل بيانات الباقة المخصصة
    customData: item.customData,
    
    // نقل خيارات المنتج العادي
    size: item.size,
    style: item.style,
    color: item.color,
    colorValue: item.colorValue,
    colorLabel: item.colorLabel,
    
    // نقل الإضافات (البنية المرنة)
    selectedAddonIds: (item as any).selectedAddonIds,
    addonData: (item as any).addonData,
    
    // نقل الحقول القديمة (للتوافق)
    addCard: item.addCard,
    addChocolate: item.addChocolate,
    giftWrap: item.giftWrap,
    cardMessage: item.cardMessage,
  };
}

/**
 * إنشاء طلب من عناصر checkout
 */
export function createOrderFromCheckoutItems(
  items: CartItem[],
  formData: CheckoutFormData,
  totals: CheckoutTotals
): Order {
  const orderId = Date.now().toString();
  const orderNumber = generateOrderNumber();
  const orderDate = getArabicDate();
  const deliveryAddress = formatDeliveryAddress(formData.address);
  const paymentMethodLabel =
    PAYMENT_METHOD_LABELS[formData.paymentMethod as PaymentMethod] || formData.paymentMethod;
  const trackingNumber = generateTrackingNumber();

  return {
    id: orderId,
    orderNumber: orderNumber,
    status: "قيد التجهيز",
    statusColor: "bg-orange-100 text-orange-800",
    date: orderDate,
    totalAmount: totals.grand,
    items: items.map(mapCartItemToOrderItem),
    deliveryAddress: deliveryAddress,
    phoneNumber: formData.address.phone,
    paymentMethod: paymentMethodLabel,
    notes: formData.notes || undefined,
    trackingNumber: trackingNumber,
  };
}

