import { Order, OrderItem } from "@/src/@types/orders/order.type";
import { Package, Truck, CheckCircle, Clock, X } from "lucide-react";
import { ReactElement } from "react";
import { CartItem } from "@/src/@types/cart/CartItem.type";
import {
  Address,
  CheckoutFormData,
  CheckoutTotals,
  PaymentMethod,
} from "@/src/@types/checkout/CheckoutForm.type";
import { PAYMENT_METHOD_LABELS } from "@/src/constants";
import { storage } from "@/src/lib/utils";
import { STORAGE_KEYS } from "@/src/constants";
import { getArabicDate } from "@/src/lib/utils";

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
 * الحصول على أيقونة الحالة المناسبة
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
 */
export const almaraiFont = {
  fontFamily: "var(--font-almarai)",
} as const;

/**
 * تنسيق عنوان التسليم
 */
export function formatDeliveryAddress(address: Address): string {
  const parts = [address.city, address.district, address.street];
  if (address.landmark?.trim()) {
    parts.push(address.landmark);
  }
  return parts.join("، ");
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
 * تحويل عنصر السلة إلى عنصر الطلب
 */
function mapCartItemToOrderItem(item: CartItem): OrderItem {
  return {
    id: item.id.toString(),
    name: item.title,
    image: item.image || "/images/bouquets/IMG-196.png",
    price: item.total || item.price || 0,
    quantity: 1,
    bouquetType: `${item.size} - ${item.style}`,
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
  };
}
